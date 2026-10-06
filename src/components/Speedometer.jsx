import React, { useState, useEffect, useRef } from 'react';

/*
 * Semi-circular "bike speedometer" risk gauge.
 * Renders entirely with SVG + spring physics animation.
 * 0-100 scale, needle sweeps 180° arc, vibrates at high risk.
 */
export default function Speedometer({ value = 50 }) {
  const [displayVal, setDisplayVal] = useState(0);
  const animRef = useRef(null);
  const velocityRef = useRef(0);
  const currentRef = useRef(0);

  // Spring physics needle
  useEffect(() => {
    const spring = 0.08;
    const damping = 0.75;
    let target = Math.min(Math.max(value, 0), 100);
    let raf;

    const tick = () => {
      const dx = target - currentRef.current;
      velocityRef.current += dx * spring;
      velocityRef.current *= damping;
      currentRef.current += velocityRef.current;

      if (Math.abs(dx) < 0.3 && Math.abs(velocityRef.current) < 0.1) {
        currentRef.current = target;
        setDisplayVal(Math.round(target));
        return;
      }
      setDisplayVal(Math.round(currentRef.current));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  const cx = 150, cy = 140, r = 110;
  const startAngle = Math.PI;
  const endAngle = 0;
  const needleAngle = startAngle - (displayVal / 100) * Math.PI;
  const needleLen = r - 10;
  const nx = cx + needleLen * Math.cos(needleAngle);
  const ny = cy - needleLen * Math.sin(needleAngle);

  // Arc path
  const arcPath = (radius, startA, endA) => {
    const sx = cx + radius * Math.cos(startA);
    const sy = cy - radius * Math.sin(startA);
    const ex = cx + radius * Math.cos(endA);
    const ey = cy - radius * Math.sin(endA);
    return `M ${sx} ${sy} A ${radius} ${radius} 0 0 1 ${ex} ${ey}`;
  };

  // Filled arc to current value
  const valAngle = startAngle - (displayVal / 100) * Math.PI;
  const filledPath = (radius) => {
    const sx = cx + radius * Math.cos(startAngle);
    const sy = cy - radius * Math.sin(startAngle);
    const ex = cx + radius * Math.cos(valAngle);
    const ey = cy - radius * Math.sin(valAngle);
    const large = displayVal > 50 ? 1 : 0;
    return `M ${sx} ${sy} A ${radius} ${radius} 0 ${large} 1 ${ex} ${ey}`;
  };

  const getColor = () => {
    if (displayVal >= 80) return '#f43f5e';
    if (displayVal >= 60) return '#f59e0b';
    if (displayVal >= 35) return '#3b82f6';
    return '#10b981';
  };

  const getLabel = () => {
    if (displayVal >= 80) return 'CRITICAL';
    if (displayVal >= 60) return 'HIGH';
    if (displayVal >= 35) return 'ELEVATED';
    return 'NOMINAL';
  };

  const color = getColor();
  const isHigh = displayVal >= 70;

  // Tick marks
  const ticks = [];
  for (let i = 0; i <= 10; i++) {
    const pct = i / 10;
    const ang = startAngle - pct * Math.PI;
    const outer = r + 4;
    const inner = r - 8;
    const ox = cx + outer * Math.cos(ang);
    const oy = cy - outer * Math.sin(ang);
    const ix = cx + inner * Math.cos(ang);
    const iy = cy - inner * Math.sin(ang);
    const lx = cx + (r + 18) * Math.cos(ang);
    const ly = cy - (r + 18) * Math.sin(ang);
    ticks.push(
      <g key={i}>
        <line x1={ix} y1={iy} x2={ox} y2={oy} stroke="#2a3f6b" strokeWidth={i % 5 === 0 ? 2 : 1} />
        {i % 2 === 0 && (
          <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill="#475569" fontSize="9" fontFamily="var(--font-mono)">{i * 10}</text>
        )}
      </g>
    );
  }

  return (
    <div className="aegis-panel p-5 flex flex-col items-center">
      <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-[#1b2b4b]">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono-code">THREAT LEVEL</h3>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded border font-mono-code"
          style={{
            color: color,
            borderColor: `${color}50`,
            backgroundColor: `${color}15`,
          }}
        >
          {getLabel()}
        </span>
      </div>

      <div className={`relative ${isHigh ? 'animate-rev-vibrate' : ''}`}>
        <svg width="300" height="170" viewBox="0 0 300 170">
          {/* Glow filter */}
          <defs>
            <filter id="needleGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="arcGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="35%" stopColor="#3b82f6" />
              <stop offset="65%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>

          {/* Background arc */}
          <path d={arcPath(r, startAngle, endAngle)} fill="none" stroke="#1b2b4b" strokeWidth="14" strokeLinecap="round" />

          {/* Gradient arc track */}
          <path d={arcPath(r, startAngle, endAngle)} fill="none" stroke="url(#arcGrad)" strokeWidth="14" strokeLinecap="round" opacity="0.15" />

          {/* Filled arc */}
          <path d={filledPath(r)} fill="none" stroke={color} strokeWidth="14" strokeLinecap="round" filter="url(#arcGlow)" opacity="0.9" />

          {/* Tick marks */}
          {ticks}

          {/* Needle */}
          <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={color} strokeWidth="3" strokeLinecap="round" filter="url(#needleGlow)" />
          <circle cx={cx} cy={cy} r="6" fill={color} opacity="0.9" />
          <circle cx={cx} cy={cy} r="3" fill="#070b14" />

          {/* Center readout */}
          <text x={cx} y={cy - 25} textAnchor="middle" fill={color} fontSize="36" fontWeight="900" fontFamily="var(--font-mono)">
            {displayVal}
          </text>
          <text x={cx} y={cy - 8} textAnchor="middle" fill="#475569" fontSize="10" fontFamily="var(--font-mono)">
            / 100 RISK INDEX
          </text>
        </svg>

        {/* Pulsating danger glow */}
        {isHigh && (
          <div
            className="absolute inset-0 rounded-full pointer-events-none animate-pulse-glow"
            style={{
              background: `radial-gradient(circle at 50% 80%, ${color}15, transparent 70%)`,
            }}
          />
        )}
      </div>

      {/* Category bar */}
      <div className="grid grid-cols-4 gap-1 w-full text-[9px] font-mono-code text-center pt-3 border-t border-[#1b2b4b] mt-2">
        {[
          { range: '0-34', label: 'NOM', color: '#10b981', active: displayVal < 35 },
          { range: '35-59', label: 'ELEV', color: '#3b82f6', active: displayVal >= 35 && displayVal < 60 },
          { range: '60-79', label: 'HIGH', color: '#f59e0b', active: displayVal >= 60 && displayVal < 80 },
          { range: '80-100', label: 'CRIT', color: '#f43f5e', active: displayVal >= 80 },
        ].map((seg, i) => (
          <div
            key={i}
            className="p-1.5 rounded transition-all"
            style={{
              color: seg.active ? seg.color : '#334155',
              background: seg.active ? `${seg.color}15` : 'transparent',
              border: seg.active ? `1px solid ${seg.color}30` : '1px solid transparent',
              fontWeight: seg.active ? 800 : 400,
            }}
          >
            {seg.range} {seg.label}
          </div>
        ))}
      </div>
    </div>
  );
}
