'use client'; // クライアントコンポーネントとしてマーク

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import FortressDisplay from '../../components/FortressDisplay';

interface Fortress {
  id: number;
  name: string;
  score: number;
  parts: Array<{
    id: string;
    x: number;
    y: number;
    rotation: number;
    grid: number[][];
  }>;
}

const TombsCollection: React.FC = () => {
  const [fortresses, setFortresses] = useState<Fortress[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFortresses = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fortresses/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch fortresses');
        
        const data = await response.json();
        setFortresses(data.fortresses);
      } catch (error) {
        console.error('Failed to fetch fortresses:', error);
      }
    };

    fetchFortresses();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>古墳コレクション</h1>
        </div>
        <div className={styles.gridContainer}>
          <div className={styles.grid}>
            {fortresses.map((fortress) => (
              <div key={fortress.id} className={styles.gridItem}>
                <FortressDisplay parts={fortress.parts} />
              </div>
            ))}
          </div>
        </div>
        <button className={styles.backButton} onClick={() => router.push('/map')}>
          戻る
        </button>
      </div>
    </div>
  );
};

export default TombsCollection;