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
  const [position, setPosition] = useState({ x: 800, y: -900 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [scale, setScale] = useState(10);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { showCompletionModal, setShowCompletionModal } = useModalStore();

  useEffect(() => {
    setPosition({ x: window.innerWidth / 1.5, y: -900 });
    setIsLoaded(true);

    const handleResize = () => {
      setPosition({ x: window.innerWidth / 1.5, y: -900 });
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

  return (
    <div className={styles.container}>
      <RegionMasks 
        onError={handleImageError}
        isProcessing={isProcessing}
        position={position}
        scale={scale}
        isLoaded={isLoaded}
        onPositionChange={setPosition}
      />

      <Menu />

      <DominationMenu />

      <ZoomControls 
        onScaleChange={setScale}
        initialScale={10}
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
    </div>
  );
};

export default MapPage;
