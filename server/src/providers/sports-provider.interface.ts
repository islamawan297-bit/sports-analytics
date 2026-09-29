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

export interface FightItem {
  id: string;
  sport: 'boxing' | 'mma';
  status: 'live' | 'upcoming' | 'final';
  startTime: string;
  venue: string;
  weightClass: string;
  roundsMax: number;
  periodText?: string;
  fighter1: {
    id: string;
    name: string;
    nickname?: string;
    avatar: string;
    record: string;
    cornerColor: 'red';
    weightClass: string;
    country?: string;
  };
  fighter2: {
    id: string;
    name: string;
    nickname?: string;
    avatar: string;
    record: string;
    cornerColor: 'blue';
    weightClass: string;
    country?: string;
  };
  winProbability: { fighter1: number; fighter2: number };
  odds: { fighter1Odds: string; fighter2Odds: string; spread?: string; overUnder?: string };
  roundStats?: any[];
  winProbabilityTimeline?: any[];
  taleOfTheTape?: {
    height: [string, string];
    reach: [string, string];
    stance: [string, string];
    age: [number, number];
    strikingAccuracy: [string, string];
    takedownAvg?: [string, string];
    knockoutRate: [string, string];
  };
  keyInsight?: string;
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
  getFights?(sportId?: string): Promise<FightItem[]>;
  getGameDetails(gameId: string): Promise<any>;
  getTeamStats(teamId: string): Promise<any>;
  getPlayerStats(playerId: string): Promise<any>;
  getHeadToHead(team1Id: string, team2Id: string): Promise<HeadToHeadStats>;
  getInjuries(sportId?: string): Promise<InjuryReport[]>;
  getHistoricalStats(sportId: string, season?: string): Promise<any>;
}
