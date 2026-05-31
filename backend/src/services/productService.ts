import { Repository, ILike, FindOptionsWhere, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';

import { AppDataSource } from '../config/database';
import { Product, ProductImages } from '../entities/Product';
import { ProductColor } from '../entities/ProductColor';
import { ProductFilterQuery } from '../types';
import { ApiError } from '../utils/ApiError';

export class ProductService {
  private productRepository: Repository<Product>;
  private colorRepository: Repository<ProductColor>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
    this.colorRepository = AppDataSource.getRepository(ProductColor);
  }

  async findAll(
    query: ProductFilterQuery
  ): Promise<{ products: Product[]; total: number; page: number; limit: number }> {
    const page = Math.max(1, parseInt(query.page || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(query.limit || '12', 10)));
    const skip = (page - 1) * limit;

    const where: FindOptionsWhere<Product> = { isActive: true };

    // Search filter
    if (query.search) {
      where.name = ILike(`%${query.search}%`);
    }

    // Category filter
    if (query.category) {
      where.category = query.category;
    }

    // Featured filter
    if (query.featured !== undefined) {
      where.featured = query.featured === 'true';
    }

    // Stock filter
    if (query.inStock !== undefined) {
      where.inStock = query.inStock === 'true';
    }

    // Price range filter
    if (query.minPrice && query.maxPrice) {
      where.price = Between(
        parseFloat(query.minPrice),
        parseFloat(query.maxPrice)
      ) as unknown as number;
    } else if (query.minPrice) {
      where.price = MoreThanOrEqual(
        parseFloat(query.minPrice)
      ) as unknown as number;
    } else if (query.maxPrice) {
      where.price = LessThanOrEqual(
        parseFloat(query.maxPrice)
      ) as unknown as number;
    }

    // Sort
    let order: Record<string, 'ASC' | 'DESC'> = { createdAt: 'DESC' };
    if (query.sort) {
      switch (query.sort) {
        case 'price_asc':
          order = { price: 'ASC' };
          break;
        case 'price_desc':
          order = { price: 'DESC' };
          break;
        case 'newest':
          order = { createdAt: 'DESC' };
          break;
        case 'name_asc':
          order = { name: 'ASC' };
          break;
        case 'name_desc':
          order = { name: 'DESC' };
          break;
      }
    }

    const [products, total] = await this.productRepository.findAndCount({
      where,
      order,
      skip,
      take: limit,
      relations: ['colors'],
    });

    return { products, total, page, limit };
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id, isActive: true },
      relations: ['colors'],
    });

    if (!product) {
      throw ApiError.notFound('Product not found');
    }

    return product;
  }

  async findBySlug(slug: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { slug, isActive: true },
      relations: ['colors'],
    });

    if (!product) {
      throw ApiError.notFound('Product not found');
    }

    return product;
  }

  async create(data: {
    name: string;
    slug: string;
    subTitle?: string;
    description: string;
    price: number;
    currency?: string;
    originalPrice?: number;
    offerPercentage?: number;
    images: ProductImages;
    sizes: string[];
    colors: { name: string; hex: string; images?: { front: string; back?: string } }[];
    material: string;
    fit: string;
    featured?: boolean;
    inStock?: boolean;
    category?: string;
    tags?: string[];
    stock?: number;
  }): Promise<Product> {
    const existing = await this.productRepository.findOne({
      where: { slug: data.slug },
    });

    if (existing) {
      throw ApiError.conflict(`Product with slug '${data.slug}' already exists`);
    }

    const { colors: colorData, ...productData } = data;

    const product = this.productRepository.create(productData);
    const savedProduct = await this.productRepository.save(product);

    // Create colors
    if (colorData && colorData.length > 0) {
      const colors = colorData.map((c) =>
        this.colorRepository.create({
          ...c,
          productId: savedProduct.id,
        })
      );
      await this.colorRepository.save(colors);
    }

    return this.findById(savedProduct.id);
  }

  async update(
    id: string,
    data: Partial<{
      name: string;
      slug: string;
      subTitle: string;
      description: string;
      price: number;
      currency: string;
      originalPrice: number;
      offerPercentage: number;
      images: ProductImages;
      sizes: string[];
      colors: { name: string; hex: string; images?: { front: string; back?: string } }[];
      material: string;
      fit: string;
      featured: boolean;
      inStock: boolean;
      category: string;
      tags: string[];
      stock: number;
    }>
  ): Promise<Product> {
    const product = await this.findById(id);

    const { colors: colorData, ...updateData } = data;

    // Update product fields
    Object.assign(product, updateData);
    await this.productRepository.save(product);

    // Update colors if provided
    if (colorData) {
      // Remove existing colors
      await this.colorRepository.delete({ productId: id });

      // Create new colors
      const colors = colorData.map((c) =>
        this.colorRepository.create({
          ...c,
          productId: id,
        })
      );
      await this.colorRepository.save(colors);
    }

    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    const product = await this.findById(id);
    product.isActive = false;
    await this.productRepository.save(product);
  }
}
