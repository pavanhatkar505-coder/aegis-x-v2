import React, { useState } from 'react';
import { 
  Crosshair, 
  Key, 
  Globe, 
  Flame, 
  ShieldAlert, 
  Zap, 
  Radio, 
  Check, 
  Activity,
  Terminal,
  Play
} from 'lucide-react';
import { client } from '../api/client';
import { soundFx } from '../utils/audio';

const ATTACK_VECTORS = [
  {
    id: 'brute_force',
    title: 'Brute-Force Credential Stuffing',
    code: 'MITRE T1110.001',
    category: 'Credential Access',
    desc: 'Automated rapid login stream abusing stolen account credentials against authentication endpoints.',
    icon: Key,
    severity: 'HIGH'
  },
  {
    id: 'ip_spray',
    title: 'Distributed IP Password Spray',
    code: 'MITRE T1110.004',
    category: 'Initial Access',
    desc: 'Rotated IP proxy authentication attempts against enterprise user accounts to bypass single-IP lockout limits.',
    icon: Globe,
    severity: 'CRITICAL'
  },
  {
    id: 'data_exfil',
    title: 'Insider Data Exfiltration',
    code: 'MITRE T1048.003',
    category: 'Exfiltration',
    desc: 'Covert DNS TXT record egress tunneling transferring database records outside perimeter boundaries.',
    icon: Flame,
    severity: 'HIGH'
  },
  {
    id: 'regresshion_priv_esc',
    title: 'RegreSSHion Privilege Escalation',
    code: 'CVE-2024-6387 / MITRE T1068',
    category: 'Privilege Escalation',
    desc: 'Exploiting OpenSSH signal handler race condition in sshd for unauthenticated root UID=0 access.',
    icon: ShieldAlert,
    severity: 'CRITICAL'
  }
];

const TARGET_USERS = ['admin', 'dev_sarah', 'pawan', 'service_deploy'];

const INTENSITY_MODES = [
  { id: 'low_and_slow', label: 'Low-and-Slow', badge: 'EVASIVE', desc: 'Extended interval delay between payloads to avoid baseline threshold alerts.' },
  { id: 'stealth', label: 'Stealth Mode', badge: 'BALANCED', desc: 'Standard stealth profile mimicking normal user noise patterns.' },
  { id: 'aggressive', label: 'Aggressive Burst', badge: 'HIGH IMPACT', desc: 'Maximum throughput payload burst to stress decision engine policy thresholds.' }
];

