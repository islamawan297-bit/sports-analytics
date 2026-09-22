import {
  SportInfo,
  Game,
  Fight,
  Team,
  Player,
  Fighter,
  StandingRow
} from '@/types/sports';

export const SPORTS_LIST: SportInfo[] = [
  {
    id: 'nba',
    name: 'NBA',
    category: 'ball',
    iconName: 'Dribble',
    description: 'National Basketball Association',
    seasonPeriod: '2025-2026 Regular Season',
    activeTeamsCount: 30,
  },
  {
    id: 'nfl',
    name: 'NFL',
    category: 'ball',
    iconName: 'Trophy',
    description: 'National Football League',
    seasonPeriod: '2025 Regular Season',
    activeTeamsCount: 32,
  },
  {
    id: 'mlb',
    name: 'MLB',
    category: 'ball',
    iconName: 'Activity',
    description: 'Major League Baseball',
    seasonPeriod: '2025 Pennant Race',
    activeTeamsCount: 30,
  },
  {
    id: 'mls',
    name: 'MLS',
    category: 'ball',
    iconName: 'Globe',
    description: 'Major League Soccer',
    seasonPeriod: '2025 MLS Cup Campaign',
    activeTeamsCount: 29,
  },
  {
    id: 'nhl',
    name: 'NHL',
    category: 'ball',
    iconName: 'Zap',
    description: 'National Hockey League',
    seasonPeriod: '2025 Stanley Cup Quest',
    activeTeamsCount: 32,
  },
  {
    id: 'boxing',
    name: 'Boxing',
    category: 'combat',
    iconName: 'Shield',
    description: 'World Championship Boxing',
    seasonPeriod: '2025 World Title Fights',
    activeTeamsCount: 12,
  },
  {
    id: 'mma',
    name: 'MMA',
    category: 'combat',
    iconName: 'Flame',
    description: 'UFC & Mixed Martial Arts',
    seasonPeriod: '2025 Octagon Series',
    activeTeamsCount: 14,
  },
];

