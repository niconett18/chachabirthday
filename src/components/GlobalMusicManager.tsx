'use client';

import { useEffect, useRef } from 'react';
import { useBirthdayStore } from '../lib/store';

export function GlobalMusicManager() {
  const { musicVolume } = useBirthdayStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = musicVolume;
    
    // Always try to play music
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log('Autoplay prevented, waiting for user interaction:', error);
      });
    }
  }, [musicVolume]);

  // Handle any user interaction to start music if it hasn't started
  useEffect(() => {
    const handleUserInteraction = () => {
      const audio = audioRef.current;
      if (audio && audio.paused) {
        audio.play().catch(console.error);
      }
    };

    // Add listeners for various interaction types
    const events = ['click', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);

  // Handle page visibility changes to ensure music continues
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (audio && document.visibilityState === 'visible' && audio.paused) {
        // Resume music if page becomes visible and music is paused
        audio.play().catch(console.error);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      style={{ display: 'none' }}
      onError={(e) => console.error('Audio loading error:', e)}
      onEnded={() => {
        // Extra safety for looping - restart if needed
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(console.error);
        }
      }}
      onPause={() => {
        // If music gets paused, try to restart it after a short delay
        if (audioRef.current) {
          setTimeout(() => {
            if (audioRef.current && audioRef.current.paused) {
              audioRef.current.play().catch(console.error);
            }
          }, 100);
        }
      }}
    >
      <source src="/audio/Happy Birthday (lofi).mp3" type="audio/mpeg" />
    </audio>
  );
}