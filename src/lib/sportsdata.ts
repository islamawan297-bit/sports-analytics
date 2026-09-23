import { Game, Team, Player, StandingRow, SportType } from '@/types/sports';
import { MOCK_GAMES, MOCK_TEAMS, MOCK_PLAYERS, MOCK_STANDINGS } from '@/data/mockData';

const API_KEY = process.env.SPORTSDATA_API_KEY;

// Base Endpoints for SportsDataIO
const ENDPOINTS: Record<string, string> = {
  nba: 'https://api.sportsdata.io/v3/nba',
  nfl: 'https://api.sportsdata.io/v3/nfl',
  mlb: 'https://api.sportsdata.io/v3/mlb',
  nhl: 'https://api.sportsdata.io/v3/nhl',
  mls: 'https://api.sportsdata.io/v3/soccer',
};

async function fetchFromSportsDataIO(url: string) {
  if (!API_KEY) return null;
  try {
    const separator = url.includes('?') ? '&' : '?';
    const fullUrl = `${url}${separator}key=${API_KEY}`;
    const res = await fetch(fullUrl, {
      next: { revalidate: 60 }, // 60-second Next.js cache revalidation
      headers: {
        'Ocp-Apim-Subscription-Key': API_KEY,
      },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error(`SportsDataIO fetch error for ${url}:`, err);
    return null;
  }
}

/**
 * Fetch Live & Scheduled Games from SportsDataIO
 */
export async function getLiveGamesFromProvider(sport?: string): Promise<Game[]> {
  if (!API_KEY) {
    return sport ? MOCK_GAMES.filter((g) => g.sport === sport) : MOCK_GAMES;
  }

  const todayStr = new Date().toISOString().split('T')[0];
  const targetSports = sport && ENDPOINTS[sport] ? [sport] : ['nba', 'nfl', 'mlb', 'nhl', 'mls'];
  const allGames: Game[] = [];

  for (const s of targetSports) {
    if (s === 'boxing' || s === 'mma') {
      // SportsDataIO does not provide standard structured feeds for Boxing/MMA
      continue;
    }

    let rawGames: any[] | null = null;
    if (s === 'nba') rawGames = await fetchFromSportsDataIO(`${ENDPOINTS.nba}/scores/json/GamesByDate/${todayStr}`);
    else if (s === 'nfl') rawGames = await fetchFromSportsDataIO(`${ENDPOINTS.nfl}/scores/json/ScoresByDate/${todayStr}`);
    else if (s === 'mlb') rawGames = await fetchFromSportsDataIO(`${ENDPOINTS.mlb}/scores/json/GamesByDate/${todayStr}`);
    else if (s === 'nhl') rawGames = await fetchFromSportsDataIO(`${ENDPOINTS.nhl}/scores/json/GamesByDate/${todayStr}`);
    else if (s === 'mls') rawGames = await fetchFromSportsDataIO(`${ENDPOINTS.mls}/scores/json/Schedule/MLS/2025`);

    if (rawGames && Array.isArray(rawGames) && rawGames.length > 0) {
      const transformed = rawGames.map((g: any, idx: number) => {
        const isCompleted = g.IsClosed || g.Status === 'Final' || g.Status === 'F/OT';
        const isInProgress = g.InProgress || g.Status === 'InProgress' || g.Status === 'Live';
        
        const homeScore = g.HomeTeamScore ?? g.HomeScore ?? 0;
        const awayScore = g.AwayTeamScore ?? g.AwayScore ?? 0;
        
        return {
          id: `${s}-api-${g.GameID || g.MatchId || idx}`,
          sport: s as SportType,
          status: isInProgress ? ('live' as const) : isCompleted ? ('final' as const) : ('upcoming' as const),
          startTime: g.DateTime || g.Day || 'Today',
          venue: g.StadiumDetails?.Name || g.Venue || `${s.toUpperCase()} Arena`,
          periodText: isInProgress ? (g.Quarter || g.Period || 'In Progress') : isCompleted ? 'Final' : 'Scheduled',
          homeTeam: {
            id: (g.HomeTeam || g.HomeTeamKey || 'HOME').toLowerCase(),
            name: g.HomeTeamName || g.HomeTeam || 'Home Team',
            code: g.HomeTeam || g.HomeTeamKey || 'HOME',
            score: homeScore,
            logo: `https://images.unsplash.com/photo-1546519638-68e109498ffc?w=120&auto=format&fit=crop&q=80`,
            record: g.HomeTeamRecord || '10-4',
          },
          awayTeam: {
            id: (g.AwayTeam || g.AwayTeamKey || 'AWAY').toLowerCase(),
            name: g.AwayTeamName || g.AwayTeam || 'Away Team',
            code: g.AwayTeam || g.AwayTeamKey || 'AWAY',
            score: awayScore,
            logo: `https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=120&auto=format&fit=crop&q=80`,
            record: g.AwayTeamRecord || '8-6',
          },
          winProbability: {
            home: g.HomeTeamWinProbability || 54,
            away: g.AwayTeamWinProbability || 46,
          },
          odds: {
            homeOdds: g.HomeTeamMoneyLine ? `${g.HomeTeamMoneyLine}` : '-115',
            awayOdds: g.AwayTeamMoneyLine ? `${g.AwayTeamMoneyLine}` : '+105',
            spread: g.PointSpread ? `${g.PointSpread}` : '-3.5',
            overUnder: g.OverUnder ? `O/U ${g.OverUnder}` : 'O/U 218.5',
          },
          keyInsight: `Live ${s.toUpperCase()} feed provided by SportsDataIO API.`,
        };
      });
      allGames.push(...transformed);
    } else {
      // Fallback to mock data for this sport if API returned empty/scrambled array
      const mockFiltered = MOCK_GAMES.filter((g) => g.sport === s);
      allGames.push(...mockFiltered);
    }
  }

  // Include Boxing/MMA mock fights if requested or all sports requested
  if (!sport || sport === 'boxing' || sport === 'mma') {
    const mockFights = MOCK_GAMES.filter((g) => g.sport === 'boxing' || g.sport === 'mma');
    allGames.push(...mockFights);
  }

  return allGames.length > 0 ? allGames : MOCK_GAMES;
}

/**
 * Fetch Standings from SportsDataIO
 */
export async function getStandingsFromProvider(sport: string): Promise<StandingRow[]> {
  if (!API_KEY || !ENDPOINTS[sport] || sport === 'boxing' || sport === 'mma') {
    return MOCK_STANDINGS[sport] || [];
  }

  let rawStandings: any[] | null = null;
  const year = '2025';

  if (sport === 'nba') rawStandings = await fetchFromSportsDataIO(`${ENDPOINTS.nba}/scores/json/Standings/${year}`);
  else if (sport === 'nfl') rawStandings = await fetchFromSportsDataIO(`${ENDPOINTS.nfl}/scores/json/Standings/${year}`);
  else if (sport === 'mlb') rawStandings = await fetchFromSportsDataIO(`${ENDPOINTS.mlb}/scores/json/Standings/${year}`);
  else if (sport === 'nhl') rawStandings = await fetchFromSportsDataIO(`${ENDPOINTS.nhl}/scores/json/Standings/${year}`);
  else if (sport === 'mls') rawStandings = await fetchFromSportsDataIO(`${ENDPOINTS.mls}/scores/json/Standings/MLS`);

  if (rawStandings && Array.isArray(rawStandings) && rawStandings.length > 0) {
    return rawStandings.map((row: any, idx: number) => ({
      rank: row.Rank || idx + 1,
      teamId: (row.Key || row.Team || `team-${idx}`).toLowerCase(),
      teamName: row.Name || row.City || row.Team || 'Team',
      teamCode: row.Key || row.Team || 'TEAM',
      teamLogo: `https://images.unsplash.com/photo-1546519638-68e109498ffc?w=120&auto=format&fit=crop&q=80`,
      wins: row.Wins ?? 0,
      losses: row.Losses ?? 0,
      draws: row.Ties ?? row.Draws ?? 0,
      pct: row.Percentage ? row.Percentage.toFixed(3) : '.500',
      gb: row.GamesBehind !== undefined ? `${row.GamesBehind}` : '-',
      diff: row.NetPoints || row.PointsDifferential ? `${row.NetPoints || row.PointsDifferential}` : '+0',
      streak: row.Streak || 'W1',
      last10: row.LastTenWins !== undefined ? `${row.LastTenWins}-${row.LastTenLosses}` : '6-4',
    }));
  }

  return MOCK_STANDINGS[sport] || [];
}

/**
 * Fetch Teams & Rosters from SportsDataIO
 */
export async function getTeamsFromProvider(sport?: string): Promise<Team[]> {
  if (!API_KEY) {
    return sport ? MOCK_TEAMS.filter((t) => t.sport === sport) : MOCK_TEAMS;
  }

  const targetSports = sport && ENDPOINTS[sport] ? [sport] : ['nba', 'nfl', 'mlb', 'nhl', 'mls'];
  const allTeams: Team[] = [];

  for (const s of targetSports) {
    if (s === 'boxing' || s === 'mma') continue;

    const rawTeams = await fetchFromSportsDataIO(`${ENDPOINTS[s]}/scores/json/teams`);
    if (rawTeams && Array.isArray(rawTeams) && rawTeams.length > 0) {
      const transformed = rawTeams.map((t: any) => ({
        id: (t.Key || t.TeamID || t.Name).toLowerCase(),
        name: t.FullName || t.Name || t.City,
        shortName: t.Name || t.Key,
        code: t.Key || t.Abbreviation || 'TEAM',
        sport: s as SportType,
        logo: t.WikipediaLogoUrl || `https://images.unsplash.com/photo-1546519638-68e109498ffc?w=120&auto=format&fit=crop&q=80`,
        conference: t.Conference || 'East',
        division: t.Division || 'Atlantic',
        rank: 1,
        record: { wins: 30, losses: 15, pct: '.667', streak: 'W3' },
        color: t.PrimaryColor ? `#${t.PrimaryColor}` : '#06b6d4',
        stadium: t.StadiumDetails?.Name || 'Arena',
        established: 1990,
        coach: 'Head Coach',
        stats: { ppg: 112.5, oppg: 106.4, offenseRating: 114.2, defenseRating: 108.1, pace: 99.4 },
        radarData: [
          { subject: 'Offense', value: 88, leagueAvg: 75 },
          { subject: 'Defense', value: 82, leagueAvg: 75 },
          { subject: 'Pace', value: 78, leagueAvg: 75 },
          { subject: 'Rebounding', value: 85, leagueAvg: 75 },
          { subject: 'Efficiency', value: 90, leagueAvg: 75 },
        ],
      }));
      allTeams.push(...transformed);
    } else {
      allTeams.push(...MOCK_TEAMS.filter((t) => t.sport === s));
    }
  }

  return allTeams.length > 0 ? allTeams : MOCK_TEAMS;
}

/**
 * Fetch Players from SportsDataIO
 */
export async function getPlayersFromProvider(sport?: string, teamId?: string): Promise<Player[]> {
  if (!API_KEY) {
    return MOCK_PLAYERS.filter((p) => (!sport || p.sport === sport) && (!teamId || p.teamId === teamId));
  }

  const targetSport = sport && ENDPOINTS[sport] ? sport : 'nba';
  const rawPlayers = await fetchFromSportsDataIO(`${ENDPOINTS[targetSport]}/scores/json/Players`);

  if (rawPlayers && Array.isArray(rawPlayers) && rawPlayers.length > 0) {
    return rawPlayers.slice(0, 30).map((p: any) => ({
      id: `${targetSport}-player-${p.PlayerID || p.FirstName}`,
      name: p.FantasyAlarmPlayerID ? `${p.FirstName} ${p.LastName}` : p.Name || `${p.FirstName} ${p.LastName}`,
      sport: targetSport as SportType,
      teamId: (p.Team || 'team').toLowerCase(),
      teamName: p.Team || 'Team',
      position: p.Position || 'G',
      number: p.Jersey || 23,
      avatar: p.PhotoUrl || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      height: p.Height ? `${p.Height}"` : `6'6"`,
      weight: p.Weight ? `${p.Weight} lbs` : '215 lbs',
      age: p.Age || 26,
      experience: `${p.Experience || 3} Years`,
      birthplace: p.BirthCity || 'USA',
      stats: { PPG: 24.5, RPG: 6.2, APG: 5.8, 'FG%': '48.2%' },
      trendData: [
        { game: 'G1', metric1: 22, metric2: 5 },
        { game: 'G2', metric1: 28, metric2: 7 },
        { game: 'G3', metric1: 25, metric2: 6 },
        { game: 'G4', metric1: 31, metric2: 8 },
      ],
      recentGames: [
        { date: '2025-03-20', opponent: 'vs BOS', result: 'W 112-108', statsText: '28 PTS, 7 REB, 6 AST' },
        { date: '2025-03-18', opponent: '@ NYK', result: 'L 101-105', statsText: '22 PTS, 5 REB, 4 AST' },
      ],
    }));
  }

  return MOCK_PLAYERS.filter((p) => (!sport || p.sport === sport) && (!teamId || p.teamId === teamId));
}
