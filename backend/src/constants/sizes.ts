export const VALID_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;

export type ValidSize = (typeof VALID_SIZES)[number];
