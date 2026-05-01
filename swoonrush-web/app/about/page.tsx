import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_METADATA } from '@/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | SwoonRush',
  description: 'The story behind SwoonRush and our mission to bring K-Drama inspired fashion to the world.',
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 sm:py-28 bg-beige">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text-dark mb-6">
            The SwoonRush Story
          </h1>
          <p className="text-text-light text-lg sm:text-xl max-w-2xl mx-auto">
            Born from late-night binge-watching sessions and a deep love for Korean aesthetics.
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
                  For the Love of the Scene
                </h2>
                <div className="space-y-4 text-text-light text-base leading-relaxed">
                  <p>
                    {SITE_METADATA.brandName} started with a simple idea: what if we could wear the feelings our favorite K-Dramas give us? The heart-fluttering moments, the epic soundtracks, the unforgettable quotes—all woven into everyday apparel.
                  </p>
                  <p>
                    We didn't want loud, walking billboards. We wanted subtle, aesthetic pieces that only true fans would recognize, while remaining incredibly stylish for anyone else.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-3xl font-bold text-text-dark mb-4">
                  Quality Above All
                </h2>
                <div className="space-y-4 text-text-light text-base leading-relaxed">
                  <p>
                    Just like a high-budget drama production, we believe the magic is in the details. We source only premium, comfortable cotton that feels like a warm hug. 
                  </p>
                  <p>
                    Because we handle every order personally through WhatsApp or direct contact, we ensure that every piece you receive is exactly what you wanted, wrapped with the same care as a gift to a friend.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/#products"
                  className="inline-flex items-center gap-2 border-2 border-pink text-pink hover:bg-pink hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300"
                >
                  Explore the Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
