import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Radio, ShieldAlert, Globe, Fingerprint, Network,
  Crosshair, BarChart3, Brain, FileText, Activity, Settings, Shield,
  Cpu, Database
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/overview', icon: LayoutDashboard, label: 'Overview' },
  { to: '/live-events', icon: Radio, label: 'Live Events' },
  { to: '/incidents', icon: ShieldAlert, label: 'Incidents' },
  { to: '/threat-map', icon: Globe, label: 'Threat Map' },
  { to: '/identity-risk', icon: Fingerprint, label: 'Identity Risk' },
  { to: '/network-topology', icon: Network, label: 'Network Topology' },
  { to: '/simulation-lab', icon: Crosshair, label: 'Simulation Lab' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/ai-analyst', icon: Brain, label: 'AI Analyst' },
  { to: '/reports', icon: FileText, label: 'Reports' },
  { to: '/system-health', icon: Activity, label: 'System Health' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ onOpenDecisionLayer }) {
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#0a101d] border-r border-slate-800/80 flex flex-col shrink-0 h-screen select-none z-30 shadow-2xl shadow-black/80">
      {/* Brand Header */}
      <div className="h-16 px-5 border-b border-slate-800/80 flex items-center justify-between shrink-0 bg-[#080d19]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 border border-cyan-400/30">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-base font-black text-white tracking-widest font-mono leading-none">AEGIS-X</div>
            <div className="text-[9px] font-mono text-cyan-400 tracking-wider mt-1 uppercase font-bold">Autonomous SOC</div>
          </div>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" title="System Operational" />
      </div>

      {/* Navigation List */}
      <nav className="flex-1 py-3 px-3 space-y-1 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to || (item.to !== '/overview' && location.pathname.startsWith(item.to));

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold shadow-md shadow-orange-500/25'
                  : 'text-[#8593A5] hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#8593A5]'}`} />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}

        {/* ─── Decision Layer Direct Triggers ─── */}
        <div className="pt-3 pb-2 px-1 border-t border-slate-800/80 mt-2">
          <div className="px-2 pb-2 text-[10px] font-mono font-bold tracking-wider text-cyan-400 uppercase flex items-center justify-between">
            <span>Decision Support</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </div>

          <button
            onClick={onOpenDecisionLayer}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-cyan-300 hover:text-white bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 transition-all cursor-pointer mb-2 shadow-sm group"
          >
            <div className="flex items-center gap-2.5">
              <Cpu className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform" />
              <span className="font-bold text-xs font-['Outfit']">Vortex Simulator</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
              VORTEX
            </span>
          </button>

          <button
            onClick={onOpenDecisionLayer}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-purple-300 hover:text-white bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 transition-all cursor-pointer shadow-sm group"
          >
            <div className="flex items-center gap-2.5">
              <Database className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-xs font-['Outfit']">Outcome Memory</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
              SQLITE
            </span>
          </button>
        </div>
      </nav>

      {/* Admin Profile Footer */}
      <div className="p-3.5 border-t border-slate-800/80 bg-[#080d19] shrink-0">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-black shadow-md shrink-0">
            SA
          </div>
          <div className="overflow-hidden flex-1 min-w-0">
            <div className="text-xs font-bold text-slate-200 truncate">Security Analyst</div>
            <div className="text-[10px] text-slate-400 font-mono truncate">admin@aegis-x.local</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
