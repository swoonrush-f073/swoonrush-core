import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Layers, Ruler, Scissors, Shirt, Truck } from 'lucide-react';

import ProductActions from '@/components/ProductActions';
import ProductGallery from '@/components/ProductGallery';
import { PRODUCT_DETAIL_CONTENT, PRODUCTS } from '@/constants';
import { formatPrice } from '@/utils/formatPrice';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) return {};

  return {
    title: `${product.name} | SwoonRush`,
    description: product.description,
    openGraph: {
      images: [product.images.front],
    },
  };
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen pt-14 sm:pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Images */}
          <div>
            <ProductGallery images={product.images} alt={product.name} />
          </div>

          {/* Right: Details */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <p className="text-text-light text-sm font-medium tracking-widest uppercase">
                {product.category?.replace('-', ' ')}
              </p>
              <span className="text-[10px] sm:text-xs font-semibold text-pink uppercase tracking-wider flex items-center gap-1.5 bg-pink/10 px-2.5 py-1 rounded-full border border-pink/20">
                <Truck size={14} /> Free Delivery
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-text-dark mb-4">
              {product.name}
            </h1>
            <div className="flex items-center flex-wrap gap-3 mb-3">
              <span className="text-2xl font-bold text-text-dark">
                {formatPrice(product.price, product.currency)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-text-light/70 line-through font-medium">
                  {formatPrice(product.originalPrice, product.currency)}
                </span>
              )}
              {product.offerPercentage && product.offerPercentage > 0 ? (
                <span className="bg-red-500/10 text-red-600 px-3 py-1 rounded-full text-sm font-bold tracking-wide border border-red-500/20">
                  {product.offerPercentage}% OFF
                </span>
              ) : null}
            </div>

            <div className="prose prose-sm text-text-dark">
              {product?.subTitle && (
                <p className="font-medium">{product.subTitle}</p>
              )}
              <p>{product.description}</p>
            </div>

            {/* Colors */}
            {/* <div className="mb-6">
              <h4 className="text-sm font-medium text-text-dark mb-3">
                {PRODUCT_DETAIL_CONTENT.labels.availableColors}
              </h4>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <div
                    key={color.name}
                    className="flex flex-col items-center gap-1"
                  >
                    <div
                      className="w-8 h-8 rounded-full border border-beige-dark shadow-sm"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                    <span className="text-[10px] text-text-light">
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Key Highlights Section */}
            <div className="border-t border-b border-beige-dark py-4 mt-4">
              <h3 className="text-sm font-semibold text-text-dark uppercase tracking-wider mb-4">
                Key Highlights
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-6">
                <div className="bg-beige/40 rounded-xl p-3 flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-pink/10 rounded-lg text-pink shrink-0">
                    <Shirt className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] sm:text-[11px] font-medium text-text-light uppercase tracking-wider mb-1 sm:mb-0">
                      Fit
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-text-dark leading-snug">
                      {product.fit}
                    </span>
                  </div>
                </div>

                <div className="bg-beige/40 rounded-xl p-3 flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-pink/10 rounded-lg text-pink shrink-0">
                    <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] sm:text-[11px] font-medium text-text-light uppercase tracking-wider mb-1 sm:mb-0">
                      Fabric
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-text-dark leading-snug">
                      {product.slug.includes('hoodie')
                        ? product.material
                        : `220 GSM Premium Cotton`}
                    </span>
                  </div>
                </div>

                <div className="bg-beige/40 rounded-xl p-3 flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-pink/10 rounded-lg text-pink shrink-0">
                    <Scissors className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] sm:text-[11px] font-medium text-text-light uppercase tracking-wider mb-1 sm:mb-0">
                      Neck
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-text-dark leading-snug">
                      {product.slug.includes('hoodie')
                        ? 'Hooded Neck'
                        : 'Round Neck'}
                    </span>
                  </div>
                </div>

                <div className="bg-beige/40 rounded-xl p-3 flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-pink/10 rounded-lg text-pink shrink-0">
                    <Ruler className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] sm:text-[11px] font-medium text-text-light uppercase tracking-wider mb-1 sm:mb-0">
                      Sleeve
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-text-dark leading-snug">
                      {product.slug.includes('hoodie')
                        ? 'Long Sleeve'
                        : 'Regular Sleeve'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-beige/30 border border-beige-dark/50 rounded-xl p-4 text-xs">
                <span className="block font-semibold text-text-dark mb-1.5 uppercase tracking-wider text-[10px]">
                  Wash Care
                </span>
                <p className="text-text-light leading-relaxed">
                  Machine wash cold with mild detergent. Dry inside-out in
                  shade. Do not iron directly on print. Avoid bleach and tumble
                  drying. Flat dry to retain shape.
                </p>
              </div>
            </div>

            {/* Client-side Actions (Size Selection + WhatsApp) */}
            <ProductActions product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
