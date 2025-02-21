'use client'

import EditPartsMenu from '../components/edit/EditPartsMenu'
import NextButton from '../components/edit/NextButton'
import HelpPanel from '../components/edit/HelpPanel'
import ScorePanel from '../components/edit/ScorePanel'
import TipsPanel from '../components/edit/TipsPanel'
import styles from './styles.module.css'
import { useState, useEffect } from 'react'
import PartsList from '../components/edit/PartsList'
import GameGrid from '../components/edit/GameGrid'
import { usePartsStore } from '@/app/store/partsStore'
import { useRouter } from 'next/navigation'

export default function EditPage() {
    const { rotatePart, placePart, shouldNavigateToPreview } = usePartsStore();
    const router = useRouter();

    useEffect(() => {
        if (shouldNavigateToPreview) {
            router.push('/edit/editPreview');
        }
    }, [shouldNavigateToPreview, router]);

    // 開発者用のデバッグコマンド
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Command + Shift + D で即完成（mac用）
            if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'D') {
                usePartsStore.setState(state => ({
                    ...state,
                    isCompleted: true,
                    shouldNavigateToPreview: true,
                    completedGridState: state.gridState
                }));
                router.push('/edit/editPreview');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [router]);

    const handleComplete = () => {
        router.push('/edit/editPreview');
    };

    const handlePlacePart = () => {
        const success = placePart();
        if (success) {
            router.push('/edit/editPreview');
        }
    };

    return (
        <div className={styles.container}>
            <EditPartsMenu />
            <GameGrid />
            <HelpPanel />
            <ScorePanel />
            <TipsPanel />
            <div className={styles.buttonGroup}>
                <NextButton type="retire" position="left" text="リタイア" />
                <NextButton type="rotate" position="center" text="回転" onClick={rotatePart} />
                <NextButton type="place" position="right" text="設置" onClick={handlePlacePart} />
            </div>
        </div>
    )
}