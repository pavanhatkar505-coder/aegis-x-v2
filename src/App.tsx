import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/AppShell';
import DecisionWorkspace from './components/decision/DecisionWorkspace';

import LoginPage from './pages/LoginPage';
import OverviewPage from './pages/OverviewPage';
import LiveEventsPage from './pages/LiveEventsPage';
import ThreatMapPage from './pages/ThreatMapPage';
import TopologyPage from './pages/TopologyPage';
import IncidentsPage from './pages/IncidentsPage';
import IncidentDetailPage from './pages/IncidentDetailPage';
import SimulationPage from './pages/SimulationPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AIAnalystPage from './pages/AIAnalystPage';
import SystemHealthPage from './pages/SystemHealthPage';
import AssetsPage from './pages/AssetsPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const [showDecisionWorkspace, setShowDecisionWorkspace] = useState(false);

  return (
    <>
      <Routes>
        {/* Standalone Login Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Main Dashboard AppShell Layout Routes */}
        <Route element={<AppShell onOpenDecisionLayer={() => setShowDecisionWorkspace(true)} />}>
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="/overview" element={<OverviewPage onOpenDecisionLayer={() => setShowDecisionWorkspace(true)} />} />
          <Route path="/live-events" element={<LiveEventsPage />} />
          <Route path="/incidents" element={<IncidentsPage onOpenDecisionLayer={() => setShowDecisionWorkspace(true)} />} />
          <Route path="/incidents/:id" element={<IncidentDetailPage onOpenDecisionLayer={() => setShowDecisionWorkspace(true)} />} />
          <Route path="/threat-map" element={<ThreatMapPage />} />
          <Route path="/identity-risk" element={<AssetsPage />} />
          <Route path="/network-topology" element={<TopologyPage />} />
          <Route path="/simulation-lab" element={<SimulationPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/ai-analyst" element={<AIAnalystPage />} />
          <Route path="/reports" element={<AnalyticsPage />} />
          <Route path="/system-health" element={<SystemHealthPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Route>
      </Routes>

      {/* ─── Decision Layer Overlay ─── */}
      {/* Renders ON TOP of the existing AEGIS-X dashboard when triggered */}
      {showDecisionWorkspace && (
        <DecisionWorkspace
          onClose={() => setShowDecisionWorkspace(false)}
          incidentDetails={{
            id: 'INC-001',
            severity: 'CRITICAL',
            type: 'AUTH_BRUTE_FORCE',
            title: 'SSH Brute Force Detected',
            source_ip: '185.220.101.4',
            target: 'SERVER-02',
            risk: 87
          }}
        />
      )}
    </>
  );
}
