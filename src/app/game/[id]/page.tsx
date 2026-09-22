'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Activity, 
  TrendingUp, 
  Clock, 
  MapPin, 
  Sparkles, 
  BarChart3, 
  Tv2,
  Shield,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { MOCK_GAMES, MOCK_FIGHTS } from '@/data/mockData';
import { WinProbabilityChart } from '@/components/charts/WinProbabilityChart';
import { StatisticalEstimateBadge } from '@/components/analysis/StatisticalEstimateBadge';
import { HeadToHeadChart } from '@/components/analysis/HeadToHeadChart';
import { InjuryReportCard } from '@/components/analysis/InjuryReportCard';
import { api } from '@/lib/api';

export default function GameDetailPage({ params }: { params: { id: string } }) {
  const gameId = params.id;
  const [game, setGame] = useState<any>(null);
  const [fight, setFight] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'analytics' | 'boxscore' | 'playbyplay'>('analytics');

  useEffect(() => {
    async function loadData() {
      const g = await api.getGameById(gameId);
      if (g) setGame(g);
      else {
        const f = MOCK_FIGHTS.find((f) => f.id === gameId);
        if (f) setFight(f);
      }

      const ana = await api.getGameAnalysis(gameId);
      if (ana) setAnalysis(ana);
    }
    loadData();
  }, [gameId]);

  if (!game && !fight) {
    const fallbackGame = MOCK_GAMES.find((g) => g.id === gameId);
    const fallbackFight = MOCK_FIGHTS.find((f) => f.id === gameId);
    if (fallbackGame) setGame(fallbackGame);
    else if (fallbackFight) setFight(fallbackFight);
  }

  const currentGame = game || MOCK_GAMES.find((g) => g.id === gameId);
  const currentFight = fight || MOCK_FIGHTS.find((f) => f.id === gameId);

  if (!currentGame && !currentFight) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 text-center space-y-4">
        <h1 className="text-3xl font-bold text-white">Match Data Not Found</h1>
        <p className="text-slate-400 text-sm">
          No game or fight matching ID "{gameId}" was found in our database.
        </p>
        <Link 
          href="/dashboard" 
          className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // Render Combat Fight View
  if (currentFight) {
    const f1 = currentFight.fighter1;
    const f2 = currentFight.fighter2;

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
        
        {/* Top Back Navigation Bar */}
        <div className="bg-slate-900/80 border-b border-slate-800 py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link 
              href={`/sports/${currentFight.sport}`} 
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to {currentFight.sport.toUpperCase()} Hub</span>
            </Link>
            <div className="flex items-center gap-2 font-mono text-xs text-red-400">
              <Flame className="w-4 h-4" />
              <span>{currentFight.weightClass}</span>
            </div>
          </div>
        </div>

        {/* Fight Header Hero Banner */}
        <section className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 py-10 px-4">
          <div className="max-w-5xl mx-auto">
            
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400 mb-6">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>{currentFight.venue}</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">{currentFight.periodText}</span>
            </div>

            {/* Fighter Matchup Board */}
            <div className="grid grid-cols-5 items-center gap-4 text-center">
              
              {/* Red Corner */}
              <div className="col-span-2 flex flex-col items-center space-y-2">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-slate-900 border-4 border-red-500 shadow-glow overflow-hidden p-1">
                  <img src={f1.avatar} alt={f1.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <h1 className="text-lg sm:text-2xl font-black text-white">{f1.name}</h1>
                <div className="text-xs font-mono text-red-400">"{f1.nickname}"</div>
                <div className="text-xs font-mono text-slate-400">{f1.record}</div>
              </div>

              {/* Center VS */}
              <div className="col-span-1 flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-red-500 flex items-center justify-center font-black text-red-500 text-lg">
                  VS
                </div>
                <div className="text-xs font-mono text-slate-500">{currentFight.roundsMax} Rounds</div>
              </div>

              {/* Blue Corner */}
              <div className="col-span-2 flex flex-col items-center space-y-2">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-slate-900 border-4 border-blue-500 shadow-glow overflow-hidden p-1">
                  <img src={f2.avatar} alt={f2.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <h1 className="text-lg sm:text-2xl font-black text-white">{f2.name}</h1>
                <div className="text-xs font-mono text-blue-400">"{f2.nickname}"</div>
                <div className="text-xs font-mono text-slate-400">{f2.record}</div>
              </div>

            </div>

            {/* Insight Alert */}
            {currentFight.keyInsight && (
              <div className="mt-8 p-3.5 rounded-xl bg-red-950/40 border border-red-800/40 text-xs text-red-200 flex items-center gap-2 max-w-2xl mx-auto">
                <Sparkles className="w-4 h-4 text-red-400 shrink-0" />
                <span><strong>AI Fight Key Insight:</strong> {currentFight.keyInsight}</span>
              </div>
            )}

          </div>
        </section>

        {/* Main Content Details */}
        <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
          
          {/* Statistical Estimate Disclaimer Badge */}
          {analysis?.statisticalEstimate && (
            <StatisticalEstimateBadge
              estimate={analysis.statisticalEstimate}
              homeTeamName={f1.name}
              awayTeamName={f2.name}
            />
          )}

          {/* Win Probability Timeline Chart */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800">
            <h2 className="text-sm font-mono font-bold text-red-400 uppercase tracking-wider mb-4">
              Round-by-Round Win Probability Shift
            </h2>
            <WinProbabilityChart
              data={currentFight.winProbabilityTimeline}
              homeTeamName={f1.name}
              awayTeamName={f2.name}
              homeColor="#ef4444"
              awayColor="#3b82f6"
            />
          </div>

          {/* Head to Head Metric Chart */}
          {analysis?.teamComparison && (
            <HeadToHeadChart
              data={analysis.teamComparison}
              homeTeamName={f1.name}
              awayTeamName={f2.name}
            />
          )}

        </main>
      </div>
    );
  }

  // Render Ball Sport Game View (NBA, NFL, MLB, MLS, NHL)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      
      {/* Back Nav */}
      <div className="bg-slate-900/80 border-b border-slate-800 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            href={`/sports/${currentGame!.sport}`} 
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {currentGame!.sport.toUpperCase()} Analytics</span>
          </Link>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
            <Activity className="w-4 h-4" />
            <span>{currentGame!.venue}</span>
          </div>
        </div>
      </div>

      {/* Hero Game Scoreboard Banner */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400 mb-6">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{currentGame!.startTime}</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">{currentGame!.periodText}</span>
          </div>

          <div className="grid grid-cols-5 items-center gap-4 text-center">
            
            {/* Home Team */}
            <div className="col-span-2 flex flex-col items-center space-y-2">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-900 border border-slate-800 p-2 shadow-glow overflow-hidden">
                <img src={currentGame!.homeTeam.logo} alt={currentGame!.homeTeam.name} className="w-full h-full object-cover rounded-xl" />
              </div>
              <Link href={`/team/${currentGame!.homeTeam.id}`} className="text-lg sm:text-2xl font-black text-white hover:text-cyan-400 transition-colors">
                {currentGame!.homeTeam.name}
              </Link>
              <div className="text-xs font-mono text-slate-400">{currentGame!.homeTeam.record}</div>
            </div>

            {/* Score */}
            <div className="col-span-1 flex flex-col items-center justify-center">
              <div className="text-3xl sm:text-5xl font-mono font-black text-white tracking-tight bg-slate-900/90 px-4 py-2 rounded-2xl border border-slate-800">
                <span className="text-cyan-400">{currentGame!.homeTeam.score}</span>
                <span className="text-slate-600 text-2xl mx-1.5">:</span>
                <span className="text-cyan-400">{currentGame!.awayTeam.score}</span>
              </div>
              <span className="text-xs font-mono text-slate-500 uppercase mt-2">
                {currentGame!.status}
              </span>
            </div>

            {/* Away Team */}
            <div className="col-span-2 flex flex-col items-center space-y-2">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-900 border border-slate-800 p-2 shadow-glow overflow-hidden">
                <img src={currentGame!.awayTeam.logo} alt={currentGame!.awayTeam.name} className="w-full h-full object-cover rounded-xl" />
              </div>
              <Link href={`/team/${currentGame!.awayTeam.id}`} className="text-lg sm:text-2xl font-black text-white hover:text-cyan-400 transition-colors">
                {currentGame!.awayTeam.name}
              </Link>
              <div className="text-xs font-mono text-slate-400">{currentGame!.awayTeam.record}</div>
            </div>

          </div>

          {/* Key Insight Alert */}
          {currentGame!.keyInsight && (
            <div className="mt-8 p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-200 flex items-center gap-2 max-w-2xl mx-auto">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span><strong>AI Key Insight:</strong> {currentGame!.keyInsight}</span>
            </div>
          )}

        </div>
      </section>

      {/* Tabs Switcher */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <div className="flex items-center gap-2 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2.5 text-xs font-mono font-bold uppercase transition-all border-b-2 ${
              activeTab === 'analytics'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-500/5'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Statistical Analysis & Estimates
          </button>
          <button
            onClick={() => setActiveTab('boxscore')}
            className={`px-4 py-2.5 text-xs font-mono font-bold uppercase transition-all border-b-2 ${
              activeTab === 'boxscore'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-500/5'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Box Score & Roster
          </button>
          <button
            onClick={() => setActiveTab('playbyplay')}
            className={`px-4 py-2.5 text-xs font-mono font-bold uppercase transition-all border-b-2 ${
              activeTab === 'playbyplay'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-500/5'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Play-by-Play Feed
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        
        {/* TAB 1: WIN PROBABILITY & ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            
            {/* Statistical Prediction Badge */}
            {analysis?.statisticalEstimate && (
              <StatisticalEstimateBadge
                estimate={analysis.statisticalEstimate}
                homeTeamName={currentGame!.homeTeam.name}
                awayTeamName={currentGame!.awayTeam.name}
              />
            )}

            {/* Win Probability Timeline */}
            <div className="glass-card rounded-2xl p-6 border border-slate-800">
              <h2 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider mb-4">
                Live Game Win Probability Movement
              </h2>
              <WinProbabilityChart
                data={currentGame!.winProbabilityTimeline}
                homeTeamName={currentGame!.homeTeam.name}
                awayTeamName={currentGame!.awayTeam.name}
                homeColor="#06b6d4"
                awayColor="#3b82f6"
              />
            </div>

            {/* Head to Head Comparison Chart */}
            {analysis?.teamComparison && (
              <HeadToHeadChart
                data={analysis.teamComparison}
                homeTeamName={currentGame!.homeTeam.name}
                awayTeamName={currentGame!.awayTeam.name}
              />
            )}

            {/* Injury Report */}
            {analysis?.injuries && (
              <InjuryReportCard injuries={analysis.injuries} />
            )}

          </div>
        )}

        {/* TAB 2: BOX SCORE */}
        {activeTab === 'boxscore' && (
          <div className="space-y-6">
            {currentGame!.homeBoxScore && (
              <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="font-bold text-white text-sm flex items-center justify-between">
                  <span>{currentGame!.homeTeam.name} Player Box Score</span>
                  <span className="text-xs font-mono text-cyan-400">{currentGame!.homeTeam.code}</span>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="py-2 px-3">Player</th>
                        <th className="py-2 px-2">MIN</th>
                        <th className="py-2 px-2">PTS</th>
                        <th className="py-2 px-2">REB</th>
                        <th className="py-2 px-2">AST</th>
                        <th className="py-2 px-2">FG</th>
                        <th className="py-2 px-2">3PT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {currentGame!.homeBoxScore.map((pl: any) => (
                        <tr key={pl.playerId}>
                          <td className="py-2 px-3 font-bold text-white">
                            <Link href={`/player/${pl.playerId}`} className="hover:text-cyan-400">
                              {pl.playerName} <span className="text-slate-500 font-normal">({pl.position})</span>
                            </Link>
                          </td>
                          <td className="py-2 px-2 text-slate-400">{pl.minutes}</td>
                          <td className="py-2 px-2 font-bold text-cyan-400">{pl.points}</td>
                          <td className="py-2 px-2">{pl.rebounds}</td>
                          <td className="py-2 px-2">{pl.assists}</td>
                          <td className="py-2 px-2 text-slate-400">{pl.fgText}</td>
                          <td className="py-2 px-2 text-slate-400">{pl.threePtText}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PLAY BY PLAY */}
        {activeTab === 'playbyplay' && (
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase">
              Recent Match Play-by-Play Feed
            </h3>
            {currentGame!.playByPlay ? (
              currentGame!.playByPlay.map((item: any) => (
                <div key={item.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-cyan-400 font-bold">{item.time} ({item.period})</span>
                    <span className="font-mono px-1.5 py-0.5 rounded bg-slate-800 text-white font-bold">{item.teamCode}</span>
                    <span className="text-slate-200">{item.description}</span>
                  </div>
                  <span className="font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
                    {item.scoreText}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-slate-500 text-xs font-mono">
                No play-by-play log available for this game.
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
