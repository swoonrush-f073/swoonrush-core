'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ChevronLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice } from '@/utils/formatPrice';
import { apiClient } from '@/utils/apiClient';

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, updateQuantity, removeItem, totalAmount, clearCart } = useCart();
  const { isAuthenticated, openAuthModal } = useAuth();
  
  const [view, setView] = useState<'cart' | 'address'>('cart');
  const [isProcessing, setIsProcessing] = useState(false);
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isCartOpen) {
      setTimeout(() => {
        setView('cart');
        setFormErrors({});
      }, 300);
    }
  }, [isCartOpen]);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      closeCart();
      openAuthModal('login');
    } else {
      setView('address');
    }
  };

  const validateAddress = () => {
    const errors: Record<string, string> = {};
    if (!address.fullName.trim()) errors.fullName = 'Required';
    if (!address.phone.trim() || !/^\d{10}$/.test(address.phone)) errors.phone = 'Valid 10-digit number required';
    if (!address.addressLine1.trim()) errors.addressLine1 = 'Required';
    if (!address.city.trim()) errors.city = 'Required';
    if (!address.state.trim()) errors.state = 'Required';
    if (!/^\d{6}$/.test(address.pincode)) errors.pincode = 'Valid 6-digit Pincode required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAddress()) return;

    setIsProcessing(true);
    try {
      const isLoaded = await loadRazorpay();
      if (!isLoaded) throw new Error('Failed to load Razorpay SDK');

      // 1. Create order on backend
      const orderRes = await apiClient.post<{ data: { id: string } }>(
        '/orders',
        { shippingAddress: address },
        { requireAuth: true }
      );
      const orderId = orderRes.data.id;

      // 2. Create Razorpay payment order
      const paymentRes = await apiClient.post<{ data: any }>(
        '/payments/create-order',
        { orderId },
        { requireAuth: true }
      );
      
      const { razorpayOrderId, amount, currency, keyId } = paymentRes.data;

      // 3. Initialize Razorpay
      const options = {
        key: keyId,
        amount,
        currency,
        name: 'SwoonRush',
        description: 'Order Payment',
        order_id: razorpayOrderId,
        handler: async (response: any) => {
          try {
            await apiClient.post(
              '/payments/verify',
              {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                orderId,
              },
              { requireAuth: true }
            );
            await clearCart();
            closeCart();
            window.location.href = '/profile'; // Navigate to profile screen
          } catch (error: any) {
            alert('Payment verification failed: ' + error.message);
          }
        },
        prefill: {
          name: address.fullName,
          contact: address.phone,
        },
        theme: {
          color: '#f9a8d4', // tailwind pink-300 to match theme
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        alert('Payment failed: ' + response.error.description);
      });
      rzp.open();
    } catch (error: any) {
      alert(error.message || 'Something went wrong during checkout');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
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
                {view === 'address' ? (
                  <button onClick={() => setView('cart')} className="p-1 -ml-1 text-text-light hover:text-text-dark transition-colors rounded-full hover:bg-beige">
                    <ChevronLeft size={24} />
                  </button>
                ) : (
                  <ShoppingBag className="text-pink" />
                )}
                <h2 className="font-display text-xl font-bold text-text-dark">
                  {view === 'cart' ? 'Your Cart' : 'Shipping Address'}
                </h2>
                {view === 'cart' && (
                  <span className="bg-beige text-text-dark text-xs font-bold px-2 py-1 rounded-full">
                    {items.length}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-text-light hover:text-text-dark hover:bg-beige rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {view === 'cart' ? (
                items.length === 0 ? (
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
                )
              ) : (
                <form id="shipping-form" onSubmit={handlePayment} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-light mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={address.fullName}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-xl border ${formErrors.fullName ? 'border-red-500' : 'border-beige-dark'} bg-white text-text-dark outline-none focus:border-pink transition-colors`}
                      placeholder="Jane Doe"
                    />
                    {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-light mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={address.phone}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-xl border ${formErrors.phone ? 'border-red-500' : 'border-beige-dark'} bg-white text-text-dark outline-none focus:border-pink transition-colors`}
                      placeholder="9876543210"
                    />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-light mb-1">Address Line 1</label>
                    <input
                      type="text"
                      name="addressLine1"
                      value={address.addressLine1}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-xl border ${formErrors.addressLine1 ? 'border-red-500' : 'border-beige-dark'} bg-white text-text-dark outline-none focus:border-pink transition-colors`}
                      placeholder="House No, Street Name"
                    />
                    {formErrors.addressLine1 && <p className="text-red-500 text-xs mt-1">{formErrors.addressLine1}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-light mb-1">Address Line 2 (Optional)</label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={address.addressLine2}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-beige-dark bg-white text-text-dark outline-none focus:border-pink transition-colors"
                      placeholder="Landmark, Locality"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-light mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-xl border ${formErrors.city ? 'border-red-500' : 'border-beige-dark'} bg-white text-text-dark outline-none focus:border-pink transition-colors`}
                        placeholder="Mumbai"
                      />
                      {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-light mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        value={address.state}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-xl border ${formErrors.state ? 'border-red-500' : 'border-beige-dark'} bg-white text-text-dark outline-none focus:border-pink transition-colors`}
                        placeholder="Maharashtra"
                      />
                      {formErrors.state && <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-light mb-1">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={address.pincode}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-xl border ${formErrors.pincode ? 'border-red-500' : 'border-beige-dark'} bg-white text-text-dark outline-none focus:border-pink transition-colors`}
                      placeholder="400001"
                      maxLength={6}
                    />
                    {formErrors.pincode && <p className="text-red-500 text-xs mt-1">{formErrors.pincode}</p>}
                  </div>
                </form>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-beige/10 border-t border-beige-dark/50">
                {view === 'cart' ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-text-dark text-lg">Total to Pay:</span>
                      <span className="font-bold text-text-dark font-price text-2xl">
                        {formatPrice(totalAmount, 'INR')}
                      </span>
                    </div>
                    <button
                      type="submit"
                      form="shipping-form"
                      disabled={isProcessing}
                      className="w-full bg-pink hover:bg-pink-dark disabled:bg-pink-dark/50 text-white font-semibold py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      {isProcessing ? 'Processing...' : 'Pay with Razorpay'}
                    </button>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

