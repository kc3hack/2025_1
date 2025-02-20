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

export interface Position {
    x: number;
    y: number;
}

// パーツの実際の幅を計算（0以外のセルが存在する範囲）
export function getPartWidth(grid: PartGrid): number {
    let minX = 4;  // 右端から探索開始
    let maxX = 0;  // 左端から探索開始
    
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            if (grid[y][x] !== 0) {
                minX = Math.min(minX, x);
                maxX = Math.max(maxX, x);
            }
        }
    }
    return maxX - minX + 1;
}

// パーツの実際の高さを計算（0以外のセルが存在する範囲）
export function getPartHeight(grid: PartGrid): number {
    let minY = 4;  // 下端から探索開始
    let maxY = 0;  // 上端から探索開始
    
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            if (grid[y][x] !== 0) {
                minY = Math.min(minY, y);
                maxY = Math.max(maxY, y);
            }
        }
    }
    return maxY - minY + 1;
}

// パーツの左端のオフセットを計算
export function getLeftOffset(grid: PartGrid): number {
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            if (grid[y][x] !== 0) {
                return x;
            }
        }
    }
    return 0;
}

// SafeTileとTileの位置を別々に管理
export interface GamePosition {
    safeTile?: Position;
    tile?: Position;
    mode: 'safeTile' | 'tile';
}

// パーツの設置可能判定用の関数を追加
export function canPlacePart(
    grid: PartGrid,
    x: number,
    y: number,
    placedParts: GamePart[]
): boolean {
    // 1. グリッドの範囲チェック
    if (y < 5 || y + grid.length > 30 || x < 0 || x + grid[0].length > 25) {
        return false;
    }

    // 2. 他のパーツとの重なりチェック
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 0) continue;
            const checkX = x + j;
            const checkY = y + i;

            for (const placedPart of placedParts) {
                if (!placedPart.position) continue;
                const px = placedPart.position.x;
                const py = placedPart.position.y;

                if (checkX >= px && checkX < px + placedPart.grid[0].length &&
                    checkY >= py && checkY < py + placedPart.grid.length) {
                    const placedCell = placedPart.grid[checkY - py][checkX - px];
                    if (placedCell !== 0) {
                        console.log('重なり検出:', checkX, checkY);
                        return false;
                    }
                }
            }
        }
    }

    // 3. 初回パーツはチェック不要
    if (placedParts.length === 0) {
        return true;
    }

    // 4. ドック接続チェック
    const dockPositions = getDockPositions(grid);
    let hasValidConnection = false;

    // 各ドックについて接続チェック
    for (const dock of dockPositions) {
        const dockX = x + dock.x;
        const dockY = y + dock.y;

        for (const placedPart of placedParts) {
            if (!placedPart.position) continue;

            const placedDocks = getDockPositions(placedPart.grid);
            for (const placedDock of placedDocks) {
                const pdx = placedPart.position.x + placedDock.x;
                const pdy = placedPart.position.y + placedDock.y;

                // 隣接チェック
                if (Math.abs(dockX - pdx) + Math.abs(dockY - pdy) === 1) {
                    console.log('ドック接続検出:', {
                        part: placedPart.id,
                        isFirstPart: placedPart === placedParts[0],
                        isDockUsed: placedPart.usedDocks.has(`${placedDock.x},${placedDock.y}`),
                        dockPos: { x: dockX, y: dockY },
                        placedDockPos: { x: pdx, y: pdy }
                    });

                    // 2つ目のパーツは自由に接続可能
                    if (placedParts.length === 1) {
                        return true;
                    }

                    // 3つ目以降のパーツの場合
                    const isFirstPart = placedPart === placedParts[0];
                    const isDockUsed = placedPart.usedDocks.has(`${placedDock.x},${placedDock.y}`);

                    // 最初のパーツの未使用ドックには接続不可
                    if (isFirstPart && !isDockUsed) {
                        continue;
                    }

                    hasValidConnection = true;
                }
            }
        }
    }

    if (!hasValidConnection) {
        console.log('接続条件を満たしていません');
        return false;
    }

    return true;
}

// ドックの接続情報を取得する関数
export interface DockConnection {
    sourceDock: Position;
    targetDock: Position;
    targetPart: GamePart;
}

export function getConnectedDocks(
    grid: PartGrid,
    x: number,
    y: number,
    placedParts: GamePart[]
): DockConnection[] {
    const connections: DockConnection[] = [];
    const dockPositions = getDockPositions(grid);

    for (const dock of dockPositions) {
        const dockX = x + dock.x;
        const dockY = y + dock.y;
        
        for (const placedPart of placedParts) {
            if (!placedPart.position) continue;
            
            const placedDocks = getDockPositions(placedPart.grid);
            for (const placedDock of placedDocks) {
                const pdx = placedPart.position.x + placedDock.x;
                const pdy = placedPart.position.y + placedDock.y;
                
                // ドックが隣接している場合
                if (Math.abs(dockX - pdx) + Math.abs(dockY - pdy) === 1) {
                    connections.push({
                        sourceDock: { x: dock.x, y: dock.y },
                        targetDock: { x: placedDock.x, y: placedDock.y },
                        targetPart: placedPart
                    });
                }
            }
        }
    }

    return connections;
}

// グリッドの各セルの状態を管理
export type GridState = (0 | 1)[][]; // 0: 空, 1: 占有済み

// グリッド状態の初期化関数
export function createEmptyGridState(): GridState {
    return Array(30).fill(0).map(() => Array(25).fill(0));
}

// グリッド状態を更新する関数
export function updateGridState(
    gridState: GridState,
    part: GamePart,
    x: number,
    y: number
): GridState {
    const newGridState = gridState.map(row => [...row]);
    for (let i = 0; i < part.grid.length; i++) {
        for (let j = 0; j < part.grid[i].length; j++) {
            if (part.grid[i][j] !== 0) {
                newGridState[y + i][x + j] = 1;
            }
        }
    }
    return newGridState;
}

// レア度に応じたパーツの画像パスを取得する関数
export function getPartImagePaths(rarity: Rarity): {
    base: string;
    dock: string;
    dockLast: string;
} {
    const qualityMap = {
        1: 'soil',
        2: 'bronze',
        3: 'iron',
        4: 'diamond'
    };
    const quality = qualityMap[rarity];
    
    return {
        base: `/parts/quality/${quality}/${quality}.svg`,
        dock: `/parts/quality/${quality}/${quality}Dock.svg`,
        dockLast: `/parts/quality/${quality}/${quality}DockLast.svg`
    };
} 