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
  images: {
    both?: string;
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
    subTitle: '선재야…💛☔️',
    description:
      'Carrying the warmth of a yellow umbrella and a love that crossed time itself. Inspired by the unforgettable moments of Lovely Runner, this tee is made for every fan who still melts hearing ‘Sun-jae-ya…’',
    price: 649,
    originalPrice: 749,
    offerPercentage: 13,
    currency: 'INR',
    images: {
      front:
        'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/lovely-runner-oversized/front.jpg',
      back: 'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/lovely-runner-oversized/back.jpg',
      lifestyle:
        'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/lovely-runner-oversized/lifestyle.jpg',
    },
    sizes: ['S', 'M', 'L', 'XL'],
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
    price: 777,
    originalPrice: 777,
    offerPercentage: 0,
    currency: 'INR',
    images: {
      front:
        'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/team-gwan-sik-oversized/front.jpg',
      back: 'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/team-gwan-sik-oversized/back.jpg',
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Beige', hex: '#F7F5F3' },
    ],
    material: '100% Premium Cotton',
    fit: 'Unisex Oversized Fit',
    featured: false,
    inStock: true,
    category: 'kdrama-inspired',
  },
  {
    id: '3',
    name: 'Tangerines Oversized T-Shirt',
    slug: 'tangerines-oversized',
    subTitle: 'When life gives you tangerines’ 🍊✨',
    description:
      'This tee celebrates Gwan-sik and Ae-sun — a story of strong love, unwavering loyalty, and finding happiness even in life’s hardest moments. The native title ‘폭싹 속았수다’ printed on the back adds the heart of the series itself.',
    price: 699,
    originalPrice: 799,
    offerPercentage: 12,
    currency: 'INR',
    images: {
      front:
        'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/tangerines/front.jpg',
      back: 'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/tangerines/back.jpg',
      both: 'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/tangerines/both.jpg',
      lifestyle: 'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/tangerines/lifestyle.jpg',
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Black', hex: '#000000' }],
    material: '100% Premium Cotton',
    fit: 'Unisex Oversized Fit',
    featured: true,
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
  {
    id: '6',
    name: 'Ultimate Fan Combo: Lovely Runner & Tangerines',
    slug: 'ultimate-fan-combo',
    subTitle: '2 Must-Have Drama Tees! 💛🍊',
    description:
      "Can't decide? Get both! Grab the iconic Lovely Runner 'Sun-jae-ya…' tee and the bold Tangerines '폭싹 속았수다' graphic tee in this exclusive combo offer. A match made for the ultimate Drama fan.",
    price: 1199,
    originalPrice: 1548,
    offerPercentage: 22,
    currency: 'INR',
    images: {
      both:
        'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/tangerines/combo.jpg',
      front: 'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/lovely-runner-oversized/front.jpg',
      back: 'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/tangerines/back.jpg',
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Soft Pink (Lovely)', hex: '#E89CA9' },
      { name: 'Black (Tangerines)', hex: '#000000' },
    ],
    material: '100% Premium Cotton',
    fit: 'Unisex Oversized Fit',
    featured: true,
    inStock: true,
    category: 'combos',
  },
];
