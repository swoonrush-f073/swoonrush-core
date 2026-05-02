export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  originalPrice?: number;
  offerPercentage?: number;
  images: {
    front: string;
    back?: string;
    detail?: string;
    lifestyle?: string;
  };
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[];
  colors: {
    name: string;
    hex: string;
    images?: {
      front: string;
      back?: string;
    };
  }[];
  material: string;
  fit: string;
  featured: boolean;
  inStock: boolean;
  category?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Lovely Runner Oversized T-Shirt',
    slug: 'lovely-runner-oversized',
    description:
      'Inspired by epic love stories. Soft, comfortable, and perfect for binge-watching your favorite series.',
    price: 599,
    originalPrice: 666,
    offerPercentage: 10,
    currency: 'INR',
    images: {
      front:
        'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/lovely-runner-oversized/front.jpg',
      back: 'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/lovely-runner-oversized/back.jpg',
    },
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Soft Pink', hex: '#E89CA9' },
      { name: 'Cream', hex: '#F7F5F3' },
    ],
    material: '100% Premium Cotton',
    fit: 'Unisex Oversized Fit',
    featured: true,
    inStock: true,
    category: 'kdrama-inspired',
  },
  {
    id: '2',
    name: 'Team Gwan-sik Oversized T-Shirt',
    slug: 'team-gwan-sik-oversized',
    description:
      "Stay cozy like you're wrapped in a Drama moment. Premium fleece with aesthetic graphics.",
    price: 666,
    originalPrice: 666,
    offerPercentage: 0,
    currency: 'INR',
    images: {
      front:
        'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/team-gwan-sik-oversized/front.jpg',
      back: 'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/team-gwan-sik-oversized/back.jpg',
    },
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Beige', hex: '#F7F5F3' },
    ],
    material: '100% Premium Cotton',
    fit: 'Unisex Oversized Fit',
    featured: true,
    inStock: true,
    category: 'kdrama-inspired',
  },
  {
    id: '3',
    name: 'Itaewon Street Style Tee',
    slug: 'itaewon-street-style-tee',
    description:
      'Bold street style graphic tee inspired by the neon lights of Seoul nights.',
    price: 36.99,
    originalPrice: 49.99,
    offerPercentage: 26,
    currency: 'USD',
    images: {
      front:
        'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/itaewon-tee/front.jpg',
      back: 'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/itaewon-tee/back.jpg',
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Black', hex: '#000000' }],
    material: '100% Premium Cotton',
    fit: 'Unisex Oversized Fit',
    featured: false,
    inStock: true,
    category: 'graphics',
  },
  {
    id: '4',
    name: 'Reply 1988 Vintage Tee',
    slug: 'reply-1988-vintage-tee',
    description:
      'A nostalgic retro vibe for the classic Drama fans. Features a faded vintage print.',
    price: 32.99,
    originalPrice: 39.99,
    offerPercentage: 17,
    currency: 'USD',
    images: {
      front:
        'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/reply-tee/front.jpg',
      back: 'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/reply-tee/back.jpg',
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cream', hex: '#F7F5F3' },
      { name: 'Navy', hex: '#001f3f' },
    ],
    material: '100% Organic Cotton',
    fit: 'Relaxed Fit',
    featured: false,
    inStock: true,
    category: 'basics',
  },
  {
    id: '5',
    name: 'Start-Up Minimalist Hoodie',
    slug: 'start-up-minimalist-hoodie',
    description:
      'Clean, simple, and ready for your next big idea. A minimalist essential.',
    price: 44.99,
    originalPrice: 59.99,
    offerPercentage: 25,
    currency: 'USD',
    images: {
      front:
        'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/startup-hoodie/front.jpg',
      back: 'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/startup-hoodie/back.jpg',
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Beige', hex: '#F7F5F3' },
      { name: 'Gray', hex: '#808080' },
    ],
    material: '80% Cotton, 20% Polyester',
    fit: 'Regular Fit',
    featured: false,
    inStock: true,
    category: 'patterns',
  },
];
