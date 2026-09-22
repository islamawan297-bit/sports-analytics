'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 light:bg-slate-200 light:text-slate-800 border border-slate-700/50 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline text-xs text-slate-300">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-cyan-400" />
          <span className="hidden sm:inline text-xs text-slate-300">Dark</span>
        </>
      )}
    </button>
  );
}
