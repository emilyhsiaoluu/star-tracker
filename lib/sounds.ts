'use client';

// Synthesized meow using Web Audio API — no audio files needed
export function playMeow() {
  if (typeof window === 'undefined') return;

  const AudioContextClass =
    window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  const now = ctx.currentTime;

  // Main meow tone — sawtooth for a "voiced" cat sound
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = 'sawtooth';
  filter.type = 'bandpass';
  filter.frequency.value = 800;
  filter.Q.value = 2;

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  // Pitch: starts mid, rises (the "me"), then falls (the "ow")
  osc.frequency.setValueAtTime(480, now);
  osc.frequency.linearRampToValueAtTime(900, now + 0.15);
  osc.frequency.exponentialRampToValueAtTime(320, now + 0.5);

  // Volume: fade in, hold, fade out
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.3, now + 0.06);
  gain.gain.setValueAtTime(0.3, now + 0.3);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

  osc.start(now);
  osc.stop(now + 0.6);
}
