'use client'

import { useEffect, useRef } from 'react';
import styles from './PartsList.module.css';
import { usePartsStore } from '@/app/store/partsStore';
import { getPartImagePaths } from '@/app/types/Part';

interface PartsListProps {
    onClose: () => void;
}

export default function PartsList({ onClose }: PartsListProps) {
    const { availableParts } = usePartsStore();
    const modalRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (frameRef.current && 
                !frameRef.current.contains(event.target as Node) && 
                event.target instanceof Node) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className={styles.overlay}>
            <div className={styles.modal} ref={modalRef}>
                <div className={styles.whiteBackground} />
                <div className={styles.frameContainer} ref={frameRef}>
                    <button className={styles.backButton} onClick={onClose}>
                        ←
                    </button>
                    <div className={styles.content}>
                        <div className={styles.partsGrid}>
                            {availableParts.map((part, index) => (
                                <div key={part.id} className={styles.partItemContainer}>
                                    <div className={styles.partItem}>
                                        {part.grid.map((row, i) => (
                                            <div key={i} className={styles.partRow}>
                                                {row.map((cell, j) => (
                                                    <div key={j} className={styles.partCell}>
                                                        {cell !== 0 && (
                                                            <img 
                                                                src={cell === 1 ? part.imageUrl : getPartImagePaths(part.rarity).dock}
                                                                alt="part"
                                                                className={styles.partImage}
                                                                draggable={false}
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    {index < availableParts.length - 1 && (index + 1) % 3 !== 0 && (
                                        <div className={styles.arrow}>→</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
