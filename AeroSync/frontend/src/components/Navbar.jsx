import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Radio, Activity, ShieldCheck, Clock, Terminal } from 'lucide-react';
import api from '../api/api';

export default function Navbar({ onOpenSearchModal }) {
  const [query, setQuery] = useState('');
  const [systemStatus, setSystemStatus] = useState('ONLINE');
  const [time, setTime] = useState(new Date().toUTCString().slice(17, 25));
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toUTCString().slice(17, 25));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    api.getStatus()
      .then((res) => {
        if (res.data && res.data.status) {
          setSystemStatus('ONLINE_OPERATIONAL');
        }
      })
      .catch(() => setSystemStatus('DISCONNECTED'));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 h-20 bg-aviation-950/80 backdrop-blur-xl border-b border-cyan-500/20 px-6 flex items-center justify-between gap-4">
      {/* Global Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400 transition-colors group-hover:text-cyan-300" />
          <input
            type="text"
            placeholder="Search flights, airports, aircraft, passengers (KMP + Trie powered)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-aviation-900/90 border border-cyan-500/30 rounded-xl pl-10 pr-12 py-2.5 text-xs font-mono text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-inner"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            ENTER
          </span>
        </div>
      </form>

      {/* Right Controls & Telemetry */}
      <div className="flex items-center gap-4">
        {/* UTC Live Clock */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-aviation-900/60 border border-cyan-500/20 text-slate-300 font-mono text-xs">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-cyan-200">{time}</span>
          <span className="text-[10px] text-slate-500">UTC</span>
        </div>

        {/* System Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-aviation-900/60 border border-cyan-500/20 font-mono text-xs">
          <Radio className={`w-3.5 h-3.5 ${systemStatus === 'DISCONNECTED' ? 'text-rose-400' : 'text-emerald-400 animate-pulse'}`} />
          <span className="hidden sm:inline text-slate-400">System:</span>
          <span className={systemStatus === 'DISCONNECTED' ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
            {systemStatus === 'DISCONNECTED' ? 'OFFLINE' : 'ONLINE'}
          </span>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl bg-aviation-900/80 border border-cyan-500/20 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/50 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 glass-panel rounded-2xl border border-cyan-500/40 p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3">
                <h4 className="text-xs font-mono font-bold text-slate-100 uppercase tracking-wide">
                  Live Flight Alerts
                </h4>
                <span className="text-[10px] font-mono text-cyan-400">2 Active</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30">
                  <p className="text-cyan-300 font-bold">HYD ➔ LHR Route Optimized</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Dijkstra calculated 7,460 km via DXB.</p>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30">
                  <p className="text-amber-300 font-bold">Gate G02 Turnaround</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Flight AI202 docked at Gate G02.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
