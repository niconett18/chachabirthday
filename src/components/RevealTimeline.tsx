'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar } from 'lucide-react';


interface TimelineItem {
  title: string;
  date: string;
  image: string;
  message: string;
}

interface RevealTimelineProps {
  items: TimelineItem[];
}

export function RevealTimeline({ items }: RevealTimelineProps) {
  const [revealedItems, setRevealedItems] = useState<Set<number>>(new Set());

  const toggleReveal = (index: number) => {
    setRevealedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="glass p-5 sm:p-6 rounded-2xl relative"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#FF66A3]" />
                <span className="text-sm text-[#37243B]/60 font-medium">
                  {new Date(item.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              
              <motion.button
                onClick={() => toggleReveal(index)}
                className="min-w-[44px] min-h-[44px] bg-[#FF66A3] rounded-full flex items-center justify-center shadow-md active:scale-90 focus:outline-none focus:ring-2 focus:ring-[#FF9EC7]"
                whileTap={{ scale: 0.9 }}
                animate={revealedItems.has(index) ? { 
                  boxShadow: "0 0 20px rgba(255, 102, 163, 0.5)",
                  scale: [1, 1.05, 1]
                } : {}}
                transition={{ duration: 0.3 }}
                aria-label={`${revealedItems.has(index) ? 'Hide' : 'Show'} details for ${item.title}`}
              >
                <Heart 
                  size={20} 
                  className={`text-white transition-all duration-300 ${
                    revealedItems.has(index) ? 'fill-white' : ''
                  }`} 
                />
              </motion.button>
            </div>
            
            <h3 className="font-display text-lg sm:text-xl font-semibold text-[#37243B] mb-4">
              {item.title}
            </h3>

            <AnimatePresence>
              {revealedItems.has(index) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="relative aspect-[4/5] sm:aspect-video rounded-2xl overflow-hidden">
                    <div className="w-full h-full bg-[#FFC1D9]/30 flex items-center justify-center">
                      <p className="text-[#FF66A3]/70 text-sm">Photo placeholder</p>
                    </div>
                  </div>
                  <p className="text-[#37243B]/70 italic font-handwritten text-base sm:text-lg leading-relaxed">
                    &ldquo;{item.message}&rdquo;
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}