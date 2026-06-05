import { Request, Response } from 'express';

import { CartService } from '../services/cartService';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';

const cartService = new CartService();

export const getCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = await cartService.getCart(req.user!.id);
  const response = ApiResponse.success(cart);
  res.status(response.statusCode).json(response);
});

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = await cartService.addItem(req.user!.id, req.body);
  const response = ApiResponse.success(cart, 'Item added to cart');
  res.status(response.statusCode).json(response);
});

export const updateCartItem = asyncHandler(async (req: Request, res: Response) => {
  const cart = await cartService.updateItem(req.user!.id, req.body);
  const response = ApiResponse.success(cart, 'Cart updated');
  res.status(response.statusCode).json(response);
});

export const removeCartItem = asyncHandler(async (req: Request, res: Response) => {
  const cart = await cartService.removeItem(req.user!.id, req.params.itemId as string);
  const response = ApiResponse.success(cart, 'Item removed from cart');
  res.status(response.statusCode).json(response);
});

export const clearCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = await cartService.clearCart(req.user!.id);
  const response = ApiResponse.success(cart, 'Cart cleared');
  res.status(response.statusCode).json(response);
});
