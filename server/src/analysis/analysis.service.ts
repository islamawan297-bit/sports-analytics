import { Injectable, NotFoundException } from '@nestjs/common';
import { AnalysisEngine } from './analysis.engine';
import { PrismaService } from '../prisma/prisma.service';
import { SportsProviderService } from '../providers/sports-provider.service';

@Injectable()
export class AnalysisService {
  constructor(
    private analysisEngine: AnalysisEngine,
    private prisma: PrismaService,
    private providerService: SportsProviderService,
  ) {}

  async getGameAnalysis(gameId: string) {
    const game = await this.prisma.game.findUnique({ where: { id: gameId } });
    let homeTeamStats = { offenseRating: 116.5, defenseRating: 111.8, pace: 99.4, ppg: 117.8, oppg: 112.4 };
    let awayTeamStats = { offenseRating: 122.1, defenseRating: 110.2, pace: 98.1, ppg: 120.6, oppg: 108.9 };

    if (game) {
      const homeTeam = typeof game.homeTeam === 'string' ? JSON.parse(game.homeTeam) : game.homeTeam;
      const awayTeam = typeof game.awayTeam === 'string' ? JSON.parse(game.awayTeam) : game.awayTeam;

      if (homeTeam?.id) {
        const dbHome = await this.prisma.team.findUnique({ where: { id: homeTeam.id } });
        if (dbHome?.stats) {
          homeTeamStats = typeof dbHome.stats === 'string' ? JSON.parse(dbHome.stats) : dbHome.stats;
        }
      }
      if (awayTeam?.id) {
        const dbAway = await this.prisma.team.findUnique({ where: { id: awayTeam.id } });
        if (dbAway?.stats) {
          awayTeamStats = typeof dbAway.stats === 'string' ? JSON.parse(dbAway.stats) : dbAway.stats;
        }
      }
    }

    const statisticalEstimate = this.analysisEngine.calculateGameEstimate(homeTeamStats, awayTeamStats);
    const teamComparison = this.analysisEngine.generateTeamComparison(homeTeamStats, awayTeamStats);
    const injuries = await this.providerService.getInjuries();

    return {
      gameId,
      statisticalEstimate,
      teamComparison,
      injuries: injuries.slice(0, 3),
      generatedAt: new Date().toISOString(),
    };
  }

  async getHeadToHead(team1Id: string, team2Id: string) {
    return this.providerService.getHeadToHead(team1Id, team2Id);
  }

  async getInjuries(sportId?: string) {
    return this.providerService.getInjuries(sportId);
  }

  async getHistoricalStats(sportId: string) {
    return this.providerService.getHistoricalStats(sportId);
  }
}
