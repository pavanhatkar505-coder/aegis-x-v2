import React, { useState } from 'react';
import { Play, Square, CheckCircle2 } from 'lucide-react';
import { SIMULATION_SCENARIOS, SIMULATION_STREAM_EVENTS } from '../data/simulation';

export default function SimulationPage() {
  const [selectedScenario, setSelectedScenario] = useState('brute-force');
  const [isRunning, setIsRunning] = useState(true);

  return (
    <div className="p-6 space-y-6 bg-[#F5F8FC] min-h-screen text-[#152033] font-sans">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#152033] tracking-wide">Simulation Lab</h1>
        <p className="text-xs text-[#69778A] mt-1">Test and validate detection capabilities using realistic attack scenarios</p>
      </div>

      {/* Main 3-Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT CARD: Select Scenario */}
        <div className="rounded-2xl bg-white border border-[#E7ECF2] p-5 space-y-4 shadow-sm">
          <h3 className="text-xs font-bold text-[#69778A] uppercase tracking-wider font-mono">Select Scenario</h3>

          <div className="space-y-2.5 font-mono text-xs">
            {SIMULATION_SCENARIOS.map((sc) => {
              const isSelected = selectedScenario === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenario(sc.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-blue-50/60 border-[#2563EB] ring-2 ring-[#2563EB]/20 text-[#2563EB] font-bold shadow-sm'
                      : 'bg-[#F5F8FC] border-[#E7ECF2] text-[#152033] hover:border-[#2563EB]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{sc.name}</span>
                    <span className="text-[10px] font-mono text-[#69778A]">{sc.mitre}</span>
                  </div>
                  <div className="text-[10px] font-sans text-[#69778A] mt-1 font-normal">{sc.description}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* CENTER CARD: Simulation Control */}
        <div className="rounded-2xl bg-white border border-[#E7ECF2] p-5 space-y-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#E7ECF2] pb-3">
              <h3 className="text-xs font-bold text-[#69778A] uppercase tracking-wider font-mono">Simulation Control</h3>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 font-mono text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                {isRunning ? 'RUNNING 00:02:34' : 'STOPPED'}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 my-6 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-[#F5F8FC] border border-[#E7ECF2]">
                <div className="text-[#69778A] text-[10px]">Events Generated</div>
                <div className="text-2xl font-black text-[#152033] mt-1">127</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F5F8FC] border border-[#E7ECF2]">
                <div className="text-[#69778A] text-[10px]">Alerts Triggered</div>
                <div className="text-2xl font-black text-rose-600 mt-1">9</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F5F8FC] border border-[#E7ECF2]">
                <div className="text-[#69778A] text-[10px]">Detection Time</div>
                <div className="text-2xl font-black text-[#2563EB] mt-1">1.4 sec</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F5F8FC] border border-[#E7ECF2]">
                <div className="text-[#69778A] text-[10px]">Detection Rate</div>
                <div className="text-2xl font-black text-emerald-600 mt-1">92%</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`w-full py-3.5 px-4 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
              isRunning
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
            }`}
          >
            {isRunning ? (
              <>
                <Square className="w-4 h-4 fill-white" /> Stop Simulation
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" /> Start Simulation
              </>
            )}
          </button>
        </div>

        {/* RIGHT CARD: Live Simulation Stream */}
        <div className="rounded-2xl bg-white border border-[#E7ECF2] p-5 space-y-4 shadow-sm">
          <h3 className="text-xs font-bold text-[#69778A] uppercase tracking-wider font-mono">Live Simulation Stream</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="text-[#69778A] border-b border-[#E7ECF2] text-[10px]">
                <tr>
                  <th className="pb-2">TIME</th>
                  <th className="pb-2">EVENT</th>
                  <th className="pb-2 text-right">RESULT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7ECF2]">
                {SIMULATION_STREAM_EVENTS.map((ev, idx) => (
                  <tr key={idx} className="hover:bg-[#F5F8FC]">
                    <td className="py-2.5 text-[#69778A]">{ev.time}</td>
                    <td className="py-2.5 text-[#152033] font-bold">{ev.event}</td>
                    <td className="py-2.5 text-right font-bold text-emerald-600 flex items-center justify-end gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {ev.result}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* BOTTOM KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#E7ECF2] shadow-sm font-mono text-xs">
          <div className="text-[#69778A] text-[10px]">Detection Coverage</div>
          <div className="text-xl font-extrabold text-emerald-600 mt-1">92%</div>
          <div className="text-[10px] text-[#69778A] mt-0.5">Detected 12/13 patterns</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E7ECF2] shadow-sm font-mono text-xs">
          <div className="text-[#69778A] text-[10px]">Potential Gaps</div>
          <div className="text-xl font-extrabold text-amber-600 mt-1">1 missing coverage</div>
          <div className="text-[10px] text-[#69778A] mt-0.5">DNS Tunneling rule gap</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E7ECF2] shadow-sm font-mono text-xs">
          <div className="text-[#69778A] text-[10px]">Avg. Detection Time</div>
          <div className="text-xl font-extrabold text-[#2563EB] mt-1">1.4s</div>
          <div className="text-[10px] text-[#69778A] mt-0.5">Real-time ingest</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E7ECF2] shadow-sm font-mono text-xs">
          <div className="text-[#69778A] text-[10px]">Events per Minute</div>
          <div className="text-xl font-extrabold text-[#152033] mt-1">52</div>
          <div className="text-[10px] text-[#69778A] mt-0.5">Stream throughput</div>
        </div>
      </div>
    </div>
  );
}
