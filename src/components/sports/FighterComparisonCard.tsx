'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Flame, ArrowRight } from 'lucide-react';
import { Fight } from '@/types/sports';

interface FighterComparisonCardProps {
  fight: Fight;
}

export function FighterComparisonCard({ fight }: FighterComparisonCardProps) {
  const f1 = fight.fighter1;
  const f2 = fight.fighter2;
  const tape = fight.taleOfTheTape;

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-red-500/40 relative overflow-hidden group">
      
      {/* Header Tag */}
      <div className="flex items-center justify-between mb-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-red-950/60 text-red-400 font-mono font-bold text-[10px] uppercase border border-red-800/50 flex items-center gap-1">
            <Flame className="w-3 h-3" />
            {fight.sport}
          </span>
          <span className="text-slate-400 font-medium text-[11px]">
            {fight.weightClass}
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
          {fight.periodText}
        </span>
      </div>

      {/* Main Fighter Matchup */}
      <div className="grid grid-cols-5 items-center gap-3 mb-6">
        
        {/* Red Corner Fighter */}
        <div className="col-span-2 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-slate-900 p-1 border-2 border-red-500 shadow-glow flex items-center justify-center mb-2 overflow-hidden">
            <img 
              src={f1.avatar} 
              alt={f1.name} 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <Link href={`/player/${f1.id}`} className="font-bold text-sm text-white hover:text-red-400 transition-colors line-clamp-1">
            {f1.name}
          </Link>
          {f1.nickname && (
            <span className="text-[11px] font-mono text-red-400">"{f1.nickname}"</span>
          )}
          <span className="text-[10px] font-mono text-slate-400 mt-0.5">
            {f1.record}
          </span>
        </div>

        {/* Center VS */}
        <div className="col-span-1 flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-mono font-black text-red-500">
            VS
          </div>
          <span className="text-[10px] font-mono text-slate-500 mt-2">
            {fight.roundsMax} Rds
          </span>
        </div>

        {/* Blue Corner Fighter */}
        <div className="col-span-2 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-slate-900 p-1 border-2 border-blue-500 shadow-glow flex items-center justify-center mb-2 overflow-hidden">
            <img 
              src={f2.avatar} 
              alt={f2.name} 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <Link href={`/player/${f2.id}`} className="font-bold text-sm text-white hover:text-blue-400 transition-colors line-clamp-1">
            {f2.name}
          </Link>
          {f2.nickname && (
            <span className="text-[11px] font-mono text-blue-400">"{f2.nickname}"</span>
          )}
          <span className="text-[10px] font-mono text-slate-400 mt-0.5">
            {f2.record}
          </span>
        </div>

      </div>

      {/* Tale of the Tape Specs */}
      {tape && (
        <div className="space-y-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 mb-4 text-xs font-mono">
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest text-center border-b border-slate-800 pb-1">
            Tale of the Tape
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-red-400 font-bold">{tape.height[0]}</span>
            <span className="text-[11px] text-slate-500">HEIGHT</span>
            <span className="text-blue-400 font-bold">{tape.height[1]}</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-red-400 font-bold">{tape.reach[0]}</span>
            <span className="text-[11px] text-slate-500">REACH</span>
            <span className="text-blue-400 font-bold">{tape.reach[1]}</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-red-400 font-bold">{tape.knockoutRate[0]}</span>
            <span className="text-[11px] text-slate-500">KO RATE</span>
            <span className="text-blue-400 font-bold">{tape.knockoutRate[1]}</span>
          </div>
        </div>
      )}

      {/* Win Probability Bar */}
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="text-red-400">{fight.winProbability.fighter1}%</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest">
            FIGHT PROBABILITY
          </span>
          <span className="text-blue-400">{fight.winProbability.fighter2}%</span>
        </div>
        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden flex border border-slate-800">
          <div
            className="h-full bg-red-500 transition-all duration-500"
            style={{ width: `${fight.winProbability.fighter1}%` }}
          />
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${fight.winProbability.fighter2}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <span className="text-[11px] font-mono text-slate-400">
          Odds: {fight.odds.fighter1Odds} / {fight.odds.fighter2Odds}
        </span>
        <Link
          href={`/game/${fight.id}`}
          className="flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300 group-hover:translate-x-0.5 transition-all"
        >
          <span>Fight Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
