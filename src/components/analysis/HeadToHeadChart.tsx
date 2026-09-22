'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

export interface HeadToHeadMetric {
  metric: string;
  homeValue: number;
  awayValue: number;
}

interface Props {
  data: HeadToHeadMetric[];
  homeTeamName?: string;
  awayTeamName?: string;
}

export const HeadToHeadChart: React.FC<Props> = ({
  data,
  homeTeamName = 'Home Team',
  awayTeamName = 'Away Team',
}) => {
  const chartData = data && data.length > 0 ? data : [
    { metric: 'Offensive Rating', homeValue: 116.5, awayValue: 122.1 },
    { metric: 'Defensive Rating', homeValue: 111.8, awayValue: 110.2 },
    { metric: 'Pace', homeValue: 99.4, awayValue: 98.1 },
    { metric: 'Points Per Game', homeValue: 117.8, awayValue: 120.6 },
    { metric: 'Opponent PPG', homeValue: 112.4, awayValue: 108.9 },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md my-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">Statistical Metric Breakdown</h3>
          <p className="text-xs text-slate-400 mt-0.5">Direct statistical comparison across key performance factors</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-indigo-400">
            <span className="w-3 h-3 rounded-sm bg-indigo-500 inline-block" /> {homeTeamName}
          </span>
          <span className="flex items-center gap-1.5 text-sky-400">
            <span className="w-3 h-3 rounded-sm bg-sky-500 inline-block" /> {awayTeamName}
          </span>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="metric" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc' }}
              itemStyle={{ color: '#cbd5e1' }}
            />
            <Bar dataKey="homeValue" name={homeTeamName} fill="#6366f1" radius={[6, 6, 0, 0]} />
            <Bar dataKey="awayValue" name={awayTeamName} fill="#0ea5e9" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
