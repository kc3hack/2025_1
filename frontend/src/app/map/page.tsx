"use client"; // クライアントコンポーネントとしてマーク

import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/app/store/modalStore';
import Menu from '../components/menu/ListMenu';
import DominationMenu from '../components/menu/DominationMenu';
import ZoomControls from '../components/menu/ZoomControls';
import RegionMasks from '../components/mapOption/RegionMasks';
import DraggableMap from '../components/mapOption/DraggableMap';
import NextTurnButton from '../components/button/NextTurnButton';

interface UserData {
  user_id: string;
  marking_point_x: number;
  marking_point_y: number;
  random_parts_num: number;
}

const MapPage = () => {
  const [position, setPosition] = useState({ x: -200, y: -2400 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [scale, setScale] = useState(20);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentMarking, setCurrentMarking] = useState<{ x: number; y: number; region: string } | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [dominationLevels, setDominationLevels] = useState({
    Kansai: 0,
    Chubu: 0,
    Kanto: 0,
    Tohoku: 0,
    Chugoku: 0,
    Shikoku: 0,
    Kyushu: 0
  });
  const [randomPartsNum, setRandomPartsNum] = useState<number>(10);
  const [userMarkings, setUserMarkings] = useState<Array<{ x: number; y: number; markType: string }>>([]);
 
  const { showCompletionModal, setShowCompletionModal } = useModalStore();
  const router = useRouter();
  const markingResetRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setPosition({ x: (window.innerWidth / 12) - 200, y: -2400 });
    setIsLoaded(true);

    const handleResize = () => {
      setPosition({ x: (window.innerWidth / 12) - 200, y: -2400 });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      setShowCompletionModal(false);
    };
  }, [setShowCompletionModal]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        
        console.log('Attempting to fetch with:', { userId, token: !!token }); // デバッグ用

        if (!token || !userId) {
          console.error('認証情報が見つかりません');
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/random/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('Response status:', response.status); // デバッグ用
        const data = await response.json();
        console.log('Response data:', data); // デバッグ用

        if (!response.ok) {
          throw new Error('データの取得に失敗しました');
        }
        
        setRandomPartsNum(data.random_parts_num || 10);
      } catch (error) {
        console.error('エラー詳細:', error);
        // エラーハンドリング
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchGovernance = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            if (!token || !userId) {
                console.error('認証情報が見つかりません');
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/governance/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('統治度の取得に失敗しました');
            }

            const data = await response.json();
            
            // データベースの値をDominationMenuの形式に変換
            setDominationLevels({
                Kansai: data.kansai || 0,
                Chubu: data.chubu || 0,
                Kanto: data.kanto || 0,
                Tohoku: data.tohoku || 0,
                Chugoku: data.chugoku || 0,
                Shikoku: data.shikoku || 0,
                Kyushu: data.kyushu || 0
            });

        } catch (error) {
            console.error('統治度の取得に失敗:', error);
        }
    };

    fetchGovernance();
}, []); // コンポーネントのマウント時に一度だけ実行

  // ユーザーのマーキングを取得する関数
  const fetchUserMarkings = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        console.error('認証情報が見つかりません');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/markings/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('マーキングの取得に失敗しました');
      }

      const markings = await response.json();
      setUserMarkings(markings);
    } catch (error) {
      console.error('マーキング取得エラー:', error);
    }
  };

  // コンポーネントマウント時にマーキングを取得
  useEffect(() => {
    fetchUserMarkings();
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
    console.error('画像の読み込みに失敗しました:', (e.target as HTMLDivElement).style.backgroundImage);
  };

  const handleMarkingComplete = (marking: { x: number; y: number; region: string }) => {
    setCurrentMarking(marking);
    console.log(`選択した座標: (${marking.x}, ${marking.y}), 地方: ${marking.region}`);
    setSelectedRegion(marking.region);
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    if (!currentMarking) return;

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        console.error('認証情報が見つかりません');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/markings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          x: currentMarking.x,
          y: currentMarking.y,
          region: currentMarking.region,
        }),
      });

      if (!response.ok) {
        throw new Error('マーキングの保存に失敗しました');
      }

      // 選択した地域をlocalStorageに保存
      localStorage.setItem('selectedRegion', currentMarking.region);

      // 保存成功後、編集ページへ遷移
      router.push('/edit');
    } catch (error) {
      console.error('マーキング保存エラー:', error);
    }
  };

  const handleCancel = () => {
    // キャンセルの場合、画面をリロード
    setCurrentMarking(null);
    setShowConfirmModal(false);
    setIsProcessing(true);
    // 画面をリロード
    window.location.reload();
  };

  const handleMarkingReset = () => {
    markingResetRef.current?.();
  };

  return (
    <div className={styles.container}>
      <RegionMasks 
        onError={handleImageError}
        isProcessing={isProcessing}
        position={position}
        scale={scale}
        isLoaded={isLoaded}
        onPositionChange={setPosition}
        onMarkingComplete={handleMarkingComplete}
        onMarkingReset={handleMarkingReset}
        dominationLevels={dominationLevels}
        existingMarkings={userMarkings}
      />

      <Menu />

      <DominationMenu dominationLevels={dominationLevels} />

      <ZoomControls 
        onScaleChange={setScale}
        initialScale={20}
      />

      <NextTurnButton 
        onProcessingChange={setIsProcessing}
        randomPartsNum={randomPartsNum}
      />

      {showCompletionModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>パーツ完成！</h2>
            <p>新しいパーツが追加されました</p>
            <button 
              onClick={() => setShowCompletionModal(false)}
              className={styles.closeButton}
            >
              閉じる
            </button>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalFrame} />
            <div className={styles.modalContent}>
              <h2>マーキング位置の確認</h2>
              <div className={styles.regionInfo}>
                <p>選択した地方: <span className={styles.regionName}>{selectedRegion}</span></p>
              </div>
              <p>この位置で決定しますか？</p>
              <div className={styles.modalButtons}>
                <div className={styles.buttonContainer}>
                  <div className={styles.buttonFrame} />
                  <button 
                    onClick={handleCancel}
                    className={styles.cancelButton}
                  >
                    キャンセル
                  </button>
                </div>
                <div className={styles.buttonContainer}>
                  <div className={styles.buttonFrame} />
                  <button 
                    onClick={handleConfirm}
                    className={styles.confirmButton}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;
