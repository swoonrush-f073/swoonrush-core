import { Request, Response } from 'express';

import { ProductService } from '../services/productService';
import { ProductFilterQuery } from '../types';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';

const productService = new ProductService();

export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as unknown as ProductFilterQuery;
  const { products, total, page, limit } = await productService.findAll(query);
  const response = ApiResponse.paginated(products, total, page, limit);
  res.status(response.statusCode).json(response);
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.findById(req.params.id as string);
  const response = ApiResponse.success(product);
  res.status(response.statusCode).json(response);
});

export const getProductBySlug = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.findBySlug(req.params.slug as string);
  const response = ApiResponse.success(product);
  res.status(response.statusCode).json(response);
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.create(req.body);
  const response = ApiResponse.created(product, 'Product created');
  res.status(response.statusCode).json(response);
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.update(req.params.id as string, req.body);
  const response = ApiResponse.success(product, 'Product updated');
  res.status(response.statusCode).json(response);
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  await productService.delete(req.params.id as string);
  const response = ApiResponse.success(null, 'Product deleted');
  res.status(response.statusCode).json(response);
});