export default function AttackForgePage({ onTriggerToast }) {
  const [selectedVector, setSelectedVector] = useState('brute_force');
  const [targetUser, setTargetUser] = useState('admin');
  const [intensity, setIntensity] = useState('aggressive');
  const [customIp, setCustomIp] = useState('198.51.100.23');
  const [isLaunching, setIsLaunching] = useState(false);
  const [executionLog, setExecutionLog] = useState([]);

  const activeVector = ATTACK_VECTORS.find(v => v.id === selectedVector) || ATTACK_VECTORS[0];

  const handleLaunchAttack = async () => {
    soundFx?.playAttackEngage?.();
    setIsLaunching(true);

    const timeStr = new Date().toLocaleTimeString();
    setExecutionLog(prev => [
      `[${timeStr}] 🚀 INITIALIZING ATTACK VECTOR: ${activeVector.title.toUpperCase()}`,
      `[${timeStr}] CONFIG: INTENSITY=${intensity.toUpperCase()} | TARGET_USER=${targetUser} | IP=${customIp || '198.51.100.23'}`,
      ...prev
    ]);

    try {
      const res = await client.launchAttack(selectedVector, intensity, targetUser, customIp);
      
      const successTime = new Date().toLocaleTimeString();
      setExecutionLog(prev => [
        `[${successTime}] ✅ [STATUS 200] INJECTION SUCCESSFUL -> ${res.message || 'Payload accepted by backend engine'}`,
        ...prev
      ]);

      if (onTriggerToast) {
        onTriggerToast({
          message: `Attack Vector Engaged: ${activeVector.title} (${intensity.toUpperCase()})`,
          severity: activeVector.severity
        });
      }
    } catch (err) {
      const errorTime = new Date().toLocaleTimeString();
      setExecutionLog(prev => [
        `[${errorTime}] ⚠️ BACKEND OFFLINE -> Switched to simulated attack stream injection.`,
        ...prev
      ]);
    } finally {
      setTimeout(() => {
        setIsLaunching(false);
      }, 600);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-5 backdrop-blur shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <Crosshair className="w-6 h-6 text-rose-400" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white uppercase tracking-wider font-sans">
                AEGIS-X
              </h1>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                ADVERSARY SANDBOX & ATTACK FORGE SIMULATION DECK
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400">
          <Zap className="w-4 h-4 text-rose-400" />
          <span>SIMULATION ENGINE: ARMED</span>
        </div>
      </div>

      {/* Main Grid: Attack Vector Cards & Launcher Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Attack Vector Selection Cards (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400" />
            SELECT ATTACK SCENARIO VECTOR
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ATTACK_VECTORS.map((vector) => {
              const Icon = vector.icon;
              const isSelected = selectedVector === vector.id;

              return (
                <div
                  key={vector.id}
                  onClick={() => {
                    soundFx?.playClick?.();
                    setSelectedVector(vector.id);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400/50'
                      : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-850'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-zinc-800 text-zinc-400'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                        vector.severity === 'CRITICAL' 
                          ? 'bg-rose-950 text-rose-300 border border-rose-800/60' 
                          : 'bg-amber-950 text-amber-300 border border-amber-800/60'
                      }`}>
                        {vector.severity}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-1">
                      {vector.title}
                    </h3>
                    <p className="text-[11px] font-mono text-cyan-400/80 mb-2">
                      {vector.code}
                    </p>
                    <p className="text-xs text-zinc-400 line-clamp-2">
                      {vector.desc}
                    </p>
                  </div>

                  {isSelected && (
                    <div className="mt-3 pt-2 border-t border-cyan-500/30 flex items-center justify-between text-xs font-mono text-cyan-300">
                      <span>SELECTED VECTOR</span>
                      <Check className="w-4 h-4 text-cyan-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Execution Controls & Target Options (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-5 space-y-5 backdrop-blur shadow-xl">
            
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Crosshair className="w-4 h-4 text-rose-400" />
              ATTACK EXECUTION CONTROLS
            </h2>

            {/* Selected Scenario Preview */}
            <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 font-mono text-xs space-y-1">
              <span className="text-zinc-500 block">ACTIVE TARGET SCENARIO:</span>
              <span className="text-cyan-400 font-bold block">{activeVector.title}</span>
              <span className="text-zinc-400 block text-[11px]">{activeVector.code}</span>
            </div>

            {/* Intensity Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-300 font-mono">
                INTENSITY PROFILE
              </label>
              <div className="grid grid-cols-3 gap-2">
                {INTENSITY_MODES.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setIntensity(mode.id)}
                    className={`p-2.5 rounded-lg border text-left transition-all text-xs font-mono ${
                      intensity === mode.id
                        ? 'bg-rose-950/40 border-rose-500 text-rose-200 ring-1 ring-rose-500/50'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="font-bold">{mode.label}</div>
                    <div className="text-[10px] text-zinc-500">{mode.badge}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Target User Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-300 font-mono">
                TARGET ACCOUNT IDENTITY
              </label>
              <select
                value={targetUser}
                onChange={(e) => setTargetUser(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs font-mono text-white focus:border-cyan-500 focus:outline-none"
              >
                {TARGET_USERS.map((usr) => (
                  <option key={usr} value={usr}>
                    User Account: {usr}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom IP Address */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-300 font-mono">
                SOURCE IP INJECTION VECTOR
              </label>
              <input
                type="text"
                value={customIp}
                onChange={(e) => setCustomIp(e.target.value)}
                placeholder="198.51.100.23"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs font-mono text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Prominent Launch Button */}
            <button
              type="button"
              disabled={isLaunching}
              onClick={handleLaunchAttack}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black font-mono text-sm tracking-widest uppercase shadow-xl hover:shadow-rose-950/80 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLaunching ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>ENGAGING PAYLOAD...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-white" />
                  <span>🚀 ENGAGE ATTACK VECTOR</span>
                </>
              )}
            </button>

          </div>
        </div>

      </div>

      {/* Execution Telemetry Terminal */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-xs space-y-2">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <span className="text-zinc-400 font-bold flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            ATTACK FORGE SIMULATION CONSOLE LOG
          </span>
          <span className="text-[11px] text-zinc-500">
            POST -&gt; /api/range/launch
          </span>
        </div>

        <div className="h-32 overflow-y-auto space-y-1 font-mono text-[11px] text-zinc-300 pr-2">
          {executionLog.length === 0 ? (
            <span className="text-zinc-600 italic">
              Console idle. Select an attack scenario and click "ENGAGE ATTACK VECTOR" to dispatch simulation payload.
            </span>
          ) : (
            executionLog.map((log, idx) => (
              <div key={idx} className={log.includes('✅') ? 'text-emerald-400' : log.includes('🚀') ? 'text-cyan-300' : 'text-zinc-400'}>
                {log}
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
