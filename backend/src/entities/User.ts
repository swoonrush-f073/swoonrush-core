import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import bcrypt from 'bcrypt';

import { Order } from './Order';
import { Cart } from './Cart';

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  firstName!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  lastName!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone!: string;

  @Column({ type: 'varchar', length: 255, select: false })
  password!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  role!: UserRole;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ type: 'text', nullable: true, select: false })
  refreshToken!: string | null;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts!: Cart[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  async hashPasswordBeforeInsert(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate(): Promise<void> {
    if (this.password && !this.password.startsWith('$2b$')) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }

  toJSON(): Record<string, unknown> {
    const { password, refreshToken, ...rest } = this as Record<string, unknown>;
    return rest;
  }
}
