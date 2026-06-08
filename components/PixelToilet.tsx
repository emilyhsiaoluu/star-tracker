'use client';

import { useState, useEffect } from 'react';

interface PixelToiletProps {
  active: boolean;
}

export function PixelToilet({ active }: PixelToiletProps) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (!active) return;
    const i = setInterval(() => setFrame((f) => (f + 1) % 4), 220);
    return () => clearInterval(i);
  }, [active]);

  if (!active) return null;

  // Per-frame wiggle of the whole toilet + the poop bobbing out of the bowl.
  const wiggleX = [0, -1.5, 0, 1.5][frame];
  const wiggleRot = [-2, 0, 2, 0][frame];
  const poopTop = [20, 12, 6, 12][frame];
  const poopScale = [0.7, 0.9, 1.05, 0.9][frame];

  return (
    <div style={{ position: 'relative', width: 64, height: 60, margin: '0 auto' }}>
      {/* Poop coming out of the bowl */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: poopTop,
          transform: `translateX(-50%) scale(${poopScale})`,
          fontSize: 22,
          lineHeight: 1,
          zIndex: 2,
          filter: 'drop-shadow(0 0 4px rgba(139,69,19,0.8))',
          transition: 'top 0.15s, transform 0.15s',
        }}
      >
        💩
      </div>

      {/* Toilet (pixel art) */}
      <svg
        viewBox="0 0 32 32"
        width="64"
        height="60"
        style={{
          imageRendering: 'pixelated',
          position: 'absolute',
          left: 0,
          top: 0,
          transform: `translateX(${wiggleX}px) rotate(${wiggleRot}deg)`,
          transformOrigin: '50% 90%',
          transition: 'transform 0.15s',
        }}
      >
        {/* Tank */}
        <rect x="8" y="6" width="14" height="9" fill="#E8E8E8" />
        <rect x="8" y="6" width="14" height="2" fill="#FFFFFF" />
        <rect x="20" y="6" width="2" height="9" fill="#C4C4C4" />
        {/* Flush button */}
        <rect x="14" y="8" width="3" height="2" fill="#9AA0A6" />
        {/* Seat / rim (top oval) */}
        <rect x="6" y="15" width="20" height="3" fill="#FFFFFF" />
        <rect x="6" y="15" width="20" height="1" fill="#D8D8D8" />
        {/* Bowl opening (water) */}
        <rect x="9" y="18" width="14" height="5" fill="#BFE3FF" />
        <rect x="9" y="18" width="14" height="1" fill="#8FCBF0" />
        {/* Bowl outer walls */}
        <rect x="7" y="18" width="2" height="6" fill="#E8E8E8" />
        <rect x="23" y="18" width="2" height="6" fill="#C4C4C4" />
        <rect x="9" y="23" width="14" height="2" fill="#E8E8E8" />
        {/* Pedestal */}
        <rect x="12" y="25" width="8" height="4" fill="#E0E0E0" />
        <rect x="18" y="25" width="2" height="4" fill="#C4C4C4" />
        {/* Base */}
        <rect x="9" y="29" width="14" height="2" fill="#D0D0D0" />
        <rect x="9" y="31" width="14" height="1" fill="#A8A8A8" />
      </svg>

      {/* Little stink lines */}
      {[0, 1].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: poopTop - 8,
            left: `${42 + i * 14}%`,
            width: 2,
            height: 6,
            background: '#7FBF7F',
            opacity: frame % 2 === 0 ? 0.7 : 0.3,
            borderRadius: 2,
            zIndex: 1,
          }}
        />
      ))}
    </div>
  );
}
