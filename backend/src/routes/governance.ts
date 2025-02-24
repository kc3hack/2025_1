import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const governance = new Hono();
const prisma = new PrismaClient();

// 地域の隣接関係を定義
const ADJACENT_REGIONS = {
    'kansai': ['chubu', 'chugoku', 'shikoku'],
    'chubu': ['kansai', 'kanto'],
    'kanto': ['chubu', 'tohoku'],
    'tohoku': ['kanto'],
    'chugoku': ['kansai', 'kyushu'],
    'shikoku': ['kansai', 'kyushu'],
    'kyushu': ['chugoku', 'shikoku']
};

// ユーザーの統治度を取得
governance.get('/:userId', async (c) => {
    try {
        const userId = c.req.param('userId');
        
        const governance = await prisma.governance.findUnique({
            where: { userId }
        });

        if (!governance) {
            // ユーザーの統治度が存在しない場合は新規作成
            const newGovernance = await prisma.governance.create({
                data: { userId }
            });
            return c.json(newGovernance);
        }

        return c.json(governance);
    } catch (error) {
        console.error('統治度の取得に失敗:', error);
        return c.json({ error: '統治度の取得に失敗しました' }, 500);
    }
});

// 統治度を更新
governance.put('/:userId', async (c) => {
    try {
        const userId = c.req.param('userId');
        const { region, score, isSuccess } = await c.req.json();
        
        console.log('Received data:', { userId, region, score, isSuccess });

        // 地域名を英語に変換
        const regionMapping: { [key: string]: string } = {
            '関西': 'kansai',
            '中部': 'chubu',
            '関東': 'kanto',
            '東北': 'tohoku',
            '中国': 'chugoku',
            '四国': 'shikoku',
            '九州': 'kyushu'
        };

        const normalizedRegion = regionMapping[region];
        if (!normalizedRegion) {
            console.error('Invalid region:', region);
            return c.json({ error: '無効な地域です' }, 400);
        }

        // スコアの計算
        const governanceScore = isSuccess 
            ? (score * 0.5) / 50 
            : (score * 0.5) / 70;

        console.log('Calculated score:', governanceScore);

        // 現在の統治度を取得
        const currentGovernance = await prisma.governance.findUnique({
            where: { userId }
        });

        // 新しい統治度を計算（最大100%）
        const currentScore = currentGovernance ? currentGovernance[normalizedRegion as keyof typeof currentGovernance] as number : 0;
        const newScore = Math.min(100, currentScore + governanceScore);

        // 更新データを準備
        const updateData: any = {
            [normalizedRegion]: newScore
        };

        // 統治度が100%に達した場合、隣接地域を解放
        if (newScore >= 100) {
            const adjacentRegions = ADJACENT_REGIONS[normalizedRegion as keyof typeof ADJACENT_REGIONS];
            for (const adjRegion of adjacentRegions) {
                // 隣接地域が未解放（0%）の場合のみ初期値（1%）を設定
                if (!currentGovernance || (currentGovernance[adjRegion as keyof typeof currentGovernance] as number) === 0) {
                    updateData[adjRegion] = 1; // 初期解放時は1%に設定
                }
            }
        }

        // 全体の統治度を計算
        const governance = await prisma.governance.upsert({
            where: { userId },
            create: {
                userId,
                ...updateData,
                total: newScore // 新規作成時は単一地域の値
            },
            update: {
                ...updateData,
                // 全地域の平均を計算して total を更新
                total: {
                    set: await calculateTotalGovernance(userId, updateData)
                }
            }
        });

        return c.json(governance);
    } catch (error) {
        console.error('Governance update error:', error);
        return c.json({ 
            error: '統治度の更新に失敗しました',
            details: error instanceof Error ? error.message : '不明なエラー'
        }, 500);
    }
});

// 全体の統治度を計算する関数
async function calculateTotalGovernance(userId: string, updateData: any): Promise<number> {
    const currentGovernance = await prisma.governance.findUnique({
        where: { userId }
    });

    const regions = ['kansai', 'chubu', 'kanto', 'tohoku', 'chugoku', 'shikoku', 'kyushu'];
    let total = 0;
    let count = 0;

    for (const region of regions) {
        // 更新データがある場合はそちらを優先
        const value = updateData[region] !== undefined 
            ? updateData[region]
            : currentGovernance 
                ? (currentGovernance[region as keyof typeof currentGovernance] as number)
                : 0;
        
        if (value > 0) {
            total += value;
            count++;
        }
    }

    return count > 0 ? total / count : 0;
}

export default governance; 