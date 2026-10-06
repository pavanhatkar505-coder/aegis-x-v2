import React from 'react';
import { Database, AlertTriangle, ShieldCheck, Clock, RefreshCw, CheckCircle2 } from 'lucide-react';
import './DecisionWorkspace.css';

export default function OutcomeMemory({ memoryData, onResetMemory }) {
  if (!memoryData) {
    return (
      <div className="vortex-panel">
        <div className="vortex-panel-header justify-between text-slate-400">
          <div className="flex items-center gap-2">
            <Database size={16} /> OUTCOME MEMORY (SQLITE)
          </div>
          <span className="text-[10px] font-mono text-slate-500">NO PRIOR HISTORY</span>
        </div>
        <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800 text-center">
          <div className="text-xs text-slate-400 font-medium">First occurrence of AUTH_BRUTE_FORCE in database.</div>
          <div className="text-[10px] text-slate-500 mt-1">
            Running fresh baseline Vortex simulation. Administrator decision will be indexed as OM-001.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vortex-panel">
      <div className="vortex-panel-header justify-between text-purple-400">
        <div className="flex items-center gap-2">
          <Database size={16} /> OUTCOME MEMORY
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded">
            HISTORY AVAILABLE
          </span>
          {onResetMemory && (
            <button 
              onClick={onResetMemory}
              title="Reset memory to test clean state"
              className="text-[10px] font-mono text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800/80 hover:bg-slate-700 px-2 py-0.5 rounded border border-slate-700 cursor-pointer"
            >
              <RefreshCw size={10} /> Reset
            </button>
          )}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-950/40 via-purple-900/20 to-slate-900/60 border border-purple-500/30 rounded-xl p-3.5 shadow-lg shadow-purple-950/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-2xl rounded-full pointer-events-none" />
        
        <div className="flex items-center justify-between mb-2.5">
          <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5 font-['Outfit'] tracking-wider">
            <CheckCircle2 size={14} className="text-purple-400" />
            <span>{memoryData.similar_cases || 1} SIMILAR VALIDATED CASE FOUND</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {memoryData.outcome_id || 'OM-001'}
          </span>
        </div>
        
        <div className="space-y-2 text-xs relative z-10 font-sans">
          <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded-lg border border-purple-900/40">
            <span className="text-slate-400">Previous best action:</span>
            <span className="text-purple-300 font-bold font-mono text-xs">{memoryData.previous_best || 'BLOCK SOURCE'}</span>
          </div>
          
          <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded-lg border border-purple-900/40">
            <span className="text-slate-400">Previous risk reduction:</span>
            <div className="flex items-center gap-2 font-mono">
              <span className="text-red-400">{memoryData.risk_before || 87}</span>
              <span className="text-slate-600">→</span>
              <span className="text-emerald-400 font-bold">{memoryData.risk_after || 23}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t border-purple-500/20 text-[11px]">
            <span className="text-slate-400">Historical result:</span>
            <span className={`font-bold font-mono flex items-center gap-1 ${memoryData.result === 'SUCCESS' ? 'text-emerald-400' : 'text-amber-400'}`}>
              <ShieldCheck size={14} /> {memoryData.result || 'SUCCESS'}
            </span>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-purple-500/10 text-[10px] text-slate-400 font-mono italic">
          Context loaded into Vortex. Simulation tests actions against current isolated snapshot.
        </div>
      </div>
    </div>
  );
}
