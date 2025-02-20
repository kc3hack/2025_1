'use client'

import { useState } from 'react'
import styles from './EditPartsMenu.module.css'
import { usePartsStore } from '@/app/store/partsStore'
import { GamePart, getPartImagePaths } from '@/app/types/Part'
import PartsList from './PartsList'

export default function EditPartsMenu() {
    const { availableParts } = usePartsStore()
    const [showPartsList, setShowPartsList] = useState(false)

    // 残りパーツ数を計算（0未満にならないように）
    const remainingParts = Math.max(0, availableParts.length - 1)

    const handlePartsListClick = () => {
        setShowPartsList(true)
    }

    const handleClosePartsList = () => {
        setShowPartsList(false)
    }

    const renderPart = (part: GamePart | null, isNext: boolean) => {
        if (!part) return null;
        
        return (
            <div className={isNext ? styles.previewPartNext : styles.previewPartFurther}>
                {part.grid.map((row, i) => (
                    <div key={i} className={styles.previewRow}>
                        {row.map((cell, j) => (
                            <div key={j} className={isNext ? styles.previewCellNext : styles.previewCellFurther}>
                                {cell !== 0 && (
                                    <img 
                                        src={cell === 1 ? part.imageUrl : getPartImagePaths(part.rarity).dock}
                                        alt="part"
                                        className={styles.previewImage}
                                        draggable={false}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <div className={styles.editMenuContainer}>
                <div className={styles.editMenuInner}></div>
                <div className={styles.editMenuFrame}></div>
                
                <div className={styles.partsTitle}>次のパーツ</div>
                <div className={styles.nextPartsInner}>
                    {renderPart(availableParts[1], true)}
                </div>
                <div className={styles.nextPartsContainer}></div>

                <div className={styles.nextPartsTitle}>さらに次のパーツ</div>
                <div className={styles.nextPartsInner2}>
                    {renderPart(availableParts[2], false)}
                </div>
                <div className={styles.nextPartsContainer2}></div>

                <div className={styles.remainingParts}>
                    残りパーツ<br/>{remainingParts}個
                </div>

                <div className={styles.nextButtonInner}></div>
                <button 
                    className={styles.nextButtonContainer}
                    onClick={handlePartsListClick}
                ></button>
                <div className={styles.buttonText}>パーツ一覧</div>
            </div>

            {showPartsList && (
                <PartsList onClose={handleClosePartsList} />
            )}
        </>
    )
} 