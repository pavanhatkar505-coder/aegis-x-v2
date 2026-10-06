import React from 'react';
import { Target, CheckCircle, XCircle, Shield, AlertTriangle, Layers, Percent } from 'lucide-react';
import './DecisionWorkspace.css';

export default function ActionImpact({ actions, selectedActionId, onSelectAction }) {
  const selectedAction = actions?.find(a => a.id === selectedActionId) || actions?.[0];

  return (
    <div className="vortex-panel h-full flex flex-col">
      <div className="vortex-panel-header justify-between">
        <div className="flex items-center gap-2 text-cyan-400">
          <Target size={16} /> ACTION IMPACT ANALYSIS
        </div>
        <div className="text-[10px] text-slate-400 font-mono">
          Click cards to simulate individual impact
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 flex-1 overflow-hidden">
        {/* List of 4 Candidate Action Cards */}
        <div className="w-full md:w-5/12 flex flex-col gap-2 overflow-y-auto pr-1">
          {actions?.map(action => {
            const isSelected = selectedActionId === action.id;
            return (
              <div 
                key={action.id}
                className={`action-card ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectAction(action.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="action-card-title">{action.name}</div>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    action.impact.attack_path_closed 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {action.impact.attack_path_closed ? 'Path Closed' : 'Path Open'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between mt-1">
                  <span>Risk: {action.impact.risk_before} → <strong className="text-emerald-400">{action.impact.risk_after}</strong></span>
                  <span className="text-cyan-400">-{action.impact.risk_reduction} pts</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5 flex items-center justify-between">
                  <span>Avail: {action.impact.availability}%</span>
                  <span className={action.impact.disruption > 20 ? 'text-red-400' : 'text-slate-400'}>
                    Disrupt: {action.impact.disruption}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Impact Comparison Panel */}
        {selectedAction && (
          <div className="w-full md:w-7/12 impact-detail-panel p-4 flex flex-col justify-between overflow-y-auto bg-slate-950/60 rounded-xl border border-slate-800">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-bold text-cyan-400 font-['Outfit'] text-base flex items-center gap-2">
                    <Shield size={16} />
                    {selectedAction.name}
                  </h3>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                    Action ID: {selectedAction.id}
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  selectedAction.id === 'BLOCK_SOURCE' 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : selectedAction.id === 'ISOLATE_SERVER' 
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                }`}>
                  {selectedAction.id === 'BLOCK_SOURCE' ? '★ OPTIMAL CHOICE' : selectedAction.id === 'ISOLATE_SERVER' ? 'HIGH DISRUPTION' : 'TARGETED'}
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                {selectedAction.description}
              </p>
            </div>
            
            <div className="flex flex-col gap-2.5 text-xs">
              <div className="stat-row">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Percent size={14} className="text-slate-500" /> Risk Reduction
                </span>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-red-400 font-bold">{selectedAction.impact.risk_before}</span>
                  <span className="text-slate-600">→</span>
                  <span className="text-emerald-400 font-black text-sm">{selectedAction.impact.risk_after}</span>
                  <span className="text-[10px] text-emerald-400/80 font-bold">(-{selectedAction.impact.risk_reduction})</span>
                </div>
              </div>

              <div className="stat-row">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Layers size={14} className="text-slate-500" /> Active Sessions Preserved
                </span>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-slate-400">{selectedAction.impact.sessions_before}</span>
                  <span className="text-slate-600">→</span>
                  <span className="text-white font-bold">{selectedAction.impact.sessions_after}</span>
                  <span className="text-[10px] text-slate-500">
                    ({Math.round((selectedAction.impact.sessions_after / selectedAction.impact.sessions_before) * 100)}% preserved)
                  </span>
                </div>
              </div>

              <div className="stat-row">
                <span className="text-slate-400">Service Availability</span>
                <span className={`font-mono font-bold ${selectedAction.impact.availability > 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {selectedAction.impact.availability}%
                </span>
              </div>

              <div className="stat-row">
                <span className="text-slate-400">Operational Disruption</span>
                <span className={`font-mono font-bold ${selectedAction.impact.disruption > 20 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {selectedAction.impact.disruption}%
                </span>
              </div>

              <div className="stat-row">
                <span className="text-slate-400">Detection Rule Coverage</span>
                <span className="font-mono font-bold text-cyan-300">
                  {selectedAction.impact.coverage || '94% High Confidence'}
                </span>
              </div>
              
              <div className="stat-row border-b-0 pb-0">
                <span className="text-slate-400">Attack Path Status</span>
                <span className={`font-bold font-['Outfit'] tracking-wider flex items-center gap-1 text-xs ${
                  selectedAction.impact.attack_path_closed ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {selectedAction.impact.attack_path_closed ? <CheckCircle size={14} /> : <XCircle size={14} />}
                  {selectedAction.impact.attack_path_closed ? 'CLOSED / SEVERED' : 'OPEN / EXPLOITABLE'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
