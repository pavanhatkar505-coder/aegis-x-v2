import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { BarChart3, ShieldAlert, Activity, Server, Globe } from 'lucide-react';

const EVENTS_OVER_TIME = [
  { time: '14:00', events: 120, alerts: 4 },
  { time: '14:05', events: 145, alerts: 6 },
  { time: '14:10', events: 380, alerts: 18 },
  { time: '14:15', events: 210, alerts: 8 },
  { time: '14:20', events: 190, alerts: 5 },
  { time: '14:25', events: 310, alerts: 12 },
  { time: '14:30', events: 280, alerts: 9 },
];

const SEVERITY_DISTRIBUTION = [
  { name: 'CRITICAL', value: 18, color: '#ef4444' },
  { name: 'HIGH', value: 32, color: '#f59e0b' },
  { name: 'MEDIUM', value: 45, color: '#3b82f6' },
  { name: 'LOW', value: 95, color: '#64748b' },
];

const TOP_SERVERS = [
  { server: 'AUTH-01', incidents: 14 },
  { server: 'K8S-NODE-07', incidents: 11 },
  { server: 'PROD-API-03', incidents: 9 },
  { server: 'DB-MAIN-02', incidents: 6 },
  { server: 'EDGE-FW-01', incidents: 4 },
];

const TOP_IPS = [
  { ip: '192.168.1.50', attacks: 28 },
  { ip: '198.51.100.23', attacks: 22 },
  { ip: '172.16.0.44', attacks: 17 },
  { ip: '10.0.4.112', attacks: 12 },
];

export default function SecurityAnalytics() {
  return (
    <div className="space-y-4 font-sans w-full">
      
      {/* Header Bar */}
      <div className="rounded-xl bg-zinc-900/90 border border-zinc-800 p-4 flex items-center justify-between shadow-xl backdrop-blur">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <h2 className="text-sm font-black text-white uppercase tracking-wider font-mono">
            SECURITY ANALYTICS & TELEMETRY CHARTS
          </h2>
        </div>
        <span className="text-xs font-mono text-zinc-400">
          RECHARTS TELEMETRY SUITE
        </span>
      </div>

      {/* 2x2 Spacious Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Events & Alerts Over Time */}
        <div className="rounded-xl bg-zinc-900/90 border border-zinc-800 p-5 space-y-3 shadow-xl backdrop-blur">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <h3 className="text-xs font-bold text-zinc-200 font-mono flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" /> EVENTS & ALERTS OVER TIME
            </h3>
            <span className="text-[10px] font-mono text-cyan-400">14:00 - 14:30</span>
          </div>

          <div className="h-64 w-full font-mono text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={EVENTS_OVER_TIME} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', color: '#f8fafc' }} />
                <Area type="monotone" dataKey="events" stroke="#00ffcc" fill="rgba(0, 255, 204, 0.15)" strokeWidth={2} name="Events/s" />
                <Area type="monotone" dataKey="alerts" stroke="#ef4444" fill="rgba(239, 68, 68, 0.2)" strokeWidth={2} name="Alerts" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Severity Distribution Donut Chart */}
        <div className="rounded-xl bg-zinc-900/90 border border-zinc-800 p-5 space-y-3 shadow-xl backdrop-blur">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <h3 className="text-xs font-bold text-zinc-200 font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" /> SEVERITY DISTRIBUTION
            </h3>
            <span className="text-[10px] font-mono text-rose-400">190 TOTAL ALERTS</span>
          </div>

          <div className="h-64 w-full flex items-center justify-between font-mono text-xs px-2">
            <div className="w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SEVERITY_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {SEVERITY_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', color: '#f8fafc' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-1/2 space-y-2.5 pl-4 font-mono text-xs border-l border-zinc-800">
              {SEVERITY_DISTRIBUTION.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-zinc-950 border border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></span>
                    <span className="text-zinc-300 font-bold">{item.name}</span>
                  </div>
                  <strong className="text-white font-mono">{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart 3: Top Affected Servers */}
        <div className="rounded-xl bg-zinc-900/90 border border-zinc-800 p-5 space-y-3 shadow-xl backdrop-blur">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <h3 className="text-xs font-bold text-zinc-200 font-mono flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" /> TOP AFFECTED SERVERS
            </h3>
            <span className="text-[10px] font-mono text-cyan-400">BY INCIDENT COUNT</span>
          </div>

          <div className="h-64 w-full font-mono text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TOP_SERVERS} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis dataKey="server" type="category" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} width={110} />
                <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', color: '#f8fafc' }} />
                <Bar dataKey="incidents" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Top Attacker Source IPs */}
        <div className="rounded-xl bg-zinc-900/90 border border-zinc-800 p-5 space-y-3 shadow-xl backdrop-blur">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <h3 className="text-xs font-bold text-zinc-200 font-mono flex items-center gap-2">
              <Globe className="w-4 h-4 text-rose-400" /> TOP ATTACKER SOURCE IPS
            </h3>
            <span className="text-[10px] font-mono text-rose-400 font-bold">INBOUND ATTACKS</span>
          </div>

          <div className="h-64 w-full font-mono text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TOP_IPS} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="ip" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} height={35} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', color: '#f8fafc' }} />
                <Bar dataKey="attacks" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
