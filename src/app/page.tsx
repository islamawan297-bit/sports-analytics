'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Activity, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  BarChart3, 
  Trophy, 
  Flame, 
  Users, 
  Cpu, 
  Sparkles,
  Globe,
  Shield,
  CheckCircle2
} from 'lucide-react';
import { SPORTS_LIST, MOCK_GAMES, MOCK_FIGHTS } from '@/data/mockData';
import { LiveGameCard } from '@/components/dashboard/LiveGameCard';
import { FighterComparisonCard } from '@/components/sports/FighterComparisonCard';
import { WinProbabilityChart } from '@/components/charts/WinProbabilityChart';

export default function LandingPage() {
  const featuredGame = MOCK_GAMES[0];
  const featuredFight = MOCK_FIGHTS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/60">
        
        {/* Glow Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/20 via-emerald-500/10 to-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Live Platform Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-glow">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AI-Powered Sports Intelligence & Live Predictions</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1]">
              Engineered for <br />
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400 bg-clip-text text-transparent">
                Elite Sports Analytics
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Track live scores, win probability timelines, shot chart metrics, and combat sports Tale-of-the-Tape data across <strong className="text-white font-semibold">NBA, NFL, MLB, MLS, NHL, Boxing, and MMA</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-sm hover:opacity-95 transition-all shadow-glow flex items-center justify-center gap-2 group"
              >
                <span>Launch Analytics Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/sports/nba"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <span>Explore Sports Hub</span>
              </Link>
            </div>

            {/* Key Metrics Counter Ticker */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-slate-800/80 text-left">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-2xl font-black text-cyan-400 font-mono">7 Major</div>
                <div className="text-xs text-slate-400 mt-0.5">Leagues & Sports</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-2xl font-black text-emerald-400 font-mono">94.2%</div>
                <div className="text-xs text-slate-400 mt-0.5">Prediction Model Acc.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-2xl font-black text-amber-400 font-mono">Real-Time</div>
                <div className="text-xs text-slate-400 mt-0.5">Win Probabilities</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-2xl font-black text-indigo-400 font-mono">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">Responsive UI</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Live Match & Interactive Chart Showcase */}
      <section className="py-16 bg-slate-900/40 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                <Activity className="w-4 h-4" /> REAL-TIME ANALYTICAL ENGINE
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Live Match Probabilities & Breakdown
              </h2>
            </div>
            <Link 
              href="/dashboard" 
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>View All Live Matchups</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Live Game Card Demo */}
            <div className="space-y-4">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Featured NBA Matchup
              </div>
              <LiveGameCard game={featuredGame} />
            </div>

            {/* Win Probability Timeline Chart */}
            <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
              <div className="mb-4">
                <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  AI Win Probability Engine
                </div>
                <h3 className="text-lg font-bold text-white">
                  Lakers vs Celtics Shift Timeline
                </h3>
              </div>
              <WinProbabilityChart
                data={featuredGame.winProbabilityTimeline}
                homeTeamName={featuredGame.homeTeam.name}
                awayTeamName={featuredGame.awayTeam.name}
                homeColor="#06b6d4"
                awayColor="#3b82f6"
              />
            </div>

          </div>

        </div>
      </section>

      {/* 7 Sports Coverage Grid */}
      <section className="py-16 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              MULTI-SPORT PLATFORM
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Deep Coverage for 7 Major Sports
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Dedicated analysis dashboards customized for both team ball sports and individual combat sports.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPORTS_LIST.map((sport) => (
              <Link
                key={sport.id}
                href={`/sports/${sport.id}`}
                className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/50 hover:scale-[1.02] transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 font-mono font-bold text-xs">
                      {sport.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      {sport.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {sport.description}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {sport.seasonPeriod}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-cyan-400 font-medium">
                  <span>Explore Data</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Combat Sports Spotlight */}
      <section className="py-16 bg-slate-900/30 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs font-bold uppercase">
                Boxing & MMA Tale of the Tape
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                State-of-the-Art Combat Analytics
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Experience Tale-of-the-Tape metrics including reach advantage, striking accuracy, takedown defense averages, and round-by-round point scoring.
              </p>
              
              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Reach, Height, and Stance Advantage Calculations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Round-by-Round Striking Output & Control Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Knockout & Submission Probability Distributions</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/sports/boxing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors shadow-glow"
                >
                  <span>Explore Combat Sports Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div>
              <FighterComparisonCard fight={featuredFight} />
            </div>

          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Dive into Advanced Sports Data?
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Access real-time game logs, box scores, win probability charts, and team standings across all 7 major sports.
          </p>
          <div className="pt-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm transition-all shadow-glow"
            >
              <span>Open Pro Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
