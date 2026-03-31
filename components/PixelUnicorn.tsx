'use client';

import { useState, useEffect } from 'react';

interface PixelUnicornProps {
  active: boolean;
}

export function PixelUnicorn({ active }: PixelUnicornProps) {
  const [rainbowFrame, setRainbowFrame] = useState(0);
  useEffect(() => {
    if (!active) return;
    const i = setInterval(() => setRainbowFrame((f) => (f + 1) % 4), 250);
    return () => clearInterval(i);
  }, [active]);

  if (!active) return null;

  const rainbowColors = ['#FF0000', '#FF8800', '#FFFF00', '#00FF00', '#0088FF', '#8800FF'];

  return (
    <div style={{ position: 'relative', width: 64, height: 56, margin: '0 auto' }}>
      <svg viewBox="0 0 32 28" width="64" height="56" style={{ imageRendering: 'pixelated' }}>
        {/* Body */}
        <rect x="8" y="12" width="14" height="8" fill="#F0F0F0" />
        <rect x="6" y="14" width="2" height="4" fill="#F0F0F0" />
        {/* Head */}
        <rect x="20" y="6" width="8" height="8" fill="#F0F0F0" />
        <rect x="22" y="4" width="4" height="2" fill="#F0F0F0" />
        {/* Horn */}
        <rect x="25" y="0" width="2" height="4" fill="#FFD700" />
        <rect x="26" y="0" width="1" height="2" fill="#FFC200" />
        {/* Eye */}
        <rect x="24" y="8" width="2" height="2" fill="#222" />
        <rect x="25" y="8" width="1" height="1" fill="#FFF" />
        {/* Mane */}
        <rect x="18" y="6" width="2" height="8" fill="#FF69B4" />
        <rect x="16" y="8" width="2" height="4" fill="#DA70D6" />
        {/* Legs */}
        <rect x="10" y="20" width="3" height="6" fill="#F0F0F0" />
        <rect x="17" y="20" width="3" height="6" fill="#F0F0F0" />
        <rect x="9" y="24" width="4" height="2" fill="#E8E8E8" />
        <rect x="16" y="24" width="4" height="2" fill="#E8E8E8" />
        {/* Tail */}
        <rect x="4" y="12" width="4" height="2" fill="#FF69B4" />
        <rect x="2" y="14" width="4" height="2" fill="#DA70D6" />
        <rect x="4" y="16" width="4" height="2" fill="#87CEEB" />
      </svg>
      {/* Rainbow particles from horn */}
      {rainbowColors.map((c, i) => {
        const offsetY = ((rainbowFrame + i) % 6) * 3;
        const offsetX = 30 + i * 5;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: offsetX - (rainbowFrame % 2),
              top: offsetY - 4 + ((rainbowFrame % 2) * 2),
              width: 5,
              height: 5,
              background: c,
              imageRendering: 'pixelated',
              opacity: 0.85,
              boxShadow: `0 0 4px ${c}`,
              transition: 'all 0.2s',
            }}
          />
        );
      })}
    </div>
  );
}
