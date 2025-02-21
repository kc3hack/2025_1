import styles from './TipsPanel.module.css'

interface TipsPanelProps {
    tip: string;
}

export default function TipsPanel({ tip }: TipsPanelProps) {
    return (
        <div className={styles.tipsPanelContainer}>
            <div className={styles.tipsPanelInner}>
                <div className={styles.tipsTitle}>Tips</div>
                <div className={styles.tipsContent}>
                    {tip}
                </div>
            </div>
        </div>
    )
}