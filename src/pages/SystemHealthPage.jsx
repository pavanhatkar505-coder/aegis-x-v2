import React from 'react';
import SystemHealthPanel from '../components/SystemHealthPanel';

export default function SystemHealthPage({ health }) {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between font-mono-code text-xs">
        <div>
          <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider font-sans">
            SYSTEM HEALTH & PIPELINE ARCHITECTURE
          </h2>
          <p className="text-slate-400 text-[11px] mt-0.5 font-sans">
            Subsystem operational status grid and interactive telemetry pipeline flow.
          </p>
        </div>
      </div>

      <SystemHealthPanel health={health} />
    </div>
  );
}
