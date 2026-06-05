import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

import { User } from '../entities/User';
import { Product } from '../entities/Product';
import { ProductColor } from '../entities/ProductColor';
import { Cart } from '../entities/Cart';
import { CartItem } from '../entities/CartItem';
import { Order } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'swoonrush',
  password: process.env.DB_PASSWORD || 'swoonrush_secret',
  database: process.env.DB_NAME || 'swoonrush_db',
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Product, ProductColor, Cart, CartItem, Order, OrderItem],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  subscribers: [],
});
