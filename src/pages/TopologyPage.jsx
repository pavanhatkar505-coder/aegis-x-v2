import React from 'react';
import { Cloud, Server, Database, Laptop, Shield, ShieldAlert, Lock, ArrowRight, Activity, ArrowDown } from 'lucide-react';
import { NETWORK_SUBNETS, ACTIVE_THREAT_PATH } from '../data/network';

export default function TopologyPage() {
  return (
    <div className="p-6 space-y-6 bg-[#F5F8FC] min-h-screen text-[#152033] font-sans">
      {/* Header & Top Right Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#152033] tracking-wide">Internal Network Topology</h1>
          <p className="text-xs text-[#69778A] mt-1">Real-time visualization of infrastructure and lateral movement</p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <select className="px-3 py-1.5 bg-white border border-[#E7ECF2] rounded-lg text-[#152033] focus:outline-none shadow-sm">
            <option>All Environments</option>
            <option>AWS Production</option>
            <option>Corporate Datacenter</option>
          </select>
          <select className="px-3 py-1.5 bg-white border border-[#E7ECF2] rounded-lg text-[#152033] focus:outline-none shadow-sm">
            <option>All Assets</option>
            <option>Critical Databases Only</option>
          </select>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live
          </div>
        </div>
      </div>

      {/* Main Grid: Network Node Canvas & Active Threat Path Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Network Diagram Canvas Card */}
        <div className="lg:col-span-3 rounded-2xl bg-white border border-[#E7ECF2] p-6 relative min-h-[480px] flex flex-col justify-between shadow-sm overflow-hidden">
          
          {/* Top Ingress Gateway (Internet -> Firewall -> Proxy) */}
          <div className="flex items-center justify-center gap-4">
            <div className="px-4 py-2 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#2563EB] font-mono text-xs font-bold flex items-center gap-2">
              <Cloud className="w-4 h-4 text-[#2563EB]" /> Internet
            </div>
            <div className="w-6 h-px bg-[#2563EB]/40" />
            <div className="px-4 py-2 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#2563EB] font-mono text-xs font-bold flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#2563EB]" /> Firewall
            </div>
            <div className="w-6 h-px bg-[#2563EB]/40" />
            <div className="px-4 py-2 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#2563EB] font-mono text-xs font-bold flex items-center gap-2">
              <Server className="w-4 h-4 text-[#2563EB]" /> Proxy
            </div>
          </div>

          {/* Subnet Nodes Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-8 z-10">
            {NETWORK_SUBNETS.slice(0, 4).map((sub) => {
              const isCompromised = sub.status === 'compromised';
              return (
                <div
                  key={sub.id}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center space-y-2 relative shadow-sm ${
                    isCompromised
                      ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-400/40 shadow-rose-100 animate-pulse'
                      : 'bg-[#F7F9FC] border-[#E7ECF2] hover:border-[#2563EB]/40'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${isCompromised ? 'bg-rose-100 text-rose-600' : 'bg-blue-50 text-[#2563EB]'}`}>
                    {sub.type === 'db' ? <Database className="w-6 h-6" /> : <Server className="w-6 h-6" />}
                  </div>
                  <div className="text-center">
                    <div className={`text-xs font-bold ${isCompromised ? 'text-rose-700' : 'text-[#152033]'}`}>{sub.name}</div>
                    <div className="text-[10px] font-mono text-[#69778A]">{sub.devices}</div>
                  </div>

                  {isCompromised && (
                    <span className="absolute -top-2 -right-2 p-1.5 rounded-full bg-rose-500 text-white shadow-md">
                      <ShieldAlert className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Subnets Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 z-10">
            {NETWORK_SUBNETS.slice(4).map((sub) => (
              <div
                key={sub.id}
                className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E7ECF2] hover:border-[#2563EB]/40 transition-all cursor-pointer flex flex-col items-center justify-center space-y-2 shadow-sm"
              >
                <div className="p-3 rounded-xl bg-blue-50 text-[#2563EB]">
                  {sub.type === 'cloud' ? <Cloud className="w-5 h-5" /> : <Laptop className="w-5 h-5" />}
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold text-[#152033]">{sub.name}</div>
                  <div className="text-[10px] font-mono text-[#69778A]">{sub.devices}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Connecting Paths Overlay SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
            <line x1="50%" y1="60" x2="25%" y2="180" stroke="#2563EB" strokeWidth="2" strokeDasharray="5,4" />
            <line x1="50%" y1="60" x2="75%" y2="180" stroke="#EF4444" strokeWidth="2" strokeDasharray="6,4" />
          </svg>

        </div>

        {/* Right Floating Active Threat Path Panel */}
        <div className="rounded-2xl bg-white border border-[#E7ECF2] p-5 space-y-5 shadow-sm flex flex-col justify-between">
          <div className="space-y-4 font-mono text-xs">
            <h3 className="text-xs font-bold text-rose-600 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-500" /> Active Threat Path
            </h3>

            <div className="space-y-4">
              {ACTIVE_THREAT_PATH.map((item) => (
                <div key={item.step} className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1 relative">
                  <span className="w-6 h-6 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center justify-center absolute -top-2.5 -left-2.5 shadow-md">
                    {item.step}
                  </span>
                  <div className="text-xs font-bold text-rose-800">{item.title}</div>
                  <div className="text-[11px] font-mono font-semibold text-rose-950">{item.host}</div>
                  <div className="text-[10px] text-rose-600">{item.ip}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => alert('Executing host isolation protocol for threat path...')}
            className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-600/20"
          >
            <Lock className="w-4 h-4" /> Isolate Active Path
          </button>
        </div>

      </div>
    </div>
  );
}
