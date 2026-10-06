import React from 'react';
import { Globe, Lock, AlertOctagon } from 'lucide-react';

export default function ThreatIntelPage() {
  const intelFeeds = [
    { ip: '192.168.1.50', category: 'Internal compromised workstation', confidence: 95, status: 'ISOLATED' },
    { ip: '198.51.100.23', category: 'Known Password Spray Botnet Subnet', confidence: 98, status: 'BLOCKED AT FIREWALL' },
    { ip: '172.16.0.44', category: 'Container Escape Pivot Node', confidence: 92, status: 'QUARANTINED' },
    { ip: '10.0.4.112', category: 'Covert Data Tunnel Source', confidence: 88, status: 'MONITORED' },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between font-mono-code text-xs">
        <div>
          <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider">
            THREAT INTELLIGENCE & REPUTATION FEED
          </h2>
          <p className="text-slate-400 text-[11px] mt-0.5">
            Active malicious IPs, botnet subnets, and attacker threat profiles.
          </p>
        </div>
      </div>

      <div className="space-y-3 font-mono-code text-xs">
        {intelFeeds.map((item) => (
          <div key={item.ip} className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-slate-100 text-sm">{item.ip}</span>
                <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 font-bold border border-rose-500/40 text-[10px]">
                  CONFIDENCE: {item.confidence}%
                </span>
              </div>
              <p className="text-slate-300 font-sans text-xs">{item.category}</p>
            </div>

            <span className="px-3 py-1 rounded bg-slate-950 text-cyan-300 border border-slate-800 font-bold text-xs">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
