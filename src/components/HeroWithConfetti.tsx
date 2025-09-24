'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';
import { createConfetti, playConfettiSound } from '../lib/utils';
import Link from 'next/link';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
}

interface HeroWithConfettiProps {
  headline: string;
  subhead: string;
  ctaText: string;
  bgParticles?: string;
}

export function HeroWithConfetti({ 
  headline, 
  subhead, 
  ctaText 
}: HeroWithConfettiProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Only run client-side code after mounting
    if (typeof window !== 'undefined') {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Trigger confetti on component mount (reduced on mobile)
      const timer = setTimeout(() => {
        setShowConfetti(true);
        setConfetti(createConfetti(prefersReducedMotion ? 30 : 50)); // Fewer particles on mobile
        playConfettiSound();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const triggerConfetti = () => {
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setShowConfetti(true);
      setConfetti(createConfetti(prefersReducedMotion ? 30 : 50));
      playConfettiSound();
    }
  };

  return (
    <div className="relative min-h-dvh flex items-center justify-center overflow-hidden px-4 py-8 sm:py-12">
      {/* Animated background particles - reduced count on mobile */}
      {isMounted && (
        <div className="absolute inset-0">
          {Array.from({ length: window.innerWidth < 640 ? 12 : 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-30"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {i % 3 === 0 && <Heart className="text-[#FF9EC7]" size={16} />}
            {i % 3 === 1 && <Sparkles className="text-[#FFC1D9]" size={14} />}
            {i % 3 === 2 && <Star className="text-[#FF66A3]" size={12} />}
          </motion.div>
        ))}
        </div>
      )}

      {/* Floating balloons - fewer on mobile */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: window.innerWidth < 640 ? 4 : 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-10, -20, -10],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <div 
              className="w-6 h-8 sm:w-8 sm:h-10 rounded-full shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${['#FF66A3', '#FFC1D9', '#FF9EC7'][i % 3]}, ${['#E94F91', '#FF66A3', '#FFC1D9'][i % 3]})`,
              }}
            />
            <div className="w-px h-12 sm:h-16 bg-gray-300 mx-auto" />
          </motion.div>
        ))}
        </div>
      )}

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute w-2 h-2 rounded-full pointer-events-none"
            style={{
              backgroundColor: piece.color,
              left: piece.x,
            }}
            initial={{ y: -10, rotate: 0, scale: 0 }}
            animate={{
              y: (isMounted ? window.innerHeight : 800) + 50,
              rotate: piece.rotation,
              scale: [0, 1, 1, 0.5],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 3,
              ease: "linear"
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main content */}
      <motion.div 
        className="text-center z-10 w-full max-w-[420px] mx-auto flex flex-col gap-4 sm:gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.h1 
          className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-[#37243B] leading-tight text-balance"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onClick={triggerConfetti}
          style={{
            background: 'linear-gradient(135deg, #FF66A3, #E94F91, #FF9EC7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            cursor: 'pointer',
          }}
        >
          {headline}
        </motion.h1>

        <motion.p 
          className="text-base sm:text-lg text-[#37243B]/70 font-light max-w-prose mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subhead}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4"
        >
          <Link href="/journey">
            <motion.button
              className="w-full sm:w-auto min-h-[44px] px-5 py-3 rounded-2xl bg-[#FF66A3] text-white text-base font-medium shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#FF9EC7] focus:ring-offset-2"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 8px 25px -8px rgba(255, 102, 163, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              {ctaText}
            </motion.button>
          </Link>
        </motion.div>

        {/* Age counter component */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <AgeGlowCounter value={19} glowColor="#FF66A3" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// Age counter component
interface AgeGlowCounterProps {
  value: number;
  glowColor: string;
}

function AgeGlowCounter({ value, glowColor }: AgeGlowCounterProps) {
  return (
    <motion.div 
      className="relative inline-block"
      animate={{
        textShadow: [
          `0 0 10px ${glowColor}`,
          `0 0 20px ${glowColor}`,
          `0 0 10px ${glowColor}`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <span 
        className="text-7xl sm:text-8xl md:text-9xl font-bold font-display"
        style={{
          background: `linear-gradient(135deg, ${glowColor}, #FFC1D9)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {value}
      </span>
    </motion.div>
  );
}