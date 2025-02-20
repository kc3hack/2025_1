import React from 'react';
import styles from './styles.module.css';

const Reward: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            ★報酬だよ！！★
          </div>
        </div>
        <div className={styles.rewardCardContainer}>
        <div className={styles.rewardCard}>
            <div className={styles.rewardTopOut}>
              <div className={styles.rewardTopIn}>
                <div className={styles.rank}>
                  ★１
                </div>
                <div className={styles.shape}>
                  shape1
                </div>
              </div>
            </div>
            <div className={styles.rewardBottom}>
              <button className={styles.get}>
                受け取る！
              </button>
            </div>
          </div>
          <div className={styles.rewardCard}>
            <div className={styles.rewardTopOut}>
              <div className={styles.rewardTopIn}>
                <div className={styles.rank}>
                  ★２
                </div>
                <div className={styles.shape}>
                  shape2
                </div>
              </div>
            </div>
            <div className={styles.rewardBottom}>
              <button className={styles.get}>
                受け取る！
              </button>
            </div>
          </div>
          <div className={styles.rewardCard}>
            <div className={styles.rewardTopOut}>
              <div className={styles.rewardTopIn}>
                <div className={styles.rank}>
                  ★３
                </div>
                <div className={styles.shape}>
                  shape3
                </div>
              </div>
            </div>
            <div className={styles.rewardBottom}>
              <button className={styles.get}>
                受け取る！
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Reward;