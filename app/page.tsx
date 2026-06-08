'use client';

import { KidPanel } from '@/components/KidPanel';
import { playMeow, playRawr } from '@/lib/sounds';

export default function StarTracker() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0d0d0d',
        backgroundImage:
          'radial-gradient(circle at 30% 20%, #1a0a2e22 0%, transparent 50%), radial-gradient(circle at 70% 80%, #0a1a2e22 0%, transparent 50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 4px 20px',
        fontFamily: 'var(--font-pixel)',
      }}
    >
      <div
        style={{
          fontSize: 18,
          color: '#FFD700',
          textShadow: '0 0 14px #FFD70055, 2px 2px 0 #442200',
          marginBottom: 20,
          letterSpacing: 3,
          textAlign: 'center',
          animation: 'float 3s ease-in-out infinite',
        }}
      >
        ★ VACATION STAR TRACKER ★
      </div>

      <div
        style={{
          width: '90%',
          maxWidth: 450,
          height: 2,
          marginBottom: 8,
          background: 'linear-gradient(90deg, transparent, #FFD70033, transparent)',
        }}
      />

      <div style={{ display: 'flex', width: '100%', maxWidth: 420, gap: 4 }}>
        <KidPanel
          name="Emerson"
          nameColors={['#FF2222', '#4488FF']}
          character="charizard"
          completionSound={playRawr}
          rewardText="do nothing"
        />
        <div
          style={{
            width: 2,
            background: 'linear-gradient(180deg, transparent, #ffffff11, transparent)',
            alignSelf: 'stretch',
          }}
        />
        <KidPanel
          name="Avery"
          nameColors={['#FF69B4', '#AA44FF']}
          character="unicorn"
          completionSound={playMeow}
        />
      </div>
    </div>
  );
}
