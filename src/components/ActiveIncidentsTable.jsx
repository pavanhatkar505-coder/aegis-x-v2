import React from 'react';
import { ShieldAlert, Lock, Eye } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function ActiveIncidentsTable({
  incidents = [],
  containedEntities = [],
  onSelectIncident
}) {

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'CRITICAL':
        return <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-950 text-rose-400 border border-rose-500/50 font-mono-code">CRITICAL</span>;
      case 'HIGH':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-500/50 font-mono-code">HIGH</span>;
      case 'MEDIUM':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-500/40 font-mono-code">MEDIUM</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 font-mono-code">LOW</span>;
    }
  };

  const getRiskPill = (score) => {
    let colorClass = 'bg-emerald-950 text-emerald-400 border-emerald-500/40';
    if (score >= 90) colorClass = 'bg-rose-950 text-rose-400 border-rose-500/60 font-black animate-pulse';
    else if (score >= 70) colorClass = 'bg-amber-950 text-amber-400 border-amber-500/50';
    else if (score >= 40) colorClass = 'bg-blue-950 text-blue-300 border-blue-500/40';

    return (
      <span className={`px-2 py-0.5 rounded text-xs font-bold border font-mono-code ${colorClass}`}>
        Risk: {score}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Resolved':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/40">Resolved</span>;
      case 'Escalated':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-400 border border-rose-500/40">Escalated</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-500/40">Investigating</span>;
    }
  };

  return (
    <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-4 space-y-3 font-sans shadow-md">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-400" />
          <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider font-mono-code">
            ACTIVE INCIDENTS
          </h2>
        </div>
        <span className="text-xs font-mono-code text-slate-400">
          CLICK INCIDENT ROW TO OPEN INVESTIGATION DRAWER
        </span>
      </div>

      <div className="overflow-x-auto border border-slate-800 rounded-md">
        <table className="w-full text-left font-mono-code text-xs">
          <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 text-[11px]">
            <tr>
              <th className="py-2.5 px-3">INCIDENT ID</th>
              <th className="py-2.5 px-3">ATTACK TYPE</th>
              <th className="py-2.5 px-3">AFFECTED ASSET</th>
              <th className="py-2.5 px-3">USER</th>
              <th className="py-2.5 px-3">SOURCE IP</th>
              <th className="py-2.5 px-3">RISK SCORE</th>
              <th className="py-2.5 px-3">SEVERITY</th>
              <th className="py-2.5 px-3">PRIORITY</th>
              <th className="py-2.5 px-3">STATUS</th>
              <th className="py-2.5 px-3 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 bg-slate-900/50">
            {incidents.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-6 text-center text-slate-500 text-xs">
                  NO ACTIVE INCIDENTS CURRENTLY LOGGED.
                </td>
              </tr>
            ) : (
              incidents.map((inc, index) => {
                const isContained = containedEntities.some(
                  e => e.includes(inc.source_ip || '') || e.includes(inc.user || '')
                );

                return (
                  <tr
                    key={inc.incident_id || inc.id || index}
                    onClick={() => {
                      soundFx.playClick();
                      if (onSelectIncident) onSelectIncident(inc);
                    }}
                    className={`cursor-pointer transition-colors hover:bg-slate-800/60 ${
                      inc.severity === 'CRITICAL' ? 'bg-rose-950/20' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 font-bold text-cyan-400 flex items-center gap-1.5">
                      <span>{inc.incident_id}</span>
                      {isContained && <Lock className="w-3 h-3 text-emerald-400" title="Host Isolated" />}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-slate-100 font-sans">{inc.attack_type}</td>
                    <td className="py-2.5 px-3 text-slate-300">{inc.affected_asset}</td>
                    <td className="py-2.5 px-3 text-slate-300">{inc.user}</td>
                    <td className="py-2.5 px-3 text-slate-300">{inc.source_ip}</td>
                    <td className="py-2.5 px-3">{getRiskPill(inc.risk_score)}</td>
                    <td className="py-2.5 px-3">{getSeverityBadge(inc.severity)}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-300">{inc.priority}</td>
                    <td className="py-2.5 px-3">{getStatusBadge(inc.status)}</td>
                    <td className="py-2.5 px-3 text-right">
                      <button className="p-1 rounded bg-slate-800 hover:bg-cyan-950 text-slate-300 hover:text-cyan-400">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
