import { useRouter } from 'next/navigation';
import styles from './ListMenu.module.css';

const Menu = () => {
  const router = useRouter();

  const goToScoreCollections = () => {
    router.push('/map/scoreCollections');
  };

  const goToPartsCollections = () => {
    router.push('/map/partsCollections');
  };

  const goToTombsCollections = () => {
    router.push('/map/tombsCollections');
  };

  const goToToHome = () => {
    router.push('/');
  };

  return (
    <div className={styles.menuFrame}>
      <div className={styles.menuFrameBackground} />
      <div className={styles.menuInner}>
        <h2 className={styles.menuTitle}>メニュー</h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
          paddingTop: '20px',
        }}>
          <div className={styles.buttonFrame}>
            <div className={styles.buttonBackground} />
            <button className={styles.menuButton} onClick={goToScoreCollections}>スコア一覧</button>
            <div className={styles.buttonFrameBackground} />
          </div>
          <div className={styles.buttonFrame}>
            <div className={styles.buttonBackground} />
            <button className={styles.menuButton} onClick={goToPartsCollections}>パーツコレクション</button>
            <div className={styles.buttonFrameBackground} />
          </div>
          <div className={styles.buttonFrame}>
            <div className={styles.buttonBackground} />
            <button className={styles.menuButton} onClick={goToTombsCollections}>古墳コレクション</button>
            <div className={styles.buttonFrameBackground} />
          </div>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
        }}>
          <div className={styles.menuLine} />
          <div className={styles.buttonFrame}>
            <div className={styles.buttonBackground} />
            <button className={styles.menuButton} onClick={goToToHome}>ゲーム終了</button>
            <div className={styles.buttonFrameBackground} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu; 