export const MOCK_GAMES: Game[] = [
  {
    id: 'nba-game-1',
    sport: 'nba',
    status: 'live',
    startTime: 'Today, 8:00 PM EST',
    venue: 'Crypto.com Arena, Los Angeles',
    periodText: 'Q4 - 03:45',
    homeTeam: {
      id: 'lakers',
      name: 'Los Angeles Lakers',
      code: 'LAL',
      score: 108,
      logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=120&auto=format&fit=crop&q=80',
      record: '38-22',
      color: '#552583'
    },
    awayTeam: {
      id: 'celtics',
      name: 'Boston Celtics',
      code: 'BOS',
      score: 105,
      logo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=120&auto=format&fit=crop&q=80',
      record: '44-16',
      color: '#007A33'
    },
    winProbability: {
      home: 68.4,
      away: 31.6,
    },
    odds: {
      homeOdds: '-145',
      awayOdds: '+125',
      spread: 'LAL -3.5',
      overUnder: '224.5'
    },
    winProbabilityTimeline: [
      { time: 'Q1 12:00', homeProb: 50.0, awayProb: 50.0, scoreText: '0-0' },
      { time: 'Q1 00:00', homeProb: 44.2, awayProb: 55.8, scoreText: '24-28' },
      { time: 'Q2 00:00', homeProb: 52.1, awayProb: 47.9, scoreText: '56-54' },
      { time: 'Q3 00:00', homeProb: 41.5, awayProb: 58.5, scoreText: '78-83' },
      { time: 'Q4 06:00', homeProb: 59.0, awayProb: 41.0, scoreText: '98-97' },
      { time: 'Q4 03:45', homeProb: 68.4, awayProb: 31.6, scoreText: '108-105' },
    ],
    boxScorePeriods: [
      { label: 'Q1', home: 24, away: 28 },
      { label: 'Q2', home: 32, away: 26 },
      { label: 'Q3', home: 22, away: 29 },
      { label: 'Q4', home: 30, away: 22 },
    ],
    homeBoxScore: [
      { playerId: 'lebron-james', playerName: 'LeBron James', position: 'SF', minutes: '34:12', points: 31, rebounds: 9, assists: 11, steals: 2, blocks: 1, fgText: '12-20', threePtText: '3-6', ftText: '4-5' },
      { playerId: 'anthony-davis', playerName: 'Anthony Davis', position: 'C', minutes: '33:40', points: 26, rebounds: 14, assists: 3, steals: 1, blocks: 4, fgText: '10-18', threePtText: '0-1', ftText: '6-8' },
      { playerId: 'austin-reaves', playerName: 'Austin Reaves', position: 'SG', minutes: '31:05', points: 18, rebounds: 4, assists: 6, steals: 1, blocks: 0, fgText: '6-11', threePtText: '4-7', ftText: '2-2' },
    ],
    awayBoxScore: [
      { playerId: 'jayson-tatum', playerName: 'Jayson Tatum', position: 'PF', minutes: '36:10', points: 29, rebounds: 8, assists: 5, steals: 1, blocks: 1, fgText: '10-22', threePtText: '4-10', ftText: '5-6' },
      { playerId: 'jaylen-brown', playerName: 'Jaylen Brown', position: 'SG', minutes: '34:55', points: 24, rebounds: 6, assists: 4, steals: 2, blocks: 0, fgText: '9-19', threePtText: '2-7', ftText: '4-4' },
      { playerId: 'derrick-white', playerName: 'Derrick White', position: 'PG', minutes: '32:00', points: 17, rebounds: 3, assists: 7, steals: 3, blocks: 2, fgText: '6-12', threePtText: '3-8', ftText: '2-2' },
    ],
    playByPlay: [
      { id: 'p1', time: '03:45', period: 'Q4', teamCode: 'LAL', description: 'LeBron James driving stepback 3pt jump shot MADE (31 PTS)', scoreText: '108-105', type: 'scoring' },
      { id: 'p2', time: '04:12', period: 'Q4', teamCode: 'BOS', description: 'Jayson Tatum pullup jump shot MISSED', scoreText: '105-105', type: 'highlight' },
      { id: 'p3', time: '04:30', period: 'Q4', teamCode: 'LAL', description: 'Anthony Davis block on Jaylen Brown layup', scoreText: '105-105', type: 'highlight' },
      { id: 'p4', time: '05:01', period: 'Q4', teamCode: 'BOS', description: 'Derrick White 26-foot 3pt shot MADE', scoreText: '105-105', type: 'scoring' },
    ],
    keyInsight: 'Lakers have closed the gap with a 10-2 run in the last 3 minutes led by LeBron James triple-double performance.'
  },
  {
    id: 'nfl-game-1',
    sport: 'nfl',
    status: 'upcoming',
    startTime: 'Sun, 4:25 PM EST',
    venue: 'GEHA Field at Arrowhead Stadium, Kansas City',
    periodText: 'Upcoming',
    homeTeam: {
      id: 'chiefs',
      name: 'Kansas City Chiefs',
      code: 'KC',
      score: 0,
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=120&auto=format&fit=crop&q=80',
      record: '12-3',
      color: '#E31837'
    },
    awayTeam: {
      id: 'niners',
      name: 'San Francisco 49ers',
      code: 'SF',
      score: 0,
      logo: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=120&auto=format&fit=crop&q=80',
      record: '11-4',
      color: '#AA0000'
    },
    winProbability: {
      home: 57.5,
      away: 42.5,
    },
    odds: {
      homeOdds: '-165',
      awayOdds: '+140',
      spread: 'KC -3.0',
      overUnder: '47.5'
    },
    keyInsight: 'Mahomes has won 5 consecutive matchups when playing in temperatures below 35°F at Arrowhead.'
  },
  {
    id: 'mlb-game-1',
    sport: 'mlb',
    status: 'live',
    startTime: 'Today, 7:10 PM EST',
    venue: 'Dodger Stadium, Los Angeles',
    periodText: 'Bot 7th - 2 Outs',
    homeTeam: {
      id: 'dodgers',
      name: 'Los Angeles Dodgers',
      code: 'LAD',
      score: 6,
      logo: 'https://images.unsplash.com/photo-1562077772-3bd90403f7f0?w=120&auto=format&fit=crop&q=80',
      record: '89-54',
      color: '#005A9C'
    },
    awayTeam: {
      id: 'yankees',
      name: 'New York Yankees',
      code: 'NYY',
      score: 4,
      logo: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=120&auto=format&fit=crop&q=80',
      record: '86-57',
      color: '#003087'
    },
    winProbability: {
      home: 82.1,
      away: 17.9,
    },
    odds: {
      homeOdds: '-180',
      awayOdds: '+150',
      spread: 'LAD -1.5',
      overUnder: '8.5'
    },
    winProbabilityTimeline: [
      { time: '1st Inn', homeProb: 50.0, awayProb: 50.0, scoreText: '0-0' },
      { time: '3rd Inn', homeProb: 35.0, awayProb: 65.0, scoreText: '1-3' },
      { time: '5th Inn', homeProb: 62.0, awayProb: 38.0, scoreText: '4-3' },
      { time: '7th Inn', homeProb: 82.1, awayProb: 17.9, scoreText: '6-4' },
    ],
    keyInsight: 'Shohei Ohtani launched a 445-foot 2-run homer in the 5th inning to flip win probability.'
  },
  {
    id: 'mls-game-1',
    sport: 'mls',
    status: 'final',
    startTime: 'Yesterday',
    venue: 'Chase Stadium, Fort Lauderdale',
    periodText: 'Full Time (90+6\')',
    homeTeam: {
      id: 'inter-miami',
      name: 'Inter Miami CF',
      code: 'MIA',
      score: 3,
      logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=120&auto=format&fit=crop&q=80',
      record: '19-4-5',
      color: '#F7B5CD'
    },
    awayTeam: {
      id: 'la-galaxy',
      name: 'LA Galaxy',
      code: 'LAG',
      score: 1,
      logo: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=120&auto=format&fit=crop&q=80',
      record: '16-7-6',
      color: '#00245D'
    },
    winProbability: {
      home: 100.0,
      away: 0.0,
    },
    odds: {
      homeOdds: '-135',
      awayOdds: '+280',
      spread: 'MIA -1.0',
      overUnder: '3.5'
    },
    keyInsight: 'Lionel Messi delivered 2 goals and 1 assist in a dominating 3-1 victory.'
  },
  {
    id: 'nhl-game-1',
    sport: 'nhl',
    status: 'upcoming',
    startTime: 'Tomorrow, 7:00 PM EST',
    venue: 'Rogers Place, Edmonton',
    periodText: 'Upcoming',
    homeTeam: {
      id: 'oilers',
      name: 'Edmonton Oilers',
      code: 'EDM',
      score: 0,
      logo: 'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?w=120&auto=format&fit=crop&q=80',
      record: '45-21-5',
      color: '#041E42'
    },
    awayTeam: {
      id: 'panthers',
      name: 'Florida Panthers',
      code: 'FLA',
      score: 0,
      logo: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=120&auto=format&fit=crop&q=80',
      record: '47-20-4',
      color: '#041E42'
    },
    winProbability: {
      home: 54.0,
      away: 46.0,
    },
    odds: {
      homeOdds: '-120',
      awayOdds: '+100',
      spread: 'EDM -1.5',
      overUnder: '6.5'
    },
    keyInsight: 'Connor McDavid enters on an 11-game point streak (9G, 14A).'
  }
];

