import styles from './TipsPanel.module.css'

export default function TipsPanel() {
    return (
        <div className={styles.tipsPanelContainer}>
            <div className={styles.tipsPanelInner}>
                <div className={styles.tipsTitle}>Tips</div>
                <div className={styles.tipsContent}>
                    ここにTipsの内容が入ります。
                </div>
            </div>
        </div>
    )
} 