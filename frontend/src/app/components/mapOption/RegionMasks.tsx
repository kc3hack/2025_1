"use client";

import { useState } from 'react';
import styles from './RegionMasks.module.css';

export const useRegionMasks = () => {
  const [showMaskedKansai, setShowMaskedKansai] = useState(false);
  const [showMaskedKanto, setShowMaskedKanto] = useState(true);
  const [showMaskedKyushu, setShowMaskedKyushu] = useState(true);
  const [showMaskedTohoku, setShowMaskedTohoku] = useState(true);
  const [showMaskedChubu, setShowMaskedChubu] = useState(true);
  const [showMaskedChugoku, setShowMaskedChugoku] = useState(true);
  const [showMaskedShikoku, setShowMaskedShikoku] = useState(true);

  return {
    showMaskedKansai,
    showMaskedKanto,
    showMaskedKyushu,
    showMaskedTohoku,
    showMaskedChubu,
    showMaskedChugoku,
    showMaskedShikoku,
    setShowMaskedKansai,
    setShowMaskedKanto,
    setShowMaskedKyushu,
    setShowMaskedTohoku,
    setShowMaskedChubu,
    setShowMaskedChugoku,
    setShowMaskedShikoku,
  };
};

interface RegionMasksProps {
  showMaskedKansai: boolean;
  showMaskedKanto: boolean;
  showMaskedKyushu: boolean;
  showMaskedTohoku: boolean;
  showMaskedChubu: boolean;
  showMaskedChugoku: boolean;
  showMaskedShikoku: boolean;
}

const RegionMasks: React.FC<RegionMasksProps> = ({
  showMaskedKansai,
  showMaskedKanto,
  showMaskedKyushu,
  showMaskedTohoku,
  showMaskedChubu,
  showMaskedChugoku,
  showMaskedShikoku,
}) => {
  return (
    <>
      {showMaskedKansai && (
        <div className={styles.mapImage} style={{ backgroundImage: 'url(/japan/mask/maskedKansai.png)' }} />
      )}
      {showMaskedKanto && (
        <div className={styles.mapImage} style={{ backgroundImage: 'url(/japan/mask/maskedKanto.png)' }} />
      )}
      {showMaskedKyushu && (
        <div className={styles.mapImage} style={{ backgroundImage: 'url(/japan/mask/maskedKyushu.png)' }} />
      )}
      {showMaskedTohoku && (
        <div className={styles.mapImage} style={{ backgroundImage: 'url(/japan/mask/maskedTohoku.png)' }} />
      )}
      {showMaskedChubu && (
        <div className={styles.mapImage} style={{ backgroundImage: 'url(/japan/mask/maskedChubu.png)' }} />
      )}
      {showMaskedChugoku && (
        <div className={styles.mapImage} style={{ backgroundImage: 'url(/japan/mask/maskedChugoku.png)' }} />
      )}
      {showMaskedShikoku && (
        <div className={styles.mapImage} style={{ backgroundImage: 'url(/japan/mask/maskedShikoku.png)' }} />
      )}
    </>
  );
};

export default RegionMasks; 