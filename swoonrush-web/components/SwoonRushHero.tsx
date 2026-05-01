'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Gift, Shirt, Users } from 'lucide-react';

import { HERO_CONTENT, HERO_EXTRA_CONTENT } from '@/constants';
import FloatingBadge from '@/components/FloatingBadge';

const HERO_IMAGE_URL =
  'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/hero-models.png';

const featureItems = [
  { icon: Shirt, label: HERO_EXTRA_CONTENT.features.feature1 },
  { icon: Gift, label: HERO_EXTRA_CONTENT.features.feature2 },
  { icon: Users, label: HERO_EXTRA_CONTENT.features.feature3 },
  { icon: Heart, label: HERO_EXTRA_CONTENT.features.feature4 },
];

const SwoonRushHero: React.FC = () => {
  return (
    <section className="relative h-dvh min-h-[700px] lg:min-h-[650px] bg-beige overflow-hidden flex flex-col">
      {/* Main hero area — grows to fill available space */}
      <div className="relative flex-1 flex flex-col lg:flex-row lg:items-stretch max-w-7xl mx-auto w-full px-5 sm:px-6">
        {/* ─── Text Column ─── */}
        <div className="relative z-10 flex flex-col justify-start lg:justify-center lg:w-[45%] pt-24 sm:pt-28 lg:pt-0 pb-2 lg:pb-20">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="font-display text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-text-dark">
                {HERO_CONTENT.heading}
                <br />
                <span className="text-pink italic">{HERO_CONTENT.highlightedText}</span>
                <br />
                {HERO_CONTENT.headingEnd}
              </h1>
            </motion.div>

            {/* FloatingBadge — mobile only, positioned next to heading */}
            <div className="lg:hidden absolute -right-2 top-5 sm:right-0">
              <FloatingBadge />
            </div>
          </div>

          {/* Small heart accent */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="w-[60%] my-3 lg:my-4 flex flex-row justify-between items-center"
          >
            <div className='w-full h-[0.5px] bg-black/50' />
            <Heart className="text-pink fill-pink mx-4" size={30} />
            <div className='w-full h-[0.5px] bg-black/50' />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-text-light text-sm sm:text-base lg:text-lg max-w-xs lg:max-w-sm leading-relaxed"
          >
            {HERO_CONTENT.subheading}
          </motion.p>

          {/* Features — visible on desktop inline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hidden lg:flex items-center gap-6 mt-6"
          >
            {featureItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-1.5">
                <div className="w-10 h-10 bg-pink/10 rounded-full flex items-center justify-center">
                  <Icon className="text-pink" size={20} />
                </div>
                <p className="text-xs text-text-dark whitespace-nowrap">{label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 lg:mt-8"
          >
            <Link
              href="/#products"
              className="inline-flex items-center gap-2 bg-pink hover:bg-pink-dark text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.03] text-sm sm:text-base tracking-wide uppercase"
            >
              {HERO_CONTENT.cta.primary}
            </Link>
          </motion.div>
        </div>

        {/* ─── Image Column ─── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative lg:w-[55%] flex-1 lg:flex-initial flex items-end justify-center lg:justify-end lg:self-stretch"
        >
          <div className="relative w-full h-[50vh] sm:h-[50vh] lg:h-full min-h-[300px]">
            <Image
              src={HERO_IMAGE_URL}
              alt="Drama inspired fashion models wearing SwoonRush t-shirts"
              fill
              className="object-contain object-bottom"
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>

          {/* FloatingBadge — desktop only */}
          <div className="hidden lg:block">
            <FloatingBadge />
          </div>
        </motion.div>
      </div>

      {/* ─── Mobile Features Bar (bottom strip) ─── */}
      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="lg:hidden flex-shrink-0 bg-white/40 backdrop-blur-sm border-t border-beige-dark/30"
      >
        <div className="grid grid-cols-4 gap-1 px-3 py-3">
          {featureItems.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-center gap-1">
              <div className="w-10 h-10 bg-beige rounded-xl flex items-center justify-center">
                <Icon className="text-pink" size={14} />
              </div>
              <p className="text-[10px] sm:text-xs text-text-dark leading-tight">
                {label}
              </p>
            </div>
          ))}
        </div>
      </motion.div> */}
    </section>
  );
};

export default SwoonRushHero;
