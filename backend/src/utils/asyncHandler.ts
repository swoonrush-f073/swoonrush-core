import { Request, Response, NextFunction } from 'express';

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

/**
 * Wraps an async Express route handler to automatically catch errors
 * and pass them to the next() error middleware.
 */
export const asyncHandler = (fn: AsyncRequestHandler) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
