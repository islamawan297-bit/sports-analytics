import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: {
    sport?: string;
    conference?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 50;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query?.sport) where.sportId = query.sport;
    if (query?.conference) where.conference = query.conference;

    let teams = await this.prisma.team.findMany({
      where,
      skip,
      take: limit,
      orderBy: { rank: 'asc' },
    });

    let formatted = teams.map(this.formatTeam);

    if (query?.search) {
      const s = query.search.toLowerCase();
      formatted = formatted.filter(
        (t) =>
          t.name.toLowerCase().includes(s) ||
          t.shortName.toLowerCase().includes(s) ||
          t.code.toLowerCase().includes(s),
      );
    }

    const total = await this.prisma.team.count({ where });

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
    const team = await this.prisma.team.findUnique({
      where: { id },
    });
    if (!team) {
      throw new NotFoundException(`Team with ID "${id}" not found.`);
    }
    return this.formatTeam(team);
  }

  async create(data: any) {
    const created = await this.prisma.team.create({
      data: {
        id: data.id,
        name: data.name,
        shortName: data.shortName,
        code: data.code,
        sportId: data.sportId,
        logo: data.logo || '',
        conference: data.conference || '',
        division: data.division || '',
        rank: data.rank || 1,
        wins: data.wins || 0,
        losses: data.losses || 0,
        draws: data.draws || 0,
        pct: data.pct || '.000',
        streak: data.streak || 'W1',
        color: data.color || '#3B82F6',
        stadium: data.stadium || '',
        established: data.established || 2000,
        coach: data.coach || '',
        stats: typeof data.stats === 'string' ? data.stats : JSON.stringify(data.stats || {}),
        radarData: typeof data.radarData === 'string' ? data.radarData : JSON.stringify(data.radarData || []),
      },
    });
    return this.formatTeam(created);
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    const updateData = { ...data };
    if (updateData.stats && typeof updateData.stats !== 'string') {
      updateData.stats = JSON.stringify(updateData.stats);
    }
    if (updateData.radarData && typeof updateData.radarData !== 'string') {
      updateData.radarData = JSON.stringify(updateData.radarData);
    }

    const updated = await this.prisma.team.update({
      where: { id },
      data: updateData,
    });
    return this.formatTeam(updated);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.team.delete({ where: { id } });
  }

  private formatTeam(t: any) {
    return {
      ...t,
      stats: typeof t.stats === 'string' ? JSON.parse(t.stats) : t.stats,
      radarData: typeof t.radarData === 'string' ? JSON.parse(t.radarData) : t.radarData,
      record: {
        wins: t.wins,
        losses: t.losses,
        draws: t.draws,
        pct: t.pct,
        streak: t.streak,
      },
    };
  }
}
