'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trophy, MapPin, Users, Activity, BarChart3 } from 'lucide-react';
import { MOCK_TEAMS, MOCK_PLAYERS } from '@/data/mockData';
import { StatRadarChart } from '@/components/charts/StatRadarChart';
import { PerformanceTrendChart } from '@/components/analysis/PerformanceTrendChart';
import { api } from '@/lib/api';

export default function TeamClientPage({ params }: { params: { id: string } }) {
  const teamId = params.id;
  const [team, setTeam] = useState<any>(null);
  const [teamPlayers, setTeamPlayers] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const teams = await api.getTeams();
      const t = teams.find((x) => x.id === teamId);
      if (t) setTeam(t);
      else setTeam(MOCK_TEAMS.find((x) => x.id === teamId));

      const players = await api.getPlayers(undefined, teamId);
      setTeamPlayers(players.length > 0 ? players : MOCK_PLAYERS.filter((p) => p.teamId === teamId));
    }
    load();
  }, [teamId]);

  const currentTeam = team || MOCK_TEAMS.find((t) => t.id === teamId);

  if (!currentTeam) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 text-center space-y-4">
        <h1 className="text-3xl font-bold text-white">Team Profile Not Found</h1>
        <p className="text-slate-400 text-sm">
          No team matching ID "{teamId}" was found in our sports directory.
        </p>
        <Link href="/dashboard" className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      
      {/* Top Nav */}
      <div className="bg-slate-900/80 border-b border-slate-800 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href={`/sports/${currentTeam.sport}`} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {currentTeam.sport.toUpperCase()}</span>
          </Link>
          <span className="font-mono text-xs text-cyan-400 font-bold">{currentTeam.conference} • {currentTeam.division}</span>
        </div>
      </div>

      {/* Team Header Hero Banner */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-slate-900 p-3 border-2 border-slate-800 shadow-glow flex items-center justify-center shrink-0">
            <img src={currentTeam.logo} alt={currentTeam.name} className="w-full h-full object-cover rounded-2xl" />
          </div>
          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-xs font-bold uppercase">
                {currentTeam.code}
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                Streak: {currentTeam.record.streak}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">{currentTeam.name}</h1>
            <p className="text-xs text-slate-400 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <span>Stadium: <strong className="text-slate-200">{currentTeam.stadium}</strong></span>
              <span>Head Coach: <strong className="text-slate-200">{currentTeam.coach}</strong></span>
              <span>Est: <strong className="text-slate-200">{currentTeam.established}</strong></span>
            </p>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl text-center font-mono min-w-[140px]">
            <div className="text-xs text-slate-400">Season Record</div>
            <div className="text-2xl font-black text-cyan-400">{currentTeam.record.wins}-{currentTeam.record.losses}</div>
            <div className="text-[11px] text-slate-500">{currentTeam.record.pct} Win %</div>
          </div>
        </div>
      </section>

      {/* Main Team Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        
        {/* Performance Trend */}
        <PerformanceTrendChart title={`${currentTeam.name} 5-Game Scoring Trend`} />

        {/* Analytics Radar & Team Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Performance Radar */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <StatRadarChart
              data={currentTeam.radarData}
              title={`${currentTeam.name} Analytics Radar`}
              teamName={currentTeam.name}
              color="#06b6d4"
            />
          </div>

          {/* Core Stat Numbers */}
          <div className="space-y-4">
            <h2 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider">
              Season Analytics Summary
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono">
                <div className="text-xs text-slate-400">Points Per Game (PPG)</div>
                <div className="text-2xl font-black text-cyan-400 mt-1">{currentTeam.stats.ppg}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono">
                <div className="text-xs text-slate-400">Opponent PPG</div>
                <div className="text-2xl font-black text-rose-400 mt-1">{currentTeam.stats.oppg}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono">
                <div className="text-xs text-slate-400">Offensive Rating</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">{currentTeam.stats.offenseRating}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono">
                <div className="text-xs text-slate-400">Defensive Rating</div>
                <div className="text-2xl font-black text-amber-400 mt-1">{currentTeam.stats.defenseRating}</div>
              </div>
            </div>
          </div>

        </div>

        {/* Team Roster */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Active Roster & Star Athletes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {teamPlayers.map((player) => (
              <Link
                key={player.id}
                href={`/player/${player.id}`}
                className="glass-card p-4 rounded-2xl border border-slate-800 hover:border-cyan-500/40 flex items-center gap-4 group transition-all"
              >
                <img src={player.avatar} alt={player.name} className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <div className="font-bold text-white text-sm group-hover:text-cyan-400">{player.name}</div>
                  <div className="text-xs text-slate-400">#{player.number} • {player.position}</div>
                  <div className="text-[11px] font-mono text-cyan-400 mt-1">
                    {Object.entries(player.stats).slice(0, 2).map(([k, v]) => `${k}: ${v}`).join(' | ')}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
