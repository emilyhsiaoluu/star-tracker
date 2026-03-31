'use client';

import { useState, useEffect } from 'react';

interface PixelCharizardProps {
  active: boolean;
}

export function PixelCharizard({ active }: PixelCharizardProps) {
  const [fireFrame, setFireFrame] = useState(0);
  useEffect(() => {
    if (!active) return;
    const i = setInterval(() => setFireFrame((f) => (f + 1) % 4), 200);
    return () => clearInterval(i);
  }, [active]);

  if (!active) return null;

  const fireOffsets = [
    [{ x: 38, y: 8 }, { x: 42, y: 4 }, { x: 40, y: 0 }],
    [{ x: 40, y: 6 }, { x: 44, y: 2 }, { x: 38, y: 0 }],
    [{ x: 36, y: 7 }, { x: 42, y: 3 }, { x: 44, y: 0 }],
    [{ x: 40, y: 9 }, { x: 38, y: 4 }, { x: 42, y: 1 }],
  ];
  const fireColors = ['#FF4500', '#FF6B35', '#FFD700', '#FF1500'];

  return (
    <div style={{ position: 'relative', width: 64, height: 56, margin: '0 auto' }}>
      <svg viewBox="0 0 32 28" width="64" height="56" style={{ imageRendering: 'pixelated' }}>
        {/* Body */}
        <rect x="10" y="10" width="10" height="10" fill="#E86830" />
        <rect x="8" y="12" width="2" height="6" fill="#E86830" />
        <rect x="20" y="12" width="2" height="6" fill="#E86830" />
        {/* Belly */}
        <rect x="12" y="14" width="6" height="4" fill="#F4C878" />
        {/* Head */}
        <rect x="12" y="4" width="8" height="8" fill="#E86830" />
        <rect x="10" y="6" width="2" height="4" fill="#E86830" />
        {/* Horns */}
        <rect x="12" y="2" width="2" height="2" fill="#E86830" />
        <rect x="18" y="2" width="2" height="2" fill="#E86830" />
        {/* Eyes */}
        <rect x="14" y="6" width="2" height="2" fill="#FFF" />
        <rect x="18" y="6" width="2" height="2" fill="#FFF" />
        <rect x="15" y="7" width="1" height="1" fill="#222" />
        <rect x="19" y="7" width="1" height="1" fill="#222" />
        {/* Mouth open */}
        <rect x="20" y="8" width="4" height="3" fill="#8B0000" />
        <rect x="20" y="8" width="1" height="1" fill="#FFF" />
        <rect x="23" y="10" width="1" height="1" fill="#FFF" />
        {/* Wings */}
        <rect x="4" y="8" width="4" height="2" fill="#48A0D8" />
        <rect x="2" y="6" width="4" height="2" fill="#48A0D8" />
        <rect x="0" y="4" width="4" height="2" fill="#48A0D8" />
        {/* Tail with flame */}
        <rect x="10" y="20" width="2" height="4" fill="#E86830" />
        <rect x="8" y="24" width="2" height="2" fill="#FF6B35" />
        <rect x="8" y="22" width="2" height="2" fill="#FFD700" />
        {/* Legs */}
        <rect x="12" y="20" width="3" height="4" fill="#E86830" />
        <rect x="17" y="20" width="3" height="4" fill="#E86830" />
        <rect x="11" y="24" width="4" height="2" fill="#E86830" />
        <rect x="16" y="24" width="4" height="2" fill="#E86830" />
      </svg>
      {/* Animated fire breath */}
      {fireOffsets[fireFrame].map((f, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: f.x,
            top: f.y,
            width: 6 + i * 2,
            height: 6 + i * 2,
            background: fireColors[(fireFrame + i) % fireColors.length],
            imageRendering: 'pixelated',
            opacity: 0.9 - i * 0.15,
            boxShadow: `0 0 ${4 + i * 2}px ${fireColors[(fireFrame + i) % fireColors.length]}`,
          }}
        />
      ))}
    </div>
  );
}
