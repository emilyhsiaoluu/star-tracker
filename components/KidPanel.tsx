'use client';

import { useState, useEffect, useRef } from 'react';
import { PixelStar } from './PixelStar';
import { RetroTV } from './RetroTV';
import { playMeow } from '@/lib/sounds';

interface KidPanelProps {
  name: string;
  nameColors: [string, string];
  character: 'charizard' | 'unicorn' | 'kitty';
}

// Fire-and-forget save — never blocks UI
function saveStars(childName: string, stars: Set<number>) {
  fetch(`/api/stars/${childName}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filled_stars: Array.from(stars) }),
  }).catch((e) => console.error('Save failed:', e));
}

export function KidPanel({ name, nameColors, character }: KidPanelProps) {
  const [filledStars, setFilledStars] = useState<Set<number>>(new Set());
  const [explodingIndex, setExplodingIndex] = useState(-1);
  const [tvUnlocked, setTvUnlocked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const loadedRef = useRef(false);

  const childName = name.toLowerCase();

  // Load stars on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/stars/${childName}`);
        if (res.ok) {
          const data = await res.json();
          const restored = new Set<number>(data.filled_stars || []);
          setFilledStars(restored);
          if (restored.size === 5) setTvUnlocked(true);
        }
      } catch (e) {
        console.error('Load failed:', e);
      }
      loadedRef.current = true;
    })();
  }, [childName]);

  // Save on every change — skip the very first render before load completes
  useEffect(() => {
    if (!loadedRef.current) return;
    saveStars(childName, filledStars);
  }, [filledStars, childName]);

  const handleStarClick = (i: number) => {
    if (tvUnlocked) return;
    setFilledStars((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
        setExplodingIndex(i);
        setTimeout(() => setExplodingIndex(-1), 800);
      }
      if (next.size === 5) {
        if (character === 'kitty') playMeow();
        setTimeout(() => {
          setTvUnlocked(true);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }, 500);
      }
      return next;
    });
  };

  const handleReset = () => {
    const empty = new Set<number>();
    setFilledStars(empty);
    setTvUnlocked(false);
    setShowConfetti(false);
    saveStars(childName, empty);
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
        {Array.from({ length: 5 }).map((_, i) => (
          <PixelStar
            key={i}
            filled={filledStars.has(i)}
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
        {tvUnlocked ? '★ TV TIME! ★' : `${filledStars.size}/5`}
      </div>

      <RetroTV active={tvUnlocked} character={character} onReset={handleReset} />
    </div>
  );
}
