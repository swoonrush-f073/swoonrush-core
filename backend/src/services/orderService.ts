import { Repository } from 'typeorm';

import { AppDataSource } from '../config/database';
import { Cart } from '../entities/Cart';
import { Order, OrderStatus, PaymentStatus, ShippingAddress } from '../entities/Order';
import { OrderItem, OrderProductSnapshot } from '../entities/OrderItem';
import { Product } from '../entities/Product';
import { ORDER_STATUS_TRANSITIONS } from '../constants/orderStatuses';
import { ApiError } from '../utils/ApiError';

export class OrderService {
  private orderRepository: Repository<Order>;
  private orderItemRepository: Repository<OrderItem>;
  private cartRepository: Repository<Cart>;
  private productRepository: Repository<Product>;

  constructor() {
    this.orderRepository = AppDataSource.getRepository(Order);
    this.orderItemRepository = AppDataSource.getRepository(OrderItem);
    this.cartRepository = AppDataSource.getRepository(Cart);
    this.productRepository = AppDataSource.getRepository(Product);
  }

  async createFromCart(
    userId: string,
    shippingAddress: ShippingAddress
  ): Promise<Order> {
    const cart = await this.cartRepository.findOne({
      where: { userId },
      relations: ['items'],
    });

    if (!cart || !cart.items || cart.items.length === 0) {
      throw ApiError.badRequest('Cart is empty');
    }

    // Validate all products are still available and calculate subtotal
    let subtotal = 0;
    const orderItems: Partial<OrderItem>[] = [];

    for (const cartItem of cart.items) {
      const product = await this.productRepository.findOne({
        where: { id: cartItem.productId, isActive: true },
      });

      if (!product) {
        throw ApiError.badRequest(
          `Product '${cartItem.productSnapshot.name}' is no longer available`
        );
      }

      if (!product.inStock || product.stock < cartItem.quantity) {
        throw ApiError.badRequest(
          `Product '${product.name}' does not have enough stock (requested: ${cartItem.quantity}, available: ${product.stock})`
        );
      }

      const itemPrice = Number(product.price);
      subtotal += itemPrice * cartItem.quantity;

      const snapshot: OrderProductSnapshot = {
        name: product.name,
        slug: product.slug,
        price: itemPrice,
        currency: product.currency,
        image: product.images.front,
        material: product.material,
        fit: product.fit,
      };

      orderItems.push({
        productId: product.id,
        quantity: cartItem.quantity,
        size: cartItem.size,
        color: cartItem.color,
        price: itemPrice,
        productSnapshot: snapshot,
      });
    }

    const shippingCharge = 0; // Free shipping per frontend
    const totalAmount = subtotal + shippingCharge;

    // Create the order
    const order = this.orderRepository.create({
      userId,
      subtotal,
      shippingCharge,
      totalAmount,
      shippingAddress: {
        ...shippingAddress,
        country: shippingAddress.country || 'India',
      },
      paymentStatus: PaymentStatus.PENDING,
      orderStatus: OrderStatus.PENDING,
    });

    const savedOrder = await this.orderRepository.save(order);

    // Create order items
    const items = orderItems.map((item) =>
      this.orderItemRepository.create({
        ...item,
        orderId: savedOrder.id,
      })
    );
    await this.orderItemRepository.save(items);

    // Return full order
    return this.findById(savedOrder.id, userId);
  }

  async findUserOrders(userId: string): Promise<Order[]> {
    return this.orderRepository.find({
      where: { userId },
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId?: string): Promise<Order> {
    const where: Record<string, string> = { id };
    if (userId) {
      where.userId = userId;
    }

    const order = await this.orderRepository.findOne({
      where,
      relations: ['items'],
    });

    if (!order) {
      throw ApiError.notFound('Order not found');
    }

    return order;
  }

  async updateStatus(id: string, newStatus: OrderStatus): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });

    if (!order) {
      throw ApiError.notFound('Order not found');
    }

    // Validate status transition
    const allowedTransitions = ORDER_STATUS_TRANSITIONS[order.orderStatus];
    if (!allowedTransitions || !allowedTransitions.includes(newStatus)) {
      throw ApiError.badRequest(
        `Cannot transition order from '${order.orderStatus}' to '${newStatus}'. Allowed: ${(allowedTransitions || []).join(', ') || 'none'}`
      );
    }

    order.orderStatus = newStatus;

    // If cancelled and was paid, handle accordingly
    if (newStatus === OrderStatus.CANCELLED && order.paymentStatus === PaymentStatus.PAID) {
      order.paymentStatus = PaymentStatus.REFUNDED;

      // Restore stock
      for (const item of order.items) {
        if (item.productId) {
          await this.productRepository.increment(
            { id: item.productId },
            'stock',
            item.quantity
          );
        }
      }
    }

    await this.orderRepository.save(order);

    return this.findById(id);
  }

  async findAllOrders(page = 1, limit = 20): Promise<{ orders: Order[]; total: number }> {
    const skip = (page - 1) * limit;

    const [orders, total] = await this.orderRepository.findAndCount({
      relations: ['items', 'user'],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return { orders, total };
  }

  async markAsPaid(
    orderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['items'],
    });

    if (!order) {
      throw ApiError.notFound('Order not found');
    }

    order.paymentStatus = PaymentStatus.PAID;
    order.orderStatus = OrderStatus.CONFIRMED;
    order.razorpayPaymentId = razorpayPaymentId;
    order.razorpaySignature = razorpaySignature;

    await this.orderRepository.save(order);

    // Decrement stock for each item
    for (const item of order.items) {
      if (item.productId) {
        await this.productRepository.decrement(
          { id: item.productId },
          'stock',
          item.quantity
        );

        // Check if product should be marked out of stock
        const product = await this.productRepository.findOne({
          where: { id: item.productId },
        });
        if (product && product.stock <= 0) {
          product.inStock = false;
          await this.productRepository.save(product);
        }
      }
    }

    // Clear user's cart
    const cart = await this.cartRepository.findOne({
      where: { userId: order.userId },
    });
    if (cart) {
      await AppDataSource.getRepository('CartItem').delete({ cartId: cart.id });
      cart.totalAmount = 0;
      await this.cartRepository.save(cart);
    }

    return this.findById(orderId);
  }
}
