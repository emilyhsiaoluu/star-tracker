'use client';

import type { CSSProperties } from 'react';

interface LegendItem {
  count: number;
  label: string;
  emoji: string;
}

const LEGEND_ITEMS: LegendItem[] = [
  { count: 2, label: 'Good bedtime', emoji: '😴' },
  { count: 1, label: 'Good breakfast', emoji: '🥞' },
  { count: 1, label: 'Good lunch', emoji: '🍱' },
  { count: 1, label: "Making parents' lives easier", emoji: '🦸' },
];

export function Legend() {
  return (
    <div
      style={{
        width: '90%',
        maxWidth: 420,
        marginTop: 6,
        marginBottom: 22,
        background: 'linear-gradient(180deg, #1f1608 0%, #150f06 100%)',
        border: '3px solid #B5793A',
        borderRadius: 12,
        boxShadow: '0 0 18px rgba(181,121,58,0.4), inset 0 1px 0 #ffffff14',
        padding: '16px 16px 18px',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: 13,
          color: '#F0B461',
          textShadow: '0 0 10px #B5793A99, 2px 2px 0 #2a1a08',
          textAlign: 'center',
          letterSpacing: 2,
          marginBottom: 12,
        }}
      >
        💩 POOP CHART 💩
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {LEGEND_ITEMS.map((item) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: '#0e0e0e',
              border: '1px solid #3f2d18',
              borderRadius: 8,
              padding: '10px 12px',
            }}
          >
            {/* Poop reward */}
            <div
              style={{
                display: 'flex',
                flexShrink: 0,
                width: 52,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              {Array.from({ length: item.count }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 24,
                    lineHeight: 1,
                    marginLeft: i === 0 ? 0 : -6,
                    transform: `rotate(${i % 2 === 0 ? -8 : 8}deg)`,
                    filter: 'drop-shadow(0 0 5px #B5793A)',
                  } as CSSProperties}
                >
                  💩
                </span>
              ))}
            </div>

            <span style={{ fontSize: 22, flexShrink: 0 }}>{item.emoji}</span>

            <span
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 17,
                fontWeight: 600,
                color: '#F5E9D6',
                lineHeight: 1.25,
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: 14,
          fontWeight: 700,
          color: '#F0B461',
          textAlign: 'center',
          lineHeight: 1.4,
          marginTop: 14,
        }}
      >
        🚽 Every 5 💩 = 📺 TV time! 🚽
      </div>
    </div>
  );
}
