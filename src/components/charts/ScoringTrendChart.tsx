'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';

interface ScoringTrendPoint {
  game: string;
  metric1: number; // e.g. Points
  metric2?: number; // e.g. Assists / Rebounds
}

interface ScoringTrendChartProps {
  data: ScoringTrendPoint[];
  metricLabel?: string;
  color?: string;
}

export function ScoringTrendChart({
  data,
  metricLabel = 'Points',
  color = '#10b981',
}: ScoringTrendChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-slate-500 text-xs">
        No scoring log data available.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="game" stroke="#64748b" fontSize={10} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const pt = payload[0].payload as ScoringTrendPoint;
                  return (
                    <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-xs space-y-1">
                      <div className="font-mono text-slate-400">{pt.game}</div>
                      <div className="text-emerald-400 font-bold font-mono">
                        {metricLabel}: {pt.metric1}
                      </div>
                      {pt.metric2 !== undefined && (
                        <div className="text-cyan-400 font-mono">
                          Secondary: {pt.metric2}
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="metric1" radius={[6, 6, 0, 0]}>
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === data.length - 1 ? '#06b6d4' : color} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
