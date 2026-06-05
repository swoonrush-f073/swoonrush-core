import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';

import { ProductColor } from './ProductColor';

export interface ProductImages {
  front: string;
  back?: string;
  both?: string;
  detail?: string;
  lifestyle?: string;
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255, unique: true })
  slug!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  subTitle!: string | null;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Column({ type: 'varchar', length: 10, default: 'INR' })
  currency!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  originalPrice!: number | null;

  @Column({ type: 'int', nullable: true })
  offerPercentage!: number | null;

  @Column({ type: 'jsonb' })
  images!: ProductImages;

  @Column({ type: 'jsonb' })
  sizes!: string[];

  @Column({ type: 'varchar', length: 255 })
  material!: string;

  @Column({ type: 'varchar', length: 255 })
  fit!: string;

  @Column({ type: 'boolean', default: false })
  featured!: boolean;

  @Column({ type: 'boolean', default: true })
  inStock!: boolean;

  @Index()
  @Column({ type: 'varchar', length: 100, nullable: true })
  category!: string | null;

  @Column({ type: 'jsonb', nullable: true, default: [] })
  tags!: string[];

  @Column({ type: 'int', default: 100 })
  stock!: number;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @OneToMany(() => ProductColor, (color) => color.product, {
    cascade: true,
    eager: true,
  })
  colors!: ProductColor[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
