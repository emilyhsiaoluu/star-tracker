'use client';

import { useState, useEffect } from 'react';

interface ParticleProps {
  x: number;
  y: number;
  color: string;
  angle: number;
  speed: number;
  size: number;
  delay: number;
}

export function Particle({ x, y, color, angle, speed, size, delay }: ParticleProps) {
  const [style, setStyle] = useState({
    position: 'absolute' as const,
    left: x,
    top: y,
    width: size,
    height: size,
    background: color,
    opacity: 1,
    transform: 'scale(1)',
    transition: 'none',
    pointerEvents: 'none' as const,
    zIndex: 100,
    imageRendering: 'pixelated' as const,
  });

  useEffect(() => {
    const t = setTimeout(() => {
      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed;
      setStyle((s) => ({
        ...s,
        left: x + dx,
        top: y + dy,
        opacity: 0,
        transform: 'scale(0)',
        transition: 'all 0.7s cubic-bezier(.15,.8,.3,1)',
      }));
    }, delay);
    return () => clearTimeout(t);
  }, []);

  return <div style={style as any} />;
}
