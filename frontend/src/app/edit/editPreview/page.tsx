'use client'

import ScorePanel from '../../components/edit/ScorePanel'
import styles from './styles.module.css'
import { useState } from 'react'
import GameGrid from '../../components/edit/GameGrid'
import { usePartsStore } from '@/app/store/partsStore'
import NextButton from '../../components/edit/NextButton'

export default function EditPreviewPage() {
    const { rotatePart, placePart } = usePartsStore();

    return (
        <div className={styles.container}>
            <div className={styles.gridWrapper}>
                <GameGrid />
            </div>
            <ScorePanel />
            <div className={styles.buttonGroup}>
                <NextButton type="place" position="center" text="完成" />
            </div>
        </div>
    )
}
