'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Users, UserCheck, Activity, ArrowRight } from 'lucide-react';
import { MOCK_TEAMS, MOCK_PLAYERS, MOCK_FIGHTERS, MOCK_GAMES } from '@/data/mockData';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [filterType, setFilterType] = useState<'all' | 'teams' | 'athletes' | 'games'>('all');

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const q = query.toLowerCase().trim();

  const matchingTeams = MOCK_TEAMS.filter(
    (t) => t.name.toLowerCase().includes(q) || t.code.toLowerCase().includes(q) || t.sport.toLowerCase().includes(q)
  );

  const matchingPlayers = MOCK_PLAYERS.filter(
    (p) => p.name.toLowerCase().includes(q) || p.teamName.toLowerCase().includes(q) || p.sport.toLowerCase().includes(q)
  );
  const matchingFighters = MOCK_FIGHTERS.filter(
    (f) => f.name.toLowerCase().includes(q) || f.nickname.toLowerCase().includes(q) || f.sport.toLowerCase().includes(q)
  );

  const matchingGames = MOCK_GAMES.filter(
    (g) =>
      g.homeTeam.name.toLowerCase().includes(q) ||
      g.awayTeam.name.toLowerCase().includes(q) ||
      g.sport.toLowerCase().includes(q)
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Search Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-black text-white">Global Sports Search</h1>
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search teams, players, fighters, or leagues..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 shadow-glow"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
            filterType === 'all' ? 'bg-cyan-500 text-slate-950 shadow-glow' : 'bg-slate-900 text-slate-400'
          }`}
        >
          All Results
        </button>
        <button
          onClick={() => setFilterType('teams')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
            filterType === 'teams' ? 'bg-cyan-500 text-slate-950 shadow-glow' : 'bg-slate-900 text-slate-400'
          }`}
        >
          Teams ({matchingTeams.length})
        </button>
        <button
          onClick={() => setFilterType('athletes')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
            filterType === 'athletes' ? 'bg-cyan-500 text-slate-950 shadow-glow' : 'bg-slate-900 text-slate-400'
          }`}
        >
          Athletes ({matchingPlayers.length + matchingFighters.length})
        </button>
        <button
          onClick={() => setFilterType('games')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
            filterType === 'games' ? 'bg-cyan-500 text-slate-950 shadow-glow' : 'bg-slate-900 text-slate-400'
          }`}
        >
          Games & Fights ({matchingGames.length})
        </button>
      </div>

      {/* Results Container */}
      <div className="space-y-8">
        
        {/* TEAMS */}
        {(filterType === 'all' || filterType === 'teams') && matchingTeams.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" /> Matching Teams
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {matchingTeams.map((team) => (
                <Link
                  key={team.id}
                  href={`/team/${team.id}`}
                  className="glass-card p-4 rounded-2xl border border-slate-800 hover:border-cyan-500/40 flex items-center gap-4 group transition-all"
                >
                  <img src={team.logo} alt={team.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <div className="font-bold text-white text-sm group-hover:text-cyan-400">{team.name}</div>
                    <div className="text-xs text-slate-400 uppercase">{team.sport} • {team.code}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ATHLETES */}
        {(filterType === 'all' || filterType === 'athletes') && (matchingPlayers.length > 0 || matchingFighters.length > 0) && (
          <div className="space-y-4">
            <h2 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-amber-400" /> Star Athletes & Fighters
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {matchingPlayers.map((player) => (
                <Link
                  key={player.id}
                  href={`/player/${player.id}`}
                  className="glass-card p-4 rounded-2xl border border-slate-800 hover:border-cyan-500/40 flex items-center gap-4 group transition-all"
                >
                  <img src={player.avatar} alt={player.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <div className="font-bold text-white text-sm group-hover:text-cyan-400">{player.name}</div>
                    <div className="text-xs text-slate-400">{player.position} • {player.teamName}</div>
                  </div>
                </Link>
              ))}
              {matchingFighters.map((f) => (
                <Link
                  key={f.id}
                  href={`/player/${f.id}`}
                  className="glass-card p-4 rounded-2xl border border-slate-800 hover:border-red-500/40 flex items-center gap-4 group transition-all"
                >
                  <img src={f.avatar} alt={f.name} className="w-12 h-12 rounded-full object-cover border-2 border-red-500" />
                  <div>
                    <div className="font-bold text-white text-sm group-hover:text-red-400">{f.name}</div>
                    <div className="text-xs text-slate-400">"{f.nickname}" • {f.weightClass}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* MATCHES */}
        {(filterType === 'all' || filterType === 'games') && matchingGames.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" /> Games & Matchups
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {matchingGames.map((game) => (
                <Link
                  key={game.id}
                  href={`/game/${game.id}`}
                  className="glass-card p-4 rounded-2xl border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between group transition-all"
                >
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold">{game.sport} • {game.status}</div>
                    <div className="font-bold text-white text-sm">{game.homeTeam.name} vs {game.awayTeam.name}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <Suspense fallback={<div className="p-8 text-center text-slate-400 text-xs font-mono">Loading sports search...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
