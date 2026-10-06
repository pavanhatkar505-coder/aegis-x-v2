import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, Shield, Radio, Activity } from 'lucide-react';

export default function TopBar({ isLightTheme = false }) {
  const location = useLocation();
  const isThreatMap = location.pathname === '/threat-map';

  return (
    <header className="h-16 px-6 lg:px-8 border-b border-slate-800/80 bg-[#0a101d] text-[#F5F7FA] flex items-center justify-between font-sans w-full shrink-0 shadow-sm z-20">
      {/* Search Input Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search assets, IP addresses, CVEs, or threat signatures..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs font-mono bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4 text-xs font-mono">
        {/* System Heartbeat / SOC Status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-bold tracking-wide">SOC DEFCON 3</span>
        </div>

        {isThreatMap && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
            <Radio className="w-3.5 h-3.5 animate-spin" /> Live Map Feed
          </div>
        )}

        {/* Time Filter */}
        <select className="px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-900 border border-slate-700/80 text-slate-300 focus:outline-none focus:border-cyan-400 cursor-pointer">
          <option value="24h">Timeframe: Last 24 Hours</option>
          <option value="7d">Timeframe: Last 7 Days</option>
          <option value="30d">Timeframe: Last 30 Days</option>
        </select>

        {/* Notification Bell */}
        <button className="relative p-2 rounded-xl border border-slate-700/80 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-600 transition-colors cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center shadow-md shadow-red-500/50">
            3
          </span>
        </button>

        {/* Quick User Avatar */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-black shadow-md shadow-cyan-500/20">
            SA
          </div>
          <div className="hidden xl:block">
            <div className="text-xs font-bold text-white font-sans">Admin Console</div>
            <div className="text-[10px] text-emerald-400">Connected to Controller</div>
          </div>
        </div>
      </div>
    </header>
  );
}
