'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FloatingBadge: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="absolute right-2 sm:right-4 sm:top-24 lg:right-8 lg:top-28 z-20"
    >
      <div className="relative w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px]">
        {/* Circular rotating text */}
        <svg
          className="w-full h-full animate-spin-slow"
          viewBox="0 0 120 120"
        >
          <defs>
            <path
              id="circlePath"
              d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
            />
          </defs>
          <text
            className="fill-text-dark"
            fontSize="10.5"
            fontWeight="600"
            letterSpacing="3"
          >
            <textPath href="#circlePath" startOffset="0%">
              INSPIRED BY · THE STORIES WE LOVE ·{' '}
            </textPath>
          </text>
        </svg>
        {/* Center heart */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Heart className="text-pink fill-pink" size={24} />
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingBadge;
