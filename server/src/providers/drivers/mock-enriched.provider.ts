import { Injectable } from '@nestjs/common';
import { ISportsProvider, LiveScoreItem, HeadToHeadStats, InjuryReport } from '../sports-provider.interface';

@Injectable()
export class MockEnrichedProvider implements ISportsProvider {
  name = 'MockEnrichedProvider';

  async getLiveScores(sportId?: string): Promise<LiveScoreItem[]> {
    return [
      {
        id: 'nba-game-live-1',
        sportId: 'nba',
        status: 'live',
        startTime: 'Today, 8:30 PM EST',
        venue: 'Crypto.com Arena, Los Angeles',
        periodText: 'Q4 - 02:14',
        homeTeam: { id: 'lakers', name: 'Los Angeles Lakers', code: 'LAL', score: 112, logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=120&auto=format&fit=crop&q=80', record: '38-22' },
        awayTeam: { id: 'celtics', name: 'Boston Celtics', code: 'BOS', score: 109, logo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=120&auto=format&fit=crop&q=80', record: '44-16' },
        winProbability: { home: 71.2, away: 28.8 },
        odds: { homeOdds: '-155', awayOdds: '+135', spread: 'LAL -3.5', overUnder: '224.5' },
      },
      {
        id: 'nfl-game-live-1',
        sportId: 'nfl',
        status: 'upcoming',
        startTime: 'Sunday, 4:25 PM EST',
        venue: 'GEHA Field at Arrowhead Stadium',
        periodText: 'Upcoming',
        homeTeam: { id: 'chiefs', name: 'Kansas City Chiefs', code: 'KC', score: 0, logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=120&auto=format&fit=crop&q=80', record: '12-3' },
        awayTeam: { id: 'bills', name: 'Buffalo Bills', code: 'BUF', score: 0, logo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=120&auto=format&fit=crop&q=80', record: '11-4' },
        winProbability: { home: 58.4, away: 41.6 },
        odds: { homeOdds: '-140', awayOdds: '+120', spread: 'KC -2.5', overUnder: '48.5' },
      },
    ];
  }

  async getUpcomingGames(sportId?: string): Promise<LiveScoreItem[]> {
    const scores = await this.getLiveScores(sportId);
    return scores.filter((s) => s.status === 'upcoming');
  }

  async getGameDetails(gameId: string): Promise<any> {
    return {
      gameId,
      keyFactors: [
        'Lakers have won 4 straight home games when leading after Q3.',
        'Celtics are shooting 41.2% from 3PT range in past 5 road games.',
        'Pace metric estimate: 101.4 possessions (High Tempo).',
      ],
    };
  }

  async getTeamStats(teamId: string): Promise<any> {
    return {
      teamId,
      offenseRating: 118.4,
      defenseRating: 110.2,
      netRating: +8.2,
      pace: 99.6,
      tsPct: '58.4%',
      reboundPct: '52.1%',
    };
  }

  async getPlayerStats(playerId: string): Promise<any> {
    return {
      playerId,
      per: 24.5,
      usageRate: '28.4%',
      trueShootingPct: '62.4%',
      winShares: 8.4,
    };
  }

  async getHeadToHead(team1Id: string, team2Id: string): Promise<HeadToHeadStats> {
    return {
      team1Id,
      team2Id,
      totalGames: 12,
      team1Wins: 7,
      team2Wins: 5,
      draws: 0,
      recentMeetings: [
        { date: '2025-01-15', winnerId: team1Id, scoreText: '112 - 105', venue: 'Crypto.com Arena' },
        { date: '2024-11-20', winnerId: team2Id, scoreText: '98 - 104', venue: 'TD Garden' },
      ],
      avgScore: { team1: 111.5, team2: 107.8 },
    };
  }

  async getInjuries(sportId?: string): Promise<InjuryReport[]> {
    return [
      { playerId: 'inj-1', playerName: 'Anthony Davis', teamId: 'lakers', position: 'C', status: 'Questionable', detail: 'Ankle Sprain' },
      { playerId: 'inj-2', playerName: 'Kristaps Porzingis', teamId: 'celtics', position: 'PF', status: 'Out', detail: 'Calf Strain' },
    ];
  }

  async getHistoricalStats(sportId: string, season?: string): Promise<any> {
    return {
      sportId,
      season: season || '2025-2026',
      totalGames: 1230,
      leagueAvgPpg: 114.8,
    };
  }
}
