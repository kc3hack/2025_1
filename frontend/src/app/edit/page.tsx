import styles from './styles.module.css'

export default function EditPage() {
    return (
        <div className={styles.container}>
            <div className={styles.editMenuContainer}>
                <div className={styles.editMenuInner}>
                    <div className={styles.partsTitle}>設置パーツ</div>
                    <div className={styles.nextPartsInner}></div>
                    <div className={styles.nextPartsContainer}></div>
                    <div className={styles.nextPartsInner2}></div>
                    <div className={styles.nextPartsContainer2}></div>
                </div>
            </div>
        </div>
    )
}
