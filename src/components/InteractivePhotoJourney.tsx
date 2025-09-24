'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Shuffle, X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import Image from 'next/image';

interface Photo {
  src: string;
  title: string;
  caption: string;
  date: string;
}

interface InteractivePhotoJourneyProps {
  photos: Photo[];
}

export function InteractivePhotoJourney({ photos }: InteractivePhotoJourneyProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [shuffledPhotos, setShuffledPhotos] = useState(photos);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Shuffle photos function
  const shufflePhotos = useCallback(() => {
    const shuffled = [...photos].sort(() => Math.random() - 0.5);
    setShuffledPhotos(shuffled);
    setCurrentPhotoIndex(0);
  }, [photos]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoplay) return;
    
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % shuffledPhotos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoplay, shuffledPhotos.length]);

  // Swipe detection
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd({ x: 0, y: 0 });
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchEnd = () => {
    if (!touchStart.x || !touchEnd.x) return;
    
    const distance = touchStart.x - touchEnd.x;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextPhoto();
    }
    if (isRightSwipe) {
      prevPhoto();
    }
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % shuffledPhotos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + shuffledPhotos.length) % shuffledPhotos.length);
  };

  const toggleFavorite = (index: number) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
    
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  const currentPhoto = shuffledPhotos[currentPhotoIndex];

  return (
    <div className="min-h-dvh flex flex-col" style={{ 
      paddingTop: 'env(safe-area-inset-top)', 
      paddingBottom: 'env(safe-area-inset-bottom)' 
    }}>
      {/* Header */}
      <motion.div 
        className="p-3 text-center bg-white/90 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-display text-lg font-semibold text-[#37243B] mb-1">
          Our Memories ✨
        </h1>
        <p className="text-xs text-[#37243B]/60">
          {currentPhotoIndex + 1} of {shuffledPhotos.length}
        </p>
      </motion.div>

      {/* Main Photo Display */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhotoIndex}
            className="absolute inset-0 flex flex-col"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4 }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Photo */}
            <div className="flex-1 relative bg-gradient-to-br from-[#FFC1D9] to-[#FF9EC7] flex items-center justify-center p-2">
              <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={currentPhoto.src}
                  alt={currentPhoto.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 400px"
                  priority={currentPhotoIndex < 3}
                  onClick={() => setShowLightbox(true)}
                />
                
                {/* Photo overlay controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Favorite button */}
                <motion.button
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
                  onClick={() => toggleFavorite(currentPhotoIndex)}
                  whileTap={{ scale: 0.9 }}
                  animate={favorites.has(currentPhotoIndex) ? { scale: [1, 1.2, 1] } : {}}
                >
                  <Heart 
                    size={20} 
                    className={`${
                      favorites.has(currentPhotoIndex) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-white'
                    } transition-colors`}
                  />
                </motion.button>

                {/* Swipe indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex gap-1">
                    {shuffledPhotos.slice(Math.max(0, currentPhotoIndex - 2), currentPhotoIndex + 3).map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === 2 ? 'bg-white' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Information */}
            <div className="bg-gradient-to-r from-white to-[#FFF5FA] p-5 mx-2 mb-2 rounded-2xl shadow-xl border-2 border-[#FF9EC7]/20">
              <div className="text-center space-y-4">
                <h2 className="font-display text-2xl font-bold text-[#37243B] mb-3">
                  {currentPhoto.title}
                </h2>
                
                {/* Caption with emphasis */}
                <div className="bg-[#FF66A3]/10 rounded-xl p-3 border border-[#FF66A3]/20">
                  <p className="text-lg text-[#37243B] leading-relaxed font-semibold">
                    &quot;{currentPhoto.caption}&quot;
                  </p>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-sm text-white font-bold bg-gradient-to-r from-[#FF66A3] to-[#FF9EC7] py-3 px-6 rounded-full shadow-lg">
                  <span>📅</span>
                  <span>{new Date(currentPhoto.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="bg-white/95 backdrop-blur-sm p-3 space-y-3">
        {/* Navigation */}
        <div className="flex items-center justify-center gap-6">
          <motion.button
            onClick={prevPhoto}
            className="w-12 h-12 rounded-full bg-[#FF66A3] text-white flex items-center justify-center shadow-lg active:scale-90"
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          <div className="flex gap-3">
            <motion.button
              onClick={() => setIsAutoplay(!isAutoplay)}
              className="w-11 h-11 rounded-full bg-[#FF66A3]/15 text-[#FF66A3] flex items-center justify-center active:scale-90"
              whileTap={{ scale: 0.9 }}
            >
              {isAutoplay ? <Pause size={18} /> : <Play size={18} />}
            </motion.button>

            <motion.button
              onClick={shufflePhotos}
              className="w-11 h-11 rounded-full bg-[#FF66A3]/15 text-[#FF66A3] flex items-center justify-center active:scale-90"
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: isAutoplay ? 360 : 0 }}
              transition={{ duration: 2, repeat: isAutoplay ? Infinity : 0, ease: "linear" }}
            >
              <Shuffle size={18} />
            </motion.button>
          </div>

          <motion.button
            onClick={nextPhoto}
            className="w-12 h-12 rounded-full bg-[#FF66A3] text-white flex items-center justify-center shadow-lg active:scale-90"
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[#FF66A3]/20 rounded-full h-2">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF66A3] to-[#FF9EC7] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentPhotoIndex + 1) / shuffledPhotos.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Quick actions */}
        <div className="text-center space-y-2">
          <p className="text-xs text-[#37243B]/50">
            Swipe • Tap to zoom • Heart to favorite
          </p>
          <a 
            href="/letter"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF66A3] to-[#FF9EC7] text-white text-sm font-medium shadow-lg active:scale-95"
          >
            Read Love Letter 💌
          </a>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
            style={{ 
              paddingTop: 'env(safe-area-inset-top)', 
              paddingBottom: 'env(safe-area-inset-bottom)' 
            }}
            onClick={() => setShowLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full h-full max-w-md mx-4 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowLightbox(false)}
                className="absolute top-4 right-4 min-w-[44px] min-h-[44px] rounded-full bg-black/50 text-white active:bg-black/70 transition-colors z-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
              >
                <X size={24} />
              </button>

              {/* Full-size photo */}
              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-full aspect-[3/4] max-h-full">
                  <Image
                    src={currentPhoto.src}
                    alt={currentPhoto.title}
                    fill
                    className="object-contain rounded-2xl"
                    sizes="100vw"
                  />
                </div>
              </div>

              {/* Photo info in lightbox */}
              <div className="bg-black/50 backdrop-blur-sm p-4 rounded-xl mx-4 mb-4">
                <div className="text-center space-y-2">
                  <h3 className="font-display text-lg font-bold text-white">
                    {currentPhoto.title}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {currentPhoto.caption}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-[#FF9EC7] font-medium">
                    <span>📅</span>
                    <span>{new Date(currentPhoto.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}