import React, { useState } from 'react';
import { 
  Server, 
  Radio, 
  GitMerge, 
  BrainCircuit, 
  Gauge, 
  ShieldAlert, 
  LayoutDashboard,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function ArchitectureDiagram() {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    { id: 1, title: 'Event Sources', desc: 'Linux Auth, K8s Audit, AWS CloudTrail logs', icon: Server, color: 'border-zinc-800 bg-zinc-950 text-zinc-300' },
    { id: 2, title: 'Event Stream', desc: 'Kafka / Redpanda high-throughput bus', icon: Radio, color: 'border-emerald-500/40 bg-emerald-950/30 text-emerald-400' },
    { id: 3, title: 'AEGIS-X Correlator', desc: 'Sliding window rule match & state graph', icon: GitMerge, color: 'border-cyan-500/40 bg-cyan-950/30 text-cyan-400' },
    { id: 4, title: 'Decision Engine', desc: 'Gemini AI threat synthesis & score model', icon: BrainCircuit, color: 'border-blue-500/40 bg-blue-950/30 text-blue-400' },
    { id: 5, title: 'Risk Assessment', desc: 'Deterministic 0-100 score vector', icon: Gauge, color: 'border-amber-500/40 bg-amber-950/30 text-amber-400' },
    { id: 6, title: 'Alert / Incident', desc: 'HITL approval & packet filter isolation', icon: ShieldAlert, color: 'border-rose-500/40 bg-rose-950/30 text-rose-400' },
    { id: 7, title: 'SOC Dashboard', desc: 'Real-time telemetry command HUD', icon: LayoutDashboard, color: 'border-emerald-500/50 bg-emerald-950/50 text-emerald-300' },
  ];

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-5 space-y-4 backdrop-blur shadow-xl font-sans">
      
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 font-mono">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h2 className="text-sm font-black text-white uppercase tracking-wider">
            LIVE EVENT ARCHITECTURE PIPELINE
          </h2>
        </div>
        <span className="text-xs text-cyan-400 font-bold">
          END-TO-END TELEMETRY FLOW
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 font-mono">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isSelected = activeStep === step.id;

          return (
            <div
              key={step.id}
              onClick={() => {
                soundFx?.playClick?.();
                setActiveStep(isSelected ? null : step.id);
              }}
              className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 flex flex-col justify-between ${step.color} ${
                isSelected ? 'ring-2 ring-cyan-400 scale-[1.02]' : 'hover:border-zinc-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                    #{step.id}
                  </span>
                  <Icon className="w-4 h-4" />
                </div>
                
                <h4 className="text-xs font-bold text-white font-sans leading-snug mb-1">
                  {step.title}
                </h4>
                <p className="text-[10px] text-zinc-400 font-sans leading-tight">
                  {step.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="mt-2 pt-1 border-t border-zinc-850 flex items-center justify-end text-zinc-600">
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-500/60" />
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
