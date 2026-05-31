import { Request, Response, NextFunction } from 'express';

import { UserRole } from '../entities/User';
import { ApiError } from '../utils/ApiError';

/**
 * Role-based authorization middleware.
 * Must be used after the `authenticate` middleware.
 */
export const authorize = (...roles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(ApiError.unauthorized('Authentication required'));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        ApiError.forbidden(
          `Role '${req.user.role}' is not authorized to access this resource`
        )
      );
    }

    next();
  };
};
