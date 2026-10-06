import React, { useState } from 'react';
import { 
  Crosshair, 
  Key, 
  Globe, 
  Flame, 
  ShieldAlert, 
  Zap, 
  Gauge, 
  Check,
  Radio,
  Cpu
} from 'lucide-react';
import { soundFx } from '../utils/audio';

const VECTORS = [
  {
    id: 'brute_force',
    title: 'Rapid Credential Stuffing',
    code: 'MITRE T1110.001',
    category: 'Credential Access',
    desc: 'High-frequency automated login burst targeting authentication endpoints.',
    icon: Key,
  },
  {
    id: 'ip_spray',
    title: 'Distributed Multi-IP Password Spray',
    code: 'MITRE T1110.004',
    category: 'Initial Access',
    desc: 'Low-frequency authentication attempts across dynamic proxy networks.',
    icon: Globe,
  },
  {
    id: 'data_exfil',
    title: 'Unauthorized Data Egress / Exfiltration',
    code: 'MITRE T1048',
    category: 'Exfiltration',
    desc: 'Stealth DNS C2 tunneling to exfiltrate proprietary data outside perimeter.',
    icon: Flame,
  },
  {
    id: 'priv_esc',
    title: 'Zero-Day Privilege Escalation',
    code: 'MITRE T1548',
    category: 'Privilege Escalation',
    desc: 'Abusing elevation control mechanisms and local token privileges for root UID=0 access.',
    icon: ShieldAlert,
  }
];

const TARGET_USERS = ['admin', 'dev_sarah', 'pawan'];

const STEALTH_LEVELS = [
  { id: 'low_and_slow', label: 'Low & Slow', badge: 'EVASIVE', desc: 'Extended interval burst' },
  { id: 'stealth', label: 'Stealth Mode', badge: 'BALANCED', desc: 'Standard stealth profile' },
  { id: 'aggressive', label: 'Aggressive Burst', badge: 'HIGH IMPACT', desc: 'Maximum throughput rate' }
];

