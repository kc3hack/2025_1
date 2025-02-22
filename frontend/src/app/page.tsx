'use client'; // クライアントコンポーネントとしてマーク

import React, { useState } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';

const StartPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const goToMap = async () => {
    if (!userName || !password) {
      setErrorMessage('ログイン失敗');
      return;
    }

    try {
      console.log('Attempting authentication for user:', userName);
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Authentication failed:', errorData);
        setErrorMessage('認証に失敗しました');
        return;
      }

      const data = await response.json();
      console.log(`✅ ${data.status === 'login_success' ? 'ログイン' : '新規登録'}成功:`, data);
      
      // 認証成功時の処理
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      router.push('/map');
    } catch (error) {
      console.error('Error during authentication:', error);
      setErrorMessage('認証中にエラーが発生しました');
    }
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
          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={styles.button}
              onClick={goToMap}
            >
              ゲームスタート
            </button>
            <div className={styles.buttonBackground} />
          </div>
          {errorMessage && (
            <div className={styles.errorMessageContainer}>
              <div className={styles.errorMessage}>{errorMessage}</div>
              <div className={styles.errorMessageBackground} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartPage;