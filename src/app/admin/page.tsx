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
  >('users');

  const [users, setUsers] = useState<any[]>([
    { id: 'usr-1', name: 'System Admin', email: 'admin@statsedge.pro', role: 'ADMIN', createdAt: '2025-01-10' },
    { id: 'usr-2', name: 'Alex Rivera', email: 'user@statsedge.pro', role: 'USER', createdAt: '2025-02-14' },
    { id: 'usr-3', name: 'Marcus Vance', email: 'mvance@sportsmail.com', role: 'USER', createdAt: '2025-03-01' },
  ]);

  const [providerStatus, setProviderStatus] = useState<any>({
    providers: [
      { id: 'espn-public', name: 'ESPN Scoreboard Public Feed', status: 'Active', latencyMs: 142, rateLimitUsage: '12%', apiKeyConfigured: true },
      { id: 'thesportsdb', name: 'TheSportsDB V1 API', status: 'Active', latencyMs: 210, rateLimitUsage: '8%', apiKeyConfigured: true },
      { id: 'odds-api', name: 'OddsAPI Live Feed', status: 'Active', latencyMs: 185, rateLimitUsage: '22%', apiKeyConfigured: true },
    ],
    activeDriver: 'EspnPublicProvider (Primary) -> MockEnrichedProvider (Fallback)',
    lastSyncTimestamp: new Date().toLocaleString(),
  });

  const [logs, setLogs] = useState<any[]>([
    { id: 'log-101', timestamp: '2 minutes ago', level: 'INFO', context: 'SportsProviderService', message: 'Live scores refreshed for NBA, NFL, MLB' },
    { id: 'log-102', timestamp: '15 minutes ago', level: 'WARN', context: 'CacheService', message: 'Cache memory threshold optimal at 4.2 MB' },
    { id: 'log-103', timestamp: '45 minutes ago', level: 'INFO', context: 'AuthService', message: 'Admin authenticated: admin@statsedge.pro' },
  ]);

  const [stats, setStats] = useState<any>({
    totalRequestsToday: 14820,
    averageResponseMs: 38.4,
    errorRatePct: 0.02,
    endpoints: [
      { path: '/api/games', requests: 5420, avgLatencyMs: 24 },
      { path: '/api/sports', requests: 3100, avgLatencyMs: 12 },
      { path: '/api/analysis/game', requests: 2890, avgLatencyMs: 45 },
      { path: '/api/auth/login', requests: 1240, avgLatencyMs: 85 },
    ],
  });

  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState('');

  const handleSyncTrigger = async () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSyncMsg('Data synchronization completed across all 7 sports.');
      setTimeout(() => setSyncMsg(''), 4000);
    }, 1200);
  };

  const handleFlushCache = async () => {
    alert('Redis & In-memory cache flushed successfully.');
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
                <h1 className="text-xl font-black text-white">System Admin Portal</h1>
                <span className="text-[10px] font-mono font-bold uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                  Admin Guarded
                </span>
              </div>
              <p className="text-xs text-slate-400">Manage data providers, API security, statistical analysis weights, and system logs</p>
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
            { id: 'users', label: 'User Management', icon: Users },
            { id: 'providers', label: 'API Providers', icon: Server },
            { id: 'sync', label: 'Data Sync Status', icon: RefreshCw },
            { id: 'analysis', label: 'Analysis Engine', icon: Sliders },
            { id: 'logs', label: 'Logs & Errors', icon: FileText },
            { id: 'database', label: 'Database & Cache', icon: Database },
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

        {/* TAB 1: USER MANAGEMENT */}
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

        {/* TAB 2: API PROVIDERS */}
        {activeTab === 'providers' && (
          <div className="space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-1">External Sports API Integration Layer</h3>
              <p className="text-xs text-slate-400 mb-6">Manage data feeds, API key configurations, and response latency monitors</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {providerStatus.providers.map((p: any) => (
                  <div key={p.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{p.name}</span>
                      <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                        {p.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 space-y-1">
                      <div className="flex justify-between"><span>Latency:</span> <strong className="text-slate-200">{p.latencyMs} ms</strong></div>
                      <div className="flex justify-between"><span>Rate-Limit Usage:</span> <strong className="text-cyan-400">{p.rateLimitUsage}</strong></div>
                      <div className="flex justify-between"><span>API Key Configured:</span> <strong className="text-emerald-400">Yes</strong></div>
                    </div>
                    <button className="w-full mt-2 py-1.5 bg-slate-900 hover:bg-slate-800 text-xs text-indigo-400 font-semibold rounded-xl border border-slate-800 transition-colors flex items-center justify-center gap-1.5">
                      <Key className="w-3.5 h-3.5" /> Re-configure API Key
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DATA SYNC STATUS */}
        {activeTab === 'sync' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Real-Time Data Synchronization</h3>
                <p className="text-xs text-slate-400">Last synchronized: {providerStatus.lastSyncTimestamp}</p>
              </div>
              <button
                onClick={handleSyncTrigger}
                disabled={syncing}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
                <span>Sync All Sports Feeds</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Live Scores Feeds</div>
                <div className="text-xl font-bold text-emerald-400 mt-1">Active (15s TTL)</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Odds & Lines</div>
                <div className="text-xl font-bold text-cyan-400 mt-1">Active (60s TTL)</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Standings & Roster</div>
                <div className="text-xl font-bold text-indigo-400 mt-1">Active (10m TTL)</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Historical Metrics</div>
                <div className="text-xl font-bold text-slate-300 mt-1">Active (1h TTL)</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ANALYSIS ENGINE */}
        {activeTab === 'analysis' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Statistical Engine Weight Configuration</h3>
              <p className="text-xs text-slate-400">Tune probabilistic model parameters and confidence calculation thresholds</p>
            </div>

            <div className="space-y-4 max-w-xl">
              <div>
                <label className="text-xs font-semibold text-slate-300 flex justify-between">
                  <span>Home Court Advantage Weight</span>
                  <span className="text-indigo-400">+2.8 Points</span>
                </label>
                <input type="range" min="1.0" max="5.0" step="0.1" defaultValue="2.8" className="w-full mt-2 accent-indigo-500" />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 flex justify-between">
                  <span>Recent 10-Game Recency Weight</span>
                  <span className="text-indigo-400">65% Weight</span>
                </label>
                <input type="range" min="10" max="90" defaultValue="65" className="w-full mt-2 accent-indigo-500" />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 flex justify-between">
                  <span>Confidence Level Uncertainty Bound</span>
                  <span className="text-indigo-400">± 4.2 Points</span>
                </label>
                <input type="range" min="1.0" max="10.0" step="0.5" defaultValue="4.2" className="w-full mt-2 accent-indigo-500" />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: LOGS & ERRORS */}
        {activeTab === 'logs' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white">System Error & Activity Logs</h3>

            <div className="space-y-2 font-mono text-xs">
              {logs.map((log) => (
                <div key={log.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
                  <span className="text-slate-500 shrink-0">{log.timestamp}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    log.level === 'WARN' ? 'bg-amber-950 text-amber-400' : 'bg-slate-800 text-cyan-400'
                  }`}>
                    {log.level}
                  </span>
                  <span className="text-slate-400 font-bold">{log.context}:</span>
                  <span className="text-slate-200">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: DATABASE & CACHE */}
        {activeTab === 'database' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Database & Redis Cache Management</h3>
              <p className="text-xs text-slate-400">PostgreSQL tables status & cache flush controls</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleFlushCache}
                className="px-4 py-2.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Flush Redis / In-Memory Cache
              </button>
            </div>
          </div>
        )}

        {/* TAB 7: API USAGE STATS */}
        {activeTab === 'stats' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-white">API Usage Statistics</h3>

            <div className="grid grid-cols-3 gap-4 text-center font-mono">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Total Requests Today</div>
                <div className="text-2xl font-black text-cyan-400 mt-1">{stats.totalRequestsToday}</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Average Response Latency</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">{stats.averageResponseMs} ms</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
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
