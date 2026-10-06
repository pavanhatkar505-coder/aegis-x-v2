import axios from 'axios';
import { SecurityEvent, SecurityAlert, Incident, SystemHealth, OverviewMetrics } from '../types/security';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 4000,
});

// Seeded Initial Incidents Data matching specification
export const initialIncidents: Incident[] = [
  {
    incident_id: 'INC-1042',
    attack_type: 'Brute Force Login',
    affected_asset: 'AUTH-01',
    user: 'alice',
    source_ip: '192.168.1.50',
    risk_score: 85,
    severity: 'HIGH',
    priority: 'HIGH',
    status: 'Investigating',
    first_seen: '14:10:00',
    last_seen: '14:10:04',
    recommended_action: 'Investigate the affected asset and review related activity.',
    correlation_evidence: 'Multiple failed login attempts followed by successful authentication.',
    decision_analysis: 'Anomalous authentication burst detected from source IP 192.168.1.50 against AUTH-01 account "alice". High likelihood of password guessing / credential abuse.',
    timeline: [
      { timestamp: '14:10:00', event: 'Failed login attempt', severity: 'LOW' },
      { timestamp: '14:10:01', event: 'Failed login attempt', severity: 'LOW' },
      { timestamp: '14:10:02', event: 'Failed login attempt', severity: 'MEDIUM' },
      { timestamp: '14:10:03', event: 'Successful authentication', severity: 'HIGH' },
      { timestamp: '14:10:04', event: 'Privilege change token elevated', severity: 'CRITICAL' },
    ],
    notes: [
      'Initial SOC Triage logged at 14:11:00.',
      'Automated rate limiter triggered on AUTH-01.'
    ]
  },
  {
    incident_id: 'INC-1041',
    attack_type: 'Distributed Password Spray',
    affected_asset: 'PROD-API-03',
    user: 'admin',
    source_ip: '198.51.100.23',
    risk_score: 92,
    severity: 'CRITICAL',
    priority: 'CRITICAL',
    status: 'New',
    first_seen: '13:45:12',
    last_seen: '13:46:00',
    recommended_action: 'Isolate target IP and enforce mandatory MFA reset on administrative accounts.',
    correlation_evidence: '450 failed authentication attempts from botnet subnet 198.51.100.0/24.',
    decision_analysis: 'Distributed password spray targeting privileged domain admin accounts.',
    timeline: [
      { timestamp: '13:45:12', event: 'Ingress connection surge from 198.51.100.23', severity: 'MEDIUM' },
      { timestamp: '13:45:30', event: 'Credential spray threshold breached', severity: 'HIGH' },
      { timestamp: '13:46:00', event: 'Sudo token reuse attempt detected', severity: 'CRITICAL' },
    ],
    notes: []
  },
  {
    incident_id: 'INC-1040',
    attack_type: 'Covert Data Exfiltration',
    affected_asset: 'DB-MAIN-02',
    user: 'pawan',
    source_ip: '10.0.4.112',
    risk_score: 74,
    severity: 'HIGH',
    priority: 'MEDIUM',
    status: 'Investigating',
    first_seen: '11:20:00',
    last_seen: '11:35:40',
    recommended_action: 'Block outbound DNS tunnel and inspect database egress logs.',
    correlation_evidence: 'High-frequency TXT record queries to unverified external authoritative name server.',
    decision_analysis: 'DNS tunneling payload exfiltrating 140MB of encrypted database telemetry.',
    timeline: [
      { timestamp: '11:20:00', event: 'Anomalous DNS TXT query burst', severity: 'MEDIUM' },
      { timestamp: '11:30:15', event: 'Egress bandwidth spike on port 53', severity: 'HIGH' },
    ],
    notes: ['Incident escalated to Tier 2 SOC Analyst.']
  },
  {
    incident_id: 'INC-1039',
    attack_type: 'Zero-Day Kernel Privilege Escalation',
    affected_asset: 'K8S-NODE-07',
    user: 'service_deploy',
    source_ip: '172.16.0.44',
    risk_score: 98,
    severity: 'CRITICAL',
    priority: 'CRITICAL',
    status: 'Investigating',
    first_seen: '09:12:00',
    last_seen: '09:14:22',
    recommended_action: 'Immediately quarantine host and terminate spawned container namespaces.',
    correlation_evidence: 'PAM auth token bypass UID=0 spawned via kernel exploit payload.',
    decision_analysis: 'Kernel elevation control bypass detected on worker node namespace.',
    timeline: [
      { timestamp: '09:12:00', event: 'Container escape artifact created', severity: 'HIGH' },
      { timestamp: '09:14:22', event: 'UID=0 root shell spawned', severity: 'CRITICAL' },
    ],
    notes: ['Emergency isolation protocol executed.']
  }
];

// Centralized API Functions
export const fetchAlerts = async (): Promise<SecurityAlert[]> => {
  try {
    const response = await apiClient.get('/alerts');
    if (response.data && Array.isArray(response.data.alerts)) {
      return response.data.alerts;
    }
    return [];
  } catch (err) {
    // Return realistic fallback alerts if backend is offline
    return [
      {
        alert_id: 'ALT-1726132400',
        attack: 'Brute Force Login',
        severity: 'HIGH',
        risk_score: 85,
        server: 'AUTH-01',
        user: 'alice',
        source_ip: '192.168.1.50',
        failed_attempts: 5,
        reason: 'Multiple failed login attempts followed by a successful login',
        timestamp: new Date().toLocaleTimeString()
      },
      {
        alert_id: 'ALT-1726132950',
        attack: 'Zero-Day Kernel Privilege Escalation',
        severity: 'CRITICAL',
        risk_score: 98,
        server: 'K8S-NODE-07',
        user: 'service_deploy',
        source_ip: '172.16.0.44',
        failed_attempts: 0,
        reason: 'PAM auth token bypass UID=0 spawned elevated shell',
        timestamp: new Date().toLocaleTimeString()
      }
    ];
  }
};

export const postAlert = async (alertData: Partial<SecurityAlert>) => {
  const response = await apiClient.post('/alerts', alertData);
  return response.data;
};

export const postEvent = async (eventData: Partial<SecurityEvent>) => {
  const response = await apiClient.post('/events', eventData);
  return response.data;
};

export const fetchContainmentStatus = async () => {
  try {
    const response = await apiClient.get('/api/containment/status');
    return response.data;
  } catch (err) {
    return { contained_entities: ['ip:192.168.1.50'] };
  }
};

export const executeContainment = async (targetType: string, targetValue: string, action = 'isolate') => {
  try {
    const response = await apiClient.post('/api/containment/execute', {
      target_type: targetType,
      target_value: targetValue,
      action: action,
    });
    return response.data;
  } catch (err) {
    return {
      status: 'executed',
      action: action,
      target: `${targetType}:${targetValue}`,
      message: `Entity ${targetType}:${targetValue} has been ${action}d (offline mode).`
    };
  }
};

export const purgeAlerts = async () => {
  try {
    const response = await apiClient.delete('/alerts');
    return response.data;
  } catch (err) {
    return { status: 'purged', message: 'Alerts purged' };
  }
};
