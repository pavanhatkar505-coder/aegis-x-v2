export interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  mitre: string;
}

export const SIMULATION_SCENARIOS: SimulationScenario[] = [
  { id: 'brute-force', name: 'Brute Force Login', description: 'Simulate high-velocity credential guessing attack', mitre: 'T1110.001' },
  { id: 'cred-abuse', name: 'Credential Abuse', description: 'Simulate stolen token reuse across sessions', mitre: 'T1078' },
  { id: 'priv-esc', name: 'Privilege Escalation', description: 'Simulate sudo vulnerability exploitation', mitre: 'T1548' },
  { id: 'lat-move', name: 'Lateral Movement', description: 'Simulate internal SMB / RDP subnet propagation', mitre: 'T1021' },
  { id: 'malware', name: 'Malware Execution', description: 'Simulate suspicious process execution in temp folder', mitre: 'T1204' },
];

export const SIMULATION_STREAM_EVENTS = [
  { time: '15:42:11', event: 'failed_login', result: 'Sent', status: 'success' },
  { time: '15:42:12', event: 'failed_login', result: 'Sent', status: 'success' },
  { time: '15:42:13', event: 'successful_login', result: 'Sent', status: 'success' },
  { time: '15:42:15', event: 'privilege_change', result: 'Sent', status: 'success' },
  { time: '15:42:15', event: 'process_started', result: 'Sent', status: 'success' },
  { time: '15:42:16', event: 'file_access', result: 'Sent', status: 'success' },
];
