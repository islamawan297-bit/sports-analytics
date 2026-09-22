import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlayersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: {
    sport?: string;
    teamId?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 50;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query?.sport) where.sportId = query.sport;
    if (query?.teamId) where.teamId = query.teamId;

    const players = await this.prisma.player.findMany({
      where,
      skip,
      take: limit,
      orderBy: { name: 'asc' },
    });

    let formatted = players.map(this.formatPlayer);

    if (query?.search) {
      const q = query.search.toLowerCase();
      formatted = formatted.filter(
        (p) => p.name.toLowerCase().includes(q) || p.teamName.toLowerCase().includes(q),
      );
    }

    const total = await this.prisma.player.count({ where });

    return {
      data: formatted,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const player = await this.prisma.player.findUnique({ where: { id } });
    if (!player) {
      throw new NotFoundException(`Player with ID "${id}" not found.`);
    }
    return this.formatPlayer(player);
  }

  async create(data: any) {
    const created = await this.prisma.player.create({
      data: {
        id: data.id,
        name: data.name,
        sportId: data.sportId,
        teamId: data.teamId,
        teamName: data.teamName,
        position: data.position || '',
        number: data.number || 0,
        avatar: data.avatar || '',
        height: data.height || '',
        weight: data.weight || '',
        age: data.age || 20,
        experience: data.experience || '1st Year',
        birthplace: data.birthplace || '',
        stats: typeof data.stats === 'string' ? data.stats : JSON.stringify(data.stats || {}),
        trendData: typeof data.trendData === 'string' ? data.trendData : JSON.stringify(data.trendData || []),
        recentGames: typeof data.recentGames === 'string' ? data.recentGames : JSON.stringify(data.recentGames || []),
      },
    });
    return this.formatPlayer(created);
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    const updateData = { ...data };
    if (updateData.stats && typeof updateData.stats !== 'string') {
      updateData.stats = JSON.stringify(updateData.stats);
    }
    if (updateData.trendData && typeof updateData.trendData !== 'string') {
      updateData.trendData = JSON.stringify(updateData.trendData);
    }
    if (updateData.recentGames && typeof updateData.recentGames !== 'string') {
      updateData.recentGames = JSON.stringify(updateData.recentGames);
    }

    const updated = await this.prisma.player.update({
      where: { id },
      data: updateData,
    });
    return this.formatPlayer(updated);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.player.delete({ where: { id } });
  }

  private formatPlayer(p: any) {
    return {
      ...p,
      stats: typeof p.stats === 'string' ? JSON.parse(p.stats) : p.stats,
      trendData: typeof p.trendData === 'string' ? JSON.parse(p.trendData) : p.trendData,
      recentGames: typeof p.recentGames === 'string' ? JSON.parse(p.recentGames) : p.recentGames,
    };
  }
}
