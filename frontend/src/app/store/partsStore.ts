import { create } from 'zustand';
import { Part, GameState, GamePart, rotatePart, Position, getPartWidth, getPartHeight, getLeftOffset, GamePosition, getConnectedDocks, canPlacePart, GridState, createEmptyGridState, updateGridState } from '../types/Part';

// 事前定義されたパーツパターン
const PREDEFINED_PARTS: Part[] = [
    // Soil (レア度1) パーツ
    {
        id: 'soil1',
        grid: [
            [0, 2, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 1, 1, 2, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: 1,
        points: 100,
        imageUrl: '/parts/quality/soil/soil.svg'
    },
    {
        id: 'soil2',
        grid: [
            [0, 2, 1, 2, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: 1,
        points: 100,
        imageUrl: '/parts/quality/soil/soil.svg'
    },
    {
        id: 'soil3',
        grid: [
            [0, 2, 1, 1, 0],
            [0, 1, 1, 2, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: 1,
        points: 100,
        imageUrl: '/parts/quality/soil/soil.svg'
    },
    {
        id: 'soil4',
        grid: [
            [0, 2, 1, 0, 0],
            [0, 1, 1, 2, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: 1,
        points: 100,
        imageUrl: '/parts/quality/soil/soil.svg'
    },

    // Bronze (レア度2) パーツ
    {
        id: 'bronze1',
        grid: [
            [0, 2, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 1, 1, 2, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: 2,
        points: 200,
        imageUrl: '/parts/quality/bronze/bronze.svg'
    },
    {
        id: 'bronze2',
        grid: [
            [0, 2, 1, 2, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: 2,
        points: 200,
        imageUrl: '/parts/quality/bronze/bronze.svg'
    },
    {
        id: 'bronze3',
        grid: [
            [0, 2, 1, 1, 0],
            [0, 1, 1, 2, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: 2,
        points: 200,
        imageUrl: '/parts/quality/bronze/bronze.svg'
    },
    {
        id: 'bronze4',
        grid: [
            [0, 2, 1, 0, 0],
            [0, 1, 1, 2, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: 2,
        points: 200,
        imageUrl: '/parts/quality/bronze/bronze.svg'
    },

    // Iron (レア度3) パーツ
    {
        id: 'iron1',
        grid: [
            [0, 2, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 1, 1, 2, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: 3,
        points: 300,
        imageUrl: '/parts/quality/iron/iron.svg'
    },
    {
        id: 'iron2',
        grid: [
            [0, 2, 1, 2, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: 3,
        points: 300,
        imageUrl: '/parts/quality/iron/iron.svg'
    },
    {
        id: 'iron3',
        grid: [
            [0, 2, 1, 1, 0],
            [0, 1, 1, 2, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: 3,
        points: 300,
        imageUrl: '/parts/quality/iron/iron.svg'
    },
    {
        id: 'iron4',
        grid: [
            [0, 2, 1, 0, 0],
            [0, 1, 1, 2, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: 3,
        points: 300,
        imageUrl: '/parts/quality/iron/iron.svg'
    },

    // Diamond (レア度4) パーツ
    {
        id: 'diamond1',
        grid: [
            [0, 2, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 1, 1, 2, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: 4,
        points: 400,
        imageUrl: '/parts/quality/diamond/diamond.svg'
    },
    {
        id: 'diamond2',
        grid: [
            [0, 2, 1, 2, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: 4,
        points: 400,
        imageUrl: '/parts/quality/diamond/diamond.svg'
    },
    {
        id: 'diamond3',
        grid: [
            [0, 2, 1, 1, 0],
            [0, 1, 1, 2, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: 4,
        points: 400,
        imageUrl: '/parts/quality/diamond/diamond.svg'
    },
    {
        id: 'diamond4',
        grid: [
            [0, 2, 1, 0, 0],
            [0, 1, 1, 2, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: 4,
        points: 400,
        imageUrl: '/parts/quality/diamond/diamond.svg'
    }
];

interface PartsStore extends GameState {
    initializeGame: () => void;
    rotatePart: () => void;
    placePart: () => boolean;
    selectNextPart: () => void;
    moveCurrentPart: (direction: 'left' | 'right' | 'up' | 'down') => void;
    currentPosition: GamePosition | null;
    isSafeTileMode: boolean; // safeTileモードかどうかのフラグ
    gridState: GridState;
}

export const usePartsStore = create<PartsStore>((set, get) => ({
    availableParts: [],
    placedParts: [],
    currentPart: null,
    currentPosition: {
        safeTile: { x: 10, y: 2 },
        mode: 'safeTile'
    },
    score: 0,
    isSafeTileMode: true, // 初期状態はsafeTileモード
    gridState: createEmptyGridState(),

    initializeGame: () => {
        const selectedParts: GamePart[] = [];
        for (let i = 0; i < 10; i++) {
            const randomPart = PREDEFINED_PARTS[Math.floor(Math.random() * PREDEFINED_PARTS.length)];
            selectedParts.push({
                ...randomPart,
                position: null,
                isPlaced: false,
                usedDocks: new Set()
            });
        }

        set({
            availableParts: selectedParts,
            placedParts: [],
            currentPart: selectedParts[0],
            currentPosition: {
                safeTile: { x: 10, y: 2 },
                mode: 'safeTile'
            },
            score: 0,
            gridState: createEmptyGridState()
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

        // グリッド状態を更新
        const newGridState = updateGridState(gridState, currentPart, pos.x, pos.y);

        // 接続するドックを取得
        const connections = getConnectedDocks(grid, pos.x, pos.y, placedParts);
        
        // 新しいパーツを作成
        const newPart: GamePart = {
            ...currentPart,
            position: { x: pos.x, y: pos.y },
            isPlaced: true,
            usedDocks: new Set(connections.map(c => `${c.sourceDock.x},${c.sourceDock.y}`))
        };

        // 接続先のパーツのドックも使用済みにする
        connections.forEach(conn => {
            const targetPart = placedParts.find(p => p.id === conn.targetPart.id);
            if (targetPart) {
                targetPart.usedDocks.add(`${conn.targetDock.x},${conn.targetDock.y}`);
            }
        });

        set(state => ({
            ...state,
            placedParts: [...placedParts, newPart],
            currentPart: state.availableParts[0] || null,
            availableParts: state.availableParts.slice(1),
            currentPosition: {
                safeTile: { x: 10, y: 2 },
                mode: 'safeTile'
            },
            score: state.score + currentPart.points,
            gridState: newGridState
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
        const { currentPosition, currentPart, gridState } = get();
        if (!currentPosition || !currentPart) return;

        set(state => {
            const newPos = { ...currentPosition };
            const partHeight = getPartHeight(currentPart.grid);
            const partWidth = getPartWidth(currentPart.grid);
            const leftOffset = getLeftOffset(currentPart.grid);

            // 移動先の位置を計算
            const getNewPosition = (pos: Position, dir: 'left' | 'right' | 'up' | 'down'): Position | null => {
                const newPos = { ...pos };
                switch (dir) {
                    case 'left':
                        newPos.x = Math.max(-leftOffset, pos.x - 1);
                        break;
                    case 'right':
                        newPos.x = Math.min(24 - partWidth, pos.x + 1);
                        break;
                    case 'up':
                        newPos.y = Math.max(0, pos.y - 1);
                        break;
                    case 'down':
                        newPos.y = Math.min(25 - partHeight, pos.y + 1);
                        break;
                }
                return newPos;
            };

            // 移動先が有効かチェック
            const canMoveTo = (pos: Position): boolean => {
                for (let i = 0; i < currentPart.grid.length; i++) {
                    for (let j = 0; j < currentPart.grid[i].length; j++) {
                        if (currentPart.grid[i][j] === 0) continue;
                        const checkY = pos.y + i;
                        const checkX = pos.x + j;
                        // グリッド範囲外または占有済みのセルには移動できない
                        if (checkY >= 30 || checkX >= 25 || checkX < 0 || 
                            (checkY >= 5 && gridState[checkY][checkX] === 1)) {
                            return false;
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