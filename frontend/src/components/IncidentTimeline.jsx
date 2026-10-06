import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Eye, 
  BrainCircuit, 
  HelpCircle, 
  Clock, 
  User, 
  Globe, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Filter,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Sparkles
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function IncidentTimeline({ alerts = [], containedEntities = [], onIsolateTarget }) {
  const [expandedId, setExpandedId] = useState(null);
  const [activeTabMap, setActiveTabMap] = useState({}); // alert_id -> 'facts' | 'context' | 'unknowns'
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleExpand = (alertId) => {
    soundFx.playClick();
    if (expandedId === alertId) {
      setExpandedId(null);
    } else {
      setExpandedId(alertId);
      if (!activeTabMap[alertId]) {
        setActiveTabMap(prev => ({ ...prev, [alertId]: 'facts' }));
      }
    }
  };

  const setCardTab = (alertId, tab) => {
    soundFx.playClick();
    setActiveTabMap(prev => ({ ...prev, [alertId]: tab }));
  };

  const filteredAlerts = alerts.filter(item => {
    const matchesSeverity = filterSeverity === 'ALL' || item.severity === filterSeverity;
    const matchesSearch = 
      item.alert_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.source_ip?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.details?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="cyber-panel p-5 rounded-xl border border-cyan-500/30 flex flex-col h-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded bg-cyan-950/80 border border-cyan-400/30 text-cyan-400 glow-cyan">
            <BrainCircuit className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold tracking-wide text-slate-100 uppercase font-mono-code flex items-center gap-2">
              PANEL B: AI INCIDENT TIMELINE
            </h2>
            <p className="text-xs text-slate-400 font-mono-code">
              REAL-TIME SYNTHESIZED INCIDENT STREAM & MITRE ATT&CK CORRELATION
            </p>
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto font-mono-code text-xs">
          {['ALL', 'CRITICAL', 'HIGH'].map(sev => (
            <button
              key={sev}
              onClick={() => {
                soundFx.playClick();
                setFilterSeverity(sev);
              }}
              className={`px-2.5 py-1 rounded border transition-all ${
                filterSeverity === sev
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter timeline by IP, User, Alert Type, or MITRE Technique..."
          className="w-full pl-9 pr-3 py-2 text-xs font-mono-code bg-slate-950/80 border border-slate-800 rounded text-cyan-300 focus:outline-none focus:border-cyan-500/60"
        />
      </div>

      {/* Alert Feed Stream */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 max-h-[600px]">
        {filteredAlerts.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-slate-800 rounded-lg text-slate-500 font-mono-code text-xs">
            NO INCIDENTS MATCHING CURRENT FILTER PARAMETERS.
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isCritical = alert.severity === 'CRITICAL';
            const isExpanded = expandedId === alert.alert_id;
            const currentTab = activeTabMap[alert.alert_id] || 'facts';
            
            const isTargetIsolated = containedEntities.some(
              e => e.includes(alert.source_ip) || e.includes(alert.user)
            );

            const ai = alert.ai_analysis || {};

            return (
              <div
                key={alert.alert_id}
                className={`rounded-lg border transition-all duration-300 overflow-hidden ${
                  isTargetIsolated
                    ? 'bg-slate-950/90 border-emerald-500/40'
                    : isCritical
                    ? 'cyber-panel-crimson border-red-500/60 glow-crimson'
                    : 'bg-slate-950/80 border-amber-500/40 hover:border-amber-400'
                }`}
              >
                {/* Main Alert Card Banner */}
                <div 
                  onClick={() => toggleExpand(alert.alert_id)}
                  className="p-4 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-900/40 hover:bg-slate-900/80 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded border mt-0.5 ${
                      isTargetIsolated
                        ? 'bg-emerald-950 border-emerald-500/60 text-emerald-400'
                        : isCritical
                        ? 'bg-red-950 border-red-500/60 text-red-400 animate-pulse'
                        : 'bg-amber-950 border-amber-500/60 text-amber-400'
                    }`}>
                      {isTargetIsolated ? <Lock className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-xs font-black font-mono-code px-2 py-0.5 rounded ${
                          isCritical ? 'bg-red-950 text-red-400 border border-red-500/40' : 'bg-amber-950 text-amber-400 border border-amber-500/40'
                        }`}>
                          {alert.severity}
                        </span>

                        <span className="text-sm font-bold text-slate-100 font-mono-code">
                          {ai.threat_title || alert.alert_type}
                        </span>

                        {isTargetIsolated && (
                          <span className="text-[10px] font-bold font-mono-code px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                            <Lock className="w-3 h-3" /> ENTITY ISOLATED
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {ai.analyst_summary || alert.details}
                      </p>

                      <div className="flex items-center gap-4 text-[11px] font-mono-code text-slate-400 mt-2 flex-wrap">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-cyan-400" /> {alert.user}
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe className="w-3 h-3 text-cyan-400" /> {alert.source_ip}
                        </span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-3 h-3" /> {new Date(alert.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Confidence Score & Expand Arrow */}
                  <div className="flex items-center gap-3 self-end md:self-center font-mono-code">
                    {ai.confidence_score && (
                      <div className="text-right hidden sm:block">
                        <div className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-cyan-400" /> CONFIDENCE
                        </div>
                        <div className="text-xs font-bold text-cyan-300">
                          {Math.round(ai.confidence_score * 100)}%
                        </div>
                      </div>
                    )}

                    <button 
                      type="button"
                      className="p-1.5 rounded bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-cyan-400"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded AI Threat Synthesis Modal / Tabs */}
                {isExpanded && (
                  <div className="border-t border-cyan-500/20 bg-slate-950 p-4 space-y-4">
                    
                    {/* Tab Selection */}
                    <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                      <button
                        onClick={() => setCardTab(alert.alert_id, 'facts')}
                        className={`px-3 py-1.5 rounded text-xs font-mono-code flex items-center gap-1.5 transition-all ${
                          currentTab === 'facts'
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-400 font-bold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5 text-cyan-400" />
                        👁️ OBSERVED FACTS
                      </button>

                      <button
                        onClick={() => setCardTab(alert.alert_id, 'context')}
                        className={`px-3 py-1.5 rounded text-xs font-mono-code flex items-center gap-1.5 transition-all ${
                          currentTab === 'context'
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-400 font-bold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
                        🧠 INFERRED CONTEXT (MITRE)
                      </button>

                      <button
                        onClick={() => setCardTab(alert.alert_id, 'unknowns')}
                        className={`px-3 py-1.5 rounded text-xs font-mono-code flex items-center gap-1.5 transition-all ${
                          currentTab === 'unknowns'
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-400 font-bold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                        ❓ UNKNOWNS & PLAYBOOK
                      </button>
                    </div>

                    {/* Tab 1: Observed Facts */}
                    {currentTab === 'facts' && (
                      <div className="space-y-2">
                        <p className="text-[11px] font-mono-code text-cyan-400 uppercase tracking-wide">
                          FORENSIC TELEMETRY RECORD (VERIFIED FACTS):
                        </p>
                        <ul className="space-y-1.5 font-mono-code text-xs">
                          {(ai.observed_facts || [alert.details]).map((fact, idx) => (
                            <li key={idx} className="p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-300 flex items-start gap-2">
                              <span className="text-cyan-400 font-bold">•</span>
                              <span>{fact}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tab 2: Inferred Context / MITRE ATT&CK */}
                    {currentTab === 'context' && (
                      <div className="space-y-2">
                        <p className="text-[11px] font-mono-code text-cyan-400 uppercase tracking-wide">
                          MITRE ATT&CK CORRELATION & THREAT HYPOTHESES:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(ai.inferred_context || ["MITRE ATT&CK T1059"]).map((ctx, idx) => (
                            <div key={idx} className="px-3 py-1.5 rounded bg-slate-900 border border-cyan-500/30 text-cyan-300 font-mono-code text-xs flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                              <span>{ctx}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tab 3: Unknowns & Remediation */}
                    {currentTab === 'unknowns' && (
                      <div className="space-y-2">
                        <p className="text-[11px] font-mono-code text-amber-400 uppercase tracking-wide">
                          TELEMETRY GAPS & SOC REMEDIATION PLAYBOOK:
                        </p>
                        <ul className="space-y-1.5 font-mono-code text-xs">
                          {(ai.unknowns || ["No lateral movement detected yet across subnet."]).map((unk, idx) => (
                            <li key={idx} className="p-2 rounded bg-slate-900/80 border border-slate-800 text-amber-300 flex items-start gap-2">
                              <span className="text-amber-400 font-bold">?</span>
                              <span>{unk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Quick Containment Trigger within Card */}
                    {!isTargetIsolated && (
                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-mono-code text-slate-400">
                          RECOMMENDED SOC RESPONSE:
                        </span>
                        <button
                          onClick={() => {
                            soundFx.playIsolationLock();
                            onIsolateTarget('ip', alert.source_ip);
                          }}
                          className="px-3 py-1.5 rounded bg-red-950 border border-red-500 text-red-300 hover:bg-red-900 transition-all font-mono-code text-xs font-bold flex items-center gap-1.5 hover:glow-crimson"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          ISOLATE TARGET IP ({alert.source_ip})
                        </button>
                      </div>
                    )}

                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
