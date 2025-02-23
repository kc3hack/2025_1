import { GamePart, PartGrid } from './Part';

export interface FortressData {
  name: string;
  parts: Array<{
    id: string;      // パーツのID
    x: number;       // 配置位置X
    y: number;       // 配置位置Y
    rotation: number; // 回転状態
    grid: number[][]; // パーツの形状データ
  }>;
  score: number;
}

// グリッドデータを作成する関数
export function createGridData(placedParts: GamePart[]): string {
  const grid = Array(25).fill(0).map(() => Array(25).fill(0));
  
  placedParts.forEach(part => {
    if (!part.position) return;
    const materialValue = getMaterialValue(part.id); // 1-4の値を返す
    
    part.grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell !== 0) {
          const absX = part.position!.x + x;
          const absY = part.position!.y + y;
          if (absX >= 0 && absX < 25 && absY >= 0 && absY < 25) {
            grid[absY][absX] = materialValue;
          }
        }
      });
    });
  });
  
  return grid.map(row => row.join('')).join('');
}

// 古墳を復元する関数
export function reconstructFortress(gridData: string): number[][] {
  const grid: number[][] = [];
  for (let i = 0; i < 25; i++) {
    grid.push(Array.from(gridData.slice(i * 25, (i + 1) * 25)).map(Number));
  }
  return grid;
}

// パーツIDから素材の値（1-4）を取得する関数を追加
function getMaterialValue(partId: string): number {
  const material = partId.replace(/[0-9]/g, '');
  switch (material) {
    case 'soil': return 1;
    case 'bronze': return 2;
    case 'iron': return 3;
    case 'diamond': return 4;
    default: return 0;
  }
}

// createFortressData関数を新しい形式に更新
export function createFortressData(
  placedParts: GamePart[],
  score: number,
  name: string
): FortressData {
  return {
    name,
    parts: placedParts.map(part => ({
      id: part.id,
      x: part.position?.x || 0,
      y: part.position?.y || 0,
      rotation: part.rotation || 0,
      grid: part.grid // パーツの形状データを保存
    })),
    score
  };
} 