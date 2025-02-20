export type PartCell = 0 | 1 | 2;  // 0: 空, 1: ブロック, 2: 接続ドック
export type PartGrid = PartCell[][];
export type Rarity = 1 | 2 | 3 | 4;

export interface Part {
    id: string;
    grid: PartGrid;
    rarity: Rarity;
    points: number;
    imageUrl: string;  // 1x1のタイル画像のURL
}

export interface GamePart extends Part {
    position: { x: number; y: number } | null;
    isPlaced: boolean;
    usedDocks: Set<string>;  // "x,y"形式で使用済みドックの位置を保存
}

// パーツの状態管理
export interface GameState {
    availableParts: GamePart[];  // 残りのパーツ
    placedParts: GamePart[];     // 設置済みのパーツ
    currentPart: GamePart | null;
    score: number;
}

// 90度回転する関数
export function rotatePart(grid: PartGrid): PartGrid {
    const size = grid.length;
    const newGrid: PartGrid = Array(size).fill(0).map(() => Array(size).fill(0));
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            newGrid[j][size - 1 - i] = grid[i][j];
        }
    }
    
    return newGrid;
}

// ドック位置を取得する関数
export function getDockPositions(grid: PartGrid): { x: number; y: number }[] {
    const docks: { x: number; y: number }[] = [];
    
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 2) {
                docks.push({ x, y });
            }
        }
    }
    
    return docks;
} 