export const MOCK_FIGHTS: Fight[] = [
  {
    id: 'boxing-fight-1',
    sport: 'boxing',
    status: 'live',
    startTime: 'Tonight, 11:00 PM EST',
    venue: 'T-Mobile Arena, Las Vegas',
    weightClass: 'Super Middleweight Title (168 lbs)',
    roundsMax: 12,
    periodText: 'Round 8 of 12',
    fighter1: {
      id: 'canelo-alvarez',
      name: 'Canelo Alvarez',
      nickname: 'El Canelo',
      avatar: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=160&auto=format&fit=crop&q=80',
      record: '61-2-2 (39 KO)',
      score: 68,
      cornerColor: 'red',
      weightClass: 'Super Middleweight'
    },
    fighter2: {
      id: 'terence-crawford',
      name: 'Terence Crawford',
      nickname: 'Bud',
      avatar: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=160&auto=format&fit=crop&q=80',
      record: '40-0-0 (31 KO)',
      score: 66,
      cornerColor: 'blue',
      weightClass: 'Super Middleweight'
    },
    winProbability: {
      fighter1: 58.2,
      fighter2: 41.8,
    },
    odds: {
      fighter1Odds: '-150',
      fighter2Odds: '+125',
      homeOdds: '-150',
      awayOdds: '+125'
    },
    roundStats: [
      { round: 1, fighter1Strikes: 14, fighter2Strikes: 11 },
      { round: 2, fighter1Strikes: 16, fighter2Strikes: 18 },
      { round: 3, fighter1Strikes: 21, fighter2Strikes: 15 },
      { round: 4, fighter1Strikes: 19, fighter2Strikes: 22 },
      { round: 5, fighter1Strikes: 25, fighter2Strikes: 19 },
      { round: 6, fighter1Strikes: 22, fighter2Strikes: 20 },
      { round: 7, fighter1Strikes: 28, fighter2Strikes: 24 },
    ],
    winProbabilityTimeline: [
      { time: 'R1', homeProb: 50.0, awayProb: 50.0 },
      { time: 'R3', homeProb: 54.0, awayProb: 46.0 },
      { time: 'R5', homeProb: 61.5, awayProb: 38.5 },
      { time: 'R7', homeProb: 58.2, awayProb: 41.8 },
    ],
    taleOfTheTape: {
      height: ['5\'8"', '5\'8"'],
      reach: ['70.5 in', '74.0 in'],
      stance: ['Orthodox', 'Southpaw'],
      age: [34, 37],
      strikingAccuracy: ['48.5%', '46.8%'],
      knockoutRate: ['63.9%', '77.5%']
    },
    keyInsight: 'Canelo has landed 42 power body shots through 7 rounds, slowing Crawford down in the center.'
  },
  {
    id: 'mma-fight-1',
    sport: 'mma',
    status: 'upcoming',
    startTime: 'Saturday, 10:00 PM EST',
    venue: 'Sphere, Las Vegas (UFC 312)',
    weightClass: 'Heavyweight Championship (265 lbs)',
    roundsMax: 5,
    periodText: 'Main Event',
    fighter1: {
      id: 'jon-jones',
      name: 'Jon Jones',
      nickname: 'Bones',
      avatar: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=160&auto=format&fit=crop&q=80',
      record: '27-1-0 (10 KO, 7 SUB)',
      cornerColor: 'red',
      weightClass: 'Heavyweight'
    },
    fighter2: {
      id: 'tom-aspinall',
      name: 'Tom Aspinall',
      nickname: 'Honey Badger',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80',
      record: '15-3-0 (12 KO, 3 SUB)',
      cornerColor: 'blue',
      weightClass: 'Heavyweight'
    },
    winProbability: {
      fighter1: 64.0,
      fighter2: 36.0,
    },
    odds: {
      fighter1Odds: '-175',
      fighter2Odds: '+145',
      homeOdds: '-175',
      awayOdds: '+145'
    },
    taleOfTheTape: {
      height: ['6\'4"', '6\'5"'],
      reach: ['84.5 in', '78.0 in'],
      stance: ['Orthodox', 'Orthodox'],
      age: [37, 31],
      strikingAccuracy: ['57.9%', '66.2%'],
      takedownAvg: ['1.85 / 15m', '3.41 / 15m'],
      knockoutRate: ['37.0%', '80.0%']
    },
    keyInsight: 'Jon Jones holds a significant 6.5-inch reach advantage along with 16 world title fight victories.'
  }
];

