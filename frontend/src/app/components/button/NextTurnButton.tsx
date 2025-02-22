"use client";

import { useState } from 'react';
import styles from './NextTurnButton.module.css';

interface NextTurnButtonProps {
  onProcessingChange: (isProcessing: boolean) => void;
  randomPartsNum: number;
}

const NextTurnButton = ({ onProcessingChange, randomPartsNum }: NextTurnButtonProps) => {
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
            <div>ランダム数: {randomPartsNum}</div>
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