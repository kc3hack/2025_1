import { create } from 'zustand';
import { Part, GameState, GamePart, rotatePart, Position, getPartWidth, getPartHeight, getLeftOffset, GamePosition, getConnectedDocks, canPlacePart, GridState, createEmptyGridState, updateGridState, PartCell, Rarity, PartGrid } from '../types/Part';

// 事前定義されたパーツパターン
const PREDEFINED_PARTS: Part[] = [
    //小さいL字
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${quality}1`,
        grid: [
            [0, 2, 0, 0, 0] as PartCell[],
            [0, 1, 0, 0, 0] as PartCell[],
            [0, 1, 0, 0, 0] as PartCell[],
            [0, 1, 2, 0, 0] as PartCell[],
            [0, 0, 0, 0, 0] as PartCell[]
        ],
        rarity: (index + 1) as Rarity,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    //大きいL字
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${quality}2`,
        grid: [
            [0, 2, 0, 0, 0] as PartCell[],
            [0, 1, 0, 0, 0] as PartCell[],
            [0, 1, 0, 0, 0] as PartCell[],
            [0, 1, 1, 2, 0] as PartCell[],
            [0, 0, 0, 0, 0] as PartCell[]
        ],
        rarity: (index + 1) as Rarity,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    //もっと小さいL字
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${quality}3`,
        grid: [
            [0, 0, 0, 0, 0] as PartCell[],
            [0, 2, 0, 0, 0] as PartCell[],
            [0, 1, 2, 0, 0] as PartCell[],
            [0, 0, 0, 0, 0] as PartCell[],
            [0, 0, 0, 0, 0] as PartCell[]
        ],
        rarity: (index + 1) as Rarity,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    //l棒
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${quality}4`,
        grid: [
            [0, 0, 2, 0, 0] as PartCell[],
            [0, 0, 1, 0, 0] as PartCell[],
            [0, 0, 1, 0, 0] as PartCell[],
            [0, 0, 2, 0, 0] as PartCell[],
            [0, 0, 0, 0, 0] as PartCell[]
        ],
        rarity: (index + 1) as Rarity,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    //角
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${quality}5`,
        grid: [
            [2, 0, 0, 0, 0] as PartCell[],
            [1, 0, 0, 0, 0] as PartCell[],
            [1, 0, 0, 0, 0] as PartCell[],
            [1, 0, 0, 0, 0] as PartCell[],
            [1, 1, 1, 1, 2] as PartCell[]
        ],
        rarity: (index + 1) as Rarity,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    //s字
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${quality}6`,
        grid: [
            [0, 2, 0, 0, 0] as PartCell[],
            [0, 1, 0, 0, 0] as PartCell[],
            [0, 1, 1, 0, 0] as PartCell[],
            [0, 0, 1, 0, 0] as PartCell[],
            [0, 0, 2, 0, 0] as PartCell[]
        ],
        rarity: (index + 1) as Rarity,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    //短いl棒
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${quality}7`,
        grid: [
            [0, 0, 0, 0, 0] as PartCell[],
            [0, 0, 2, 0, 0] as PartCell[],
            [0, 0, 1, 0, 0] as PartCell[],
            [0, 0, 2, 0, 0] as PartCell[],
            [0, 0, 0, 0, 0] as PartCell[]
        ],
        rarity: (index + 1) as Rarity,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    //逆s字
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${quality}8`,
        grid: [
            [0, 0, 0, 2, 0] as PartCell[],
            [0, 0, 0, 1, 0] as PartCell[],
            [0, 0, 1, 1, 0] as PartCell[],
            [0, 0, 1, 0, 0] as PartCell[],
            [0, 0, 2, 0, 0] as PartCell[]
        ],
        rarity: (index + 1) as Rarity,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    //階段
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${quality}9`,
        grid: [
            [2, 1, 0, 0, 0] as PartCell[],
            [0, 1, 1, 0, 0] as PartCell[],
            [0, 0, 1, 1, 0] as PartCell[],
            [0, 0, 0, 1, 2] as PartCell[],
            [0, 0, 0, 0, 0] as PartCell[]
        ],
        rarity: (index + 1) as Rarity,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    //ト字
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${quality}10`,
        grid: [
            [0, 0, 0, 0, 0] as PartCell[],
            [0, 2, 0, 0, 0] as PartCell[],
            [0, 1, 1, 0, 0] as PartCell[],
            [0, 2, 0, 0, 0] as PartCell[],
            [0, 0, 0, 0, 0] as PartCell[]
        ],
        rarity: (index + 1) as Rarity,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    //小さいs字
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${quality}11`,
        grid: [
            [0, 0, 0, 0, 0] as PartCell[],
            [0, 2, 0, 0, 0] as PartCell[],
            [0, 1, 1, 0, 0] as PartCell[],
            [0, 0, 2, 0, 0] as PartCell[],
            [0, 0, 0, 0, 0] as PartCell[]
        ],
        rarity: (index + 1) as Rarity,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    //でかい棒
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${quality}12`,
        grid: [
            [0, 0, 2, 0, 0] as PartCell[],
            [0, 0, 1, 0, 0] as PartCell[],
            [0, 0, 1, 0, 0] as PartCell[],
            [0, 0, 1, 0, 0] as PartCell[],
            [0, 0, 2, 0, 0] as PartCell[]
        ],
        rarity: (index + 1) as Rarity,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    //小さい角
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${quality}13`,
        grid: [
            [0, 0, 0, 0, 0] as PartCell[],
            [0, 2, 0, 0, 0] as PartCell[],
            [0, 1, 0, 0, 0] as PartCell[],
            [0, 1, 1, 2, 0] as PartCell[],
            [0, 0, 0, 0, 0] as PartCell[]
        ],
        rarity: (index + 1) as Rarity,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    //逆L字  
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${quality}14`,
        grid: [
            [0, 0, 0, 0, 0] as PartCell[],
            [0, 0, 0, 2, 0] as PartCell[],
            [0, 0, 0, 1, 0] as PartCell[],
            [0, 0, 2, 1, 0] as PartCell[],
            [0, 0, 0, 0, 0] as PartCell[]
        ],
        rarity: (index + 1) as Rarity,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    //逆L字
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${quality}15`,
        grid: [
            [0, 0, 0, 2, 0] as PartCell[],
            [0, 0, 0, 1, 0] as PartCell[],
            [0, 0, 0, 1, 0] as PartCell[],
            [0, 2, 1, 1, 0] as PartCell[],
            [0, 0, 0, 0, 0] as PartCell[]
        ],
        rarity: (index + 1) as Rarity,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    //逆L字
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${quality}16`,
        grid: [
            [0, 0, 0, 2, 0] as PartCell[],
            [0, 0, 0, 1, 0] as PartCell[],
            [0, 0, 0, 1, 0] as PartCell[],
            [0, 2, 1, 1, 0] as PartCell[],
            [0, 0, 0, 0, 0] as PartCell[]
        ],
        rarity: (index + 1) as Rarity,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    }))
].flat();  // mapの結果を1つの配列に平坦化