export const MOCK_TEAMS: Team[] = [
  {
    id: 'lakers',
    name: 'Los Angeles Lakers',
    shortName: 'Lakers',
    code: 'LAL',
    sport: 'nba',
    logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=120&auto=format&fit=crop&q=80',
    conference: 'Western Conference',
    division: 'Pacific Division',
    rank: 4,
    record: {
      wins: 38,
      losses: 22,
      pct: '.633',
      streak: 'W4'
    },
    color: '#552583',
    stadium: 'Crypto.com Arena',
    established: 1947,
    coach: 'JJ Redick',
    stats: {
      ppg: 117.8,
      oppg: 112.4,
      offenseRating: 116.5,
      defenseRating: 111.8,
      pace: 99.4
    },
    radarData: [
      { subject: 'Offense', value: 88, leagueAvg: 70 },
      { subject: 'Defense', value: 76, leagueAvg: 70 },
      { subject: 'Pace', value: 82, leagueAvg: 70 },
      { subject: '3PT Shooting', value: 72, leagueAvg: 70 },
      { subject: 'Rebounding', value: 84, leagueAvg: 70 },
      { subject: 'Clutch Play', value: 92, leagueAvg: 70 },
    ]
  },
  {
    id: 'chiefs',
    name: 'Kansas City Chiefs',
    shortName: 'Chiefs',
    code: 'KC',
    sport: 'nfl',
    logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=120&auto=format&fit=crop&q=80',
    conference: 'AFC',
    division: 'AFC West',
    rank: 1,
    record: {
      wins: 12,
      losses: 3,
      pct: '.800',
      streak: 'W2'
    },
    color: '#E31837',
    stadium: 'GEHA Field at Arrowhead Stadium',
    established: 1960,
    coach: 'Andy Reid',
    stats: {
      ppg: 27.4,
      oppg: 17.6,
      offenseRating: 118.2,
      defenseRating: 105.4,
      pace: 68.2
    },
    radarData: [
      { subject: 'Passing', value: 95, leagueAvg: 70 },
      { subject: 'Rushing', value: 75, leagueAvg: 70 },
      { subject: 'Red Zone EFF', value: 90, leagueAvg: 70 },
      { subject: 'Pass Defense', value: 88, leagueAvg: 70 },
      { subject: 'Turnovers Forced', value: 82, leagueAvg: 70 },
      { subject: 'Special Teams', value: 80, leagueAvg: 70 },
    ]
  },
  {
    id: 'dodgers',
    name: 'Los Angeles Dodgers',
    shortName: 'Dodgers',
    code: 'LAD',
    sport: 'mlb',
    logo: 'https://images.unsplash.com/photo-1562077772-3bd90403f7f0?w=120&auto=format&fit=crop&q=80',
    conference: 'National League',
    division: 'NL West',
    rank: 1,
    record: {
      wins: 89,
      losses: 54,
      pct: '.622',
      streak: 'W5'
    },
    color: '#005A9C',
    stadium: 'Dodger Stadium',
    established: 1883,
    coach: 'Dave Roberts',
    stats: {
      ppg: 5.4,
      oppg: 4.1,
      offenseRating: 122.0,
      defenseRating: 110.0,
      pace: 100
    },
    radarData: [
      { subject: 'Batting AVG', value: 86, leagueAvg: 70 },
      { subject: 'Home Runs', value: 96, leagueAvg: 70 },
      { subject: 'Starting Pitching', value: 89, leagueAvg: 70 },
      { subject: 'Bullpen', value: 84, leagueAvg: 70 },
      { subject: 'Fielding', value: 88, leagueAvg: 70 },
      { subject: 'OBP', value: 92, leagueAvg: 70 },
    ]
  },
  {
    id: 'inter-miami',
    name: 'Inter Miami CF',
    shortName: 'Inter Miami',
    code: 'MIA',
    sport: 'mls',
    logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=120&auto=format&fit=crop&q=80',
    conference: 'Eastern Conference',
    division: 'MLS East',
    rank: 1,
    record: {
      wins: 19,
      losses: 4,
      draws: 5,
      pct: '.768',
      streak: 'W3'
    },
    color: '#F7B5CD',
    stadium: 'Chase Stadium',
    established: 2018,
    coach: 'Gerardo Martino',
    stats: {
      ppg: 2.3,
      oppg: 1.1,
      offenseRating: 125.0,
      defenseRating: 108.0,
      pace: 75.0
    },
    radarData: [
      { subject: 'Possession', value: 92, leagueAvg: 70 },
      { subject: 'Scoring EFF', value: 98, leagueAvg: 70 },
      { subject: 'Passing Accuracy', value: 94, leagueAvg: 70 },
      { subject: 'Clean Sheets', value: 78, leagueAvg: 70 },
      { subject: 'Set Pieces', value: 89, leagueAvg: 70 },
      { subject: 'Counter Attacks', value: 85, leagueAvg: 70 },
    ]
  },
  {
    id: 'oilers',
    name: 'Edmonton Oilers',
    shortName: 'Oilers',
    code: 'EDM',
    sport: 'nhl',
    logo: 'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?w=120&auto=format&fit=crop&q=80',
    conference: 'Western Conference',
    division: 'Pacific Division',
    rank: 2,
    record: {
      wins: 45,
      losses: 21,
      draws: 5,
      pct: '.669',
      streak: 'W1'
    },
    color: '#041E42',
    stadium: 'Rogers Place',
    established: 1972,
    coach: 'Kris Knoblauch',
    stats: {
      ppg: 3.6,
      oppg: 2.7,
      offenseRating: 124.0,
      defenseRating: 106.0,
      pace: 88.0
    },
    radarData: [
      { subject: 'Power Play', value: 99, leagueAvg: 70 },
      { subject: 'Penalty Kill', value: 82, leagueAvg: 70 },
      { subject: 'Goal Scoring', value: 95, leagueAvg: 70 },
      { subject: 'Goaltending', value: 79, leagueAvg: 70 },
      { subject: 'Shot Creation', value: 92, leagueAvg: 70 },
      { subject: 'Faceoffs', value: 84, leagueAvg: 70 },
    ]
  }
];

