'use client'

import EditPartsMenu from '../components/edit/EditPartsMenu'
import NextButton from '../components/edit/NextButton'
import HelpPanel from '../components/edit/HelpPanel'
import ScorePanel from '../components/edit/ScorePanel'
import TipsPanel from '../components/edit/TipsPanel'
import styles from './styles.module.css'
import { useState, useEffect } from 'react'
import PartsList from '../components/edit/PartsList'
import GameGrid from '../components/edit/GameGrid'
import { usePartsStore } from '@/app/store/partsStore'
import { useRouter } from 'next/navigation'
import { createEmptyGridState } from '@/app/types/Part'

const tips = [
    "古墳は、3世紀後半から7世紀頃の日本で作られた墳墓。権力者や豪族の墓として作られたもので、規模や形状がさまざま。",
    "前方後円墳とは鍵穴のような形をした古墳であり。日本最大の古墳として大阪の仁徳天皇陵古墳（全長486m）が有名",
    "明治時代以降、都市開発や農地開拓で多くの古墳が破壊された。その際、地図上から意図的に「存在しなかったこと」にされ、記録が失われたものもある。",
    "現存する 最古の前方後円墳 は奈良県の 箸墓古墳（はしはかこふん）（3世紀後半）。卑弥呼の墓ではないかという説もあり、古墳研究の最重要ポイントの一つになっている。",
    "前方後円墳は「カギ穴型」と言われるが、一部の研究者の間では「船」を模した可能性も指摘されている。これは、大王（天皇）が 死後、海を越えて神の世界に行く という信仰があったためと考えられている。",
    "古墳は造られた直後から盗掘の対象だった。特に6世紀以降、中国や朝鮮半島から持ち込まれた鉄器の技術が広まると、「専門の盗掘団」が組織的に古墳を掘り、貴重な副葬品を持ち去った。",
    "都市部にある小さな森や丘が、実は 古墳だった というケースがある。例えば、大阪の「茶臼山」はもともと古墳だったと言われているし、京都の船岡山も古墳だった可能性がある。",
    "奈良県明日香村にある 牽牛子塚古墳（けんごしづかこふん） は、石を積み重ねて作られた「ピラミッド型」の古墳。",
];

export default function EditPage() {
    const { rotatePart, placePart, shouldNavigateToPreview } = usePartsStore();
    const router = useRouter();
    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    const goToMap = () => {
        router.push('/map');
      };

    useEffect(() => {
        if (shouldNavigateToPreview) {
            router.push('/edit/editPreview');
        }
    }, [shouldNavigateToPreview, router]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
        }, 15000); // 15秒ごとに豆知識を切り替える

        return () => clearInterval(interval);
    }, []);

    // 開発者用のデバッグコマンド
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Command + Shift + D で即完成（mac用）
            if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'D') {
                // 全てのパーツのDockを通常ブロックに変換し、usedDocksを全て使用済みにする
                const normalizedParts = usePartsStore.getState().placedParts.map(part => {
                    // 全てのDockの位置を取得
                    const docks = new Set<string>();
                    part.grid.forEach((row, y) => {
                        row.forEach((cell, x) => {
                            if (cell === 2) {
                                docks.add(`${x},${y}`);
                            }
                        });
                    });

                    return {
                        ...part,
                        grid: part.grid.map(row => 
                            row.map(cell => cell === 2 ? 1 : cell)
                        ),
                        usedDocks: docks  // 全てのDockを使用済みにする
                    };
                });

                usePartsStore.setState(state => ({
                    ...state,
                    isCompleted: true,
                    shouldNavigateToPreview: true,
                    completedGridState: state.gridState,
                    placedParts: normalizedParts
                }));
                router.push('/edit/editPreview');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [router]);

    const handleComplete = () => {
        router.push('/edit/editPreview');
    };

    const handlePlacePart = () => {
        const success = placePart();
        if (success) {
            router.push('/edit/editPreview');
        }
    };

    return (
        <div className={styles.container}>
            <EditPartsMenu />
            <GameGrid />
            <HelpPanel />
            <ScorePanel />
            <TipsPanel tip={tips[currentTipIndex]} />
            <div className={styles.buttonGroup}>
                <NextButton type="retire" position="left" text="リタイア" onClick={goToMap} />
                <NextButton type="rotate" position="center" text="回転" onClick={rotatePart} />
                <NextButton type="place" position="right" text="設置" onClick={handlePlacePart} />
            </div>
        </div>
    )
}