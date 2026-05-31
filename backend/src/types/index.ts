export interface PaginationQuery {
  page?: string;
  limit?: string;
}

export interface ProductFilterQuery extends PaginationQuery {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  featured?: string;
  inStock?: string;
  sort?: string;
}

export interface JwtPayload {
  userId: string;
  role: string;
  type: 'access' | 'refresh';
}
