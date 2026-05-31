import { Request, Response } from 'express';

import { PaymentService } from '../services/paymentService';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';

const paymentService = new PaymentService();

export const createPaymentOrder = asyncHandler(async (req: Request, res: Response) => {
  const { orderId } = req.body;
  const result = await paymentService.createRazorpayOrder(orderId, req.user!.id);
  const response = ApiResponse.success(result, 'Razorpay order created');
  res.status(response.statusCode).json(response);
});

export const verifyPayment = asyncHandler(async (req: Request, res: Response) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = req.body;

  const order = await paymentService.verifyPayment({
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    orderId,
    userId: req.user!.id,
  });

  const response = ApiResponse.success(order, 'Payment verified successfully');
  res.status(response.statusCode).json(response);
});

export const handleWebhook = asyncHandler(async (req: Request, res: Response) => {
  const signature = req.headers['x-razorpay-signature'] as string;
  await paymentService.handleWebhook(req.body, signature);
  res.status(200).json({ status: 'ok' });
});
