import React from 'react';
import { Shield, Cpu, Activity, Zap, CheckCircle, Database, Check } from 'lucide-react';
import './DecisionWorkspace.css';

export default function ArchitectureFlow({ stage }) {
  const stages = [
    { id: 'detect', label: 'DETECTION AGENT', icon: Shield },
    { id: 'recommend', label: 'SYSTEM RECOMMENDATION', icon: Zap },
    { id: 'vortex', label: 'VORTEX STATE COPY', icon: Cpu },
    { id: 'optimizer', label: 'SECURITY OPTIMIZER', icon: Activity },
    { id: 'approval', label: 'ADMIN APPROVAL', icon: CheckCircle },
    { id: 'memory', label: 'OUTCOME MEMORY', icon: Database },
  ];

  const getStageStatus = (index) => {
    if (stage > index) return 'complete';
    if (stage === index) return 'active';
    return 'waiting';
  };

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
      {stages.map((s, idx) => {
        const status = getStageStatus(idx);
        const Icon = s.icon;
        const isComplete = status === 'complete';
        const isActive = status === 'active';

        return (
          <React.Fragment key={s.id}>
            <div className={`arch-node ${status} flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all whitespace-nowrap ${
              isActive 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.4)] animate-pulse'
                : isComplete 
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-900/60 text-slate-500 border border-slate-800'
            }`}>
              {isComplete ? <Check size={12} className="text-emerald-400" /> : <Icon size={12} />}
              <span>{s.label}</span>
            </div>
            {idx < stages.length - 1 && (
              <div className={`h-px w-4 sm:w-6 transition-colors ${
                stage > idx ? 'bg-emerald-500' : 'bg-slate-700'
              }`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
