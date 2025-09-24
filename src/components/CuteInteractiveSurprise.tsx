'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Gift, Sparkles, Star, PartyPopper } from 'lucide-react';

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export function CuteInteractiveSurprise() {
  const [currentSurprise, setCurrentSurprise] = useState(0);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showSpecialMessage, setShowSpecialMessage] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const surprises = [
    {
      title: "🎂 Happy 19th Birthday!",
      message: "My beautiful Chacha, today is all about celebrating YOU!",
      emoji: "🎂",
      color: "from-pink-400 to-rose-500"
    },
    {
      title: "💕 You're My Everything",
      message: "Every day with you feels like a celebration of love!",
      emoji: "💕",
      color: "from-rose-400 to-pink-500"
    },
    {
      title: "✨ You Light Up My World",
      message: "Your smile is brighter than all the stars combined!",
      emoji: "✨",
      color: "from-pink-300 to-purple-400"
    },
    {
      title: "🌸 Growing Beautiful Together",
      message: "Like flowers in bloom, our love grows more beautiful each day!",
      emoji: "🌸",
      color: "from-purple-300 to-pink-400"
    },
    {
      title: "🎁 You're My Greatest Gift",
      message: "The best present I ever received was your heart!",
      emoji: "🎁",
      color: "from-pink-400 to-red-400"
    }
  ];

  // Create floating hearts on touch/click
  const createHeart = (x: number, y: number) => {
    const colors = ['#ff69b4', '#ff1493', '#ff6347', '#ff69b4', '#ffc0cb'];
    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x: x,
      y: y,
      size: Math.random() * 20 + 15,
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    setHearts(prev => [...prev, newHeart]);

    // Remove heart after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
    }, 3000);
  };

  const handleTouch = (e: React.TouchEvent | React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    createHeart(x, y);
    
    setClickCount(prev => prev + 1);
    
    if (clickCount > 0 && clickCount % 10 === 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }

    if (clickCount === 25) {
      setShowSpecialMessage(true);
    }

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  const nextSurprise = useCallback(() => {
    setCurrentSurprise((prev) => (prev + 1) % surprises.length);
  }, [surprises.length]);

  const currentData = surprises[currentSurprise];

  // Auto-advance surprises
  useEffect(() => {
    const interval = setInterval(() => {
      nextSurprise();
    }, 8000);

    return () => clearInterval(interval);
  }, [nextSurprise]);

  return (
    <div 
      ref={containerRef}
      className="min-h-dvh relative overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100"
      style={{ 
        paddingTop: 'env(safe-area-inset-top)', 
        paddingBottom: 'env(safe-area-inset-bottom)' 
      }}
      onTouchStart={handleTouch}
      onClick={handleTouch}
    >
      {/* Floating Hearts */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute pointer-events-none z-20"
            style={{
              left: heart.x,
              top: heart.y,
              fontSize: heart.size,
              color: heart.color
            }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              rotate: [0, 180, 360],
              y: -200,
              opacity: [1, 1, 0]
            }}
            transition={{ 
              duration: 3,
              ease: "easeOut"
            }}
          >
            💖
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#ff69b4', '#ff1493', '#ffc0cb', '#ff6347', '#da70d6'][i % 5],
                  left: `${Math.random() * 100}%`,
                  top: '-10px'
                }}
                initial={{ y: -10, rotate: 0 }}
                animate={{ 
                  y: window.innerHeight + 50,
                  rotate: 360,
                  x: Math.random() * 200 - 100
                }}
                transition={{
                  duration: 3,
                  delay: Math.random() * 2,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Background Elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 6,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {['💖', '🌸', '✨', '🦋', '🌙', '⭐'][i % 6]}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-5 flex flex-col items-center justify-center min-h-dvh p-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSurprise}
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ duration: 0.6, ease: "backOut" }}
          >
            {/* Main Surprise Card */}
            <motion.div 
              className={`bg-gradient-to-br ${currentData.color} p-8 rounded-3xl shadow-2xl mb-6 border-4 border-white/30`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {currentData.emoji}
              </motion.div>
              
              <h1 className="text-2xl font-display font-bold text-white mb-4 drop-shadow-lg">
                {currentData.title}
              </h1>
              
              <p className="text-white/90 text-lg leading-relaxed font-medium">
                {currentData.message}
              </p>
            </motion.div>

            {/* Interactive Elements */}
            <div className="space-y-4">
              <motion.button
                onClick={nextSurprise}
                className="w-full bg-white/90 backdrop-blur-sm text-pink-600 py-3 px-6 rounded-2xl font-semibold shadow-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Gift size={20} />
                kata kata hari ini buat u
              </motion.button>

              <div className="flex gap-3 justify-center">
                <motion.button
                  className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={24} className="text-pink-500" />
                </motion.button>
                
                <motion.button
                  className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Star size={24} className="text-purple-500" />
                </motion.button>
                
                <motion.button
                  className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart size={24} className="text-red-500" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Instructions */}
        <motion.div
          className="mt-8 bg-white/70 backdrop-blur-sm p-4 rounded-2xl max-w-sm mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-pink-700 text-sm font-medium flex items-center justify-center gap-2">
            <PartyPopper size={16} />
            Tap anywhere for hearts! ({clickCount} taps)
          </p>
        </motion.div>

        {/* Special Message */}
        <AnimatePresence>
          {showSpecialMessage && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSpecialMessage(false)}
            >
              <motion.div
                className="bg-gradient-to-br from-pink-400 to-purple-500 p-8 rounded-3xl text-center max-w-sm shadow-2xl"
                initial={{ scale: 0.5, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.5, rotate: 10 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-white mb-4">Special Message!</h2>
                <p className="text-white text-lg mb-6">
                  You&apos;ve unlocked the secret! You&apos;re the most amazing person in my world! 🌟💕
                </p>
                <button
                  onClick={() => setShowSpecialMessage(false)}
                  className="bg-white text-pink-600 px-6 py-2 rounded-full font-semibold"
                >
                  Aww! 💖
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          className="mt-8 flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <a
            href="/journey"
            className="bg-white/90 backdrop-blur-sm text-pink-600 px-6 py-3 rounded-2xl font-semibold shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform"
          >
            📸 Photo Journey
          </a>
          
          <a
            href="/letter"
            className="bg-white/90 backdrop-blur-sm text-pink-600 px-6 py-3 rounded-2xl font-semibold shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform"
          >
            💌 Love Letter
          </a>
        </motion.div>
      </div>
    </div>
  );
}