import React from 'react';
import { Activity, ArrowRight, ShieldCheck, Star, Award, TrendingUp, TrendingDown } from 'lucide-react';
import './DecisionWorkspace.css';

export default function SecurityOptimizer({ beforeActions, afterActions, plan }) {
  return (
    <div className="vortex-panel flex-1 flex flex-col justify-between">
      <div>
        <div className="vortex-panel-header justify-between">
          <div className="flex items-center gap-2 text-blue-400">
            <Activity size={16} /> SECURITY OPTIMIZER
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-blue-950/60 border border-blue-500/30 text-blue-300 px-2 py-0.5 rounded">
            POST-SIMULATION RE-RANKING
          </span>
        </div>

        <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
          Recalculated priority matrix balancing <strong className="text-cyan-300">risk reduction</strong> vs <strong className="text-amber-300">business disruption</strong>.
        </p>

        {/* Side-by-Side Ranking Comparison */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
          {/* Column 1: Before Vortex */}
          <div className="w-full sm:w-1/2 flex flex-col bg-slate-950/50 p-2.5 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400 mb-2 font-bold tracking-wider font-['Outfit'] flex items-center justify-between">
              <span>BEFORE VORTEX</span>
              <span className="text-[9px] font-mono text-slate-500 uppercase">Heuristic Guess</span>
            </div>
            <div className="space-y-1.5 flex-1">
              {beforeActions?.map((act, i) => (
                <div key={act.id} className="optimizer-rank py-1.5 px-2.5">
                  <div className="w-5 text-center text-slate-500 text-xs font-bold font-mono">#{i+1}</div>
                  <div className="text-xs flex-1 text-slate-300 font-medium truncate">{act.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Central Arrow */}
          <div className="hidden sm:flex items-center justify-center text-blue-400 px-1">
            <ArrowRight size={20} className="animate-pulse" />
          </div>

          {/* Column 2: After Vortex */}
          <div className="w-full sm:w-1/2 flex flex-col bg-blue-950/20 p-2.5 rounded-xl border border-blue-500/30 shadow-md shadow-blue-500/10">
            <div className="text-[11px] text-blue-400 mb-2 font-bold tracking-wider font-['Outfit'] flex items-center justify-between">
              <span>AFTER VORTEX</span>
              <span className="text-[9px] font-mono text-emerald-400 uppercase font-bold">Measured Impact</span>
            </div>
            <div className="space-y-1.5 flex-1">
              {afterActions?.map((act, i) => (
                <div 
                  key={act.id} 
                  className={`optimizer-rank py-1.5 px-2.5 ${i === 0 ? 'top-rank' : ''}`}
                >
                  <div className={`w-5 text-center text-xs font-bold font-mono ${i === 0 ? 'text-emerald-400 text-sm' : 'text-slate-400'}`}>
                    #{i+1}
                  </div>
                  <div className={`text-xs flex-1 font-medium truncate ${i === 0 ? 'text-emerald-300 font-bold' : 'text-slate-200'}`}>
                    {act.name}
                  </div>
                  {act.rankChange > 0 && (
                    <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5 bg-emerald-500/10 px-1 py-0.5 rounded font-mono">
                      <TrendingUp size={11} /> +{act.rankChange}
                    </span>
                  )}
                  {act.rankChange < 0 && (
                    <span className="text-[10px] font-bold text-red-400 flex items-center gap-0.5 bg-red-500/10 px-1 py-0.5 rounded font-mono">
                      <TrendingDown size={11} /> {act.rankChange}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Action & Secondary Action Highlights */}
        <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
          <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-2">
            <Star size={14} className="text-emerald-400 shrink-0" />
            <div>
              <div className="text-[9px] text-emerald-400 font-bold tracking-wider uppercase font-mono">TOP ACTION</div>
              <div className="text-xs text-white font-bold truncate">BLOCK SOURCE</div>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-blue-950/30 border border-blue-500/30 flex items-center gap-2">
            <Award size={14} className="text-blue-400 shrink-0" />
            <div>
              <div className="text-[9px] text-blue-400 font-bold tracking-wider uppercase font-mono">SECONDARY ACTION</div>
              <div className="text-xs text-white font-bold truncate">ENABLE FIREWALL</div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimum Effective Plan */}
      {plan && (
        <div className="mt-3 p-3 bg-gradient-to-r from-blue-950/60 to-slate-900 border border-blue-500/40 rounded-xl shadow-lg">
          <div className="text-[10px] text-blue-300 font-bold mb-1 tracking-wider flex items-center justify-between font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-blue-400" /> MINIMUM EFFECTIVE PLAN
            </span>
            <span className="text-emerald-400 font-mono">RECOMMENDED SET</span>
          </div>
          <div className="text-xs text-white font-black font-['Outfit'] tracking-wide">
            {plan.name}
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-blue-900/60 text-center font-mono">
            <div>
              <div className="text-[9px] text-slate-400">Projected Risk</div>
              <div className="text-xs text-emerald-400 font-bold">87 → {plan.projectedRisk}</div>
            </div>
            <div>
              <div className="text-[9px] text-slate-400">Availability</div>
              <div className="text-xs text-emerald-400 font-bold">{plan.availability}%</div>
            </div>
            <div>
              <div className="text-[9px] text-slate-400">Disruption</div>
              <div className="text-xs text-amber-400 font-bold">{plan.disruption}%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
