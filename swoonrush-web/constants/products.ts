export type SizeKey = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

/**
 * Maps each available size to its stock status.
 * true  = in stock
 * false = out of stock
 */
export type SizeMap = Partial<Record<SizeKey, boolean>>;

export interface Product {
  id: string;
  name: string;
  slug: string;
  subTitle?: string;
  description: string;
  price: number;
  currency: string;
  originalPrice?: number;
  offerPercentage?: number;
  isOldSizeChart?: boolean;
  sizeChartImage?: string;
  images: {
    both?: string | null;
    front: string;
    back?: string | null;
    detail?: string | null;
    lifestyle?: string | null;
  };
  sizes: SizeMap;
  colors: {
    name: string;
    hex: string;
    images?: {
      front: string;
      back?: string;
    } | null;
  }[];
  material: string;
  fit: string;
  featured: boolean;
  inStock: boolean;
  category?: string;
}
