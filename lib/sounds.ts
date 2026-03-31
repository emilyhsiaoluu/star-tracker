'use client';

// Play one synthetic meow at a given time offset (seconds from now)
function oneMeow(ctx: AudioContext, startAt: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = 'sawtooth';
  filter.type = 'bandpass';
  filter.frequency.value = 900;
  filter.Q.value = 3;

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  // Pitch: "me-" rises, "-ow" falls
  osc.frequency.setValueAtTime(520, startAt);
  osc.frequency.linearRampToValueAtTime(1050, startAt + 0.1);
  osc.frequency.exponentialRampToValueAtTime(380, startAt + 0.4);

  // Volume: quick fade in, hold, fade out
  gain.gain.setValueAtTime(0, startAt);
  gain.gain.linearRampToValueAtTime(0.35, startAt + 0.04);
  gain.gain.setValueAtTime(0.35, startAt + 0.25);
  gain.gain.exponentialRampToValueAtTime(0.001, startAt + 0.45);

  osc.start(startAt);
  osc.stop(startAt + 0.5);
}

// Three quick meows: "meow meow meow"
export function playMeow() {
  if (typeof window === 'undefined') return;

  const AudioContextClass =
    window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  const now = ctx.currentTime;

  oneMeow(ctx, now);         // meow
  oneMeow(ctx, now + 0.55);  // meow
  oneMeow(ctx, now + 1.1);   // meow
}
