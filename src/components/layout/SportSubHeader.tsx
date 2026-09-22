'use client';

import React from 'react';
import Link from 'next/link';
import { SportInfo } from '@/types/sports';
import { SPORTS_LIST } from '@/data/mockData';

interface SportSubHeaderProps {
  currentSport: SportInfo;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function SportSubHeader({ currentSport, activeTab = 'overview', onTabChange }: SportSubHeaderProps) {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'live', label: 'Live & Games' },
    { id: 'standings', label: currentSport.category === 'combat' ? 'Rankings' : 'Standings' },
    { id: 'leaders', label: 'Stat Leaders' },
  ];

  return (
    <div className="bg-slate-900/60 border-b border-slate-800/80 pt-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Sport Title & Meta */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center p-3 shadow-glow">
              <span className="font-extrabold text-xl text-cyan-400 font-mono">
                {currentSport.name.substring(0, 3).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                  {currentSport.name} Analytics
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono text-[10px] font-bold uppercase">
                  {currentSport.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {currentSport.description} • <span className="font-mono text-slate-300">{currentSport.seasonPeriod}</span>
              </p>
            </div>
          </div>

          {/* Quick Sport Selector Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {SPORTS_LIST.map((s) => (
              <Link
                key={s.id}
                href={`/sports/${s.id}`}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
                  s.id === currentSport.id
                    ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-glow'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange && onTabChange(tab.id)}
              className={`px-4 py-2.5 text-xs font-semibold tracking-wide transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-400 bg-cyan-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
