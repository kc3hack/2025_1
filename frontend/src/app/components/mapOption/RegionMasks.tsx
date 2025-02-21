"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './RegionMasks.module.css';

interface BaseMapProps {
  onError?: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void;
  isProcessing?: boolean;
  position: { x: number; y: number };
  scale: number;
  isLoaded: boolean;
  onPositionChange: (position: { x: number; y: number }) => void;
}

const RegionMasks = ({ 
  onError, 
  isProcessing = false,
  position,
  scale,
  isLoaded,
  onPositionChange
}: BaseMapProps) => {
  const [showMaskedKansai, setShowMaskedKansai] = useState(false);
  const [showMaskedKanto, setShowMaskedKanto] = useState(true);
  const [showMaskedKyushu, setShowMaskedKyushu] = useState(true);
  const [showMaskedTohoku, setShowMaskedTohoku] = useState(true);
  const [showMaskedChubu, setShowMaskedChubu] = useState(true);
  const [showMaskedChugoku, setShowMaskedChugoku] = useState(true);
  const [showMaskedShikoku, setShowMaskedShikoku] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [markings, setMarkings] = useState<{ x: number; y: number; timestamp: string }[]>([]);

  useEffect(() => {
    const img = new Image();
    img.src = '/japan/defaultJapan.png';
    img.onload = () => {
      imageRef.current = img;
      drawMap();
      drawMasks();
    };
  }, []);

  useEffect(() => {
    drawMasks();
  }, [showMaskedKansai, showMaskedKanto, showMaskedKyushu, showMaskedTohoku, showMaskedChubu, showMaskedChugoku, showMaskedShikoku]);

  const drawMap = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // キャンバスサイズを2倍に拡大
    canvas.width = img.width * 2;
    canvas.height = img.height * 2;
    
    // 画像を拡大して描画
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  const drawMasks = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const drawMask = (maskName: string) => {
      const maskImg = new Image();
      maskImg.src = `/japan/mask/masked${maskName}.png`;
      maskImg.onload = () => {
        // マスクも同じサイズで描画
        ctx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);
      };
    };

    if (showMaskedKansai) drawMask('Kansai');
    if (showMaskedKanto) drawMask('Kanto');
    if (showMaskedKyushu) drawMask('Kyushu');
    if (showMaskedTohoku) drawMask('Tohoku');
    if (showMaskedChubu) drawMask('Chubu');
    if (showMaskedChugoku) drawMask('Chugoku');
    if (showMaskedShikoku) drawMask('Shikoku');
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
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
    onPositionChange({ x: e.pageX - rel.x, y: e.pageY - rel.y });
    e.stopPropagation();
    e.preventDefault();
  };

  const handleCanvasClick = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isProcessing || !canvasRef.current) {
      console.log('処理モードが無効です');
      return;
    }

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    // スケーリングを考慮したクリック位置の計算
    const scaleRatio = scale / 10;
    const x = (e.clientX - rect.left) / scaleRatio;
    const y = (e.clientY - rect.top) / scaleRatio;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // defaultJapanの非透過部分（陸地）かチェック
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const isLand = pixel[3] > 0;

    if (!isLand) {
      console.log('海域のクリック');
      return;
    }

    // マスクされているかチェック
    const isMasked = await checkMaskAtPosition(x, y);
    if (isMasked) {
      console.log('マスク領域のクリック');
      return;
    }

    // ピンを追加（陸地でマスクなし）
    const newMarking = {
      x,
      y,
      timestamp: `marking-${Date.now()}-${markings.length}`
    };
    setMarkings(prev => [...prev, newMarking]);
    drawMarking(ctx, x, y);
    console.log('マーキング追加:', {
      position: { x: Math.round(x), y: Math.round(y) },
      scale: scaleRatio,
      markingNumber: markings.length + 1,
      timestamp: new Date().toLocaleTimeString()
    });
  };

  const checkMaskAtPosition = async (x: number, y: number): Promise<boolean> => {
    const masks = [
      { name: 'Kansai', show: showMaskedKansai },
      { name: 'Kanto', show: showMaskedKanto },
      { name: 'Kyushu', show: showMaskedKyushu },
      { name: 'Tohoku', show: showMaskedTohoku },
      { name: 'Chubu', show: showMaskedChubu },
      { name: 'Chugoku', show: showMaskedChugoku },
      { name: 'Shikoku', show: showMaskedShikoku }
    ];

    for (const mask of masks) {
      if (mask.show) {
        const isInMask = await isPointInMask(mask.name, x, y);
        if (isInMask) return true;
      }
    }
    return false;
  };

  const isPointInMask = async (maskName: string, x: number, y: number): Promise<boolean> => {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return false;

    const img = new Image();
    img.src = `/japan/mask/masked${maskName}.png`;

    return new Promise<boolean>((resolve) => {
      img.onload = () => {
        // キャンバスサイズを現在のcanvasと同じに設定
        const canvas = canvasRef.current;
        if (!canvas) {
          resolve(false);
          return;
        }
        
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        
        // マスク画像を同じスケールで描画
        tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
        const pixel = tempCtx.getImageData(x, y, 1, 1).data;
        resolve(pixel[3] > 0); // アルファ値が0より大きければマスク領域
      };
    });
  };

  const drawMarking = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
  };

  return (
    <div 
      className={styles.mapContainer}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${scale / 10})`,
        opacity: isLoaded ? 1 : 0,
        cursor: dragging ? 'grabbing' : 'grab'
      }}
    >
      <canvas
        ref={canvasRef}
        className={`${styles.mapCanvas} ${isProcessing ? styles.clickable : ''}`}
        onClick={handleCanvasClick}
      />
    </div>
  );
};

export default RegionMasks; 