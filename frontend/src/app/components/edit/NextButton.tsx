import styles from './NextButton.module.css'

type ButtonPosition = 'left' | 'center' | 'right'
type ButtonType = 'retire' | 'rotate' | 'place'

interface NextButtonProps {
    type: ButtonType
    position: ButtonPosition
    text: string
}

export default function NextButton({ type, position, text }: NextButtonProps) {
    const buttonClass = `${styles.button} ${styles[type]} ${styles[position]}`
    
    return (
        <div className={buttonClass}>
            <div className={styles.buttonInner}></div>
            <div className={styles.buttonContainer}>
                <span className={styles.buttonText}>{text}</span>
            </div>
        </div>
    )
} 