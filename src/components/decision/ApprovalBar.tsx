import React from 'react';
import { ShieldCheck, Check, X, RotateCcw, ArrowLeft, ShieldAlert } from 'lucide-react';
import './DecisionWorkspace.css';

export default function ApprovalBar({ 
  recommendation, 
  onApprove, 
  onReject, 
  onClose, 
  onRunAgain,
  isSaved, 
  outcomeId = 'OM-001',
  lastDecision
}) {
  if (isSaved) {
    return (
      <div className="approval-bar justify-between flex-wrap gap-4 bg-emerald-950/40 border-t border-emerald-500/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Check size={18} />
          </div>
          <div>
            <div className="text-emerald-400 font-bold font-mono text-sm tracking-wide flex items-center gap-2">
              Outcome stored: {outcomeId}
              <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {lastDecision === 'APPROVED' ? 'APPROVED BY ADMIN' : 'REJECTED BY ADMIN'}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Result recorded to SQLite database. Re-running the simulation will now load this as historical context.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onRunAgain && (
            <button
              onClick={onRunAgain}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs font-['Outfit'] tracking-wider flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <RotateCcw size={14} /> RUN AGAIN (DEMO MEMORY)
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs font-['Outfit'] tracking-wider flex items-center gap-1.5 border border-slate-700 transition-all cursor-pointer"
          >
            <ArrowLeft size={14} /> RETURN TO DASHBOARD
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="approval-bar flex-wrap gap-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="text-slate-400 font-bold text-xs tracking-wider font-['Outfit'] flex items-center gap-1.5">
          <ShieldAlert size={16} className="text-cyan-400" />
          SYSTEM RECOMMENDATION
        </div>
        <div className="bg-[#0b1324] border border-cyan-500/40 px-3.5 py-1.5 rounded-lg font-bold text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)] tracking-wide font-mono text-xs">
          {recommendation || 'BLOCK SOURCE + ENABLE FIREWALL'}
        </div>
        <span className="text-[11px] text-slate-400 hidden sm:inline">
          (Max security impact • 2% disruption)
        </span>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={onReject} 
          className="btn-reject flex items-center gap-2 font-['Outfit'] tracking-wider cursor-pointer"
        >
          <X size={16} /> REJECT
        </button>
        <button 
          onClick={onApprove} 
          className="btn-approve flex items-center gap-2 font-['Outfit'] tracking-wider cursor-pointer"
        >
          <ShieldCheck size={16} /> APPROVE RESPONSE
        </button>
      </div>
    </div>
  );
}
