import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Sports Analytics database...');

  // 1. Create Default Users (ADMIN and USER roles)
  const hashedAdminPassword = await bcrypt.hash('AdminPass123!', 10);
  const hashedUserPassword = await bcrypt.hash('UserPass123!', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@statsedge.pro' },
    update: {},
    create: {
      email: 'admin@statsedge.pro',
      password: hashedAdminPassword,
      name: 'System Admin',
      role: 'ADMIN',
      favorites: JSON.stringify(['lakers', 'chiefs', 'lebron-james']),
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@statsedge.pro' },
    update: {},
    create: {
      email: 'user@statsedge.pro',
      password: hashedUserPassword,
      name: 'Alex Rivera',
      role: 'USER',
      favorites: JSON.stringify(['dodgers', 'inter-miami', 'lionel-messi']),
    },
  });

  console.log('Users created:', admin.email, user.email);

  // 2. Seed Sports
  const sports = [
    { id: 'nba', name: 'NBA', category: 'ball', iconName: 'Dribble', description: 'National Basketball Association', seasonPeriod: '2025-2026 Regular Season', activeTeamsCount: 30 },
    { id: 'nfl', name: 'NFL', category: 'ball', iconName: 'Trophy', description: 'National Football League', seasonPeriod: '2025 Regular Season', activeTeamsCount: 32 },
    { id: 'mlb', name: 'MLB', category: 'ball', iconName: 'Activity', description: 'Major League Baseball', seasonPeriod: '2025 Pennant Race', activeTeamsCount: 30 },
    { id: 'mls', name: 'MLS', category: 'ball', iconName: 'Globe', description: 'Major League Soccer', seasonPeriod: '2025 MLS Cup Campaign', activeTeamsCount: 29 },
    { id: 'nhl', name: 'NHL', category: 'ball', iconName: 'Zap', description: 'National Hockey League', seasonPeriod: '2025 Stanley Cup Quest', activeTeamsCount: 32 },
    { id: 'boxing', name: 'Boxing', category: 'combat', iconName: 'Shield', description: 'World Championship Boxing', seasonPeriod: '2025 World Title Fights', activeTeamsCount: 12 },
    { id: 'mma', name: 'MMA', category: 'combat', iconName: 'Flame', description: 'UFC & Mixed Martial Arts', seasonPeriod: '2025 Octagon Series', activeTeamsCount: 14 },
  ];

  for (const s of sports) {
    await prisma.sport.upsert({
      where: { id: s.id },
      update: s,
      create: s,
    });
  }
  console.log('Sports seeded.');

  // 3. Seed Teams
  const teams = [
    {
      id: 'lakers',
      name: 'Los Angeles Lakers',
      shortName: 'Lakers',
      code: 'LAL',
      sportId: 'nba',
      logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=120&auto=format&fit=crop&q=80',
      conference: 'Western Conference',
      division: 'Pacific Division',
      rank: 4,
      wins: 38,
      losses: 22,
      pct: '.633',
      streak: 'W4',
      color: '#552583',
      stadium: 'Crypto.com Arena',
      established: 1947,
      coach: 'JJ Redick',
      stats: JSON.stringify({ ppg: 117.8, oppg: 112.4, offenseRating: 116.5, defenseRating: 111.8, pace: 99.4 }),
      radarData: JSON.stringify([
        { subject: 'Offense', value: 88, leagueAvg: 70 },
        { subject: 'Defense', value: 76, leagueAvg: 70 },
        { subject: 'Pace', value: 82, leagueAvg: 70 },
        { subject: '3PT Shooting', value: 72, leagueAvg: 70 },
        { subject: 'Rebounding', value: 84, leagueAvg: 70 },
        { subject: 'Clutch Play', value: 92, leagueAvg: 70 },
      ]),
    },
    {
      id: 'celtics',
      name: 'Boston Celtics',
      shortName: 'Celtics',
      code: 'BOS',
      sportId: 'nba',
      logo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=120&auto=format&fit=crop&q=80',
      conference: 'Eastern Conference',
      division: 'Atlantic Division',
      rank: 1,
      wins: 44,
      losses: 16,
      pct: '.733',
      streak: 'W6',
      color: '#007A33',
      stadium: 'TD Garden',
      established: 1946,
      coach: 'Joe Mazzulla',
      stats: JSON.stringify({ ppg: 120.6, oppg: 108.9, offenseRating: 122.1, defenseRating: 110.2, pace: 98.1 }),
      radarData: JSON.stringify([
        { subject: 'Offense', value: 95, leagueAvg: 70 },
        { subject: 'Defense', value: 90, leagueAvg: 70 },
        { subject: 'Pace', value: 78, leagueAvg: 70 },
        { subject: '3PT Shooting', value: 98, leagueAvg: 70 },
        { subject: 'Rebounding', value: 86, leagueAvg: 70 },
        { subject: 'Clutch Play', value: 88, leagueAvg: 70 },
      ]),
    },
    {
      id: 'chiefs',
      name: 'Kansas City Chiefs',
      shortName: 'Chiefs',
      code: 'KC',
      sportId: 'nfl',
      logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=120&auto=format&fit=crop&q=80',
      conference: 'AFC',
      division: 'AFC West',
      rank: 1,
      wins: 12,
      losses: 3,
      pct: '.800',
      streak: 'W2',
      color: '#E31837',
      stadium: 'GEHA Field at Arrowhead Stadium',
      established: 1960,
      coach: 'Andy Reid',
      stats: JSON.stringify({ ppg: 27.4, oppg: 17.6, offenseRating: 118.2, defenseRating: 105.4, pace: 68.2 }),
      radarData: JSON.stringify([
        { subject: 'Passing', value: 95, leagueAvg: 70 },
        { subject: 'Rushing', value: 75, leagueAvg: 70 },
        { subject: 'Red Zone EFF', value: 90, leagueAvg: 70 },
        { subject: 'Pass Defense', value: 88, leagueAvg: 70 },
        { subject: 'Turnovers Forced', value: 82, leagueAvg: 70 },
        { subject: 'Special Teams', value: 80, leagueAvg: 70 },
      ]),
    },
    {
      id: 'dodgers',
      name: 'Los Angeles Dodgers',
      shortName: 'Dodgers',
      code: 'LAD',
      sportId: 'mlb',
      logo: 'https://images.unsplash.com/photo-1562077772-3bd90403f7f0?w=120&auto=format&fit=crop&q=80',
      conference: 'National League',
      division: 'NL West',
      rank: 1,
      wins: 89,
      losses: 54,
      pct: '.622',
      streak: 'W5',
      color: '#005A9C',
      stadium: 'Dodger Stadium',
      established: 1883,
      coach: 'Dave Roberts',
      stats: JSON.stringify({ ppg: 5.4, oppg: 4.1, offenseRating: 122.0, defenseRating: 110.0, pace: 100 }),
      radarData: JSON.stringify([
        { subject: 'Batting AVG', value: 86, leagueAvg: 70 },
        { subject: 'Home Runs', value: 96, leagueAvg: 70 },
        { subject: 'Starting Pitching', value: 89, leagueAvg: 70 },
        { subject: 'Bullpen', value: 84, leagueAvg: 70 },
        { subject: 'Fielding', value: 88, leagueAvg: 70 },
        { subject: 'OBP', value: 92, leagueAvg: 70 },
      ]),
    },
  ];

  for (const t of teams) {
    await prisma.team.upsert({
      where: { id: t.id },
      update: t,
      create: t,
    });
  }
  console.log('Teams seeded.');

  // 4. Seed Players
  const players = [
    {
      id: 'lebron-james',
      name: 'LeBron James',
      sportId: 'nba',
      teamId: 'lakers',
      teamName: 'Los Angeles Lakers',
      position: 'SF / PF',
      number: 23,
      avatar: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=160&auto=format&fit=crop&q=80',
      height: '6\'9"',
      weight: '250 lbs',
      age: 40,
      experience: '22nd Season',
      birthplace: 'Akron, OH',
      stats: JSON.stringify({ ppg: '24.8', rpg: '7.8', apg: '8.4', per: '23.4', ts: '62.1%', usage: '28.5%' }),
      trendData: JSON.stringify([
        { game: 'vs BOS', pts: 31, reb: 9, ast: 11 },
        { game: '@ GSW', pts: 28, reb: 7, ast: 10 },
        { game: 'vs PHX', pts: 24, reb: 8, ast: 6 },
        { game: '@ DEN', pts: 26, reb: 10, ast: 9 },
        { game: 'vs MIN', pts: 29, reb: 6, ast: 12 },
      ]),
      recentGames: JSON.stringify([
        { opponent: 'Boston Celtics', date: 'Yesterday', points: 31, rebounds: 9, assists: 11, min: 34, outcome: 'W 108-105' },
        { opponent: 'Golden State Warriors', date: 'Oct 18', points: 28, rebounds: 7, assists: 10, min: 32, outcome: 'W 115-109' },
      ]),
    },
    {
      id: 'patrick-mahomes',
      name: 'Patrick Mahomes',
      sportId: 'nfl',
      teamId: 'chiefs',
      teamName: 'Kansas City Chiefs',
      position: 'QB',
      number: 15,
      avatar: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=160&auto=format&fit=crop&q=80',
      height: '6\'2"',
      weight: '225 lbs',
      age: 29,
      experience: '8th Season',
      birthplace: 'Tyler, TX',
      stats: JSON.stringify({ passYds: '4,183', passTd: '32', int: '8', qbr: '78.4', rating: '104.6' }),
      trendData: JSON.stringify([
        { game: 'vs BUF', pts: 28, reb: 0, ast: 3 },
        { game: '@ BAL', pts: 31, reb: 0, ast: 4 },
        { game: 'vs CIN', pts: 24, reb: 0, ast: 2 },
      ]),
      recentGames: JSON.stringify([
        { opponent: 'Buffalo Bills', date: 'Sunday', points: 28, rebounds: 0, assists: 3, min: 60, outcome: 'W 28-24' },
      ]),
    },
  ];

  for (const p of players) {
    await prisma.player.upsert({
      where: { id: p.id },
      update: p,
      create: p,
    });
  }
  console.log('Players seeded.');

  // 5. Seed Games
  const games = [
    {
      id: 'nba-game-1',
      sportId: 'nba',
      status: 'live',
      startTime: 'Today, 8:00 PM EST',
      venue: 'Crypto.com Arena, Los Angeles',
      periodText: 'Q4 - 03:45',
      homeTeam: JSON.stringify({ id: 'lakers', name: 'Los Angeles Lakers', code: 'LAL', score: 108, logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=120&auto=format&fit=crop&q=80', record: '38-22' }),
      awayTeam: JSON.stringify({ id: 'celtics', name: 'Boston Celtics', code: 'BOS', score: 105, logo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=120&auto=format&fit=crop&q=80', record: '44-16' }),
      winProbability: JSON.stringify({ home: 68.4, away: 31.6 }),
      odds: JSON.stringify({ homeOdds: '-145', awayOdds: '+125', spread: 'LAL -3.5', overUnder: '224.5' }),
      winProbabilityTimeline: JSON.stringify([
        { time: 'Q1 12:00', homeProb: 50.0, awayProb: 50.0, scoreText: '0-0' },
        { time: 'Q1 00:00', homeProb: 44.2, awayProb: 55.8, scoreText: '24-28' },
        { time: 'Q2 00:00', homeProb: 52.1, awayProb: 47.9, scoreText: '56-54' },
        { time: 'Q3 00:00', homeProb: 41.5, awayProb: 58.5, scoreText: '78-83' },
        { time: 'Q4 06:00', homeProb: 59.0, awayProb: 41.0, scoreText: '98-97' },
        { time: 'Q4 03:45', homeProb: 68.4, awayProb: 31.6, scoreText: '108-105' },
      ]),
      boxScorePeriods: JSON.stringify([
        { label: 'Q1', home: 24, away: 28 },
        { label: 'Q2', home: 32, away: 26 },
        { label: 'Q3', home: 22, away: 29 },
        { label: 'Q4', home: 30, away: 22 },
      ]),
      homeBoxScore: JSON.stringify([
        { playerId: 'lebron-james', playerName: 'LeBron James', position: 'SF', minutes: '34:12', points: 31, rebounds: 9, assists: 11, steals: 2, blocks: 1, fgText: '12-20', threePtText: '3-6', ftText: '4-5' },
      ]),
      awayBoxScore: JSON.stringify([
        { playerId: 'jayson-tatum', playerName: 'Jayson Tatum', position: 'PF', minutes: '36:10', points: 29, rebounds: 8, assists: 5, steals: 1, blocks: 1, fgText: '10-22', threePtText: '4-10', ftText: '5-6' },
      ]),
      playByPlay: JSON.stringify([
        { id: 'p1', time: '03:45', period: 'Q4', teamCode: 'LAL', description: 'LeBron James driving stepback 3pt jump shot MADE (31 PTS)', scoreText: '108-105', type: 'scoring' },
      ]),
      keyInsight: 'Lakers have closed the gap with a 10-2 run in the last 3 minutes led by LeBron James triple-double performance.',
    },
  ];

  for (const g of games) {
    await prisma.game.upsert({
      where: { id: g.id },
      update: g,
      create: g,
    });
  }
  console.log('Games seeded.');

  // 6. Seed Combat Fights
  const fights = [
    {
      id: 'boxing-fight-1',
      sportId: 'boxing',
      status: 'live',
      startTime: 'Tonight, 11:00 PM EST',
      venue: 'T-Mobile Arena, Las Vegas',
      weightClass: 'Super Middleweight Title (168 lbs)',
      roundsMax: 12,
      periodText: 'Round 8 of 12',
      fighter1: JSON.stringify({ id: 'canelo-alvarez', name: 'Canelo Alvarez', nickname: 'El Canelo', avatar: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=160&auto=format&fit=crop&q=80', record: '61-2-2 (39 KO)', score: 68, cornerColor: 'red', weightClass: 'Super Middleweight' }),
      fighter2: JSON.stringify({ id: 'terence-crawford', name: 'Terence Crawford', nickname: 'Bud', avatar: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=160&auto=format&fit=crop&q=80', record: '40-0-0 (31 KO)', score: 66, cornerColor: 'blue', weightClass: 'Super Middleweight' }),
      winProbability: JSON.stringify({ fighter1: 58.2, fighter2: 41.8 }),
      odds: JSON.stringify({ fighter1Odds: '-150', fighter2Odds: '+125', homeOdds: '-150', awayOdds: '+125' }),
      roundStats: JSON.stringify([
        { round: 1, fighter1Strikes: 14, fighter2Strikes: 11 },
        { round: 2, fighter1Strikes: 16, fighter2Strikes: 18 },
      ]),
      winProbabilityTimeline: JSON.stringify([
        { time: 'R1', homeProb: 50.0, awayProb: 50.0 },
        { time: 'R7', homeProb: 58.2, awayProb: 41.8 },
      ]),
      taleOfTheTape: JSON.stringify({
        height: ['5\'8"', '5\'8"'],
        reach: ['70.5 in', '74.0 in'],
        stance: ['Orthodox', 'Southpaw'],
        age: [34, 37],
        strikingAccuracy: ['48.5%', '46.8%'],
        knockoutRate: ['63.9%', '77.5%'],
      }),
      keyInsight: 'Canelo has landed 42 power body shots through 7 rounds, slowing Crawford down in the center.',
    },
  ];

  for (const f of fights) {
    await prisma.fight.upsert({
      where: { id: f.id },
      update: f,
      create: f,
    });
  }
  console.log('Fights seeded.');

  console.log('Database seeding complete successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
