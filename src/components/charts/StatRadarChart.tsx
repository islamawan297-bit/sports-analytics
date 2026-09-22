'use client';

import React from 'react';
import {
  ResponsiveContainer,
  RadarChart as ReRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip
} from 'recharts';

interface RadarDataPoint {
  subject: string;
  value: number;
  leagueAvg?: number;
}

interface StatRadarChartProps {
  data: RadarDataPoint[];
  title?: string;
  teamName?: string;
  color?: string;
}

export function StatRadarChart({
  data,
  title = 'Performance Radar',
  teamName = 'Team Metric',
  color = '#06b6d4',
}: StatRadarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-500 text-xs">
        No radar metrics available.
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          {title}
        </div>
      )}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ReRadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
            {data[0]?.leagueAvg !== undefined && (
              <Radar
                name="League Average"
                dataKey="leagueAvg"
                stroke="#64748b"
                fill="#64748b"
                fillOpacity={0.2}
              />
            )}
            <Radar
              name={teamName}
              dataKey="value"
              stroke={color}
              fill={color}
              fillOpacity={0.4}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const pt = payload[0].payload as RadarDataPoint;
                  return (
                    <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-xl shadow-xl text-xs space-y-1">
                      <div className="font-bold text-slate-200">{pt.subject}</div>
                      <div className="text-cyan-400 font-mono">Rating: {pt.value} / 100</div>
                      {pt.leagueAvg !== undefined && (
                        <div className="text-slate-400 font-mono">League Avg: {pt.leagueAvg}</div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
          </ReRadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
