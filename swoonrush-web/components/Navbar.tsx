'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

import { NAV_LINKS } from '@/constants';

const SWOONRUSH_LOGO = 'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/refs/heads/main/swoonrush-web/public/swoonrush_logo.png';

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
            className="p-2 hover:bg-pink/10 rounded-lg transition-colors md:hidden"
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
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-beige backdrop-blur-sm z-40">
          <div className="flex flex-col items-center justify-center h-full px-4 space-y-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-2xl text-text-dark hover:text-pink transition-colors py-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default SwoonRushNavbar;
