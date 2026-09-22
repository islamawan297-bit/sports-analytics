'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<Props> = ({
  text = 'Loading sports data...',
  size = 'md',
}) => {
  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6';

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-3">
      <Loader2 className={`${iconSize} text-cyan-400 animate-spin`} />
      {text && <p className="text-xs font-mono text-slate-400">{text}</p>}
    </div>
  );
};
