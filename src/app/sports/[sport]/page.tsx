'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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
import { 
  SPORTS_LIST, 
  MOCK_GAMES, 
  MOCK_FIGHTS, 
  MOCK_TEAMS, 
  MOCK_PLAYERS, 
  MOCK_FIGHTERS, 
  MOCK_STANDINGS 
} from '@/data/mockData';
import { SportType } from '@/types/sports';

export default function SportDetailPage({ params }: { params: { sport: string } }) {
  const sportId = params.sport as SportType;
  const currentSport = SPORTS_LIST.find((s) => s.id === sportId);

  const [activeTab, setActiveTab] = useState<string>('overview');

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

  // Filter content for this sport
  const sportGames = MOCK_GAMES.filter((g) => g.sport === sportId);
  const sportFights = MOCK_FIGHTS.filter((f) => f.sport === sportId);
  const sportTeams = MOCK_TEAMS.filter((t) => t.sport === sportId);
  const sportPlayers = MOCK_PLAYERS.filter((p) => p.sport === sportId);
  const sportFighters = MOCK_FIGHTERS.filter((f) => f.sport === sportId);
  const standings = MOCK_STANDINGS[sportId] || [];

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
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                  <span>{currentSport.name} Live & Upcoming Matches</span>
                </h2>
              </div>

              {currentSport.category === 'combat' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sportFights.length > 0 ? (
                    sportFights.map((fight) => (
                      <FighterComparisonCard key={fight.id} fight={fight} />
                    ))
                  ) : (
                    <div className="col-span-2 p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400 text-xs font-mono">
                      No live fights currently active for {currentSport.name}. Check upcoming title cards.
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sportGames.length > 0 ? (
                    sportGames.map((game) => (
                      <LiveGameCard key={game.id} game={game} />
                    ))
                  ) : (
                    <div className="col-span-3 p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400 text-xs font-mono">
                      No live matches currently active for {currentSport.name}.
                    </div>
                  )}
                </div>
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
