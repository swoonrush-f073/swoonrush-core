'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Package, ChevronLeft, MapPin, AlertCircle, RefreshCcw, CreditCard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/utils/apiClient';
import { formatPrice } from '@/utils/formatPrice';

function OrderDetailsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = '/';
    }
  }, [isAuthenticated, authLoading]);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!isAuthenticated || !id) return;
      try {
        const response = await apiClient.get<{ data: any }>(`/orders/${id}`, { requireAuth: true });
        setOrder(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch order details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrder();
  }, [id, isAuthenticated]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex justify-center items-center">
        <RefreshCcw className="animate-spin text-pink" size={32} />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center text-center">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-text-dark mb-2">Oops!</h2>
        <p className="text-text-light mb-6">{error || 'Order not found'}</p>
        <Link href="/profile" className="text-pink hover:underline flex items-center gap-2">
          <ChevronLeft size={16} /> Back to Profile
        </Link>
      </div>
    );
  }

  const { shippingAddress, items } = order;

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 lg:px-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <Link href="/profile" className="inline-flex items-center gap-2 text-text-light hover:text-pink transition-colors mb-6 font-medium text-sm">
          <ChevronLeft size={16} /> Back to My Profile
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-text-dark mb-2">
              Order {order.orderNumber}
            </h1>
            <p className="text-text-light">
              Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${
              order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
            }`}>
              {order.paymentStatus === 'paid' ? 'Paid' : 'Payment Pending'}
            </span>
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${
              order.orderStatus === 'delivered' ? 'bg-green-100 text-green-700' :
              order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-700' :
              'bg-pink/10 text-pink'
            }`}>
              {order.orderStatus}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-beige-dark rounded-3xl p-6">
              <h2 className="text-lg font-bold text-text-dark mb-4 flex items-center gap-2">
                <Package size={20} className="text-pink" /> Items ({items.length})
              </h2>
              
              <div className="divide-y divide-beige-dark">
                {items.map((item: any) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-beige border border-beige-dark shrink-0">
                      <img src={item.productSnapshot?.image} alt={item.productSnapshot?.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-text-dark">{item.productSnapshot?.name}</h3>
                        <p className="text-xs text-text-light uppercase mt-1">
                          Size: {item.size} {item.color ? `| Color: ${item.color}` : ''}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-text-light">Qty: {item.quantity}</span>
                        <span className="font-price font-bold text-text-dark">
                          {formatPrice(item.price * item.quantity, 'INR')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <div className="bg-white border border-beige-dark rounded-3xl p-6">
              <h2 className="text-lg font-bold text-text-dark mb-4 flex items-center gap-2">
                <CreditCard size={20} className="text-pink" /> Payment Summary
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-text-light">
                  <span>Subtotal</span>
                  <span className="font-semibold text-text-dark font-price">{formatPrice(order.subtotal, 'INR')}</span>
                </div>
                <div className="flex justify-between text-text-light">
                  <span>Shipping</span>
                  <span className="font-medium text-pink">{order.shippingCharge === 0 ? 'Free' : formatPrice(order.shippingCharge, 'INR')}</span>
                </div>
                <div className="border-t border-beige-dark pt-3 flex justify-between items-center">
                  <span className="font-bold text-text-dark">Total</span>
                  <span className="font-price font-bold text-xl text-text-dark">{formatPrice(order.totalAmount, 'INR')}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            {shippingAddress && (
              <div className="bg-beige/20 border border-beige-dark rounded-3xl p-6">
                <h2 className="text-lg font-bold text-text-dark mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-pink" /> Shipping Address
                </h2>
                <div className="text-sm text-text-light space-y-1">
                  <p className="font-bold text-text-dark">{shippingAddress.fullName}</p>
                  <p>{shippingAddress.phone}</p>
                  <p className="mt-2">{shippingAddress.addressLine1}</p>
                  {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
                  <p>{shippingAddress.city}, {shippingAddress.state}</p>
                  <p>{shippingAddress.pincode} - {shippingAddress.country}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function OrderDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 pb-20 flex justify-center items-center"><RefreshCcw className="animate-spin text-pink" size={32} /></div>}>
      <OrderDetailsContent />
    </Suspense>
  );
}
