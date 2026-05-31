'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { apiClient } from '@/utils/apiClient';

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    subTitle: '',
    description: '',
    price: '',
    originalPrice: '',
    offerPercentage: '',
    category: '',
    material: '',
    fit: '',
    stock: '',
    featured: false,
    inStock: true,
  });

  const [images, setImages] = useState({
    front: '',
    back: '',
    both: '',
    lifestyle: '',
  });

  const [sizes, setSizes] = useState<string[]>([]);
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const [colors, setColors] = useState<{ name: string; hex: string }[]>([
    { name: '', hex: '#000000' }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages({ ...images, [e.target.name]: e.target.value });
  };

  const toggleSize = (size: string) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const handleColorChange = (index: number, field: 'name' | 'hex', value: string) => {
    const newColors = [...colors];
    newColors[index][field] = value;
    setColors(newColors);
  };

  const addColor = () => setColors([...colors, { name: '', hex: '#000000' }]);
  
  const removeColor = (index: number) => {
    if (colors.length > 1) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Prepare payload
      const payload = {
        name: formData.name,
        slug: formData.slug,
        subTitle: formData.subTitle || undefined,
        description: formData.description,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        offerPercentage: formData.offerPercentage ? Number(formData.offerPercentage) : undefined,
        category: formData.category || undefined,
        material: formData.material,
        fit: formData.fit,
        stock: Number(formData.stock),
        featured: formData.featured,
        inStock: formData.inStock,
        sizes: sizes,
        colors: colors.filter(c => c.name.trim() !== ''),
        images: {
          front: images.front,
          ...(images.back ? { back: images.back } : {}),
          ...(images.both ? { both: images.both } : {}),
          ...(images.lifestyle ? { lifestyle: images.lifestyle } : {}),
        }
      };

      if (!payload.images.front) {
        throw new Error('Front image is required');
      }

      if (payload.sizes.length === 0) {
        throw new Error('At least one size is required');
      }

      await apiClient.post('/products', payload, { requireAuth: true });
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8 border-b border-beige-dark pb-6">
        <Link
          href="/admin"
          className="p-2 hover:bg-beige rounded-full transition-colors"
          aria-label="Back to Admin"
        >
          <ArrowLeft size={24} className="text-text-dark" />
        </Link>
        <div>
          <h1 className="text-3xl font-display font-bold text-text-dark">Add New Product</h1>
          <p className="text-text-light mt-1">Fill in the details to list a new item.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        {/* Basic Info */}
        <div className="bg-beige p-6 rounded-2xl space-y-6">
          <h2 className="text-xl font-display font-bold text-text-dark border-b border-beige-dark pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Product Name *</label>
              <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:outline-none focus:border-pink bg-white" placeholder="e.g. Lovely Runner Oversized T-Shirt" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Slug (URL-friendly name) *</label>
              <input required type="text" name="slug" value={formData.slug} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:outline-none focus:border-pink bg-white" placeholder="e.g. lovely-runner-oversized" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-dark mb-2">Subtitle (Optional)</label>
              <input type="text" name="subTitle" value={formData.subTitle} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:outline-none focus:border-pink bg-white" placeholder="e.g. 선재야…💛☔️" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-dark mb-2">Description *</label>
              <textarea required name="description" value={formData.description} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:outline-none focus:border-pink bg-white" placeholder="Product description..."></textarea>
            </div>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="bg-beige p-6 rounded-2xl space-y-6">
          <h2 className="text-xl font-display font-bold text-text-dark border-b border-beige-dark pb-2">Pricing & Inventory</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Selling Price (INR) *</label>
              <input required type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:outline-none focus:border-pink bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Original Price (INR)</label>
              <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:outline-none focus:border-pink bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Initial Stock *</label>
              <input required type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:outline-none focus:border-pink bg-white" />
            </div>
            <div className="md:col-span-3 flex items-center gap-8 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleInputChange} className="w-5 h-5 accent-pink rounded cursor-pointer" />
                <span className="text-sm font-medium text-text-dark">Featured Product</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleInputChange} className="w-5 h-5 accent-pink rounded cursor-pointer" />
                <span className="text-sm font-medium text-text-dark">In Stock Status Active</span>
              </label>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-beige p-6 rounded-2xl space-y-6">
          <h2 className="text-xl font-display font-bold text-text-dark border-b border-beige-dark pb-2">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Material *</label>
              <input required type="text" name="material" value={formData.material} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:outline-none focus:border-pink bg-white" placeholder="e.g. 220 GSM Premium Cotton" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Fit *</label>
              <input required type="text" name="fit" value={formData.fit} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:outline-none focus:border-pink bg-white" placeholder="e.g. Unisex Oversized Fit" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-dark mb-2">Category</label>
              <input type="text" name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:outline-none focus:border-pink bg-white" placeholder="e.g. kdrama-inspired" />
            </div>

            {/* Sizes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-dark mb-3">Available Sizes *</label>
              <div className="flex flex-wrap gap-3">
                {availableSizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`w-12 h-12 rounded-xl font-medium transition-all ${
                      sizes.includes(size)
                        ? 'bg-text-dark text-white shadow-md border-2 border-text-dark'
                        : 'bg-white text-text-dark border-2 border-beige-dark hover:border-pink'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-dark mb-3">Colors *</label>
              <div className="space-y-3">
                {colors.map((color, index) => (
                  <div key={index} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-beige-dark">
                    <input
                      type="text"
                      required
                      placeholder="Color Name (e.g. Navy Blue)"
                      value={color.name}
                      onChange={(e) => handleColorChange(index, 'name', e.target.value)}
                      className="flex-1 px-3 py-2 border-b border-beige-dark focus:outline-none focus:border-pink"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={color.hex}
                        onChange={(e) => handleColorChange(index, 'hex', e.target.value)}
                        className="w-10 h-10 p-1 rounded cursor-pointer"
                      />
                      <span className="text-sm font-mono text-text-light w-20">{color.hex}</span>
                    </div>
                    {colors.length > 1 && (
                      <button type="button" onClick={() => removeColor(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addColor}
                  className="flex items-center gap-2 text-sm font-medium text-pink hover:text-pink-dark mt-2"
                >
                  <Plus size={16} /> Add another color
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-beige p-6 rounded-2xl space-y-6">
          <h2 className="text-xl font-display font-bold text-text-dark border-b border-beige-dark pb-2">Images (URLs)</h2>
          <p className="text-sm text-text-light mb-4">Paste the direct image URLs below. Front image is required.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Front Image URL *</label>
              <input required type="url" name="front" value={images.front} onChange={handleImageChange} className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:outline-none focus:border-pink bg-white" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Back Image URL</label>
              <input type="url" name="back" value={images.back} onChange={handleImageChange} className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:outline-none focus:border-pink bg-white" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Both (Combo) Image URL</label>
              <input type="url" name="both" value={images.both} onChange={handleImageChange} className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:outline-none focus:border-pink bg-white" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Lifestyle Image URL</label>
              <input type="url" name="lifestyle" value={images.lifestyle} onChange={handleImageChange} className="w-full px-4 py-3 rounded-xl border border-beige-dark focus:outline-none focus:border-pink bg-white" placeholder="https://..." />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Link
            href="/admin"
            className="px-8 py-4 rounded-xl font-medium border-2 border-beige-dark text-text-dark hover:border-pink transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all shadow-md ${
              isSubmitting 
                ? 'bg-beige-dark text-text-light cursor-not-allowed'
                : 'bg-text-dark hover:bg-black text-white hover:shadow-lg hover:-translate-y-0.5'
            }`}
          >
            <Save size={20} />
            {isSubmitting ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