export const MOCK_PLAYERS: Player[] = [
  {
    id: 'lebron-james',
    name: 'LeBron James',
    sport: 'nba',
    teamId: 'lakers',
    teamName: 'Los Angeles Lakers',
    position: 'Small Forward',
    number: 23,
    avatar: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&auto=format&fit=crop&q=80',
    height: '6\'9"',
    weight: '250 lbs',
    age: 40,
    experience: '22nd Season',
    birthplace: 'Akron, OH',
    stats: {
      'PPG': 25.2,
      'RPG': 7.8,
      'APG': 8.2,
      'FG%': '54.0%',
      '3P%': '41.2%',
      'PER': 24.8
    },
    trendData: [
      { game: 'vs BOS', metric1: 31, metric2: 11 },
      { game: '@ GSW', metric1: 28, metric2: 9 },
      { game: 'vs PHX', metric1: 34, metric2: 8 },
      { game: '@ DEN', metric1: 26, metric2: 12 },
      { game: 'vs SAC', metric1: 29, metric2: 10 },
    ],
    recentGames: [
      { date: 'Sep 20', opponent: 'vs BOS', result: 'W 108-105', statsText: '31 PTS, 9 REB, 11 AST' },
      { date: 'Sep 17', opponent: '@ GSW', result: 'W 114-110', statsText: '28 PTS, 7 REB, 9 AST' },
      { date: 'Sep 14', opponent: 'vs PHX', result: 'L 102-109', statsText: '34 PTS, 6 REB, 8 AST' },
      { date: 'Sep 11', opponent: '@ DEN', result: 'W 120-115', statsText: '26 PTS, 10 REB, 12 AST' },
    ]
  },
  {
    id: 'patrick-mahomes',
    name: 'Patrick Mahomes',
    sport: 'nfl',
    teamId: 'chiefs',
    teamName: 'Kansas City Chiefs',
    position: 'Quarterback',
    number: 15,
    avatar: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=200&auto=format&fit=crop&q=80',
    height: '6\'2"',
    weight: '225 lbs',
    age: 29,
    experience: '8th Season',
    birthplace: 'Tyler, TX',
    stats: {
      'Pass YDS': 4180,
      'Pass TD': 34,
      'INT': 9,
      'QBR': 78.4,
      'Comp %': '67.4%',
      'Rating': 104.2
    },
    trendData: [
      { game: 'Wk 13', metric1: 310, metric2: 3 },
      { game: 'Wk 14', metric1: 285, metric2: 2 },
      { game: 'Wk 15', metric1: 340, metric2: 4 },
      { game: 'Wk 16', metric1: 295, metric2: 2 },
      { game: 'Wk 17', metric1: 325, metric2: 3 },
    ],
    recentGames: [
      { date: 'Sep 15', opponent: '@ BAL', result: 'W 27-20', statsText: '291 YDS, 2 TD, 0 INT' },
      { date: 'Sep 08', opponent: 'vs CIN', result: 'W 26-25', statsText: '315 YDS, 3 TD, 1 INT' },
    ]
  },
  {
    id: 'shohei-ohtani',
    name: 'Shohei Ohtani',
    sport: 'mlb',
    teamId: 'dodgers',
    teamName: 'Los Angeles Dodgers',
    position: 'DH / RHP',
    number: 17,
    avatar: 'https://images.unsplash.com/photo-1562077772-3bd90403f7f0?w=200&auto=format&fit=crop&q=80',
    height: '6\'4"',
    weight: '210 lbs',
    age: 30,
    experience: '7th Season',
    birthplace: 'Oshu, Japan',
    stats: {
      'HR': 54,
      'RBI': 130,
      'SB': 59,
      'AVG': '.310',
      'OPS': '1.036',
      'WAR': 9.2
    },
    trendData: [
      { game: 'vs NYY', metric1: 2, metric2: 4 },
      { game: 'vs SD', metric1: 1, metric2: 3 },
      { game: '@ SF', metric1: 3, metric2: 5 },
      { game: '@ COL', metric1: 2, metric2: 4 },
      { game: 'vs ATL', metric1: 1, metric2: 2 },
    ],
    recentGames: [
      { date: 'Sep 20', opponent: 'vs NYY', result: 'W 6-4', statsText: '2-4, 1 HR, 3 RBI, 1 SB' },
      { date: 'Sep 19', opponent: 'vs SD', result: 'W 4-2', statsText: '1-3, 1 HR, 2 RBI' },
    ]
  },
  {
    id: 'lionel-messi',
    name: 'Lionel Messi',
    sport: 'mls',
    teamId: 'inter-miami',
    teamName: 'Inter Miami CF',
    position: 'Forward',
    number: 10,
    avatar: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&auto=format&fit=crop&q=80',
    height: '5\'7"',
    weight: '148 lbs',
    age: 37,
    experience: '2nd MLS Season',
    birthplace: 'Rosario, Argentina',
    stats: {
      'Goals': 20,
      'Assists': 16,
      'Shots on Goal': 48,
      'Pass Acc %': '86.4%',
      'Key Passes': 62,
      'Match Rating': 8.8
    },
    trendData: [
      { game: 'vs LAG', metric1: 2, metric2: 1 },
      { game: '@ CLB', metric1: 1, metric2: 2 },
      { game: 'vs NYC', metric1: 2, metric2: 0 },
      { game: '@ CIN', metric1: 1, metric2: 1 },
      { game: 'vs ORL', metric1: 3, metric2: 1 },
    ],
    recentGames: [
      { date: 'Sep 19', opponent: 'vs LAG', result: 'W 3-1', statsText: '2 G, 1 A, 5 Shots' },
      { date: 'Sep 14', opponent: '@ CLB', result: 'W 2-2', statsText: '1 G, 1 A' },
    ]
  },
  {
    id: 'connor-mcdavid',
    name: 'Connor McDavid',
    sport: 'nhl',
    teamId: 'oilers',
    teamName: 'Edmonton Oilers',
    position: 'Center',
    number: 97,
    avatar: 'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?w=200&auto=format&fit=crop&q=80',
    height: '6\'1"',
    weight: '193 lbs',
    age: 28,
    experience: '10th Season',
    birthplace: 'Richmond Hill, Canada',
    stats: {
      'Goals': 44,
      'Assists': 88,
      'Points': 132,
      '+/-': '+35',
      'PPG': 18,
      'TOI/G': '22:15'
    },
    trendData: [
      { game: 'vs TOR', metric1: 2, metric2: 3 },
      { game: '@ CGY', metric1: 1, metric2: 2 },
      { game: 'vs VAN', metric1: 3, metric2: 1 },
      { game: '@ VGK', metric1: 1, metric2: 3 },
      { game: 'vs LAK', metric1: 2, metric2: 2 },
    ],
    recentGames: [
      { date: 'Sep 18', opponent: 'vs TOR', result: 'W 5-2', statsText: '2 G, 3 A, 7 Shots' },
      { date: 'Sep 15', opponent: '@ CGY', result: 'W 4-1', statsText: '1 G, 2 A' },
    ]
  }
];

