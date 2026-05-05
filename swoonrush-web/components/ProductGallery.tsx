'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

interface ProductGalleryProps {
  images: {
    both?: string;
    front: string;
    back?: string;
    detail?: string;
    lifestyle?: string;
  };
  alt: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  alt,
}: ProductGalleryProps) => {
  const [activeImage, setActiveImage] = useState(images.front);

  const allImages = [
    images.front,
    images.back,
    images.both,
    images.detail,
    images.lifestyle,
  ].filter(Boolean) as string[];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative max-h-[600px] aspect-[3/4] w-full bg-beige-light rounded-2xl overflow-hidden shadow-sm group">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = offset.x;
              const threshold = 50;
              const currentIndex = allImages.indexOf(activeImage);

              if (swipe < -threshold) {
                // Swipe Left -> Next
                const nextIndex = (currentIndex + 1) % allImages.length;
                setActiveImage(allImages[nextIndex]);
              } else if (swipe > threshold) {
                // Swipe Right -> Prev
                const prevIndex =
                  (currentIndex - 1 + allImages.length) % allImages.length;
                setActiveImage(allImages[prevIndex]);
              }
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={activeImage}
              alt={alt}
              fill
              className="object-cover pointer-events-none"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Swipe Indicator Dots (Mobile Only) */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
            {allImages.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  allImages.indexOf(activeImage) === idx
                    ? 'bg-pink w-4'
                    : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`relative h-24 w-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                activeImage === img
                  ? 'border-pink'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${alt} thumbnail ${idx + 1}`}
                fill
                className="object-cover bg-beige-light"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
