'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Activity, 
  Search, 
  Flame, 
  Trophy, 
  TrendingUp, 
  Users, 
  Sparkles,
  BarChart3,
  Filter,
  ArrowRight
} from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { LiveGameCard } from '@/components/dashboard/LiveGameCard';
import { FighterComparisonCard } from '@/components/sports/FighterComparisonCard';
import { StandingsTable } from '@/components/sports/StandingsTable';
import { MOCK_GAMES, MOCK_FIGHTS, MOCK_STANDINGS, SPORTS_LIST } from '@/data/mockData';

export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Filter games based on selected category
  const filteredGames = MOCK_GAMES.filter((g) => {
    if (selectedCategory === 'live') return g.status === 'live';
    if (selectedCategory === 'all') return true;
    return g.sport === selectedCategory;
  }).filter((g) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      g.homeTeam.name.toLowerCase().includes(q) ||
      g.awayTeam.name.toLowerCase().includes(q) ||
      g.sport.toLowerCase().includes(q)
    );
  });

  const filteredFights = MOCK_FIGHTS.filter((f) => {
    if (selectedCategory === 'live') return f.status === 'live';
    if (selectedCategory === 'all') return true;
    return f.sport === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col xl:flex-row">
      
      {/* Desktop Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
        
        {/* Top Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                Sports Analytics Dashboard
              </h1>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-live-pulse" />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Real-time score updates, live win probability shifts, and league standings.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter matches or teams..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
            />
          </div>
        </div>

        {/* Top Analytics Metrics Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-mono">Live Matches</div>
              <div className="text-xl font-black text-white font-mono">3 Active</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-mono">Top Probability Shift</div>
              <div className="text-xl font-black text-cyan-400 font-mono">+34.2% LAL</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-mono">AI Accuracy</div>
              <div className="text-xl font-black text-white font-mono">94.2%</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-mono">Covered Leagues</div>
              <div className="text-xl font-black text-white font-mono">7 Sports</div>
            </div>
          </div>
        </div>

        {/* Sport Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-slate-800/80">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-cyan-500 text-slate-950 shadow-glow'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            All Sports
          </button>
          
          <button
            onClick={() => setSelectedCategory('live')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === 'live'
                ? 'bg-emerald-500 text-slate-950 shadow-glow'
                : 'bg-slate-900 text-emerald-400 hover:bg-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Only
          </button>

          {SPORTS_LIST.map((sport) => (
            <button
              key={sport.id}
              onClick={() => setSelectedCategory(sport.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
                selectedCategory === sport.id
                  ? 'bg-cyan-500 text-slate-950 shadow-glow'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {sport.name}
            </button>
          ))}
        </div>

        {/* Live & Upcoming Matches Grid */}
        <section id="live-games" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <span>Featured Matchups & Live Games</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400 text-xs font-mono">
                {filteredGames.length} Matches
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <LiveGameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Combat Sports Spotlight Section */}
        {(selectedCategory === 'all' || selectedCategory === 'boxing' || selectedCategory === 'mma' || selectedCategory === 'live') && (
          <section className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-red-500" />
                <span>Combat Sports Main Events (Boxing & MMA)</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFights.map((fight) => (
                <FighterComparisonCard key={fight.id} fight={fight} />
              ))}
            </div>
          </section>
        )}

        {/* League Standings Summary */}
        <section className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-white">
                NBA Eastern / Western Conference Standings
              </h2>
              <p className="text-xs text-slate-400">
                Top teams by win percentage, streak, and differential.
              </p>
            </div>
            <Link 
              href="/sports/nba"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>Full Standings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <StandingsTable standings={MOCK_STANDINGS.nba} sportName="NBA" />
        </section>

      </main>
    </div>
  );
}
