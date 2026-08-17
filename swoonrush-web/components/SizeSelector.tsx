'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';

import { SizeMap } from '@/constants';

interface SizeSelectorProps {
  sizes: SizeMap;
  isOldSizeChart?: boolean;
  sizeChartImage?: string;
  selectedSize: string;
  onSizeSelect: (size: string) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  isOldSizeChart = false,
  sizeChartImage,
  onSizeSelect,
}: SizeSelectorProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Derive ordered size list and OOS lookup from the map
  const sizeKeys = Object.keys(sizes) as (keyof SizeMap)[];
  const isOutOfStock = (size: string) => sizes[size as keyof SizeMap] === false;
  const selectedIsOOS = selectedSize ? isOutOfStock(selectedSize) : false;

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
              className="relative bg-white rounded-2xl shadow-2xl w-fit max-w-[95vw] overflow-hidden z-10"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 absolute right-2 top-2 z-20 hover:bg-beige-dark/20 rounded-full transition-colors text-text-light hover:text-text-dark"
              >
                <X size={20} />
              </button>

              <div className="bg-white overflow-auto max-h-[70vh]">
                <div className="relative">
                  <Image
                    src={sizeChartImage ?? (isOldSizeChart ? "/products/size-chart-01.PNG" : "/products/size-chart.PNG")}
                    alt="Size Chart"
                    width={1024}
                    height={1536}
                    className="w-full h-auto max-h-[70vh] object-contain"
                    priority
                  />
                </div>
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
        {sizeKeys.map((size) => {
          const oos = isOutOfStock(size);
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              onClick={() => onSizeSelect(size)}
              title={oos ? `${size} — Out of Stock` : size}
              className={`relative py-2 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 overflow-hidden
                ${isSelected && !oos
                  ? 'bg-text-dark text-white shadow-md scale-105'
                  : isSelected && oos
                  ? 'bg-red-50 text-red-400 border border-red-300 scale-105 shadow-sm'
                  : oos
                  ? 'bg-gray-50 border border-gray-200 text-gray-400 cursor-pointer'
                  : 'bg-white border border-beige-dark text-text-dark hover:border-pink hover:text-pink'
                }`}
            >
              {/* Diagonal strikethrough line for OOS sizes */}
              {oos && (
                <span className="absolute inset-0 pointer-events-none" aria-hidden="true">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line
                      x1="10" y1="90" x2="90" y2="10"
                      stroke={isSelected ? '#f87171' : '#d1d5db'}
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              )}
              {size}
            </button>
          );
        })}
      </div>

      {/* Out-of-stock notice when an OOS size is selected */}
      <AnimatePresence>
        {selectedIsOOS && (
          <motion.div
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
              <AlertCircle size={15} className="text-red-400 mt-0.5 shrink-0" />
              <p className="text-xs text-red-500 leading-snug">
                <span className="font-semibold">Size {selectedSize} is currently out of stock.</span>{' '}
                You can still place an interest request and we&apos;ll notify you when it&apos;s back!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {renderSizeGuide()}
    </div>
  );
};

export default SizeSelector;
