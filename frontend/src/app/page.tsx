'use client'; // クライアントコンポーネントとしてマーク

import React, { useState } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';

const StartPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const goToMap = () => {
    if (userName && password) {
      router.push('/map');
    } else {
      setErrorMessage('ユーザー名とパスワードを入力してください。');
    }
  };

  const isFormValid = userName && password;

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
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setErrorMessage(''); // 入力時にエラーメッセージをクリア
              }}
            />
            <div className={styles.userNameBackground} />
          </div>
          <div className={styles.password}>
            <input
              type="password"
              placeholder="パスワード"
              className={styles.input}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage(''); // 入力時にエラーメッセージをクリア
              }}
            />
            <div className={styles.passWordBackground} />
          </div>
          <button
            type="submit"
            className={styles.button}
            onClick={goToMap}
            disabled={!isFormValid} // フォームが無効な場合はボタンを無効化
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