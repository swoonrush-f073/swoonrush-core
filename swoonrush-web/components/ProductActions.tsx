'use client';

import React, { useState } from 'react';
import { Bell, MessageCircle } from 'lucide-react';

import { CONTACT_INFO, Product, PRODUCT_DETAIL_CONTENT } from '@/constants';

import SizeSelector from './SizeSelector';

interface ProductActionsProps {
  product: Product;
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');

  const productFullyOOS = !product.inStock;
  const selectedSizeIsOOS = selectedSize
    ? product.sizes[selectedSize as keyof typeof product.sizes] === false
    : false;

  const showOOSActions = productFullyOOS || selectedSizeIsOOS;

  const whatsappOrderMessage = encodeURIComponent(
    PRODUCT_DETAIL_CONTENT.whatsappMessageTemplate.replace(
      '{productName}',
      product.name,
    ) + (selectedSize ? ` (Size: ${selectedSize})` : ''),
  );

  const whatsappInterestMessage = encodeURIComponent(
    PRODUCT_DETAIL_CONTENT.interestMessageTemplate.replace(
      '{productName}',
      product.name,
    ) + (selectedSize ? ` (Preferred Size: ${selectedSize})` : ''),
  );

  const whatsappOrderUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${whatsappOrderMessage}`;
  const whatsappInterestUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${whatsappInterestMessage}`;

  return (
    <div className="flex flex-col h-full">
      {/* Size Selection */}
      <SizeSelector
        sizes={product.sizes}
        selectedSize={selectedSize}
        isOldSizeChart={product?.isOldSizeChart}
        sizeChartImage={product?.sizeChartImage}
        onSizeSelect={setSelectedSize}
      />

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-8">
        {showOOSActions ? (
          <>
            <div className="flex items-center justify-center gap-2 bg-gray-100 text-gray-500 font-medium py-3.5 text-center rounded-xl border border-gray-200">
              <span className="inline-block w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              {selectedSizeIsOOS && !productFullyOOS
                ? `Size ${selectedSize} — Out of Stock`
                : PRODUCT_DETAIL_CONTENT.labels.outOfStock}
            </div>

            <a
              href={whatsappInterestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-4 rounded-xl font-medium transition-all duration-300 shadow-md bg-amber-500 hover:bg-amber-600 text-white hover:shadow-lg hover:scale-[1.02]"
            >
              <Bell size={20} />
              {PRODUCT_DETAIL_CONTENT.labels.sendInterest}
            </a>

            <p className="text-center text-xs text-text-light leading-relaxed px-2">
              Let us know you&apos;re interested — we&apos;ll notify you as soon as it&apos;s back in stock! 🔔
            </p>
          </>
        ) : (
          <a
            href={whatsappOrderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-4 rounded-xl font-medium transition-all duration-300 shadow-md bg-pink hover:bg-pink-dark text-white hover:shadow-lg hover:scale-[1.02]"
          >
            <MessageCircle size={20} />
            {PRODUCT_DETAIL_CONTENT.labels.orderViaWhatsapp}
          </a>
        )}
      </div>
    </div>
  );
};

export default ProductActions;
