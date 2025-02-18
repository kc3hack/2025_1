"use client"; // クライアントコンポーネントとしてマーク

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const MapPage = () => {
  // 初期表示を制御するstate
  const [isLoaded, setIsLoaded] = useState(false);
  const [position, setPosition] = useState({ x: 800, y: -900 });
  const [scale, setScale] = useState(10);
  
  useEffect(() => {
    setPosition({ 
      x: window.innerWidth / 1.5, 
      y: -900 
    });
    setIsLoaded(true);

    const handleResize = () => {
      setPosition({ x: window.innerWidth / 1.5, y: -900 });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });
  const japanImageRef = useRef<HTMLDivElement>(null);

  // 各地域の表示状態を管理する変数
  const [showMaskedKansai, setShowMaskedKansai] = useState(false);
  const [showMaskedKanto, setShowMaskedKanto] = useState(true);
  const [showMaskedKyushu, setShowMaskedKyushu] = useState(true);
  const [showMaskedTohoku, setShowMaskedTohoku] = useState(true);
  const [showMaskedChubu, setShowMaskedChubu] = useState(true);
  const [showMaskedChugoku, setShowMaskedChugoku] = useState(true);
  const [showMaskedShikoku, setShowMaskedShikoku] = useState(true);

  const handleZoomIn = () => {
    setScale(prevScale => Math.min(prevScale * 1.2, 15)); // 拡大度合いを細かくし、最大値を15に設定
  };

  const handleZoomOut = () => {
    setScale(prevScale => Math.max(prevScale / 1.2, 0.5)); // 縮小度合いを細かくし、最小値を0.5に設定
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // 左クリックのみ
    const pos = { x: e.pageX - position.x, y: e.pageY - position.y };
    setRel(pos);
    setDragging(true);
    e.stopPropagation();
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setPosition({ x: e.pageX - rel.x, y: e.pageY - rel.y });
    e.stopPropagation();
    e.preventDefault();
  };

  // メニューボタンの外枠スタイル
  const menuButtonFrameStyle = {
    width: '250px',
    height: '60px',
    margin: '0px 0',
    position: 'relative' as const,
  };

  // メニューボタンの背景スタイル
  const menuButtonBgStyle = {
    width: '95%',
    height: '80%',
    position: 'absolute' as const,
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#D5FF87',
    borderRadius: '5px',
    zIndex: 1,
  };

  // メニューボタンのスタイルを Tailwind クラスに変更
  const menuButtonStyle = {
    width: '100%',
    height: '100%',
    padding: '0',
    paddingBottom: '10px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '22px',
    textAlign: 'center' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    position: 'relative' as const,
    zIndex: 2,
    className: 'hover:bg-opacity-80 transition-colors duration-200' // Tailwind クラスを追加
  };

  const menuLineStyle = {
    width: '250px',
    height: '20px',
    background: `url('/frame/line.png') no-repeat center center`,
    backgroundSize: '100% auto',
    position: 'relative' as const,
    zIndex: 1,
  };

  // メニューフレームに Tailwind クラスを追加
  const menuFrameStyle = {
    position: 'fixed' as const,
    top: '64px',
    left: '27px',
    width: '250px',
    height: '350px',
    padding: '0px 15px 47px 15px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    className: 'backdrop-blur-sm' // 半透明エフェクトを追加
  };

  const menuInnerStyle = {
    width: '95%',
    height: '95%',
    backgroundColor: '#E5FFB6',
    padding: '13px 15px 40px 15px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: '5px',
    position: 'relative' as const,
    zIndex: 1,
  };

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        backgroundImage: 'url(/background/ocean.png)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        ref={japanImageRef}
        style={{
          position: 'absolute',
          top: `${position.y}px`,
          left: `${position.x}px`,
          transform: `scale(${scale})`,
          cursor: dragging ? 'grabbing' : 'grab',
          width: '50%',
          height: '50%',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s'
        }}
        onMouseDown={handleMouseDown}
      >
        <div style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundImage: 'url(/japan/defaultjapan.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} />
        {showMaskedKansai && (
          <div style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundImage: 'url(/japan/mask/maskedKansai.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }} />
        )}
        {showMaskedKanto && (
          <div style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundImage: 'url(/japan/mask/maskedKanto.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }} />
        )}
        {showMaskedKyushu && (
          <div style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundImage: 'url(/japan/mask/maskedKyushu.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }} />
        )}
        {showMaskedTohoku && (
          <div style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundImage: 'url(/japan/mask/maskedTohoku.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }} />
        )}
        {showMaskedChubu && (
          <div style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundImage: 'url(/japan/mask/maskedChubu.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }} />
        )}
        {showMaskedChugoku && (
          <div style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundImage: 'url(/japan/mask/maskedChugoku.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }} />
        )}
        {showMaskedShikoku && (
          <div style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundImage: 'url(/japan/mask/maskedShikoku.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }} />
        )}
      </div>

      {/* 左側のメニュー */}
      <div style={menuFrameStyle}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `url('/frame/menu.png') no-repeat center center`,
          backgroundSize: '100% 100%',
          zIndex: 2,
        }} />
        <div style={menuInnerStyle}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
            paddingTop: '20px',
          }}>
            <h2 style={{ 
              margin: '0 0 16px 0',
              fontSize: '26px',
              fontWeight: 'bold'
            }}>メニュー</h2>
            <div style={menuButtonFrameStyle}>
              <div style={menuButtonBgStyle} />
              <button style={menuButtonStyle}>スコア一覧</button>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `url('/frame/button.png') no-repeat center center`,
                backgroundSize: '100% 100%',
                zIndex: 3,
                pointerEvents: 'none',
              }} />
            </div>
            <div style={menuButtonFrameStyle}>
              <div style={menuButtonBgStyle} />
              <button style={menuButtonStyle}>パーツコレクション</button>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `url('/frame/button.png') no-repeat center center`,
                backgroundSize: '100% 100%',
                zIndex: 3,
                pointerEvents: 'none',
              }} />
            </div>
            <div style={menuButtonFrameStyle}>
              <div style={menuButtonBgStyle} />
              <button style={menuButtonStyle}>古墳コレクション</button>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `url('/frame/button.png') no-repeat center center`,
                backgroundSize: '100% 100%',
                zIndex: 3,
                pointerEvents: 'none',
              }} />
            </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
          }}>
            <div style={menuLineStyle}></div>
            <div style={menuButtonFrameStyle}>
              <div style={menuButtonBgStyle} />
              <button style={menuButtonStyle}>ゲーム終了</button>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `url('/frame/button.png') no-repeat center center`,
                backgroundSize: '100% 100%',
                zIndex: 3,
                pointerEvents: 'none',
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* 右上の統治度表示 */}
      <div style={{
        ...menuFrameStyle,
        left: 'auto',
        right: '27px',
        width: '250px',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `url('/frame/menu.png') no-repeat center center`,
          backgroundSize: '100% 100%',
          zIndex: 2,
        }} />
        <div style={{
          ...menuInnerStyle,
          backgroundColor: '#FFFFFF',
          padding: '20px 10px 30px 10px',
        }}>
          <table style={{ 
            width: '100%',
            borderSpacing: '0 14px',
            fontSize: '25px',
            marginTop: '-14px',
            lineHeight: '1',
          }}> 
            <tbody>
              <tr>
                <td>日本の統治度</td>
                <td style={{ textAlign: 'right', paddingLeft: '20px' }}>24%</td>
              </tr>
              <tr>
                <td colSpan={2} style={{ padding: '0px 0' }}>
                  <div style={menuLineStyle}></div>
                </td>
              </tr>
              <tr>
                <td>関西の統治度</td>
                <td style={{ textAlign: 'right', paddingLeft: '20px' }}>50%</td>
              </tr>
              <tr>
                <td>中部の統治度</td>
                <td style={{ textAlign: 'right', paddingLeft: '20px' }}>0%</td>
              </tr>
              <tr>
                <td>関東の統治度</td>
                <td style={{ textAlign: 'right', paddingLeft: '20px' }}>0%</td>
              </tr>
              <tr>
                <td>東北の統治度</td>
                <td style={{ textAlign: 'right', paddingLeft: '20px' }}>0%</td>
              </tr>
              <tr>
                <td>中国の統治度</td>
                <td style={{ textAlign: 'right', paddingLeft: '20px' }}>0%</td>
              </tr>
              <tr>
                <td>四国の統治度</td>
                <td style={{ textAlign: 'right', paddingLeft: '20px' }}>0%</td>
              </tr>
              <tr>
                <td>九州の統治度</td>
                <td style={{ textAlign: 'right', paddingLeft: '20px' }}>0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 拡大縮小ボタン */}
      <div style={{
        position: 'absolute',
        bottom: '75px',
        left: '50px',
        display: 'flex',
        flexDirection: 'row',
        gap: '20px'
      }}>
        <button onClick={handleZoomOut} style={{
          ...buttonStyle,
          width: '60px',
          height: '60px',
          fontSize: '60px',
          padding: '0 0 8px 0'
        }}>-</button>
        <button onClick={handleZoomIn} style={{
          ...buttonStyle,
          width: '60px',
          height: '60px',
          fontSize: '60px',
        }}>+</button>
      </div>

      {/* 右下の原寸画像とその背景 */}
      <div style={{
        position: 'fixed',
        bottom: '0px',
        right: '125px',
        width: '250px',
        height: '250px',
        zIndex: 10
      }}>
        <div style={{
          position: 'absolute',
          width: '93%',
          height: '43%',
          backgroundColor: '#FBC9FF',  // 背景色を変更
          borderRadius: '10px',
          zIndex: 0,
          bottom: '31%',
          left: '4%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          fontSize: '20px',
          textAlign: 'center',
          lineHeight: '1.4'
        }}>
          <div style={{ fontSize: '28px', paddingBottom: '10px' }}>勢力を拡大する</div>  {/* 上の文字サイズを大きく */}
          <div>ランダム数: 10</div>
        </div>
        <div style={{
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/frame/nextButton.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          zIndex: 1,
          pointerEvents: 'none'
        }} />
      </div>
    </div>
  );
};

// ボタンスタイルを更新
const buttonStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  border: '5px solid #000000', // ボーダーを追加
  backgroundColor: '#fff',
  boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
  cursor: 'pointer',
  fontSize: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  className: 'hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200'
};

export default MapPage;
