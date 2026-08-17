import React from 'react';
import Link from 'next/link';

import CtaSection from '@/components/CtaSection';
import ProductCard from '@/components/ProductCard';
import SwoonRushHero from '@/components/SwoonRushHero';
import { HOME_PAGE_CONTENT } from '@/constants';
import { getProducts } from '@/lib/api';

export default async function Home() {
  const featuredProducts = await getProducts({ featured: 'true' });

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

          {featuredProducts?.length > 5 && (
            <div className="mt-16 text-center">
              <Link
                href="/#products"
                className="inline-flex items-center justify-center gap-2 border-2 border-beige-dark text-text-dark hover:border-pink hover:text-pink px-8 py-3 rounded-full font-medium transition-all duration-300"
              >
                {HOME_PAGE_CONTENT.productsSection.viewAllBtn}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section — client component (has onClick analytics) */}
      <CtaSection />
    </div>
  );
}
