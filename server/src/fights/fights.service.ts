import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SportsProviderService } from '../providers/sports-provider.service';

@Injectable()
export class FightsService {
  constructor(
    private prisma: PrismaService,
    private providerService: SportsProviderService,
  ) {}

  async findAll(query?: {
    sport?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 50;
    const skip = (page - 1) * limit;

    // Fetch real fight events from external provider (ESPN MMA / Boxing)
    let providerFights = await this.providerService.getFights(query?.sport);

    if (query?.search && providerFights.length > 0) {
      const q = query.search.toLowerCase();
      providerFights = providerFights.filter(
        (f) =>
          f.fighter1?.name?.toLowerCase().includes(q) ||
          f.fighter2?.name?.toLowerCase().includes(q) ||
          f.weightClass?.toLowerCase().includes(q),
      );
    }

    if (providerFights.length > 0) {
      return {
        data: providerFights,
        meta: {
          total: providerFights.length,
          page,
          limit,
          totalPages: Math.ceil(providerFights.length / limit),
        },
        source: 'ESPN Public Scoreboard API',
        isRealData: true,
        lastUpdated: new Date().toISOString(),
      };
    }

    const sportLabel = query?.sport === 'boxing' ? 'boxing' : query?.sport === 'mma' ? 'MMA' : 'combat sports';
    const unavailableMsg = query?.sport === 'boxing' ? 'No live boxing data available' : `No live ${sportLabel} data available`;

    return {
      data: [],
      meta: {
        total: 0,
        page,
        limit,
        totalPages: 0,
      },
      isUnavailable: true,
      message: unavailableMsg,
      source: 'ESPN Public Scoreboard API',
      isRealData: false,
      lastUpdated: new Date().toISOString(),
    };
  }

  async findOne(id: string) {
    const fight = await this.prisma.fight.findUnique({ where: { id } });
    if (fight) {
      return this.formatFight(fight);
    }

    // Search provider fights
    const providerFights = await this.providerService.getFights();
    const found = providerFights.find((f) => f.id === id);
    if (found) {
      return found;
    }

    throw new NotFoundException(`Fight with ID "${id}" not found.`);
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
