'use client';

import { useState, useEffect } from 'react';

interface PixelKittyProps {
  active: boolean;
}

export function PixelKitty({ active }: PixelKittyProps) {
  const [sparkleFrame, setSparkleFrame] = useState(0);

  useEffect(() => {
    if (!active) return;
    const i = setInterval(() => setSparkleFrame((f) => (f + 1) % 4), 200);
    return () => clearInterval(i);
  }, [active]);

  if (!active) return null;

  // Pink/purple sparkle hearts around kitty
  const sparkleColors = ['#FF69B4', '#DA70D6', '#FF1493', '#BF5FFF', '#FF69B4', '#FF00CC'];
  const sparklePositions = [
    { x: 54, y: 2 },
    { x: 60, y: 10 },
    { x: 50, y: 18 },
    { x: 56, y: 26 },
    { x: 4, y: 6 },
    { x: 0, y: 20 },
  ];

  return (
    <div style={{ position: 'relative', width: 64, height: 56, margin: '0 auto' }}>
      <svg viewBox="0 0 32 28" width="64" height="56" style={{ imageRendering: 'pixelated' }}>
        {/* === EARS === */}
        {/* Left ear outer (purple) */}
        <rect x="8"  y="0" width="2" height="2" fill="#9B4DCA" />
        <rect x="8"  y="1" width="4" height="3" fill="#9B4DCA" />
        {/* Left ear inner (pink) */}
        <rect x="9"  y="2" width="2" height="2" fill="#FF69B4" />
        {/* Right ear outer (purple) */}
        <rect x="20" y="0" width="2" height="2" fill="#9B4DCA" />
        <rect x="18" y="1" width="4" height="3" fill="#9B4DCA" />
        {/* Right ear inner (pink) */}
        <rect x="19" y="2" width="2" height="2" fill="#FF69B4" />

        {/* === HEAD === */}
        <rect x="8"  y="4"  width="16" height="10" fill="#9B4DCA" />
        {/* Head sides rounded */}
        <rect x="7"  y="5"  width="1"  height="8"  fill="#9B4DCA" />
        <rect x="24" y="5"  width="1"  height="8"  fill="#9B4DCA" />

        {/* === EYES === big and bright */}
        {/* Left eye white */}
        <rect x="10" y="6"  width="4" height="4"  fill="#FFF" />
        {/* Left pupil */}
        <rect x="11" y="7"  width="2" height="3"  fill="#222" />
        {/* Left eye shine */}
        <rect x="11" y="7"  width="1" height="1"  fill="#FFF" />
        {/* Right eye white */}
        <rect x="18" y="6"  width="4" height="4"  fill="#FFF" />
        {/* Right pupil */}
        <rect x="19" y="7"  width="2" height="3"  fill="#222" />
        {/* Right eye shine */}
        <rect x="19" y="7"  width="1" height="1"  fill="#FFF" />

        {/* === NOSE (pink) === */}
        <rect x="15" y="10" width="2" height="1"  fill="#FF69B4" />
        <rect x="14" y="11" width="1" height="1"  fill="#FF69B4" />
        <rect x="17" y="11" width="1" height="1"  fill="#FF69B4" />

        {/* === CHEEKS (soft pink) === */}
        <rect x="8"  y="10" width="3" height="2"  fill="#FF69B466" />
        <rect x="21" y="10" width="3" height="2"  fill="#FF69B466" />

        {/* === WHISKERS === */}
        <rect x="2"  y="10" width="5" height="1"  fill="#DA70D6" />
        <rect x="2"  y="12" width="5" height="1"  fill="#DA70D6" />
        <rect x="25" y="10" width="5" height="1"  fill="#DA70D6" />
        <rect x="25" y="12" width="5" height="1"  fill="#DA70D6" />

        {/* === BODY === */}
        <rect x="9"  y="14" width="14" height="10" fill="#9B4DCA" />
        {/* Body sides */}
        <rect x="8"  y="15" width="1"  height="8"  fill="#9B4DCA" />
        <rect x="23" y="15" width="1"  height="8"  fill="#9B4DCA" />

        {/* === BELLY (lighter pink-purple) === */}
        <rect x="12" y="16" width="8"  height="6"  fill="#DA9FF5" />

        {/* === FRONT LEGS === */}
        <rect x="10" y="24" width="4"  height="4"  fill="#9B4DCA" />
        <rect x="18" y="24" width="4"  height="4"  fill="#9B4DCA" />
        {/* Paws (pink) */}
        <rect x="10" y="26" width="4"  height="2"  fill="#FF69B4" />
        <rect x="18" y="26" width="4"  height="2"  fill="#FF69B4" />

        {/* === TAIL (curving up on right) === */}
        <rect x="24" y="20" width="2"  height="6"  fill="#BF5FFF" />
        <rect x="26" y="16" width="2"  height="5"  fill="#BF5FFF" />
        <rect x="28" y="13" width="2"  height="4"  fill="#BF5FFF" />
        <rect x="26" y="12" width="2"  height="2"  fill="#BF5FFF" />
        {/* Tail tip (bright pink) */}
        <rect x="26" y="11" width="2"  height="2"  fill="#FF69B4" />
      </svg>

      {/* Animated sparkles around the kitty */}
      {sparklePositions.map((pos, i) => {
        const offset = (sparkleFrame + i) % 4;
        const color = sparkleColors[(i + sparkleFrame) % sparkleColors.length];
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: pos.x + (offset % 2 === 0 ? 0 : 2),
              top: pos.y + (offset < 2 ? 0 : -3),
              width: 5,
              height: 5,
              background: color,
              imageRendering: 'pixelated',
              opacity: 0.9,
              boxShadow: `0 0 5px ${color}`,
              transition: 'all 0.2s',
            }}
          />
        );
      })}
    </div>
  );
}
