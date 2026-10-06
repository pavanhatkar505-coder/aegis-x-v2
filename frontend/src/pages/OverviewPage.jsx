import React, { useState, useMemo } from 'react';
import { ShieldAlert, AlertTriangle, Activity, TrendingUp, ArrowUpRight } from 'lucide-react';
import { MOCK_INCIDENTS } from '../data/incidents';

function StatCard({ label, value, change, isPositive, topColorClass, icon: Icon }) {
  return (
    <div className={`p-5 rounded-xl bg-[#101D2A] border border-white/10 shadow-xl relative overflow-hidden font-sans border-t-2 ${topColorClass}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-[#8593A5]">{label}</span>
        {Icon && <Icon className="w-4 h-4 text-[#8593A5]" />}
      </div>
      <div className="flex items-baseline justify-between">
        <div className="text-2xl font-black text-[#F5F7FA] font-mono">{value}</div>
        {change && (
          <div className={`flex items-center gap-0.5 text-xs font-mono font-bold ${isPositive ? 'text-[#FF4D5E]' : 'text-[#20D89B]'}`}>
            <ArrowUpRight className="w-3.5 h-3.5" />
            {change}
          </div>
        )}
      </div>
    </div>
  );
}

function EventIngestionChart() {
  const width = 640, height = 190, pad = { l: 40, r: 10, t: 15, b: 25 };
  const points = 6;
  const times = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];

  const eventsData = [35, 52, 45, 82, 68, 92];
  const alertsData = [12, 22, 28, 48, 35, 55];

  const maxVal = 100;
  const toX = (i) => pad.l + (i / (points - 1)) * (width - pad.l - pad.r);
  const toY = (v) => pad.t + (1 - v / maxVal) * (height - pad.t - pad.b);

  const makePath = (data) => data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`).join(' ');
  const makeArea = (data) => makePath(data) + ` L ${toX(points - 1)} ${height - pad.b} L ${toX(0)} ${height - pad.b} Z`;

  return (
    <div className="p-5 rounded-xl bg-[#101D2A] border border-white/10 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#F5F7FA] tracking-wide">Event Ingestion & Alerts</h3>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-[#FF8A4C] font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF8A4C]" /> Events
          </span>
          <span className="flex items-center gap-1.5 text-[#FF4D5E] font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D5E]" /> Alerts
          </span>
        </div>
      </div>

      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        <defs>
          <linearGradient id="secEvtGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF8A4C" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FF8A4C" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="secAlertGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF4D5E" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FF4D5E" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {[0, 25, 50, 75, 100].map((val) => (
          <g key={val}>
            <line x1={pad.l} y1={toY(val)} x2={width - pad.r} y2={toY(val)} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <text x={pad.l - 8} y={toY(val) + 3} textAnchor="end" fill="#8593A5" fontSize="9" fontFamily="monospace">{val}</text>
          </g>
        ))}

        {times.map((lbl, idx) => (
          <text key={idx} x={toX(idx)} y={height - 5} textAnchor="middle" fill="#8593A5" fontSize="9" fontFamily="monospace">{lbl}</text>
        ))}

        <path d={makeArea(eventsData)} fill="url(#secEvtGrad)" />
        <path d={makePath(eventsData)} fill="none" stroke="#FF8A4C" strokeWidth="2.5" />

        <path d={makeArea(alertsData)} fill="url(#secAlertGrad)" />
        <path d={makePath(alertsData)} fill="none" stroke="#FF4D5E" strokeWidth="2.5" strokeDasharray="5,3" />
      </svg>
    </div>
  );
}

function ThreatLevelGauge({ score = 74 }) {
  const rad = 65;
  const circ = Math.PI * rad;
  const strokeDash = (score / 100) * circ;

  return (
    <div className="p-5 rounded-xl bg-[#101D2A] border border-white/10 shadow-xl flex flex-col items-center justify-between">
      <div className="w-full flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-[#F5F7FA] tracking-wide">Threat Level</h3>
      </div>

      <div className="relative flex flex-col items-center justify-center my-3">
        <svg width="170" height="100" viewBox="0 0 170 100">
          <defs>
            <linearGradient id="threatArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF477E" />
              <stop offset="50%" stopColor="#FF4D5E" />
              <stop offset="100%" stopColor="#FF8A4C" />
            </linearGradient>
          </defs>
          <path d="M 15 90 A 65 65 0 0 1 155 90" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" strokeLinecap="round" />
          <path
            d="M 15 90 A 65 65 0 0 1 155 90"
            fill="none"
            stroke="url(#threatArcGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${strokeDash} ${circ}`}
          />
        </svg>

        <div className="absolute bottom-1 flex flex-col items-center">
          <span className="text-3xl font-black text-[#F5F7FA] font-mono">{score}</span>
          <span className="text-xs font-black text-[#FF4D5E] tracking-wider">HIGH</span>
        </div>
      </div>

      <div className="w-full pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#8593A5]">
        <span>STATUS: ACTIVE THREAT</span>
        <span className="text-[#FF8A4C] font-bold">HIGH RISK</span>
      </div>
    </div>
  );
}

export default function OverviewPage() {
  const incidents = MOCK_INCIDENTS.slice(0, 4);

  return (
    <div className="p-6 space-y-6 font-sans">
      {/* Title & Subtitle Header */}
      <div>
        <h1 className="text-xl font-bold text-[#F5F7FA] tracking-wide">Security Operations</h1>
        <p className="text-xs text-[#8593A5] mt-1">Real-time visibility. Intelligent decisions. Proactive security.</p>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Incidents" value="12" change="+2 vs last 24h" isPositive={true} topColorClass="border-t-[#20D89B]" icon={ShieldAlert} />
        <StatCard label="Critical Alerts" value="3" change="+50% vs last 24h" isPositive={true} topColorClass="border-t-[#3B82F6]" icon={AlertTriangle} />
        <StatCard label="Events / Sec" value="2,481" change="+12% vs last 3h" isPositive={true} topColorClass="border-t-[#3B82F6]" icon={Activity} />
        <StatCard label="Avg. Risk Score" value="74/100" change="+4% vs last 24h" isPositive={true} topColorClass="border-t-[#20D89B]" icon={TrendingUp} />
      </div>

      {/* Second Row: Event Ingestion Chart & Threat Level Radial Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EventIngestionChart />
        </div>
        <ThreatLevelGauge score={74} />
      </div>

      {/* Third Row: Recent Incidents Table */}
      <div className="p-5 rounded-xl bg-[#101D2A] border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#F5F7FA] tracking-wide">Recent Incidents</h3>
          <a href="/incidents" className="text-xs font-mono font-bold text-[#FF8A4C] hover:underline">View All →</a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#07111D] text-[#8593A5] font-mono text-[11px] border-b border-white/10 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">ATTACK TYPE</th>
                <th className="py-3 px-4">ASSET</th>
                <th className="py-3 px-4">USER</th>
                <th className="py-3 px-4">RISK</th>
                <th className="py-3 px-4">SEVERITY</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">TIME</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-[#101D2A]">
              {incidents.map((inc) => (
                <tr key={inc.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#11C5D9]">{inc.id}</td>
                  <td className="py-3 px-4 font-bold text-[#F5F7FA]">{inc.attackType}</td>
                  <td className="py-3 px-4 font-mono text-[#8593A5]">{inc.asset}</td>
                  <td className="py-3 px-4 text-cyan-300">{inc.user}</td>
                  <td className="py-3 px-4 font-mono font-bold text-[#FF4D5E]">{inc.risk}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        inc.severity === 'High' || inc.severity === 'Critical'
                          ? 'bg-[#FF4D5E]/15 text-[#FF4D5E] border border-[#FF4D5E]/30'
                          : 'bg-[#FF8A4C]/15 text-[#FF8A4C] border border-[#FF8A4C]/30'
                      }`}
                    >
                      {inc.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF8A4C]" />
                      <span className="text-slate-300 text-[11px]">{inc.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[#8593A5] text-[11px]">{inc.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
