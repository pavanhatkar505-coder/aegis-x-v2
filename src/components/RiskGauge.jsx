import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { Gauge } from 'lucide-react';

export default function RiskGauge({ score = 85 }) {
  const getCategory = (val) => {
    if (val >= 90) return { label: 'CRITICAL', color: '#f43f5e', bg: 'bg-rose-950/80 text-rose-400 border-rose-500/50' };
    if (val >= 70) return { label: 'HIGH', color: '#f59e0b', bg: 'bg-amber-950/80 text-amber-400 border-amber-500/50' };
    if (val >= 40) return { label: 'MEDIUM', color: '#3b82f6', bg: 'bg-blue-950/80 text-blue-300 border-blue-500/50' };
    return { label: 'LOW', color: '#10b981', bg: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/50' };
  };

  const cat = getCategory(score);

  const data = [
    { name: 'Risk Score', value: score, fill: cat.color }
  ];

  return (
    <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-4 flex flex-col items-center justify-center font-sans relative overflow-hidden shadow-md">
      
      <div className="w-full flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider font-mono-code">
            RISK ASSESSMENT GAUGE
          </h3>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border font-mono-code ${cat.bg}`}>
          {cat.label}
        </span>
      </div>

      <div className="relative w-48 h-48 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            cx="50%" 
            cy="50%" 
            innerRadius="70%" 
            outerRadius="100%" 
            barSize={14} 
            data={data}
            startAngle={225}
            endAngle={-45}
          >
            <RadialBar
              background={{ fill: '#1e293b' }}
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black text-slate-100 font-mono-code">{score}</span>
          <span className="text-[10px] font-mono-code text-slate-400">/ 100 RISK</span>
        </div>
      </div>

      {/* Category Breakdown Meter */}
      <div className="grid grid-cols-4 gap-1 w-full text-[9px] font-mono-code text-center pt-2 border-t border-slate-800">
        <div className={`p-1 rounded ${score < 40 ? 'bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/40' : 'text-slate-500'}`}>
          0-39 LOW
        </div>
        <div className={`p-1 rounded ${score >= 40 && score < 70 ? 'bg-blue-950 text-blue-300 font-bold border border-blue-500/40' : 'text-slate-500'}`}>
          40-69 MED
        </div>
        <div className={`p-1 rounded ${score >= 70 && score < 90 ? 'bg-amber-950 text-amber-400 font-bold border border-amber-500/40' : 'text-slate-500'}`}>
          70-89 HIGH
        </div>
        <div className={`p-1 rounded ${score >= 90 ? 'bg-rose-950 text-rose-400 font-bold border border-rose-500/40' : 'text-slate-500'}`}>
          90-100 CRIT
        </div>
      </div>

    </div>
  );
}
