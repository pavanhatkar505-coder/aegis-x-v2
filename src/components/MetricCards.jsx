import React from 'react';
import { ShieldAlert, Bell, Activity, Gauge, TrendingUp } from 'lucide-react';

export default function MetricCards({ metrics }) {
  if (!metrics) return null;

  const cards = [
    {
      title: 'Active Incidents',
      value: metrics.active_incidents,
      unit: 'ACTIVE',
      trend: metrics.active_incidents_trend,
      icon: ShieldAlert,
      color: 'rose',
      severityBg: 'bg-rose-950/40 border-rose-500/40 text-rose-400',
    },
    {
      title: 'Critical Alerts',
      value: metrics.critical_alerts,
      unit: 'UNRESOLVED',
      trend: metrics.critical_alerts_trend,
      icon: Bell,
      color: 'amber',
      severityBg: 'bg-amber-950/40 border-amber-500/40 text-amber-400',
    },
    {
      title: 'Events / sec',
      value: metrics.events_per_sec,
      unit: 'EVT/SEC',
      trend: metrics.events_per_sec_trend,
      icon: Activity,
      color: 'cyan',
      severityBg: 'bg-cyan-950/40 border-cyan-500/40 text-cyan-400',
    },
    {
      title: 'Average Risk Score',
      value: metrics.average_risk_score,
      unit: '/ 100',
      trend: metrics.average_risk_score_trend,
      icon: Gauge,
      color: 'rose',
      severityBg: 'bg-rose-950/40 border-rose-500/40 text-rose-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono-code">
      {cards.map((card, idx) => {
        const Icon = card.icon;

        return (
          <div
            key={idx}
            className="rounded-lg bg-slate-900/90 border border-slate-800 p-4 relative overflow-hidden shadow-md hover:border-slate-700 transition-all"
          >
            {/* Top Row: Title & Severity Badge */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                {card.title}
              </span>
              <div className={`p-2 rounded-md border ${card.severityBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Main Value Row */}
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl lg:text-3xl font-black text-slate-100 font-mono-code">
                {card.value}
              </span>
              <span className="text-xs text-slate-500 font-bold">{card.unit}</span>
            </div>

            {/* Bottom Trend & Comparison */}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-2 border-t border-slate-800/80 font-sans">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              <span>{card.trend}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
