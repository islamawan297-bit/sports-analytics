import { Injectable, NotFoundException } from '@nestjs/common';
import { AnalysisEngine } from './analysis.engine';
import { AiInsightsService, InsightRequestDto } from './ai-insights.service';
import { PrismaService } from '../prisma/prisma.service';
import { SportsProviderService } from '../providers/sports-provider.service';

@Injectable()
export class AnalysisService {
  constructor(
    private analysisEngine: AnalysisEngine,
    private aiInsightsService: AiInsightsService,
    private prisma: PrismaService,
    private providerService: SportsProviderService,
  ) {}

  async getGameAnalysis(gameId: string) {
    const game = await this.prisma.game.findUnique({ where: { id: gameId } });
    let homeTeamStats = { offenseRating: 116.5, defenseRating: 111.8, pace: 99.4, ppg: 117.8, oppg: 112.4 };
    let awayTeamStats = { offenseRating: 122.1, defenseRating: 110.2, pace: 98.1, ppg: 120.6, oppg: 108.9 };

    let homeTeamName = 'Home Team';
    let awayTeamName = 'Away Team';
    let homeScore = 0;
    let awayScore = 0;
    let periodText = 'Scheduled';
    let sport = 'nba';

    if (game) {
      sport = game.sportId;
      periodText = game.periodText || 'Scheduled';
      const homeTeam = typeof game.homeTeam === 'string' ? JSON.parse(game.homeTeam) : game.homeTeam;
      const awayTeam = typeof game.awayTeam === 'string' ? JSON.parse(game.awayTeam) : game.awayTeam;

      if (homeTeam) {
        homeTeamName = homeTeam.name || homeTeam.shortName || 'Home Team';
        homeScore = homeTeam.score || 0;
      }
      if (awayTeam) {
        awayTeamName = awayTeam.name || awayTeam.shortName || 'Away Team';
        awayScore = awayTeam.score || 0;
      }

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

    const aiInsightRes = await this.aiInsightsService.generateGameInsight({
      sport,
      homeTeamName,
      awayTeamName,
      homeScore,
      awayScore,
      periodText,
      winProbability: { home: statisticalEstimate.homeWinProbability, away: statisticalEstimate.awayWinProbability },
      predictedHomeScore: statisticalEstimate.predictedHomeScore,
      predictedAwayScore: statisticalEstimate.predictedAwayScore,
      homeStats: homeTeamStats,
      awayStats: awayTeamStats,
      keyDrivers: statisticalEstimate.keyDrivers,
    });

    return {
      gameId,
      statisticalEstimate,
      teamComparison,
      aiInsight: aiInsightRes,
      injuries: injuries.slice(0, 3),
      generatedAt: new Date().toISOString(),
    };
  }

  async getAiInsight(dto: InsightRequestDto) {
    return this.aiInsightsService.generateGameInsight(dto);
  }

  async getGameAiInsight(gameId: string) {
    const analysis = await this.getGameAnalysis(gameId);
    return analysis.aiInsight;
  }

  async getLiveWinProbability(gameId: string) {
    const game = await this.prisma.game.findUnique({ where: { id: gameId } });

    let homeTeamStats = { offenseRating: 116.5, defenseRating: 111.8, pace: 99.4, ppg: 117.8, oppg: 112.4 };
    let awayTeamStats = { offenseRating: 122.1, defenseRating: 110.2, pace: 98.1, ppg: 120.6, oppg: 108.9 };
    let homeScore = 0;
    let awayScore = 0;
    let periodText = 'Scheduled';
    let status = 'upcoming';
    let sport = 'nba';
    let playByPlay: any[] = [];
    let boxScorePeriods: any[] = [];

    if (game) {
      sport = game.sportId;
      status = game.status;
      periodText = game.periodText || 'Scheduled';

      const homeTeam = typeof game.homeTeam === 'string' ? JSON.parse(game.homeTeam) : game.homeTeam;
      const awayTeam = typeof game.awayTeam === 'string' ? JSON.parse(game.awayTeam) : game.awayTeam;

      homeScore = homeTeam?.score || 0;
      awayScore = awayTeam?.score || 0;

      if (game.playByPlay) {
        playByPlay = typeof game.playByPlay === 'string' ? JSON.parse(game.playByPlay) : game.playByPlay;
      }
      if (game.boxScorePeriods) {
        boxScorePeriods = typeof game.boxScorePeriods === 'string' ? JSON.parse(game.boxScorePeriods) : game.boxScorePeriods;
      }

      if (homeTeam?.id) {
        const dbHome = await this.prisma.team.findUnique({ where: { id: homeTeam.id } });
        if (dbHome?.stats) homeTeamStats = typeof dbHome.stats === 'string' ? JSON.parse(dbHome.stats) : dbHome.stats;
      }
      if (awayTeam?.id) {
        const dbAway = await this.prisma.team.findUnique({ where: { id: awayTeam.id } });
        if (dbAway?.stats) awayTeamStats = typeof dbAway.stats === 'string' ? JSON.parse(dbAway.stats) : dbAway.stats;
      }
    }

    return this.analysisEngine.calculateLiveWinProbability({
      sport,
      homeTeamStats,
      awayTeamStats,
      homeScore,
      awayScore,
      periodText,
      status,
      playByPlay,
      boxScorePeriods,
    });
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
