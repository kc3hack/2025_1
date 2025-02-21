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
        
        // モーダル表示フラグを設定してから遷移
        useModalStore.getState().setShowCompletionModal(true);
        router.push('/map');
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
