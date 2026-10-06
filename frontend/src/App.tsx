import { useState, useEffect } from 'react';
import axios from 'axios';
import { Database, Cloud, Monitor, ShieldAlert, Activity, Lock, AlertTriangle, Play } from 'lucide-react';

const API_BASE = 'http://127.0.0.1:8000';

export default function App() {
  const [status, setStatus] = useState({ defcon: 5, active_incidents: 0, contained_entities: [] });
  const [alerts, setAlerts] = useState([]);
  const [topology, setTopology] = useState({ nodes: [], active_threat_path: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statRes, alertRes, topRes] = await Promise.all([
          axios.get(`${API_BASE}/api/status`),
          axios.get(`${API_BASE}/alerts`),
          axios.get(`${API_BASE}/api/topology`)
        ]);
        setStatus(statRes.data);
        setAlerts(alertRes.data.alerts);
        setTopology(topRes.data);
      } catch (e) {
        console.error("Backend offline", e);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 1500);
    return () => clearInterval(interval);
  }, []);

  const triggerAttack = async () => {
    await axios.post(`${API_BASE}/api/range/launch`, {
      scenario: 'brute_force',
      intensity: 'aggressive',
      target_user: 'root',
      custom_ip: '198.51.100.23',
      target_host: 'DB-01'
    });
  };

  const severPath = async () => {
    await axios.post(`${API_BASE}/api/containment/execute`, {
      target_type: "host",
      target_value: "DB-01",
      action: "ISOLATE"
    });
  };

  const isIsolated = status.contained_entities.some((e: string) => e.includes("DB-01") || e.includes("ip:"));
  const hasCritical = alerts.some((a: any) => a.severity === 'CRITICAL');

  return (
    <div className="flex h-screen bg-[#070b14] text-slate-300 font-sans overflow-hidden">
      <div className="w-64 border-r border-slate-800 bg-[#0a0f1c] p-4 flex flex-col">
        <h1 className="text-xl font-bold text-white mb-8 tracking-wider">AEGIS-X</h1>
        <nav className="flex-1 space-y-2">
          {['Overview', 'Live Events', 'Incidents', 'Threat Map'].map(item => (
            <div key={item} className="px-4 py-2 text-sm text-slate-400 hover:text-white cursor-pointer">{item}</div>
          ))}
          <div className="px-4 py-2 text-sm bg-red-500/10 text-red-400 border-l-2 border-red-500 font-medium cursor-pointer">Network Topology</div>
          {['Simulation Lab', 'Analytics', 'System Health'].map(item => (
            <div key={item} className="px-4 py-2 text-sm text-slate-400 hover:text-white cursor-pointer">{item}</div>
          ))}
        </nav>
        <button onClick={triggerAttack} className="mt-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white p-3 rounded text-sm transition-colors border border-slate-700 shadow-lg cursor-pointer">
          <Play size={16} /> Launch Simulation
        </button>
      </div>

      <div className="flex-1 p-6 flex flex-col overflow-y-auto">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Internal Network Topology</h2>
            <p className="text-sm text-slate-500 mt-1">Real-time visualization of infrastructure and lateral movement</p>
          </div>
          <div className="flex items-center gap-3">
             <div className={`px-4 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 transition-colors ${hasCritical ? 'bg-red-900/30 text-red-500 border-red-900' : 'bg-emerald-900/30 text-emerald-500 border-emerald-900'}`}>
               <div className={`w-2 h-2 rounded-full ${hasCritical ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></div>
               {hasCritical ? 'DEFCON 1' : 'DEFCON 5'}
             </div>
          </div>
        </div>

        <div className="flex gap-6 h-full">
          <div className="flex-1 bg-[#0a0f1c] border border-slate-800 rounded-xl p-8 relative overflow-hidden flex flex-col justify-center items-center">
             <div className="absolute top-12 flex flex-col items-center z-20">
                <div className={`px-6 py-3 border rounded-lg flex justify-center items-center gap-2 bg-[#070b14] transition-all ${hasCritical && !isIsolated ? 'border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-cyan-800 text-cyan-400'}`}>
                   <Cloud size={20} />
                   <span className="text-sm font-semibold">Internet Gateway Egress</span>
                </div>
             </div>

             <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
               {hasCritical && !isIsolated && (
                 <>
                   <path d="M 50% 120 L 30% 300" stroke="#ef4444" strokeWidth="2" strokeDasharray="6,6" className="animate-pulse" />
                   <path d="M 30% 380 L 70% 300" stroke="#ef4444" strokeWidth="2" strokeDasharray="6,6" className="animate-pulse" />
                 </>
               )}
               {isIsolated && (
                 <path d="M 30% 380 L 70% 300" stroke="#ef4444" strokeWidth="2" opacity="0.2" />
               )}
             </svg>

             <div className="w-full max-w-2xl flex justify-between px-4 mt-40 z-20">
                <div className="flex flex-col items-center gap-4">
                  <div className={`w-48 h-32 rounded-xl border flex flex-col items-center justify-center bg-[#070b14] transition-colors ${hasCritical ? 'border-red-500/50 text-red-400' : 'border-slate-700 text-slate-400'}`}>
                    <Monitor size={32} className="mb-2" />
                    <span className="text-sm font-bold text-white">Office Network</span>
                    <span className="text-xs mt-1 text-slate-500">APP-02 (192.168.1.45)</span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 relative">
                  <div className={`w-48 h-32 rounded-xl border flex flex-col items-center justify-center bg-[#070b14] transition-all duration-500 ${isIsolated ? 'border-emerald-500/50 text-emerald-400 opacity-60' : hasCritical ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)] text-red-400' : 'border-slate-700 text-slate-400'}`}>
                    {isIsolated ? <Lock size={32} className="mb-2 text-emerald-400" /> : <Database size={32} className="mb-2" />}
                    <span className="text-sm font-bold text-white">Database Layer</span>
                    <span className="text-xs mt-1 text-slate-500">DB-01 (192.168.1.12)</span>
                  </div>
                  {isIsolated && <div className="absolute -top-3 -right-3 bg-emerald-500 text-white text-[10px] px-2 py-1 rounded font-bold shadow-lg">ISOLATED</div>}
                  {hasCritical && !isIsolated && <div className="absolute -top-3 -right-3 bg-red-500 text-white p-1.5 rounded-full animate-bounce shadow-lg"><AlertTriangle size={14} /></div>}
                </div>
             </div>
          </div>

          <div className="w-80 bg-[#0a0f1c] border border-slate-800 rounded-xl p-5 flex flex-col">
            <h3 className={`text-sm font-bold flex items-center gap-2 mb-6 ${hasCritical ? 'text-red-400' : 'text-slate-500'}`}>
              <ShieldAlert size={16} /> {hasCritical ? 'ACTIVE THREAT PATH' : 'SYSTEM SECURE'}
            </h3>

            {hasCritical ? (
              <div className="flex-1 space-y-6">
                {topology.active_threat_path.map((step: any, idx: number) => (
                  <div key={idx} className="relative">
                    {idx < topology.active_threat_path.length - 1 && (
                      <div className="absolute left-3 top-8 bottom-[-24px] w-0.5 bg-slate-800"></div>
                    )}
                    <div className="flex gap-3 relative z-10">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500 text-red-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {step.step}
                      </div>
                      <div className="bg-[#070b14] border border-red-900/40 rounded-lg p-3 flex-1 shadow-md">
                        <div className="text-xs font-bold text-red-300">{step.label}</div>
                        <div className="text-[10px] text-slate-500 mt-1">{step.node} ({step.ip})</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
                <Activity size={48} className="mb-4 opacity-20" />
                <p className="text-sm text-center">Monitoring telemetry.<br/>No active anomalies detected.</p>
              </div>
            )}

            <button 
              onClick={severPath}
              disabled={!hasCritical || isIsolated}
              className={`w-full mt-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${isIsolated ? 'bg-emerald-900/20 text-emerald-500 border border-emerald-900/50 cursor-not-allowed' : hasCritical ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'}`}
            >
              {isIsolated ? <><Lock size={16} /> PATH SEVERED</> : <><Lock size={16} /> SEVER ACTIVE PATH</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
