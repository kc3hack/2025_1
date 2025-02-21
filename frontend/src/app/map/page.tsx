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
  // 初期表示を制御するstate
  const [isLoaded, setIsLoaded] = useState(false);
  const [position, setPosition] = useState({ x: 800, y: -900 });
  
  const { showCompletionModal, setShowCompletionModal } = useModalStore();

  const [scale, setScale] = useState(10);

  useEffect(() => {
    setPosition({ 
      x: window.innerWidth / 1.5, 
      y: -900 
    });
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

  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });
  const japanImageRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // 左クリックのみ
    const pos = { x: e.pageX - position.x, y: e.pageY - position.y };
    setRel(pos);
    setDragging(true);
    e.stopPropagation();
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setPosition({ x: e.pageX - rel.x, y: e.pageY - rel.y });
    e.stopPropagation();
    e.preventDefault();
  };

  // デバッグ用のエラーハンドリングを追加
  const handleImageError = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
    console.error('画像の読み込みに失敗しました:', (e.target as HTMLDivElement).style.backgroundImage);
  };

  return (
    <div 
      className={styles.container}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <DraggableMap
        position={position}
        scale={scale}
        isLoaded={isLoaded}
        dragging={dragging}
        onMouseDown={handleMouseDown}
      >
        <RegionMasks onError={handleImageError} />
      </DraggableMap>

      <Menu />

      <DominationMenu />

      <ZoomControls 
        onScaleChange={setScale}
        initialScale={10}
      />

      <NextTurnButton />

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
