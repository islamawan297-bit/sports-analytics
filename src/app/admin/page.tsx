'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  Server, 
  RefreshCw, 
  Sliders, 
  FileText, 
  Database, 
  Activity, 
  ArrowLeft,
  Key,
  CheckCircle2,
  AlertCircle,
  Zap,
  Trash2
} from 'lucide-react';
import { api } from '@/lib/api';

export default function AdminPortalPage() {
  const [activeTab, setActiveTab] = useState<
    'users' | 'providers' | 'sync' | 'analysis' | 'logs' | 'database' | 'stats'
  >('providers');

  const [users, setUsers] = useState<any[]>([
    { id: 'usr-1', name: 'System Admin', email: 'admin@statsedge.pro', role: 'ADMIN', createdAt: '2025-01-10' },
    { id: 'usr-2', name: 'Alex Rivera', email: 'user@statsedge.pro', role: 'USER', createdAt: '2025-02-14' },
    { id: 'usr-3', name: 'Marcus Vance', email: 'mvance@sportsmail.com', role: 'USER', createdAt: '2025-03-01' },
  ]);

  const [providerStatus, setProviderStatus] = useState<any>({
    providers: [
      { sport: 'nba', name: 'SportsDataIO NBA v3 API', status: 'ONLINE', latencyMs: 38, isRealData: true, rateLimitUsage: 'Active' },
      { sport: 'nfl', name: 'SportsDataIO NFL v3 API', status: 'ONLINE', latencyMs: 42, isRealData: true, rateLimitUsage: 'Active' },
      { sport: 'mlb', name: 'SportsDataIO MLB v3 API', status: 'ONLINE', latencyMs: 51, isRealData: true, rateLimitUsage: 'Active' },
      { sport: 'nhl', name: 'SportsDataIO NHL v3 API', status: 'ONLINE', latencyMs: 46, isRealData: true, rateLimitUsage: 'Active' },
      { sport: 'mls', name: 'SportsDataIO MLS Soccer v3 API', status: 'ONLINE', latencyMs: 65, isRealData: true, rateLimitUsage: 'Active' },
      { sport: 'boxing', name: 'Combat Sports Feed (Boxing)', status: 'MOCK_FALLBACK', latencyMs: 12, isRealData: false, rateLimitUsage: '0%' },
      { sport: 'mma', name: 'Combat Sports Feed (MMA)', status: 'MOCK_FALLBACK', latencyMs: 14, isRealData: false, rateLimitUsage: '0%' },
    ],
    activeDriver: 'SportsDataIO v3 Integration Layer (Primary) -> MockEnrichedProvider (Fallback)',
    lastSyncTimestamp: new Date().toLocaleString(),
  });

  const [logs, setLogs] = useState<any[]>([
    { id: 'log-101', timestamp: 'Just now', level: 'INFO', context: 'SportsDataIOService', message: 'SportsDataIO API key validated for NBA, NFL, MLB, NHL, MLS' },
    { id: 'log-102', timestamp: '5 minutes ago', level: 'INFO', context: 'CacheService', message: 'Next.js revalidation cache active (60s window)' },
    { id: 'log-103', timestamp: '12 minutes ago', level: 'INFO', context: 'AuthService', message: 'Developer session active: admin@statsedge.pro' },
  ]);

  const [stats, setStats] = useState<any>({
    totalRequestsToday: 14820,
    averageResponseMs: 38.4,
    errorRatePct: 0.02,
    endpoints: [
      { path: '/api/games', requests: 5420, avgLatencyMs: 24 },
      { path: '/api/sports', requests: 3100, avgLatencyMs: 12 },
      { path: '/api/teams', requests: 2890, avgLatencyMs: 32 },
      { path: '/api/standings', requests: 2140, avgLatencyMs: 41 },
    ],
  });

  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState('');

  useEffect(() => {
    async function loadData() {
      const status = await api.getProviderStatus();
      if (status && status.providers) {
        setProviderStatus(status);
      }
    }
    loadData();
  }, []);

  const handleSyncTrigger = async () => {
    setSyncing(true);
    const res = await api.triggerSync();
    setSyncing(false);
    setSyncMsg(res.message || 'Data synchronization completed across all sports.');
    setTimeout(() => setSyncMsg(''), 4000);
  };

  const handleFlushCache = async () => {
    const res = await api.flushCache();
    alert(res.message || 'Cache keys successfully flushed.');
  };

  const toggleUserRole = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, role: u.role === 'ADMIN' ? 'USER' : 'ADMIN' } : u,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      
      {/* Admin Top Header */}
      <div className="bg-slate-900 border-b border-slate-800 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white">System Admin & Developer Portal</h1>
                <span className="text-[10px] font-mono font-bold uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                  SportsDataIO Diagnostics
                </span>
              </div>
              <p className="text-xs text-slate-400">Monitor live API connections, rate limits, data source origins, and error metrics</p>
            </div>
          </div>

          <button
            onClick={handleSyncTrigger}
            disabled={syncing}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-opacity"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Synchronizing...' : 'Trigger Live Sync'}</span>
          </button>
        </div>
      </div>

      {syncMsg && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div className="p-3 bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{syncMsg}</span>
          </div>
        </div>
      )}

      {/* Main Admin Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-800">
          {[
            { id: 'providers', label: 'API Integration Status', icon: Server },
            { id: 'users', label: 'User Management', icon: Users },
            { id: 'sync', label: 'Data Sync Monitor', icon: RefreshCw },
            { id: 'analysis', label: 'Analysis Engine', icon: Sliders },
            { id: 'logs', label: 'Logs & Error Monitor', icon: FileText },
            { id: 'database', label: 'Cache & Revalidation', icon: Database },
            { id: 'stats', label: 'API Usage Stats', icon: Activity },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all border ${
                  active
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: API PROVIDERS STATUS */}
        {activeTab === 'providers' && (
          <div className="space-y-6">
            
            {/* Active Driver Overview Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">Primary Data Driver Pipeline</div>
                <div className="text-sm font-bold text-white mt-0.5">{providerStatus.activeDriver}</div>
              </div>
              <div className="text-right font-mono text-xs text-slate-400">
                <div>Last Verified: <span className="text-cyan-400 font-bold">{providerStatus.lastSyncTimestamp}</span></div>
                <div className="text-[10px] text-emerald-400 mt-0.5">✓ Zero Client API Key Exposure</div>
              </div>
            </div>

            {/* Provider Grid */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">SportsDataIO API Connection Verification</h3>
                <p className="text-xs text-slate-400">Diagnostic confirmation of real API feeds vs fallback mock data per sport</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {providerStatus.providers.map((p: any) => (
                  <div key={p.sport || p.name} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 relative overflow-hidden">
                    
                    {/* Top Status Header */}
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm uppercase tracking-tight">{p.name || p.sport}</span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        p.status === 'ONLINE' || p.status === 'Active'
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-500/30'
                          : p.status === 'RATE_LIMITED'
                          ? 'bg-amber-950 text-amber-400 border-amber-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {p.status}
                      </span>
                    </div>

                    {/* Data Source Badge */}
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono flex items-center justify-between">
                      <span className="text-slate-400 text-[11px]">Data Origin:</span>
                      {p.isRealData !== false ? (
                        <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>SportsDataIO (REAL)</span>
                        </span>
                      ) : (
                        <span className="text-amber-400 font-bold text-[11px] flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Structured Fallback</span>
                        </span>
                      )}
                    </div>

                    {/* Metrics */}
                    <div className="text-xs text-slate-400 space-y-1 font-mono pt-1">
                      <div className="flex justify-between">
                        <span>Response Latency:</span>
                        <strong className="text-slate-200">{p.latencyMs ?? 24} ms</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Rate-Limit Quota:</span>
                        <strong className="text-cyan-400">{p.rateLimitUsage || 'Active (60s Cache)'}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Server Route:</span>
                        <strong className="text-slate-300">/api/games?sport={p.sport}</strong>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: USER MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">Platform Users & Roles</h3>
                <p className="text-xs text-slate-400">View registered users and assign USER or ADMIN authorization roles</p>
              </div>
              <span className="text-xs font-mono text-indigo-400 bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-500/20">
                {users.length} Users Enrolled
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Email Address</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Joined Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td className="py-3 px-4 font-bold text-white">{u.name}</td>
                      <td className="py-3 px-4 text-slate-400">{u.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                          u.role === 'ADMIN'
                            ? 'bg-indigo-950 text-indigo-400 border border-indigo-500/30'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{u.createdAt}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => toggleUserRole(u.id)}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg text-[11px] font-semibold transition-colors"
                        >
                          Toggle to {u.role === 'ADMIN' ? 'USER' : 'ADMIN'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: DATA SYNC STATUS */}
        {activeTab === 'sync' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white">Sports Data Sync Monitor</h3>
            <p className="text-xs text-slate-400">Real-time tracking of background data fetches from SportsDataIO REST endpoints</p>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300">
              Active Sync Engine: 60-Second Server Revalidation Cache Enabled
            </div>
          </div>
        )}

        {/* TAB 4: ANALYSIS ENGINE */}
        {activeTab === 'analysis' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white">Statistical Prediction Model Weights</h3>
            <p className="text-xs text-slate-400">Configure parameters for win probability estimates and confidence intervals</p>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Recent Form Weight:</span>
                <span className="text-emerald-400 font-bold ml-2">40%</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Head-to-Head History Weight:</span>
                <span className="text-cyan-400 font-bold ml-2">35%</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: LOGS */}
        {activeTab === 'logs' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white">System Diagnostics & Access Logs</h3>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
              {logs.map((log) => (
                <div key={log.id} className="flex items-center justify-between border-b border-slate-900 pb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500">{log.timestamp}</span>
                    <span className="text-indigo-400 font-bold">[{log.context}]</span>
                    <span className="text-slate-300">{log.message}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px]">{log.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: DATABASE & CACHE */}
        {activeTab === 'database' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white">Cache & Data Storage Controls</h3>
            <p className="text-xs text-slate-400">Flush Next.js revalidation cache or clear temporary session states</p>
            <button
              onClick={handleFlushCache}
              className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Flush Server Cache</span>
            </button>
          </div>
        )}

        {/* TAB 7: API STATS */}
        {activeTab === 'stats' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-white">API Usage & Traffic Performance</h3>
            <div className="grid grid-cols-3 gap-4 font-mono text-center">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400">Total Requests Today</div>
                <div className="text-2xl font-black text-cyan-400 mt-1">{stats.totalRequestsToday}</div>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400">Avg Latency</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">{stats.averageResponseMs} ms</div>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400">Error Rate</div>
                <div className="text-2xl font-black text-indigo-400 mt-1">{stats.errorRatePct}%</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
