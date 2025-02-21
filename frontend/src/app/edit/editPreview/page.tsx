'use client'

import ScorePanel from '../../components/edit/ScorePanel'
import styles from './styles.module.css'
import GameGrid from '../../components/edit/GameGrid'
import NextButton from '../../components/edit/NextButton'
import { usePartsStore } from '@/app/store/partsStore'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function EditPreviewPage() {
    const { isCompleted, completedGridState } = usePartsStore();
    const router = useRouter();

    useEffect(() => {
        if (!isCompleted || !completedGridState) {
            router.push('/edit');
        }
    }, [isCompleted, completedGridState, router]);

    return (
        <div className={styles.container}>
            <div className={styles.gridWrapper}>
                <GameGrid readOnly gridState={completedGridState} />
            </div>
            <ScorePanel />
            <div className={styles.buttonGroup}>
                <NextButton type="place" position="center" text="完成" />
            </div>
        </div>
    )
}
