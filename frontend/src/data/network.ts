export interface NetworkSubnet {
  id: string;
  name: string;
  devices: string;
  count: number;
  type: 'office' | 'hr' | 'app' | 'db' | 'employee' | 'cloud' | 'remote' | 'gateway';
  status: 'normal' | 'suspicious' | 'compromised';
}

export const NETWORK_SUBNETS: NetworkSubnet[] = [
  { id: 'office', name: 'Office Network', devices: '46 devices', count: 46, type: 'office', status: 'normal' },
  { id: 'hr', name: 'HR Subnet', devices: '20 devices', count: 20, type: 'hr', status: 'normal' },
  { id: 'app', name: 'Application Layer', devices: '32 servers', count: 32, type: 'app', status: 'compromised' },
  { id: 'db', name: 'Database Layer', devices: '8 servers', count: 8, type: 'db', status: 'compromised' },
  { id: 'employee', name: 'Employee Devices', devices: '54 devices', count: 54, type: 'employee', status: 'normal' },
  { id: 'cloud', name: 'Cloud Environment', devices: '12 assets', count: 12, type: 'cloud', status: 'normal' },
  { id: 'remote', name: 'Remote Access', devices: '60 devices', count: 60, type: 'remote', status: 'normal' },
];

export const ACTIVE_THREAT_PATH = [
  {
    step: 1,
    title: 'Compromised Workstation',
    host: 'APP-02',
    ip: '192.168.1.45',
    status: 'COMPROMISED'
  },
  {
    step: 2,
    title: 'Privilege Escalation',
    host: 'DB-01',
    ip: '192.168.10.25',
    status: 'ESCALATED'
  },
  {
    step: 3,
    title: 'Lateral Movement',
    host: 'Accessing internal assets',
    ip: '10.0.4.0/24',
    status: 'ACTIVE'
  }
];
