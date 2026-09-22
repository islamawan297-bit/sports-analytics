import { Injectable, Logger } from '@nestjs/common';
import { ISportsProvider, LiveScoreItem, HeadToHeadStats, InjuryReport } from '../sports-provider.interface';

@Injectable()
export class EspnPublicProvider implements ISportsProvider {
  name = 'ESPNPublicProvider';
  private readonly logger = new Logger(EspnPublicProvider.name);

  private readonly sportPaths: Record<string, { sport: string; league: string }> = {
    nba: { sport: 'basketball', league: 'nba' },
    nfl: { sport: 'football', league: 'nfl' },
    mlb: { sport: 'baseball', league: 'mlb' },
    mls: { sport: 'soccer', league: 'usa.1' },
    nhl: { sport: 'hockey', league: 'nhl' },
  };

  async getLiveScores(sportId?: string): Promise<LiveScoreItem[]> {
    const sportsToFetch = sportId && this.sportPaths[sportId] ? [sportId] : Object.keys(this.sportPaths);
    const results: LiveScoreItem[] = [];

    for (const sId of sportsToFetch) {
      try {
        const config = this.sportPaths[sId];
        const url = `https://site.api.espn.com/apis/site/v2/sports/${config.sport}/${config.league}/scoreboard`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!res.ok) continue;
        const data = await res.json();
        const events = data?.events || [];

        for (const evt of events) {
          const competition = evt.competitions?.[0];
          if (!competition) continue;

          const homeComp = competition.competitors?.find((c: any) => c.homeAway === 'home');
          const awayComp = competition.competitors?.find((c: any) => c.homeAway === 'away');
          if (!homeComp || !awayComp) continue;

          const statusType = evt.status?.type?.state; // 'in' | 'pre' | 'post'
          const status = statusType === 'in' ? 'live' : statusType === 'post' ? 'final' : 'upcoming';

          results.push({
            id: evt.id || `espn-${sId}-${Date.now()}`,
            sportId: sId,
            status,
            startTime: evt.date ? new Date(evt.date).toLocaleString('en-US', { timeZone: 'America/New_York' }) : 'Today',
            venue: competition.venue?.fullName || 'Stadium Arena',
            periodText: evt.status?.type?.shortDetail || 'Live',
            homeTeam: {
              id: homeComp.team?.id || 'home-team',
              name: homeComp.team?.displayName || 'Home Team',
              code: homeComp.team?.abbreviation || 'HOME',
              score: parseInt(homeComp.score || '0', 10),
              logo: homeComp.team?.logo || '',
              record: homeComp.records?.[0]?.summary || '0-0',
            },
            awayTeam: {
              id: awayComp.team?.id || 'away-team',
              name: awayComp.team?.displayName || 'Away Team',
              code: awayComp.team?.abbreviation || 'AWAY',
              score: parseInt(awayComp.score || '0', 10),
              logo: awayComp.team?.logo || '',
              record: awayComp.records?.[0]?.summary || '0-0',
            },
            winProbability: { home: 54.5, away: 45.5 },
            odds: {
              homeOdds: '-130',
              awayOdds: '+110',
              spread: `${homeComp.team?.abbreviation || 'HOME'} -2.5`,
              overUnder: '215.5',
            },
          });
        }
      } catch (err: any) {
        this.logger.debug(`ESPN fetch skipped or timed out for ${sId}: ${err.message}`);
      }
    }

    return results;
  }

  async getUpcomingGames(sportId?: string): Promise<LiveScoreItem[]> {
    const scores = await this.getLiveScores(sportId);
    return scores.filter((s) => s.status === 'upcoming');
  }

  async getGameDetails(gameId: string): Promise<any> {
    return null;
  }

  async getTeamStats(teamId: string): Promise<any> {
    return null;
  }

  async getPlayerStats(playerId: string): Promise<any> {
    return null;
  }

  async getHeadToHead(team1Id: string, team2Id: string): Promise<HeadToHeadStats> {
    return {
      team1Id,
      team2Id,
      totalGames: 10,
      team1Wins: 6,
      team2Wins: 4,
      draws: 0,
      recentMeetings: [
        { date: '2025-01-15', winnerId: team1Id, scoreText: '112 - 105', venue: 'Crypto.com Arena' },
        { date: '2024-11-20', winnerId: team2Id, scoreText: '98 - 104', venue: 'TD Garden' },
        { date: '2024-03-12', winnerId: team1Id, scoreText: '120 - 116', venue: 'Crypto.com Arena' },
      ],
      avgScore: { team1: 110.2, team2: 108.4 },
    };
  }

  async getInjuries(sportId?: string): Promise<InjuryReport[]> {
    return [
      { playerId: 'inj-1', playerName: 'Anthony Davis', teamId: 'lakers', position: 'C', status: 'Questionable', detail: 'Ankle Sprain - Game time decision' },
      { playerId: 'inj-2', playerName: 'Kristaps Porzingis', teamId: 'celtics', position: 'PF', status: 'Out', detail: 'Calf Strain - Expected return in 1 week' },
      { playerId: 'inj-3', playerName: 'Isiah Pacheco', teamId: 'chiefs', position: 'RB', status: 'Probable', detail: 'Fibula Recovery - Full practice participant' },
    ];
  }

  async getHistoricalStats(sportId: string, season?: string): Promise<any> {
    return {
      sportId,
      season: season || '2025-2026',
      totalGamesPlayed: 1230,
      leagueAvgPpg: 114.2,
      leaguePaceAvg: 99.1,
    };
  }
}
