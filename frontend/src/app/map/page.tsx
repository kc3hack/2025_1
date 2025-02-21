"use client"; // クライアントコンポーネントとしてマーク

import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/app/store/modalStore';
import Menu from '../components/menu/ListMenu';
import DominationMenu from '../components/menu/DominationMenu';
import ZoomControls from '../components/menu/ZoomControls';

const MapPage = () => {
  // 初期表示を制御するstate
  const [isLoaded, setIsLoaded] = useState(false);
  const [position, setPosition] = useState({ x: 800, y: -900 });
  const [scale, setScale] = useState(10);
  
  const { showCompletionModal, setShowCompletionModal } = useModalStore();

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

  // 各地域の表示状態を管理する変数
  const [showMaskedKansai, setShowMaskedKansai] = useState(false);
  const [showMaskedKanto, setShowMaskedKanto] = useState(true);
  const [showMaskedKyushu, setShowMaskedKyushu] = useState(true);
  const [showMaskedTohoku, setShowMaskedTohoku] = useState(true);
  const [showMaskedChubu, setShowMaskedChubu] = useState(true);
  const [showMaskedChugoku, setShowMaskedChugoku] = useState(true);
  const [showMaskedShikoku, setShowMaskedShikoku] = useState(true);

  const handleZoomIn = () => {
    setScale(prevScale => Math.min(prevScale * 1.2, 15)); // 拡大度合いを細かくし、最大値を15に設定
  };

  const handleZoomOut = () => {
    setScale(prevScale => Math.max(prevScale / 1.2, 0.5)); // 縮小度合いを細かくし、最小値を0.5に設定
  };

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
          className={styles.mapImage}
          style={{ backgroundImage: 'url(/japan/defaultJapan.png)' }}
          onError={handleImageError}
        />
        {showMaskedKansai && (
          <div className={styles.mapImage} style={{ backgroundImage: 'url(/japan/mask/maskedKansai.png)' }} />
        )}
        {showMaskedKanto && (
          <div className={styles.mapImage} style={{ backgroundImage: 'url(/japan/mask/maskedKanto.png)' }} />
        )}
        {showMaskedKyushu && (
          <div className={styles.mapImage} style={{ backgroundImage: 'url(/japan/mask/maskedKyushu.png)' }} />
        )}
        {showMaskedTohoku && (
          <div className={styles.mapImage} style={{ backgroundImage: 'url(/japan/mask/maskedTohoku.png)' }} />
        )}
        {showMaskedChubu && (
          <div className={styles.mapImage} style={{ backgroundImage: 'url(/japan/mask/maskedChubu.png)' }} />
        )}
        {showMaskedChugoku && (
          <div className={styles.mapImage} style={{ backgroundImage: 'url(/japan/mask/maskedChugoku.png)' }} />
        )}
        {showMaskedShikoku && (
          <div className={styles.mapImage} style={{ backgroundImage: 'url(/japan/mask/maskedShikoku.png)' }} />
        )}
      </div>

      {/* メニューコンポーネントを使用 */}
      <Menu />

      {/* 統治度表示コンポーネント */}
      <DominationMenu />

      {/* 拡大縮小コントロール */}
      <ZoomControls 
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
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
