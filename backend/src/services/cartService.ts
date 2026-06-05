import { Repository } from 'typeorm';

import { AppDataSource } from '../config/database';
import { Cart } from '../entities/Cart';
import { CartItem, CartProductSnapshot } from '../entities/CartItem';
import { Product } from '../entities/Product';
import { ApiError } from '../utils/ApiError';

export class CartService {
  private cartRepository: Repository<Cart>;
  private cartItemRepository: Repository<CartItem>;
  private productRepository: Repository<Product>;

  constructor() {
    this.cartRepository = AppDataSource.getRepository(Cart);
    this.cartItemRepository = AppDataSource.getRepository(CartItem);
    this.productRepository = AppDataSource.getRepository(Product);
  }

  private async getOrCreateCart(userId: string): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: { userId },
      relations: ['items'],
    });

    if (!cart) {
      cart = this.cartRepository.create({ userId, totalAmount: 0 });
      cart = await this.cartRepository.save(cart);
      cart.items = [];
    }

    return cart;
  }

  private calculateTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => {
      return sum + item.productSnapshot.price * item.quantity;
    }, 0);
  }

  async getCart(userId: string): Promise<Cart> {
    return this.getOrCreateCart(userId);
  }

  async addItem(
    userId: string,
    data: { productId: string; quantity: number; size: string; color?: string }
  ): Promise<Cart> {
    const product = await this.productRepository.findOne({
      where: { id: data.productId, isActive: true, inStock: true },
    });

    if (!product) {
      throw ApiError.notFound('Product not found or out of stock');
    }

    // Validate size is available for this product
    if (!product.sizes.includes(data.size)) {
      throw ApiError.badRequest(
        `Size '${data.size}' is not available for this product. Available sizes: ${product.sizes.join(', ')}`
      );
    }

    const cart = await this.getOrCreateCart(userId);

    // Check if same product with same size and color already exists in cart
    const existingItem = cart.items.find(
      (item) =>
        item.productId === data.productId &&
        item.size === data.size &&
        item.color === (data.color || null)
    );

    if (existingItem) {
      existingItem.quantity += data.quantity;
      await this.cartItemRepository.save(existingItem);
    } else {
      const snapshot: CartProductSnapshot = {
        name: product.name,
        slug: product.slug,
        price: Number(product.price),
        currency: product.currency,
        image: product.images.front,
        material: product.material,
      };

      const cartItem = this.cartItemRepository.create({
        cartId: cart.id,
        productId: data.productId,
        quantity: data.quantity,
        size: data.size,
        color: data.color || null,
        productSnapshot: snapshot,
      });

      await this.cartItemRepository.save(cartItem);
    }

    // Recalculate total
    const updatedCart = await this.getOrCreateCart(userId);
    updatedCart.totalAmount = this.calculateTotal(updatedCart.items);
    await this.cartRepository.save(updatedCart);

    return this.getOrCreateCart(userId);
  }

  async updateItem(
    userId: string,
    data: { itemId: string; quantity?: number; size?: string; color?: string }
  ): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);

    const item = cart.items.find((i) => i.id === data.itemId);
    if (!item) {
      throw ApiError.notFound('Cart item not found');
    }

    if (data.quantity !== undefined) item.quantity = data.quantity;
    if (data.size !== undefined) item.size = data.size;
    if (data.color !== undefined) item.color = data.color;

    await this.cartItemRepository.save(item);

    // Recalculate total
    const updatedCart = await this.getOrCreateCart(userId);
    updatedCart.totalAmount = this.calculateTotal(updatedCart.items);
    await this.cartRepository.save(updatedCart);

    return this.getOrCreateCart(userId);
  }

  async removeItem(userId: string, itemId: string): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);

    const item = cart.items.find((i) => i.id === itemId);
    if (!item) {
      throw ApiError.notFound('Cart item not found');
    }

    await this.cartItemRepository.remove(item);

    // Recalculate total
    const refreshedCart = await this.getOrCreateCart(userId);
    refreshedCart.totalAmount = this.calculateTotal(refreshedCart.items);
    await this.cartRepository.save(refreshedCart);

    return this.getOrCreateCart(userId);
  }

  async clearCart(userId: string): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);

    await this.cartItemRepository.delete({ cartId: cart.id });

    cart.totalAmount = 0;
    await this.cartRepository.save(cart);

    cart.items = [];
    return cart;
  }
}
