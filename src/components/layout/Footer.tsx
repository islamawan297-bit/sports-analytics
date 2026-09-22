'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, ShieldCheck, Cpu, Database, Award } from 'lucide-react';
import { SPORTS_LIST } from '@/data/mockData';

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Activity className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-bold text-base text-white">STATSEDGE PRO</span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-xs">
              Next-generation sports analytics engine providing real-time match tracking, AI win probability models, team shot charts, and combat sports analytics.
            </p>
            <div className="flex items-center gap-3 text-slate-500">
              <span className="flex items-center gap-1 text-[11px]">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                ML Engine v4.2
              </span>
              <span className="flex items-center gap-1 text-[11px]">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                Real-Time Feeds
              </span>
            </div>
          </div>

          {/* Sports Leagues */}
          <div>
            <div className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Covered Leagues & Sports
            </div>
            <ul className="space-y-2">
              {SPORTS_LIST.map((sport) => (
                <li key={sport.id}>
                  <Link 
                    href={`/sports/${sport.id}`}
                    className="hover:text-cyan-400 transition-colors flex items-center justify-between"
                  >
                    <span>{sport.name}</span>
                    <span className="text-[10px] text-slate-600 font-mono">{sport.category}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Navigation */}
          <div>
            <div className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Platform Features
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="hover:text-cyan-400 transition-colors">
                  Live Games Dashboard
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-cyan-400 transition-colors">
                  Player & Team Search
                </Link>
              </li>
              <li>
                <Link href="/game/nba-game-1" className="hover:text-cyan-400 transition-colors">
                  Match Analytics & Box Scores
                </Link>
              </li>
              <li>
                <Link href="/sports/boxing" className="hover:text-cyan-400 transition-colors">
                  Tale of the Tape Combat Sports
                </Link>
              </li>
            </ul>
          </div>

          {/* API Integration Readiness */}
          <div>
            <div className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              API & Integration Status
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300">REST API Ready</span>
                <span className="text-emerald-400 font-mono font-bold">200 OK</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300">WebSocket Ticker</span>
                <span className="text-emerald-400 font-mono font-bold">CONNECTED</span>
              </div>
              <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                Architected with clean TypeScript interfaces ready for live provider hooks (Opta, Radar, Sportradar).
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} StatsEdge Analytics Pro. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Data Sources</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
