import React from 'react';
import Link from 'next/link';
import { Plus, Package, Users, ShoppingCart } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-beige-dark pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-dark">Admin Dashboard</h1>
          <p className="text-text-light mt-1">Manage your store, products, and orders.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-pink hover:bg-pink-dark text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-md hover:shadow-lg"
        >
          <Plus size={20} />
          Add New Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-beige p-6 rounded-2xl flex items-center gap-4">
          <div className="p-4 bg-white rounded-xl shadow-sm text-pink">
            <Package size={24} />
          </div>
          <div>
            <p className="text-text-light text-sm font-medium">Total Products</p>
            <h3 className="text-2xl font-bold text-text-dark">--</h3>
          </div>
        </div>

        <div className="bg-beige p-6 rounded-2xl flex items-center gap-4">
          <div className="p-4 bg-white rounded-xl shadow-sm text-pink">
            <ShoppingCart size={24} />
          </div>
          <div>
            <p className="text-text-light text-sm font-medium">Total Orders</p>
            <h3 className="text-2xl font-bold text-text-dark">--</h3>
          </div>
        </div>

        <div className="bg-beige p-6 rounded-2xl flex items-center gap-4">
          <div className="p-4 bg-white rounded-xl shadow-sm text-pink">
            <Users size={24} />
          </div>
          <div>
            <p className="text-text-light text-sm font-medium">Total Users</p>
            <h3 className="text-2xl font-bold text-text-dark">--</h3>
          </div>
        </div>
      </div>
      
      {/* Empty State for Products List */}
      <div className="mt-12">
        <h2 className="text-xl font-display font-bold text-text-dark mb-4">Recent Products</h2>
        <div className="bg-white border border-beige-dark rounded-2xl p-12 text-center">
          <Package className="mx-auto h-12 w-12 text-beige-dark mb-4" />
          <h3 className="text-lg font-medium text-text-dark">No products available</h3>
          <p className="text-text-light mt-1 mb-6">Get started by creating a new product.</p>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 border-2 border-pink text-pink hover:bg-pink hover:text-white px-6 py-2 rounded-xl font-medium transition-colors"
          >
            <Plus size={18} />
            Add Product
          </Link>
        </div>
      </div>
    </div>
  );
}
