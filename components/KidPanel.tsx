'use client';

import { useState, useEffect } from 'react';
import { PixelStar } from './PixelStar';
import { RetroTV } from './RetroTV';

interface KidPanelProps {
  name: string;
  nameColors: [string, string];
  character: 'charizard' | 'unicorn' | 'kitty';
  completionSound?: () => void;
}

const EMPTY: boolean[] = [false, false, false, false, false];

function toIndices(stars: boolean[]): number[] {
  return stars.map((f, i) => (f ? i : -1)).filter((i) => i >= 0);
}

function fromIndices(indices: number[]): boolean[] {
  return EMPTY.map((_, i) => indices.includes(i));
}

function persist(childName: string, stars: boolean[]) {
  fetch(`/api/stars/${childName}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filled_stars: toIndices(stars) }),
  }).catch((e) => console.error('Save failed:', e));
}

export function KidPanel({ name, nameColors, character, completionSound }: KidPanelProps) {
  const [stars, setStars] = useState<boolean[]>(EMPTY);
  const [explodingIndex, setExplodingIndex] = useState(-1);
  const [tvUnlocked, setTvUnlocked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const childName = name.toLowerCase();
  const filledCount = stars.filter(Boolean).length;

  // Load from Supabase on mount
  useEffect(() => {
    fetch(`/api/stars/${childName}`)
      .then((r) => r.json())
      .then((data) => {
        const loaded = fromIndices(data.filled_stars || []);
        setStars(loaded);
        if (loaded.filter(Boolean).length === 5) setTvUnlocked(true);
      })
      .catch((e) => console.error('Load failed:', e));
  }, [childName]);

  const handleStarClick = (i: number) => {
    setStars((prev) => {
      const next = [...prev];
      next[i] = !next[i];

      const count = next.filter(Boolean).length;
      if (count === 5) {
        completionSound?.();
        setTimeout(() => {
          setTvUnlocked(true);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }, 500);
      } else {
        // Star removed — lock TV back
        setTvUnlocked(false);
        setShowConfetti(false);
      }

      if (!prev[i]) {
        setExplodingIndex(i);
        setTimeout(() => setExplodingIndex(-1), 800);
      }

      persist(childName, next);
      return next;
    });
  };

  const handleReset = () => {
    setStars(EMPTY);
    setTvUnlocked(false);
    setShowConfetti(false);
    persist(childName, EMPTY);
  };

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '12px 4px 40px',
        position: 'relative',
      }}
    >
      {showConfetti && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 50,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: 5 + Math.random() * 6,
                height: 5 + Math.random() * 6,
                background: ['#FFD700', '#FF6B35', '#FF1493', '#00FFFF', '#7FFF00', '#FFF'][i % 6],
                left: `${Math.random() * 100}%`,
                top: -10,
                animation: `confettiFall ${1.5 + Math.random() * 2}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.8}s`,
                imageRendering: 'pixelated',
              } as any}
            />
          ))}
        </div>
      )}

      <div
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 11,
          background: `linear-gradient(90deg, ${nameColors[0]}, ${nameColors[1]})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: `drop-shadow(0 0 6px ${nameColors[0]}55)`,
          marginBottom: 14,
          letterSpacing: 1,
        }}
      >
        {name.toUpperCase()}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          marginBottom: 16,
        }}
      >
        {stars.map((filled, i) => (
          <PixelStar
            key={i}
            filled={filled}
            onClick={() => handleStarClick(i)}
            exploding={explodingIndex === i}
          />
        ))}
      </div>

      <div
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 7,
          color: tvUnlocked ? '#FFD700' : '#555',
          marginBottom: 14,
        }}
      >
        {tvUnlocked ? '★ TV TIME! ★' : `${filledCount}/5`}
      </div>

      <div style={{ marginTop: 10 }}>
        <RetroTV active={tvUnlocked} character={character} onReset={handleReset} />
      </div>
    </div>
  );
}
