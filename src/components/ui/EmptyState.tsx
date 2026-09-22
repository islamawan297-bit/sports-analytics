'use client';

import React from 'react';
import { SearchX, Inbox } from 'lucide-react';

interface Props {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<Props> = ({
  title = 'No Data Found',
  description = 'There are no records matching your current filter criteria.',
  action,
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-3 my-6">
      <div className="p-3 bg-slate-800/80 text-slate-400 rounded-2xl border border-slate-700/50">
        <Inbox className="w-8 h-8" />
      </div>
      <h3 className="text-base font-bold text-white">{title}</h3>
      <p className="text-xs text-slate-400 max-w-sm">{description}</p>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
};
