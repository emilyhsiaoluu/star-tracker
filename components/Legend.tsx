'use client';

import type { CSSProperties } from 'react';

interface LegendItem {
  count: number;
  label: string;
  emoji: string;
}

const LEGEND_ITEMS: LegendItem[] = [
  { count: 2, label: 'GOOD BEDTIME', emoji: '😴' },
  { count: 1, label: 'GOOD BREAKFAST', emoji: '🥞' },
  { count: 1, label: 'GOOD LUNCH', emoji: '🍱' },
  { count: 1, label: "MAKING PARENTS' LIVES EASIER", emoji: '🦸' },
];

export function Legend() {
  return (
    <div
      style={{
        width: '90%',
        maxWidth: 420,
        marginTop: 28,
        background: 'linear-gradient(180deg, #1a1206 0%, #120d04 100%)',
        border: '3px solid #8B5A2B',
        borderRadius: 10,
        boxShadow: '0 0 16px rgba(139,90,43,0.35), inset 0 1px 0 #ffffff11',
        padding: '14px 14px 16px',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: 11,
          color: '#E0A458',
          textShadow: '0 0 10px #8B5A2B88, 2px 2px 0 #2a1a08',
          textAlign: 'center',
          letterSpacing: 2,
          marginBottom: 4,
        }}
      >
        💩 POOP CHART 💩
      </div>

      <div
        style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: 6,
          color: '#9a7b52',
          textAlign: 'center',
          letterSpacing: 1,
          marginBottom: 14,
        }}
      >
        HOW TO EARN YOUR POOPS
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {LEGEND_ITEMS.map((item) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: '#0d0d0d',
              border: '1px solid #3a2a16',
              borderRadius: 6,
              padding: '7px 9px',
            }}
          >
            {/* Poop reward */}
            <div
              style={{
                display: 'flex',
                flexShrink: 0,
                width: 46,
                justifyContent: 'flex-start',
              }}
            >
              {Array.from({ length: item.count }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 18,
                    lineHeight: 1,
                    marginLeft: i === 0 ? 0 : -4,
                    transform: `rotate(${i % 2 === 0 ? -8 : 8}deg)`,
                    filter: 'drop-shadow(0 0 4px #8B5A2B)',
                  } as CSSProperties}
                >
                  💩
                </span>
              ))}
            </div>

            <span style={{ fontSize: 15, flexShrink: 0 }}>{item.emoji}</span>

            <span
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 7,
                color: '#d9c4a3',
                lineHeight: 1.5,
                letterSpacing: 0.5,
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: 6.5,
          color: '#E0A458',
          textAlign: 'center',
          letterSpacing: 1,
          lineHeight: 1.6,
          marginTop: 14,
        }}
      >
        🚽 EVERY 5 💩 = 📺 TV TIME! 🚽
      </div>
    </div>
  );
}
