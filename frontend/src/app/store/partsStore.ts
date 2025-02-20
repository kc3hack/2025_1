import { create } from 'zustand';
import { Part, GameState, GamePart, rotatePart } from '../types/Part';

// 事前定義されたパーツパターン
const PREDEFINED_PARTS: Part[] = [
    // 例として1つ定義。実際には16種類定義する
    {
        id: 'part1',
        grid: [
            [0, 2, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 1, 1, 2, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: 1,
        points: 100,
        imageUrl: '/parts/quality/soil.svg'
    },
    // ... 他のパーツ定義
];

interface PartsStore extends GameState {
    initializeGame: () => void;
    rotatePart: () => void;
    placePart: (x: number, y: number) => boolean;
    selectNextPart: () => void;
}

export const usePartsStore = create<PartsStore>((set, get) => ({
    availableParts: [],
    placedParts: [],
    currentPart: null,
    score: 0,

    initializeGame: () => {
        // ランダムに10個のパーツを選択
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
            score: 0
        });
    },

    rotatePart: () => {
        const { currentPart } = get();
        if (!currentPart) return;

        set(state => ({
            ...state,
            currentPart: {
                ...currentPart,
                grid: rotatePart(currentPart.grid)
            }
        }));
    },

    placePart: (x: number, y: number) => {
        const { currentPart, availableParts, placedParts, score } = get();
        if (!currentPart) return false;

        // 設置の検証ロジックは後で実装
        const isValidPlacement = true; // 仮の実装

        if (isValidPlacement) {
            const newPlacedParts = [...placedParts, {
                ...currentPart,
                position: { x, y },
                isPlaced: true
            }];

            const remainingParts = availableParts.slice(1);
            
            set(state => ({
                ...state,
                placedParts: newPlacedParts,
                availableParts: remainingParts,
                currentPart: remainingParts[0] || null,
                score: score + currentPart.points
            }));
            return true;
        }
        return false;
    },

    selectNextPart: () => {
        const { availableParts } = get();
        if (availableParts.length === 0) return;

        set(state => ({
            ...state,
            currentPart: availableParts[0],
            availableParts: availableParts.slice(1)
        }));
    }
})); 