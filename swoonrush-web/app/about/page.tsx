import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { ABOUT_PAGE_CONTENT, SITE_METADATA } from '@/constants';

export const metadata: Metadata = {
  title: 'About Us | SwoonRush',
  description:
    'The story behind SwoonRush and our mission to bring Drama inspired fashion to the world.',
};

const ABOUT_IMAGE_URL =
  'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/refs/heads/main/swoonrush-web/public/products/about-image.png';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pb-20 sm:pb-0">
      {/* Hero Section */}
      <section className="pt-20 sm:pt-24">
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
      <section className="py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative aspect-square max-h-[600px] md:h-auto md:aspect-[4/5] rounded-3xl overflow-hidden shadow-lg bg-beige-light">
              <Image
                src={ABOUT_IMAGE_URL}
                alt="SwoonRush studio and process"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="space-b-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-text-dark mb-2">
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
                <h2 className="font-display text-2xl font-bold text-text-dark mb-2 mt-4">
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
