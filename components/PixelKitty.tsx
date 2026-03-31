'use client';

import { useState, useEffect } from 'react';

interface PixelKittyProps {
  active: boolean;
}

export function PixelKitty({ active }: PixelKittyProps) {
  const [sparkleFrame, setSparkleFrame] = useState(0);

  useEffect(() => {
    if (!active) return;
    const i = setInterval(() => setSparkleFrame((f) => (f + 1) % 4), 220);
    return () => clearInterval(i);
  }, [active]);

  if (!active) return null;

  const sparkleColors = ['#FF69B4', '#DA70D6', '#FF1493', '#BF5FFF'];
  const sparklePositions = [
    { x: 58, y: 4 },
    { x: 62, y: 18 },
    { x: 2, y: 8 },
    { x: 0, y: 26 },
    { x: 56, y: 34 },
    { x: 4, y: 36 },
  ];

  return (
    <div style={{ position: 'relative', width: 64, height: 56, margin: '0 auto' }}>
      <svg viewBox="0 0 32 28" width="64" height="56" style={{ imageRendering: 'pixelated' }}>

        {/* === EARS (pointed triangles) === */}
        {/* Left ear — 3 rows to form triangle */}
        <rect x="4"  y="0" width="2" height="1" fill="#8B2FC9" />
        <rect x="3"  y="1" width="4" height="1" fill="#8B2FC9" />
        <rect x="2"  y="2" width="6" height="2" fill="#9B3FD4" />
        {/* Left ear inner pink */}
        <rect x="4"  y="1" width="2" height="2" fill="#FF69B4" />

        {/* Right ear */}
        <rect x="26" y="0" width="2" height="1" fill="#8B2FC9" />
        <rect x="25" y="1" width="4" height="1" fill="#8B2FC9" />
        <rect x="24" y="2" width="6" height="2" fill="#9B3FD4" />
        {/* Right ear inner pink */}
        <rect x="26" y="1" width="2" height="2" fill="#FF69B4" />

        {/* === BIG ROUND HEAD === */}
        <rect x="2"  y="4"  width="28" height="20" fill="#9B3FD4" />
        {/* Slightly round corners */}
        <rect x="1"  y="5"  width="1"  height="18" fill="#9B3FD4" />
        <rect x="30" y="5"  width="1"  height="18" fill="#9B3FD4" />
        <rect x="3"  y="3"  width="26" height="1"  fill="#9B3FD4" />

        {/* === EYES (big white circles, dark pupils) === */}
        {/* Left eye */}
        <rect x="6"  y="7"  width="8" height="7"  fill="#FFFFFF" />
        <rect x="7"  y="8"  width="6" height="6"  fill="#222222" />
        {/* Left pupil shine */}
        <rect x="10" y="9"  width="2" height="2"  fill="#FFFFFF" />
        {/* Left eye outline */}
        <rect x="5"  y="8"  width="1" height="5"  fill="#222222" />
        <rect x="14" y="8"  width="1" height="5"  fill="#222222" />

        {/* Right eye */}
        <rect x="18" y="7"  width="8" height="7"  fill="#FFFFFF" />
        <rect x="19" y="8"  width="6" height="6"  fill="#222222" />
        {/* Right pupil shine */}
        <rect x="22" y="9"  width="2" height="2"  fill="#FFFFFF" />
        {/* Right eye outline */}
        <rect x="17" y="8"  width="1" height="5"  fill="#222222" />
        <rect x="26" y="8"  width="1" height="5"  fill="#222222" />

        {/* === PINK NOSE === */}
        <rect x="14" y="16" width="4" height="2"  fill="#FF69B4" />
        <rect x="15" y="15" width="2" height="1"  fill="#FF69B4" />

        {/* === MOUTH === */}
        <rect x="13" y="18" width="2" height="1"  fill="#8B2FC9" />
        <rect x="17" y="18" width="2" height="1"  fill="#8B2FC9" />

        {/* === ROSY CHEEKS === */}
        <rect x="4"  y="16" width="4" height="2"  fill="#FF69B4" />
        <rect x="24" y="16" width="4" height="2"  fill="#FF69B4" />

        {/* === WHISKERS (long white lines each side) === */}
        {/* Left whiskers */}
        <rect x="0"  y="14" width="5" height="1"  fill="#FFFFFF" />
        <rect x="0"  y="17" width="5" height="1"  fill="#FFFFFF" />
        {/* Right whiskers */}
        <rect x="27" y="14" width="5" height="1"  fill="#FFFFFF" />
        <rect x="27" y="17" width="5" height="1"  fill="#FFFFFF" />

        {/* === SMALL BODY BELOW === */}
        <rect x="9"  y="24" width="14" height="4"  fill="#9B3FD4" />
        {/* Tiny paws */}
        <rect x="8"  y="26" width="5"  height="2"  fill="#FF69B4" />
        <rect x="19" y="26" width="5"  height="2"  fill="#FF69B4" />

      </svg>

      {/* Animated sparkles */}
      {sparklePositions.map((pos, i) => {
        const color = sparkleColors[(i + sparkleFrame) % sparkleColors.length];
        const bounce = (sparkleFrame + i) % 2 === 0 ? 0 : -3;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: pos.x,
              top: pos.y + bounce,
              width: 5,
              height: 5,
              background: color,
              imageRendering: 'pixelated',
              opacity: 0.9,
              boxShadow: `0 0 6px ${color}`,
              transition: 'top 0.2s',
            }}
          />
        );
      })}
    </div>
  );
}
