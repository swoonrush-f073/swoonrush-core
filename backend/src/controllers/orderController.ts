import { Request, Response } from 'express';

import { OrderStatus } from '../entities/Order';
import { OrderService } from '../services/orderService';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';

const orderService = new OrderService();

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.createFromCart(req.user!.id, req.body.shippingAddress);
  const response = ApiResponse.created(order, 'Order created');
  res.status(response.statusCode).json(response);
});

export const getUserOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await orderService.findUserOrders(req.user!.id);
  const response = ApiResponse.success(orders);
  res.status(response.statusCode).json(response);
});

export const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.findById(req.params.id as string, req.user!.id);
  const response = ApiResponse.success(order);
  res.status(response.statusCode).json(response);
});

export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.updateStatus(
    req.params.id as string,
    req.body.orderStatus as OrderStatus
  );
  const response = ApiResponse.success(order, 'Order status updated');
  res.status(response.statusCode).json(response);
});

export const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const { orders, total } = await orderService.findAllOrders(page, limit);
  const response = ApiResponse.paginated(orders, total, page, limit);
  res.status(response.statusCode).json(response);
});
