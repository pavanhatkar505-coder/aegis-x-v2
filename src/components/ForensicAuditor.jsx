import React, { useState } from 'react';
import { 
  Microscope, 
  Eye, 
  BrainCircuit, 
  HelpCircle, 
  ShieldCheck, 
  AlertOctagon, 
  FileText, 
  CheckCircle2, 
  Sparkles,
  Lock
} from 'lucide-react';
import { soundFx } from '../utils/audio';

const LOOPHOLE_MATRIX_DATA = [
  {
    vector: 'Rapid Credential Stuffing Burst',
    code: 'MITRE T1110.001',
    target: 'auth.service.login',
    status: 'BLOCKED',
    summary: 'Rate limiter dropped 4,200 requests within 10s.'
  },
  {
    vector: 'Zero-Day Kernel Priv Escalation',
    code: 'MITRE T1548',
    target: '/etc/sudoers.d/aegis_override',
    status: 'BYPASS CONFIRMED',
    summary: 'Sudo token reuse vulnerability allowed UID=0 elevation.'
  },
  {
    vector: 'Covert DNS Data Exfiltration',
    code: 'MITRE T1048',
    target: 'dns.egress.tunnel',
    status: 'BLOCKED',
    summary: 'DPI identified hex-encoded payload in TXT records.'
  },
  {
    vector: 'Distributed Password Spray',
    code: 'MITRE T1110.004',
    target: 'admin / dev_sarah',
    status: 'BYPASS CONFIRMED',
    summary: 'Multi-IP threshold bypassed default per-IP lockouts.'
  }
];

