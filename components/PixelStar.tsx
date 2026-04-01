'use client';

import { useState, useEffect } from 'react';
import { Particle } from './Particle';

interface PixelStarProps {
  filled: boolean;
  onClick: () => void;
  exploding: boolean;
  label?: string;
  size?: number;
}

export function PixelStar({
  filled,
  onClick,
  exploding,
  label = '',
  size = 42,
}: PixelStarProps) {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    if (exploding) {
      const cx = size / 2;
      const cy = size / 2;
      const colors = ['#FFD700', '#FF6B35', '#FF1493', '#00FFFF', '#7FFF00', '#FFE135', '#FFF'];
      const np = [];
      for (let i = 0; i < 16; i++) {
        const angle = (Math.PI * 2 * i) / 16 + Math.random() * 0.3;
        np.push({
          id: Date.now() + i,
          x: cx - 3,
          y: cy - 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle,
          speed: 25 + Math.random() * 40,
          size: 3 + Math.floor(Math.random() * 5),
          delay: Math.random() * 80,
        });
      }
      setParticles(np);
      setTimeout(() => setParticles([]), 900);
    }
  }, [exploding]);

  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        width: size,
        minHeight: size + 16,
        cursor: 'pointer',
        transition: 'transform 0.15s',
        transform: filled ? 'scale(1)' : 'scale(0.8)',
        filter: filled ? 'drop-shadow(0 0 6px #FFD700)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
      <svg
        viewBox="0 0 16 16"
        width={size}
        height={size}
        style={{ imageRendering: 'pixelated', display: 'block' }}
      >
        {filled ? (
          <>
            <rect x="7" y="0" width="2" height="2" fill="#FFD700" />
            <rect x="6" y="2" width="4" height="2" fill="#FFD700" />
            <rect x="5" y="4" width="6" height="2" fill="#FFC200" />
            <rect x="0" y="6" width="16" height="2" fill="#FFD700" />
            <rect x="1" y="8" width="14" height="2" fill="#FFC200" />
            <rect x="2" y="10" width="12" height="2" fill="#FFD700" />
            <rect x="3" y="12" width="4" height="2" fill="#FFC200" />
            <rect x="9" y="12" width="4" height="2" fill="#FFC200" />
            <rect x="2" y="14" width="3" height="2" fill="#FFD700" />
            <rect x="11" y="14" width="3" height="2" fill="#FFD700" />
          </>
        ) : (
          <>
            <rect x="7" y="0" width="2" height="2" fill="#3a3a3a" />
            <rect x="6" y="2" width="4" height="2" fill="#333" />
            <rect x="5" y="4" width="6" height="2" fill="#3a3a3a" />
            <rect x="0" y="6" width="16" height="2" fill="#333" />
            <rect x="1" y="8" width="14" height="2" fill="#3a3a3a" />
            <rect x="2" y="10" width="12" height="2" fill="#333" />
            <rect x="3" y="12" width="4" height="2" fill="#3a3a3a" />
            <rect x="9" y="12" width="4" height="2" fill="#3a3a3a" />
            <rect x="2" y="14" width="3" height="2" fill="#333" />
            <rect x="11" y="14" width="3" height="2" fill="#333" />
          </>
        )}
      </svg>
      <div
        style={{
          marginTop: 2,
          minHeight: 12,
          fontFamily: 'var(--font-pixel)',
          fontSize: 6,
          color: filled ? '#FFD700' : 'transparent',
          letterSpacing: 0,
          textAlign: 'center',
          lineHeight: 1.2,
          textShadow: filled ? '0 0 4px #000' : 'none',
        }}
      >
        {label}
      </div>
    </div>
  );
}
