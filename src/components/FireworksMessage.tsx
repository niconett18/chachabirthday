'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Share2, Home, Heart } from 'lucide-react';
import { createConfetti, playConfettiSound } from '../lib/utils';

interface Firework {
  id: number;
  x: number;
  y: number;
  particles: Particle[];
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
}

interface FireworksMessageProps {
  message: string;
  subtext: string;
  glow?: boolean;
}

const fireworkColors = ['#FF66A3', '#FFC1D9', '#FF9EC7', '#E94F91', '#ffffff'];

export function FireworksMessage({ 
  message, 
  subtext, 
  glow = false 
}: FireworksMessageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [fireworksList, setFireworksList] = useState<Firework[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [nextFireworkId, setNextFireworkId] = useState(0);



  const createFirework = useCallback((x: number, y: number) => {
    const particles: Particle[] = [];
    // Reduce particle count on mobile for better performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const particleCount = isMobile ? 15 + Math.random() * 10 : 30 + Math.random() * 20;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 2 + Math.random() * 3;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        color: fireworkColors[Math.floor(Math.random() * fireworkColors.length)],
        life: 1,
        maxLife: 1
      });
    }

    const newFirework: Firework = {
      id: nextFireworkId,
      x,
      y,
      particles
    };

    setFireworksList(prev => [...prev, newFirework]);
    setNextFireworkId(prev => prev + 1);
  }, [nextFireworkId]);

  const updateFireworks = useCallback(() => {
    setFireworksList(prev => prev.map(firework => ({
      ...firework,
      particles: firework.particles
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.1, // gravity
          vx: particle.vx * 0.99, // air resistance
          life: particle.life - 0.02
        }))
        .filter(particle => particle.life > 0)
    })).filter(firework => firework.particles.length > 0));
  }, []);

  const drawFireworks = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw fireworks
    fireworksList.forEach(firework => {
      firework.particles.forEach(particle => {
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    ctx.globalAlpha = 1;
  }, [fireworksList]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      updateFireworks();
      drawFireworks();
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updateFireworks, drawFireworks]);

  // Auto-spawn fireworks
  useEffect(() => {
    const interval = setInterval(() => {
      if (canvasRef.current) {
        const x = Math.random() * canvasRef.current.width;
        const y = Math.random() * canvasRef.current.height * 0.7;
        createFirework(x, y);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [createFirework]);

  // Canvas click handler
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    createFirework(x, y);
  };

  // Trigger confetti
  const triggerConfetti = () => {
    setShowConfetti(true);
    playConfettiSound();
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const shareMessage = () => {
    if (navigator.share) {
      navigator.share({
        title: "Chacha's 19th Birthday",
        text: "A special birthday surprise made with love",
        url: window.location.origin
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Resize canvas with device pixel ratio for mobile
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Cap DPR for performance
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <div 
      className="relative min-h-dvh overflow-hidden bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900"
      style={{ 
        paddingTop: 'env(safe-area-inset-top)', 
        paddingBottom: 'env(safe-area-inset-bottom)' 
      }}
    >
      {/* Canvas for fireworks */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-pointer touch-manipulation"
        onClick={handleCanvasClick}
        onTouchStart={(e) => {
          e.preventDefault();
          const canvas = canvasRef.current;
          if (!canvas) return;
          
          const touch = e.touches[0];
          const rect = canvas.getBoundingClientRect();
          const x = touch.clientX - rect.left;
          const y = touch.clientY - rect.top;
          createFirework(x, y);

          // Add haptic feedback if available
          if (navigator.vibrate) {
            navigator.vibrate(10);
          }
        }}
      />

      {/* Confetti overlay - reduced count on mobile */}
      {showConfetti && createConfetti(typeof window !== 'undefined' && window.innerWidth < 640 ? 30 : 50).map((piece, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{
            backgroundColor: piece.color,
            left: piece.x,
            top: piece.y,
          }}
          initial={{ scale: 0, rotate: 0 }}
          animate={{
            scale: [0, 1, 0],
            rotate: 360,
            y: [0, window.innerHeight + 100]
          }}
          transition={{
            duration: 3,
            ease: "linear"
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 min-h-dvh flex flex-col items-center justify-center px-4 py-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full max-w-[420px] mx-auto"
        >
          <motion.h1
            className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 text-white leading-tight text-balance"
            onClick={triggerConfetti}
            style={glow ? {
              textShadow: `
                0 0 5px #FF66A3,
                0 0 10px #FF66A3,
                0 0 15px #FF66A3
              `,
              cursor: 'pointer'
            } : { cursor: 'pointer' }}
            animate={glow ? {
              textShadow: [
                '0 0 5px #FF66A3, 0 0 10px #FF66A3, 0 0 15px #FF66A3',
                '0 0 10px #FFC1D9, 0 0 15px #FFC1D9, 0 0 20px #FFC1D9',
                '0 0 5px #FF66A3, 0 0 10px #FF66A3, 0 0 15px #FF66A3'
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {message}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-base sm:text-lg text-white/90 mb-8 sm:mb-12 font-light leading-relaxed"
          >
            {subtext}
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <motion.button
              onClick={() => {
                triggerConfetti();
                if (navigator.vibrate) navigator.vibrate(10);
              }}
              className="w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 bg-[#FF66A3] text-white px-5 py-3 rounded-2xl font-medium active:bg-[#E94F91] transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#FF66A3]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Heart size={20} />
              More Love
            </motion.button>

            <motion.button
              onClick={shareMessage}
              className="w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 glass text-white px-5 py-3 rounded-2xl font-medium active:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Share2 size={20} />
              Share Love
            </motion.button>

            <motion.a
              href="/"
              className="w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 glass text-white px-5 py-3 rounded-2xl font-medium active:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Home size={20} />
              Start Over
            </motion.a>
          </motion.div>

          {/* Instructions */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="text-white/70 mt-6 sm:mt-8 text-sm leading-relaxed"
          >
            Tap anywhere to create fireworks • Tap the title for confetti
          </motion.p>
        </motion.div>
      </div>

      {/* Floating hearts - fewer on mobile */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: typeof window !== 'undefined' && window.innerWidth < 640 ? 8 : 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              rotate: [0, 10, -10, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Heart size={16 + Math.random() * 8} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}