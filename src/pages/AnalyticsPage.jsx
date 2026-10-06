import React from 'react';
import { Download, ArrowUpRight } from 'lucide-react';
import { ANALYTICS_KPI, ATTACK_DISTRIBUTION, TOP_ATTACKED_ASSETS } from '../data/analytics';

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6 bg-[#F5F8FC] min-h-screen text-[#152033] font-sans">
      {/* Header & Top Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#152033] tracking-wide">Security Analytics</h1>
          <p className="text-xs text-[#69778A] mt-1">Gain deep insights from your security data</p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <select className="px-3 py-1.5 bg-white border border-[#E7ECF2] rounded-lg text-[#152033] focus:outline-none shadow-sm">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Last 24 Hours</option>
          </select>
          <button
            onClick={() => alert('Exporting analytics report...')}
            className="px-4 py-1.5 rounded-lg bg-white border border-[#E7ECF2] text-[#152033] hover:bg-[#F5F8FC] font-bold flex items-center gap-2 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ANALYTICS_KPI.map((kpi, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white border border-[#E7ECF2] shadow-sm space-y-2">
            <div className="text-xs text-[#69778A] font-semibold">{kpi.label}</div>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-black text-[#152033] font-mono">{kpi.value}</div>
              <div className="flex items-center gap-0.5 text-xs font-mono font-bold text-rose-600">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {kpi.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Grid: Events vs Alerts & Attack Type Distribution Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart: Events vs Alerts */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-[#E7ECF2] p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#69778A] uppercase tracking-wider font-mono">Events vs Alerts</h3>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#2563EB] font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" /> Events
              </span>
              <span className="flex items-center gap-1.5 text-rose-500 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Alerts
              </span>
            </div>
          </div>

          <svg width="100%" height="220" viewBox="0 0 600 220" className="overflow-visible">
            <defs>
              <linearGradient id="anaLightEvt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {[0, 50, 100, 150, 200].map((val) => (
              <g key={val}>
                <line x1="30" y1={200 - val} x2="580" y2={200 - val} stroke="#E7ECF2" strokeWidth="1" />
                <text x="22" y={204 - val} textAnchor="end" fill="#69778A" fontSize="9" fontFamily="monospace">{val}k</text>
              </g>
            ))}

            <path d="M 30 180 Q 170 80 320 120 T 580 50 L 580 200 L 30 200 Z" fill="url(#anaLightEvt)" />
            <path d="M 30 180 Q 170 80 320 120 T 580 50" fill="none" stroke="#2563EB" strokeWidth="2.5" />
            <path d="M 30 190 Q 170 140 320 160 T 580 110" fill="none" stroke="#FF477E" strokeWidth="2.5" strokeDasharray="4,4" />
          </svg>
        </div>

        {/* Attack Type Distribution Donut Chart */}
        <div className="rounded-2xl bg-white border border-[#E7ECF2] p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <h3 className="text-xs font-bold text-[#69778A] uppercase tracking-wider font-mono">Attack Type Distribution</h3>

          <div className="relative flex justify-center my-2">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="58" fill="none" stroke="#2563EB" strokeWidth="20" strokeDasharray="115 365" />
              <circle cx="80" cy="80" r="58" fill="none" stroke="#F59E0B" strokeWidth="20" strokeDasharray="76 365" strokeDashoffset="-115" />
              <circle cx="80" cy="80" r="58" fill="none" stroke="#EF4444" strokeWidth="20" strokeDasharray="55 365" strokeDashoffset="-191" />
              <circle cx="80" cy="80" r="58" fill="none" stroke="#06B6D4" strokeWidth="20" strokeDasharray="44 365" strokeDashoffset="-246" />
              <circle cx="80" cy="80" r="58" fill="none" stroke="#8B5CF6" strokeWidth="20" strokeDasharray="36 365" strokeDashoffset="-290" />
              <circle cx="80" cy="80" r="58" fill="none" stroke="#10B981" strokeWidth="20" strokeDasharray="36 365" strokeDashoffset="-326" />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-black text-[#152033] font-mono">12.8K</span>
              <span className="text-[10px] text-[#69778A] font-mono font-bold">Attacks</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-3 border-t border-[#E7ECF2]">
            {ATTACK_DISTRIBUTION.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-[#152033]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-[11px] font-medium">{item.name}</span>
                </div>
                <strong className="text-[#152033]">{item.percentage}%</strong>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Row: Risk Score Trend & Top Attacked Assets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Risk Score Trend */}
        <div className="rounded-2xl bg-white border border-[#E7ECF2] p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#69778A] uppercase tracking-wider font-mono">Risk Score Trend</h3>
            <div className="text-xs font-mono font-bold text-[#152033]">Current Risk: <span className="text-rose-600">62/100</span></div>
          </div>

          <div className="h-32 flex items-end justify-between gap-3 pt-6 border-b border-[#E7ECF2] font-mono text-[10px] text-[#69778A]">
            {[45, 52, 68, 55, 74, 62, 58, 62].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-[#2563EB]/20 rounded-t-lg transition-all" style={{ height: `${v}%` }}>
                  <div className="w-full bg-[#2563EB] rounded-t-lg" style={{ height: '30%' }} />
                </div>
                <span>Day {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Attacked Assets (Magenta/Pink horizontal bars) */}
        <div className="rounded-2xl bg-white border border-[#E7ECF2] p-6 space-y-4 shadow-sm">
          <h3 className="text-xs font-bold text-[#69778A] uppercase tracking-wider font-mono">Top Attacked Assets</h3>

          <div className="space-y-3 font-mono text-xs">
            {TOP_ATTACKED_ASSETS.map((asset) => (
              <div key={asset.name} className="space-y-1">
                <div className="flex justify-between text-[#152033]">
                  <span className="font-bold">{asset.name}</span>
                  <span className="text-[#69778A]">{asset.count.toLocaleString()}</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#F5F8FC]">
                  <div
                    className="h-full rounded-full bg-[#FF477E] transition-all duration-500"
                    style={{ width: `${asset.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
