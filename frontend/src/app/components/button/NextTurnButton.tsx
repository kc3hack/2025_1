"use client";

import { useState } from 'react';
import styles from './NextTurnButton.module.css';

interface NextTurnButtonProps {
  onProcessingChange: (isProcessing: boolean) => void;
}

const NextTurnButton = ({ onProcessingChange }: NextTurnButtonProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = () => {
    if (!isProcessing) {
      // 通常状態からProcessingへ
      setIsProcessing(true);
      onProcessingChange(true);
    } else {
      // キャンセル処理
      setIsProcessing(false);
      onProcessingChange(false);
      // 画面をリロード
      window.location.reload();
    }
  };

  return (
    <div className={styles.nextButton}>
      <div className={styles.nextButtonInner} onClick={handleClick}>
        {!isProcessing ? (
          <>
            <div className={styles.nextButtonTitle}>勢力を拡大する</div>
            <div>ランダム数: 10</div>
          </>
        ) : (
          <>
            <div className={styles.nextButtonTitle}>キャンセル</div>
          </>
        )}
      </div>
      <div className={styles.nextButtonBackground} />
    </div>
  );
};

export default NextTurnButton; 