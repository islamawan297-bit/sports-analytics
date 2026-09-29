'use client';

import React from 'react';
import Link from 'next/link';
import { StandingRow } from '@/types/sports';

interface StandingsTableProps {
  standings?: StandingRow[];
  sportName: string;
}

export function StandingsTable({ standings, sportName }: StandingsTableProps) {
  const list = Array.isArray(standings) ? standings : [];

  if (list.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 text-xs font-mono rounded-2xl border border-slate-800 bg-slate-950/80">
        No standings data available for {sportName}.
      </div>
    );
  }

  const isWinningStreak = (raw: any): boolean => {
    if (raw === null || raw === undefined) return false;
    if (typeof raw === 'number') return raw > 0;
    const s = String(raw).trim().toUpperCase();
    return s.startsWith('W');
  };

  const isDrawStreak = (raw: any): boolean => {
    if (raw === null || raw === undefined) return false;
    const s = String(raw).trim().toUpperCase();
    return s.startsWith('D');
  };

  const formatStreakText = (raw: any): string => {
    if (raw === null || raw === undefined || raw === '') return '-';
    if (typeof raw === 'number') {
      if (raw > 0) return `W${raw}`;
      if (raw < 0) return `L${Math.abs(raw)}`;
      return '0';
    }
    return String(raw);
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80">
      <table className="w-full text-left text-xs font-mono">
        <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
          <tr>
            <th className="py-3 px-4 font-semibold text-center w-12">#</th>
            <th className="py-3 px-4 font-semibold">Team</th>
            <th className="py-3 px-4 font-semibold text-center">W</th>
            <th className="py-3 px-4 font-semibold text-center">L</th>
            {list[0]?.draws !== undefined && (
              <th className="py-3 px-4 font-semibold text-center">D</th>
            )}
            <th className="py-3 px-4 font-semibold text-center">PCT</th>
            <th className="py-3 px-4 font-semibold text-center">DIFF</th>
            <th className="py-3 px-4 font-semibold text-center">STREAK</th>
            <th className="py-3 px-4 font-semibold text-center">L10</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 text-slate-300">
          {list.map((row, idx) => {
            const streakStr = formatStreakText(row?.streak);
            const isWin = isWinningStreak(row?.streak);
            const isDraw = isDrawStreak(row?.streak);

            return (
              <tr 
                key={row?.teamId || `row-${idx}`} 
                className="hover:bg-slate-900/60 transition-colors group"
              >
                <td className="py-3 px-4 text-center font-bold text-slate-500 group-hover:text-cyan-400">
                  {row?.rank ?? idx + 1}
                </td>
                <td className="py-3 px-4">
                  <Link href={`/team/${row?.teamId || ''}`} className="flex items-center gap-3 hover:text-cyan-400 font-sans font-bold text-slate-200">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 p-1 border border-slate-800 flex items-center justify-center">
                      <img src={row?.teamLogo || 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=120&auto=format&fit=crop&q=80'} alt={row?.teamName || 'Team'} className="w-full h-full object-cover rounded" />
                    </div>
                    <span>{row?.teamName || 'Team'}</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">{row?.teamCode || 'TM'}</span>
                  </Link>
                </td>
                <td className="py-3 px-4 text-center font-bold text-white">{row?.wins ?? 0}</td>
                <td className="py-3 px-4 text-center text-slate-400">{row?.losses ?? 0}</td>
                {row?.draws !== undefined && (
                  <td className="py-3 px-4 text-center text-slate-400">{row?.draws}</td>
                )}
                <td className="py-3 px-4 text-center font-bold text-cyan-400">{row?.pct ?? '.500'}</td>
                <td className="py-3 px-4 text-center text-slate-400">{row?.diff ?? '+0'}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    isWin
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : isDraw
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    {streakStr}
                  </span>
                </td>
                <td className="py-3 px-4 text-center text-slate-400">{row?.last10 ?? '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
