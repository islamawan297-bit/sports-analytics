'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Trophy, 
  Flame, 
  Activity, 
  Users, 
  BarChart3, 
  UserCheck, 
  ArrowRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { SportSubHeader } from '@/components/layout/SportSubHeader';
import { LiveGameCard } from '@/components/dashboard/LiveGameCard';
import { FighterComparisonCard } from '@/components/sports/FighterComparisonCard';
import { StandingsTable } from '@/components/sports/StandingsTable';
import { StatRadarChart } from '@/components/charts/StatRadarChart';
import { Game, Fight, Team, Player, StandingRow, SportType } from '@/types/sports';
import { 
  SPORTS_LIST, 
  MOCK_GAMES, 
  MOCK_FIGHTS, 
  MOCK_TEAMS, 
  MOCK_PLAYERS, 
  MOCK_FIGHTERS, 
  MOCK_STANDINGS 
} from '@/data/mockData';

export default function SportClientPage({ params }: { params: { sport: string } }) {
  const sportId = params.sport as SportType;
  const currentSport = SPORTS_LIST.find((s) => s.id === sportId);

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [gameStatusFilter, setGameStatusFilter] = useState<'all' | 'live' | 'upcoming' | 'final'>('all');
  const [visibleLimit, setVisibleLimit] = useState<number>(12);
  const [apiGames, setApiGames] = useState<Game[]>([]);
  const [apiFights, setApiFights] = useState<Fight[]>([]);
  const [fightsUnavailable, setFightsUnavailable] = useState<boolean>(false);
  const [apiStandings, setApiStandings] = useState<StandingRow[]>([]);
  const [apiTeams, setApiTeams] = useState<Team[]>([]);
  const [apiPlayers, setApiPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchSportApiData() {
      if (!sportId) return;
      setLoading(true);
      try {
        const [gamesRes, fightsRes, standingsRes, teamsRes, playersRes] = await Promise.all([
          fetch(`/api/games?sport=${sportId}`),
          fetch(`/api/fights?sport=${sportId}`),
          fetch(`/api/standings/${sportId}`),
          fetch(`/api/teams?sport=${sportId}`),
          fetch(`/api/players?sport=${sportId}`)
        ]);

        if (gamesRes.ok) {
          const gamesData = await gamesRes.json();
          if (Array.isArray(gamesData) && gamesData.length > 0) setApiGames(gamesData);
        }
        if (fightsRes.ok) {
          const fightsJson = await fightsRes.json();
          const fightList = Array.isArray(fightsJson) ? fightsJson : fightsJson?.data || [];
          setApiFights(fightList);
          if (fightsJson?.isUnavailable || fightList.length === 0) {
            setFightsUnavailable(true);
          }
        }
        if (standingsRes.ok) {
          const standingsData = await standingsRes.json();
          if (Array.isArray(standingsData) && standingsData.length > 0) setApiStandings(standingsData);
        }
        if (teamsRes.ok) {
          const teamsData = await teamsRes.json();
          if (Array.isArray(teamsData) && teamsData.length > 0) setApiTeams(teamsData);
        }
        if (playersRes.ok) {
          const playersData = await playersRes.json();
          if (Array.isArray(playersData) && playersData.length > 0) setApiPlayers(playersData);
        }
      } catch (err) {
        console.error(`Failed to fetch API data for sport ${sportId}:`, err);
      } finally {
        setLoading(false);
      }
    }
    fetchSportApiData();
  }, [sportId]);

  if (!currentSport) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 text-center space-y-4">
        <h1 className="text-3xl font-bold text-white">Sport Category Not Found</h1>
        <p className="text-slate-400 text-sm">
          The sport category "{sportId}" is not available. Please check the league list.
        </p>
        <Link 
          href="/dashboard" 
          className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // Filter content for this sport (using real API data when available)
  const sportGames = apiGames.length > 0 ? apiGames : MOCK_GAMES.filter((g) => g.sport === sportId);
  const sportFights = apiFights;
  const sportTeams = apiTeams.length > 0 ? apiTeams : MOCK_TEAMS.filter((t) => t.sport === sportId);
  const sportPlayers = apiPlayers.length > 0 ? apiPlayers : MOCK_PLAYERS.filter((p) => p.sport === sportId);
  
  // Extract real fighters from active fights if available
  const realFighters = sportFights.flatMap((f) => [
    {
      id: f.fighter1.id,
      name: f.fighter1.name,
      nickname: f.fighter1.nickname || '',
      weightClass: f.weightClass,
      avatar: f.fighter1.avatar,
      record: { wins: parseInt(f.fighter1.record.split('-')[0] || '0', 10), losses: parseInt(f.fighter1.record.split('-')[1] || '0', 10), draws: 0, kos: 0 },
    },
    {
      id: f.fighter2.id,
      name: f.fighter2.name,
      nickname: f.fighter2.nickname || '',
      weightClass: f.weightClass,
      avatar: f.fighter2.avatar,
      record: { wins: parseInt(f.fighter2.record.split('-')[0] || '0', 10), losses: parseInt(f.fighter2.record.split('-')[1] || '0', 10), draws: 0, kos: 0 },
    },
  ]);

  const sportFighters = realFighters.length > 0 ? realFighters : MOCK_FIGHTERS.filter((f) => f.sport === sportId);
  const standings = apiStandings.length > 0 ? apiStandings : (MOCK_STANDINGS[sportId] || []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      
      {/* Sport Sub-Header with League Selector & Tabs */}
      <SportSubHeader 
        currentSport={currentSport} 
        activeTab={activeTab} 
        onTabChange={(t) => setActiveTab(t)} 
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <>
            {/* Quick Metrics Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400 font-mono">Season Campaign</div>
                <div className="text-base font-bold text-white mt-0.5">{currentSport.seasonPeriod}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400 font-mono">Category</div>
                <div className="text-base font-bold text-cyan-400 uppercase mt-0.5">{currentSport.category}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400 font-mono">Active Teams/Fighters</div>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">{currentSport.activeTeamsCount} Registered</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400 font-mono">Live Tracked</div>
                <div className="text-base font-bold text-amber-400 font-mono mt-0.5">
                  {currentSport.category === 'combat' ? `${sportFights.length} Fights` : `${sportGames.length} Games`}
                </div>
              </div>
            </div>

            {/* Live & Upcoming Matches or Fights */}
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                    <span>{currentSport.name} 2026 Season Schedule & Matches</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Showing real verified provider games for full 2026 season schedule.
                  </p>
                </div>

                {currentSport.category !== 'combat' && (
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                    <button
                      onClick={() => { setGameStatusFilter('all'); setVisibleLimit(12); }}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                        gameStatusFilter === 'all' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      All ({sportGames.length})
                    </button>
                    <button
                      onClick={() => { setGameStatusFilter('live'); setVisibleLimit(12); }}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                        gameStatusFilter === 'live' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-emerald-400 hover:text-white'
                      }`}
                    >
                      Live ({sportGames.filter((g) => g.status === 'live').length})
                    </button>
                    <button
                      onClick={() => { setGameStatusFilter('upcoming'); setVisibleLimit(12); }}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                        gameStatusFilter === 'upcoming' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      Upcoming ({sportGames.filter((g) => g.status === 'upcoming').length})
                    </button>
                    <button
                      onClick={() => { setGameStatusFilter('final'); setVisibleLimit(12); }}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                        gameStatusFilter === 'final' ? 'bg-indigo-500 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      Completed ({sportGames.filter((g) => g.status === 'final').length})
                    </button>
                  </div>
                )}
              </div>

              {currentSport.category === 'combat' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sportFights.length > 0 ? (
                    sportFights.map((fight) => (
                      <FighterComparisonCard key={fight.id} fight={fight} />
                    ))
                  ) : (
                    <div className="col-span-2 p-8 text-center bg-slate-900/80 rounded-2xl border border-amber-500/30 space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold uppercase">
                        Combat Data Unavailable
                      </div>
                      <h3 className="text-sm font-semibold text-white">No Active Provider Fight Cards Currently Scheduled</h3>
                      <p className="text-xs text-slate-400 font-mono max-w-md mx-auto">
                        Official fight schedules and statistics for {currentSport.name} are updated dynamically as soon as external licensed provider feeds publish bout arrangements.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {(() => {
                    const filtered = sportGames.filter((g) => gameStatusFilter === 'all' || g.status === gameStatusFilter);
                    const paginated = filtered.slice(0, visibleLimit);

                    if (filtered.length === 0) {
                      return (
                        <div className="p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400 text-xs font-mono">
                          No {gameStatusFilter !== 'all' ? gameStatusFilter : ''} matches found for {currentSport.name}.
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {paginated.map((game) => (
                            <LiveGameCard key={game.id} game={game} />
                          ))}
                        </div>

                        {visibleLimit < filtered.length && (
                          <div className="text-center pt-2">
                            <button
                              onClick={() => setVisibleLimit((prev) => prev + 12)}
                              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 font-mono text-xs font-bold transition-all hover:border-cyan-500/40"
                            >
                              Load More 2026 Season Matches ({filtered.length - visibleLimit} remaining)
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </>
              )}
            </section>

            {/* Division Standings / Combat Rankings */}
            <section className="space-y-4 pt-4 border-t border-slate-800">
              <h2 className="text-xl font-black text-white uppercase tracking-tight">
                {currentSport.category === 'combat' ? `${currentSport.name} World Rankings` : `${currentSport.name} Division Standings`}
              </h2>
              {currentSport.category === 'combat' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sportFighters.map((f) => (
                    <div key={f.id} className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
                      <img src={f.avatar} alt={f.name} className="w-16 h-16 rounded-full object-cover border-2 border-red-500" />
                      <div>
                        <div className="font-bold text-white text-base">{f.name}</div>
                        <div className="text-xs font-mono text-red-400">"{f.nickname}" • {f.weightClass}</div>
                        <div className="text-xs text-slate-400 font-mono mt-1">Record: {f.record.wins}-{f.record.losses}-{f.record.draws} ({f.record.kos} KO)</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <StandingsTable standings={standings} sportName={currentSport.name} />
              )}
            </section>

            {/* Featured Team Radar & Player Cards */}
            {sportTeams.length > 0 && (
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4 border-t border-slate-800">
                <div className="lg:col-span-1 glass-card p-5 rounded-2xl border border-slate-800">
                  <h3 className="font-bold text-white text-base mb-4">
                    {sportTeams[0].name} Performance Radar
                  </h3>
                  <StatRadarChart
                    data={sportTeams[0].radarData}
                    teamName={sportTeams[0].name}
                    color="#06b6d4"
                  />
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <h3 className="font-bold text-white text-base">
                    Featured Athletes & Top Star Profiles
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sportPlayers.map((player) => (
                      <Link
                        key={player.id}
                        href={`/player/${player.id}`}
                        className="glass-card p-4 rounded-2xl border border-slate-800 hover:border-cyan-500/40 flex items-center gap-4 group transition-all"
                      >
                        <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 p-1 flex items-center justify-center overflow-hidden shrink-0">
                          <img src={player.avatar} alt={player.name} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-white group-hover:text-cyan-400 transition-colors truncate">
                            {player.name}
                          </div>
                          <div className="text-xs text-slate-400">
                            {player.teamName} • #{player.number}
                          </div>
                          <div className="text-[11px] font-mono text-cyan-400 mt-1">
                            {Object.entries(player.stats).slice(0, 3).map(([k, v]) => `${k}: ${v}`).join(' | ')}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}

          </>
        )}

        {/* TAB 2: LIVE & GAMES */}
        {activeTab === 'live' && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white">Live Games & Scheduled Matches</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sportGames.map((game) => (
                <LiveGameCard key={game.id} game={game} />
              ))}
            </div>
          </section>
        )}

        {/* TAB 3: STANDINGS / RANKINGS */}
        {activeTab === 'standings' && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white">Full League Standings & Records</h2>
            <StandingsTable standings={standings} sportName={currentSport.name} />
          </section>
        )}

        {/* TAB 4: STAT LEADERS */}
        {activeTab === 'leaders' && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white">League Stat Leaders</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sportPlayers.map((player) => (
                <div key={player.id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={player.avatar} alt={player.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <div className="font-bold text-white text-sm">{player.name}</div>
                      <div className="text-xs text-slate-400">{player.position} • {player.teamName}</div>
                    </div>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs font-mono">
                    {Object.entries(player.stats).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-500">{key}</span>
                        <span className="font-bold text-cyan-400">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
