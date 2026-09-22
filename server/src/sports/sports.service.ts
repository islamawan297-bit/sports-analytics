import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SportsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.sport.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const sport = await this.prisma.sport.findUnique({
      where: { id },
    });
    if (!sport) {
      throw new NotFoundException(`Sport with ID "${id}" not found.`);
    }
    return sport;
  }

  async create(data: any) {
    const existing = await this.prisma.sport.findUnique({ where: { id: data.id } });
    if (existing) throw new ConflictException(`Sport with ID "${data.id}" already exists.`);

    return this.prisma.sport.create({
      data: {
        id: data.id,
        name: data.name,
        category: data.category,
        iconName: data.iconName || 'Activity',
        description: data.description || '',
        seasonPeriod: data.seasonPeriod || '2025-2026',
        activeTeamsCount: data.activeTeamsCount || 0,
      },
    });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.sport.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.sport.delete({ where: { id } });
  }
}
