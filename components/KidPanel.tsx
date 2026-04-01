'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { PixelStar } from './PixelStar';
import { RetroTV } from './RetroTV';

interface KidPanelProps {
  name: string;
  nameColors: [string, string];
  character: 'charizard' | 'unicorn' | 'kitty';
  completionSound?: () => void;
}

const MAX_STARS = 20;
const STARS_PER_LEVEL = 5;
const EMPTY_STAR_DATES = Array<number>(MAX_STARS).fill(0);
const TV_SCALES = [0.75, 1, 1.15, 1.3];

function encodeToday() {
  const now = new Date();
  return (now.getMonth() + 1) * 100 + now.getDate();
}

function formatStarDate(code: number) {
  if (code <= 0) return '';

  const month = Math.floor(code / 100);
  const day = code % 100;
  return `${month}/${day}`;
}

function filledCountFromDates(starDates: number[]) {
  return starDates.filter((value) => value > 0).length;
}

function getVisibleTierCount(filledCount: number) {
  if (filledCount === 0) return 1;
  const completedTiers = Math.floor(filledCount / STARS_PER_LEVEL);
  return Math.min(completedTiers + 1, MAX_STARS / STARS_PER_LEVEL);
}

function normalizeSavedStars(saved: unknown) {
  if (!Array.isArray(saved)) {
    return [...EMPTY_STAR_DATES];
  }

  const numericValues = saved
    .filter((value): value is number => typeof value === 'number' && Number.isFinite(value))
    .map((value) => Math.max(0, Math.floor(value)));

  const isLegacyIndexArray =
    numericValues.length > 0 &&
    numericValues.length <= STARS_PER_LEVEL &&
    numericValues.every((value) => value >= 0 && value < STARS_PER_LEVEL);

  if (isLegacyIndexArray) {
    const today = encodeToday();
    return EMPTY_STAR_DATES.map((_, index) => (index < numericValues.length ? today : 0));
  }

  return EMPTY_STAR_DATES.map((_, index) => numericValues[index] ?? 0);
}

function persist(childName: string, starDates: number[]) {
  fetch(`/api/stars/${childName}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filled_stars: starDates }),
  }).catch((error) => console.error('Save failed:', error));
}

export function KidPanel({ name, nameColors, character, completionSound }: KidPanelProps) {
  const [starDates, setStarDates] = useState<number[]>([...EMPTY_STAR_DATES]);
  const [explodingIndex, setExplodingIndex] = useState(-1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [visibleTiers, setVisibleTiers] = useState(1);

  const childName = name.toLowerCase();
  const filledCount = filledCountFromDates(starDates);
  const rewardLevel = Math.floor(filledCount / STARS_PER_LEVEL);

  useEffect(() => {
    fetch(`/api/stars/${childName}`)
      .then((response) => response.json())
      .then((data) => {
        const loadedDates = normalizeSavedStars(data.filled_stars);
        const loadedCount = filledCountFromDates(loadedDates);

        setStarDates(loadedDates);
        setVisibleTiers(getVisibleTierCount(loadedCount));
      })
      .catch((error) => console.error('Load failed:', error));
  }, [childName]);

  const handleStarClick = (index: number) => {
    setStarDates((previousDates) => {
      const nextDates = [...previousDates];
      const previousCount = filledCountFromDates(previousDates);

      nextDates[index] = nextDates[index] > 0 ? 0 : encodeToday();

      const nextCount = filledCountFromDates(nextDates);
      const previousRewardLevel = Math.floor(previousCount / STARS_PER_LEVEL);
      const nextRewardLevel = Math.floor(nextCount / STARS_PER_LEVEL);

      if (nextRewardLevel > previousRewardLevel && nextCount % STARS_PER_LEVEL === 0) {
        completionSound?.();
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        setVisibleTiers(getVisibleTierCount(nextCount));
      } else if (nextRewardLevel < previousRewardLevel) {
        setShowConfetti(false);
        setVisibleTiers(getVisibleTierCount(nextCount));
      }

      if (previousDates[index] === 0) {
        setExplodingIndex(index);
        setTimeout(() => setExplodingIndex(-1), 800);
      }

      persist(childName, nextDates);
      return nextDates;
    });
  };

  const handleReset = () => {
    setStarDates([...EMPTY_STAR_DATES]);
    setVisibleTiers(1);
    setShowConfetti(false);
    persist(childName, [...EMPTY_STAR_DATES]);
  };

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '12px 4px 72px',
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
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                width: 5 + Math.random() * 6,
                height: 5 + Math.random() * 6,
                background: ['#FFD700', '#FF6B35', '#FF1493', '#00FFFF', '#7FFF00', '#FFF'][index % 6],
                left: `${Math.random() * 100}%`,
                top: -10,
                animation: `confettiFall ${1.5 + Math.random() * 2}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.8}s`,
                imageRendering: 'pixelated',
              } as CSSProperties}
            />
          ))}
        </div>
      )}

      <div
        style={{
          fontFamily: 'var(--font-pixel)',
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

      {Array.from({ length: visibleTiers }).map((_, tierIndex) => {
        const startIdx = tierIndex * STARS_PER_LEVEL;
        const tierStars = starDates.slice(startIdx, startIdx + STARS_PER_LEVEL);
        const tierFilledCount = tierStars.filter((d) => d > 0).length;
        const tierComplete = tierFilledCount === STARS_PER_LEVEL;
        const tvScale = TV_SCALES[Math.min(tierIndex, TV_SCALES.length - 1)];

        return (
          <div key={tierIndex} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0,
                marginBottom: 8,
              }}
            >
              {tierStars.map((starDate, i) => {
                const globalIndex = startIdx + i;
                return (
                  <PixelStar
                    key={globalIndex}
                    filled={starDate > 0}
                    onClick={() => handleStarClick(globalIndex)}
                    exploding={explodingIndex === globalIndex}
                    size={32}
                  />
                );
              })}
            </div>

            <div
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 7,
                color: tierComplete ? '#FFD700' : '#555',
                marginBottom: 8,
                textAlign: 'center',
                lineHeight: 1.5,
              }}
            >
              {tierComplete ? `★ TV ${tierIndex + 1} ★` : `${tierFilledCount}/${STARS_PER_LEVEL}`}
            </div>

            <div
              style={{
                marginBottom: 16,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
            >
              <RetroTV
                active={tierComplete}
                character={character}
                onReset={tierIndex === 0 ? handleReset : undefined}
                scale={tvScale}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
