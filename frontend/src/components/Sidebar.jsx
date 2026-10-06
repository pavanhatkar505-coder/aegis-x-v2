import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Radio, ShieldAlert, Globe, Fingerprint, Network,
  Crosshair, BarChart3, Brain, FileText, Activity, Settings, Shield
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

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-56 bg-[#07111C] border-r border-white/10 flex flex-col shrink-0 h-screen sticky top-0 z-30 font-sans select-none">
      {/* Brand / Logo Header */}
      <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Shield className="w-4.5 h-4.5 text-white" />
        </div>
        <span className="text-base font-black text-white tracking-widest font-mono">AEGIS-X</span>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to || (item.to !== '/overview' && location.pathname.startsWith(item.to));

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#FF8A4C] text-white font-bold shadow-md shadow-orange-500/20'
                  : 'text-[#8593A5] hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#8593A5]'}`} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Admin Profile Footer */}
      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-[#0F1C2B]">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-[11px] font-bold">
            SA
          </div>
          <div className="overflow-hidden">
            <div className="text-[11px] font-bold text-slate-200 truncate">Security Analyst</div>
            <div className="text-[9px] text-[#8593A5] truncate">admin@aegis-x.local</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
