import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const markings = new Hono();
const prisma = new PrismaClient();

// JWT認証の確認
const verifyAuth = async (c: any, userId: string) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: '認証が必要です', statusCode: '401' };
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    if (typeof decoded === 'string' || decoded.userId !== userId) {
      return { error: '不正なトークンです', statusCode: '403' };
    }
    return null;
  } catch (error) {
    return { error: '不正なトークンです', statusCode: '403' };
  }
};

// マーキングを保存するエンドポイント
markings.post('/', async (c) => {
  try {
    const body = await c.req.json();
    console.log('受信したデータ:', body);  // デバッグログ

    const { userId, x, y, region } = body;

    // リクエストの検証
    if (!userId || x === undefined || y === undefined || !region) {
      return c.json({ error: '必要なパラメータが不足しています' }, 400);
    }

    // 認証確認
    const authError = await verifyAuth(c, userId);
    if (authError) {
      return c.json({ error: authError.error }, authError.statusCode);
    }

    // ユーザーの存在確認
    const user = await prisma.user.findUnique({
      where: { user_id: userId }
    });

    if (!user) {
      return c.json({ error: 'ユーザーが見つかりません' }, 404);
    }

    // ランダムなマークタイプを選択
    const markTypes = ['circle', 'key', 'square'];
    const randomMarkType = markTypes[Math.floor(Math.random() * markTypes.length)];

    // マーキングを保存
    const marking = await prisma.userMarking.create({
      data: {
        userId,
        x,
        y,
        region,
        markType: randomMarkType
      }
    });
    console.log('保存されたマーキング:', marking);  // デバッグログ

    return c.json(marking, 201);
  } catch (error) {
    console.error('マーキング保存エラー:', error);
    return c.json({ error: 'マーキングの保存に失敗しました' }, 500);
  }
});

// ユーザーのマーキング一覧を取得するエンドポイント
markings.get('/user/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');

    // 認証確認
    const authError = await verifyAuth(c, userId);
    if (authError) {
      return c.json({ error: authError.error }, authError.statusCode);
    }

    const markings = await prisma.userMarking.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return c.json(markings);
  } catch (error) {
    console.error('マーキング取得エラー:', error);
    return c.json({ error: 'マーキングの取得に失敗しました' }, 500);
  }
});

// 最新のマーキングを削除するエンドポイント
markings.delete('/latest/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');

    // 認証確認
    const authError = await verifyAuth(c, userId);
    if (authError) {
      return c.json({ error: authError.error }, authError.statusCode);
    }

    // ユーザーの最新のマーキングを取得
    const latestMarking = await prisma.userMarking.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    if (!latestMarking) {
      return c.json({ error: 'マーキングが見つかりません' }, 404);
    }

    // 最新のマーキングを削除
    await prisma.userMarking.delete({
      where: { id: latestMarking.id }
    });

    return c.json({ message: 'マーキングを削除しました' });
  } catch (error) {
    console.error('マーキング削除エラー:', error);
    return c.json({ error: 'マーキングの削除に失敗しました' }, 500);
  }
});

export default markings; 