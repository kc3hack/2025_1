'use client'

import styles from './EditPartsMenu.module.css'

export default function EditPartsMenu() {
    const handleNextPartsClick = () => {
        console.log('次のパーツがクリックされました');
    };

    const handlePartsListClick = () => {
        console.log('パーツ一覧ボタンがクリックされました');
    };

    return (
        <div className={styles.editMenuContainer}>
            <div className={styles.editMenuInner}></div>
            <div className={styles.editMenuFrame}></div>
            
            <div className={styles.partsTitle}>設置パーツ</div>
            <div className={styles.nextPartsInner}></div>
            <button 
                className={styles.nextPartsContainer}
                onClick={handleNextPartsClick}
            ></button>
            <div className={styles.nextPartsTitle}>次のパーツ</div>
            <div className={styles.nextPartsInner2}></div>
            <div
                className={styles.nextPartsContainer2}
            ></div>
            <div className={styles.remainingParts}>
                残りパーツ<br/>10個
            </div>
            <div className={styles.nextButtonInner}></div>
            <button 
                className={styles.nextButtonContainer}
                onClick={handlePartsListClick}
            ></button>
            <div className={styles.buttonText}>パーツ一覧</div>
        </div>
    )
} 