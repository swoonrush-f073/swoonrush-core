import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config();

import { AppDataSource } from '../src/config/database';
import { User, UserRole } from '../src/entities/User';
import { Product, ProductImages } from '../src/entities/Product';
import { ProductColor } from '../src/entities/ProductColor';

// ─── Seed Data: Products (mapped from frontend constants/products.ts) ───

interface SeedProduct {
  name: string;
  slug: string;
  subTitle?: string;
  description: string;
  price: number;
  currency: string;
  originalPrice?: number;
  offerPercentage?: number;
  images: ProductImages;
  sizes: string[];
  colors: { name: string; hex: string; images?: { front: string; back?: string } }[];
  material: string;
  fit: string;
  featured: boolean;
  inStock: boolean;
  category?: string;
  stock: number;
  tags: string[];
}

const SEED_PRODUCTS: SeedProduct[] = [
  {
    name: 'Lovely Runner Oversized T-Shirt',
    slug: 'lovely-runner-oversized',
    subTitle: '선재야…💛☔️',
    description:
      "Carrying the warmth of a yellow umbrella and a love that crossed time itself. Inspired by the unforgettable moments of Lovely Runner, this tee is made for every fan who still melts hearing 'Sun-jae-ya…'",
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
    material: '220 GSM Premium Cotton',
    fit: 'Unisex Oversized Fit',
    featured: true,
    inStock: true,
    category: 'kdrama-inspired',
    stock: 100,
    tags: ['kdrama', 'lovely-runner', 'oversized', 'cotton'],
  },
  {
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
    material: '220 GSM Premium Cotton',
    fit: 'Unisex Oversized Fit',
    featured: false,
    inStock: true,
    category: 'kdrama-inspired',
    stock: 100,
    tags: ['kdrama', 'tangerines', 'gwan-sik', 'oversized'],
  },
  {
    name: 'Tangerines Oversized T-Shirt',
    slug: 'tangerines-oversized',
    subTitle: "When life gives you tangerines' 🍊✨",
    description:
      "This tee celebrates Gwan-sik and Ae-sun — a story of strong love, unwavering loyalty, and finding happiness even in life's hardest moments. The native title '폭싹 속았수다' printed on the back adds the heart of the series itself.",
    price: 699,
    originalPrice: 799,
    offerPercentage: 12,
    currency: 'INR',
    images: {
      front:
        'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/tangerines/front.jpg',
      back: 'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/tangerines/back.jpg',
      both: 'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/tangerines/both.jpg',
      lifestyle:
        'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/tangerines/lifestyle.jpg',
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Black', hex: '#000000' }],
    material: '240 GSM French Terry',
    fit: 'Unisex Oversized Fit',
    featured: true,
    inStock: true,
    category: 'graphics',
    stock: 100,
    tags: ['kdrama', 'tangerines', 'graphic', 'french-terry'],
  },
  {
    name: 'Masses of Emotion Oversized T-Shirt',
    slug: 'reply-1988-vintage-tee',
    subTitle: 'No One Comes Into Your Life By Mistake',
    description:
      "A tribute to the emotions we carry, hide, and grow through. Inspired by Eun-a's belief that people are not just flesh and blood, but masses of emotions shaped over a lifetime.\n\nThe back print, \"No One Comes Into Your Life By Mistake,\" reflects one of the drama's most comforting messages: every person we meet leaves something behind—a lesson, a memory, a moment of growth, or a reason to keep moving forward. Whether they stay briefly or forever, each connection becomes part of who we are.\n\nDesigned for those who feel deeply, love quietly, and keep trying anyway.",
    price: 699,
    originalPrice: 799,
    offerPercentage: 12,
    currency: 'INR',
    images: {
      front:
        'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/masses-of-emotion/front.jpg',
      back: 'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/masses-of-emotion/back.jpg',
      lifestyle:
        'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/masses-of-emotion/lifestyle.jpg',
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cream', hex: '#F7F5F3' },
      { name: 'Navy', hex: '#001f3f' },
    ],
    material: '250 GSM French Terry',
    fit: 'Unisex Oversized Fit',
    featured: true,
    inStock: true,
    category: 'kdrama-inspired',
    stock: 100,
    tags: ['kdrama', 'emotional', 'french-terry', 'oversized'],
  },
  {
    name: 'Star Meets Earth Oversized T-Shirt',
    slug: 'star-meets-earth',
    subTitle: 'Heart That Skips A Beat',
    description:
      "A tribute to the love story that felt like a fairytale—where a shining star met someone from an ordinary world, and together they created something extraordinary.\n\nInspired by ThamePo, this design celebrates a romance that crossed different worlds, proving that love can find its way through fame, distance, and destiny. The back print, \"Heart That Skips A Beat,\" reflects the feeling Thame and Po gave fans with every glance, every moment, and every step of their journey together.\n\nThe front print features Wesley, a symbol of the WilliamEst fandom and the memories, laughter, and emotions shared along the way.\n\nDesigned for those who believe in impossible love stories, cherish every heartbeat, and know that sometimes the most beautiful fairytales begin when a star meets the earth.",
    price: 699,
    originalPrice: 799,
    offerPercentage: 12,
    currency: 'INR',
    images: {
      front:
        'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/star-meets-earth/front.jpg',
      back: 'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/star-meets-earth/back.jpg',
      lifestyle:
        'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/star-meets-earth/lifestyle.jpg',
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Beige', hex: '#F7F5F3' },
      { name: 'Gray', hex: '#808080' },
    ],
    material: '250 GSM French Terry',
    fit: 'Unisex Oversized Fit',
    featured: true,
    inStock: true,
    category: 'Thai-Drama-inspired',
    stock: 100,
    tags: ['thai-drama', 'thamepo', 'french-terry', 'oversized'],
  },
  {
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
      both: 'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/tangerines/combo.jpg',
      front:
        'https://raw.githubusercontent.com/swoonrush-f073/swoonrush-core/main/swoonrush-web/public/products/lovely-runner-oversized/front.jpg',
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
    stock: 50,
    tags: ['combo', 'kdrama', 'lovely-runner', 'tangerines', 'cotton'],
  },
];

// ─── Seed Data: Admin User ───

const ADMIN_USER = {
  firstName: 'swoonrush',
  lastName: undefined,
  email: 'swoonrush@gmail.com',
  phone: '+9175920330291',
  password: process.env.ADMIN_PASSWORD || 'admin_password_123',
  role: UserRole.ADMIN,
  isActive: true,
};

// ─── Seed Runner ───

async function seed(): Promise<void> {
  console.log('🌱 Starting seed...\n');

  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected\n');

    const userRepo = AppDataSource.getRepository(User);
    const productRepo = AppDataSource.getRepository(Product);
    const colorRepo = AppDataSource.getRepository(ProductColor);

    // ─── Seed Admin User ───
    console.log('👤 Seeding admin user...');
    const existingAdmin = await userRepo.findOne({
      where: { email: ADMIN_USER.email },
    });

    if (existingAdmin) {
      console.log(`   ⏭️  Admin user already exists: ${ADMIN_USER.email}`);
    } else {
      const admin = userRepo.create(ADMIN_USER);
      await userRepo.save(admin);
      console.log(`   ✅ Admin user created: ${ADMIN_USER.email}`);
    }

    // ─── Seed Products ───
    console.log('\n📦 Seeding products...');
    for (const seedProduct of SEED_PRODUCTS) {
      const existingProduct = await productRepo.findOne({
        where: { slug: seedProduct.slug },
      });

      if (existingProduct) {
        console.log(`   ⏭️  Product already exists: ${seedProduct.name}`);
        continue;
      }

      const { colors: colorData, ...productData } = seedProduct;

      const product = productRepo.create(productData);
      const savedProduct = await productRepo.save(product);

      // Create colors
      for (const color of colorData) {
        const productColor = colorRepo.create({
          ...color,
          productId: savedProduct.id,
        });
        await colorRepo.save(productColor);
      }

      console.log(`   ✅ Created: ${seedProduct.name}`);
    }

    console.log('\n🎉 Seed completed successfully!\n');

    // Print summary
    const userCount = await userRepo.count();
    const productCount = await productRepo.count();
    const colorCount = await colorRepo.count();
    console.log(`📊 Summary:`);
    console.log(`   Users:    ${userCount}`);
    console.log(`   Products: ${productCount}`);
    console.log(`   Colors:   ${colorCount}`);
    console.log('');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
    process.exit(0);
  }
}

seed();
