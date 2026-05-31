'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice } from '@/utils/formatPrice';

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, updateQuantity, removeItem, totalAmount } = useCart();
  const { isAuthenticated, openAuthModal } = useAuth();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      closeCart();
      openAuthModal('login');
    } else {
      // Proceed to checkout page or Razorpay
      alert('Checkout process starting...'); // Placeholder for checkout flow
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col border-l border-beige-dark"
          >
            <div className="flex items-center justify-between p-6 border-b border-beige-dark/50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-pink" />
                <h2 className="font-display text-xl font-bold text-text-dark">Your Cart</h2>
                <span className="bg-beige text-text-dark text-xs font-bold px-2 py-1 rounded-full">
                  {items.length}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-text-light hover:text-text-dark hover:bg-beige rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-text-light">
                  <ShoppingBag size={48} className="mb-4 opacity-20" />
                  <p className="font-medium text-lg text-text-dark mb-2">Your cart is empty</p>
                  <p className="text-sm">Looks like you haven't added anything yet.</p>
                  <button
                    onClick={closeCart}
                    className="mt-6 px-6 py-2 border border-pink text-pink rounded-full font-medium hover:bg-pink hover:text-white transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-beige shrink-0 border border-beige-dark relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-text-dark text-sm leading-tight pr-4">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-text-light hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-text-light mt-1 uppercase tracking-wider">
                            Size: {item.size} {item.color ? `| Color: ${item.color}` : ''}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-text-dark font-price">
                            {formatPrice(item.price, 'INR')}
                          </span>
                          <div className="flex items-center bg-beige/50 rounded-lg border border-beige-dark/50">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 text-text-dark hover:text-pink transition-colors disabled:opacity-50"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold text-text-dark">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 text-text-dark hover:text-pink transition-colors disabled:opacity-50"
                              disabled={item.quantity >= 10}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-beige/10 border-t border-beige-dark/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-light">Subtotal</span>
                  <span className="font-bold text-text-dark font-price text-lg">
                    {formatPrice(totalAmount, 'INR')}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-6 text-sm">
                  <span className="text-text-light">Shipping</span>
                  <span className="text-pink font-medium">Free</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-pink hover:bg-pink-dark text-white font-semibold py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Checkout {formatPrice(totalAmount, 'INR')}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
