export const PARTS_DATA = [
    //小さいL字
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${index * 16 + 1}`,  // 1, 17, 33, 49
        shape: [
            [0, 2, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 1, 2, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: index + 1,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    //大きいL字
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${index * 16 + 2}`,  // 2, 18, 34, 50
        shape: [
            [0, 2, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 1, 1, 2, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: index + 1,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    // もっと小さいL字
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${index * 16 + 3}`,  // 3, 19, 35, 51
        shape: [
            [0, 2, 0, 0, 0],
            [0, 1, 2, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: index + 1,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    // l棒
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${index * 16 + 4}`,  // 4, 20, 36, 52
        shape: [
            [0, 0, 2, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 2, 0, 0]
        ],
        rarity: index + 1,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    // 短いl棒
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${index * 16 + 5}`,  // 5, 21, 37, 53
        shape: [
            [0, 0, 2, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 2, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: index + 1,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    // もっと短いl棒
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${index * 16 + 6}`,  // 6, 22, 38, 54
        shape: [
            [0, 0, 2, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 2, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: index + 1,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    // T字
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${index * 16 + 7}`,  // 7, 23, 39, 55
        shape: [
            [0, 0, 2, 0, 0],
            [0, 2, 1, 2, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 2, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: index + 1,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    // 大きいT字
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${index * 16 + 8}`,  // 8, 24, 40, 56
        shape: [
            [0, 0, 2, 0, 0],
            [0, 2, 1, 2, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 2, 0, 0]
        ],
        rarity: index + 1,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    // 十字
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${index * 16 + 9}`,  // 9, 25, 41, 57
        shape: [
            [0, 0, 2, 0, 0],
            [0, 2, 1, 2, 0],
            [0, 0, 1, 0, 0],
            [0, 2, 1, 2, 0],
            [0, 0, 2, 0, 0]
        ],
        rarity: index + 1,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    // 小さい十字
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${index * 16 + 10}`,  // 10, 26, 42, 58
        shape: [
            [0, 0, 2, 0, 0],
            [0, 2, 1, 2, 0],
            [0, 0, 2, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: index + 1,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    // コの字
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${index * 16 + 11}`,  // 11, 27, 43, 59
        shape: [
            [0, 2, 0, 2, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: index + 1,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    // 大きいコの字
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${index * 16 + 12}`,  // 12, 28, 44, 60
        shape: [
            [0, 2, 0, 2, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: index + 1,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    // 小さい四角
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${index * 16 + 13}`,  // 13, 29, 45, 61
        shape: [
            [0, 2, 2, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: index + 1,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    // 大きい四角
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${index * 16 + 14}`,  // 14, 30, 46, 62
        shape: [
            [0, 2, 2, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: index + 1,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    // もっと大きい四角
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${index * 16 + 15}`,  // 15, 31, 47, 63
        shape: [
            [0, 2, 2, 2, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: index + 1,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),

    // 一番大きい四角
    ...['soil', 'bronze', 'iron', 'diamond'].map((quality, index) => ({
        id: `${index * 16 + 16}`,  // 16, 32, 48, 64
        shape: [
            [0, 2, 2, 2, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0]
        ],
        rarity: index + 1,
        points: (index + 1) * 100,
        imageUrl: `/parts/quality/${quality}/${quality}.svg`
    })),
].flat(); 