import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const confettiColors = ['#FF66A3', '#FFC1D9', '#FF9EC7', '#E94F91'];

export const createConfetti = (count = 50) => {
  const colors = confettiColors;
  const confettiPieces: Array<{
    id: number;
    x: number;
    y: number;
    rotation: number;
    color: string;
    size: number;
  }> = [];

  const width = typeof window !== 'undefined' ? window.innerWidth : 1200;

  for (let i = 0; i < count; i++) {
    confettiPieces.push({
      id: i,
      x: Math.random() * width,
      y: -10,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 5,
    });
  }

  return confettiPieces;
};

export const playConfettiSound = () => {
  // Only play sound on client side
  if (typeof window === 'undefined') return;
  
  try {
    // Create a simple beep sound effect
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch {
    // Silently fail if audio context is not available
    console.log('Audio context not available');
  }
};