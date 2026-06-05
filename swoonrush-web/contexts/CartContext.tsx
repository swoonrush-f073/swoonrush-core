'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { apiClient } from '@/utils/apiClient';

export interface CartItem {
  id: string; // uuid for local, or db id for remote
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color?: string;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  totalAmount: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load local cart initially
  useEffect(() => {
    const saved = localStorage.getItem('swoonrush_cart');
    if (saved && !isAuthenticated) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {}
    }
  }, [isAuthenticated]);

  // Sync with backend when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const fetchBackendCart = async () => {
        setIsLoading(true);
        try {
          const res = await apiClient.get<{ data: any }>('/cart', { requireAuth: true });
          const backendItems = res.data.items.map((i: any) => ({
            id: i.id,
            productId: i.productId,
            name: i.productSnapshot.name,
            price: Number(i.productSnapshot.price),
            quantity: i.quantity,
            size: i.size,
            color: i.color,
            image: i.productSnapshot.image,
          }));
          setItems(backendItems);
          
          // Optionally sync local items to backend here
        } catch (e) {
          console.error('Failed to load cart', e);
        } finally {
          setIsLoading(false);
        }
      };
      fetchBackendCart();
    }
  }, [isAuthenticated]);

  // Save local cart on change if unauthenticated
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('swoonrush_cart', JSON.stringify(items));
    }
  }, [items, isAuthenticated]);

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addItem = async (newItem: Omit<CartItem, 'id'>) => {
    if (isAuthenticated) {
      setIsLoading(true);
      try {
        await apiClient.post('/cart/add', {
          productId: newItem.productId,
          quantity: newItem.quantity,
          size: newItem.size,
          color: newItem.color,
        }, { requireAuth: true });
        
        // Refresh cart
        const res = await apiClient.get<{ data: any }>('/cart', { requireAuth: true });
        const backendItems = res.data.items.map((i: any) => ({
          id: i.id,
          productId: i.productId,
          name: i.productSnapshot.name,
          price: Number(i.productSnapshot.price),
          quantity: i.quantity,
          size: i.size,
          color: i.color,
          image: i.productSnapshot.image,
        }));
        setItems(backendItems);
        setIsCartOpen(true);
      } catch (e) {
        console.error('Failed to add to cart', e);
      } finally {
        setIsLoading(false);
      }
    } else {
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.productId === newItem.productId && i.size === newItem.size && i.color === newItem.color
        );
        if (existing) {
          return prev.map((i) =>
            i.id === existing.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
          );
        }
        return [...prev, { ...newItem, id: Math.random().toString(36).substr(2, 9) }];
      });
      setIsCartOpen(true);
    }
  };

  const removeItem = async (id: string) => {
    if (isAuthenticated) {
      try {
        await apiClient.delete(`/cart/item/${id}`, { requireAuth: true });
        setItems((prev) => prev.filter((i) => i.id !== id));
      } catch (e) {
        console.error('Failed to remove item', e);
      }
    } else {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    if (isAuthenticated) {
      try {
        await apiClient.put('/cart/update', { itemId: id, quantity }, { requireAuth: true });
        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
      } catch (e) {
        console.error('Failed to update quantity', e);
      }
    } else {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        await apiClient.delete('/cart/clear', { requireAuth: true });
        setItems([]);
      } catch (e) {
        console.error('Failed to clear cart', e);
      }
    } else {
      setItems([]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        totalAmount,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
