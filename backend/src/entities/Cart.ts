import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { User } from './User';
import { CartItem } from './CartItem';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', unique: true })
  userId!: string;

  @ManyToOne(() => User, (user) => user.carts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @OneToMany(() => CartItem, (item) => item.cart, {
    cascade: true,
    eager: true,
  })
  items!: CartItem[];

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalAmount!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
