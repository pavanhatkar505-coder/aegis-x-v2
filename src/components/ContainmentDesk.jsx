import React from 'react';
import { 
  Lock, 
  Unlock, 
  ShieldAlert, 
  UserX, 
  Globe, 
  CheckCircle, 
  XCircle, 
  Activity,
  AlertOctagon,
  Zap
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function ContainmentDesk({ alerts = [], containedEntities = [], onExecuteContainment }) {
  
  // Find critical alerts that have not been isolated yet
  const uncontainedCriticals = alerts.filter(alt => {
    const isContained = containedEntities.some(
      e => e.includes(alt.source_ip) || e.includes(alt.user)
    );
    return !isContained && (alt.severity === 'CRITICAL' || alt.severity === 'HIGH');
  });

  const handleApprove = (type, val) => {
    soundFx.playIsolationLock();
    onExecuteContainment(type, val, 'isolate');
  };

  const handleRelease = (entityKey) => {
    soundFx.playClick();
    const [type, val] = entityKey.split(':');
    onExecuteContainment(type, val, 'release');
  };

  return (
    <div className="cyber-panel p-5 rounded-xl border border-cyan-500/30 flex flex-col space-y-5">
      
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded bg-red-950/80 border border-red-500/40 text-red-400 glow-crimson">
            <Lock className="w-5 h-5 text-red-300" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold tracking-wide text-slate-100 uppercase font-mono-code flex items-center gap-2">
              PANEL C: ACTIVE CONTAINMENT DESK
            </h2>
            <p className="text-xs text-slate-400 font-mono-code">
              HUMAN-IN-THE-LOOP (HITL) THREAT ISOLATION & REMEDIATION ENGINE
            </p>
          </div>
        </div>

        <span className="text-xs font-mono-code px-2.5 py-1 rounded bg-slate-900 border border-red-500/30 text-red-400 font-bold flex items-center gap-1.5">
          <AlertOctagon className="w-3.5 h-3.5 animate-pulse text-red-400" />
          PENDING APPROVALS: {uncontainedCriticals.length}
        </span>
      </div>

      {/* 1. HITL Pending Approvals Section */}
      <div>
        <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3 font-mono-code flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-red-400" />
          ACTIVE THREAT ISOLATION QUEUE
        </h3>

        {uncontainedCriticals.length === 0 ? (
          <div className="p-4 rounded-lg bg-slate-950/80 border border-emerald-500/20 text-emerald-400/90 font-mono-code text-xs flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              NO UNCONTAINED CRITICAL THREATS DETECTED IN ACTIVE QUEUE.
            </span>
            <span className="text-[10px] text-slate-500">AUTO-PROTECT ENGAGED</span>
          </div>
        ) : (
          <div className="space-y-3">
            {uncontainedCriticals.slice(0, 3).map((alt) => (
              <div
                key={alt.alert_id}
                className="p-4 rounded-lg bg-red-950/40 border border-red-500/50 glow-crimson flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono-code">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-500/40">
                      {alt.severity}
                    </span>
                    <span className="text-sm font-bold text-white">
                      Target: {alt.user} @ {alt.source_ip}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans">
                    {alt.details}
                  </p>
                  <div className="text-[10px] font-mono-code text-slate-400">
                    ALERT ID: {alt.alert_id} | ORIGIN: {alt.alert_type}
                  </div>
                </div>

                {/* HITL Action Buttons */}
                <div className="flex items-center gap-2 self-end sm:self-center font-mono-code">
                  <button
                    onClick={() => handleApprove('ip', alt.source_ip)}
                    className="px-3.5 py-2 rounded bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg active:scale-95 glow-crimson"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    [ 🔴 APPROVE ISOLATION ]
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Isolated Entities Roster */}
      <div className="pt-3 border-t border-cyan-500/20">
        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 font-mono-code flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-cyan-400" />
            ISOLATED ENTITIES ROSTER ({containedEntities.length})
          </span>
          <span className="text-[10px] text-slate-400 font-normal">FIREWALL RULES ENFORCED</span>
        </h3>

        {containedEntities.length === 0 ? (
          <div className="p-3 rounded bg-slate-950 border border-slate-800 text-slate-500 font-mono-code text-xs">
            NO ENTITIES CURRENTLY UNDER ISOLATION.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto">
            {containedEntities.map((entity, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded bg-slate-900/90 border border-cyan-500/30 flex items-center justify-between font-mono-code text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  <span className="font-bold text-cyan-300">{entity}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold">
                    ISOLATED
                  </span>
                  
                  <button
                    onClick={() => handleRelease(entity)}
                    title="Release isolation"
                    className="p-1 rounded bg-slate-800 hover:bg-cyan-950 text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
