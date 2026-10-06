import React, { useState } from 'react';
import { Brain, ArrowRight, CheckCircle2, Download } from 'lucide-react';

export default function AIAnalystPage() {
  const [selectedId, setSelectedId] = useState('INC-1042');

  const insights = [
    { id: 'INC-1042', title: 'Brute Force Login', confidence: 'High confidence', time: '12 min ago' },
    { id: 'INC-1041', title: 'Unusual Access Pattern', confidence: 'Medium confidence', time: '1 hour ago' },
    { id: 'INC-1040', title: 'Potential Data Exfiltration', confidence: 'High confidence', time: '3 hours ago' },
    { id: 'INC-1039', title: 'Lateral Movement Detected', confidence: 'High confidence', time: '3 hours ago' },
    { id: 'INC-1038', title: 'New IOC Detected', confidence: 'Low confidence', time: '5 hours ago' },
  ];

  return (
    <div className="p-6 space-y-6 bg-[#F5F8FC] min-h-screen text-[#152033] font-sans">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#152033] tracking-wide">AI Security Analyst</h1>
        <p className="text-xs text-[#69778A] mt-1">Get intelligent insights, investigation guidance, and threat analysis</p>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* LEFT COLUMN: Recent Insights */}
        <div className="lg:col-span-1 rounded-2xl bg-white border border-[#E7ECF2] p-5 space-y-4 shadow-sm">
          <h3 className="text-xs font-bold text-[#69778A] uppercase tracking-wider font-mono">Recent Insights</h3>

          <div className="space-y-2.5 font-mono text-xs">
            {insights.map((ins) => {
              const isSelected = selectedId === ins.id;
              return (
                <button
                  key={ins.id}
                  onClick={() => setSelectedId(ins.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-blue-50/60 border-[#2563EB] ring-2 ring-[#2563EB]/20 text-[#2563EB] font-bold shadow-sm'
                      : 'bg-[#F5F8FC] border-[#E7ECF2] text-[#152033] hover:border-[#2563EB]/40'
                  }`}
                >
                  <div className="font-bold text-[#152033] truncate">
                    {ins.id} – {ins.title}
                  </div>
                  <div className="text-[10px] text-[#69778A] mt-1 font-normal flex items-center justify-between">
                    <span>{ins.confidence}</span>
                    <span>• {ins.time}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* CENTER COLUMN: AI Analysis Report */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-[#E7ECF2] p-6 space-y-5 shadow-sm flex flex-col justify-between">
          <div className="space-y-5">
            
            {/* Header & Severity Badge */}
            <div className="flex items-center justify-between border-b border-[#E7ECF2] pb-4">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-[#2563EB]" />
                <h2 className="text-lg font-black text-[#152033] tracking-tight">
                  INC-1042 – Brute Force Login
                </h2>
              </div>
              <span className="px-3 py-1 rounded-md text-xs font-black bg-rose-100 text-rose-700 border border-rose-200">
                HIGH
              </span>
            </div>

            {/* Summary */}
            <div className="p-4 rounded-xl bg-[#F5F8FC] border border-[#E7ECF2] space-y-1.5">
              <h4 className="text-xs font-bold text-[#69778A] font-mono uppercase">SUMMARY</h4>
              <p className="text-xs text-[#152033] leading-relaxed font-sans font-medium">
                Multiple failed login attempts for user “alice” from IP 192.168.1.50 create a pattern consistent with credential stuffing / brute-force behavior.
              </p>
            </div>

            {/* Key Findings */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#69778A] font-mono uppercase">KEY FINDINGS</h4>
              <ol className="space-y-2 text-xs text-[#152033] font-sans">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-[#2563EB] font-mono font-bold text-[11px] flex items-center justify-center shrink-0">1</span>
                  <span className="font-medium">5 failed authentication attempts</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-[#2563EB] font-mono font-bold text-[11px] flex items-center justify-center shrink-0">2</span>
                  <span className="font-medium">Same user and source IP</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-[#2563EB] font-mono font-bold text-[11px] flex items-center justify-center shrink-0">3</span>
                  <span className="font-medium">Successful login within 60 seconds</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-[#2563EB] font-mono font-bold text-[11px] flex items-center justify-center shrink-0">4</span>
                  <span className="font-medium">Privilege change after login</span>
                </li>
              </ol>
            </div>

            {/* Recommended Actions */}
            <div className="space-y-2 pt-2 border-t border-[#E7ECF2]">
              <h4 className="text-xs font-bold text-[#69778A] font-mono uppercase">RECOMMENDED ACTIONS</h4>
              <ul className="space-y-2 text-xs text-[#152033] font-medium font-sans">
                <li className="flex items-center gap-2">
                  <span className="text-[#2563EB] font-bold">•</span> Investigate the affected asset
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2563EB] font-bold">•</span> Verify user identity and session activity
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2563EB] font-bold">•</span> Check for lateral movement
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2563EB] font-bold">•</span> Review system logs for additional indicators
                </li>
              </ul>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#E7ECF2]">
            <button
              onClick={() => alert('Opening detailed reasoning breakdown...')}
              className="px-4 py-2.5 rounded-xl bg-white border border-[#E7ECF2] text-[#2563EB] font-bold text-xs hover:bg-[#F5F8FC] shadow-sm"
            >
              Explain in Detail
            </button>
            <button
              onClick={() => alert('Generating full executive PDF report...')}
              className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20"
            >
              Generate Report
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Related Threat Intel */}
        <div className="lg:col-span-1 rounded-2xl bg-white border border-[#E7ECF2] p-5 space-y-5 shadow-sm flex flex-col justify-between">
          <div className="space-y-4 font-mono text-xs">
            <h3 className="text-xs font-bold text-[#69778A] uppercase tracking-wider">Related Threat Intel</h3>

            <div className="p-3.5 rounded-xl bg-[#F5F8FC] border border-[#E7ECF2] space-y-1">
              <div className="text-rose-600 font-bold text-sm">192.168.1.50</div>
              <div className="text-[11px] text-[#69778A]">Seen in 3 brute-force campaigns</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F5F8FC] border border-[#E7ECF2] space-y-1">
              <div className="text-[#152033] font-bold">Brute Force TTP</div>
              <div className="text-[11px] text-[#69778A]">MITRE: T1110</div>
              <div className="text-[11px] font-bold text-emerald-600">Confidence: 94%</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F5F8FC] border border-[#E7ECF2] space-y-1">
              <div className="text-[#152033] font-bold">Similar Incidents</div>
              <div className="text-[11px] text-[#2563EB] font-bold">17 incidents</div>
              <div className="text-[10px] text-[#69778A]">in last 30 days</div>
            </div>
          </div>

          <button
            onClick={() => alert('Navigating to IOC Details...')}
            className="w-full py-3 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#2563EB] font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all mt-4 border border-blue-200"
          >
            View IOC Details <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
