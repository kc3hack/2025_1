'use client'

import { useEffect } from 'react';
import styles from './GameGrid.module.css'
import { usePartsStore } from '@/app/store/partsStore';
import { Position, GridState } from '@/app/types/Part';
import { getPartImagePaths } from '@/app/types/Part';

interface GameGridProps {
    readOnly?: boolean;
    gridState?: GridState | null;
}

export default function GameGrid({ readOnly, gridState }: GameGridProps) {
    const { currentPart, currentPosition, placedParts, initializeGame, moveCurrentPart, placePart } = usePartsStore();

    // gridStateが提供された場合はそれを使用し、そうでない場合はstoreのgridStateを使用
    const storeGridState = usePartsStore(state => state.gridState);
    const displayGrid = gridState || storeGridState;

    useEffect(() => {
        // readOnlyモードでない場合のみ初期化
        if (!readOnly) {
            initializeGame();
        }
    }, [initializeGame, readOnly]);

    useEffect(() => {
        if (readOnly) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowLeft':
                    moveCurrentPart('left');
                    break;
                case 'ArrowRight':
                    moveCurrentPart('right');
                    break;
                case 'ArrowDown':
                    moveCurrentPart('down');
                    break;
                case 'ArrowUp':
                    moveCurrentPart('up');
                    break;
                case 'Enter':
                    placePart();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [moveCurrentPart, placePart, readOnly]);

    const renderPlacedParts = (row: number, col: number) => {
        // 設置済みパーツの描画
        for (const part of placedParts) {
            if (!part.position) continue;

            const relativeRow = row - part.position.y;
            const relativeCol = col - part.position.x;

            if (relativeRow >= 0 && relativeRow < 5 && 
                relativeCol >= 0 && relativeCol < 5) {
                const cell = part.grid[relativeRow][relativeCol];
                if (cell === 0) continue;

                // プレビューモードまたはゲーム完了時は全てのセルを通常パーツとして表示
                if ((readOnly || usePartsStore.getState().isCompleted) && cell === 2) {
                    return (
                        <div className={styles.partCell}>
                            <img 
                                src={part.imageUrl}
                                alt="part" 
                                className={styles.partImage}
                                draggable={false}
                            />
                        </div>
                    );
                }

                // 通常モードの場合は従来通りの表示ルール
                let imageUrl = part.imageUrl;
                if (cell === 2) {
                    const isFirstPart = part === placedParts[0];
                    const isDockUsed = part.usedDocks.has(`${relativeCol},${relativeRow}`);
                    const imagePaths = getPartImagePaths(part.rarity);
                    
                    if (isFirstPart && !isDockUsed && placedParts.length > 1) {
                        imageUrl = imagePaths.dockLast;
                    } else {
                        imageUrl = imagePaths.dock;
                    }
                }

                return (
                    <div className={styles.partCell}>
                        <img 
                            src={imageUrl}
                            alt="part" 
                            className={styles.partImage}
                            draggable={false}
                        />
                    </div>
                );
            }
        }
        return null;
    };

    const renderCurrentPart = (row: number, col: number, isSafe: boolean) => {
        if (!currentPart || !currentPart.grid || !currentPosition) return null;
        
        // パーツの位置を計算
        let pos: Position | undefined;
        if (isSafe && currentPosition.safeTile) {
            pos = currentPosition.safeTile;
        } else if (!isSafe && currentPosition.tile) {
            pos = currentPosition.tile;
        }
        if (!pos) return null;

        const relativeRow = row - pos.y;
        const relativeCol = col - pos.x;

        if (relativeRow < 0 || relativeRow >= 5 || relativeCol < 0 || relativeCol >= 5) {
            return null;
        }

        const cell = currentPart.grid[relativeRow][relativeCol];
        if (cell === 0) return null;

        const imagePaths = getPartImagePaths(currentPart.rarity);
        const imageUrl = cell === 1 ? currentPart.imageUrl : 
                        cell === 2 ? imagePaths.dock : '';

        return (
            <div className={`${styles.partCell} ${styles.partCellActive}`}>
                <img 
                    src={imageUrl}
                    alt="part" 
                    className={styles.partImage}
                    draggable={false}
                />
            </div>
        );
    };

    const renderTiles = (rows: number, cols: number, isSafe: boolean) => {
        return Array(rows).fill(0).map((_, row) => (
            <div key={`row-${row}`} className={styles.row}>
                {Array(cols).fill(0).map((_, col) => (
                    <div 
                        key={`tile-${row}-${col}`} 
                        className={`${styles.tile} ${readOnly ? styles.readOnlyTile : ''}`}
                    >
                        {!readOnly && (
                            <img 
                                src={isSafe ? '/parts/safeTile.png' : '/parts/tile.png'} 
                                alt="tile" 
                                className={styles.tileImage}
                                draggable={false}
                            />
                        )}
                        {!isSafe && renderPlacedParts(row, col)}
                        {renderCurrentPart(row, col, isSafe)}
                    </div>
                ))}
            </div>
        ));
    };

    return (
        <div className={`${styles.grid} ${readOnly ? styles.readOnlyGrid : ''}`}>
            {renderTiles(5, 25, true)}   {/* セーフエリア */}
            {renderTiles(25, 25, false)} {/* 通常エリア */}
        </div>
    )
}