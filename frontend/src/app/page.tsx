'use client'; // クライアントコンポーネントとしてマーク

import React, { useState } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';

const API_URL = 'http://localhost:3002';  // 一時的な対応

const StartPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const goToMap = async () => {
    if (!userName || !password) {
      setErrorMessage('ユーザー名とパスワードを入力してください');
      return;
    }

    try {
      console.log('認証を試みています:', userName);
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
        credentials: 'omit',
      });

      console.log('Response status:', response.status);

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        console.error('認証エラー:', data);
        setErrorMessage(data.error || '認証に失敗しました');
        return;
      }

      console.log(`✅ ${data.message}`);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      router.push('/map');
    } catch (error) {
      console.error('認証エラー:', error);
      setErrorMessage('サーバーとの通信に失敗しました。しばらく待ってから再試行してください。');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>新   古   墳   時   代</div>
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