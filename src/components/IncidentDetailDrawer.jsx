import React, { useState } from 'react';
import {
  X, ShieldAlert, Lock, Eye, Clock, User, Globe, Server, GitMerge, BrainCircuit,
  MessageSquare, Send, Sparkles, FileText, CheckCircle2, ArrowRight
} from 'lucide-react';
import RiskGauge from './RiskGauge';
import { soundFx } from '../utils/audio';

export default function IncidentDetailDrawer({
  incident,
  onClose,
  onUpdateStatus,
  onAddNote,
  onIsolateTarget,
  containedEntities = []
}) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [newNote, setNewNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  if (!incident) return null;

  const incId = incident.id || incident.incident_id || 'INC-1042';
  const isIsolated = containedEntities.some(
    e => e.includes(incident.source_ip || '') || e.includes(incident.user || '')
  );

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    soundFx?.playClick?.();
    if (onAddNote) onAddNote(incId, newNote);
    setNewNote('');
    setShowNoteInput(false);
  };

  const tabs = ['Overview', 'Timeline', 'Related Events', 'Affected Assets', 'User Activity', 'Correlation', 'AI Analysis', 'Notes'];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end font-sans">
      <div className="w-full max-w-4xl bg-[#090d17] border-l border-slate-800 h-full overflow-y-auto flex flex-col justify-between shadow-2xl">
        
        {/* Drawer Header */}
        <div>
          <div className="p-6 bg-[#0c1220] border-b border-slate-800 space-y-4 sticky top-0 z-10">
            {/* Top Breadcrumb & Close */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>Incidents</span>
                <span>/</span>
                <span className="text-orange-400 font-bold">{incId}</span>
              </div>
              <button
                onClick={() => {
                  soundFx?.playClick?.();
                  if (onClose) onClose();
                }}
                className="p-1.5 rounded-lg bg-[#080b14] border border-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-black text-white tracking-wide">{incident.attack_type || incident.type || 'Brute Force Login'}</h2>
                <span className="px-2.5 py-0.5 rounded text-xs font-black bg-rose-950 text-rose-400 border border-rose-500/50">
                  {incident.severity || 'HIGH'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <button
                  onClick={() => onUpdateStatus && onUpdateStatus(incId, 'Investigating')}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 shadow-md shadow-blue-600/20"
                >
                  Investigate
                </button>
                <button
                  onClick={() => onUpdateStatus && onUpdateStatus(incId, 'Escalated')}
                  className="px-3 py-1.5 rounded-lg bg-rose-950 text-rose-300 border border-rose-500/40 hover:bg-rose-900 font-bold"
                >
                  Escalate
                </button>
                <button
                  onClick={() => onUpdateStatus && onUpdateStatus(incId, 'Resolved')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-900 font-bold"
                >
                  Mark Resolved
                </button>
              </div>
            </div>

            {/* Sub-nav Tabs */}
            <div className="flex items-center gap-1 border-t border-slate-800/80 pt-3 overflow-x-auto text-xs font-medium">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#131b2e]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Drawer Body */}
          <div className="p-6 space-y-6">
            
            {/* Top Grid: Risk Assessment & Recommended Action */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Risk Assessment Card */}
              <div className="rounded-xl bg-[#0e1424] border border-slate-800/80 p-5 space-y-4">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">RISK ASSESSMENT</h3>
                
                <div className="flex items-center justify-between gap-4">
                  <div className="w-36">
                    <RiskGauge score={incident.risk || incident.risk_score || 85} />
                  </div>

                  <div className="space-y-1.5 text-xs font-mono text-slate-300 flex-1">
                    <div className="flex justify-between border-b border-slate-800/60 pb-1">
                      <span className="text-slate-500">Severity:</span>
                      <strong className="text-rose-400">{incident.severity || 'HIGH'}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-800/60 pb-1">
                      <span className="text-slate-500">Priority:</span>
                      <strong className="text-amber-300">{incident.priority || 'P1'}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-800/60 pb-1">
                      <span className="text-slate-500">Confidence:</span>
                      <strong className="text-cyan-400">91%</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-800/60 pb-1">
                      <span className="text-slate-500">Target Host:</span>
                      <strong className="text-slate-200">{incident.target_host || 'DB-01'}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-800/60 pb-1">
                      <span className="text-slate-500">Affected Asset:</span>
                      <strong className="text-slate-200">{incident.affected_asset || 'AUTH-01'}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Source IP:</span>
                      <strong className="text-rose-400">{incident.source_ip || '192.168.1.50'}</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundFx?.playIsolationLock?.();
                    if (onIsolateTarget) onIsolateTarget('ip', incident.source_ip || '192.168.1.50');
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
                >
                  Investigate Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Recommended Action Card */}
              <div className="rounded-xl bg-[#0e1424] border border-slate-800/80 p-5 space-y-4">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">RECOMMENDED ACTION</h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#090d17] border border-slate-800/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-200 font-medium">Investigate the affected asset</div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#090d17] border border-slate-800/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-200 font-medium">Verify user identity and active session</div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#090d17] border border-slate-800/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-200 font-medium">Check for lateral movement across subnets</div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#090d17] border border-slate-800/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-200 font-medium">Review system authentication logs for additional indicators</div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">ISOLATION LOCK:</span>
                  {isIsolated ? (
                    <span className="px-3 py-1 rounded-md bg-emerald-950 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/40 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" /> HOST ISOLATED
                    </span>
                  ) : (
                    <button
                      onClick={() => onIsolateTarget && onIsolateTarget('ip', incident.source_ip || '192.168.1.50')}
                      className="px-3 py-1 rounded-md bg-rose-950 text-rose-300 border border-rose-500/40 font-mono text-xs font-bold flex items-center gap-1.5"
                    >
                      <Lock className="w-3.5 h-3.5" /> ISOLATE IP
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Attack Timeline Section */}
            <div className="rounded-xl bg-[#0e1424] border border-slate-800/80 p-5 space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" /> ATTACK TIMELINE
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-[#090d17] border border-slate-800 space-y-1">
                  <div className="text-slate-400 font-bold">14:10:08</div>
                  <div className="text-rose-400 font-bold">Failed Login</div>
                  <div className="text-[11px] text-slate-500">Invalid credentials</div>
                </div>

                <div className="p-3 rounded-lg bg-[#090d17] border border-slate-800 space-y-1">
                  <div className="text-slate-400 font-bold">14:10:01</div>
                  <div className="text-rose-400 font-bold">Failed Login</div>
                  <div className="text-[11px] text-slate-500">Invalid credentials</div>
                </div>

                <div className="p-3 rounded-lg bg-[#090d17] border border-slate-800 space-y-1">
                  <div className="text-slate-400 font-bold">14:09:42</div>
                  <div className="text-rose-400 font-bold">Failed Login</div>
                  <div className="text-[11px] text-slate-500">Invalid credentials</div>
                </div>

                <div className="p-3 rounded-lg bg-[#090d17] border border-slate-800 space-y-1">
                  <div className="text-slate-400 font-bold">14:09:12</div>
                  <div className="text-rose-400 font-bold">Failed Login</div>
                  <div className="text-[11px] text-slate-500">Invalid credentials</div>
                </div>

                <div className="p-3 rounded-lg bg-[#090d17] border border-slate-800 space-y-1">
                  <div className="text-slate-400 font-bold">14:10:01</div>
                  <div className="text-emerald-400 font-bold">Successful Login</div>
                  <div className="text-[11px] text-slate-500">Valid credentials</div>
                </div>

                <div className="p-3 rounded-lg bg-[#090d17] border border-slate-800 space-y-1">
                  <div className="text-slate-400 font-bold">14:14:06</div>
                  <div className="text-amber-300 font-bold">Privilege Change</div>
                  <div className="text-[11px] text-slate-500">Added to sudo group</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
