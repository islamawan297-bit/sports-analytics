'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Flame, Trophy, TrendingUp } from 'lucide-react';
import { Game } from '@/types/sports';

interface LiveGameCardProps {
  game: Game;
}

export function LiveGameCard({ game }: LiveGameCardProps) {
  const isLive = game.status === 'live';
  const isFinal = game.status === 'final';

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/40 relative overflow-hidden group">
      
      {/* Top Bar: Sport Tag + Game Status */}
      <div className="flex items-center justify-between mb-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono font-bold text-[10px] uppercase tracking-wide border border-slate-700">
            {game.sport}
          </span>
          <span className="text-slate-400 font-medium text-[11px] truncate max-w-[140px]">
            {game.venue}
          </span>
        </div>

        {isLive ? (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-live-pulse" />
            {game.periodText}
          </span>
        ) : isFinal ? (
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[11px]">
            FINAL
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-[11px] border border-blue-500/20">
            {game.startTime}
          </span>
        )}
      </div>

      {/* Main Teams Matchup & Score */}
      <div className="grid grid-cols-5 items-center gap-2 mb-5">
        
        {/* Home Team */}
        <div className="col-span-2 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-slate-900 p-1.5 border border-slate-800 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <img 
              src={game.homeTeam.logo} 
              alt={game.homeTeam.name} 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <Link href={`/team/${game.homeTeam.id}`} className="font-bold text-sm text-white hover:text-cyan-400 transition-colors line-clamp-1">
            {game.homeTeam.name}
          </Link>
          <span className="text-[11px] font-mono text-slate-400 mt-0.5">
            {game.homeTeam.record}
          </span>
        </div>

        {/* Center Scores / VS */}
        <div className="col-span-1 flex flex-col items-center justify-center">
          {isLive || isFinal ? (
            <div className="flex items-center justify-center gap-2 font-mono font-extrabold text-2xl tracking-tight text-white bg-slate-900/90 px-3 py-1 rounded-xl border border-slate-800">
              <span className={game.homeTeam.score > game.awayTeam.score ? 'text-cyan-400' : 'text-slate-300'}>
                {game.homeTeam.score}
              </span>
              <span className="text-slate-600 text-sm font-normal">:</span>
              <span className={game.awayTeam.score > game.homeTeam.score ? 'text-cyan-400' : 'text-slate-300'}>
                {game.awayTeam.score}
              </span>
            </div>
          ) : (
            <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-mono font-bold text-slate-400">
              VS
            </div>
          )}
        </div>

        {/* Away Team */}
        <div className="col-span-2 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-slate-900 p-1.5 border border-slate-800 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <img 
              src={game.awayTeam.logo} 
              alt={game.awayTeam.name} 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <Link href={`/team/${game.awayTeam.id}`} className="font-bold text-sm text-white hover:text-cyan-400 transition-colors line-clamp-1">
            {game.awayTeam.name}
          </Link>
          <span className="text-[11px] font-mono text-slate-400 mt-0.5">
            {game.awayTeam.record}
          </span>
        </div>

      </div>

      {/* Win Probability Bar */}
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>{game.homeTeam.code} {game.winProbability.home}%</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-cyan-400" /> WIN PROBABILITY
          </span>
          <span>{game.winProbability.away}% {game.awayTeam.code}</span>
        </div>
        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden flex border border-slate-800">
          <div
            className="h-full bg-cyan-500 transition-all duration-500"
            style={{ width: `${game.winProbability.home}%` }}
          />
          <div
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${game.winProbability.away}%` }}
          />
        </div>
      </div>

      {/* Footer Details & Link */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
          <span>Odds: {game.odds.homeOdds} / {game.odds.awayOdds}</span>
          {game.odds.spread && <span>Spread: {game.odds.spread}</span>}
        </div>
        <Link
          href={`/game/${game.id}`}
          className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-0.5 transition-all"
        >
          <span>Analytics</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
