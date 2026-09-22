'use client';

import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, LogOut, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from './AuthContext';

export function AuthModal() {
  const {
    user,
    isAuthenticated,
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    login,
    register,
    googleLogin,
    logout,
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>(authModalMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'USER' | 'ADMIN'>('USER');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(name, email, password, role);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await googleLogin({
        email: 'user.google@gmail.com',
        name: 'Google User',
      });
    } catch (err: any) {
      setError(err.message || 'Google sign-in error.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAdmin = () => {
    setEmail('admin@statsedge.pro');
    setPassword('Admin123!');
  };

  const fillDemoUser = () => {
    setEmail('user@statsedge.pro');
    setPassword('User123!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in-50">
      <div className="glass-card w-full max-w-md rounded-2xl border border-slate-800 p-6 relative shadow-2xl space-y-5">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute right-4 top-4 p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        {isAuthenticated && user ? (
          /* Logged In Profile View */
          <div className="space-y-6 text-center pt-2">
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 border-2 border-cyan-500 mx-auto flex items-center justify-center text-cyan-400 font-bold text-xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-xl font-extrabold text-white">{user.name}</h3>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                  user.role === 'ADMIN' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1">{user.email}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 text-left space-y-1.5 font-mono">
              <div className="text-[10px] font-bold text-slate-500 uppercase">JWT Session Active</div>
              <div>User ID: <span className="text-slate-400 text-[11px]">{user.id}</span></div>
              <div>Access Level: <span className="text-emerald-400 font-bold">{user.role} PERMISSIONS</span></div>
            </div>

            <button
              onClick={() => {
                logout();
                closeAuthModal();
              }}
              className="w-full py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        ) : (
          /* Login / Register Form */
          <>
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-black tracking-tight text-white uppercase">
                {mode === 'login' ? 'Account Sign In' : 'Create Account'}
              </h2>
              <p className="text-xs text-slate-400">
                Access personalized sports analytics, live tickers, and user profile data.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold font-mono">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`py-1.5 rounded-lg transition-all ${
                  mode === 'login' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`py-1.5 rounded-lg transition-all ${
                  mode === 'register' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                Register
              </button>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Continue with Google SSO */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-3 border border-slate-200"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Or Divider */}
            <div className="relative flex items-center justify-center my-1">
              <div className="border-t border-slate-800 w-full"></div>
              <span className="bg-slate-950 px-3 text-[11px] text-slate-500 uppercase font-mono absolute">
                Or with email
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {mode === 'register' && (
                <div>
                  <label className="block text-slate-400 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-slate-400 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="user@statsedge.pro"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block text-slate-400 mb-1">Account Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="USER">User (Standard Analyst Access)</option>
                    <option value="ADMIN">Admin (Full System Controls)</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-glow flex items-center justify-center gap-2"
              >
                {loading ? 'Authenticating...' : mode === 'login' ? 'Sign In to Platform' : 'Create Account'}
              </button>

              {/* Quick Fill Demo Credentials */}
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 text-center space-y-1.5">
                <div>Quick Demo Accounts:</div>
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={fillDemoAdmin}
                    className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-400 font-mono text-[10px]"
                  >
                    Fill Admin
                  </button>
                  <button
                    type="button"
                    onClick={fillDemoUser}
                    className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 font-mono text-[10px]"
                  >
                    Fill User
                  </button>
                </div>
              </div>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
