'use client';

import { useState, useEffect } from 'react';
import { PixelCharizard } from './PixelCharizard';
import { PixelUnicorn } from './PixelUnicorn';
import { PixelKitty } from './PixelKitty';

interface RetroTVProps {
  active: boolean;
  character: 'charizard' | 'unicorn' | 'kitty';
  onReset?: () => void;
  scale?: number;
  rewardText?: string;
}

export function RetroTV({
  active,
  character,
  onReset,
  scale = 1,
  rewardText,
}: RetroTVProps) {
  const [scanline, setScanline] = useState(0);
  useEffect(() => {
    if (!active) return;
    const i = setInterval(() => setScanline((s) => (s + 1) % 24), 100);
    return () => clearInterval(i);
  }, [active]);

  return (
    <div
      style={{
        position: 'relative',
        width: 160,
        height: 152,
        margin: '0 auto',
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
      }}
    >
      {/* V-Antenna */}
      <svg width="80" height="30" style={{ position: 'absolute', top: -26, left: 40, zIndex: 1 }}>
        <line x1="40" y1="28" x2="10" y2="2" stroke="#777" strokeWidth="3" />
        <line x1="40" y1="28" x2="70" y2="2" stroke="#777" strokeWidth="3" />
        <circle cx="10" cy="2" r="4" fill={active ? '#00ff88' : '#555'} />
        <circle cx="70" cy="2" r="4" fill={active ? '#00ff88' : '#555'} />
        {active && (
          <>
            <circle
              cx="10"
              cy="2"
              r="4"
              fill="#00ff88"
              style={{ filter: 'blur(3px)', opacity: 0.6 }}
            />
            <circle
              cx="70"
              cy="2"
              r="4"
              fill="#00ff88"
              style={{ filter: 'blur(3px)', opacity: 0.6 }}
            />
          </>
        )}
      </svg>

      {/* TV Shell */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 160,
          height: 130,
          background: 'linear-gradient(180deg, #4a4a4a 0%, #333 60%, #2a2a2a 100%)',
          borderRadius: '10px 10px 6px 6px',
          border: '3px solid #555',
          boxShadow: active
            ? '0 0 20px rgba(0,255,136,0.2), inset 0 1px 0 #666'
            : '0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 #666',
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {/* Screen area */}
        <div style={{ flex: 1, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              width: 108,
              height: 90,
              background: active ? '#0a1a0f' : '#0a0a0a',
              borderRadius: 8,
              border: '3px solid #222',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: active
                ? 'inset 0 0 20px rgba(0,255,136,0.1), 0 0 8px rgba(0,255,136,0.15)'
                : 'inset 0 0 10px rgba(0,0,0,0.8)',
            }}
          >
            {/* Screen curvature */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 8,
                background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            />
            {active && (
              <>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 5,
                    pointerEvents: 'none',
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: `${(scanline / 24) * 100}%`,
                    height: 3,
                    background: 'rgba(0,255,136,0.08)',
                    zIndex: 6,
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                  }}
                >
                  {rewardText ? (
                    <div
                      style={{
                        fontFamily: 'var(--font-pixel)',
                        fontSize: 11,
                        lineHeight: 1.6,
                        color: '#00ff88',
                        textShadow: '0 0 6px rgba(0,255,136,0.6)',
                        textAlign: 'center',
                        padding: '0 6px',
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                      }}
                    >
                      {rewardText}
                    </div>
                  ) : character === 'charizard' ? (
                    <PixelCharizard active />
                  ) : character === 'kitty' ? (
                    <PixelKitty active />
                  ) : (
                    <PixelUnicorn active />
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Control panel */}
        <div
          style={{
            width: 28,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            paddingRight: 4,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 35%, #888, #444)',
              border: '2px solid #333',
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ width: 2, height: 6, background: '#222', margin: '2px auto 0' }} />
          </div>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 35%, #777, #3a3a3a)',
              border: '2px solid #333',
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.15), 0 1px 2px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ width: 1.5, height: 4, background: '#222', margin: '1.5px auto 0' }} />
          </div>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: active ? '#00ff44' : '#440000',
              boxShadow: active ? '0 0 6px #00ff44' : 'none',
            }}
          />
        </div>
      </div>

      {/* Woodgrain bottom */}
      <div
        style={{
          position: 'absolute',
          top: 126,
          left: 4,
          width: 152,
          height: 14,
          background: 'linear-gradient(90deg, #5C3A1E, #7A4E2D, #5C3A1E, #6B4423, #5C3A1E)',
          borderRadius: '0 0 6px 6px',
          border: '2px solid #4a3015',
          borderTop: 'none',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', gap: 3, paddingTop: 3 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{ width: 8, height: 1.5, background: '#3a2010', borderRadius: 1 }}
            />
          ))}
        </div>
      </div>

      {/* TV feet */}
      <div
        style={{
          position: 'absolute',
          bottom: -4,
          left: 25,
          width: 14,
          height: 6,
          background: '#3a3a3a',
          borderRadius: '0 0 3px 3px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -4,
          right: 25,
          width: 14,
          height: 6,
          background: '#3a3a3a',
          borderRadius: '0 0 3px 3px',
        }}
      />

      {/* Reset */}
      {active && onReset && (
        <div
          style={{
            position: 'absolute',
            bottom: -34,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <button
            onClick={onReset}
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: 6,
              background: '#2a2a2a',
              color: '#888',
              border: '2px solid #444',
              padding: '3px 10px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            RESET
          </button>
        </div>
      )}
    </div>
  );
}
