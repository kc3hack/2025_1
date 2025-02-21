import styles from './ZoomControls.module.css';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const ZoomControls = ({ onZoomIn, onZoomOut }: ZoomControlsProps) => {
  return (
    <div className={styles.zoomControls}>
      <button onClick={onZoomOut} className={styles.zoomButton}>-</button>
      <button onClick={onZoomIn} className={styles.zoomButton}>+</button>
    </div>
  );
};

export default ZoomControls; 