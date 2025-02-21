"use client";

import { useRef } from 'react';
import styles from './DraggableMap.module.css';

interface DraggableMapProps {
  position: { x: number; y: number };
  scale: number;
  isLoaded: boolean;
  dragging: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}

const DraggableMap = ({
  position,
  scale,
  isLoaded,
  dragging,
  onMouseDown,
  children
}: DraggableMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={mapRef}
      className={`${styles.japanMap} ${dragging ? styles.dragging : ''}`}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: `scale(${scale})`,
        opacity: isLoaded ? 1 : 0,
      }}
      onMouseDown={onMouseDown}
    >
      {children}
    </div>
  );
};

export default DraggableMap; 