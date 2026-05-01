import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { ABOUT_PAGE_CONTENT, SITE_METADATA } from '@/constants';

export const metadata: Metadata = {
  title: 'About Us | SwoonRush',
  description:
    'The story behind SwoonRush and our mission to bring K-Drama inspired fashion to the world.',
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 sm:py-28 bg-beige">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text-dark mb-6">
            {ABOUT_PAGE_CONTENT.hero.title}
          </h1>
          <p className="text-text-light text-lg sm:text-xl max-w-2xl mx-auto">
            {ABOUT_PAGE_CONTENT.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-lg bg-beige-light">
              <Image
                src="/products/about-image.png"
                alt="SwoonRush studio and process"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-3xl font-bold text-text-dark mb-4">
                  {ABOUT_PAGE_CONTENT.content.section1.title}
                </h2>
                <div className="space-y-4 text-text-light text-base leading-relaxed">
                  <p>
                    {ABOUT_PAGE_CONTENT.content.section1.paragraphs[0].replace(
                      '{brandName}',
                      SITE_METADATA.brandName,
                    )}
                  </p>
                  <p>{ABOUT_PAGE_CONTENT.content.section1.paragraphs[1]}</p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-3xl font-bold text-text-dark mb-4">
                  {ABOUT_PAGE_CONTENT.content.section2.title}
                </h2>
                <div className="space-y-4 text-text-light text-base leading-relaxed">
                  <p>{ABOUT_PAGE_CONTENT.content.section2.paragraphs[0]}</p>
                  <p>{ABOUT_PAGE_CONTENT.content.section2.paragraphs[1]}</p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/#products"
                  className="inline-flex items-center gap-2 border-2 border-pink text-pink hover:bg-pink hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300"
                >
                  {ABOUT_PAGE_CONTENT.content.ctaButton}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
