import React from 'react';
import { 
  ShieldAlert, AlertTriangle, Activity, TrendingUp, ArrowUpRight, 
  Zap, Radio, Server, Lock, Globe, ShieldCheck, ChevronRight 
} from 'lucide-react';
import { MOCK_INCIDENTS } from '../data/incidents';

function StatCard({ label, value, change, isPositive, topColorClass, icon: Icon }) {
  return (
    <div className={`p-5 rounded-2xl bg-[#0d1527] border border-slate-800/80 shadow-xl relative overflow-hidden font-sans border-t-2 ${topColorClass} hover:border-slate-700 transition-all group`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-400 font-['Outfit'] tracking-wider uppercase">{label}</span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="flex items-baseline justify-between">
        <div className="text-3xl font-black text-white font-mono tracking-tight">{value}</div>
        {change && (
          <div className={`flex items-center gap-0.5 text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
            isPositive ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
          }`}>
            <ArrowUpRight className="w-3.5 h-3.5" />
            {change}
          </div>
        )}
      </div>
    </div>
  );
}

function EventIngestionChart() {
  const width = 1000, height = 240, pad = { l: 45, r: 20, t: 25, b: 35 };
  const points = 6;
  const times = ['00:00 UTC', '04:00 UTC', '08:00 UTC', '12:00 UTC', '16:00 UTC', '20:00 UTC'];

  const eventsData = [35, 52, 45, 82, 68, 95];
  const alertsData = [12, 22, 28, 48, 35, 58];

  const maxVal = 100;
  const toX = (i) => pad.l + (i / (points - 1)) * (width - pad.l - pad.r);
  const toY = (v) => pad.t + (1 - v / maxVal) * (height - pad.t - pad.b);

  const makePath = (data) => data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`).join(' ');
  const makeArea = (data) => makePath(data) + ` L ${toX(points - 1)} ${height - pad.b} L ${toX(0)} ${height - pad.b} Z`;

  return (
    <div className="p-6 rounded-2xl bg-[#0d1527] border border-slate-800/80 shadow-xl space-y-4 w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide font-['Outfit']">Telemetry Ingestion & Anomaly Spikes</h3>
          <p className="text-xs text-slate-400 mt-0.5">Real-time aggregate events per second across all monitored subnets</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50" /> Log Streams (2.4k/s)
          </span>
          <span className="flex items-center gap-1.5 text-red-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-sm shadow-red-400/50" /> Correlated Alerts (58/s)
          </span>
        </div>
      </div>

      <div className="w-full flex-1 min-h-[220px]">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="overflow-visible w-full h-full">
          <defs>
            <linearGradient id="secEvtGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="secAlertGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {[0, 25, 50, 75, 100].map((val) => (
            <g key={val}>
              <line x1={pad.l} y1={toY(val)} x2={width - pad.r} y2={toY(val)} stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3,3" />
              <text x={pad.l - 10} y={toY(val) + 4} textAnchor="end" fill="#64748b" fontSize="10" fontFamily="monospace">{val}</text>
            </g>
          ))}

          {times.map((lbl, idx) => (
            <text key={idx} x={toX(idx)} y={height - 8} textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="monospace">{lbl}</text>
          ))}

          <path d={makeArea(eventsData)} fill="url(#secEvtGrad)" />
          <path d={makePath(eventsData)} fill="none" stroke="#38bdf8" strokeWidth="2.5" />

          <path d={makeArea(alertsData)} fill="url(#secAlertGrad)" />
          <path d={makePath(alertsData)} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="5,3" />
        </svg>
      </div>
    </div>
  );
}

function ThreatLevelGauge({ score = 74 }) {
  const rad = 75;
  const circ = Math.PI * rad;
  const strokeDash = (score / 100) * circ;

  return (
    <div className="p-6 rounded-2xl bg-[#0d1527] border border-slate-800/80 shadow-xl flex flex-col justify-between h-full">
      <div className="w-full flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-white tracking-wide font-['Outfit']">Global Threat Index</h3>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30">
          ELEVATED RISK
        </span>
      </div>

      <div className="relative flex flex-col items-center justify-center my-4">
        <svg width="220" height="125" viewBox="0 0 220 125">
          <defs>
            <linearGradient id="threatArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="45%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <path d="M 25 115 A 75 75 0 0 1 195 115" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="16" strokeLinecap="round" />
          <path
            d="M 25 115 A 75 75 0 0 1 195 115"
            fill="none"
            stroke="url(#threatArcGrad)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={`${strokeDash} ${circ}`}
          />
        </svg>

        <div className="absolute bottom-1 flex flex-col items-center">
          <span className="text-4xl font-black text-white font-mono">{score}</span>
          <span className="text-xs font-black text-red-400 tracking-widest font-mono">SEV-CRITICAL</span>
        </div>
      </div>

      {/* Subnet breakdown meters */}
      <div className="space-y-2 pt-3 border-t border-slate-800/80 text-xs font-mono">
        <div className="flex justify-between items-center text-slate-400">
          <span>Auth Surface (SSH/PAM)</span>
          <span className="text-red-400 font-bold">91%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
          <div className="h-full bg-red-500 rounded-full" style={{ width: '91%' }} />
        </div>

        <div className="flex justify-between items-center text-slate-400 pt-1">
          <span>Lateral Movement Risk</span>
          <span className="text-amber-400 font-bold">64%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
          <div className="h-full bg-amber-500 rounded-full" style={{ width: '64%' }} />
        </div>
      </div>
    </div>
  );
}

export default function OverviewPage({ onOpenDecisionLayer }) {
  const incidents = MOCK_INCIDENTS.slice(0, 6);

  return (
    <div className="p-6 lg:p-8 space-y-6 font-sans w-full max-w-full">
      {/* ── Top Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        <div>
          <h1 className="text-2xl font-black text-white tracking-wide font-['Outfit']">Security Operations Command</h1>
          <p className="text-xs text-slate-400 mt-1">Autonomous threat detection • Isolated state twin simulations • Closed-loop mitigation</p>
        </div>

        {onOpenDecisionLayer && (
          <button
            onClick={onOpenDecisionLayer}
            className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/30 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer font-['Outfit'] tracking-wider border border-cyan-400/40"
          >
            <Zap className="w-4 h-4 text-cyan-200 fill-current animate-pulse" />
            <span>OPEN DECISION LAYER</span>
          </button>
        )}
      </div>

      {/* ── Critical Incident Alert Banner (Full Width) ── */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1c0d16] via-[#101b2d] to-[#0d1527] border border-red-500/40 shadow-2xl relative overflow-hidden flex flex-col xl:flex-row items-start xl:items-center justify-between gap-5 w-full">
        <div className="absolute top-0 right-0 w-80 h-40 bg-red-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0 shadow-lg shadow-red-500/25 animate-pulse">
            <ShieldAlert className="w-7 h-7 text-red-400" />
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-black bg-red-500/25 text-red-400 border border-red-500/50 tracking-wider">
                CRITICAL THREAT
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-500/25 text-amber-300 border border-amber-500/50 flex items-center gap-1.5 animate-pulse">
                <Radio className="w-3 h-3" /> DECISION REQUIRED
              </span>
              <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                INC-001
              </span>
            </div>

            <h2 className="text-base font-bold text-white mt-2 flex items-center gap-2 flex-wrap">
              <span>High-Frequency SSH Brute Force detected on</span>
              <span className="font-mono text-cyan-300 px-2 py-0.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40 font-bold">SERVER-02</span>
              <span>from</span>
              <span className="font-mono text-red-400 px-2 py-0.5 rounded-lg bg-red-950/80 border border-red-500/40 font-bold">185.220.101.4</span>
            </h2>

            <div className="flex items-center gap-5 mt-2 text-xs text-slate-400 font-mono flex-wrap">
              <span>Risk Score: <strong className="text-red-400 font-bold text-sm">87 / 100</strong></span>
              <span>•</span>
              <span>Target Service: <strong className="text-slate-200">sshd (Port 22)</strong></span>
              <span>•</span>
              <span>Vortex Simulator: <strong className="text-emerald-400">SNAP-7F31A2 Prepared</strong></span>
            </div>
          </div>
        </div>

        {onOpenDecisionLayer && (
          <button
            onClick={onOpenDecisionLayer}
            className="w-full xl:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:from-red-500 hover:to-orange-400 text-white font-bold text-xs shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2.5 shrink-0 transition-all hover:scale-105 cursor-pointer font-['Outfit'] tracking-wider border border-white/20 relative z-10"
          >
            <Zap className="w-4 h-4 fill-white animate-bounce" />
            <span>INVESTIGATE IN VORTEX</span>
          </button>
        )}
      </div>

      {/* ── Top 4 KPI Cards (Full Width Grid) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 w-full">
        <StatCard label="Active Incidents" value="12" change="+2 vs 24h" isPositive={true} topColorClass="border-t-emerald-400" icon={ShieldAlert} />
        <StatCard label="Critical Alerts" value="3" change="+50% vs 24h" isPositive={true} topColorClass="border-t-red-500" icon={AlertTriangle} />
        <StatCard label="Events / Sec" value="2,481" change="+12% surge" isPositive={true} topColorClass="border-t-cyan-400" icon={Activity} />
        <StatCard label="Avg. Risk Index" value="74/100" change="+4% drift" isPositive={true} topColorClass="border-t-purple-400" icon={TrendingUp} />
      </div>

      {/* ── Second Row: Telemetry Ingestion Chart & Threat Level Gauge (Full Width Grid) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-stretch">
        <div className="lg:col-span-2 w-full">
          <EventIngestionChart />
        </div>
        <div className="w-full">
          <ThreatLevelGauge score={74} />
        </div>
      </div>

      {/* ── Third Row: Recent Security Incidents Table (Full Width) ── */}
      <div className="p-6 rounded-2xl bg-[#0d1527] border border-slate-800/80 shadow-xl space-y-4 w-full">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-base font-bold text-white tracking-wide font-['Outfit']">Recent Security Incidents</h3>
            <p className="text-xs text-slate-400 mt-0.5">Prioritized threat events awaiting containment, triage, and sandbox verification</p>
          </div>
          <a href="/incidents" className="text-xs font-mono font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors">
            View All Incidents <ChevronRight size={14} />
          </a>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs font-sans table-auto">
            <thead className="bg-[#080d19] text-slate-400 font-mono text-[11px] border-b border-slate-800 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">INCIDENT ID</th>
                <th className="py-3.5 px-4">ATTACK TYPE</th>
                <th className="py-3.5 px-4">ASSET TARGET</th>
                <th className="py-3.5 px-4">USER CONTEXT</th>
                <th className="py-3.5 px-4">RISK</th>
                <th className="py-3.5 px-4">SEVERITY</th>
                <th className="py-3.5 px-4">DECISION STATUS</th>
                <th className="py-3.5 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-[#0d1527]">
              {incidents.map((inc) => {
                const isDecisionRequired = inc.id === 'INC-001';
                return (
                  <tr key={inc.id} className={`transition-colors ${isDecisionRequired ? 'bg-amber-500/[0.07] hover:bg-amber-500/[0.12]' : 'hover:bg-slate-800/40'}`}>
                    <td className="py-4 px-4 font-mono font-bold text-cyan-400 whitespace-nowrap">{inc.id}</td>
                    <td className="py-4 px-4 font-bold text-white flex items-center gap-2 whitespace-nowrap">
                      {inc.attackType}
                      {isDecisionRequired && (
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      )}
                    </td>
                    <td className="py-4 px-4 font-mono text-cyan-300 whitespace-nowrap">{inc.asset}</td>
                    <td className="py-4 px-4 text-slate-300 font-mono whitespace-nowrap">{inc.user}</td>
                    <td className="py-4 px-4 font-mono font-black text-red-400 whitespace-nowrap text-sm">{inc.risk}</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                          inc.severity === 'High' || inc.severity === 'Critical'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                        }`}
                      >
                        {inc.severity}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {isDecisionRequired ? (
                        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold flex items-center gap-1.5 w-fit animate-pulse">
                          <Radio className="w-3 h-3 text-amber-400" />
                          DECISION REQUIRED
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 font-mono text-slate-400">
                          <span className="w-2 h-2 rounded-full bg-orange-400" />
                          <span>{inc.status}</span>
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      {isDecisionRequired ? (
                        <button
                          onClick={onOpenDecisionLayer}
                          className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs font-['Outfit'] tracking-wider shadow-md shadow-cyan-500/25 cursor-pointer inline-flex items-center gap-1.5 transition-all hover:scale-105"
                        >
                          <Zap size={13} />
                          OPEN DECISION
                        </button>
                      ) : (
                        <a href={`/incidents/${inc.id}`} className="text-slate-400 hover:text-white font-mono text-xs flex items-center gap-1 justify-end">
                          Details <ChevronRight size={12} />
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
