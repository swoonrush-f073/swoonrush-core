import { Product, PRODUCTS } from '@/constants';
import { apiClient } from './apiClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

/**
 * Helper to fetch a product by slug, falling back to static mock data if backend fails.
 * Designed to work in both Server and Client environments.
 */
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/slug/${slug}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const json = await res.json();
      if (json.data) {
        // Map backend product to frontend Product interface if needed
        // Assuming backend returns matching structure (which it should per instructions)
        return json.data as Product;
      }
    }
  } catch (e) {
    console.warn(`[API Fallback] Backend failed to fetch product ${slug}, using static data.`, e);
  }
  
  // Fallback
  return PRODUCTS.find((p) => p.slug === slug);
}

/**
 * Helper to fetch all products, falling back to static mock data.
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products?limit=100`, { next: { revalidate: 60 } });
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.products) {
        return json.data.products as Product[];
      }
    }
  } catch (e) {
    console.warn(`[API Fallback] Backend failed to fetch products, using static data.`, e);
  }
  
  // Fallback
  return PRODUCTS;
}
