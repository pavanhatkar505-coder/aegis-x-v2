import React from 'react';
import { Globe } from 'lucide-react';
import {
  GLOBE_NODES,
  TOP_ATTACKING_COUNTRIES,
  THREAT_CATEGORIES,
  RECENT_GLOBAL_ACTIVITY
} from '../data/threats';

export default function ThreatMapPage() {
  return (
    <div className="p-6 space-y-6 bg-[#07111D] min-h-screen text-[#F5F7FA] font-sans">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#F5F7FA] tracking-wide">Global Threat Intelligence</h1>
        <p className="text-xs text-[#8593A5] mt-1">Live attack landscape and geographic threat distribution.</p>
      </div>

      {/* Main Grid: 3D Globe Canvas & Live Statistics Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main 3D Globe & Attack Vectors Card */}
        <div className="lg:col-span-3 rounded-xl bg-[#101D2A] border border-white/10 p-6 relative overflow-hidden shadow-2xl min-h-[440px] flex flex-col justify-between">
          
          {/* Subtle World Map Graphic Backdrop */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none mix-blend-screen"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80')`
            }}
          />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#11C5D9]" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">GLOBAL THREAT MAP CANVAS</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Live Attack Feed
            </div>
          </div>

          {/* Interactive Globe Nodes & Glowing Curved Arcs */}
          <div className="relative z-10 my-auto h-72 flex items-center justify-center">
            <div className="relative w-full max-w-3xl h-full border border-[#11C5D9]/20 rounded-2xl bg-[#08131F]/90 p-4 backdrop-blur-md flex items-center justify-around">
              
              {/* Node USA */}
              <div className="text-center space-y-1 relative">
                <div className="w-12 h-12 rounded-full bg-[#FF4D5E]/20 border-2 border-[#FF4D5E] flex items-center justify-center text-[#FF4D5E] font-mono font-bold text-xs shadow-lg shadow-[#FF4D5E]/40 animate-pulse">
                  USA
                </div>
                <div className="text-[11px] font-mono font-bold text-white">USA</div>
                <div className="text-[9px] font-mono text-[#FF8A4C]">1,240 attacks</div>
              </div>

              {/* Glowing Curved Connecting Arc Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path d="M 110 140 Q 280 40 450 140" stroke="#FF4D5E" strokeWidth="2" strokeDasharray="6,4" fill="none" className="animate-pulse" />
                <path d="M 450 140 Q 300 220 150 140" stroke="#FF8A4C" strokeWidth="2" strokeDasharray="4,4" fill="none" />
              </svg>

              {/* Node Germany */}
              <div className="text-center space-y-1 relative">
                <div className="w-12 h-12 rounded-full bg-[#3B82F6]/20 border-2 border-[#3B82F6] flex items-center justify-center text-[#3B82F6] font-mono font-bold text-xs shadow-lg shadow-[#3B82F6]/40">
                  DE
                </div>
                <div className="text-[11px] font-mono font-bold text-white">Germany</div>
                <div className="text-[9px] font-mono text-[#8593A5]">299 attacks</div>
              </div>

              {/* Node Brazil */}
              <div className="text-center space-y-1 relative">
                <div className="w-12 h-12 rounded-full bg-[#FF8A4C]/20 border-2 border-[#FF8A4C] flex items-center justify-center text-[#FF8A4C] font-mono font-bold text-xs shadow-lg shadow-[#FF8A4C]/40">
                  BR
                </div>
                <div className="text-[11px] font-mono font-bold text-white">Brazil</div>
                <div className="text-[9px] font-mono text-[#8593A5]">312 attacks</div>
              </div>

              {/* Node India */}
              <div className="text-center space-y-1 relative">
                <div className="w-12 h-12 rounded-full bg-[#FF4D5E]/20 border-2 border-[#FF4D5E] flex items-center justify-center text-[#FF4D5E] font-mono font-bold text-xs shadow-lg shadow-[#FF4D5E]/40 animate-pulse">
                  IN
                </div>
                <div className="text-[11px] font-mono font-bold text-white">India</div>
                <div className="text-[9px] font-mono text-[#FF8A4C]">182 attacks</div>
              </div>

              {/* Node Australia */}
              <div className="text-center space-y-1 relative">
                <div className="w-12 h-12 rounded-full bg-[#20D89B]/20 border-2 border-[#20D89B] flex items-center justify-center text-[#20D89B] font-mono font-bold text-xs shadow-lg shadow-[#20D89B]/40">
                  AU
                </div>
                <div className="text-[11px] font-mono font-bold text-white">Australia</div>
                <div className="text-[9px] font-mono text-[#8593A5]">80 attacks</div>
              </div>

            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 text-xs font-mono text-[#8593A5]">
            <span>GEOGRAPHIC VECTOR AGGREGATION: ACTIVE</span>
            <span className="text-[#11C5D9]">ENCRYPTION LAYER: ACTIVE</span>
          </div>

        </div>

        {/* Live Statistics & Top Attacking Countries Sidebar Card */}
        <div className="rounded-xl bg-[#101D2A] border border-white/10 p-5 space-y-6 shadow-xl flex flex-col justify-between">
          
          {/* Live Statistics Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider font-mono">Live Statistics</h3>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#08131F] border border-white/5">
                <div className="text-[10px] text-[#8593A5]">Total Attacks</div>
                <div className="text-base font-extrabold text-[#FF4D5E] mt-0.5">12,842</div>
              </div>

              <div className="p-3 rounded-lg bg-[#08131F] border border-white/5">
                <div className="text-[10px] text-[#8593A5]">Countries</div>
                <div className="text-base font-extrabold text-[#11C5D9] mt-0.5">87</div>
              </div>

              <div className="p-3 rounded-lg bg-[#08131F] border border-white/5">
                <div className="text-[10px] text-[#8593A5]">Malware IPs</div>
                <div className="text-base font-extrabold text-[#FF8A4C] mt-0.5">2,341</div>
              </div>

              <div className="p-3 rounded-lg bg-[#08131F] border border-white/5">
                <div className="text-[10px] text-[#8593A5]">Active Campaigns</div>
                <div className="text-base font-extrabold text-[#20D89B] mt-0.5">18</div>
              </div>
            </div>
          </div>

          {/* Top Attacking Countries Section */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <h3 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider font-mono">Top Attacking Countries</h3>

            <div className="space-y-2 font-mono text-xs">
              {TOP_ATTACKING_COUNTRIES.map((c) => (
                <div key={c.name} className="flex items-center justify-between p-2 rounded-lg bg-[#08131F] border border-white/5">
                  <div className="flex items-center gap-2">
                    <span>{c.flag}</span>
                    <span className="font-bold text-slate-200">{c.name}</span>
                  </div>
                  <strong className="text-[#FF4D5E] font-bold">{c.attacks.toLocaleString()}</strong>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Row: Threat Categories & Recent Global Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Threat Categories Distribution */}
        <div className="rounded-xl bg-[#101D2A] border border-white/10 p-5 space-y-4 shadow-xl">
          <h3 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider font-mono">Threat Categories</h3>

          <div className="space-y-3 font-mono text-xs">
            {THREAT_CATEGORIES.map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between mb-1 text-slate-300">
                  <span>{cat.name}</span>
                  <span className="font-bold" style={{ color: cat.color }}>{cat.percentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#08131F]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Global Activity */}
        <div className="rounded-xl bg-[#101D2A] border border-white/10 p-5 space-y-4 shadow-xl">
          <h3 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider font-mono">Recent Global Activity</h3>

          <div className="space-y-2 font-mono text-xs">
            {RECENT_GLOBAL_ACTIVITY.map((act, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-[#08131F] border border-white/5">
                <span className="text-[#11C5D9] font-bold">{act.ip}</span>
                <span className="text-[#F5F7FA] font-medium">{act.action}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF4D5E]/15 text-[#FF4D5E] border border-[#FF4D5E]/30">
                  {act.severity}
                </span>
                <span className="text-[#8593A5] text-[11px]">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
