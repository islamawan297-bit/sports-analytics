'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Activity, 
  Search, 
  Menu, 
  X, 
  Flame, 
  Trophy, 
  Zap, 
  Globe, 
  Shield, 
  BarChart3,
  ChevronRight,
  User,
  ShieldAlert
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../auth/AuthContext';
import { AuthModal } from '../auth/AuthModal';
import { SPORTS_LIST } from '@/data/mockData';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const getSportIcon = (iconName: string) => {
    switch (iconName) {
      case 'Dribble': return <BarChart3 className="w-4 h-4" />;
      case 'Trophy': return <Trophy className="w-4 h-4" />;
      case 'Activity': return <Activity className="w-4 h-4" />;
      case 'Globe': return <Globe className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      case 'Shield': return <Shield className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Platform Title */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5 shadow-glow flex items-center justify-center group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <Activity className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                    STATSEDGE <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">PRO</span>
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest -mt-1 font-mono">
                    Sports Intelligence
                  </span>
                </div>
              </Link>

              {/* Main Navigation Links (Desktop) */}
              <nav className="hidden lg:flex items-center gap-1 ml-4">
                <Link
                  href="/dashboard"
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname === '/dashboard'
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  Dashboard
                </Link>
                
                {/* Sports Selector */}
                {SPORTS_LIST.map((sport) => {
                  const isActive = pathname === `/sports/${sport.id}`;
                  return (
                    <Link
                      key={sport.id}
                      href={`/sports/${sport.id}`}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                      }`}
                    >
                      {sport.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right Section: Search & Actions */}
            <div className="flex items-center gap-3">
              {/* Quick Search */}
              <form onSubmit={handleSearchSubmit} className="hidden md:flex relative items-center">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search teams, players..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-44 lg:w-56 bg-slate-900/90 border border-slate-800 focus:border-cyan-500/60 rounded-full py-1.5 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
                />
              </form>

              {/* Live Indicator Badge */}
              <Link 
                href="/dashboard" 
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-live-pulse" />
                <span>3 LIVE</span>
              </Link>

              {/* Theme Toggle Button */}
              <ThemeToggle />

              {/* User Profile / Auth Button */}
              {isAuthenticated && user ? (
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white border border-slate-700 flex items-center gap-2"
                >
                  <div className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline font-mono">{user.name.split(' ')[0]}</span>
                  {user.role === 'ADMIN' && (
                    <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 text-[9px] font-bold font-mono">
                      ADMIN
                    </span>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-glow flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search sports, teams, players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </form>

            <div className="space-y-1">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-cyan-400 hover:bg-slate-800"
              >
                Main Dashboard
              </Link>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-800/80">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 py-1">
                Sports Categories
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {SPORTS_LIST.map((sport) => (
                  <Link
                    key={sport.id}
                    href={`/sports/${sport.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-800/60 text-xs font-semibold text-slate-300 hover:text-cyan-400"
                  >
                    <span className="flex items-center gap-2">
                      {getSportIcon(sport.iconName)}
                      {sport.name}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Auth Modal */}
      <AuthModal />
    </>
  );
}
