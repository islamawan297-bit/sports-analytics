'use client';

import React from 'react';
import Link from 'next/link';
import { StandingRow } from '@/types/sports';

interface StandingsTableProps {
  standings: StandingRow[];
  sportName: string;
}

export function StandingsTable({ standings, sportName }: StandingsTableProps) {
  if (!standings || standings.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 text-xs font-mono">
        No standings data available for {sportName}.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80">
      <table className="w-full text-left text-xs font-mono">
        <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
          <tr>
            <th className="py-3 px-4 font-semibold text-center w-12">#</th>
            <th className="py-3 px-4 font-semibold">Team</th>
            <th className="py-3 px-4 font-semibold text-center">W</th>
            <th className="py-3 px-4 font-semibold text-center">L</th>
            {standings[0]?.draws !== undefined && (
              <th className="py-3 px-4 font-semibold text-center">D</th>
            )}
            <th className="py-3 px-4 font-semibold text-center">PCT</th>
            <th className="py-3 px-4 font-semibold text-center">DIFF</th>
            <th className="py-3 px-4 font-semibold text-center">STREAK</th>
            <th className="py-3 px-4 font-semibold text-center">L10</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 text-slate-300">
          {standings.map((row) => (
            <tr 
              key={row.teamId} 
              className="hover:bg-slate-900/60 transition-colors group"
            >
              <td className="py-3 px-4 text-center font-bold text-slate-500 group-hover:text-cyan-400">
                {row.rank}
              </td>
              <td className="py-3 px-4">
                <Link href={`/team/${row.teamId}`} className="flex items-center gap-3 hover:text-cyan-400 font-sans font-bold text-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 p-1 border border-slate-800 flex items-center justify-center">
                    <img src={row.teamLogo} alt={row.teamName} className="w-full h-full object-cover rounded" />
                  </div>
                  <span>{row.teamName}</span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">{row.teamCode}</span>
                </Link>
              </td>
              <td className="py-3 px-4 text-center font-bold text-white">{row.wins}</td>
              <td className="py-3 px-4 text-center text-slate-400">{row.losses}</td>
              {row.draws !== undefined && (
                <td className="py-3 px-4 text-center text-slate-400">{row.draws}</td>
              )}
              <td className="py-3 px-4 text-center font-bold text-cyan-400">{row.pct}</td>
              <td className="py-3 px-4 text-center text-slate-400">{row.diff}</td>
              <td className="py-3 px-4 text-center">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  row.streak.startsWith('W')
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}>
                  {row.streak}
                </span>
              </td>
              <td className="py-3 px-4 text-center text-slate-400">{row.last10}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
