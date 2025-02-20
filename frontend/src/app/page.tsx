'use client'; // クライアントコンポーネントとしてマーク

import React from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';

const StartPage: React.FC = () => {

  const router = useRouter();
  const goToMap = () => {
    router.push('/map');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>古  墳  メ  ー  カ  ー</div>
        </div>
        <div className={styles.form}>
          <div className={styles.userName}>
            <input
              type="text"
              placeholder="ユーザー名"
              className={styles.input}
            />
            <div className={styles.userNameBackground} />
          </div>
          <div className={styles.password}>
            <input
              type="password"
              placeholder="パスワード"
              className={styles.input}
            />
          <div className={styles.passWordBackground} />
          </div>
          <button
            type="submit"
            className={styles.button} onClick={goToMap}
          >
            ゲームスタート
          </button>
          <div className={styles.buttonBackground} />
        </div>
      </div>
    </div>
  );
};

export default StartPage;