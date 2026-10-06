import React from 'react';
import { Server, Activity, ShieldAlert, ShieldCheck, Wifi, Lock, ArrowDown, Cpu } from 'lucide-react';
import './DecisionWorkspace.css';

export default function SystemStateTwin({ state, selectedAction }) {
  if (!state) return null;

  const isSimulated = Boolean(selectedAction);
  const currentRisk = isSimulated ? selectedAction.impact.risk_after : state.risk;
  const currentSessions = isSimulated ? selectedAction.impact.sessions_after : state.active_sessions;
  const currentAvailability = isSimulated ? selectedAction.impact.availability : state.availability;
  const attackPathClosed = isSimulated ? selectedAction.impact.attack_path_closed : false;
  const serverIsolated = selectedAction?.id === 'ISOLATE_SERVER';

  return (
    <div className="vortex-panel">
      <div className="vortex-panel-header justify-between">
        <div className="flex items-center gap-2 text-cyan-400">
          <Server size={16} /> ISOLATED SYSTEM STATE (TWIN)
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 px-2 py-0.5 rounded">
          <Cpu size={12} className="animate-spin" /> SANDBOX COPY
        </div>
      </div>

      {/* Snapshot and Host Meta */}
      <div className="grid grid-cols-2 gap-3 text-xs mb-4">
        <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700/60 shadow-inner">
          <div className="text-slate-400 text-[10px] font-['Outfit'] tracking-wider mb-0.5">SNAPSHOT ID</div>
          <div className="font-mono text-cyan-400 text-sm font-bold">{state.snapshot_id || 'SNAP-7F31A2'}</div>
        </div>
        <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700/60 shadow-inner">
          <div className="text-slate-400 text-[10px] font-['Outfit'] tracking-wider mb-0.5">SERVER HEALTH</div>
          <div className={`font-mono text-sm font-bold ${serverIsolated ? 'text-amber-400' : 'text-emerald-400'}`}>
            {serverIsolated ? 'ISOLATED' : (state.auth_service || 'HEALTHY')}
          </div>
        </div>
      </div>

      {/* ── 3-Node Topology Flow ── */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 mb-4 space-y-2">
        <div className="text-[10px] font-bold text-slate-400 font-['Outfit'] tracking-wider uppercase flex items-center justify-between">
          <span>Attack Path Topology</span>
          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
            attackPathClosed 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
          }`}>
            {attackPathClosed ? 'PATH SEVERED' : 'EXPLOIT ACTIVE'}
          </span>
        </div>

        {/* Node 1: Threat Source */}
        <div className={`p-2.5 rounded-lg border flex items-center justify-between transition-all ${
          attackPathClosed 
            ? 'bg-slate-900/60 border-slate-700/60 opacity-60' 
            : 'bg-red-950/30 border-red-500/40 shadow-sm shadow-red-500/10'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-2.5 h-2.5 rounded-full ${attackPathClosed ? 'bg-slate-500' : 'bg-red-500 animate-ping'}`} />
            <div>
              <div className="text-xs font-bold text-white font-mono">185.220.101.4</div>
              <div className="text-[10px] text-slate-400">External Threat Source (Tor Exit Relay)</div>
            </div>
          </div>
          <span className={`text-[10px] font-mono font-bold ${attackPathClosed ? 'text-slate-500' : 'text-red-400'}`}>
            {attackPathClosed ? 'FILTERED' : 'INBOUND SSH'}
          </span>
        </div>

        {/* Arrow Down */}
        <div className="flex items-center justify-center py-0.5">
          <div className={`flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border ${
            attackPathClosed
              ? 'bg-slate-900 border-slate-700 text-slate-500'
              : 'bg-red-900/30 border-red-700/50 text-red-300 animate-pulse'
          }`}>
            <ArrowDown size={12} />
            <span>{attackPathClosed ? 'Connection Blocked' : 'Brute Force Flow (Port 22)'}</span>
          </div>
        </div>

        {/* Node 2: Target Server */}
        <div className={`p-2.5 rounded-lg border flex items-center justify-between transition-all ${
          serverIsolated 
            ? 'bg-amber-950/30 border-amber-500/40' 
            : 'bg-slate-900/90 border-cyan-500/30'
        }`}>
          <div className="flex items-center gap-2.5">
            <Server size={16} className={serverIsolated ? 'text-amber-400' : 'text-cyan-400'} />
            <div>
              <div className="text-xs font-bold text-white font-mono">{state.server_id || 'SERVER-02'}</div>
              <div className="text-[10px] text-slate-400">Production Linux Gateway (Ubuntu 22.04 LTS)</div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-mono font-bold text-cyan-400">{currentAvailability}% Avail</span>
          </div>
        </div>

        {/* Arrow Down */}
        <div className="flex items-center justify-center py-0.5">
          <div className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-400">
            <ArrowDown size={12} />
            <span>Internal IPC Socket</span>
          </div>
        </div>

        {/* Node 3: Authentication Service */}
        <div className="p-2.5 rounded-lg border bg-slate-900/70 border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Lock size={16} className="text-emerald-400" />
            <div>
              <div className="text-xs font-bold text-white font-mono">Authentication Service</div>
              <div className="text-[10px] text-slate-400">sshd.service (OpenSSH Daemon)</div>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            ONLINE
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center">
        <div className="p-2 bg-slate-900/60 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-400 font-mono">Simulated Risk</div>
          <div className={`text-base font-mono font-black ${currentRisk > 50 ? 'text-red-400' : 'text-emerald-400'}`}>
            {currentRisk} <span className="text-[10px] text-slate-500 font-normal">/100</span>
          </div>
        </div>
        <div className="p-2 bg-slate-900/60 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-400 font-mono">Active Sessions</div>
          <div className="text-base font-mono font-bold text-white">{currentSessions}</div>
        </div>
        <div className="p-2 bg-slate-900/60 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-400 font-mono">Attack Path</div>
          <div className={`text-xs font-mono font-bold mt-1 ${attackPathClosed ? 'text-emerald-400' : 'text-red-400'}`}>
            {attackPathClosed ? 'CLOSED' : 'OPEN'}
          </div>
        </div>
      </div>
    </div>
  );
}
