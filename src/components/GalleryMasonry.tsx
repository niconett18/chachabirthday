'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';


interface GalleryMasonryProps {
  images: string[];
  hoverCaption?: boolean;
}

export function GalleryMasonry({ images, hoverCaption = true }: GalleryMasonryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  const captions = [
    "Our first adventure together",
    "That perfect sunset moment", 
    "Laughing until our sides hurt",
    "Dancing in the kitchen",
    "Making memories everywhere we go"
  ];

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative cursor-pointer group"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onTap={() => setHoveredImage(hoveredImage === index ? null : index)}
            onClick={() => openLightbox(index)}
          >
            {/* Placeholder image */}
            <div 
              className="w-full bg-gradient-to-br from-[#FFC1D9] to-[#FF9EC7] rounded-2xl aspect-[4/5] overflow-hidden shadow-md active:shadow-lg transition-all duration-300"
            >
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-white/70 text-sm font-medium">
                  Photo {index + 1}
                </p>
              </div>
            </div>

            {/* Caption overlay - shows on tap on mobile */}
            <AnimatePresence>
              {hoverCaption && hoveredImage === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="text-white text-center px-3 text-sm sm:text-base font-medium leading-relaxed">
                    {captions[index] || "A beautiful memory"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
            style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full h-full max-w-md mx-4 flex flex-col"
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(event, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe > 10000) {
                  if (offset.x > 0) {
                    prevImage();
                  } else {
                    nextImage();
                  }
                }
              }}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 min-w-[44px] min-h-[44px] rounded-full bg-black/50 text-white active:bg-black/70 transition-colors z-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close gallery"
              >
                <X size={24} />
              </button>

              {/* Navigation buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 min-w-[44px] min-h-[44px] rounded-full bg-black/50 text-white active:bg-black/70 transition-colors z-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 min-w-[44px] min-h-[44px] rounded-full bg-black/50 text-white active:bg-black/70 transition-colors z-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              {/* Image */}
              <div className="flex-1 flex items-center justify-center p-4">
                <div className="bg-gradient-to-br from-[#FFC1D9] to-[#FF9EC7] rounded-2xl aspect-[4/5] w-full max-w-sm flex items-center justify-center">
                  <p className="text-white text-lg font-medium">
                    Photo {selectedImage + 1}
                  </p>
                </div>
              </div>

              {/* Caption */}
              <div className="text-center p-4">
                <p className="text-white font-medium text-base leading-relaxed">
                  {captions[selectedImage] || "A beautiful memory"}
                </p>
                <p className="text-white/70 text-sm mt-2">
                  {selectedImage + 1} of {images.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}