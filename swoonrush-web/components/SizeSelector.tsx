'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderSizeGuide = () => {
    return (
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden z-10"
            >
              <div className="p-4 border-b flex justify-between items-center bg-beige-light/30">
                <h3 className="font-display font-semibold text-text-dark">
                  Size Chart
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 hover:bg-beige-dark/20 rounded-full transition-colors text-text-light hover:text-text-dark"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 sm:p-8 bg-white overflow-auto max-h-[70vh]">
                <div className="relative w-full aspect-[1/1.2] sm:aspect-[1.4/1]">
                  <Image
                    src="/products/size-chart.webp"
                    alt="Size Chart"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="p-4 bg-beige-light/30 border-t text-center">
                <p className="text-[10px] sm:text-xs text-text-light italic">
                  * All measurements are in inches. If you&apos;re between
                  sizes, we recommend sizing up for an oversized fit.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-sm text-text-light hover:text-pink transition-colors underline decoration-1 underline-offset-2"
        >
          Size Guide
        </button>
      </div>
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(size)}
            className={`py-2 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedSize === size
                ? 'bg-text-dark text-white shadow-md scale-105'
                : 'bg-white border border-beige-dark text-text-dark hover:border-pink hover:text-pink'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
      {renderSizeGuide()}
    </div>
  );
};

export default SizeSelector;
