import styles from './ScorePanel.module.css'

export default function ScorePanel() {
    return (
        <div className={styles.scorePanelContainer}>
            <div className={styles.scorePanelInner}>
                <div className={styles.scoreTitle}>現在のスコア</div>
                <div className={styles.scoreValue}>0</div>
                <div className={styles.scoreUnit}>pt</div>
            </div>
        </div>
    )
} 