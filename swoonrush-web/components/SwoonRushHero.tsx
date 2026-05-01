'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Shirt, Sparkles, Users } from 'lucide-react';

import { HERO_CONTENT, HERO_EXTRA_CONTENT } from '@/constants';

const HERO_IMAGE_URL = 'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/hero-models.png';

const SwoonRushHero: React.FC = () => {
  return (
    <section className="min-h-screen bg-beige pt-16 pb-8 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Hero Content */}
        <div className="text-center mt-8 sm:mt-12 mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text-dark leading-tight mb-4"
          >
            {HERO_CONTENT.heading}{' '}
            <span className="text-pink">{HERO_CONTENT.highlightedText}</span>
            <br />
            {HERO_CONTENT.headingEnd}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-light text-base sm:text-lg mb-6 max-w-md mx-auto"
          >
            {HERO_CONTENT.subheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/#products"
              className="inline-flex items-center gap-2 bg-pink hover:bg-pink-dark text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              {HERO_CONTENT.cta.primary}
            </Link>
          </motion.div>
        </div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative max-w-2xl mx-auto mb-8"
        >
          <div className="relative h-64 sm:h-80 md:h-96 bg-gradient-to-b from-transparent to-beige-dark/20 rounded-3xl overflow-hidden flex items-center justify-center">
            <Image
              src={HERO_IMAGE_URL}
              alt="K-Drama inspired fashion models"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>

          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute -right-4 top-1/4 sm:right-4 sm:top-1/3 bg-white rounded-full p-4 shadow-xl max-w-[140px] text-center"
          >
            <p className="text-xs sm:text-sm text-text-dark font-medium leading-tight">
              {HERO_EXTRA_CONTENT.floatingBadge}
            </p>
          </motion.div>
        </motion.div>

        {/* Features Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-3xl shadow-lg p-6 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 bg-pink/10 rounded-full flex items-center justify-center">
                <Shirt className="text-pink" size={24} />
              </div>
              <p className="text-xs sm:text-sm font-medium text-text-dark">
                {HERO_EXTRA_CONTENT.features.feature1}
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 bg-pink/10 rounded-full flex items-center justify-center">
                <Sparkles className="text-pink" size={24} />
              </div>
              <p className="text-xs sm:text-sm font-medium text-text-dark">
                {HERO_EXTRA_CONTENT.features.feature2}
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 bg-pink/10 rounded-full flex items-center justify-center">
                <Users className="text-pink" size={24} />
              </div>
              <p className="text-xs sm:text-sm font-medium text-text-dark">
                {HERO_EXTRA_CONTENT.features.feature3}
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 bg-pink/10 rounded-full flex items-center justify-center">
                <Heart className="text-pink" size={24} />
              </div>
              <p className="text-xs sm:text-sm font-medium text-text-dark">
                {HERO_EXTRA_CONTENT.features.feature4}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SwoonRushHero;
