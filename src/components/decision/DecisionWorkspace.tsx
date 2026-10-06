import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ArchitectureFlow from './ArchitectureFlow';
import SystemStateTwin from './SystemStateTwin';
import ActionImpact from './ActionImpact';
import SecurityOptimizer from './SecurityOptimizer';
import OutcomeMemory from './OutcomeMemory';
import VortexTerminal from './VortexTerminal';
import ApprovalBar from './ApprovalBar';
import { RotateCcw, X, Shield, Activity, Cpu } from 'lucide-react';
import './DecisionWorkspace.css';

const getInitialMockData = () => {
  return {
    initial_state: {
      snapshot_id: 'SNAP-7F31A2',
      server_id: 'SERVER-02',
      risk: 87,
      auth_service: 'HEALTHY',
      active_sessions: 213,
      attack_source_connected: true,
      firewall_enabled: false,
      restricted_access: false,
      server_isolated: false,
      availability: 100
    },
    actions: [
      {
        id: 'BLOCK_SOURCE',
        name: 'BLOCK SOURCE',
        description: 'Block the attacking IP 185.220.101.4 at the border/edge firewall.',
        impact: { 
          risk_before: 87, 
          risk_after: 23, 
          sessions_before: 213, 
          sessions_after: 211, 
          availability: 98, 
          disruption: 2, 
          attack_path_closed: true, 
          risk_reduction: 64,
          coverage: '96% Confirmed Threat'
        }
      },
      {
        id: 'ENABLE_FIREWALL',
        name: 'ENABLE FIREWALL',
        description: 'Activate strict mode and connection rate limits on SERVER-02 local firewall.',
        impact: { 
          risk_before: 87, 
          risk_after: 45, 
          sessions_before: 213, 
          sessions_after: 213, 
          availability: 100, 
          disruption: 0, 
          attack_path_closed: false, 
          risk_reduction: 42,
          coverage: '88% General Hardening'
        }
      },
      {
        id: 'RESTRICT_ACCESS',
        name: 'RESTRICT ACCESS',
        description: 'Disable external SSH and remote login services to VPN subnet only.',
        impact: { 
          risk_before: 87, 
          risk_after: 30, 
          sessions_before: 213, 
          sessions_after: 195, 
          availability: 92, 
          disruption: 8, 
          attack_path_closed: true, 
          risk_reduction: 57,
          coverage: '90% Segmented Access'
        }
      },
      {
        id: 'ISOLATE_SERVER',
        name: 'ISOLATE SERVER',
        description: 'Sever all external and internal network connections to SERVER-02 instantly.',
        impact: { 
          risk_before: 87, 
          risk_after: 5, 
          sessions_before: 213, 
          sessions_after: 0, 
          availability: 0, 
          disruption: 100, 
          attack_path_closed: true, 
          risk_reduction: 82,
          coverage: '99% Total Containment'
        }
      }
    ],
    beforeActions: [
      { id: 'ISOLATE_SERVER', name: 'ISOLATE SERVER' },
      { id: 'BLOCK_SOURCE', name: 'BLOCK SOURCE' },
      { id: 'ENABLE_FIREWALL', name: 'ENABLE FIREWALL' },
      { id: 'RESTRICT_ACCESS', name: 'RESTRICT ACCESS' }
    ],
    afterActions: [
      { id: 'BLOCK_SOURCE', name: 'BLOCK SOURCE', rankChange: 1 },
      { id: 'ENABLE_FIREWALL', name: 'ENABLE FIREWALL', rankChange: 1 },
      { id: 'RESTRICT_ACCESS', name: 'RESTRICT ACCESS', rankChange: 1 },
      { id: 'ISOLATE_SERVER', name: 'ISOLATE SERVER', rankChange: -3 }
    ],
    plan: {
      name: 'BLOCK SOURCE + ENABLE FIREWALL',
      projectedRisk: 18,
      availability: 96,
      disruption: 4
    }
  };
};

