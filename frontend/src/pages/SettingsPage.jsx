import React, { useState } from 'react';
import { Database, Radio, Save } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function SettingsPage() {
  const [apiUrl, setApiUrl] = useState('http://127.0.0.1:8000');
  const [pollInterval, setPollInterval] = useState('2.5');
  const [autoIsolate, setAutoIsolate] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    soundFx.playClick();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between font-mono-code text-xs">
        <div>
          <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider">
            AEGIS-X ENGINE SETTINGS & BACKEND INTEGRATION
          </h2>
          <p className="text-slate-400 text-[11px] mt-0.5">
            Configure FastAPI backend URL, streaming poll intervals, and automated containment rules.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="rounded-lg bg-slate-900/90 border border-slate-800 p-6 space-y-6 max-w-2xl font-mono-code text-xs">
        
        {/* Backend API URL */}
        <div className="space-y-2">
          <label className="block text-slate-300 font-bold flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" /> FASTAPI BACKEND API URL
          </label>
          <input
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-cyan-400"
          />
          <p className="text-[11px] text-slate-500 font-sans">
            Centralized API endpoint for GET /alerts, POST /events, and POST /api/containment/execute.
          </p>
        </div>

        {/* Polling Interval */}
        <div className="space-y-2">
          <label className="block text-slate-300 font-bold flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400" /> TELEMETRY POLL INTERVAL (SECONDS)
          </label>
          <select
            value={pollInterval}
            onChange={(e) => setPollInterval(e.target.value)}
            className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-cyan-400 font-bold focus:outline-none"
          >
            <option value="1.0">1.0s (Ultra High Frequency)</option>
            <option value="2.5">2.5s (Default Recommended)</option>
            <option value="5.0">5.0s (Standard Interval)</option>
          </select>
        </div>

        {/* Auto Containment Toggle */}
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={autoIsolate}
              onChange={(e) => setAutoIsolate(e.target.checked)}
              className="w-4 h-4 accent-cyan-400 rounded"
            />
            <span className="text-slate-200 font-bold">AUTOMATIC HITL CONTAINMENT FOR CRITICAL THREATS</span>
          </label>
          <p className="text-[11px] text-slate-500 font-sans pl-7">
            When enabled, the Decision Engine automatically enforces kernel packet filter isolation on CRITICAL score &gt;90 incidents.
          </p>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          {saved ? (
            <span className="text-emerald-400 font-bold text-xs">✓ SETTINGS SAVED LOCALLY</span>
          ) : (
            <span></span>
          )}

          <button
            type="submit"
            className="px-4 py-2 rounded bg-cyan-950 border border-cyan-400 text-cyan-300 font-bold hover:bg-cyan-900 flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" /> Save Configuration
          </button>
        </div>

      </form>
    </div>
  );
}
