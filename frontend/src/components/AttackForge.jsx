import React, { useState } from 'react';
import { 
  Flame, 
  Target, 
  Gauge, 
  ShieldAlert, 
  Key, 
  Globe, 
  Terminal, 
  Zap, 
  Sliders,
  Crosshair,
  Lock,
  Cpu
} from 'lucide-react';
import { soundFx } from '../utils/audio';

const SCENARIOS = [
  {
    id: 'brute_force',
    title: 'Brute Force Authentication',
    code: 'T1110.001',
    category: 'Credential Access',
    desc: 'Rapid dictionary burst targeting auth endpoints to capture high-privilege user tokens.',
    icon: Key,
    color: 'amber'
  },
  {
    id: 'ip_spray',
    title: 'Distributed Password Spray',
    code: 'T1110.003',
    category: 'Initial Access',
    desc: 'Multi-node proxy network spraying common credentials across enterprise accounts.',
    icon: Globe,
    color: 'cyan'
  },
  {
    id: 'data_exfil',
    title: 'Covert Data Exfiltration',
    code: 'T1048',
    category: 'Exfiltration',
    desc: 'Tunneling sensitive telemetry out through obfuscated DNS C2 channels.',
    icon: Flame,
    color: 'crimson'
  },
  {
    id: 'priv_esc',
    title: 'Zero-Day Kernel Privilege Escalation',
    code: 'T1548',
    category: 'Privilege Escalation',
    desc: 'Exploiting sudo token reuse & local elevation control mechanisms for root access.',
    icon: ShieldAlert,
    color: 'red'
  }
];

const INTENSITIES = [
  { id: 'low_and_slow', label: 'Low & Slow', badge: 'EVASIVE', desc: 'Minimal telemetry footprint' },
  { id: 'stealth', label: 'Stealth Mode', badge: 'BALANCED', desc: 'Standard stealth profile' },
  { id: 'aggressive', label: 'Aggressive Burst', badge: 'HIGH IMPACT', desc: 'Maximum throughput rate' }
];

export default function AttackForge({ onLaunchAttack }) {
  const [selectedScenario, setSelectedScenario] = useState('brute_force');
  const [intensity, setIntensity] = useState('aggressive');
  const [targetUser, setTargetUser] = useState('admin');
  const [customIp, setCustomIp] = useState('198.51.100.23');
  const [isEngaging, setIsEngaging] = useState(false);

  const handleEngage = async () => {
    soundFx.playAttackEngage();
    setIsEngaging(true);
    
    try {
      await onLaunchAttack({
        scenario: selectedScenario,
        intensity: intensity,
        target_user: targetUser || 'admin',
        custom_ip: customIp || '198.51.100.23'
      });
    } catch (err) {
      console.error('Failed to engage attack vector', err);
    } finally {
      setTimeout(() => setIsEngaging(false), 600);
    }
  };

  return (
    <div className="cyber-panel p-5 rounded-xl relative overflow-hidden border border-cyan-500/30">
      
      {/* Corner Tech Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400"></div>

      {/* Panel Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded bg-cyan-950/80 border border-cyan-400/30 text-cyan-400 glow-cyan">
            <Crosshair className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold tracking-wide text-slate-100 uppercase font-mono-code flex items-center gap-2">
              PANEL A: WAR ROOM / ATTACK FORGE
            </h2>
            <p className="text-xs text-slate-400 font-mono-code">
              TACTICAL ADVERSARY SIMULATION & EXPLOIT INJECTION ENGINE
            </p>
          </div>
        </div>

        <span className="hidden sm:flex items-center gap-1.5 text-xs font-mono-code px-3 py-1 rounded bg-slate-900 border border-cyan-500/20 text-cyan-300">
          <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          SIMULATION ENGINE: READY
        </span>
      </div>

      {/* 1. Attack Technique Selection */}
      <div className="mb-5">
        <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2.5 font-mono-code flex items-center gap-1.5">
          <Target className="w-4 h-4 text-cyan-400" />
          SELECT ATTACK VECTOR / MITRE ATT&CK SCENARIO
        </label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SCENARIOS.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedScenario === item.id;

            return (
              <div
                key={item.id}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedScenario(item.id);
                }}
                className={`p-3.5 rounded-lg border cursor-pointer transition-all duration-200 relative group overflow-hidden ${
                  isSelected
                    ? 'bg-slate-900/90 border-cyan-400 glow-cyan text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-cyan-500/40 hover:bg-slate-900/50'
                }`}
              >
                <div className="flex items-start gap-3 relative z-10">
                  <div className={`p-2 rounded border ${
                    isSelected ? 'bg-cyan-950 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-slate-100 font-mono-code">{item.title}</span>
                      <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                        {item.code}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Attack Parameters & Stealth / Intensity Slider */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5 p-4 rounded-lg bg-slate-950/70 border border-cyan-500/15">
        
        {/* Stealth / Intensity Select */}
        <div>
          <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 font-mono-code flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-cyan-400" />
            ATTACK STEALTH / INTENSITY LEVEL
          </label>

          <div className="grid grid-cols-3 gap-2">
            {INTENSITIES.map((lvl) => {
              const isSelected = intensity === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setIntensity(lvl.id);
                  }}
                  className={`p-2.5 rounded border text-left transition-all text-xs font-mono-code ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 font-bold shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span>{lvl.label}</span>
                  </div>
                  <span className={`text-[9px] px-1 py-0.2 rounded font-bold ${
                    isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {lvl.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Target Entity Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1.5 font-mono-code flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              TARGET USER
            </label>
            <input
              type="text"
              value={targetUser}
              onChange={(e) => setTargetUser(e.target.value)}
              placeholder="e.g. admin"
              className="w-full px-3 py-2 text-xs font-mono-code bg-slate-900 border border-slate-700 rounded text-cyan-300 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1.5 font-mono-code flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              CUSTOM SOURCE IP
            </label>
            <input
              type="text"
              value={customIp}
              onChange={(e) => setCustomIp(e.target.value)}
              placeholder="e.g. 198.51.100.23"
              className="w-full px-3 py-2 text-xs font-mono-code bg-slate-900 border border-slate-700 rounded text-cyan-300 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

      </div>

      {/* 3. Big Action Button: [ 🚀 ENGAGE ATTACK VECTOR ] */}
      <button
        onClick={handleEngage}
        disabled={isEngaging}
        className={`w-full py-3.5 px-6 rounded-lg font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 font-mono-code text-sm sm:text-base border ${
          isEngaging
            ? 'bg-amber-950/80 border-amber-500 text-amber-300 cursor-not-allowed glow-amber'
            : 'bg-red-950/80 border-red-500 text-red-300 hover:bg-red-900 hover:border-red-400 hover:text-white hover:glow-crimson cursor-pointer active:scale-[0.99]'
        }`}
      >
        {isEngaging ? (
          <>
            <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
            <span>[ DISPATCHING ADVERSARY PAYLOAD... ]</span>
          </>
        ) : (
          <>
            <Zap className="w-5 h-5 text-red-400 animate-pulse" />
            <span>[ 🚀 ENGAGE ATTACK VECTOR ]</span>
            <Zap className="w-5 h-5 text-red-400 animate-pulse" />
          </>
        )}
      </button>

    </div>
  );
}
