export type SportType = 'nba' | 'nfl' | 'mlb' | 'mls' | 'nhl' | 'boxing' | 'mma';

export type GameStatus = 'live' | 'upcoming' | 'final';

export interface SportInfo {
  id: SportType;
  name: string;
  category: 'ball' | 'combat';
  iconName: string;
  description: string;
  seasonPeriod: string;
  activeTeamsCount: number;
}

export interface TeamSummary {
  id: string;
  name: string;
  code: string;
  score: number;
  logo: string;
  color?: string;
  record?: string;
}

export interface FighterSummary {
  id: string;
  name: string;
  nickname?: string;
  avatar: string;
  record: string;
  score?: number; // Score/rounds won or decision status
  cornerColor: 'red' | 'blue';
  weightClass: string;
}

export interface WinProbabilityPoint {
  time: string;
  homeProb: number;
  awayProb: number;
  scoreText?: string;
}

export interface Odds {
  homeOdds: string;
  awayOdds: string;
  spread?: string;
  overUnder?: string;
  fighter1Odds?: string;
  fighter2Odds?: string;
}

export interface PlayByPlayItem {
  id: string;
  time: string;
  period: string;
  teamCode: string;
  description: string;
  scoreText: string;
  type: 'scoring' | 'turnover' | 'foul' | 'highlight';
}

export interface BoxScorePeriod {
  label: string;
  home: number;
  away: number;
}

export interface BoxScoreStatLine {
  playerId: string;
  playerName: string;
  position: string;
  minutes: string;
  points: number;
  rebounds?: number;
  assists?: number;
  steals?: number;
  blocks?: number;
  fgText?: string;
  threePtText?: string;
  ftText?: string;
}

export interface Game {
  id: string;
  sport: SportType;
  status: GameStatus;
  startTime: string;
  venue: string;
  periodText?: string; // e.g., "Q3 - 04:12" or "Top 7th" or "Final"
  homeTeam: TeamSummary;
  awayTeam: TeamSummary;
  winProbability: {
    home: number;
    away: number;
  };
  odds: Odds;
  winProbabilityTimeline?: WinProbabilityPoint[];
  boxScorePeriods?: BoxScorePeriod[];
  homeBoxScore?: BoxScoreStatLine[];
  awayBoxScore?: BoxScoreStatLine[];
  playByPlay?: PlayByPlayItem[];
  keyInsight?: string;
}

export interface RoundStatItem {
  round: number;
  fighter1Strikes: number;
  fighter2Strikes: number;
  fighter1Takedowns?: number;
  fighter2Takedowns?: number;
  fighter1ControlTime?: string;
  fighter2ControlTime?: string;
}

export interface Fight {
  id: string;
  sport: 'boxing' | 'mma';
  status: GameStatus;
  startTime: string;
  venue: string;
  weightClass: string;
  roundsMax: number;
  periodText?: string; // e.g. "Round 4 of 12" or "Unanimous Decision"
  fighter1: FighterSummary;
  fighter2: FighterSummary;
  winProbability: {
    fighter1: number;
    fighter2: number;
  };
  odds: Odds;
  roundStats?: RoundStatItem[];
  winProbabilityTimeline?: WinProbabilityPoint[];
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

export interface Team {
  id: string;
  name: string;
  shortName: string;
  code: string;
  sport: SportType;
  logo: string;
  conference: string;
  division: string;
  rank: number;
  record: {
    wins: number;
    losses: number;
    draws?: number;
    pct: string;
    streak: string;
  };
  color: string;
  stadium: string;
  established: number;
  coach: string;
  stats: {
    ppg: number;
    oppg: number;
    offenseRating: number;
    defenseRating: number;
    pace: number;
  };
  radarData: {
    subject: string;
    value: number;
    leagueAvg: number;
  }[];
}

export interface Player {
  id: string;
  name: string;
  sport: SportType;
  teamId: string;
  teamName: string;
  position: string;
  number: number;
  avatar: string;
  height: string;
  weight: string;
  age: number;
  experience: string;
  birthplace: string;
  stats: Record<string, string | number>;
  trendData: {
    game: string;
    metric1: number;
    metric2: number;
  }[];
  recentGames: {
    date: string;
    opponent: string;
    result: string;
    statsText: string;
  }[];
}

export interface Fighter {
  id: string;
  name: string;
  nickname: string;
  sport: 'boxing' | 'mma';
  weightClass: string;
  avatar: string;
  record: {
    wins: number;
    losses: number;
    draws: number;
    kos: number;
  };
  height: string;
  reach: string;
  stance: string;
  age: number;
  country: string;
  rank: string;
  strikingAccuracy: string;
  takedownAccuracy?: string;
  sigStrikesPerMin: string;
  submissionAvg?: string;
  careerLog: {
    date: string;
    opponent: string;
    result: 'WIN' | 'LOSS' | 'DRAW';
    method: string;
    round: string;
  }[];
}

export interface StandingRow {
  rank: number;
  teamId: string;
  teamName: string;
  teamCode: string;
  teamLogo: string;
  wins: number;
  losses: number;
  draws?: number;
  pct: string;
  gb?: string; // Games Behind
  diff: string; // Point/Goal differential
  streak: string;
  last10: string;
}
