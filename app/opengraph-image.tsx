import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Star Tracker — Emerson & Avery';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0d0d0d',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
        }}
      >
        {/* Stars row */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                width: 64,
                height: 64,
                background: '#FFD700',
                clipPath:
                  'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                boxShadow: '0 0 20px #FFD700',
              }}
            />
          ))}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: '#FFD700',
            textShadow: '4px 4px 0px #442200',
            letterSpacing: 8,
            marginBottom: 20,
          }}
        >
          ★ STAR TRACKER ★
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: '#888',
            letterSpacing: 4,
          }}
        >
          EMERSON  &  AVERY
        </div>
      </div>
    ),
    size
  );
}
