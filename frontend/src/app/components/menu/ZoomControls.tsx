import { useState } from 'react';
import styles from './ZoomControls.module.css';

interface ZoomControlsProps {
  onScaleChange: (scale: number) => void;
  initialScale?: number;
}

const ZoomControls = ({ onScaleChange, initialScale = 10 }: ZoomControlsProps) => {
  const [scale, setScale] = useState(initialScale);

  const handleZoomIn = () => {
    const newScale = Math.min(scale * 1.2, 40);
    setScale(newScale);
    onScaleChange(newScale);
  };

  const handleZoomOut = () => {
    const newScale = Math.max(scale / 1.2, 5);
    setScale(newScale);
    onScaleChange(newScale);
  };

  return (
    <div className={styles.zoomControls}>
      <button onClick={handleZoomOut} className={styles.zoomButton}>-</button>
      <button onClick={handleZoomIn} className={styles.zoomButton}>+</button>
    </div>
  );
};

export default ZoomControls; 