'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, ChevronRight, AlertCircle, RefreshCcw, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/utils/apiClient';
import { formatPrice } from '@/utils/formatPrice';

export default function ProfilePage() {
  const { isAuthenticated, user, logout, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = '/';
    }
  }, [isAuthenticated, authLoading]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) return;
      try {
        const response = await apiClient.get<{ data: any[] }>('/orders', { requireAuth: true });
        setOrders(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch orders');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex justify-center items-center">
        <RefreshCcw className="animate-spin text-pink" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center text-center">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-text-dark mb-2">Oops!</h2>
        <p className="text-text-light">{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 lg:px-12 bg-white">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Profile Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <UserCircle className="text-pink" size={36} />
              <h1 className="font-display text-3xl font-bold text-text-dark">My Profile</h1>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
          
          <div className="bg-beige/30 border border-beige-dark rounded-3xl p-8 flex items-center gap-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-pink shadow-sm">
              {user?.firstName?.charAt(0) || 'U'}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-dark mb-1">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-text-light">{user?.email}</p>
              {user?.role === 'admin' && (
                <span className="inline-block mt-2 px-3 py-1 bg-pink/10 text-pink text-xs font-bold uppercase rounded-full tracking-wider">
                  Admin
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Orders Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Package className="text-pink" size={24} />
            <h2 className="font-display text-2xl font-bold text-text-dark">Order History</h2>
          </div>

          {orders.length === 0 ? (
            <div className="bg-beige/20 border border-beige-dark/50 rounded-3xl p-12 text-center flex flex-col items-center">
              <Package size={48} className="text-text-light mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-text-dark mb-2">No orders yet</h3>
              <p className="text-text-light mb-6">Looks like you haven't made your first purchase.</p>
              <Link 
                href="/shop"
                className="px-8 py-3 bg-pink text-white font-medium rounded-xl hover:bg-pink-dark transition-colors shadow-md"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {orders.map((order) => (
                <Link 
                  href={`/orders/details?id=${order.id}`} 
                  key={order.id}
                  className="group block bg-white border border-beige-dark hover:border-pink rounded-3xl p-6 transition-all hover:shadow-lg"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg text-text-dark">{order.orderNumber}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          order.orderStatus === 'delivered' ? 'bg-green-100 text-green-700' :
                          order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-700' :
                          'bg-pink/10 text-pink'
                        }`}>
                          {order.orderStatus}
                        </span>
                      </div>
                      <p className="text-sm text-text-light mb-4">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </p>
                      
                      {/* Item Thumbnails */}
                      <div className="flex items-center gap-2">
                        {order.items?.slice(0, 4).map((item: any, idx: number) => (
                          <div key={idx} className="w-12 h-12 rounded-lg bg-beige border border-beige-dark overflow-hidden shrink-0">
                            <img src={item.productSnapshot?.image} alt={item.productSnapshot?.name} className="w-full h-full object-cover" />
                          </div>
                        ))}
                        {order.items?.length > 4 && (
                          <div className="w-12 h-12 rounded-lg bg-beige border border-beige-dark flex items-center justify-center text-xs font-semibold text-text-light">
                            +{order.items.length - 4}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Pricing and Arrow */}
                    <div className="flex items-center gap-6 w-full md:w-auto border-t border-beige-dark md:border-none pt-4 md:pt-0">
                      <div className="flex-1 md:text-right">
                        <p className="text-xs text-text-light uppercase tracking-wider mb-1">Total</p>
                        <p className="font-price font-bold text-xl text-text-dark">
                          {formatPrice(order.totalAmount, 'INR')}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-beige/50 group-hover:bg-pink/10 flex items-center justify-center transition-colors">
                        <ChevronRight className="text-text-light group-hover:text-pink transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