export default function DecisionWorkspace({ onClose, incidentDetails, initialFocus = 'all' }) {
  const [stage, setStage] = useState(0);
  const [logs, setLogs] = useState([]);
  const [selectedActionId, setSelectedActionId] = useState('BLOCK_SOURCE');
  const [isSaved, setIsSaved] = useState(false);
  const [lastDecision, setLastDecision] = useState(null);
  const [outcomeId, setOutcomeId] = useState('OM-001');
  const [memoryData, setMemoryData] = useState(null);
  const [simData] = useState(getInitialMockData);
  const [isSimulating, setIsSimulating] = useState(false);
  const [viewFilter, setViewFilter] = useState(initialFocus);

  const addLog = useCallback((msg) => {
    setLogs(prev => [...prev, msg]);
  }, []);

  const runSimulation = useCallback(async () => {
    setIsSimulating(true);
    setLogs([]);
    setIsSaved(false);
    setLastDecision(null);
    setStage(0);

    // Read outcome memory from API or localStorage
    try {
      const memoryRes = await axios.get('/api/demo/memory/AUTH_BRUTE_FORCE');
      if (memoryRes.data && memoryRes.data.similar_cases) {
        setMemoryData(memoryRes.data);
      } else {
        throw new Error("No backend memory");
      }
    } catch {
      const stored = localStorage.getItem('aegis_outcome_memory');
      if (stored) {
        setMemoryData(JSON.parse(stored));
      } else {
        setMemoryData(null);
      }
    }

    addLog('[AEGIS] incident received: INC-001 (AUTH_BRUTE_FORCE)');
    addLog('[AEGIS] target: SERVER-02 | source: 185.220.101.4 | risk: 87');
    
    await new Promise(r => setTimeout(r, 600));
    
    // Stage 1: Recommendation
    setStage(1);
    addLog('[AEGIS] generating preliminary recommendations (Heuristic #1: ISOLATE_SERVER)');
    await new Promise(r => setTimeout(r, 700));

    // Stage 2: Vortex Isolated Sandbox
    setStage(2);
    addLog('[VORTEX] creating isolated state copy from production node SERVER-02');
    addLog('[VORTEX] snapshot created: SNAP-7F31A2 (read-only sandbox)');
    await new Promise(r => setTimeout(r, 500));

    // Test actions in isolated state
    for (const act of simData.actions) {
      addLog(`[VORTEX] testing ${act.id} on SNAP-7F31A2 (Disruption: ${act.impact.disruption}%, Risk: -${act.impact.risk_reduction})`);
      await new Promise(r => setTimeout(r, 350));
    }

    // Stage 3: Security Optimizer
    setStage(3);
    addLog('[OPTIMIZER] recalculating priorities based on measured simulation impact');
    addLog('[OPTIMIZER] re-ranked: BLOCK_SOURCE moved to #1 (high protection, 2% disruption)');
    addLog('[OPTIMIZER] ISOLATE_SERVER dropped to #4 (100% service outage)');
    await new Promise(r => setTimeout(r, 600));

    // Stage 4: Admin Approval
    setStage(4);
    addLog('[AEGIS] awaiting administrator decision on Minimum Effective Plan');
    setIsSimulating(false);
  }, [addLog, simData.actions]);

  useEffect(() => {
    runSimulation();
  }, [runSimulation]);

  const handleApprove = async () => {
    const outcomeRecord = {
      outcome_id: 'OM-001',
      similar_cases: (memoryData?.similar_cases || 0) + 1,
      previous_best: 'BLOCK SOURCE',
      risk_before: 87,
      risk_after: 23,
      result: 'SUCCESS',
      approved: true,
      plan: simData.plan.name,
      timestamp: new Date().toISOString()
    };

    try {
      await axios.post('/api/demo/outcomes', {
        incident_type: 'AUTH_BRUTE_FORCE',
        approved: true,
        plan: simData.plan.name
      });
    } catch {
      console.warn("Backend not on port 8000; stored to local persistent memory");
    }

    localStorage.setItem('aegis_outcome_memory', JSON.stringify(outcomeRecord));
    setMemoryData(outcomeRecord);
    setLastDecision('APPROVED');
    setOutcomeId('OM-001');
    setStage(5);
    setIsSaved(true);
    addLog('[AEGIS] Administrator APPROVED defensive response');
    addLog('[OUTCOME MEMORY] Stored outcome OM-001 to persistent knowledge base');
  };

  const handleReject = async () => {
    const outcomeRecord = {
      outcome_id: 'OM-001',
      similar_cases: (memoryData?.similar_cases || 0) + 1,
      previous_best: 'BLOCK SOURCE',
      risk_before: 87,
      risk_after: simData.plan.projectedRisk,
      result: 'REJECTED',
      approved: false,
      plan: simData.plan.name,
      timestamp: new Date().toISOString()
    };

    try {
      await axios.post('/api/demo/outcomes', {
        incident_type: 'AUTH_BRUTE_FORCE',
        approved: false,
        plan: simData.plan.name
      });
    } catch {
      console.warn("Backend not on port 8000; stored rejection to local memory");
    }

    localStorage.setItem('aegis_outcome_memory', JSON.stringify(outcomeRecord));
    setMemoryData(outcomeRecord);
    setLastDecision('REJECTED');
    setOutcomeId('OM-001');
    setStage(5);
    setIsSaved(true);
    addLog('[AEGIS] Administrator REJECTED defensive response');
    addLog('[OUTCOME MEMORY] Stored rejection event OM-001 to persistent knowledge base');
  };

  const handleResetMemory = () => {
    localStorage.removeItem('aegis_outcome_memory');
    setMemoryData(null);
    addLog('[OUTCOME MEMORY] Database reset to baseline (0 previous cases)');
  };

  const selectedAction = simData.actions.find(a => a.id === selectedActionId) || simData.actions[0];

  return (
    <div className="vortex-overlay">
      {/* ─── Top Workstation Header ─── */}
      <div className="vortex-header flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-white tracking-widest bg-cyan-950/80 border border-cyan-500/40 px-3 py-1.5 rounded-lg shadow-md shadow-cyan-500/20">
            <Shield size={14} className="text-cyan-400" />
            <span>AEGIS-X DECISION LAYER</span>
          </div>

          {/* Service Health Indicators */}
          <div className="hidden lg:flex items-center gap-3 text-[11px] font-mono text-slate-400 pl-3 border-l border-slate-700">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Controller: ONLINE
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> Vortex: READY
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-400" /> Optimizer: ACTIVE
            </span>
          </div>
        </div>

        {/* Explainable Pipeline Bar */}
        <ArchitectureFlow stage={stage} />

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="px-3.5 py-1.5 rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-xs font-mono font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw size={12} className={isSimulating ? 'animate-spin' : ''} />
            <span>RE-SIMULATE</span>
          </button>
          
          <button 
            onClick={onClose} 
            className="px-4 py-1.5 border border-slate-700 rounded-full text-xs font-bold tracking-wider text-slate-300 hover:text-white cursor-pointer bg-slate-900/60 hover:bg-slate-800 transition-colors shadow-lg font-['Outfit'] flex items-center gap-1"
          >
            <X size={14} /> CLOSE WORKSPACE
          </button>
        </div>
      </div>

      {/* ─── Workstation Main Content (Floating Panels) ─── */}
      <div className="vortex-content flex-1 overflow-y-auto">
        {/* Left Column: Outcome Memory, System Twin, and Terminal */}
        <div className="vortex-left">
          <OutcomeMemory 
            memoryData={stage >= 1 ? memoryData : null} 
            onResetMemory={handleResetMemory}
          />

          {stage >= 2 && (
            <SystemStateTwin 
              state={simData.initial_state} 
              selectedAction={selectedAction}
            />
          )}

          <VortexTerminal 
            logs={logs} 
            isSimulating={isSimulating} 
            onRerun={runSimulation}
          />
        </div>
        
        {/* Right Column: Action Impact Analysis and Security Optimizer */}
        <div className="vortex-right">
          {stage >= 2 && (
            <ActionImpact 
              actions={simData.actions} 
              selectedActionId={selectedActionId} 
              onSelectAction={setSelectedActionId} 
            />
          )}

          {stage >= 3 && (
            <SecurityOptimizer 
              beforeActions={simData.beforeActions} 
              afterActions={simData.afterActions} 
              plan={simData.plan} 
            />
          )}
        </div>
      </div>

      {/* ─── Persistent Bottom Decision Bar ─── */}
      {stage >= 4 && (
        <ApprovalBar 
          recommendation={simData.plan.name}
          onApprove={handleApprove}
          onReject={handleReject}
          onClose={onClose}
          onRunAgain={runSimulation}
          isSaved={isSaved}
          lastDecision={lastDecision}
          outcomeId={outcomeId}
        />
      )}
    </div>
  );
}
