import { Repository } from 'typeorm';

import { AppDataSource } from '../config/database';
import { User, UserRole } from '../entities/User';
import { ApiError } from '../utils/ApiError';
import {
  generateTokenPair,
  verifyRefreshToken,
} from '../utils/tokenUtils';

export class AuthService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async register(data: {
    firstName: string;
    lastName?: string;
    email: string;
    phone?: string;
    password: string;
  }): Promise<{ user: Record<string, unknown>; accessToken: string; refreshToken: string }> {
    const existingUser = await this.userRepository.findOne({
      where: { email: data.email.toLowerCase() },
    });

    if (existingUser) {
      throw ApiError.conflict('Email already registered');
    }

    const user = this.userRepository.create({
      ...data,
      email: data.email.toLowerCase(),
      role: UserRole.CUSTOMER,
    });

    await this.userRepository.save(user);

    const tokens = generateTokenPair(user.id, user.role);

    // Store refresh token
    await this.userRepository.update(user.id, {
      refreshToken: tokens.refreshToken,
    });

    return {
      user: user.toJSON(),
      ...tokens,
    };
  }

  async login(
    email: string,
    password: string
  ): Promise<{ user: Record<string, unknown>; accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findOne({
      where: { email: email.toLowerCase(), isActive: true },
      select: ['id', 'firstName', 'lastName', 'email', 'phone', 'password', 'role', 'isActive', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const tokens = generateTokenPair(user.id, user.role);

    // Store refresh token
    await this.userRepository.update(user.id, {
      refreshToken: tokens.refreshToken,
    });

    return {
      user: user.toJSON(),
      ...tokens,
    };
  }

  async refreshToken(
    token: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    let decoded;
    try {
      decoded = verifyRefreshToken(token);
    } catch {
      throw ApiError.unauthorized('Invalid or expired refresh token');
    }

    if (decoded.type !== 'refresh') {
      throw ApiError.unauthorized('Invalid token type');
    }

    const user = await this.userRepository.findOne({
      where: { id: decoded.userId, isActive: true },
      select: ['id', 'role', 'refreshToken'],
    });

    if (!user || user.refreshToken !== token) {
      throw ApiError.unauthorized('Invalid refresh token');
    }

    const tokens = generateTokenPair(user.id, user.role);

    await this.userRepository.update(user.id, {
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }

  async getProfile(userId: string): Promise<Record<string, unknown>> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    return user.toJSON();
  }

  async updateProfile(
    userId: string,
    data: { firstName?: string; lastName?: string; phone?: string }
  ): Promise<Record<string, unknown>> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    if (data.firstName !== undefined) user.firstName = data.firstName;
    if (data.lastName !== undefined) user.lastName = data.lastName;
    if (data.phone !== undefined) user.phone = data.phone;

    await this.userRepository.save(user);

    return user.toJSON();
  }

  async logout(userId: string): Promise<void> {
    await this.userRepository.update(userId, { refreshToken: null });
  }
}
