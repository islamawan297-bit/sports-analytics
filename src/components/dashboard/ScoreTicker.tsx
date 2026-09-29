'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Radio } from 'lucide-react';
import { Game } from '@/types/sports';
import { MOCK_GAMES, MOCK_FIGHTS } from '@/data/mockData';

export function ScoreTicker() {
  const [games, setGames] = useState<Game[]>([]);
  const [fights, setFights] = useState<any[]>([]);

  useEffect(() => {
    async function loadTickerGames() {
      try {
        const [gamesRes, fightsRes] = await Promise.all([
          fetch('/api/games'),
          fetch('/api/fights'),
        ]);
        if (gamesRes.ok) {
          const data = await gamesRes.json();
          if (Array.isArray(data) && data.length > 0) setGames(data);
        }
        if (fightsRes.ok) {
          const fightsJson = await fightsRes.json();
          const fightList = Array.isArray(fightsJson) ? fightsJson : fightsJson?.data || [];
          setFights(fightList);
        }
      } catch (err) {
        console.error('Failed to load live ticker data:', err);
      }
    }
    loadTickerGames();
  }, []);

  const tickerGames = games.length > 0 ? games : MOCK_GAMES;
  const tickerFights = fights.length > 0 ? fights : [];

  return (
    <div className="w-full bg-slate-950 border-b border-slate-800/80 py-2.5 px-4 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-3 min-w-max">
        
        {/* Ticker Title */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>SCORES TICKER</span>
        </div>

        {/* Live & Recent Games Ticker */}
        {tickerGames.map((game) => (
          <Link
            key={game.id}
            href={`/game/${game.id}`}
            className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition-all text-xs group"
          >
            {/* Sport Tag */}
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase bg-slate-800 px-1.5 py-0.5 rounded">
              {game.sport}
            </span>

            {/* Teams & Score */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <span>{game.homeTeam.code}</span>
                <span className="font-mono text-cyan-400">{game.homeTeam.score}</span>
              </div>
              <span className="text-slate-600 font-mono text-[10px]">vs</span>
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <span className="font-mono text-cyan-400">{game.awayTeam.score}</span>
                <span>{game.awayTeam.code}</span>
              </div>
            </div>

            {/* Status */}
            {game.status === 'live' ? (
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-live-pulse" />
                {game.periodText}
              </span>
            ) : (
              <span className="text-[10px] font-mono text-slate-400">
                {game.periodText || game.status.toUpperCase()}
              </span>
            )}
          </Link>
        ))}

        {/* Real Provider Combat Fights Ticker */}
        {tickerFights.map((fight) => {
          if (!fight?.fighter1 || !fight?.fighter2) return null;
          const name1 = fight.fighter1.name?.split(' ')?.pop() || fight.fighter1.name;
          const name2 = fight.fighter2.name?.split(' ')?.pop() || fight.fighter2.name;

          return (
            <Link
              key={fight.id}
              href={`/game/${fight.id}`}
              className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition-all text-xs group"
            >
              <span className="font-mono text-[10px] font-bold text-red-400 uppercase bg-red-950/40 border border-red-800/40 px-1.5 py-0.5 rounded">
                {fight.sport}
              </span>
              <div className="flex items-center gap-2 font-semibold text-white">
                <span>{name1}</span>
                <span className="text-slate-600 font-mono text-[10px]">vs</span>
                <span>{name2}</span>
              </div>
              {fight.status === 'live' ? (
                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-live-pulse" />
                  {fight.periodText}
                </span>
              ) : (
                <span className="text-[10px] font-mono text-slate-400">
                  {fight.periodText || 'Scheduled'}
                </span>
              )}
            </Link>
          );
        })}

      </div>
    </div>
  );
}
