"use client"; // クライアントコンポーネントとしてマーク

import React, { useState, useRef } from 'react';
import Image from 'next/image';

const MapPage = () => {
  // 初期位置をさらに上に設定
  const [position, setPosition] = useState({ x: window.innerWidth / 1.5, y: -900 }); // y座標を-500に設定
  // 初期スケールをさらに拡大された状態に設定
  const [scale, setScale] = useState(10); // 初期スケールを8に設定
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });
  const japanImageRef = useRef<HTMLDivElement>(null);

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

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        backgroundImage: 'url(/background/ocean.png)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        ref={japanImageRef} // useRefを使用して参照を設定
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x,
          transform: `scale(${scale})`,
          cursor: dragging ? 'grabbing' : 'grab',
          width: '50%',
          height: '50%'
        }}
        onMouseDown={handleMouseDown}
      >
        <Image 
          src="/japan/defaultjapan.png" 
          alt="Japan" 
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: 'contain'
          }}
        />
      </div>
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <button onClick={handleZoomOut} style={buttonStyle}>-</button>
        <button onClick={handleZoomIn} style={buttonStyle}>+</button>
      </div>
    </div>
  );
};

const buttonStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: 'none',
  backgroundColor: '#fff',
  boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
  cursor: 'pointer',
  fontSize: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default MapPage;
