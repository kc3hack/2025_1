"use client"; // クライアントコンポーネントとしてマーク

import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/app/store/modalStore';
import Menu from '../components/menu/ListMenu';
import DominationMenu from '../components/menu/DominationMenu';
import ZoomControls from '../components/menu/ZoomControls';
import RegionMasks from '../components/mapOption/RegionMasks';
import DraggableMap from '../components/mapOption/DraggableMap';
import NextTurnButton from '../components/button/NextTurnButton';

const MapPage = () => {
  const [position, setPosition] = useState({ x: -200, y: -2400 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [scale, setScale] = useState(20);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentMarking, setCurrentMarking] = useState<{ x: number; y: number } | null>(null);
  
  const { showCompletionModal, setShowCompletionModal } = useModalStore();
  const router = useRouter();
  const markingResetRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setPosition({ x: (window.innerWidth / 12) - 200, y: -2400 });
    setIsLoaded(true);

    const handleResize = () => {
      setPosition({ x: (window.innerWidth / 12) - 200, y: -2400 });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      setShowCompletionModal(false);
    };
  }, [setShowCompletionModal]);

  const handleImageError = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
    console.error('画像の読み込みに失敗しました:', (e.target as HTMLDivElement).style.backgroundImage);
  };

  const handleMarkingComplete = (marking: { x: number; y: number }) => {
    setCurrentMarking(marking);
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    // OKの場合、編集ページへ遷移
    router.push('/edit');
  };

  const handleCancel = () => {
    // キャンセルの場合、画面をリロード
    setCurrentMarking(null);
    setShowConfirmModal(false);
    setIsProcessing(true);
    // 画面をリロード
    window.location.reload();
  };

  const handleMarkingReset = () => {
    markingResetRef.current?.();
  };

  return (
    <div className={styles.container}>
      <RegionMasks 
        onError={handleImageError}
        isProcessing={isProcessing}
        position={position}
        scale={scale}
        isLoaded={isLoaded}
        onPositionChange={setPosition}
        onMarkingComplete={handleMarkingComplete}
        onMarkingReset={handleMarkingReset}
      />

      <Menu />

      <DominationMenu />

      <ZoomControls 
        onScaleChange={setScale}
        initialScale={20}
      />

      <NextTurnButton 
        onProcessingChange={setIsProcessing}
      />

      {showCompletionModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>パーツ完成！</h2>
            <p>新しいパーツが追加されました</p>
            <button 
              onClick={() => setShowCompletionModal(false)}
              className={styles.closeButton}
            >
              閉じる
            </button>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalFrame} />
            <div className={styles.modalContent}>
              <h2>マーキング位置の確認</h2>
              <p>この位置で決定しますか？</p>
              <div className={styles.modalButtons}>
                <div className={styles.buttonContainer}>
                  <div className={styles.buttonFrame} />
                  <button 
                    onClick={handleCancel}
                    className={styles.cancelButton}
                  >
                    キャンセル
                  </button>
                </div>
                <div className={styles.buttonContainer}>
                  <div className={styles.buttonFrame} />
                  <button 
                    onClick={handleConfirm}
                    className={styles.confirmButton}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;