export default function AttackForgeScreen({ onLaunchAttack }) {
  const [selectedVector, setSelectedVector] = useState('brute_force');
  const [targetUser, setTargetUser] = useState('admin');
  const [stealthLevel, setStealthLevel] = useState('aggressive');
  const [customIp, setCustomIp] = useState('198.51.100.23');
  const [isEngaging, setIsEngaging] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleLaunch = async () => {
    soundFx.playAttackEngage();
    setIsEngaging(true);
    setProgress(15);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 150);

    try {
      await onLaunchAttack({
        scenario: selectedVector,
        intensity: stealthLevel,
        target_user: targetUser,
        custom_ip: customIp || '198.51.100.23'
      });
      setProgress(100);
    } catch (err) {
      console.error('Launch failed', err);
    } finally {
      setTimeout(() => {
        setIsEngaging(false);
        setProgress(0);
      }, 700);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="titanium-card p-5 border-l-4 border-l-blue-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-blue-400" />
            <h2 className="text-base font-extrabold text-zinc-100 uppercase tracking-wider font-sans">
              ⚔️ THREAT COMBAT ARENA
            </h2>
          </div>
          <p className="text-xs text-zinc-400 font-mono-code mt-1">
            GAME-LIKE ADVERSARY STRIKE SIMULATOR & VECTOR INJECTION
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono-code text-xs px-3 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-blue-400">
          <Cpu className="w-4 h-4 text-blue-400 animate-pulse" />
          <span>STRIKE ENGINE: ARMED</span>
        </div>
      </div>

      {/* 1. Vector Cards Grid */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-blue-400 uppercase tracking-wider font-mono-code flex items-center gap-1.5">
          <Crosshair className="w-4 h-4 text-blue-400" />
          1. SELECT STRIKE VECTOR
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VECTORS.map((vec) => {
            const Icon = vec.icon;
            const isSelected = selectedVector === vec.id;

            return (
              <div
                key={vec.id}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedVector(vec.id);
                }}
                className={`titanium-card p-4 cursor-pointer transition-all duration-200 relative overflow-hidden ${
                  isSelected
                    ? 'border-blue-500 bg-zinc-900 electric-glow'
                    : 'hover:border-zinc-700 bg-zinc-900/60'
                }`}
              >
                <div className="flex items-start gap-3 relative z-10">
                  <div className={`p-2.5 rounded border ${
                    isSelected ? 'bg-blue-950 border-blue-500 text-blue-300' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-zinc-100 font-sans">{vec.title}</h3>
                      <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-zinc-950 text-blue-400 border border-zinc-800">
                        {vec.code}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">{vec.desc}</p>
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute top-2 right-2 text-blue-400">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Strike Parameter Configuration */}
      <div className="titanium-card p-5 space-y-5">
        <label className="block text-xs font-bold text-blue-400 uppercase tracking-wider font-mono-code flex items-center gap-1.5">
          <Gauge className="w-4 h-4 text-blue-400" />
          2. CONFIGURE STRIKE PARAMETERS
        </label>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Target User */}
          <div>
            <label className="block text-xs font-mono-code text-zinc-400 mb-2">TARGET ACCOUNT:</label>
            <div className="grid grid-cols-3 gap-2">
              {TARGET_USERS.map((usr) => (
                <button
                  key={usr}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setTargetUser(usr);
                  }}
                  className={`p-2 rounded border text-xs font-mono-code transition-all ${
                    targetUser === usr
                      ? 'bg-blue-600 text-white font-bold border-blue-500'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  {usr}
                </button>
              ))}
            </div>
          </div>

          {/* Stealth Level */}
          <div>
            <label className="block text-xs font-mono-code text-zinc-400 mb-2">STEALTH PROFILE:</label>
            <div className="grid grid-cols-3 gap-2">
              {STEALTH_LEVELS.map((stl) => (
                <button
                  key={stl.id}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setStealthLevel(stl.id);
                  }}
                  className={`p-2 rounded border text-[11px] font-mono-code transition-all text-left ${
                    stealthLevel === stl.id
                      ? 'bg-blue-600 text-white font-bold border-blue-500'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="font-bold">{stl.label}</div>
                  <div className="text-[9px] opacity-80">{stl.badge}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom IP */}
          <div>
            <label className="block text-xs font-mono-code text-zinc-400 mb-2">CUSTOM ATTACKER IP:</label>
            <input
              type="text"
              value={customIp}
              onChange={(e) => setCustomIp(e.target.value)}
              placeholder="198.51.100.23"
              className="w-full px-3 py-2 text-xs font-mono-code bg-zinc-950 border border-zinc-800 rounded text-blue-300 focus:outline-none focus:border-blue-500"
            />
          </div>

        </div>
      </div>

      {/* Progress Bar during strike engagement */}
      {isEngaging && (
        <div className="space-y-1.5 font-mono-code">
          <div className="flex justify-between text-xs text-blue-400">
            <span>DISPATCHING PAYLOAD PACKETS...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-zinc-900 h-2 rounded overflow-hidden border border-zinc-800">
            <div 
              className="bg-blue-500 h-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* 3. Launch Button */}
      <button
        onClick={handleLaunch}
        disabled={isEngaging}
        className={`w-full py-4 px-6 rounded-lg font-black tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-3 font-mono-code text-sm sm:text-base border shadow-xl ${
          isEngaging
            ? 'bg-amber-950 border-amber-500 text-amber-300 cursor-not-allowed'
            : 'bg-rose-600 border-rose-500 text-white hover:bg-rose-500 active:scale-[0.99] cursor-pointer'
        }`}
      >
        {isEngaging ? (
          <>
            <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
            <span>[ EXECUTING ADVERSARY PAYLOAD... ]</span>
          </>
        ) : (
          <>
            <Zap className="w-5 h-5 text-white animate-pulse" />
            <span>[ 🚀 Dispatch Threat Vector ]</span>
            <Zap className="w-5 h-5 text-white animate-pulse" />
          </>
        )}
      </button>

    </div>
  );
}
