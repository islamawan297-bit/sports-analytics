import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class GamesService {
  constructor(
    private prisma: PrismaService,
    private cache: CacheService,
  ) {}

  async findAll(query?: {
    sport?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const cacheKey = `games_${query?.sport || 'all'}_${query?.status || 'all'}_${query?.search || ''}_${query?.page || 1}_${query?.limit || 50}`;
    const cached = await this.cache.get<any>(cacheKey);
    if (cached) return cached;

    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 50;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query?.sport) where.sportId = query.sport;
    if (query?.status) where.status = query.status;

    const games = await this.prisma.game.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    let formatted = games.map(this.formatGame);

    if (query?.search) {
      const q = query.search.toLowerCase();
      formatted = formatted.filter(
        (g) =>
          g.homeTeam?.name?.toLowerCase().includes(q) ||
          g.awayTeam?.name?.toLowerCase().includes(q) ||
          g.venue?.toLowerCase().includes(q),
      );
    }

    const total = await this.prisma.game.count({ where });

    const result = {
      data: formatted,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    await this.cache.set(cacheKey, result, 30); // 30 seconds cache TTL
    return result;
  }

  async findLive() {
    return this.findAll({ status: 'live' });
  }

  async findOne(id: string) {
    const game = await this.prisma.game.findUnique({ where: { id } });
    if (!game) {
      throw new NotFoundException(`Game with ID "${id}" not found.`);
    }
    return this.formatGame(game);
  }

  async create(data: any) {
    const created = await this.prisma.game.create({
      data: {
        id: data.id,
        sportId: data.sportId,
        status: data.status || 'upcoming',
        startTime: data.startTime || new Date().toISOString(),
        venue: data.venue || 'Stadium Arena',
        periodText: data.periodText || null,
        homeTeam: typeof data.homeTeam === 'string' ? data.homeTeam : JSON.stringify(data.homeTeam),
        awayTeam: typeof data.awayTeam === 'string' ? data.awayTeam : JSON.stringify(data.awayTeam),
        winProbability: typeof data.winProbability === 'string' ? data.winProbability : JSON.stringify(data.winProbability || { home: 50, away: 50 }),
        odds: typeof data.odds === 'string' ? data.odds : JSON.stringify(data.odds || {}),
        winProbabilityTimeline: typeof data.winProbabilityTimeline === 'string' ? data.winProbabilityTimeline : JSON.stringify(data.winProbabilityTimeline || []),
        boxScorePeriods: typeof data.boxScorePeriods === 'string' ? data.boxScorePeriods : JSON.stringify(data.boxScorePeriods || []),
        homeBoxScore: typeof data.homeBoxScore === 'string' ? data.homeBoxScore : JSON.stringify(data.homeBoxScore || []),
        awayBoxScore: typeof data.awayBoxScore === 'string' ? data.awayBoxScore : JSON.stringify(data.awayBoxScore || []),
        playByPlay: typeof data.playByPlay === 'string' ? data.playByPlay : JSON.stringify(data.playByPlay || []),
        keyInsight: data.keyInsight || null,
      },
    });
    await this.cache.flush();
    return this.formatGame(created);
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    const updateData = { ...data };
    ['homeTeam', 'awayTeam', 'winProbability', 'odds', 'winProbabilityTimeline', 'boxScorePeriods', 'homeBoxScore', 'awayBoxScore', 'playByPlay'].forEach((field) => {
      if (updateData[field] && typeof updateData[field] !== 'string') {
        updateData[field] = JSON.stringify(updateData[field]);
      }
    });

    const updated = await this.prisma.game.update({
      where: { id },
      data: updateData,
    });
    await this.cache.flush();
    return this.formatGame(updated);
  }

  async remove(id: string) {
    await this.findOne(id);
    const result = await this.prisma.game.delete({ where: { id } });
    await this.cache.flush();
    return result;
  }

  private formatGame(g: any) {
    return {
      ...g,
      homeTeam: typeof g.homeTeam === 'string' ? JSON.parse(g.homeTeam) : g.homeTeam,
      awayTeam: typeof g.awayTeam === 'string' ? JSON.parse(g.awayTeam) : g.awayTeam,
      winProbability: typeof g.winProbability === 'string' ? JSON.parse(g.winProbability) : g.winProbability,
      odds: typeof g.odds === 'string' ? JSON.parse(g.odds) : g.odds,
      winProbabilityTimeline: g.winProbabilityTimeline ? JSON.parse(g.winProbabilityTimeline) : [],
      boxScorePeriods: g.boxScorePeriods ? JSON.parse(g.boxScorePeriods) : [],
      homeBoxScore: g.homeBoxScore ? JSON.parse(g.homeBoxScore) : [],
      awayBoxScore: g.awayBoxScore ? JSON.parse(g.awayBoxScore) : [],
      playByPlay: g.playByPlay ? JSON.parse(g.playByPlay) : [],
    };
  }
}
