'use client';

import React from 'react';
import { ShieldAlert, UserX, AlertCircle, CheckCircle2 } from 'lucide-react';

export interface InjuryItem {
  playerId: string;
  playerName: string;
  teamId: string;
  position: string;
  status: 'Out' | 'Questionable' | 'Probable' | 'Day-to-Day' | 'IR';
  detail: string;
}

interface Props {
  injuries: InjuryItem[];
}

export const InjuryReportCard: React.FC<Props> = ({ injuries }) => {
  if (!injuries || injuries.length === 0) {
    return null;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Out':
      case 'IR':
        return <span className="bg-rose-950/70 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1"><UserX className="w-3 h-3" /> Out</span>;
      case 'Questionable':
      case 'Day-to-Day':
        return <span className="bg-amber-950/70 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Questionable</span>;
      default:
        return <span className="bg-emerald-950/70 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Probable</span>;
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md my-6">
      <div className="flex items-center gap-2 pb-4 border-b border-slate-800 mb-4">
        <ShieldAlert className="w-5 h-5 text-amber-400" />
        <h3 className="text-lg font-bold text-white">Injury & Roster Status Report</h3>
      </div>

      <div className="space-y-3">
        {injuries.map((item, idx) => (
          <div key={idx} className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white text-sm">{item.playerName}</span>
                <span className="text-xs text-slate-400">({item.position})</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{item.detail}</p>
            </div>
            <div>{getStatusBadge(item.status)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
