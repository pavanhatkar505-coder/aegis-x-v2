import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ArrowRight, Clock, ShieldAlert, Lock, MoreHorizontal } from 'lucide-react';

export default function IncidentDetailPage({ onOpenDecisionLayer }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = ['Overview', 'Timeline', 'Related Events', 'Affected Assets', 'User Activity', 'Correlation', 'AI Analysis', 'Notes'];

  const timelineEvents = [
    { time: '14:10:00', type: 'Failed Login', desc: 'Invalid credentials', status: 'failed' },
    { time: '14:10:01', type: 'Failed Login', desc: 'Invalid credentials', status: 'failed' },
    { time: '14:10:02', type: 'Failed Login', desc: 'Invalid credentials', status: 'failed' },
    { time: '14:10:03', type: 'Failed Login', desc: 'Invalid credentials', status: 'failed' },
    { time: '14:10:05', type: 'Successful Login', desc: 'Valid credentials', status: 'success' },
    { time: '14:10:06', type: 'Privilege Change', desc: 'Added to sudo group', status: 'privilege' },
  ];

  return (
    <div className="p-6 space-y-6 bg-[#F5F8FC] min-h-screen text-[#152033] font-sans">
      {/* Top Breadcrumb Nav */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-[#69778A]">
          <button onClick={() => navigate('/incidents')} className="hover:text-[#2563EB] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Incidents
          </button>
          <span>/</span>
          <span className="font-bold text-[#2563EB]">{id || 'INC-1042'}</span>
        </div>
      </div>

      {/* Header Banner & Buttons */}
      <div className="p-6 rounded-2xl bg-white border border-[#E7ECF2] shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-black text-[#152033] tracking-tight">Brute Force Login</h1>
          <span className="px-2.5 py-0.5 rounded-md text-xs font-black bg-rose-100 text-rose-700 border border-rose-200">
            HIGH
          </span>
        </div>

        <div className="flex items-center gap-2.5 text-xs font-mono">
          <button className="px-4 py-2 rounded-xl bg-[#2563EB] text-white font-bold hover:bg-blue-700 shadow-md shadow-blue-500/20">
            Investigate
          </button>
          <button className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 font-bold hover:bg-rose-100">
            Escalate
          </button>
          <button className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold hover:bg-emerald-100">
            Mark Resolved
          </button>
          <button className="p-2 rounded-xl bg-white border border-[#E7ECF2] text-[#69778A] hover:text-[#152033]">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sub-nav Tabs */}
      <div className="flex items-center gap-1 border-b border-[#E7ECF2] pb-1 overflow-x-auto text-xs font-medium">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-[#2563EB] text-white font-bold shadow-md shadow-blue-500/15'
                : 'text-[#69778A] hover:text-[#152033] hover:bg-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Grid: Risk Assessment & Recommended Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Card: Risk Assessment */}
        <div className="rounded-2xl bg-white border border-[#E7ECF2] p-6 space-y-4 shadow-sm">
          <h3 className="text-xs font-bold text-[#69778A] uppercase tracking-wider font-mono">Risk Assessment</h3>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
            
            {/* Radial Risk Gauge */}
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="55" fill="none" stroke="#F5F8FC" strokeWidth="14" />
                <circle
                  cx="70"
                  cy="70"
                  r="55"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="14"
                  strokeDasharray="345"
                  strokeDashoffset="52"
                  strokeLinecap="round"
                  transform="rotate(-90 70 70)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-[#152033] font-mono">85</span>
                <span className="text-[10px] font-bold text-rose-600 font-mono">/100</span>
                <span className="text-[10px] font-black text-rose-600 tracking-wider">HIGH RISK</span>
              </div>
            </div>

            {/* Metadata Table */}
            <div className="space-y-1.5 text-xs font-mono text-[#152033] flex-1 w-full">
              <div className="flex justify-between border-b border-[#E7ECF2] pb-1">
                <span className="text-[#69778A]">Severity:</span>
                <strong className="text-rose-600">HIGH</strong>
              </div>
              <div className="flex justify-between border-b border-[#E7ECF2] pb-1">
                <span className="text-[#69778A]">Priority:</span>
                <strong className="text-rose-600">HIGH</strong>
              </div>
              <div className="flex justify-between border-b border-[#E7ECF2] pb-1">
                <span className="text-[#69778A]">Confidence:</span>
                <strong className="text-[#2563EB]">91%</strong>
              </div>
              <div className="flex justify-between border-b border-[#E7ECF2] pb-1">
                <span className="text-[#69778A]">First Seen:</span>
                <span className="text-slate-600 text-[11px]">2026-08-30 14:10:00</span>
              </div>
              <div className="flex justify-between border-b border-[#E7ECF2] pb-1">
                <span className="text-[#69778A]">Last Seen:</span>
                <span className="text-slate-600 text-[11px]">2026-08-30 14:12:45</span>
              </div>
              <div className="flex justify-between border-b border-[#E7ECF2] pb-1">
                <span className="text-[#69778A]">Affected Asset:</span>
                <strong className="text-[#152033]">AUTH-01</strong>
              </div>
              <div className="flex justify-between border-b border-[#E7ECF2] pb-1">
                <span className="text-[#69778A]">User:</span>
                <strong className="text-[#2563EB]">alice</strong>
              </div>
              <div className="flex justify-between border-b border-[#E7ECF2] pb-1">
                <span className="text-[#69778A]">Source IP:</span>
                <strong className="text-rose-600">192.168.1.50</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#69778A]">Failed Attempts:</span>
                <strong className="text-rose-600">5</strong>
              </div>
            </div>

          </div>
        </div>

        {/* Right Card: Recommended Action */}
        <div className="rounded-2xl bg-white border border-[#E7ECF2] p-6 space-y-5 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#69778A] uppercase tracking-wider font-mono">Recommended Action</h3>

            <div className="space-y-3 font-sans text-xs">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-[#E7ECF2]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-[#152033]">Investigate the affected asset</span>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-[#E7ECF2]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-[#152033]">Verify user identity and session</span>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-[#E7ECF2]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-[#152033]">Check for lateral movement</span>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-[#E7ECF2]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-[#152033]">Review system logs</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => alert('Starting live playbook investigation...')}
            className="w-full py-3.5 px-4 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all mt-4"
          >
            Investigate Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Bottom Card: Attack Timeline */}
      <div className="rounded-2xl bg-white border border-[#E7ECF2] p-6 space-y-4 shadow-sm">
        <h3 className="text-xs font-bold text-[#69778A] uppercase tracking-wider font-mono flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#2563EB]" /> Attack Timeline
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-mono text-xs">
          {timelineEvents.map((ev, idx) => {
            let dotColor = 'bg-rose-500';
            if (ev.status === 'success') dotColor = 'bg-emerald-500';
            if (ev.status === 'privilege') dotColor = 'bg-amber-500';

            return (
              <div key={idx} className="p-3.5 rounded-xl bg-[#F5F8FC] border border-[#E7ECF2] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[#69778A] font-bold">{ev.time}</span>
                  <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
                </div>
                <div className="text-[#152033] font-bold">{ev.type}</div>
                <div className="text-[10px] text-[#69778A]">{ev.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
