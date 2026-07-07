'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

interface SizeSelectorProps {
  sizes: string[];
  isOldSizeChart?: boolean;
  selectedSize: string;
  onSizeSelect: (size: string) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  isOldSizeChart = false,
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
                    src={isOldSizeChart? "/products/size-chart-01.PNG": "/products/size-chart.PNG"}
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
