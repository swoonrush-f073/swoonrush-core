'use client';

import React from 'react';
import Link from 'next/link';

import ProductCard from '@/components/ProductCard';
import SwoonRushHero from '@/components/SwoonRushHero';
import { CONTACT_INFO, HOME_PAGE_CONTENT, PRODUCTS } from '@/constants';

export default function Home() {
  const featuredProducts = PRODUCTS.filter((p) => p.featured);

  return (
    <div>
      {/* Hero Section */}
      <SwoonRushHero />

      {/* Products Section */}
      <section id="products" className="py-16 sm:py-24 bg-white scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
              {HOME_PAGE_CONTENT.productsSection.title}
            </h2>
            <p className="text-text-light text-lg max-w-2xl mx-auto">
              {HOME_PAGE_CONTENT.productsSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                delay={index * 0.1}
              />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/#products" // Or /products if there was a full catalog
              className="inline-flex items-center justify-center gap-2 border-2 border-beige-dark text-text-dark hover:border-pink hover:text-pink px-8 py-3 rounded-full font-medium transition-all duration-300"
            >
              {HOME_PAGE_CONTENT.productsSection.viewAllBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 pb-36 sm:pb-20 bg-beige">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-dark mb-6">
            {HOME_PAGE_CONTENT.ctaSection.title}
          </h2>
          <p className="text-text-light text-lg mb-10 max-w-2xl mx-auto">
            {HOME_PAGE_CONTENT.ctaSection.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`${CONTACT_INFO.whatsappLink}?text=${encodeURIComponent(HOME_PAGE_CONTENT.ctaSection.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-pink hover:bg-pink-dark text-white px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              {HOME_PAGE_CONTENT.ctaSection.whatsappBtn}
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-text-dark border-2 border-transparent hover:border-pink px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {HOME_PAGE_CONTENT.ctaSection.contactFormBtn}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
