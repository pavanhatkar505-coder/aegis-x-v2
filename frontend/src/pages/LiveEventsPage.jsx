import React from 'react';
import LiveEventStream from '../components/LiveEventStream';

export default function LiveEventsPage({
  events = [],
  isPaused = false,
  onPause,
  onResume,
  onClear
}) {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between font-mono-code text-xs">
        <div>
          <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider font-sans">
            LIVE EVENTS TELEMETRY STREAM
          </h2>
          <p className="text-slate-400 text-[11px] mt-0.5 font-sans">
            Real-time event ingest buffer from authentication nodes, API gateways, and Kubernetes audit logs.
          </p>
        </div>
      </div>

      <LiveEventStream
        events={events}
        isPaused={isPaused}
        onPause={onPause}
        onResume={onResume}
        onClear={onClear}
      />
    </div>
  );
}
