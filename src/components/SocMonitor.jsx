import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  Unlock, 
  Activity, 
  Flame, 
  User, 
  Globe, 
  Clock, 
  ChevronRight, 
  X, 
  SlidersHorizontal,
  AlertTriangle,
  FileSearch,
  Sparkles
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function SocMonitor({ 
  alerts = [], 
  containedEntities = [], 
  onExecuteContainment,
  onInspectDossier
}) {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [severityFilter, setSeverityFilter] = useState('ALL');

  // Compute DEFCON Risk Level (DEFCON 1 to 5)
  const computeDefcon = () => {
    const criticals = alerts.filter(a => a.severity === 'CRITICAL').length;
    const highs = alerts.filter(a => a.severity === 'HIGH').length;
    if (criticals >= 2) return { level: 1, label: 'DEFCON 1 (CRITICAL BREACH)', color: 'text-rose-400 bg-rose-950/80 border-rose-500' };
    if (criticals === 1) return { level: 2, label: 'DEFCON 2 (ACTIVE EXPLOIT)', color: 'text-rose-400 bg-rose-950/50 border-rose-500/40' };
    if (highs >= 2) return { level: 3, label: 'DEFCON 3 (HIGH THREAT)', color: 'text-amber-400 bg-amber-950/80 border-amber-500' };
    if (highs === 1) return { level: 4, label: 'DEFCON 4 (ELEVATED RISK)', color: 'text-amber-400 bg-amber-950/40 border-amber-500/30' };
    return { level: 5, label: 'DEFCON 5 (NORMAL READINESS)', color: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40' };
  };

  const defcon = computeDefcon();

  const filteredAlerts = alerts.filter(alt => {
    if (severityFilter === 'ALL') return true;
    return alt.severity === severityFilter;
  });

  const handleApprove = (type, value) => {
    soundFx.playIsolationLock();
    onExecuteContainment(type, value, 'isolate');
  };

  const handleDismiss = () => {
    soundFx.playClick();
    setSelectedAlert(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Executive Metric Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* System Status */}
        <div className="titanium-card p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-mono-code text-zinc-400 uppercase tracking-wider">SYSTEM STATUS</p>
            <p className="text-xl font-extrabold text-emerald-400 font-mono-code flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              ONLINE
            </p>
          </div>
          <Activity className="w-7 h-7 text-emerald-400/30" />
        </div>

        {/* Active Threats */}
        <div className="titanium-card p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-mono-code text-zinc-400 uppercase tracking-wider">ACTIVE THREATS</p>
            <p className="text-xl font-extrabold text-zinc-100 font-mono-code mt-1">
              {alerts.length} <span className="text-xs text-zinc-400 font-normal">INCIDENTS</span>
            </p>
          </div>
          <Flame className="w-7 h-7 text-rose-400/30" />
        </div>

        {/* Contained Entities */}
        <div className="titanium-card p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-mono-code text-zinc-400 uppercase tracking-wider">CONTAINED ENTITIES</p>
            <p className="text-xl font-extrabold text-rose-400 font-mono-code mt-1">
              {containedEntities.length} <span className="text-xs text-zinc-400 font-normal">ISOLATED</span>
            </p>
          </div>
          <Lock className="w-7 h-7 text-rose-400/30" />
        </div>

        {/* Global Risk Level */}
        <div className="titanium-card p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-mono-code text-zinc-400 uppercase tracking-wider">GLOBAL RISK LEVEL</p>
            <span className={`inline-block mt-1 text-xs font-bold font-mono-code px-2.5 py-1 rounded border ${defcon.color}`}>
              {defcon.label}
            </span>
          </div>
          <ShieldAlert className="w-7 h-7 text-amber-400/30" />
        </div>

      </div>

      {/* Main Grid Workspace: Triage Feed & Sliding Action Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Triage Stream (2/3 width) */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="titanium-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-blue-400" />
              <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider font-mono-code">
                INCIDENT TRIAGE STREAM
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 font-mono-code text-xs">
              {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map(sev => (
                <button
                  key={sev}
                  onClick={() => {
                    soundFx.playClick();
                    setSeverityFilter(sev);
                  }}
                  className={`px-2.5 py-1 rounded transition-all ${
                    severityFilter === sev
                      ? 'bg-zinc-800 text-blue-400 border border-zinc-700 font-bold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {/* Incident Stream List */}
          <div className="space-y-3">
            {filteredAlerts.length === 0 ? (
              <div className="titanium-card p-8 text-center text-zinc-500 font-mono-code text-xs">
                NO ACTIVE INCIDENTS MATCHING CURRENT SEVERITY FILTER.
              </div>
            ) : (
              filteredAlerts.map((alert) => {
                const isCritical = alert.severity === 'CRITICAL';
                const isHigh = alert.severity === 'HIGH';

                const isIsolated = containedEntities.some(
                  e => e.includes(alert.source_ip) || e.includes(alert.user)
                );

                const isSelected = selectedAlert?.alert_id === alert.alert_id;
                const ai = alert.ai_analysis || {};

                return (
                  <div
                    key={alert.alert_id}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedAlert(alert);
                    }}
                    className={`titanium-card p-4 cursor-pointer titanium-card-hover ${
                      isSelected ? 'border-blue-500 ring-1 ring-blue-500/50' : ''
                    } ${
                      isIsolated 
                        ? 'border-emerald-500/40 bg-emerald-950/20' 
                        : isCritical 
                        ? 'titanium-card-crimson' 
                        : ''
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1.5 flex-1">
                        
                        {/* Chip Row */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-extrabold font-mono-code px-2 py-0.5 rounded ${
                            isCritical
                              ? 'bg-rose-950 text-rose-400 border border-rose-500/50'
                              : isHigh
                              ? 'bg-amber-950 text-amber-400 border border-amber-500/50'
                              : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                          }`}>
                            {alert.severity}
                          </span>

                          <span className="text-sm font-bold text-zinc-100 font-mono-code">
                            {ai.threat_title || alert.alert_type}
                          </span>

                          {isIsolated && (
                            <span className="text-[10px] font-bold font-mono-code px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                              <Lock className="w-3 h-3" /> HOST ISOLATED
                            </span>
                          )}
                        </div>

                        {/* Summary */}
                        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                          {ai.analyst_summary || alert.details}
                        </p>

                        {/* Metadata Footer */}
                        <div className="flex items-center gap-4 text-[11px] font-mono-code text-zinc-400 pt-1 flex-wrap">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-blue-400" /> {alert.user}
                          </span>
                          <span className="flex items-center gap-1">
                            <Globe className="w-3.5 h-3.5 text-blue-400" /> {alert.source_ip}
                          </span>
                          <span className="flex items-center gap-1 text-zinc-500">
                            <Clock className="w-3.5 h-3.5" /> {alert.timestamp}
                          </span>
                        </div>
                      </div>

                      {/* Confidence Score & Arrow */}
                      <div className="flex items-center gap-3 self-end sm:self-center font-mono-code">
                        {ai.confidence_score && (
                          <div className="text-right">
                            <span className="text-[9px] text-zinc-500 block">AI CONFIDENCE</span>
                            <span className="text-xs font-bold text-blue-400">
                              {Math.round(ai.confidence_score * 100)}%
                            </span>
                          </div>
                        )}

                        <ChevronRight className="w-5 h-5 text-zinc-600" />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Slide-Over Action Drawer (1/3 width) */}
        <div className="lg:col-span-1">
          <div className="titanium-card p-5 sticky top-20 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-xs font-bold text-zinc-100 uppercase tracking-wider font-mono-code flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-400" />
                CONTAINMENT ACTION DRAWER
              </h3>
              {selectedAlert && (
                <button
                  onClick={handleDismiss}
                  className="text-zinc-400 hover:text-zinc-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {!selectedAlert ? (
              <div className="p-6 text-center text-zinc-500 font-mono-code text-xs space-y-2">
                <ShieldAlert className="w-8 h-8 text-zinc-700 mx-auto" />
                <p>SELECT AN INCIDENT CARD FROM THE TRIAGE STREAM TO INSPECT OR AUTHORIZE ISOLATION.</p>
              </div>
            ) : (() => {
              const alert = selectedAlert;
              const isIsolated = containedEntities.some(
                e => e.includes(alert.source_ip) || e.includes(alert.user)
              );

              return (
                <div className="space-y-4 font-mono-code">
                  
                  {/* Selected Alert Details */}
                  <div className="p-3 rounded bg-zinc-950 border border-zinc-800 space-y-1.5">
                    <div className="text-xs font-bold text-zinc-100">
                      Target: {alert.user} @ {alert.source_ip}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      ALERT ID: {alert.alert_id}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      TYPE: {alert.alert_type}
                    </div>
                  </div>

                  {/* Containment Card */}
                  {!isIsolated ? (
                    <div className="p-4 rounded-lg bg-rose-950/60 border border-rose-500/60 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                        <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
                        <span>CONTAINMENT ACTION REQUIRED</span>
                      </div>

                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        Threat Target: <strong className="text-rose-300">{alert.user}</strong> @ <strong className="text-rose-300">{alert.source_ip}</strong>
                      </p>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => handleApprove('ip', alert.source_ip)}
                          className="flex-1 py-2.5 px-3 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-lg active:scale-95"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          [ 🔴 Approve Isolation ]
                        </button>

                        <button
                          onClick={handleDismiss}
                          className="px-3 py-2.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs"
                        >
                          [ Dismiss ]
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-lg bg-emerald-950/60 border border-emerald-500/50 space-y-2 text-center">
                      <Lock className="w-6 h-6 text-emerald-400 mx-auto" />
                      <div className="text-xs font-bold text-emerald-400">
                        🔒 Host Isolated (Kernel Packet Filter Enforced)
                      </div>
                      <p className="text-[11px] text-zinc-400 font-sans">
                        Edge firewall policy is actively dropping packets from {alert.source_ip}.
                      </p>
                      
                      <button
                        onClick={() => {
                          soundFx.playClick();
                          onExecuteContainment('ip', alert.source_ip, 'release');
                        }}
                        className="mt-2 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-300 flex items-center justify-center gap-1.5 mx-auto"
                      >
                        <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                        [ RELEASE ISOLATION ]
                      </button>
                    </div>
                  )}

                  {/* Deep Matrix Audit Button */}
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onInspectDossier(alert);
                    }}
                    className="w-full py-2.5 px-3 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-amber-400 border border-amber-500/30 flex items-center justify-center gap-2 transition-all"
                  >
                    <FileSearch className="w-4 h-4 text-amber-400" />
                    <span>INSPECT IN FORENSICS MATRIX 🔬</span>
                  </button>

                </div>
              );
            })()}

          </div>
        </div>

      </div>

    </div>
  );
}
