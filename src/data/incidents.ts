export interface Incident {
  id: string;
  attackType: string;
  asset: string;
  user: string;
  risk: number;
  severity: 'High' | 'Medium' | 'Low' | 'Critical';
  status: 'Investigating' | 'Open' | 'Monitoring' | 'Resolved' | 'Closed';
  time: string;
  date: string;
  firstSeen: string;
  lastSeen: string;
  sourceIp: string;
  failedAttempts: number;
  confidence: number;
  priority: string;
  targetHost: string;
  description: string;
}

export const MOCK_INCIDENTS: Incident[] = [
  {
    id: 'INC-001',
    attackType: 'AUTH_BRUTE_FORCE',
    asset: 'SERVER-02',
    user: 'root',
    risk: 87,
    severity: 'Critical',
    status: 'Investigating',
    time: '14:35:12',
    date: '2026-10-06 12:00',
    firstSeen: '2026-10-06 12:00:15',
    lastSeen: '2026-10-06 12:05:00',
    sourceIp: '185.220.101.4',
    failedAttempts: 412,
    confidence: 99,
    priority: 'CRITICAL',
    targetHost: 'SERVER-02',
    description: 'High frequency SSH brute force attack detected targeting SERVER-02 authentication service from 185.220.101.4.'
  },
  {
    id: 'INC-1042',
    attackType: 'Brute Force Login',
    asset: 'AUTH-01',
    user: 'alice',
    risk: 85,
    severity: 'High',
    status: 'Investigating',
    time: '14:32:01',
    date: '2026-08-30 14:10',
    firstSeen: '2026-08-30 14:10:00',
    lastSeen: '2026-08-30 14:12:45',
    sourceIp: '192.168.1.50',
    failedAttempts: 5,
    confidence: 91,
    priority: 'HIGH',
    targetHost: 'DB-01',
    description: 'Multiple failed SSH login attempts for user alice followed by successful authentication within 60 seconds.'
  },
  {
    id: 'INC-1041',
    attackType: 'Privilege Escalation',
    asset: 'DB-01',
    user: 'admin_root',
    risk: 78,
    severity: 'High',
    status: 'Open',
    time: '14:28:14',
    date: '2026-08-30 13:55',
    firstSeen: '2026-08-30 13:55:00',
    lastSeen: '2026-08-30 13:58:12',
    sourceIp: '172.16.0.44',
    failedAttempts: 2,
    confidence: 95,
    priority: 'CRITICAL',
    targetHost: 'K8S-NODE-07',
    description: 'PAM token bypass detected. UID=0 root shell spawned on primary database server.'
  },
  {
    id: 'INC-1040',
    attackType: 'Suspicious Connection',
    asset: 'WEB-02',
    user: 'john_dev',
    risk: 55,
    severity: 'Medium',
    status: 'Monitoring',
    time: '14:26:33',
    date: '2026-08-30 13:42',
    firstSeen: '2026-08-30 13:42:00',
    lastSeen: '2026-08-30 13:45:00',
    sourceIp: '198.51.100.23',
    failedAttempts: 0,
    confidence: 78,
    priority: 'MEDIUM',
    targetHost: 'WEB-02',
    description: 'Outbound TCP connection to known C2 server reputation list detected from dev workstation.'
  },
  {
    id: 'INC-1039',
    attackType: 'Lateral Movement',
    asset: 'APP-02',
    user: 'svc_backup',
    risk: 48,
    severity: 'Medium',
    status: 'Open',
    time: '14:21:10',
    date: '2026-08-30 13:21',
    firstSeen: '2026-08-30 13:21:00',
    lastSeen: '2026-08-30 13:25:00',
    sourceIp: '10.0.4.112',
    failedAttempts: 1,
    confidence: 84,
    priority: 'MEDIUM',
    targetHost: 'APP-02',
    description: 'SMB lateral movement traversal detected between internal app subnets.'
  },
  {
    id: 'INC-1038',
    attackType: 'Malware Execution',
    asset: 'APP-01',
    user: 'alice',
    risk: 42,
    severity: 'Medium',
    status: 'Resolved',
    time: '12:58:00',
    date: '2026-08-30 12:58',
    firstSeen: '2026-08-30 12:58:00',
    lastSeen: '2026-08-30 13:02:00',
    sourceIp: '198.51.100.55',
    failedAttempts: 0,
    confidence: 89,
    priority: 'MEDIUM',
    targetHost: 'APP-01',
    description: 'Suspicious executable binary launched from temp directory with elevated privileges.'
  },
  {
    id: 'INC-1037',
    attackType: 'Data Exfiltration',
    asset: 'DB-02',
    user: 'oracle_dba',
    risk: 36,
    severity: 'Low',
    status: 'Monitoring',
    time: '12:40:00',
    date: '2026-08-30 12:40',
    firstSeen: '2026-08-30 12:40:00',
    lastSeen: '2026-08-30 12:45:00',
    sourceIp: '10.0.4.112',
    failedAttempts: 0,
    confidence: 76,
    priority: 'LOW',
    targetHost: 'DB-02',
    description: 'DNS TXT record egress bursts detected to unregistered domain.'
  },
  {
    id: 'INC-1036',
    attackType: 'Port Scan',
    asset: 'FW-01',
    user: '-',
    risk: 34,
    severity: 'Low',
    status: 'Closed',
    time: '11:22:00',
    date: '2026-08-30 11:22',
    firstSeen: '2026-08-30 11:22:00',
    lastSeen: '2026-08-30 11:25:00',
    sourceIp: '203.0.113.24',
    failedAttempts: 120,
    confidence: 98,
    priority: 'LOW',
    targetHost: 'FW-01',
    description: 'Reconnaissance port scan targeting ports 22, 80, 443, 3306.'
  },
  {
    id: 'INC-1035',
    attackType: 'Unauthorized Access',
    asset: 'VPN-01',
    user: '-',
    risk: 28,
    severity: 'Low',
    status: 'Resolved',
    time: '10:18:00',
    date: '2026-08-30 10:18',
    firstSeen: '2026-08-30 10:18:00',
    lastSeen: '2026-08-30 10:20:00',
    sourceIp: '45.77.12.90',
    failedAttempts: 3,
    confidence: 90,
    priority: 'LOW',
    targetHost: 'VPN-01',
    description: 'VPN login attempt from unauthorized country location.'
  }
];
