'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/constants';
import { getAllProducts } from '@/utils/fetchProducts';
import { Filter } from 'lucide-react';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-text-dark">Shop All</h1>
            <p className="text-text-light mt-2">Discover our full collection of Kdrama-inspired apparel.</p>
          </div>
          
          <button className="flex items-center gap-2 border border-beige-dark hover:border-pink hover:text-pink text-text-dark px-4 py-2 rounded-xl transition-colors">
            <Filter size={18} />
            <span className="font-medium text-sm">Filter</span>
          </button>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-pink border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product, index) => (
              <ProductCard
                key={product.id || product.slug}
                product={product}
                delay={index * 0.05} // Staggered animation
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-beige rounded-3xl">
            <h3 className="text-xl font-bold text-text-dark">No products found</h3>
            <p className="text-text-light mt-2">We are restocking soon! Check back later.</p>
          </div>
        )}
        
      </div>
    </div>
  );
}
