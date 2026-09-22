import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto, UpdateProfileDto, ToggleFavoriteDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (existing) {
      throw new ConflictException('An account with this email already exists.');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        password: hashedPassword,
        name: dto.name,
        role: (dto.role as any) || 'USER',
        favorites: JSON.stringify([]),
      },
    });

    const token = this.generateToken(user.id, user.email, user.role);

    return {
      message: 'Account registered successfully.',
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        favorites: [],
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const token = this.generateToken(user.id, user.email, user.role);

    return {
      message: 'Logged in successfully.',
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        favorites: user.favorites ? JSON.parse(user.favorites) : [],
      },
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User profile not found.');
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      favorites: user.favorites ? JSON.parse(user.favorites) : [],
      createdAt: user.createdAt,
    };
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const dataToUpdate: any = {};
    if (dto.name) dataToUpdate.name = dto.name;
    if (dto.password) {
      dataToUpdate.password = await bcrypt.hash(dto.password, 10);
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
    });

    return {
      id: updated.id,
      email: updated.email,
      name: updated.name,
      role: updated.role,
      favorites: updated.favorites ? JSON.parse(updated.favorites) : [],
    };
  }

  async toggleFavorite(userId: string, dto: ToggleFavoriteDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found.');

    let favs: string[] = user.favorites ? JSON.parse(user.favorites) : [];
    if (favs.includes(dto.itemId)) {
      favs = favs.filter((id) => id !== dto.itemId);
    } else {
      favs.push(dto.itemId);
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { favorites: JSON.stringify(favs) },
    });

    return {
      favorites: favs,
      message: favs.includes(dto.itemId) ? 'Added to favorites' : 'Removed from favorites',
    };
  }

  private generateToken(userId: string, email: string, role: string): string {
    return this.jwtService.sign({
      sub: userId,
      email,
      role,
    });
  }
}
