import React from 'react';
import { 
  ShieldCheck, 
  Crosshair, 
  Microscope, 
  Trash2, 
  Volume2, 
  VolumeX, 
  Radio
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Navbar({ 
  activeTab, 
  onSelectTab, 
  alertsCount, 
  containedCount, 
  onPurge, 
  isMuted, 
  onToggleMute 
}) {
  return (
    <header className="bg-zinc-900/90 border-b border-zinc-800 sticky top-0 z-40 px-4 py-2.5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-zinc-800 border border-zinc-700 text-blue-400">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold tracking-wider text-zinc-100 uppercase font-sans">
                AEGIS<span className="text-blue-500">-X</span>
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-blue-400 border border-zinc-700 font-mono-code">
                TITANIUM OPS
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono-code flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              TACTICAL CYBER RANGE & ACTIVE SOC DEFENSE
            </p>
          </div>
        </div>

        {/* 3 Sticky Navigation Tabs with Electric Blue (#3b82f6) Active State */}
        <nav className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800 font-mono-code text-xs">
          <button
            onClick={() => {
              soundFx.playClick();
              onSelectTab('soc');
            }}
            className={`px-3.5 py-1.5 rounded-md font-bold transition-all flex items-center gap-2 ${
              activeTab === 'soc'
                ? 'bg-blue-600 text-white shadow-md electric-glow'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>🛡️ SOC MONITOR</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onSelectTab('arena');
            }}
            className={`px-3.5 py-1.5 rounded-md font-bold transition-all flex items-center gap-2 ${
              activeTab === 'arena'
                ? 'bg-blue-600 text-white shadow-md electric-glow'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <Crosshair className="w-4 h-4" />
            <span>⚔️ COMBAT ARENA</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onSelectTab('matrix');
            }}
            className={`px-3.5 py-1.5 rounded-md font-bold transition-all flex items-center gap-2 ${
              activeTab === 'matrix'
                ? 'bg-blue-600 text-white shadow-md electric-glow'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <Microscope className="w-4 h-4" />
            <span>🔬 FORENSICS MATRIX</span>
          </button>
        </nav>

        {/* Status Controls */}
        <div className="flex items-center gap-3 font-mono-code text-xs">
          
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>POLLING:</span>
            <span className="text-emerald-400 font-bold">2.5s</span>
          </div>

          <div className="px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-300 flex items-center gap-2">
            <span>ALERTS:</span>
            <span className="font-bold text-emerald-400">{alertsCount}</span>
            <span className="text-zinc-700">|</span>
            <span>ISOLATED:</span>
            <span className="font-bold text-rose-400">{containedCount}</span>
          </div>

          {/* Audio Toggle */}
          <button
            onClick={() => {
              const muted = onToggleMute();
              if (!muted) soundFx.playClick();
            }}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-1.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-blue-400 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-blue-400" />}
          </button>

          {/* Purge / Reset */}
          <button
            onClick={() => {
              soundFx.playPurgeSweep();
              onPurge();
            }}
            title="Reset Range Telemetry"
            className="px-2.5 py-1 rounded bg-rose-950/80 border border-rose-500/40 text-rose-300 hover:bg-rose-900 transition-all font-bold flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">RESET</span>
          </button>
        </div>

      </div>
    </header>
  );
}
