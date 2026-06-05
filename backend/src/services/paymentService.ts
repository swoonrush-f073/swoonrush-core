import crypto from 'crypto';

import razorpayInstance from '../config/razorpay';
import { AppDataSource } from '../config/database';
import { Order } from '../entities/Order';
import { ApiError } from '../utils/ApiError';
import { OrderService } from './orderService';

export class PaymentService {
  private orderRepository = AppDataSource.getRepository(Order);
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  async createRazorpayOrder(
    orderId: string,
    userId: string
  ): Promise<{
    razorpayOrderId: string;
    amount: number;
    currency: string;
    keyId: string;
  }> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId, userId },
    });

    if (!order) {
      throw ApiError.notFound('Order not found');
    }

    if (order.paymentStatus === 'paid') {
      throw ApiError.badRequest('Order is already paid');
    }

    const amountInPaise = Math.round(Number(order.totalAmount) * 100);

    const razorpayOrder = await razorpayInstance.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: order.orderNumber,
      notes: {
        orderId: order.id,
        userId: userId,
      },
    });

    // Store razorpay order ID
    order.razorpayOrderId = razorpayOrder.id;
    await this.orderRepository.save(order);

    return {
      razorpayOrderId: razorpayOrder.id,
      amount: amountInPaise,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID || '',
    };
  }

  async verifyPayment(data: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    orderId: string;
    userId: string;
  }): Promise<Order> {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId, userId } = data;

    // Verify the order belongs to the user
    const order = await this.orderRepository.findOne({
      where: { id: orderId, userId, razorpayOrderId },
    });

    if (!order) {
      throw ApiError.notFound('Order not found or payment mismatch');
    }

    // Verify Razorpay signature
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      throw ApiError.badRequest('Payment verification failed: Invalid signature');
    }

    // Mark order as paid, confirm, decrement stock, clear cart
    return this.orderService.markAsPaid(orderId, razorpayPaymentId, razorpaySignature);
  }

  async handleWebhook(
    payload: Record<string, unknown>,
    signature: string
  ): Promise<void> {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET || '';

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(JSON.stringify(payload))
      .digest('hex');

    if (expectedSignature !== signature) {
      throw ApiError.badRequest('Webhook signature verification failed');
    }

    const event = payload.event as string;
    const paymentEntity = (payload.payload as Record<string, unknown>)?.payment as Record<string, unknown>;
    const entity = paymentEntity?.entity as Record<string, unknown>;

    if (event === 'payment.captured' && entity) {
      const razorpayOrderId = entity.order_id as string;
      const razorpayPaymentId = entity.id as string;

      const order = await this.orderRepository.findOne({
        where: { razorpayOrderId },
      });

      if (order && order.paymentStatus !== 'paid') {
        await this.orderService.markAsPaid(
          order.id,
          razorpayPaymentId,
          'webhook'
        );
      }
    }
  }
}