export default function ForensicAuditor({ alerts = [], selectedAlertForDossier = null, containedEntities = [] }) {
  const [activeDossierAlertId, setActiveDossierAlertId] = useState(
    selectedAlertForDossier?.alert_id || alerts[0]?.alert_id || null
  );
  const [activeTab, setActiveTab] = useState('evidence');

  const activeAlert = alerts.find(a => a.alert_id === activeDossierAlertId) || alerts[0];
  const ai = activeAlert?.ai_analysis || {};

  const isIsolated = containedEntities.some(
    e => activeAlert && (e.includes(activeAlert.source_ip) || e.includes(activeAlert.user))
  );

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="titanium-card p-5 border-l-4 border-l-amber-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Microscope className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-extrabold text-zinc-100 uppercase tracking-wider font-sans">
              🔬 FORENSICS & LOOPHOLE MATRIX
            </h2>
          </div>
          <p className="text-xs text-zinc-400 font-mono-code mt-1">
            SIDE-BY-SIDE DEFENSIVE AUDIT MATRIX & DOSSIER TRIAGE
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono-code text-xs px-3 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-amber-400">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>MATRIX AUDITOR: ACTIVE</span>
        </div>
      </div>

      {/* 1. Incident Dossier Selector & Forensic Triage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left List */}
        <div className="lg:col-span-1 space-y-3">
          <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider font-mono-code flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-amber-400" />
            INCIDENT DOSSIER SELECTOR
          </label>

          <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
            {alerts.length === 0 ? (
              <div className="titanium-card p-6 text-center text-zinc-500 font-mono-code text-xs">
                NO ACTIVE INCIDENTS AVAILABLE FOR FORENSIC ANALYSIS.
              </div>
            ) : (
              alerts.map((alt) => {
                const isSelected = activeDossierAlertId === alt.alert_id;
                return (
                  <div
                    key={alt.alert_id}
                    onClick={() => {
                      soundFx.playClick();
                      setActiveDossierAlertId(alt.alert_id);
                    }}
                    className={`titanium-card p-3.5 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-amber-400 bg-zinc-900 ring-1 ring-amber-400/40'
                        : 'hover:border-zinc-700 bg-zinc-900/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1 font-mono-code text-xs">
                      <span className="font-bold text-zinc-100">{alt.alert_id}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                        alt.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-400 border border-rose-500/40' : 'bg-amber-950 text-amber-400 border border-amber-500/40'
                      }`}>
                        {alt.severity}
                      </span>
                    </div>

                    <div className="text-xs text-zinc-300 font-sans truncate">
                      {alt.ai_analysis?.threat_title || alt.alert_type}
                    </div>

                    <div className="text-[10px] font-mono-code text-zinc-500 mt-1">
                      Target: {alt.user} @ {alt.source_ip}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Forensic Triage Tabs */}
        <div className="lg:col-span-2 space-y-4">
          
          {activeAlert ? (
            <div className="titanium-card p-5 space-y-4">
              
              {/* Dossier Title Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800 font-mono-code">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400">DOSSIER #{activeAlert.alert_id}</span>
                    {isIsolated && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> HOST ISOLATED
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-extrabold text-zinc-100 font-sans mt-0.5">
                    {ai.threat_title || activeAlert.alert_type}
                  </h3>
                </div>

                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <span>User: <strong className="text-zinc-200">{activeAlert.user}</strong></span>
                  <span>IP: <strong className="text-zinc-200">{activeAlert.source_ip}</strong></span>
                </div>
              </div>

              {/* Triage Tabs */}
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setActiveTab('evidence');
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-mono-code flex items-center gap-1.5 transition-all ${
                    activeTab === 'evidence'
                      ? 'bg-zinc-800 text-amber-400 border border-amber-500/40 font-bold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  👁️ OBSERVED EVIDENCE
                </button>

                <button
                  onClick={() => {
                    soundFx.playClick();
                    setActiveTab('context');
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-mono-code flex items-center gap-1.5 transition-all ${
                    activeTab === 'context'
                      ? 'bg-zinc-800 text-amber-400 border border-amber-500/40 font-bold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <BrainCircuit className="w-3.5 h-3.5 text-amber-400" />
                  🧠 INFERRED CONTEXT
                </button>

                <button
                  onClick={() => {
                    soundFx.playClick();
                    setActiveTab('unknowns');
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-mono-code flex items-center gap-1.5 transition-all ${
                    activeTab === 'unknowns'
                      ? 'bg-zinc-800 text-amber-400 border border-amber-500/40 font-bold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  ❓ UNKNOWNS & GAPS
                </button>
              </div>

              {/* Tab 1: Observed Evidence */}
              {activeTab === 'evidence' && (
                <div className="space-y-2">
                  <p className="text-[11px] font-mono-code text-amber-400 uppercase tracking-wide">
                    FORENSIC EVIDENCE LOG LINES:
                  </p>
                  <div className="space-y-2 font-mono-code text-xs">
                    {(ai.observed_facts || [activeAlert.details]).map((fact, idx) => (
                      <div key={idx} className="p-3 rounded bg-zinc-950 border border-zinc-800 text-zinc-200 flex items-start gap-2.5">
                        <span className="text-amber-400 font-bold">LOG-{idx + 1}:</span>
                        <span className="leading-relaxed">{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Inferred Context */}
              {activeTab === 'context' && (
                <div className="space-y-2">
                  <p className="text-[11px] font-mono-code text-amber-400 uppercase tracking-wide">
                    MITRE ATT&CK TACTICS & REASONING:
                  </p>
                  <div className="space-y-2 font-mono-code text-xs">
                    {(ai.inferred_context || ["MITRE T1548 - Abuse Elevation Control Mechanism"]).map((ctx, idx) => (
                      <div key={idx} className="p-3 rounded bg-zinc-950 border border-zinc-800 text-blue-300 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                        <span>{ctx}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Unknowns & Gaps */}
              {activeTab === 'unknowns' && (
                <div className="space-y-2">
                  <p className="text-[11px] font-mono-code text-rose-400 uppercase tracking-wide">
                    TELEMETRY BLIND SPOTS & UNCERTAINTIES:
                  </p>
                  <div className="space-y-2 font-mono-code text-xs">
                    {(ai.unknowns || ["No lateral movement observed yet across subnet."]).map((unk, idx) => (
                      <div key={idx} className="p-3 rounded bg-zinc-950 border border-zinc-800 text-rose-300 flex items-start gap-2">
                        <span className="text-rose-400 font-bold">?</span>
                        <span>{unk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="titanium-card p-8 text-center text-zinc-500 font-mono-code text-xs">
              SELECT AN INCIDENT TO VIEW FORENSIC DOSSIER.
            </div>
          )}

        </div>
      </div>

      {/* 2. Side-by-Side Loophole Matrix Table */}
      <div className="titanium-card p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider font-mono-code">
              LOOPHOLE AUDITOR MATRIX
            </h3>
          </div>
          <span className="text-xs font-mono-code text-zinc-400">
            SIDE-BY-SIDE MITRE DEFENSE TESTS
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono-code text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 text-[11px]">
                <th className="pb-3 pt-1 px-3">ATTACK VECTOR TESTED</th>
                <th className="pb-3 pt-1 px-3">MITRE TECHNIQUE</th>
                <th className="pb-3 pt-1 px-3">TARGET PATH / ACCOUNT</th>
                <th className="pb-3 pt-1 px-3">DEFENSE STATUS</th>
                <th className="pb-3 pt-1 px-3">AUDIT FINDING SUMMARY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {LOOPHOLE_MATRIX_DATA.map((row, idx) => {
                const isBlocked = row.status === 'BLOCKED';

                return (
                  <tr key={idx} className="hover:bg-zinc-900/60 transition-colors">
                    <td className="py-3 px-3 font-bold text-zinc-200 font-sans">{row.vector}</td>
                    <td className="py-3 px-3 text-blue-400">{row.code}</td>
                    <td className="py-3 px-3 text-zinc-300">{row.target}</td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold ${
                        isBlocked
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                          : 'bg-rose-950 text-rose-400 border border-rose-500/40 animate-pulse'
                      }`}>
                        {isBlocked ? <CheckCircle2 className="w-3 h-3" /> : <AlertOctagon className="w-3 h-3" />}
                        {isBlocked ? '🛡️ BLOCKED' : '🚨 BYPASS CONFIRMED'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-zinc-400 text-[11px] font-sans">{row.summary}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
