import React, { useEffect, useRef } from 'react';
import { Radar, Shield, ShieldAlert, Cpu } from 'lucide-react';

export default function TacticalRadar({ alerts = [], containedEntities = [] }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let angle = 0;

    // Helper to generate deterministic coordinates for IP/User nodes
    const getNodeCoords = (id, radiusMax) => {
      let hash = 0;
      for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
      }
      const r = (Math.abs(hash) % 0.7 + 0.2) * radiusMax;
      const theta = (Math.abs(hash >> 3) % 360) * (Math.PI / 180);
      return {
        x: Math.cos(theta) * r,
        y: Math.sin(theta) * r,
      };
    };

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(centerX, centerY) - 20;

      // Clear canvas with deep void background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // Draw concentric radar rings
      ctx.strokeStyle = 'rgba(0, 255, 204, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (maxRadius / 4) * i, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw crosshair axes
      ctx.beginPath();
      ctx.moveTo(centerX - maxRadius, centerY);
      ctx.lineTo(centerX + maxRadius, centerY);
      ctx.moveTo(centerX, centerY - maxRadius);
      ctx.lineTo(centerX, centerY + maxRadius);
      ctx.stroke();

      // Draw Rotating Sweep Line
      angle += 0.02;
      if (angle >= Math.PI * 2) angle = 0;

      const sweepX = centerX + Math.cos(angle) * maxRadius;
      const sweepY = centerY + Math.sin(angle) * maxRadius;

      // Gradient sector fill for radar sweep line
      const gradient = ctx.createConicalGradient
        ? ctx.createConicalGradient(angle, centerX, centerY)
        : null;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, maxRadius, angle - 0.35, angle);
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 255, 204, 0.12)';
      ctx.fill();

      // Draw sweep leading edge
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(sweepX, sweepY);
      ctx.strokeStyle = 'rgba(0, 255, 204, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Static Clean Nodes
      const staticNodes = [
        { label: 'GW-01', r: maxRadius * 0.3, a: 0.8 },
        { label: 'DB-MAIN', r: maxRadius * 0.5, a: 2.2 },
        { label: 'K8S-CLUSTER', r: maxRadius * 0.7, a: 4.1 },
        { label: 'AUTH-SRV', r: maxRadius * 0.4, a: 5.5 },
      ];

      staticNodes.forEach(node => {
        const nx = centerX + Math.cos(node.a) * node.r;
        const ny = centerY + Math.sin(node.a) * node.r;
        ctx.fillStyle = 'rgba(0, 255, 204, 0.6)';
        ctx.beginPath();
        ctx.arc(nx, ny, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(0, 255, 204, 0.4)';
        ctx.font = '9px monospace';
        ctx.fillText(node.label, nx + 6, ny + 3);
      });

      // Render Active Alert Threat Nodes
      alerts.forEach((alt) => {
        const coords = getNodeCoords(alt.alert_id, maxRadius);
        const nx = centerX + coords.x;
        const ny = centerY + coords.y;

        const isContained = containedEntities.some(
          e => e.includes(alt.source_ip) || e.includes(alt.user)
        );

        let color = alt.severity === 'CRITICAL' ? '#ff3366' : '#ffaa00';
        if (isContained) color = '#00ffcc';

        // Blinking node aura
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(nx, ny, isContained ? 5 : 7, 0, Math.PI * 2);
        ctx.fill();

        // Pulsing Reticle ring for Critical active threats
        if (!isContained && alt.severity === 'CRITICAL') {
          ctx.strokeStyle = 'rgba(255, 51, 102, 0.6)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(nx, ny, 12 + Math.sin(angle * 5) * 3, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Node Label
        ctx.fillStyle = color;
        ctx.font = '10px monospace';
        const label = isContained ? `[ISOLATED] ${alt.source_ip}` : `${alt.source_ip} (${alt.user})`;
        ctx.fillText(label, nx + 10, ny + 3);
      });

      // Outer border glow
      ctx.strokeStyle = 'rgba(0, 255, 204, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [alerts, containedEntities]);

  return (
    <div className="cyber-panel p-4 rounded-xl border border-cyan-500/30 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-cyan-500/20">
        <div className="flex items-center gap-2">
          <Radar className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
          <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider font-mono-code">
            TACTICAL RADAR TELEMETRY
          </h3>
        </div>
        <span className="text-[10px] font-mono-code text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
          SECTOR 07-ALPHA
        </span>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          className="rounded-full border border-cyan-500/20 shadow-inner"
        />
        
        {/* Radar Overlay Metadata */}
        <div className="absolute top-2 left-2 text-[9px] font-mono-code text-cyan-400/80 bg-slate-950/80 px-1.5 py-0.5 rounded">
          RANGE: 500m | LAT: 37.7749
        </div>
        <div className="absolute bottom-2 right-2 text-[9px] font-mono-code text-cyan-400/80 bg-slate-950/80 px-1.5 py-0.5 rounded">
          SWEEP: 360° SYNCHRONIZED
        </div>
      </div>
    </div>
  );
}
