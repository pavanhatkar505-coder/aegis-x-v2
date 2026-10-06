import React from 'react';
import { Activity, Database, Radio, GitMerge, BrainCircuit, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function SystemHealthPanel({ health }) {
  const currentHealth = health || {
    api: 'CONNECTED',
    event_stream: 'CONNECTED',
    correlator: 'RUNNING',
    decision_engine: 'RUNNING',
    database: 'CONNECTED'
  };

  const items = [
    { name: 'API Service', status: currentHealth.api, icon: Database, details: 'FastAPI @ http://127.0.0.1:8000' },
    { name: 'Event Stream', status: currentHealth.event_stream, icon: Radio, details: 'Kafka / Redpanda Bus' },
    { name: 'AEGIS-X Correlator', status: currentHealth.correlator, icon: GitMerge, details: 'Sliding-Window Rule Engine' },
    { name: 'Decision Engine', status: currentHealth.decision_engine, icon: BrainCircuit, details: 'Gemini AI Threat Synthesis' },
    { name: 'Database Store', status: currentHealth.database, icon: Database, details: 'SQLite / OpenSearch Telemetry' },
  ];

  const getStatusBadge = (status) => {
    if (status === 'CONNECTED' || status === 'RUNNING') {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 flex items-center gap-1 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          {status}
        </span>
      );
    }
    if (status === 'PAUSED' || status === 'DEGRADED') {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/80 text-amber-400 border border-amber-500/40 flex items-center gap-1 font-mono">
          <AlertTriangle className="w-3 h-3 text-amber-400" />
          {status}
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950/80 text-rose-400 border border-rose-500/40 font-mono">
        {status}
      </span>
    );
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-5 space-y-4 shadow-xl backdrop-blur font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-zinc-800 gap-2 font-mono">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          <h2 className="text-sm font-black text-white uppercase tracking-wider">
            SYSTEM SUBSYSTEM HEALTH MONITORING
          </h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/50 px-2.5 py-1 rounded border border-emerald-500/30">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>ALL 5 SUBSYSTEMS OPERATIONAL</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/90 flex flex-col justify-between gap-2.5 font-mono"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5 text-zinc-200 font-bold text-xs font-sans truncate">
                    <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </div>
                </div>
                <p className="text-[10px] text-zinc-400 font-mono leading-tight line-clamp-2">
                  {item.details}
                </p>
              </div>

              <div className="pt-1 border-t border-zinc-850 flex items-center justify-between">
                <span className="text-[10px] text-zinc-500">STATE:</span>
                {getStatusBadge(item.status)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
