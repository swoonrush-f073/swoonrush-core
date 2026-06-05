import { Request, Response } from 'express';

import { AuthService } from '../services/authService';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';

const authService = new AuthService();

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);
  const response = ApiResponse.created(result, 'Registration successful');
  res.status(response.statusCode).json(response);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  const response = ApiResponse.success(result, 'Login successful');
  res.status(response.statusCode).json(response);
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken: token } = req.body;
  const result = await authService.refreshToken(token);
  const response = ApiResponse.success(result, 'Token refreshed');
  res.status(response.statusCode).json(response);
});

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.getProfile(req.user!.id);
  const response = ApiResponse.success(user);
  res.status(response.statusCode).json(response);
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.updateProfile(req.user!.id, req.body);
  const response = ApiResponse.success(user, 'Profile updated');
  res.status(response.statusCode).json(response);
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  await authService.logout(req.user!.id);
  const response = ApiResponse.success(null, 'Logged out successfully');
  res.status(response.statusCode).json(response);
});
