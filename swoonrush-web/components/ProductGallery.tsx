'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

interface ProductGalleryProps {
  images: {
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
    images.detail,
    images.lifestyle,
  ].filter(Boolean) as string[];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-[3/4] w-full bg-beige-light rounded-2xl overflow-hidden shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={activeImage}
              alt={alt}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
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
