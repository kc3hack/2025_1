'use client'

import ScorePanel from '../../components/edit/ScorePanel'
import styles from './styles.module.css'
import GameGrid from '../../components/edit/GameGrid'
import NextButton from '../../components/edit/NextButton'
import { usePartsStore } from '@/app/store/partsStore'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { calculateGridBoundary } from '@/app/types/GridBoundary'
import { useModalStore } from '@/app/store/modalStore'
import { createFortressData } from '@/app/types/Fortress'

export default function EditPreviewPage() {
    const { isCompleted, completedGridState } = usePartsStore();
    const router = useRouter();

    useEffect(() => {
        if (!isCompleted || !completedGridState) {
            router.push('/edit');
        }
    }, [isCompleted, completedGridState, router]);

    const handleComplete = async () => {
        if (!completedGridState) return;
        
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            if (!token || !userId) {
                throw new Error('認証情報がありません');
            }

            // 古墳データの作成と保存
            const fortressData = createFortressData(
                usePartsStore.getState().placedParts,
                usePartsStore.getState().score,
                "My Fortress"
            );
            
            const fortressResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fortresses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(fortressData),
            });
            
            if (!fortressResponse.ok) {
                throw new Error('古墳の保存に失敗しました');
            }

            // 統治度の更新
            const region = localStorage.getItem('selectedRegion');
            if (!region) {
                throw new Error('地域が選択されていません');
            }

            const score = usePartsStore.getState().score;
            const isSuccess = usePartsStore.getState().isCompleted;

            // 統治度の更新リクエスト
            const governanceResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/governance/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    region,
                    score,
                    isSuccess
                }),
            });

            if (!governanceResponse.ok) {
                // エラーの詳細を取得
                const errorData = await governanceResponse.json();
                console.error('Governance update error details:', errorData);
                throw new Error(errorData.details || errorData.error || '統治度の更新に失敗しました');
            }

            // random_parts_numを更新
            const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/random-parts`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!updateResponse.ok) {
                throw new Error('ランダムパーツ数の更新に失敗しました');
            }
            
            useModalStore.getState().setShowCompletionModal(true);
            router.push('/map');
        } catch (error) {
            console.error('保存に失敗:', error);
            alert(error instanceof Error ? error.message : '保存に失敗しました');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.gridWrapper}>
                <GameGrid readOnly gridState={completedGridState} />
            </div>
            <ScorePanel />
            <div className={styles.buttonGroup}>
                <NextButton 
                    type="place" 
                    position="center" 
                    text="完成" 
                    onClick={handleComplete}
                />
            </div>
        </div>
    )
}
