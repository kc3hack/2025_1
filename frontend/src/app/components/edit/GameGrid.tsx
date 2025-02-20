'use client'

import { useEffect } from 'react';
import styles from './GameGrid.module.css'
import { usePartsStore } from '@/app/store/partsStore';

interface TileProps {
    isSafe?: boolean
    // 将来の拡張用にプロパティを追加可能
}

interface Position {
    x: number;
    y: number;
}

export default function GameGrid() {
    const { currentPart, initializeGame } = usePartsStore();

    useEffect(() => {
        initializeGame();
    }, [initializeGame]);

    const renderCurrentPart = (row: number, col: number) => {
        if (!currentPart) return null;
        
        // パーツの表示ロジックは後で実装
        return null;
    };

    const renderTiles = (rows: number, cols: number, isSafe: boolean) => {
        return Array(rows).fill(0).map((_, row) => (
            <div key={`row-${row}`} className={styles.row}>
                {Array(cols).fill(0).map((_, col) => (
                    <div 
                        key={`tile-${row}-${col}`} 
                        className={styles.tile}
                    >
                        <img 
                            src={isSafe ? '/parts/safeTile.png' : '/parts/tile.png'} 
                            alt="tile" 
                            className={styles.tileImage}
                            draggable={false}
                        />
                        {renderCurrentPart(row, col)}
                    </div>
                ))}
            </div>
        ));
    };

    return (
        <div className={styles.grid}>
            {renderTiles(5, 25, true)}  {/* セーフエリア */}
            {renderTiles(25, 25, false)}  {/* 通常エリア */}
        </div>
    )
} 