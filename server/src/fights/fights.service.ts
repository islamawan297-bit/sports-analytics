import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FightsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: {
    sport?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 50;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query?.sport) where.sportId = query.sport;

    const fights = await this.prisma.fight.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    let formatted = fights.map(this.formatFight);

    if (query?.search) {
      const q = query.search.toLowerCase();
      formatted = formatted.filter(
        (f) =>
          f.fighter1?.name?.toLowerCase().includes(q) ||
          f.fighter2?.name?.toLowerCase().includes(q) ||
          f.weightClass?.toLowerCase().includes(q),
      );
    }

    const total = await this.prisma.fight.count({ where });

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
    const fight = await this.prisma.fight.findUnique({ where: { id } });
    if (!fight) {
      throw new NotFoundException(`Fight with ID "${id}" not found.`);
    }
    return this.formatFight(fight);
  }

  async create(data: any) {
    const created = await this.prisma.fight.create({
      data: {
        id: data.id,
        sportId: data.sportId || 'ufc',
        status: data.status || 'upcoming',
        startTime: data.startTime || new Date().toISOString(),
        venue: data.venue || 'T-Mobile Arena',
        weightClass: data.weightClass || 'Lightweight',
        roundsMax: data.roundsMax || 5,
        periodText: data.periodText || null,
        fighter1: typeof data.fighter1 === 'string' ? data.fighter1 : JSON.stringify(data.fighter1),
        fighter2: typeof data.fighter2 === 'string' ? data.fighter2 : JSON.stringify(data.fighter2),
        winProbability: typeof data.winProbability === 'string' ? data.winProbability : JSON.stringify(data.winProbability || { fighter1: 50, fighter2: 50 }),
        odds: typeof data.odds === 'string' ? data.odds : JSON.stringify(data.odds || {}),
        roundStats: typeof data.roundStats === 'string' ? data.roundStats : JSON.stringify(data.roundStats || []),
        winProbabilityTimeline: typeof data.winProbabilityTimeline === 'string' ? data.winProbabilityTimeline : JSON.stringify(data.winProbabilityTimeline || []),
        taleOfTheTape: typeof data.taleOfTheTape === 'string' ? data.taleOfTheTape : JSON.stringify(data.taleOfTheTape || {}),
        keyInsight: data.keyInsight || null,
      },
    });
    return this.formatFight(created);
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    const updateData = { ...data };
    ['fighter1', 'fighter2', 'winProbability', 'odds', 'roundStats', 'winProbabilityTimeline', 'taleOfTheTape'].forEach((field) => {
      if (updateData[field] && typeof updateData[field] !== 'string') {
        updateData[field] = JSON.stringify(updateData[field]);
      }
    });

    const updated = await this.prisma.fight.update({
      where: { id },
      data: updateData,
    });
    return this.formatFight(updated);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.fight.delete({ where: { id } });
  }

  private formatFight(f: any) {
    return {
      ...f,
      fighter1: typeof f.fighter1 === 'string' ? JSON.parse(f.fighter1) : f.fighter1,
      fighter2: typeof f.fighter2 === 'string' ? JSON.parse(f.fighter2) : f.fighter2,
      winProbability: typeof f.winProbability === 'string' ? JSON.parse(f.winProbability) : f.winProbability,
      odds: typeof f.odds === 'string' ? JSON.parse(f.odds) : f.odds,
      roundStats: f.roundStats ? JSON.parse(f.roundStats) : [],
      winProbabilityTimeline: f.winProbabilityTimeline ? JSON.parse(f.winProbabilityTimeline) : [],
      taleOfTheTape: f.taleOfTheTape ? JSON.parse(f.taleOfTheTape) : null,
    };
  }
}
