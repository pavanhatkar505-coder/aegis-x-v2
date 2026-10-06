import React, { useState } from 'react';
import { 
  Radio, 
  Pause, 
  Play, 
  Trash2, 
  Filter, 
  Search 
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function LiveEventStream({
  events = [],
  isPaused = false,
  onPause,
  onResume,
  onClear
}) {
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = events.filter(evt => {
    const matchesSev = severityFilter === 'ALL' || evt.severity === severityFilter;
    const matchesSearch = 
      (evt.server && evt.server.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (evt.user && evt.user.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (evt.event_type && evt.event_type.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (evt.source_ip && evt.source_ip.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSev && matchesSearch;
  });

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-950 text-rose-400 border border-rose-500/50 font-mono-code animate-pulse">
            CRITICAL
          </span>
        );
      case 'HIGH':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-950 text-amber-400 border border-amber-500/50 font-mono-code">
            HIGH
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-500/40 font-mono-code">
            MEDIUM
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 font-mono-code">
            LOW
          </span>
        );
    }
  };

  return (
    <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-4 space-y-4 flex flex-col h-full font-sans shadow-md">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Radio className={`w-5 h-5 ${isPaused ? 'text-slate-500' : 'text-emerald-400 animate-pulse'}`} />
          <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider font-mono-code">
            LIVE EVENT STREAM
          </h2>
          <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-slate-800 text-slate-400">
            {filteredEvents.length} EVENTS
          </span>
        </div>

        {/* Stream Action Buttons */}
        <div className="flex items-center gap-2 font-mono-code text-xs">
          {isPaused ? (
            <button
              onClick={() => {
                soundFx.playClick();
                if (onResume) onResume();
              }}
              className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-900 font-bold flex items-center gap-1 transition-all"
            >
              <Play className="w-3.5 h-3.5" /> RESUME
            </button>
          ) : (
            <button
              onClick={() => {
                soundFx.playClick();
                if (onPause) onPause();
              }}
              className="px-2.5 py-1 rounded bg-amber-950 text-amber-400 border border-amber-500/40 hover:bg-amber-900 font-bold flex items-center gap-1 transition-all"
            >
              <Pause className="w-3.5 h-3.5" /> PAUSE
            </button>
          )}

          <button
            onClick={() => {
              soundFx.playPurgeSweep();
              if (onClear) onClear();
            }}
            className="px-2.5 py-1 rounded bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700 hover:bg-slate-700 font-bold flex items-center gap-1 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" /> CLEAR
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-2 font-mono-code text-xs">
        
        {/* Severity Filter Dropdown */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={severityFilter}
            onChange={(e) => {
              soundFx.playClick();
              setSeverityFilter(e.target.value);
            }}
            className="bg-transparent text-cyan-400 focus:outline-none cursor-pointer font-bold w-full"
          >
            <option value="ALL" className="bg-slate-900 text-slate-200">ALL SEVERITIES</option>
            <option value="CRITICAL" className="bg-slate-900 text-rose-400">CRITICAL</option>
            <option value="HIGH" className="bg-slate-900 text-amber-400">HIGH</option>
            <option value="MEDIUM" className="bg-slate-900 text-blue-300">MEDIUM</option>
            <option value="LOW" className="bg-slate-900 text-slate-400">LOW</option>
          </select>
        </div>

        {/* Stream Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search live stream by server, user, IP, or event type..."
            className="w-full pl-8 pr-3 py-1 text-xs font-mono-code bg-slate-950 border border-slate-800 rounded text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
          />
        </div>
      </div>

      {/* Live Table Feed */}
      <div className="overflow-x-auto overflow-y-auto max-h-[380px] border border-slate-800 rounded-md">
        <table className="w-full text-left font-mono-code text-xs">
          <thead className="bg-slate-950 sticky top-0 border-b border-slate-800 text-slate-400 text-[11px]">
            <tr>
              <th className="py-2.5 px-3">TIMESTAMP</th>
              <th className="py-2.5 px-3">SERVER</th>
              <th className="py-2.5 px-3">USER</th>
              <th className="py-2.5 px-3">EVENT TYPE</th>
              <th className="py-2.5 px-3">SOURCE IP</th>
              <th className="py-2.5 px-3">SEVERITY</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 bg-slate-900/50">
            {filteredEvents.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500 text-xs">
                  NO LIVE EVENTS IN BUFFER MATCHING CURRENT FILTER.
                </td>
              </tr>
            ) : (
              filteredEvents.map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-2 px-3 text-slate-400">{evt.timestamp}</td>
                  <td className="py-2 px-3 font-bold text-slate-200">{evt.server}</td>
                  <td className="py-2 px-3 text-cyan-400">{evt.user}</td>
                  <td className="py-2 px-3 text-slate-300 font-sans">{evt.event_type}</td>
                  <td className="py-2 px-3 text-slate-300">{evt.source_ip}</td>
                  <td className="py-2 px-3">{getSeverityBadge(evt.severity)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
