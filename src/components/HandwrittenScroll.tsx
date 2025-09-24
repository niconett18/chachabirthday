'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface HandwrittenScrollProps {
  content: string[];
  font?: string;
}

export function HandwrittenScroll({ 
  content, 
  font = "Dancing Script" 
}: HandwrittenScrollProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const lineRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    lineRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleLines(prev => 
                prev.includes(index) ? prev : [...prev, index].sort((a, b) => a - b)
              );
            }
          },
          { threshold: 0.1 }
        );
        
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [content]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };



  return (
    <div className="relative w-full max-w-prose mx-auto">
      {/* Paper background */}
      <div className="glass rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg relative overflow-hidden">
        {/* Paper texture overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000' fill-opacity='0.1' d='m0 0h4v4H0z'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Subtle paper lines - fewer on mobile */}
        <div className="absolute inset-0 pointer-events-none hidden sm:block">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-6 right-6 border-t border-[#37243B]/5"
              style={{ top: `${60 + i * 35}px` }}
            />
          ))}
        </div>

        {/* Left margin line */}
        <div className="absolute left-8 sm:left-12 top-0 bottom-0 w-px bg-[#FF66A3]/20" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 space-y-4 sm:space-y-6"
        >
          {content.map((line, index) => (
            <motion.div
              key={index}
              ref={(el) => { lineRefs.current[index] = el; }}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={visibleLines.includes(index) ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative ${line === "" ? "h-2 sm:h-4" : ""}`}
            >
              {line && (
                <>
                  <motion.p
                    className="text-[16px] sm:text-xl md:text-2xl text-[#37243B] leading-relaxed max-w-prose"
                    style={{ 
                      fontFamily: font,
                      fontWeight: line.startsWith("Dear") || line.startsWith("Love,") ? 600 : 400,
                      color: line.startsWith("Dear") || line.startsWith("Love,") ? "#FF66A3" : "inherit"
                    }}
                    animate={visibleLines.includes(index) ? {
                      backgroundImage: [
                        "linear-gradient(90deg, transparent 0%, transparent 100%)",
                        "linear-gradient(90deg, rgba(255, 102, 163, 0.3) 0%, rgba(255, 102, 163, 0.3) 100%)"
                      ],
                    } : {}}
                    transition={{ duration: 2, delay: 0.5 }}
                  >
                    {line}
                  </motion.p>
                  
                  {/* Subtle sparkle effects */}
                  {(line.includes("!") || line.includes("❤")) && visibleLines.includes(index) && (
                    <motion.div
                      className="absolute -top-1 -right-1 text-[#FF66A3]"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                    >
                      ✨
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative hearts in corners - smaller on mobile */}
        <div className="absolute top-3 sm:top-6 left-3 sm:left-6 text-[#FF66A3]/30 text-sm sm:text-base">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            💕
          </motion.div>
        </div>
        
        <div className="absolute top-3 sm:top-6 right-3 sm:right-6 text-[#FF66A3]/30 text-sm sm:text-base">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            💖
          </motion.div>
        </div>
        
        <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 text-[#FF66A3]/30 text-sm sm:text-base">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            💝
          </motion.div>
        </div>
        
        <div className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 text-[#FF66A3]/30 text-sm sm:text-base">
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            💗
          </motion.div>
        </div>
      </div>
    </div>
  );
}