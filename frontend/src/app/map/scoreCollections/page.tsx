import React from 'react';
import styles from './styles.module.css';

const ScoreCollection: React.FC = () => {
  const parts = [
    { rank: 1, shape: 'Part 1', score: 100 },
    { rank: 2, shape: 'Part 2', score: 90 },
    { rank: 3, shape: 'Part 3', score: 80 },
    // 必要に応じて他のパーツを追加
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className='titleContainer'>
          <div className={styles.title}>
            スコア一覧
          </div>
        </div>
        <div className={styles.rankContainer}>
          <div className={styles.rank}>1st</div>
          <div className={styles.rank}>2nd</div>
          <div className={styles.rank}>3rd</div>
        </div>
        <div className={styles.shapeContainer}>
          <div key={1} className={styles.shapeItem}>古墳１</div>
          <div key={2} className={styles.shapeItem}>古墳２</div>
          <div key={3} className={styles.shapeItem}>古墳３</div>
        </div>
        <div className={styles.scoreContainer}>
          <div className={styles.score}>100pt</div>
          <div className={styles.score}>50pt</div>
          <div className={styles.score}>30pt</div>
        </div>
        <button className={styles.button}>
          戻る
        </button>
      </div>
    </div>
  );
};

export default ScoreCollection;