interface PartsStore extends GameState {
    initializeGame: () => void;
    rotatePart: () => void;
    placePart: () => boolean;
    selectNextPart: () => void;
    moveCurrentPart: (direction: 'left' | 'right' | 'up' | 'down') => void;
    currentPosition: GamePosition | null;
    isSafeTileMode: boolean; // safeTileモードかどうかのフラグ
    gridState: GridState;
    isGameOver: boolean;  // ゲーム終了フラグを追加
}

export const usePartsStore = create<PartsStore>((set, get) => ({
    availableParts: [],
    placedParts: [],
    currentPart: null,
    currentPosition: {
        safeTile: { x: 10, y: 0 },
        mode: 'safeTile'
    },
    score: 0,
    isSafeTileMode: true, // 初期状態はsafeTileモード
    gridState: createEmptyGridState(),
    isGameOver: false,  // 初期状態を追加

    initializeGame: () => {
        // 重複のない10個のパーツを選択
        const uniqueParts = getRandomUniqueParts(10);
        const selectedParts: GamePart[] = uniqueParts.map(part => ({
            ...part,
            position: null,
            isPlaced: false,
            usedDocks: new Set()
        }));

        set({
            availableParts: selectedParts,
            placedParts: [],
            currentPart: selectedParts[0],
            currentPosition: {
                safeTile: { x: 10, y: 0 },
                mode: 'safeTile'
            },
            score: 0,
            gridState: createEmptyGridState(),
            isGameOver: false
        });
    },

    rotatePart: () => {
        const { currentPart, currentPosition } = get();
        if (!currentPart || !currentPosition || currentPosition.mode === 'safeTile') return;

        // 回転は自由に可能
        set(state => ({
            ...state,
            currentPart: {
                ...currentPart,
                grid: rotatePart(currentPart.grid)
            }
        }));
    },

    placePart: () => {
        const { currentPart, currentPosition, placedParts, gridState } = get();
        if (!currentPart || !currentPosition || currentPosition.mode === 'safeTile') {
            console.log('設置失敗: safeTile内または無効な状態');
            return false;
        }

        const pos = currentPosition.tile!;
        const grid = currentPart.grid;

        // グリッド状態をチェック
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] !== 0) {
                    if (gridState[pos.y + i][pos.x + j] === 1) {
                        console.log('設置失敗: 既に占有されているセル');
                        return false;
                    }
                }
            }
        }

        // 設置位置で接続可能かチェック
        if (!canPlacePart(grid, pos.x, pos.y, placedParts)) {
            console.log('設置失敗: 接続条件を満たしていません');
            return false;
        }

        // 接続するドックを取得
        const connections = getConnectedDocks(grid, pos.x, pos.y, placedParts);
        
        // 新しいパーツのグリッドを作成（接続されたドックを通常ブロックに変更）
        const newGrid = grid.map(row => [...row]) as PartGrid;
        connections.forEach(conn => {
            // 配置するパーツ側の接続ドックを通常ブロックに変更
            newGrid[conn.sourceDock.y][conn.sourceDock.x] = 1;
            
            // 接続先のパーツ側のドックも通常ブロックに変更
            const targetPart = placedParts.find(p => p.id === conn.targetPart.id);
            if (targetPart && targetPart.position) {
                const targetX = conn.targetDock.x;
                const targetY = conn.targetDock.y;
                targetPart.grid[targetY][targetX] = 1;
                
                // グリッド状態も更新
                gridState[targetPart.position.y + targetY][targetPart.position.x + targetX] = 1;
            }
        });

        // 新しいパーツを作成（更新したグリッドを使用）
        const newPart: GamePart = {
            ...currentPart,
            grid: newGrid,  // 更新したグリッドを使用
            position: { x: pos.x, y: pos.y },
            isPlaced: true,
            usedDocks: new Set(connections.map(c => `${c.sourceDock.x},${c.sourceDock.y}`))
        };

        // グリッド状態を更新（更新したグリッドを使用）
        const newGridState = updateGridState(gridState, { ...newPart, grid: newGrid }, pos.x, pos.y);

        // 全てのパーツの未接続ドックをチェック
        const checkAllDocsConnected = () => {
            // 新しく配置したパーツも含めて全パーツをチェック
            const allParts = [...placedParts, newPart];
            
            // 全パーツの未接続ドックを探す
            for (const part of allParts) {
                for (let y = 0; y < part.grid.length; y++) {
                    for (let x = 0; x < part.grid[y].length; x++) {
                        // ドックがあり、かつ未接続の場合
                        if (part.grid[y][x] === 2 && !part.usedDocks.has(`${x},${y}`)) {
                            return false;  // 未接続のドックが見つかった
                        }
                    }
                }
            }
            return true;  // 全てのドックが接続済み
        };

        const isAllConnected = checkAllDocsConnected();

        set(state => ({
            ...state,
            placedParts: [...placedParts, newPart],
            currentPart: isAllConnected ? null : state.availableParts[1] || null,
            availableParts: isAllConnected ? [] : state.availableParts.slice(1),
            currentPosition: {
                safeTile: { x: 10, y: 0 },
                mode: 'safeTile'
            },
            score: state.score + currentPart.points,
            gridState: newGridState,
            isGameOver: isAllConnected  // 全て接続されていたらゲーム終了
        }));

        return true;
    },

    selectNextPart: () => {
        const { availableParts } = get();
        if (availableParts.length === 0) return;

        set(state => ({
            ...state,
            currentPart: availableParts[0],
            availableParts: availableParts.slice(1)
        }));
    },

    moveCurrentPart: (direction) => {
        const { currentPart, currentPosition, gridState } = get();
        if (!currentPart || !currentPosition) return;

        set(state => {
            const newPos = { ...currentPosition };
            const partHeight = getPartHeight(currentPart.grid);
            const partWidth = getPartWidth(currentPart.grid);
            const leftOffset = getLeftOffset(currentPart.grid);

            // 移動先の位置を計算
            const getNewPosition = (pos: Position, dir: 'left' | 'right' | 'up' | 'down'): Position | null => {
                const newPos = { ...pos };

                // パーツの実際の範囲を計算
                let leftEdge = 4, rightEdge = 0;
                for (let y = 0; y < 5; y++) {
                    for (let x = 0; x < 5; x++) {
                        if (currentPart.grid[y][x] !== 0) {
                            leftEdge = Math.min(leftEdge, x);
                            rightEdge = Math.max(rightEdge, x);
                        }
                    }
                }

                switch (dir) {
                    case 'left':
                        newPos.x = Math.max(-leftEdge, pos.x - 1);  // 左端の実際の位置を考慮
                        break;
                    case 'right':
                        newPos.x = Math.min(24 - rightEdge, pos.x + 1);  // 右端の実際の位置を考慮
                        break;
                    case 'up':
                        newPos.y = Math.max(0, pos.y - 1);
                        break;
                    case 'down':
                        newPos.y = Math.min(24, pos.y + 1);
                        break;
                }
                return newPos;
            };

            // 移動先が有効かチェック
            const canMoveTo = (pos: Position): boolean => {
                // パーツの実際の範囲を計算
                let leftEdge = 4, rightEdge = 0;
                let topEdge = 4, bottomEdge = 0;
                
                // パーツの実際の範囲を計算
                for (let y = 0; y < 5; y++) {
                    for (let x = 0; x < 5; x++) {
                        if (currentPart.grid[y][x] !== 0) {
                            leftEdge = Math.min(leftEdge, x);
                            rightEdge = Math.max(rightEdge, x);
                            topEdge = Math.min(topEdge, y);
                            bottomEdge = Math.max(bottomEdge, y);
                        }
                    }
                }

                // グリッドの境界チェック
                if (currentPosition.mode === 'safeTile') {
                    // セーフエリアの境界チェック（幅25、高さ5）
                    if (pos.x + leftEdge < 0 || pos.x + rightEdge >= 25 || 
                        pos.y + topEdge < 0 || pos.y + bottomEdge >= 5) {
                        return false;
                    }
                } else {
                    // 通常エリアの境界チェック（幅25、高さ25）
                    if (pos.x + leftEdge < 0 || pos.x + rightEdge >= 25 || 
                        pos.y + topEdge < 0 || pos.y + bottomEdge >= 25) {
                        return false;
                    }
                }

                // 他のパーツとの衝突チェック
                if (currentPosition.mode === 'tile') {
                    for (let y = topEdge; y <= bottomEdge; y++) {
                        for (let x = leftEdge; x <= rightEdge; x++) {
                            if (currentPart.grid[y][x] !== 0 && 
                                gridState[pos.y + y]?.[pos.x + x] === 1) {
                                return false;
                            }
                        }
                    }
                }

                return true;
            };

            if (newPos.mode === 'safeTile') {
                const pos = newPos.safeTile!;
                if (direction === 'down') {
                    pos.y += 1;
                    if (pos.y + partHeight > 5) {
                        newPos.mode = 'tile';
                        newPos.tile = { x: pos.x, y: 0 };
                        newPos.safeTile = undefined;
                    }
                } else {
                    const newPosition = getNewPosition(pos, direction);
                    if (newPosition && canMoveTo(newPosition)) {
                        pos.x = newPosition.x;
                        pos.y = newPosition.y;
                    }
                }
            } else {
                const pos = newPos.tile!;
                const newPosition = getNewPosition(pos, direction);
                if (newPosition && canMoveTo(newPosition)) {
                    pos.x = newPosition.x;
                    pos.y = newPosition.y;
                }
            }

            return { ...state, currentPosition: newPos };
        });
    }
}));

// パーツの重複を避けるためのヘルパー関数
function getRandomUniqueParts(count: number): Part[] {
    const shuffled = [...PREDEFINED_PARTS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
} 