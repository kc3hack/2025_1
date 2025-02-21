export interface GridBoundary {
    top: number;
    left: number;
    bottom: number;
    right: number;
    grid: number[][];  // 外枠内の必要な部分のみを保存
}

export function calculateGridBoundary(grid: number[][]): GridBoundary {
    let top = grid.length;
    let bottom = 0;
    let left = grid[0].length;
    let right = 0;

    // 外枠を検出
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === 1) {
                top = Math.min(top, y);
                bottom = Math.max(bottom, y);
                left = Math.min(left, x);
                right = Math.max(right, x);
            }
        }
    }

    // 外枠の範囲のグリッドを抽出
    const boundedGrid = Array(bottom - top + 1).fill(0)
        .map(() => Array(right - left + 1).fill(0));

    for (let y = top; y <= bottom; y++) {
        for (let x = left; x <= right; x++) {
            boundedGrid[y - top][x - left] = grid[y][x];
        }
    }

    return {
        top,
        left,
        bottom,
        right,
        grid: boundedGrid
    };
} 