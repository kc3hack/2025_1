'use client';

import { useEffect, useRef } from 'react';
import styles from './FortressDisplay.module.css';

interface FortressDisplayProps {
  parts: Array<{
    id: string;      // パーツの種類（soil, iron等）
    x: number;       // グリッド上のX座標（0-24）
    y: number;       // グリッド上のY座標（0-24）
    rotation: number // 回転状態
    grid: number[][]; // パーツの形状データ
  }>;
}

export default function FortressDisplay({ parts }: FortressDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const CELL_SIZE = 20;  // 各セルのピクセルサイズ
  const GRID_SIZE = 25;  // 25x25グリッド

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 背景色を設定
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // グリッドを描画
    ctx.strokeStyle = '#ddd';
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // パーツを描画
    parts.forEach(part => {
      const material = part.id.replace(/[0-9]/g, '');

      // パーツの各セルを描画
      part.grid.forEach((row, dy) => {
        row.forEach((cell, dx) => {
          if (cell === 0) return; // 空のセルはスキップ

          const x = part.x + dx;
          const y = part.y + dy;

          // 座標が範囲内かチェック
          if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) {
            return;
          }

          const img = new Image();
          img.src = `/parts/quality/${material}/${material}.svg`;

          img.onload = () => {
            ctx.save();
            ctx.translate(
              (x + 0.5) * CELL_SIZE,
              (y + 0.5) * CELL_SIZE
            );
            ctx.rotate((part.rotation || 0) * Math.PI / 2);
            ctx.drawImage(
              img,
              -CELL_SIZE / 2,
              -CELL_SIZE / 2,
              CELL_SIZE,
              CELL_SIZE
            );
            ctx.restore();
          };
        });
      });
    });
  }, [parts]);

  return (
    <canvas
      ref={canvasRef}
      width={GRID_SIZE * CELL_SIZE}
      height={GRID_SIZE * CELL_SIZE}
      className={styles.fortressCanvas}
    />
  );
} 