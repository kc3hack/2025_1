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
            if (!token) {
                throw new Error('認証情報がありません');
            }

            const fortressData = createFortressData(
                usePartsStore.getState().placedParts,
                usePartsStore.getState().score,
                "My Fortress"
            );
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fortresses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(fortressData),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || '保存に失敗しました');
            }
            
            // 成功時の処理
            useModalStore.getState().setShowCompletionModal(true);
            router.push('/map');
        } catch (error) {
            console.error('古墳の保存に失敗:', error);
            let errorMessage = '古墳の保存に失敗しました。';
            
            if (error instanceof Response) {
                const data = await error.json();
                errorMessage = data.message || data.error || errorMessage;
            }
            
            alert(errorMessage);
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
