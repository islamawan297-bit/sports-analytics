'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { WinProbabilityPoint } from '@/types/sports';

interface WinProbabilityChartProps {
  data?: WinProbabilityPoint[];
  homeTeamName: string;
  awayTeamName: string;
  homeColor?: string;
  awayColor?: string;
}

export function WinProbabilityChart({
  data = [],
  homeTeamName,
  awayTeamName,
  homeColor = '#06b6d4',
  awayColor = '#3b82f6',
}: WinProbabilityChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-500 text-xs font-mono">
        Win probability timeline data loading...
      </div>
    );
  }

  const latestPoint = data[data.length - 1];

  return (
    <div className="space-y-4">
      {/* Current Win Probability Header */}
      <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: homeColor }} />
          <span className="font-semibold text-slate-200">{homeTeamName}</span>
          <span className="font-mono text-cyan-400 font-bold">{latestPoint.homeProb.toFixed(1)}%</span>
        </div>
        <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
          LIVE WIN PROBABILITY
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-blue-400 font-bold">{latestPoint.awayProb.toFixed(1)}%</span>
          <span className="font-semibold text-slate-200">{awayTeamName}</span>
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: awayColor }} />
        </div>
      </div>

      {/* Probability Progress Bar */}
      <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden flex p-0.5 border border-slate-800">
        <div
          className="h-full rounded-l-full transition-all duration-500"
          style={{
            width: `${latestPoint.homeProb}%`,
            backgroundColor: homeColor,
          }}
        />
        <div
          className="h-full rounded-r-full transition-all duration-500"
          style={{
            width: `${latestPoint.awayProb}%`,
            backgroundColor: awayColor,
          }}
        />
      </div>

      {/* Timeline Chart */}
      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="homeProbGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={homeColor} stopOpacity={0.4} />
                <stop offset="95%" stopColor={homeColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#64748b" 
              fontSize={10} 
              tickLine={false} 
            />
            <YAxis 
              domain={[0, 100]} 
              stroke="#64748b" 
              fontSize={10} 
              tickFormatter={(v) => `${v}%`}
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const pt = payload[0].payload as WinProbabilityPoint;
                  return (
                    <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-xl shadow-xl text-xs space-y-1">
                      <div className="font-mono text-[10px] text-slate-400 border-b border-slate-800 pb-1">
                        Time: {pt.time} {pt.scoreText && `(${pt.scoreText})`}
                      </div>
                      <div className="flex items-center justify-between gap-4 text-slate-200">
                        <span>{homeTeamName}:</span>
                        <span className="font-mono font-bold text-cyan-400">{pt.homeProb}%</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-slate-200">
                        <span>{awayTeamName}:</span>
                        <span className="font-mono font-bold text-blue-400">{pt.awayProb}%</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="homeProb"
              stroke={homeColor}
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#homeProbGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
