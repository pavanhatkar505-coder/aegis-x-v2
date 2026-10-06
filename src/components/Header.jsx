import React from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  Trash2, 
  Radio, 
  Database, 
  Zap,
  Lock
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Header({ 
  alertsCount, 
  containedCount, 
  threatLevel, 
  isPolling, 
  onTogglePolling, 
  onRefresh, 
  onPurge, 
  isMuted, 
  onToggleMute 
}) {
  const getThreatBadge = () => {
    switch (threatLevel) {
      case 'CRITICAL':
        return (
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-950/80 text-red-400 border border-red-500/50 flex items-center gap-1.5 animate-pulse glow-crimson font-mono-code">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            THREAT: CRITICAL DEFCON 1
          </span>
        );
      case 'HIGH':
        return (
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-950/80 text-amber-400 border border-amber-500/50 flex items-center gap-1.5 glow-amber font-mono-code">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            THREAT: ELEVATED (HIGH)
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/50 flex items-center gap-1.5 font-mono-code">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            THREAT: MONITORED (NORMAL)
          </span>
        );
    }
  };

  return (
    <header className="cyber-panel border-b border-cyan-500/30 bg-slate-950/90 sticky top-0 z-40 px-4 py-3 shadow-xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-950/60 border border-cyan-400/40 text-cyan-400 glow-cyan relative overflow-hidden group">
            <ShieldAlert className="w-7 h-7 relative z-10 text-cyan-300" />
            <div className="absolute inset-0 bg-cyan-400/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black tracking-wider text-slate-100 uppercase font-mono-code">
                AEGIS<span className="text-cyan-400">-X</span>
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 font-mono-code">
                v2.6 ACTIVE SOC
              </span>
            </div>
            <p className="text-xs text-slate-400 tracking-wide font-mono-code flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              CYBER RANGE & ACTIVE DEFENSE ENGINE
            </p>
          </div>
        </div>

        {/* Live Telemetry Status Badges */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono-code">
          <div className="px-2.5 py-1 rounded bg-slate-900/90 border border-cyan-500/20 text-cyan-400/90 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>REDPANDA BUS:</span>
            <span className="text-emerald-400 font-bold">SYNCHRONIZED</span>
          </div>

          <div className="px-2.5 py-1 rounded bg-slate-900/90 border border-amber-500/20 text-amber-300 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>STATUS:</span>
            <span className="text-amber-400 font-bold">ARMED</span>
          </div>

          <div className="px-2.5 py-1 rounded bg-slate-900/90 border border-blue-500/20 text-blue-300 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-blue-400" />
            <span>ENGINE:</span>
            <span className="text-cyan-300 font-bold">ONLINE</span>
          </div>
        </div>

        {/* Action Controls & Threat Meter */}
        <div className="flex items-center flex-wrap justify-center gap-3">
          
          {/* Threat Meter */}
          {getThreatBadge()}

          {/* Quick Metrics */}
          <div className="flex items-center gap-2 text-xs font-mono-code px-3 py-1 rounded bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400">ALERTS:</span>
            <span className="font-bold text-cyan-400">{alertsCount}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">ISOLATED:</span>
            <span className="font-bold text-red-400">{containedCount}</span>
          </div>

          {/* Polling Toggle */}
          <button
            onClick={() => {
              soundFx.playClick();
              onTogglePolling();
            }}
            title={isPolling ? 'Pause Auto-Polling' : 'Resume Auto-Polling (2s)'}
            className={`p-2 rounded border transition-all text-xs flex items-center gap-1 font-mono-code ${
              isPolling
                ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300 hover:bg-cyan-900/80'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${isPolling ? 'animate-pulse text-cyan-400' : 'text-slate-500'}`} />
            <span className="hidden sm:inline">{isPolling ? 'LIVE 2.0s' : 'PAUSED'}</span>
          </button>

          {/* Manual Refresh */}
          <button
            onClick={() => {
              soundFx.playClick();
              onRefresh();
            }}
            title="Manual Telemetry Sync"
            className="p-2 rounded bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-950/80 transition-colors"
          >
            <RefreshCw className="w-4 h-4 active:rotate-180 transition-transform duration-300" />
          </button>

          {/* Audio Toggle */}
          <button
            onClick={() => {
              const muted = onToggleMute();
              if (!muted) soundFx.playClick();
            }}
            title={isMuted ? 'Unmute Tactical Audio' : 'Mute Tactical Audio'}
            className="p-2 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Purge / Reset Button */}
          <button
            onClick={() => {
              soundFx.playPurgeSweep();
              onPurge();
            }}
            title="Purge Alerts & Reset Cyber Range"
            className="px-3 py-1.5 rounded bg-red-950/70 border border-red-500/50 text-red-400 hover:bg-red-900/80 hover:border-red-400 transition-all text-xs font-bold font-mono-code flex items-center gap-1.5 shadow-sm hover:glow-crimson"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">RESET RANGE</span>
          </button>
        </div>

      </div>
    </header>
  );
}
