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
        minHeight: label ? size + 16 : size,
        cursor: 'pointer',
        transition: 'transform 0.15s',
        transform: filled ? 'scale(1)' : 'scale(0.8)',
        filter: filled ? 'drop-shadow(0 0 6px #8B4513)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
      <div
        role="img"
        aria-label={filled ? 'poop' : 'empty'}
        style={{
          width: size,
          height: size,
          fontSize: size * 0.82,
          lineHeight: `${size}px`,
          textAlign: 'center',
          userSelect: 'none',
          filter: filled ? 'none' : 'grayscale(1) brightness(0.5)',
          opacity: filled ? 1 : 0.3,
        }}
      >
        💩
      </div>
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
