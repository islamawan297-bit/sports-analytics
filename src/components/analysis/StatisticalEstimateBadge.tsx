'use client';

import React from 'react';
import { AlertTriangle, Info, Sparkles, TrendingUp, ShieldAlert } from 'lucide-react';

export interface StatisticalEstimateData {
  homeWinProbability: number;
  awayWinProbability: number;
  predictedHomeScore: number;
  predictedAwayScore: number;
  predictedMargin: string;
  confidencePct: number;
  uncertaintyMargin: string;
  isEstimate: boolean;
  label: string;
  disclaimer: string;
  keyDrivers?: string[];
}

interface Props {
  estimate: StatisticalEstimateData;
  homeTeamName?: string;
  awayTeamName?: string;
}

export const StatisticalEstimateBadge: React.FC<Props> = ({
  estimate,
  homeTeamName = 'Home Team',
  awayTeamName = 'Away Team',
}) => {
  return (
    <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-6 shadow-xl backdrop-blur-md relative overflow-hidden my-6">
      {/* Background Accent Glow */}
      <div className="absolute -right-16 -top-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                {estimate.label || 'Statistical Estimate'}
              </span>
              <span className="text-xs text-amber-400 font-medium flex items-center gap-1 bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-500/20">
                <ShieldAlert className="w-3 h-3" /> Estimate Only
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">Probabilistic Matchup Model</h3>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Model Confidence</div>
          <div className="text-xl font-black text-indigo-400 flex items-center justify-end gap-1">
            {estimate.confidencePct}% <span className="text-xs text-slate-400 font-normal">({estimate.uncertaintyMargin})</span>
          </div>
        </div>
      </div>

      {/* Main Odds & Projected Score grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-5">
        {/* Win Probabilities Bar */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-semibold text-slate-300">
            <span>{homeTeamName}: <strong className="text-indigo-400">{estimate.homeWinProbability}%</strong></span>
            <span>{awayTeamName}: <strong className="text-sky-400">{estimate.awayWinProbability}%</strong></span>
          </div>
          <div className="h-3.5 w-full bg-slate-800 rounded-full overflow-hidden flex p-0.5 border border-slate-700/50">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-l-full transition-all duration-700"
              style={{ width: `${estimate.homeWinProbability}%` }}
            />
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-r-full transition-all duration-700"
              style={{ width: `${estimate.awayWinProbability}%` }}
            />
          </div>
          <div className="text-xs text-slate-400 flex items-center justify-between pt-1">
            <span>Expected Margin: <strong className="text-slate-200">{estimate.predictedMargin}</strong></span>
            <span>Uncertainty: <strong className="text-amber-400">{estimate.uncertaintyMargin}</strong></span>
          </div>
        </div>

        {/* Projected Score Matrix */}
        <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 flex items-center justify-around">
          <div className="text-center">
            <div className="text-xs text-slate-400 font-medium mb-1">{homeTeamName}</div>
            <div className="text-3xl font-black text-white">{estimate.predictedHomeScore}</div>
            <div className="text-[10px] text-slate-500 uppercase mt-0.5">Projected</div>
          </div>
          <div className="text-slate-600 font-bold text-xl">-</div>
          <div className="text-center">
            <div className="text-xs text-slate-400 font-medium mb-1">{awayTeamName}</div>
            <div className="text-3xl font-black text-white">{estimate.predictedAwayScore}</div>
            <div className="text-[10px] text-slate-500 uppercase mt-0.5">Projected</div>
          </div>
        </div>
      </div>

      {/* Key Drivers */}
      {estimate.keyDrivers && estimate.keyDrivers.length > 0 && (
        <div className="mt-2 pt-3 border-t border-slate-800/80">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" /> Model Drivers
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-slate-300">
            {estimate.keyDrivers.map((driver, idx) => (
              <li key={idx} className="bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-800/60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                <span className="truncate">{driver}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Required Statistical Disclaimer */}
      <div className="mt-4 p-3 bg-slate-950/80 rounded-xl border border-amber-500/20 text-xs text-amber-300/90 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="font-semibold text-amber-400">Notice: </strong>
          {estimate.disclaimer ||
            'Statistical estimates are model-driven probabilistic calculations based on historical team ratings and metrics. Results are not guaranteed outcomes.'}
        </p>
      </div>
    </div>
  );
};
