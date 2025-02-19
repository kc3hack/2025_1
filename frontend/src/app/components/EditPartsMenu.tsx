import styles from './EditPartsMenu.module.css'

export default function EditPartsMenu() {
    return (
        <div className={styles.editMenuContainer}>
            <div className={styles.editMenuInner}>
                <div className={styles.partsTitle}>設置パーツ</div>
                <div className={styles.nextPartsInner}></div>
                <div className={styles.nextPartsContainer}></div>
                <div className={styles.nextPartsTitle}>次のパーツ</div>
                <div className={styles.nextPartsInner2}></div>
                <div className={styles.nextPartsContainer2}></div>
                <div className={styles.remainingParts}>
                    残りパーツ<br/>10個
                </div>
                <div className={styles.nextButtonInner}></div>
                <div className={styles.nextButtonContainer}></div>
                <div className={styles.buttonText}>パーツ一覧</div>
            </div>
        </div>
    )
} 