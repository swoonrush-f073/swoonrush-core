import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

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
            <p className="text-text-light text-sm font-medium tracking-widest uppercase mb-2">
              {product.category?.replace('-', ' ')}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-text-dark mb-4">
              {product.name}
            </h1>
            <div className="flex items-center flex-wrap gap-3 mb-6">
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

            <div className="prose prose-sm text-text-dark mb-8">
              <p>{product.description}</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex text-sm">
                <span className="font-medium text-text-dark w-24">
                  {PRODUCT_DETAIL_CONTENT.labels.material}
                </span>
                <span className="text-text-light">{product.material}</span>
              </div>
              <div className="flex text-sm">
                <span className="font-medium text-text-dark w-24">
                  {PRODUCT_DETAIL_CONTENT.labels.fit}
                </span>
                <span className="text-text-light">{product.fit}</span>
              </div>
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

            {/* Client-side Actions (Size Selection + WhatsApp) */}
            <ProductActions product={product} />

            <div className="mt-8 text-sm text-text-light">
              <p className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                {PRODUCT_DETAIL_CONTENT.shippingInfo.worldwide}
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-beige-dark"></span>
                {PRODUCT_DETAIL_CONTENT.shippingInfo.standard}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
