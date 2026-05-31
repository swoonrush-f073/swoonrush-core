import { Request, Response, NextFunction } from 'express';

import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { ApiError } from '../utils/ApiError';
import { verifyAccessToken } from '../utils/tokenUtils';

/**
 * JWT authentication middleware.
 * Extracts the Bearer token from the Authorization header,
 * verifies it, and attaches the user to req.user.
 */
export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw ApiError.unauthorized('Access token is required');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);

    if (decoded.type !== 'access') {
      throw ApiError.unauthorized('Invalid token type');
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: decoded.userId, isActive: true },
    });

    if (!user) {
      throw ApiError.unauthorized('User not found or deactivated');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      next(error);
    } else {
      next(ApiError.unauthorized('Invalid or expired access token'));
    }
  }
};
