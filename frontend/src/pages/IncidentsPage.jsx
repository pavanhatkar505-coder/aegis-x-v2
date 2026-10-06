import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { MOCK_INCIDENTS } from '../data/incidents';

export default function IncidentsPage() {
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
        return <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-700 border border-rose-200">High</span>;
      case 'Medium':
        return <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">Medium</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">Low</span>;
    }
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'Investigating':
      case 'Open':
        return <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 font-mono">Investigating</span>;
      case 'Monitoring':
        return <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 font-mono">Monitoring</span>;
      case 'Resolved':
      case 'Closed':
        return <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">Resolved</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200 font-mono">{status}</span>;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-[#F5F8FC] min-h-screen text-[#152033] font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#152033] tracking-wide">Security Incidents</h1>
          <p className="text-xs text-[#69778A] mt-1">Detected threats and security events requiring attention</p>
        </div>

        <button
          onClick={() => alert('Create new incident dialog...')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all"
        >
          <Plus className="w-4 h-4" /> New
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-xl bg-white border border-[#E7ECF2] shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 flex-1 min-w-[260px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#69778A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search incidents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#F5F8FC] border border-[#E7ECF2] rounded-lg text-xs text-[#152033] focus:outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3 py-2 bg-[#F5F8FC] border border-[#E7ECF2] rounded-lg text-[#152033] font-medium focus:outline-none"
          >
            <option value="ALL">Severity: All</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#F5F8FC] border border-[#E7ECF2] rounded-lg text-[#152033] font-medium focus:outline-none"
          >
            <option value="ALL">Status: All</option>
            <option value="investigating">Investigating</option>
            <option value="monitoring">Monitoring</option>
            <option value="resolved">Resolved</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 bg-[#F5F8FC] border border-[#E7ECF2] rounded-lg text-[#152033] font-medium focus:outline-none"
          >
            <option value="7d">Last 7 Days</option>
            <option value="24h">Last 24 Hours</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Incidents Data Table */}
      <div className="rounded-2xl bg-white border border-[#E7ECF2] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#F5F8FC] text-[#69778A] font-mono text-[11px] border-b border-[#E7ECF2] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">ATTACK TYPE</th>
                <th className="py-3 px-4">ASSET</th>
                <th className="py-3 px-4">USER</th>
                <th className="py-3 px-4">RISK</th>
                <th className="py-3 px-4">SEVERITY</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">FIRST SEEN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7ECF2] bg-white">
              {filteredIncidents.map((inc) => (
                <tr
                  key={inc.id}
                  onClick={() => navigate(`/incidents/${inc.id}`)}
                  className="cursor-pointer transition-colors hover:bg-[#F5F8FC] group"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-[#2563EB]">{inc.id}</td>
                  <td className="py-3.5 px-4 font-bold text-[#152033]">{inc.attackType}</td>
                  <td className="py-3.5 px-4 font-mono text-[#69778A]">{inc.asset}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">{inc.user}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-rose-600">{inc.risk}</td>
                  <td className="py-3.5 px-4">{getSeverityChip(inc.severity)}</td>
                  <td className="py-3.5 px-4">{getStatusChip(inc.status)}</td>
                  <td className="py-3.5 px-4 font-mono text-[#69778A] text-[11px]">{inc.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-[#F5F8FC] border-t border-[#E7ECF2] flex items-center justify-between text-xs font-mono text-[#69778A]">
          <div>Showing <strong className="text-[#152033]">1-8</strong> of <strong className="text-[#152033]">10</strong> incidents</div>
          <div className="flex items-center gap-1.5">
            <button className="p-1.5 rounded-lg bg-white border border-[#E7ECF2] text-[#69778A] hover:text-[#152033]">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 rounded-lg bg-[#2563EB] text-white font-bold">1</button>
            <button className="px-3 py-1 rounded-lg bg-white border border-[#E7ECF2] text-[#69778A] hover:text-[#152033]">2</button>
            <button className="px-3 py-1 rounded-lg bg-white border border-[#E7ECF2] text-[#69778A] hover:text-[#152033]">3</button>
            <span>...</span>
            <button className="px-3 py-1 rounded-lg bg-white border border-[#E7ECF2] text-[#69778A] hover:text-[#152033]">10</button>
            <button className="p-1.5 rounded-lg bg-white border border-[#E7ECF2] text-[#69778A] hover:text-[#152033]">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
