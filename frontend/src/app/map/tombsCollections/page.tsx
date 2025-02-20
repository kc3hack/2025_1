'use client'; // クライアントコンポーネントとしてマーク

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

const TombsCollection: React.FC = () => {
  const parts = Array.from({ length: 64 }, (_, index) => `Part ${index + 1}`);
  const router = useRouter();

  const goToMap = () => {
    router.push('/map');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>古墳コレクション</h1>
        </div>
        <div className={styles.gridContainer}>
          <div className={styles.grid}>
            {parts.map((part, index) => (
              <div key={index} className={styles.gridItem}>
                {part}
              </div>
            ))}
          </div>
        </div>
        <button className={styles.backButton} onClick={goToMap}>
          戻る
        </button>
        <div className={styles.backButtonFrame} />
      </div>
    </div>
  );
};

export default TombsCollection;