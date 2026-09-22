'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Trophy, Calendar, MapPin, UserCheck, Activity, BarChart3 } from 'lucide-react';
import { MOCK_PLAYERS, MOCK_FIGHTERS } from '@/data/mockData';
import { ScoringTrendChart } from '@/components/charts/ScoringTrendChart';

export default function PlayerClientPage({ params }: { params: { id: string } }) {
  const playerId = params.id;
  const player = MOCK_PLAYERS.find((p) => p.id === playerId);
  const fighter = MOCK_FIGHTERS.find((f) => f.id === playerId);

  if (!player && !fighter) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 text-center space-y-4">
        <h1 className="text-3xl font-bold text-white">Athlete Profile Not Found</h1>
        <p className="text-slate-400 text-sm">
          No athlete profile matching ID "{playerId}" was found.
        </p>
        <Link href="/dashboard" className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // Combat Fighter View
  if (fighter) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
        <div className="bg-slate-900/80 border-b border-slate-800 py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href={`/sports/${fighter.sport}`} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to {fighter.sport.toUpperCase()}</span>
            </Link>
            <span className="font-mono text-xs text-red-400 font-bold">{fighter.rank}</span>
          </div>
        </div>

        {/* Fighter Banner */}
        <section className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 py-10 px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6">
            <img src={fighter.avatar} alt={fighter.name} className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-red-500 shadow-glow" />
            <div className="space-y-2 text-center md:text-left flex-1">
              <span className="text-xs font-mono text-red-400 font-bold">"{fighter.nickname}" • {fighter.weightClass}</span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">{fighter.name}</h1>
              <p className="text-xs text-slate-400 flex flex-wrap items-center justify-center md:justify-start gap-4 font-mono">
                <span>Height: <strong className="text-white">{fighter.height}</strong></span>
                <span>Reach: <strong className="text-white">{fighter.reach}</strong></span>
                <span>Stance: <strong className="text-white">{fighter.stance}</strong></span>
                <span>Country: <strong className="text-white">{fighter.country}</strong></span>
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-center font-mono min-w-[150px]">
              <div className="text-xs text-slate-400">Pro Record</div>
              <div className="text-2xl font-black text-red-500">{fighter.record.wins}-{fighter.record.losses}-{fighter.record.draws}</div>
              <div className="text-[11px] text-slate-400">{fighter.record.kos} Knockouts</div>
            </div>
          </div>
        </section>

        {/* Fight Log */}
        <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
          <h2 className="text-lg font-bold text-white">Career Fight History</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Opponent</th>
                  <th className="py-3 px-4">Result</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Round</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {fighter.careerLog.map((log, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-4 text-slate-400">{log.date}</td>
                    <td className="py-3 px-4 font-bold text-white">{log.opponent}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                        {log.result}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{log.method}</td>
                    <td className="py-3 px-4 text-slate-400">Rd {log.round}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    );
  }

  // Ball Athlete View
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      
      {/* Top Nav */}
      <div className="bg-slate-900/80 border-b border-slate-800 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href={`/sports/${player!.sport}`} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {player!.sport.toUpperCase()}</span>
          </Link>
          <span className="font-mono text-xs text-cyan-400 font-bold">{player!.teamName} • #{player!.number}</span>
        </div>
      </div>

      {/* Athlete Header */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <img src={player!.avatar} alt={player!.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-slate-800 shadow-glow" />
          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold uppercase">
                {player!.position}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {player!.experience}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">{player!.name}</h1>
            <p className="text-xs text-slate-400 flex flex-wrap items-center justify-center md:justify-start gap-4 font-mono">
              <span>Height: <strong className="text-slate-200">{player!.height}</strong></span>
              <span>Weight: <strong className="text-slate-200">{player!.weight}</strong></span>
              <span>Age: <strong className="text-slate-200">{player!.age}</strong></span>
              <span>Birthplace: <strong className="text-slate-200">{player!.birthplace}</strong></span>
            </p>
          </div>
        </div>
      </section>

      {/* Player Content: Stats Grid & Chart */}
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        
        {/* Stat Cards */}
        <section className="space-y-4">
          <h2 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-wider">
            Season Key Performance Indicators
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {Object.entries(player!.stats).map(([label, val]) => (
              <div key={label} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center font-mono">
                <div className="text-[11px] text-slate-400 uppercase">{label}</div>
                <div className="text-xl font-black text-cyan-400 mt-1">{val}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Scoring Trend Chart */}
        <section className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider">
            Recent Scoring & Output Trend
          </h2>
          <ScoringTrendChart data={player!.trendData} metricLabel="Points Output" color="#10b981" />
        </section>

        {/* Recent Game Log */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white">Recent Match Log</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Opponent</th>
                  <th className="py-3 px-4">Result</th>
                  <th className="py-3 px-4">Stats Summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {player!.recentGames.map((g, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-4 text-slate-400">{g.date}</td>
                    <td className="py-3 px-4 font-bold text-white">{g.opponent}</td>
                    <td className="py-3 px-4 text-cyan-400 font-bold">{g.result}</td>
                    <td className="py-3 px-4 text-slate-300">{g.statsText}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}
