'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export interface TrendPoint {
  game: string;
  pts: number;
  reb?: number;
  ast?: number;
}

interface Props {
  data?: TrendPoint[];
  title?: string;
}

export const PerformanceTrendChart: React.FC<Props> = ({
  data,
  title = 'Recent Performance Trend',
}) => {
  const chartData = data && data.length > 0 ? data : [
    { game: 'Game 1', pts: 24, reb: 6, ast: 7 },
    { game: 'Game 2', pts: 29, reb: 8, ast: 11 },
    { game: 'Game 3', pts: 31, reb: 9, ast: 10 },
    { game: 'Game 4', pts: 26, reb: 7, ast: 6 },
    { game: 'Game 5', pts: 34, reb: 11, ast: 9 },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md my-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-xs text-slate-400 mt-0.5">Game-by-game scoring & assist trajectory</p>
        </div>
        <div className="text-xs font-semibold text-indigo-400 bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-500/20">
          Last 5 Games Trend
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="ptsColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="game" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc' }}
            />
            <Area type="monotone" dataKey="pts" name="Points" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#ptsColor)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
