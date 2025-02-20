'use client'

import styles from './ScorePanel.module.css'
import { usePartsStore } from '@/app/store/partsStore'

export default function ScorePanel() {
    const { score } = usePartsStore()

    return (
        <div className={styles.scorePanelContainer}>
            <div className={styles.scorePanelInner}>
                <div className={styles.scoreTitle}>現在のスコア</div>
                <div className={styles.scoreValue}>{score}</div>
                <div className={styles.scoreUnit}>pt</div>
            </div>
        </div>
    )
} 