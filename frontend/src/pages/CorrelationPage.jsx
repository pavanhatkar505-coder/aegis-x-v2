import React from 'react';
import { GitMerge, BrainCircuit, CheckCircle2 } from 'lucide-react';

export default function CorrelationPage() {
  const rules = [
    { id: 'CORR-RULE-01', name: 'Authentication Burst to Privilege Escalation', window: '60s', threshold: '5 failed logins + 1 sudo elevation', status: 'ACTIVE' },
    { id: 'CORR-RULE-02', name: 'Multi-IP Password Spraying', window: '30s', threshold: '400+ auth attempts across >5 usernames', status: 'ACTIVE' },
    { id: 'CORR-RULE-03', name: 'DNS Tunnel Exfiltration Peak', window: '300s', threshold: '>100MB TXT record queries to unrated NS', status: 'ACTIVE' },
    { id: 'CORR-RULE-04', name: 'Kernel Elevation Container Escape', window: '10s', threshold: 'PAM auth token bypass UID=0', status: 'ACTIVE' },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between font-mono-code text-xs">
        <div>
          <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider">
            AEGIS-X CORRELATION ENGINE RULES
          </h2>
          <p className="text-slate-400 text-[11px] mt-0.5">
            Sliding-window correlation rules evaluating real-time event graph connections.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono-code text-xs">
        {rules.map((rule) => (
          <div key={rule.id} className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-400">{rule.id}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
                {rule.status}
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-100 font-sans">{rule.name}</h3>
            <div className="text-[11px] text-slate-400 space-y-1">
              <div>Time Window: <strong className="text-slate-200">{rule.window}</strong></div>
              <div>Trigger Condition: <strong className="text-amber-300 font-sans">{rule.threshold}</strong></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
