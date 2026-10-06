import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, ChevronLeft, ChevronRight, Zap, Radio, ShieldAlert } from 'lucide-react';
import { MOCK_INCIDENTS } from '../data/incidents';

export default function IncidentsPage({ onOpenDecisionLayer }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('7d');

  const filteredIncidents = useMemo(() => {
    return MOCK_INCIDENTS.filter(inc => {
      const matchSearch =
        inc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inc.attackType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inc.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inc.asset.toLowerCase().includes(searchTerm.toLowerCase());

      const matchSev = severityFilter === 'ALL' || inc.severity.toUpperCase() === severityFilter;
      const matchStatus = statusFilter === 'ALL' || inc.status.toLowerCase() === statusFilter.toLowerCase();

      return matchSearch && matchSev && matchStatus;
    });
  }, [searchTerm, severityFilter, statusFilter]);

  const getSeverityChip = (sev) => {
    switch (sev) {
      case 'High':
      case 'Critical':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 font-mono">Critical</span>;
      case 'Medium':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 font-mono">Medium</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-500/20 text-slate-300 border border-slate-500/30 font-mono">Low</span>;
    }
  };

  const getStatusChip = (status, isDecisionRequired) => {
    if (isDecisionRequired) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono flex items-center gap-1.5 animate-pulse">
          <Radio size={12} className="text-amber-400" /> DECISION REQUIRED
        </span>
      );
    }
    switch (status.toLowerCase()) {
      case 'investigating':
      case 'open':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 font-mono">Investigating</span>;
      case 'monitoring':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono">Monitoring</span>;
      case 'resolved':
      case 'closed':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">Resolved</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-700/50 text-slate-300 border border-slate-700 font-mono">{status}</span>;
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 bg-[#070e1a] min-h-screen text-[#F5F7FA] font-sans w-full max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
        <div>
          <h1 className="text-2xl font-black text-white tracking-wide font-['Outfit']">Security Incidents Repository</h1>
          <p className="text-xs text-slate-400 mt-1">Detected active threats, correlation clusters, and containment states</p>
        </div>

        <div className="flex items-center gap-3">
          {onOpenDecisionLayer && (
            <button
              onClick={onOpenDecisionLayer}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 cursor-pointer font-['Outfit']"
            >
              <Zap size={14} className="text-cyan-200 fill-current" />
              <span>ACTIVE DECISION (INC-001)</span>
            </button>
          )}
          <button
            onClick={() => alert('New Incident Dialog')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all cursor-pointer font-['Outfit']"
          >
            <Plus className="w-4 h-4" /> Create Incident
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-[#0d1527] border border-slate-800/80 shadow-xl flex flex-wrap items-center justify-between gap-4 text-xs w-full">
        <div className="flex items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by incident ID, attack type, host asset, or user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 font-mono shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-300 font-medium focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="ALL">Severity: All</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-300 font-medium focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="ALL">Status: All</option>
            <option value="investigating">Investigating</option>
            <option value="monitoring">Monitoring</option>
            <option value="resolved">Resolved</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-300 font-medium focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Incidents Data Table */}
      <div className="rounded-2xl bg-[#0d1527] border border-slate-800/80 shadow-xl overflow-hidden w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs font-sans table-auto">
            <thead className="bg-[#080d19] text-slate-400 font-mono text-[11px] border-b border-slate-800 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">INCIDENT ID</th>
                <th className="py-3.5 px-4">ATTACK PATTERN</th>
                <th className="py-3.5 px-4">AFFECTED ASSET</th>
                <th className="py-3.5 px-4">USER CONTEXT</th>
                <th className="py-3.5 px-4">RISK</th>
                <th className="py-3.5 px-4">SEVERITY</th>
                <th className="py-3.5 px-4">STATUS</th>
                <th className="py-3.5 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-[#0d1527]">
              {filteredIncidents.map((inc) => {
                const isDecisionRequired = inc.id === 'INC-001';
                return (
                  <tr
                    key={inc.id}
                    className={`transition-colors cursor-pointer ${
                      isDecisionRequired ? 'bg-amber-500/[0.08] hover:bg-amber-500/[0.14]' : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-4 px-4 font-mono font-bold text-cyan-400 whitespace-nowrap">{inc.id}</td>
                    <td className="py-4 px-4 font-bold text-white flex items-center gap-2 whitespace-nowrap">
                      {inc.attackType}
                      {isDecisionRequired && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />}
                    </td>
                    <td className="py-4 px-4 font-mono text-cyan-300 whitespace-nowrap">{inc.asset}</td>
                    <td className="py-4 px-4 font-mono text-slate-300 whitespace-nowrap">{inc.user}</td>
                    <td className="py-4 px-4 font-mono font-black text-red-400 whitespace-nowrap text-sm">{inc.risk}</td>
                    <td className="py-4 px-4 whitespace-nowrap">{getSeverityChip(inc.severity)}</td>
                    <td className="py-4 px-4 whitespace-nowrap">{getStatusChip(inc.status, isDecisionRequired)}</td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      {isDecisionRequired ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onOpenDecisionLayer) onOpenDecisionLayer();
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs font-['Outfit'] tracking-wider shadow-md shadow-cyan-500/25 cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <Zap size={12} /> DECISION
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate(`/incidents/${inc.id}`)}
                          className="text-slate-400 hover:text-white font-mono text-xs"
                        >
                          Investigate →
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-[#080d19] border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <div>Showing <strong className="text-white">1-{filteredIncidents.length}</strong> of <strong className="text-white">{filteredIncidents.length}</strong> active incidents</div>
          <div className="flex items-center gap-1.5">
            <button className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold">1</button>
            <button className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
