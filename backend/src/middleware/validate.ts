import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { ApiError } from '../utils/ApiError';

/**
 * Middleware to check express-validator results.
 * If validation fails, throws a 400 ApiError with the array of error messages.
 */
export const validate = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map((err) => ({
      field: (err as { path?: string }).path || 'unknown',
      message: err.msg,
    }));

    throw new ApiError(400, 'Validation failed', extractedErrors);
  }

  next();
};
