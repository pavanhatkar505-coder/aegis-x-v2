import React from 'react';
import MetricCards from '../components/MetricCards';
import LiveEventStream from '../components/LiveEventStream';
import ActiveIncidentsTable from '../components/ActiveIncidentsTable';
import SystemHealthPanel from '../components/SystemHealthPanel';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import SecurityAnalytics from '../components/SecurityAnalytics';
import RiskGauge from '../components/RiskGauge';
import { ShieldCheck, Activity, Terminal } from 'lucide-react';

export default function SocCommandDeskPage({
  metrics,
  events,
  incidents,
  containedEntities,
  isStreamingPaused,
  onPauseStream,
  onResumeStream,
  onClearStream,
  onSelectIncident
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner Header with AEGIS-X Logo */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-5 backdrop-blur shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          
          {/* Logo Badge Container */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <img 
              src="/aegis-x-logo.png" 
              alt="AEGIS-X Cyber Shield Logo" 
              className="relative w-14 h-14 object-cover rounded-xl border border-cyan-500/40 shadow-lg"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white uppercase tracking-widest font-mono">
                AEGIS-X
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/40 uppercase">
                COMMAND DESK
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              REAL-TIME SECURITY DECISION ENGINE & ACTIVE SOC DEFENSE OVERVIEW
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>ACTIVE DEFENSE ENGINE: ONLINE</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>TELEMETRY RATE: {metrics?.events_per_sec || 240} EPS</span>
          </div>
        </div>
      </div>

      {/* Top Metric Cards */}
      <MetricCards metrics={metrics} />

      {/* Live Event Stream Panel & Risk Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Live Event Stream Table */}
        <div className="lg:col-span-2">
          <LiveEventStream
            events={events}
            isPaused={isStreamingPaused}
            onPause={onPauseStream}
            onResume={onResumeStream}
            onClear={onClearStream}
          />
        </div>

        {/* Right 1 Col: Radial Risk Gauge */}
        <div className="lg:col-span-1 space-y-6">
          <RiskGauge score={metrics?.average_risk_score || 68} />
          
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs space-y-2 shadow-lg">
            <span className="text-zinc-400 font-bold uppercase block border-b border-zinc-800 pb-2">
              REAL-TIME RISK ASSESSMENT METRICS
            </span>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between text-zinc-300">
                <span>ACTIVE CONTAINMENT ENTITIES:</span>
                <span className="text-cyan-400 font-bold">{containedEntities.length}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>CORRELATION ENGINE STATUS:</span>
                <span className="text-emerald-400 font-bold">OPTIMAL (0.4ms)</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>AI THREAT SYNTHESIS:</span>
                <span className="text-emerald-400 font-bold">READY (99.4% CONF)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Recharts Security Analytics Suite */}
      <SecurityAnalytics events={events} incidents={incidents} />

      {/* Active Incidents Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            ACTIVE SECURITY INCIDENTS ({incidents.length})
          </h2>
          <span className="text-xs text-zinc-500 font-mono">
            CLICK ROW TO INSPECT INCIDENT DOSSIER
          </span>
        </div>
        <ActiveIncidentsTable
          incidents={incidents}
          onSelectIncident={onSelectIncident}
          containedEntities={containedEntities}
        />
      </div>

      {/* Subsystem Health Monitoring Grid */}
      <SystemHealthPanel />

      {/* Live Event Architecture Pipeline Diagram (Rendered ONCE across full width) */}
      <ArchitectureDiagram />

    </div>
  );
}
