import { Product } from '@/constants/products';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

/**
 * Fetch all products from the backend.
 * Pass `params` to filter (e.g. { featured: 'true', category: 'kdrama-inspired' }).
 * Uses Next.js fetch with ISR revalidation every 60 seconds.
 */
export async function getProducts(
  params?: Record<string, string>,
): Promise<Product[]> {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  const res = await fetch(`${API_URL}/products${query}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * Fetch a single product by its slug.
 * Returns null if the product is not found (404).
 */
export async function getProduct(slug: string): Promise<Product | null> {
  const res = await fetch(`${API_URL}/products/${slug}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error(`Failed to fetch product '${slug}': ${res.status} ${res.statusText}`);
  }

  return res.json();
}
