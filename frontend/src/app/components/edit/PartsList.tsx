'use client'

import { useEffect, useRef } from 'react';
import styles from './PartsList.module.css';

interface PartsListProps {
    onClose: () => void;
}

export default function PartsList({ onClose }: PartsListProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (frameRef.current && !frameRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (typeof window !== 'undefined') {
            document.addEventListener('mousedown', handleClickOutside);

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
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
                        {/* ここにパーツリストのコンテンツを追加 */}
                    </div>
                </div>
            </div>
        </div>
    );
}
