'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User as UserIcon, Phone, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/utils/apiClient';

export default function AuthModals() {
  const { isAuthModalOpen, closeAuthModal, authModalView, openAuthModal, login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const isLogin = authModalView === 'login';

  const resetState = () => {
    setError('');
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setPhone('');
  };

  const handleClose = () => {
    closeAuthModal();
    setTimeout(resetState, 300); // Reset after animation
  };

  const toggleView = () => {
    resetState();
    openAuthModal(isLogin ? 'signup' : 'login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        const data = await apiClient.post<{ data: { accessToken: string; refreshToken: string; user: any } }>('/auth/login', {
          email,
          password,
        });
        login(data.data.accessToken, data.data.refreshToken, data.data.user);
        resetState();
      } else {
        const data = await apiClient.post<{ data: { accessToken: string; refreshToken: string; user: any } }>('/auth/register', {
          firstName,
          lastName,
          email,
          phone,
          password,
        });
        login(data.data.accessToken, data.data.refreshToken, data.data.user);
        resetState();
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden z-10 border border-beige-dark"
          >
            <div className="flex justify-between items-center p-6 border-b border-beige-dark/50">
              <h2 className="font-display text-2xl font-bold text-text-dark">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <button
                onClick={handleClose}
                className="p-2 text-text-light hover:text-text-dark hover:bg-beige rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {error && (
                <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 flex items-center">
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-4">
                {!isLogin && (
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-text-dark mb-1">First Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-light">
                          <UserIcon size={18} />
                        </div>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full pl-10 pr-3 py-2.5 bg-beige/30 border border-beige-dark rounded-xl focus:ring-2 focus:ring-pink/50 focus:border-pink outline-none transition-all text-sm"
                          placeholder="Sun-jae"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-text-dark mb-1">Last Name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3 py-2.5 bg-beige/30 border border-beige-dark rounded-xl focus:ring-2 focus:ring-pink/50 focus:border-pink outline-none transition-all text-sm"
                        placeholder="Ryu"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-light">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-beige/30 border border-beige-dark rounded-xl focus:ring-2 focus:ring-pink/50 focus:border-pink outline-none transition-all text-sm"
                      placeholder="hello@swoonrush.com"
                    />
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">Phone (Optional)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-light">
                        <Phone size={18} />
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 bg-beige/30 border border-beige-dark rounded-xl focus:ring-2 focus:ring-pink/50 focus:border-pink outline-none transition-all text-sm"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-light">
                      <Lock size={18} />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-beige/30 border border-beige-dark rounded-xl focus:ring-2 focus:ring-pink/50 focus:border-pink outline-none transition-all text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-8 bg-pink hover:bg-pink-dark text-white font-medium py-3 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading && <Loader2 size={18} className="animate-spin" />}
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="px-6 py-4 bg-beige/20 border-t border-beige-dark/50 text-center">
              <p className="text-sm text-text-light">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={toggleView}
                  className="font-semibold text-pink hover:text-pink-dark transition-colors"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
