import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Product } from './Product';

export interface ColorImages {
  front: string;
  back?: string;
}

@Entity('product_colors')
export class ProductColor {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  productId!: string;

  @ManyToOne(() => Product, (product) => product.colors, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product!: Product;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 10 })
  hex!: string;

  @Column({ type: 'jsonb', nullable: true })
  images!: ColorImages | null;

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      hex: this.hex,
      ...(this.images ? { images: this.images } : {}),
    };
  }
}
