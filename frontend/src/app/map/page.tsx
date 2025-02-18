import React from 'react';
import Image from 'next/image';

const MapPage = () => {
  return (
    <div style={{ 
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
    }}>
      <Image 
        src="/japan/defaultjapan.png" 
        alt="Japan" 
        layout="fill" 
        objectFit="contain" 
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </div>
  );
};

export default MapPage;
