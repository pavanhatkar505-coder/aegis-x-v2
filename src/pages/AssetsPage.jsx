import React from 'react';
import { Server, ShieldCheck, Activity } from 'lucide-react';

export default function AssetsPage() {
  const assets = [
    { name: 'AUTH-01', ip: '10.0.1.5', role: 'Authentication Service', os: 'RHEL 9.2 Kernel 6.1', status: 'HEALTHY', risk: 15 },
    { name: 'K8S-NODE-07', ip: '172.16.0.44', role: 'Kubernetes Worker Node', os: 'Ubuntu 22.04 LTS', status: 'CRITICAL THREAT', risk: 98 },
    { name: 'PROD-API-03', ip: '10.0.2.18', role: 'Production API Gateway', os: 'Debian 12 Bookworm', status: 'HIGH RISK', risk: 92 },
    { name: 'DB-MAIN-02', ip: '10.0.4.112', role: 'Primary PostgreSQL Cluster', os: 'RHEL 9.2 Kernel 6.1', status: 'ELEVATED RISK', risk: 74 },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between font-mono-code text-xs">
        <div>
          <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider">
            MONITORED INFRASTRUCTURE ASSETS
          </h2>
          <p className="text-slate-400 text-[11px] mt-0.5">
            Active servers, containers, and database nodes telemetry status.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono-code text-xs">
        {assets.map((ast) => (
          <div key={ast.name} className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Server className="w-4 h-4 text-cyan-400" /> {ast.name}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                ast.risk >= 90 ? 'bg-rose-950 text-rose-400 border border-rose-500/40' : 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
              }`}>
                {ast.status}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 space-y-1">
              <div>Role: <strong className="text-slate-200 font-sans">{ast.role}</strong></div>
              <div>Internal IP: <strong className="text-cyan-300">{ast.ip}</strong></div>
              <div>OS/Kernel: <strong className="text-slate-300">{ast.os}</strong></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
