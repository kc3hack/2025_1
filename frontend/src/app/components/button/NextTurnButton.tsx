"use client";

import { useState } from 'react';
import styles from './NextTurnButton.module.css';

interface NextTurnButtonProps {
  onProcessingChange: (isProcessing: boolean) => void;
}

const NextTurnButton = ({ onProcessingChange }: NextTurnButtonProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = () => {
    const newProcessingState = true;
    setIsProcessing(newProcessingState);
    onProcessingChange(newProcessingState);  // 親コンポーネントに通知
  };

  const handleCancel = () => {
    const newProcessingState = false;
    setIsProcessing(newProcessingState);
    onProcessingChange(newProcessingState);  // 親コンポーネントに通知
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
            <div className={styles.nextButtonTitle}>作成スタート</div>
          </>
        )}
      </div>
      <div className={styles.nextButtonBackground} />
      {isProcessing && (
        <button 
          className={styles.cancelButton}
          onClick={handleCancel}
        >
          <div className={styles.cancelButtonInner} />
          <div className={styles.cancelButtonBackground} />
          <span className={styles.cancelButtonText}>キャンセル</span>
        </button>
      )}
    </div>
  );
};

export default NextTurnButton; 