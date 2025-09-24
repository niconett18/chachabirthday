'use client';

import { Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBirthdayStore } from '../lib/store';

export function MusicToggle() {
  const { isMusicPlaying } = useBirthdayStore();

  return (
    <div className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50">
      <motion.div
        className="glass rounded-full p-3 shadow-lg"
        whileHover={{ scale: 1.05 }}
        animate={{ 
          opacity: isMusicPlaying ? 1 : 0.7,
          scale: isMusicPlaying ? [1, 1.05, 1] : 1
        }}
        transition={{ 
          scale: { duration: 2, repeat: Infinity, repeatType: "loop" }
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-[44px] h-[44px] rounded-full bg-[#FF66A3] text-white flex items-center justify-center">
            <Volume2 size={20} />
          </div>
          <span className="text-[#FF66A3] font-medium text-sm hidden sm:inline">
            🎵 Playing
          </span>
        </div>
      </motion.div>
    </div>
  );
}