export const MOCK_FIGHTERS: Fighter[] = [
  {
    id: 'canelo-alvarez',
    name: 'Canelo Alvarez',
    nickname: 'El Canelo',
    sport: 'boxing',
    weightClass: 'Super Middleweight',
    avatar: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=200&auto=format&fit=crop&q=80',
    record: { wins: 61, losses: 2, draws: 2, kos: 39 },
    height: '5\'8"',
    reach: '70.5 in',
    stance: 'Orthodox',
    age: 34,
    country: 'Mexico',
    rank: 'Undisputed Champion',
    strikingAccuracy: '48.5%',
    sigStrikesPerMin: '14.2',
    careerLog: [
      { date: 'May 2024', opponent: 'Jaime Munguia', result: 'WIN', method: 'UD (12 Rounds)', round: '12' },
      { date: 'Sep 2023', opponent: 'Jermell Charlo', result: 'WIN', method: 'UD (12 Rounds)', round: '12' },
      { date: 'May 2023', opponent: 'John Ryder', result: 'WIN', method: 'UD (12 Rounds)', round: '12' },
      { date: 'Sep 2022', opponent: 'Gennadiy Golovkin III', result: 'WIN', method: 'UD (12 Rounds)', round: '12' },
    ]
  },
  {
    id: 'jon-jones',
    name: 'Jon Jones',
    nickname: 'Bones',
    sport: 'mma',
    weightClass: 'Heavyweight',
    avatar: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=200&auto=format&fit=crop&q=80',
    record: { wins: 27, losses: 1, draws: 0, kos: 10 },
    height: '6\'4"',
    reach: '84.5 in',
    stance: 'Orthodox',
    age: 37,
    country: 'USA',
    rank: 'Heavyweight Champion',
    strikingAccuracy: '57.9%',
    takedownAccuracy: '45.0%',
    sigStrikesPerMin: '4.3',
    submissionAvg: '0.8',
    careerLog: [
      { date: 'Nov 2024', opponent: 'Stipe Miocic', result: 'WIN', method: 'TKO (Spinning Back Kick)', round: '3' },
      { date: 'Mar 2023', opponent: 'Ciryl Gane', result: 'WIN', method: 'Submission (Guillotine)', round: '1' },
      { date: 'Feb 2020', opponent: 'Dominick Reyes', result: 'WIN', method: 'UD (5 Rounds)', round: '5' },
    ]
  }
];

