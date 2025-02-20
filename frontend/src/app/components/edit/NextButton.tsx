'use client'

import styles from './NextButton.module.css'
import { usePartsStore } from '@/app/store/partsStore'
import { useEffect } from 'react'

type ButtonPosition = 'left' | 'center' | 'right'
type ButtonType = 'retire' | 'rotate' | 'place'

interface NextButtonProps {
    type: ButtonType
    position: ButtonPosition
    text: string
    onClick?: () => void
}

export default function NextButton({ type, position, text, onClick }: NextButtonProps) {
    const { rotatePart } = usePartsStore();

    useEffect(() => {
        if (type === 'rotate') {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.code === 'Space') {
                    e.preventDefault();
                    rotatePart();
                }
            };

            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [type, rotatePart]);

    const buttonClass = `${styles.button} ${styles[type]} ${styles[position]}`
    
    return (
        <div className={buttonClass} onClick={onClick}>
            <div className={styles.buttonInner}></div>
            <div className={styles.buttonContainer}>
                <span className={styles.buttonText}>{text}</span>
            </div>
        </div>
    )
} 