import { create } from 'zustand';

interface BirthdayState {
  isMusicPlaying: boolean;
  musicVolume: number;
  gameScore: number;
  hasVisitedPages: string[];
  updateGameScore: (score: number) => void;
  markPageVisited: (page: string) => void;
  resetGameScore: () => void;
}

export const useBirthdayStore = create<BirthdayState>((set) => ({
  isMusicPlaying: true,
  musicVolume: 0.5, // Standard volume - not user changeable
  gameScore: 0,
  hasVisitedPages: [],
  
  updateGameScore: (score: number) => 
    set(() => ({ gameScore: score })),
  
  resetGameScore: () => 
    set(() => ({ gameScore: 0 })),
  
  markPageVisited: (page: string) => 
    set((state) => ({
      hasVisitedPages: state.hasVisitedPages.includes(page) 
        ? state.hasVisitedPages 
        : [...state.hasVisitedPages, page]
    })),
}));