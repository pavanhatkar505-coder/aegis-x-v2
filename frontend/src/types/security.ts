export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type IncidentStatus = 'Investigating' | 'Resolved' | 'Escalated' | 'New';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface SecurityEvent {
  id?: string;
  timestamp: string;
  server: string;
  user: string;
  event_type: string;
  source_ip: string;
  severity: Severity;
}

export interface AIAnalysis {
  confidence?: number;
  mitre_tactic?: string;
  mitre_technique?: string;
  mitre_code?: string;
  summary?: string;
  observed_facts?: string[];
  inferred_context?: string[];
  remediation_steps?: string[];
  unknowns?: string[];
}

export interface SecurityAlert {
  alert_id?: string;
  attack: string;
  severity: Severity;
  risk_score: number;
  server: string;
  user: string;
  source_ip: string;
  failed_attempts?: number;
  reason: string;
  timestamp?: string;
  ai_analysis?: AIAnalysis;
}

export interface TimelineEvent {
  timestamp: string;
  event: string;
  severity?: Severity;
}

export interface Incident {
  incident_id: string;
  attack_type: string;
  affected_asset: string;
  user: string;
  source_ip: string;
  risk_score: number;
  severity: Severity;
  priority: Priority;
  status: IncidentStatus;
  first_seen: string;
  last_seen: string;
  recommended_action: string;
  reason?: string;
  timeline: TimelineEvent[];
  correlation_evidence: string;
  decision_analysis: string;
  notes?: string[];
  ai_analysis?: AIAnalysis;
}

export interface SystemHealth {
  api: 'CONNECTED' | 'DISCONNECTED' | 'DEGRADED';
  event_stream: 'CONNECTED' | 'PAUSED' | 'DISCONNECTED';
  correlator: 'RUNNING' | 'STOPPED' | 'ERROR';
  decision_engine: 'RUNNING' | 'STOPPED' | 'ERROR';
  database: 'CONNECTED' | 'DISCONNECTED' | 'SYNCING';
}

export interface OverviewMetrics {
  active_incidents: number;
  active_incidents_trend: string;
  critical_alerts: number;
  critical_alerts_trend: string;
  events_per_sec: number;
  events_per_sec_trend: string;
  average_risk_score: number;
  average_risk_score_trend: string;
}

export interface AttackLaunchParams {
  scenario: string;
  intensity: 'low_and_slow' | 'stealth' | 'aggressive';
  target_user: string;
  custom_ip?: string;
}

export interface ContainmentRequest {
  target_type: 'ip' | 'user' | 'server';
  target_value: string;
  action: 'isolate' | 'block' | 'revoke_tokens' | 'quarantine';
}
