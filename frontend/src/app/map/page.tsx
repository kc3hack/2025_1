"use client"; // クライアントコンポーネントとしてマーク

import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/app/store/modalStore';
import Menu from '../components/menu/ListMenu';
import DominationMenu from '../components/menu/DominationMenu';
import ZoomControls from '../components/menu/ZoomControls';
import RegionMasks, { useRegionMasks } from '../components/mapOption/RegionMasks';
import mapStyles from '../components/mapOption/RegionMasks.module.css';

const MapPage = () => {
  // 初期表示を制御するstate
  const [isLoaded, setIsLoaded] = useState(false);
  const [position, setPosition] = useState({ x: 800, y: -900 });
  
  const { showCompletionModal, setShowCompletionModal } = useModalStore();
  const regionMasks = useRegionMasks();

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
      <div
        ref={japanImageRef}
        className={`${styles.japanMap} ${dragging ? styles.dragging : ''}`}
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
          transform: `scale(${scale})`,
          opacity: isLoaded ? 1 : 0,
        }}
        onMouseDown={handleMouseDown}
      >
        <div 
          className={mapStyles.mapImage}
          style={{ backgroundImage: 'url(/japan/defaultJapan.png)' }}
          onError={handleImageError}
        />
        <RegionMasks {...regionMasks} />
      </div>

      {/* メニューコンポーネントを使用 */}
      <Menu />

      {/* 統治度表示コンポーネント */}
      <DominationMenu />

      {/* 拡大縮小コントロール */}
      <ZoomControls 
        onScaleChange={setScale}
        initialScale={10}
      />

      {/* 右下の原寸画像とその背景 */}
      <div className={styles.nextButton}>
        <div className={styles.nextButtonInner}>
          <div className={styles.nextButtonTitle}>勢力を拡大する</div>
          <div>ランダム数: 10</div>
        </div>
        <div className={styles.nextButtonBackground} />
      </div>

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
