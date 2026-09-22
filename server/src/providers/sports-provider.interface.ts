export interface LiveScoreItem {
  id: string;
  sportId: string;
  status: 'live' | 'upcoming' | 'final';
  startTime: string;
  venue: string;
  periodText?: string;
  homeTeam: {
    id: string;
    name: string;
    code: string;
    score: number;
    logo: string;
    record?: string;
  };
  awayTeam: {
    id: string;
    name: string;
    code: string;
    score: number;
    logo: string;
    record?: string;
  };
  winProbability: { home: number; away: number };
  odds: { homeOdds: string; awayOdds: string; spread?: string; overUnder?: string };
}

export interface InjuryReport {
  playerId: string;
  playerName: string;
  teamId: string;
  position: string;
  status: 'Out' | 'Questionable' | 'Probable' | 'Day-to-Day' | 'IR';
  detail: string;
}

export interface HeadToHeadStats {
  team1Id: string;
  team2Id: string;
  totalGames: number;
  team1Wins: number;
  team2Wins: number;
  draws: number;
  recentMeetings: {
    date: string;
    winnerId: string;
    scoreText: string;
    venue: string;
  }[];
  avgScore: { team1: number; team2: number };
}

export interface ISportsProvider {
  name: string;
  getLiveScores(sportId?: string): Promise<LiveScoreItem[]>;
  getUpcomingGames(sportId?: string): Promise<LiveScoreItem[]>;
  getGameDetails(gameId: string): Promise<any>;
  getTeamStats(teamId: string): Promise<any>;
  getPlayerStats(playerId: string): Promise<any>;
  getHeadToHead(team1Id: string, team2Id: string): Promise<HeadToHeadStats>;
  getInjuries(sportId?: string): Promise<InjuryReport[]>;
  getHistoricalStats(sportId: string, season?: string): Promise<any>;
}
