'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, ShoppingBag } from 'lucide-react';
import { NAV_LINKS } from '@/constants';

export default function SwoonRushNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-beige/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-pink/10 rounded-lg transition-colors md:hidden"
            aria-label="Menu"
          >
            <Menu size={24} className="text-text-dark" />
          </button>

          {/* Logo */}
          <Link href="/" className="font-display text-xl sm:text-2xl font-bold tracking-wider text-text-dark">
            SWOONRUSH
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map(link => (
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
            className="p-2 hover:bg-pink/10 rounded-lg transition-colors relative"
            aria-label="Shopping bag"
          >
            <ShoppingBag size={24} className="text-text-dark" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-beige-dark">
          <div className="px-4 py-4 space-y-3">
            {NAV_LINKS.map(link => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-text-dark hover:text-pink transition-colors py-2 font-medium"
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
}
