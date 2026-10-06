import React, { useEffect, useRef } from 'react';
import { Terminal, Shield, RefreshCw } from 'lucide-react';
import './DecisionWorkspace.css';

export default function VortexTerminal({ logs, isSimulating, onRerun }) {
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="vortex-panel h-64 flex flex-col">
      <div className="vortex-panel-header justify-between text-emerald-400">
        <div className="flex items-center gap-2">
          <Terminal size={16} /> VORTEX SIMULATION TERMINAL
        </div>
        <div className="flex items-center gap-2">
          {isSimulating && (
            <span className="flex items-center gap-1 text-[10px] font-mono text-cyan-400">
              <RefreshCw size={10} className="animate-spin" /> EXECUTING
            </span>
          )}
          <div className="flex items-center gap-1.5 ml-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          </div>
        </div>
      </div>
      <div className="vortex-terminal font-mono text-xs" ref={terminalRef}>
        <div className="text-slate-500 mb-2 font-bold">
          root@vortex:~# <span className="text-emerald-400">validate --incident INC-001 --target SERVER-02</span>
        </div>
        {logs.map((log, i) => {
          let colorClass = 'text-cyan-400';
          if (log.includes('[AEGIS]')) colorClass = 'text-slate-300';
          if (log.includes('[VORTEX]')) colorClass = 'text-cyan-300';
          if (log.includes('[OPTIMIZER]')) colorClass = 'text-blue-300 font-bold';
          if (log.includes('[SUCCESS]') || log.includes('COMPLETE') || log.includes('closed')) colorClass = 'text-emerald-400 font-bold';

          return (
            <div key={i} className={`mb-1 leading-relaxed ${colorClass}`}>
              {log}
            </div>
          );
        })}
        {isSimulating ? (
          <div className="inline-block text-cyan-400 font-black animate-pulse font-mono">▋</div>
        ) : (
          <div className="text-slate-500 text-[10px] mt-2">-- Simulation cycle complete. Awaiting administrator approval. --</div>
        )}
      </div>
    </div>
  );
}
