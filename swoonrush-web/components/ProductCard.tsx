'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Product } from '@/constants';
import { formatPrice } from '@/utils/formatPrice';

interface ProductCardProps {
  product: Product;
  delay?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  delay = 0,
}: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-beige-light rounded-2xl mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-300">
          <Image
            src={product.images.front}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
              <span className="bg-white text-text-dark px-4 py-2 rounded-full text-sm font-semibold tracking-wider">
                OUT OF STOCK
              </span>
            </div>
          )}
          {product.featured &&
            product.inStock &&
            product.originalPrice &&
            product.originalPrice !== product.price && (
              <div className="absolute top-3 right-3 bg-pink text-white px-3 py-1 rounded-full text-xs font-medium tracking-wider shadow-sm z-10">
                {product.offerPercentage}% OFF
              </div>
            )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col items-center text-center">
          <p className="text-text-light text-xs font-medium tracking-widest uppercase mb-1">
            {product.category?.replace('-', ' ')}
          </p>
          <h3 className="text-lg font-display font-semibold text-text-dark group-hover:text-pink transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-text-dark font-semibold">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.originalPrice &&
              product.originalPrice !== product.price && (
                <span className="text-text-light/70 text-sm line-through font-medium">
                  {formatPrice(product.originalPrice, product.currency)}
                </span>
              )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
