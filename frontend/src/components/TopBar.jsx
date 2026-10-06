import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';

export default function TopBar({ isLightTheme = false }) {
  const location = useLocation();
  const isThreatMap = location.pathname === '/threat-map';

  return (
    <header
      className={`h-14 px-6 border-b flex items-center justify-between font-sans transition-colors ${
        isLightTheme
          ? 'bg-white border-[#E7ECF2] text-[#152033]'
          : 'bg-[#07111C] border-white/10 text-[#F5F7FA]'
      }`}
    >
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search
            className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
              isLightTheme ? 'text-[#69778A]' : 'text-[#8593A5]'
            }`}
          />
          <input
            type="text"
            placeholder="Search users, assets, incidents..."
            className={`w-full pl-9 pr-4 py-1.5 rounded-lg text-xs font-mono transition-colors focus:outline-none ${
              isLightTheme
                ? 'bg-[#F5F8FC] border border-[#E7ECF2] text-[#152033] placeholder-[#69778A] focus:border-[#2563EB]'
                : 'bg-[#101D2A] border border-white/10 text-[#F5F7FA] placeholder-[#8593A5] focus:border-[#11C5D9]'
            }`}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs">
        {isThreatMap && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </div>
        )}

        <select
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors focus:outline-none ${
            isLightTheme
              ? 'bg-[#F5F8FC] border border-[#E7ECF2] text-[#152033]'
              : 'bg-[#101D2A] border border-white/10 text-[#8593A5]'
          }`}
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>

        <button
          className={`relative p-2 rounded-lg border transition-colors ${
            isLightTheme
              ? 'bg-[#F5F8FC] border-[#E7ECF2] text-[#69778A] hover:text-[#152033]'
              : 'bg-[#101D2A] border-white/10 text-[#8593A5] hover:text-[#F5F7FA]'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            SA
          </div>
          <div className="hidden sm:block">
            <div className={`text-xs font-bold leading-tight ${isLightTheme ? 'text-[#152033]' : 'text-slate-200'}`}>
              Admin
            </div>
            <div className={`text-[10px] ${isLightTheme ? 'text-[#69778A]' : 'text-[#8593A5]'}`}>
              Security Analyst
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
