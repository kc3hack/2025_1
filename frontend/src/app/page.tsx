import React from 'react';
import styles from './styles.module.css';

const StartPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>古墳メーカー</h1>
        </div>
        <form className={styles.form}>
          <div>
            <input
              type="text"
              placeholder="ユーザー名"
              className={styles.input}
            />
          </div>
          <div className="mt-10">
            <input
              type="password"
              placeholder="パスワード"
              className={styles.input}
            />
          </div>
          <div>
            <button
              type="submit"
              className={styles.button}
            >
              ゲームスタート
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StartPage;