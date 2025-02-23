'use client'; // クライアントコンポーネントとしてマーク

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import FortressDisplay from '../../components/FortressDisplay';

interface TopFortress {
  name: string;
  score: number;
  parts: Array<{
    id: string;
    x: number;
    y: number;
    rotation: number;
    grid: number[][];
  }>;
  user: {
    user_name: string;
  };
}

const ScoreCollection: React.FC = () => {
  const [topFortresses, setTopFortresses] = useState<TopFortress[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTopScores = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fortresses/top-scores`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch top scores');
        
        const data = await response.json();
        setTopFortresses(data.topFortresses);
      } catch (error) {
        console.error('Failed to fetch top scores:', error);
      }
    };

    fetchTopScores();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>スコア一覧</div>
        </div>
        <div className={styles.rankContainer}>
          {topFortresses.map((fortress, index) => (
            <div key={index} className={styles.rank}>{index + 1}st</div>
          ))}
        </div>
        <div className={styles.shapeContainer}>
          {topFortresses.map((fortress, index) => (
            <div key={index} className={styles.shapeItem}>
              <FortressDisplay
                parts={fortress.parts}
              />
            </div>
          ))}
        </div>
        <div className={styles.scoreContainer}>
          {topFortresses.map((fortress, index) => (
            <div key={index} className={styles.score}>{fortress.score}pt</div>
          ))}
        </div>
        <button className={styles.backButton} onClick={() => router.push('/map')}>
          戻る
        </button>
      </div>
    </div>
  );
};

export default ScoreCollection;