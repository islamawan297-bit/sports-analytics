import { Game, Fight, Team, Player, StandingRow, SportInfo } from '@/types/sports';
import { MOCK_GAMES, MOCK_FIGHTS, MOCK_TEAMS, MOCK_PLAYERS, MOCK_STANDINGS, SPORTS_LIST } from '@/data/mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  favorites?: string[];
  createdAt?: string;
}

export interface AuthResponse {
  message: string;
  accessToken: string;
  user: UserProfile;
}

export const api = {
  // Auth API
  async register(data: any): Promise<AuthResponse> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Registration failed.');
      }
      return await res.json();
    } catch (e: any) {
      if (e.message && !e.message.includes('fetch')) throw e;
      // Mock Fallback for local preview if server offline
      return {
        message: 'Mock registration successful.',
        accessToken: 'mock_jwt_token_sample',
        user: { id: 'mock-user-1', email: data.email, name: data.name, role: data.role || 'USER', favorites: [] },
      };
    }
  },

  async login(data: any): Promise<AuthResponse> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Invalid credentials.');
      }
      return await res.json();
    } catch (e: any) {
      if (e.message && !e.message.includes('fetch')) throw e;
      return {
        message: 'Mock login successful.',
        accessToken: 'mock_jwt_token_sample',
        user: {
          id: 'mock-user-1',
          email: data.email,
          name: data.email.includes('admin') ? 'System Admin' : 'Alex Rivera',
          role: data.email.includes('admin') ? 'ADMIN' : 'USER',
          favorites: ['lakers', 'chiefs'],
        },
      };
    }
  },

  async getProfile(token: string): Promise<UserProfile> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Unauthorized');
      return await res.json();
    } catch {
      return {
        id: 'mock-user-1',
        email: 'user@statsedge.pro',
        name: 'Alex Rivera',
        role: 'USER',
        favorites: ['lakers', 'chiefs'],
      };
    }
  },

  async updateProfile(token: string, data: { name?: string; password?: string }): Promise<UserProfile> {
    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to update profile.');
    }
    return await res.json();
  },

  async toggleFavorite(token: string, itemId: string): Promise<{ favorites: string[]; message: string }> {
    const res = await fetch(`${API_BASE_URL}/auth/favorites/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ itemId }),
    });
    if (!res.ok) throw new Error('Failed to toggle favorite');
    return await res.json();
  },

  // Sports & Data APIs
  async getSports(): Promise<SportInfo[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/sports`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.data || SPORTS_LIST;
      return list.map((s: any) => ({
        ...s,
        id: s.id as any,
      }));
    } catch {
      return SPORTS_LIST;
    }
  },

  async getGames(sportId?: string, status?: string, search?: string): Promise<Game[]> {
    try {
      const url = new URL(`${API_BASE_URL}/games`);
      if (sportId) url.searchParams.append('sport', sportId);
      if (status) url.searchParams.append('status', status);
      if (search) url.searchParams.append('search', search);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error();
      const body = await res.json();
      const list = Array.isArray(body) ? body : body.data || MOCK_GAMES;
      return list.map((g: any) => ({
        ...g,
        sport: (g.sport || g.sportId) as any,
      }));
    } catch {
      return MOCK_GAMES.filter((g) => {
        if (sportId && g.sport !== sportId) return false;
        if (status && g.status !== status) return false;
        if (search) {
          const q = search.toLowerCase();
          return g.homeTeam.name.toLowerCase().includes(q) || g.awayTeam.name.toLowerCase().includes(q);
        }
        return true;
      });
    }
  },

  async getGameById(id: string): Promise<Game | undefined> {
    try {
      const res = await fetch(`${API_BASE_URL}/games/${id}`);
      if (!res.ok) throw new Error();
      const g = await res.json();
      return {
        ...g,
        sport: (g.sport || g.sportId) as any,
      };
    } catch {
      return MOCK_GAMES.find((g) => g.id === id);
    }
  },

  async getFights(sportId?: string, search?: string): Promise<Fight[]> {
    try {
      const url = new URL(`${API_BASE_URL}/fights`);
      if (sportId) url.searchParams.append('sport', sportId);
      if (search) url.searchParams.append('search', search);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error();
      const body = await res.json();
      const list = Array.isArray(body) ? body : body.data || MOCK_FIGHTS;
      return list.map((f: any) => ({
        ...f,
        sport: (f.sport || f.sportId) as any,
      }));
    } catch {
      return MOCK_FIGHTS.filter((f) => (!sportId || f.sport === sportId));
    }
  },

  async getTeams(sportId?: string, search?: string): Promise<Team[]> {
    try {
      const url = new URL(`${API_BASE_URL}/teams`);
      if (sportId) url.searchParams.append('sport', sportId);
      if (search) url.searchParams.append('search', search);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error();
      const body = await res.json();
      const list = Array.isArray(body) ? body : body.data || MOCK_TEAMS;
      return list.map((t: any) => ({
        ...t,
        sport: (t.sport || t.sportId) as any,
      }));
    } catch {
      return MOCK_TEAMS.filter((t) => (!sportId || t.sport === sportId));
    }
  },

  async getPlayers(sportId?: string, teamId?: string, search?: string): Promise<Player[]> {
    try {
      const url = new URL(`${API_BASE_URL}/players`);
      if (sportId) url.searchParams.append('sport', sportId);
      if (teamId) url.searchParams.append('teamId', teamId);
      if (search) url.searchParams.append('search', search);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error();
      const body = await res.json();
      const list = Array.isArray(body) ? body : body.data || MOCK_PLAYERS;
      return list.map((p: any) => ({
        ...p,
        sport: (p.sport || p.sportId) as any,
      }));
    } catch {
      return MOCK_PLAYERS.filter((p) => {
        if (sportId && p.sport !== sportId) return false;
        if (teamId && p.teamId !== teamId) return false;
        return true;
      });
    }
  },

  async getStandings(sportId: string): Promise<StandingRow[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/standings/${sportId}`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return MOCK_STANDINGS[sportId] || [];
    }
  },

  // Analysis API
  async getGameAnalysis(gameId: string): Promise<any> {
    try {
      const res = await fetch(`${API_BASE_URL}/analysis/game/${gameId}`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return {
        statisticalEstimate: {
          homeWinProbability: 68.4,
          awayWinProbability: 31.6,
          predictedHomeScore: 110,
          predictedAwayScore: 104,
          predictedMargin: 'Home by 6.0',
          confidencePct: 76,
          uncertaintyMargin: '± 4.2 pts',
          isEstimate: true,
          label: 'Statistical Estimate',
          disclaimer:
            'Statistical estimates are model-driven probabilistic calculations based on historical team performance metrics. Results are not guaranteed outcomes.',
          keyDrivers: [
            'Home Net Rating (+4.7) vs Away Net Rating (+2.1)',
            'Home-court advantage metric adjustment (+2.8 pts)',
            'Recent 10-game offensive efficiency factor',
          ],
        },
        teamComparison: [
          { metric: 'Offensive Rating', homeValue: 116.5, awayValue: 122.1, advantage: 'away' },
          { metric: 'Defensive Rating', homeValue: 111.8, awayValue: 110.2, advantage: 'away' },
          { metric: 'Pace', homeValue: 99.4, awayValue: 98.1, advantage: 'home' },
          { metric: 'Points Per Game', homeValue: 117.8, awayValue: 120.6, advantage: 'away' },
          { metric: 'Opponent PPG', homeValue: 112.4, awayValue: 108.9, advantage: 'away' },
        ],
        injuries: [
          { playerId: 'inj-1', playerName: 'Anthony Davis', teamId: 'lakers', position: 'C', status: 'Questionable', detail: 'Ankle Sprain' },
          { playerId: 'inj-2', playerName: 'Kristaps Porzingis', teamId: 'celtics', position: 'PF', status: 'Out', detail: 'Calf Strain' },
        ],
      };
    }
  },

  async getHeadToHead(team1Id: string, team2Id: string): Promise<any> {
    try {
      const res = await fetch(`${API_BASE_URL}/analysis/h2h?team1=${team1Id}&team2=${team2Id}`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return {
        totalGames: 10,
        team1Wins: 6,
        team2Wins: 4,
        avgScore: { team1: 110.2, team2: 108.4 },
      };
    }
  },

  async getInjuries(sportId?: string): Promise<any[]> {
    try {
      const url = new URL(`${API_BASE_URL}/analysis/injuries`);
      if (sportId) url.searchParams.append('sport', sportId);
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return [
        { playerId: 'inj-1', playerName: 'Anthony Davis', teamId: 'lakers', position: 'C', status: 'Questionable', detail: 'Ankle Sprain' },
        { playerId: 'inj-2', playerName: 'Kristaps Porzingis', teamId: 'celtics', position: 'PF', status: 'Out', detail: 'Calf Strain' },
      ];
    }
  },
};
