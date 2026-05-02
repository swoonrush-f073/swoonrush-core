'use client';

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

import { CONTACT_INFO, Product, PRODUCT_DETAIL_CONTENT } from '@/constants';

import SizeSelector from './SizeSelector';

interface ProductActionsProps {
  product: Product;
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');

  const whatsappMessage = encodeURIComponent(
    PRODUCT_DETAIL_CONTENT.whatsappMessageTemplate.replace(
      '{productName}',
      product.name,
    ) + (selectedSize ? ` (Size: ${selectedSize})` : ''),
  );
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${whatsappMessage}`;

  const isEnabled = product.inStock && selectedSize !== '';

  return (
    <div className="flex flex-col h-full">
      {/* Size Selection */}
      <SizeSelector
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSizeSelect={setSelectedSize}
      />

      {/* Actions */}
      <div className="flex flex-col gap-4 mt-8">
        {!product.inStock && (
          <div className="bg-gray-100 text-gray-600 font-medium py-4 text-center rounded-xl mb-2">
            {PRODUCT_DETAIL_CONTENT.labels.outOfStock}
          </div>
        )}

        <a
          href={isEnabled ? whatsappUrl : '#'}
          target={isEnabled ? '_blank' : undefined}
          rel="noopener noreferrer"
          onClick={(e) => {
            if (!isEnabled) {
              e.preventDefault();
            }
          }}
          className={`flex items-center justify-center gap-2 py-4 rounded-xl font-medium transition-all duration-300 shadow-md ${
            isEnabled
              ? 'bg-pink hover:bg-pink-dark text-white hover:shadow-lg hover:scale-[1.02]'
              : 'bg-beige-dark text-text-light cursor-not-allowed opacity-60 grayscale-[0.5]'
          }`}
        >
          <MessageCircle size={20} />
          {PRODUCT_DETAIL_CONTENT.labels.orderViaWhatsapp}
        </a>

        <a
          href="/contact"
          className="flex items-center justify-center gap-2 py-4 rounded-xl font-medium transition-all duration-300 bg-white border-2 border-beige-dark text-text-dark hover:border-pink hover:text-pink"
        >
          {PRODUCT_DETAIL_CONTENT.labels.inquireViaForm}
        </a>
      </div>
    </div>
  );
};

export default ProductActions;
