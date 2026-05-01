'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, ShoppingBag, Info, Mail, ChevronRight } from 'lucide-react';

import { NAV_LINKS } from '@/constants';

const SWOONRUSH_LOGO = 'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/refs/heads/main/swoonrush-web/public/swoonrush_logo.png';

const navIcons = {
  'Home': { icon: Home, desc: 'Return to home' },
  'Shop': { icon: ShoppingBag, desc: 'Explore our collection' },
  'About': { icon: Info, desc: 'Learn about our story' },
  'Contact': { icon: Mail, desc: 'Say hello to us' },
};

const SwoonRushNavbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`absolute top-0 left-0 right-0 z-50 transition-colors duration-300 bg-beige ${isScrolled ? ' shadow-sm border-b border-beige-dark' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg transition-colors md:hidden"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-text-dark" />
            ) : (
              <Menu size={24} className="text-text-dark" />
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center pt-3">
            <Image
              src={SWOONRUSH_LOGO}
              alt="SwoonRush Logo"
              width={150}
              height={40}
              className="h-8 w-auto sm:h-10"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-text-dark hover:text-pink transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

           {/* Shopping Bag / Contact */}
          <Link
            href="/contact"
            className="p-2 rounded-lg transition-colors relative md:hidden"
            aria-label="Mail"
          >
            <img src="https://www.svgrepo.com/show/311892/cherry-blossom.svg" alt="Contact" className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 top-16 bg-beige/95 backdrop-blur-md z-40"
          >
            <div className="flex flex-col gap-4 p-6 h-[calc(100vh-64px)] max-w-md mx-auto w-full">
              {NAV_LINKS.map((link, idx) => {
                const info = navIcons[link.name as keyof typeof navIcons] || { icon: Home, desc: '' };
                const Icon = info.icon;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-pink/10 hover:border-pink hover:shadow-md transition-all group w-full"
                    >
                      <div className="p-3 rounded-xl mr-4 transition-colors">
                        <Icon className="w-6 h-6 text-pink group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-text-dark font-display text-lg font-bold">
                          {link.name}
                        </span>
                        <span className="text-text-light text-xs font-medium">
                          {info.desc}
                        </span>
                      </div>
                      <ChevronRight className="ml-auto w-5 h-5 text-pink/30 group-hover:text-pink group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default SwoonRushNavbar;