export const MOCK_STANDINGS: Record<string, StandingRow[]> = {
  nba: [
    { rank: 1, teamId: 'celtics', teamName: 'Boston Celtics', teamCode: 'BOS', teamLogo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=80&auto=format&fit=crop&q=80', wins: 44, losses: 16, pct: '.733', gb: '-', diff: '+8.4', streak: 'W3', last10: '8-2' },
    { rank: 2, teamId: 'thunder', teamName: 'Oklahoma City Thunder', teamCode: 'OKC', teamLogo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=80&auto=format&fit=crop&q=80', wins: 43, losses: 17, pct: '.717', gb: '1.0', diff: '+7.9', streak: 'L1', last10: '7-3' },
    { rank: 3, teamId: 'nuggets', teamName: 'Denver Nuggets', teamCode: 'DEN', teamLogo: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=80&auto=format&fit=crop&q=80', wins: 40, losses: 20, pct: '.667', gb: '4.0', diff: '+5.2', streak: 'W2', last10: '6-4' },
    { rank: 4, teamId: 'lakers', teamName: 'Los Angeles Lakers', teamCode: 'LAL', teamLogo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=80&auto=format&fit=crop&q=80', wins: 38, losses: 22, pct: '.633', gb: '6.0', diff: '+5.4', streak: 'W4', last10: '8-2' },
    { rank: 5, teamId: 'timberwolves', teamName: 'Minnesota Timberwolves', teamCode: 'MIN', teamLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=80&auto=format&fit=crop&q=80', wins: 37, losses: 23, pct: '.617', gb: '7.0', diff: '+4.1', streak: 'L2', last10: '5-5' },
  ],
  nfl: [
    { rank: 1, teamId: 'chiefs', teamName: 'Kansas City Chiefs', teamCode: 'KC', teamLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=80&auto=format&fit=crop&q=80', wins: 12, losses: 3, pct: '.800', gb: '-', diff: '+124', streak: 'W2', last10: '8-2' },
    { rank: 2, teamId: 'bills', teamName: 'Buffalo Bills', teamCode: 'BUF', teamLogo: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=80&auto=format&fit=crop&q=80', wins: 11, losses: 4, pct: '.733', gb: '1.0', diff: '+98', streak: 'W3', last10: '7-3' },
    { rank: 3, teamId: 'ravens', teamName: 'Baltimore Ravens', teamCode: 'BAL', teamLogo: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=80&auto=format&fit=crop&q=80', wins: 10, losses: 5, pct: '.667', gb: '2.0', diff: '+85', streak: 'L1', last10: '6-4' },
    { rank: 4, teamId: 'niners', teamName: 'San Francisco 49ers', teamCode: 'SF', teamLogo: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=80&auto=format&fit=crop&q=80', wins: 11, losses: 4, pct: '.733', gb: '1.0', diff: '+105', streak: 'W4', last10: '8-2' },
  ],
  mlb: [
    { rank: 1, teamId: 'dodgers', teamName: 'Los Angeles Dodgers', teamCode: 'LAD', teamLogo: 'https://images.unsplash.com/photo-1562077772-3bd90403f7f0?w=80&auto=format&fit=crop&q=80', wins: 89, losses: 54, pct: '.622', gb: '-', diff: '+142', streak: 'W5', last10: '8-2' },
    { rank: 2, teamId: 'yankees', teamName: 'New York Yankees', teamCode: 'NYY', teamLogo: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=80&auto=format&fit=crop&q=80', wins: 86, losses: 57, pct: '.601', gb: '3.0', diff: '+118', streak: 'L2', last10: '6-4' },
    { rank: 3, teamId: 'phillies', teamName: 'Philadelphia Phillies', teamCode: 'PHI', teamLogo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=80&auto=format&fit=crop&q=80', wins: 85, losses: 58, pct: '.594', gb: '4.0', diff: '+92', streak: 'W1', last10: '7-3' },
  ],
  mls: [
    { rank: 1, teamId: 'inter-miami', teamName: 'Inter Miami CF', teamCode: 'MIA', teamLogo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=80&auto=format&fit=crop&q=80', wins: 19, losses: 4, draws: 5, pct: '.768', gb: '-', diff: '+32', streak: 'W3', last10: '8-1-1' },
    { rank: 2, teamId: 'columbus', teamName: 'Columbus Crew', teamCode: 'CLB', teamLogo: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=80&auto=format&fit=crop&q=80', wins: 16, losses: 6, draws: 6, pct: '.679', gb: '5.0', diff: '+21', streak: 'D1', last10: '6-2-2' },
    { rank: 3, teamId: 'la-galaxy', teamName: 'LA Galaxy', teamCode: 'LAG', teamLogo: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=80&auto=format&fit=crop&q=80', wins: 16, losses: 7, draws: 6, pct: '.655', gb: '6.0', diff: '+18', streak: 'L1', last10: '5-3-2' },
  ],
  nhl: [
    { rank: 1, teamId: 'panthers', teamName: 'Florida Panthers', teamCode: 'FLA', teamLogo: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=80&auto=format&fit=crop&q=80', wins: 47, losses: 20, draws: 4, pct: '.690', gb: '-', diff: '+54', streak: 'W2', last10: '7-3' },
    { rank: 2, teamId: 'oilers', teamName: 'Edmonton Oilers', teamCode: 'EDM', teamLogo: 'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?w=80&auto=format&fit=crop&q=80', wins: 45, losses: 21, draws: 5, pct: '.669', gb: '1.5', diff: '+48', streak: 'W1', last10: '7-3' },
    { rank: 3, teamId: 'rangers', teamName: 'New York Rangers', teamCode: 'NYR', teamLogo: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=80&auto=format&fit=crop&q=80', wins: 44, losses: 22, draws: 5, pct: '.655', gb: '2.5', diff: '+41', streak: 'L1', last10: '6-4' },
  ]
};
