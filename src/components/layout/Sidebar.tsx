'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Tv2, 
  Users, 
  UserCheck, 
  TrendingUp, 
  Sparkles,
  BarChart3,
  Trophy,
  Flame,
  Activity,
  Globe,
  Zap,
  Shield
} from 'lucide-react';
import { SPORTS_LIST, MOCK_TEAMS, MOCK_PLAYERS } from '@/data/mockData';

export function Sidebar() {
  const pathname = usePathname();

  const getSportIcon = (id: string) => {
    switch (id) {
      case 'nba': return <BarChart3 className="w-4 h-4 text-amber-400" />;
      case 'nfl': return <Trophy className="w-4 h-4 text-emerald-400" />;
      case 'mlb': return <Activity className="w-4 h-4 text-blue-400" />;
      case 'mls': return <Globe className="w-4 h-4 text-pink-400" />;
      case 'nhl': return <Zap className="w-4 h-4 text-cyan-400" />;
      case 'boxing': return <Shield className="w-4 h-4 text-red-400" />;
      case 'mma': return <Flame className="w-4 h-4 text-orange-400" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <aside className="hidden xl:flex flex-col w-64 border-r border-slate-800/80 bg-slate-950/60 p-4 space-y-6 shrink-0 min-h-[calc(100vh-4rem)]">
      
      {/* Platform Core Menu */}
      <div className="space-y-1">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 py-1">
          Platform Overview
        </div>
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
            pathname === '/dashboard'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Analytics Dashboard
        </Link>
        <Link
          href="/dashboard#live-games"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-all"
        >
          <span className="flex items-center gap-3">
            <Tv2 className="w-4 h-4 text-emerald-400" />
            Live Arena
          </span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
            3 LIVE
          </span>
        </Link>
      </div>

      {/* Sports Categories */}
      <div className="space-y-1">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 py-1 flex items-center justify-between">
          <span>Sports Coverage</span>
          <span className="text-[10px] text-slate-600">7 LEAGUES</span>
        </div>
        {SPORTS_LIST.map((sport) => {
          const isActive = pathname === `/sports/${sport.id}`;
          return (
            <Link
              key={sport.id}
              href={`/sports/${sport.id}`}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span className="flex items-center gap-3">
                {getSportIcon(sport.id)}
                {sport.name}
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                {sport.category === 'combat' ? 'COMBAT' : `${sport.activeTeamsCount} Teams`}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Featured Teams Quick Access */}
      <div className="space-y-1">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 py-1 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-cyan-400" />
          Featured Teams
        </div>
        {MOCK_TEAMS.map((team) => (
          <Link
            key={team.id}
            href={`/team/${team.id}`}
            className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all ${
              pathname === `/team/${team.id}`
                ? 'bg-cyan-500/10 text-cyan-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span className="truncate">{team.name}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 uppercase">
              {team.code}
            </span>
          </Link>
        ))}
      </div>

      {/* Featured Star Players */}
      <div className="space-y-1">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 py-1 flex items-center gap-1.5">
          <UserCheck className="w-3.5 h-3.5 text-amber-400" />
          Star Athletes
        </div>
        {MOCK_PLAYERS.map((player) => (
          <Link
            key={player.id}
            href={`/player/${player.id}`}
            className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all ${
              pathname === `/player/${player.id}`
                ? 'bg-amber-500/10 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span className="truncate">{player.name}</span>
            <span className="text-[10px] font-mono text-slate-500 uppercase">
              {player.sport}
            </span>
          </Link>
        ))}
      </div>

      {/* Pro Insights Banner */}
      <div className="mt-auto p-3.5 rounded-2xl bg-gradient-to-br from-cyan-950/60 to-slate-900 border border-cyan-500/20 text-xs">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-1">
          <Sparkles className="w-4 h-4" />
          AI Match Predictions
        </div>
        <p className="text-slate-400 text-[11px] leading-relaxed">
          Real-time win probability algorithms operating with 94.2% historical accuracy.
        </p>
      </div>

    </aside>
  );
}
