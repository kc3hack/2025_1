"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './RegionMasks.module.css';
import DominationMenu from '../menu/DominationMenu';

interface BaseMapProps {
  onError?: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void;
  isProcessing?: boolean;
  position: { x: number; y: number };
  scale: number;
  isLoaded: boolean;
  onPositionChange: (position: { x: number; y: number }) => void;
  onMarkingComplete: (marking: { x: number; y: number; region: string }) => void;
  onMarkingReset?: () => void;
  dominationLevels: { [region: string]: number }; // 各地域の統治度を受け取る
}

const RegionMasks = ({ 
  onError, 
  isProcessing = false,
  position,
  scale,
  isLoaded,
  onPositionChange,
  onMarkingComplete,
  onMarkingReset,
  dominationLevels = {}
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
  const markingResetRef = useRef<() => void | undefined>(undefined);
  const animationFrameRef = useRef<number | null>(null);
  const hasReloadedRef = useRef(false); // リロードが一度だけ行われるようにするためのフラグ

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
  }, [showMaskedKansai, showMaskedKanto, showMaskedKyushu, showMaskedTohoku, showMaskedChubu, showMaskedChugoku, showMaskedShikoku, dominationLevels]);

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

    const drawMask = (maskName: string, colorful: boolean) => {
      const maskImg = new Image();
      maskImg.src = `/japan/mask/${colorful ? 'colorful' : 'masked'}${maskName}.png`;
      maskImg.onload = () => {
        // マスクも同じサイズで描画
        ctx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);
      };
    };

    // 特定の条件に基づいてマスクを無効にする
    const effectiveShowMaskedChubu = showMaskedChubu && !(dominationLevels.Kansai === 100);
    const effectiveShowMaskedChugoku = showMaskedChugoku && !(dominationLevels.Kansai === 100);
    const effectiveShowMaskedKanto = showMaskedKanto && !(dominationLevels.Chubu === 100);
    const effectiveShowMaskedTohoku = showMaskedTohoku && !(dominationLevels.Chubu === 100);
    const effectiveShowMaskedKyushu = showMaskedKyushu && !(dominationLevels.Chugoku === 100);
    const effectiveShowMaskedShikoku = showMaskedShikoku && !(dominationLevels.Chugoku === 100);

    const regions = [
      { id: 'Kansai', name: '関西', show: showMaskedKansai },
      { id: 'Kanto', name: '関東', show: effectiveShowMaskedKanto },
      { id: 'Kyushu', name: '九州', show: effectiveShowMaskedKyushu },
      { id: 'Tohoku', name: '東北', show: effectiveShowMaskedTohoku },
      { id: 'Chubu', name: '中部', show: effectiveShowMaskedChubu },
      { id: 'Chugoku', name: '中国', show: effectiveShowMaskedChugoku },
      { id: 'Shikoku', name: '四国', show: effectiveShowMaskedShikoku }
    ];

    regions.forEach(region => {
      if (region.show) {
        const dominationLevel = dominationLevels[region.id] || 0;
        const colorful = dominationLevel === 100;
        drawMask(region.id, colorful);
      }
    });
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
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(() => {
      onPositionChange({ x: e.pageX - rel.x, y: e.pageY - rel.y });
    });
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

    const scaleRatio = scale / 10;
    const x = (e.clientX - rect.left) / scaleRatio;
    const y = (e.clientY - rect.top) / scaleRatio;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // 陸地かどうかチェック
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const isLand = pixel[3] > 0;

    if (!isLand) {
      console.log('海域のクリック');
      return;
    }

    // マスクされている地方をチェック
    const effectiveShowMaskedChubu = showMaskedChubu && !(dominationLevels.Kansai === 100);
    const effectiveShowMaskedChugoku = showMaskedChugoku && !(dominationLevels.Kansai === 100);
    const effectiveShowMaskedKanto = showMaskedKanto && !(dominationLevels.Chubu === 100);
    const effectiveShowMaskedTohoku = showMaskedTohoku && !(dominationLevels.Chubu === 100);
    const effectiveShowMaskedKyushu = showMaskedKyushu && !(dominationLevels.Chugoku === 100);
    const effectiveShowMaskedShikoku = showMaskedShikoku && !(dominationLevels.Chugoku === 100);

    const maskedRegions = [
      { id: 'Kansai', show: showMaskedKansai },
      { id: 'Kanto', show: effectiveShowMaskedKanto },
      { id: 'Kyushu', show: effectiveShowMaskedKyushu },
      { id: 'Tohoku', show: effectiveShowMaskedTohoku },
      { id: 'Chubu', show: effectiveShowMaskedChubu },
      { id: 'Chugoku', show: effectiveShowMaskedChugoku },
      { id: 'Shikoku', show: effectiveShowMaskedShikoku }
    ];

    // マスクされている地方かチェック
    for (const region of maskedRegions) {
      if (region.show) {
        const isInMaskedRegion = await isPointInMask(region.id, x, y);
        if (isInMaskedRegion) {
          console.log('マスクされている地方です');
          return;
        }
      }
    }

    // クリックした位置の地方を判定
    const region = await determineRegion(x, y);
    if (!region) {
      console.log('地方を判定できませんでした');
      return;
    }

    const newMarking = {
      x,
      y,
      timestamp: `marking-${Date.now()}-${markings.length}`
    };
    setMarkings(prev => [...prev, newMarking]);
    drawMarking(ctx, x, y);
    
    onMarkingComplete({ x, y, region });
  };

  // 地方を判定する新しい関数
  const determineRegion = async (x: number, y: number): Promise<string | null> => {
    const regions = [
      { name: '関西', id: 'Kansai' },
      { name: '関東', id: 'Kanto' },
      { name: '九州', id: 'Kyushu' },
      { name: '東北', id: 'Tohoku' },
      { name: '中部', id: 'Chubu' },
      { name: '中国', id: 'Chugoku' },
      { name: '四国', id: 'Shikoku' }
    ];

    for (const region of regions) {
      const isInRegion = await isPointInMask(region.id, x, y);
      if (isInRegion) {
        return region.name;
      }
    }
    return null;
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
        const isInMaskedRegion = await isPointInMask(mask.name, x, y);
        if (isInMaskedRegion) return true;
      }
    }
    return false;
  };

  const isPointInMask = async (maskName: string, x: number, y: number): Promise<boolean> => {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return false;

    const img = new Image();
    img.src = `/japan/mask/${dominationLevels[maskName] === 100 ? 'colorful' : 'masked'}${maskName}.png`;

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

  // キャンバスを再描画する関数
  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // マーキングをリセット
    setMarkings([]);

    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // ベース地図を再描画
    const img = imageRef.current;
    if (!img) return;
    
    canvas.width = img.width * 2;
    canvas.height = img.height * 2;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // マスクを再描画
    drawMasks();
  };

  // キャンセル時の再描画をuseEffectで監視
  useEffect(() => {
    if (!isProcessing) {
      redrawCanvas();
    }
  }, [isProcessing]);

  // useEffectでonMarkingResetを監視
  useEffect(() => {
    if (onMarkingReset) {
      markingResetRef.current = redrawCanvas;
    }
  }, []);

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
      <DominationMenu dominationLevels={dominationLevels} />
    </div>
  );
};

export default RegionMasks;