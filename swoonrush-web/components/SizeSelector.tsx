'use client';

import React from 'react';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeSelect: (size: string) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSizeSelect,
}: SizeSelectorProps) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-medium text-text-dark">Size</h4>
        <button className="text-sm text-text-light hover:text-pink transition-colors underline decoration-1 underline-offset-2">
          Size Guide
        </button>
      </div>
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(size)}
            className={`py-3 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedSize === size
                ? 'bg-text-dark text-white shadow-md scale-105'
                : 'bg-white border border-beige-dark text-text-dark hover:border-pink hover:text-pink'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
