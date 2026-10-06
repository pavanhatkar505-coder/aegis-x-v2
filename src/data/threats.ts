export interface AttackingCountry {
  name: string;
  attacks: number;
  flag: string;
}

export interface ThreatNode {
  id: string;
  country: string;
  label: string;
  attacks: string;
  count: number;
  lat: number;
  lng: number;
}

export const GLOBE_NODES: ThreatNode[] = [
  { id: 'us', country: 'USA', label: 'USA', attacks: '1,240 attacks', count: 1240, lat: 38, lng: -97 },
  { id: 'de', country: 'Germany', label: 'Germany', attacks: '299 attacks', count: 299, lat: 51, lng: 10 },
  { id: 'in', country: 'India', label: 'India', attacks: '182 attacks', count: 182, lat: 20, lng: 78 },
  { id: 'br', country: 'Brazil', label: 'Brazil', attacks: '312 attacks', count: 312, lat: -14, lng: -51 },
  { id: 'au', country: 'Australia', label: 'Australia', attacks: '80 attacks', count: 80, lat: -25, lng: 133 },
  { id: 'ru', country: 'Russia', label: 'Russia', attacks: '2,842 attacks', count: 2842, lat: 60, lng: 100 },
  { id: 'cn', country: 'China', label: 'China', attacks: '1,329 attacks', count: 1329, lat: 35, lng: 104 },
];

export const TOP_ATTACKING_COUNTRIES: AttackingCountry[] = [
  { name: 'Russia', attacks: 2842, flag: '🇷🇺' },
  { name: 'USA', attacks: 2124, flag: '🇺🇸' },
  { name: 'India', attacks: 1921, flag: '🇮🇳' },
  { name: 'China', attacks: 1329, flag: '🇨🇳' },
  { name: 'Germany', attacks: 942, flag: '🇩🇪' },
];

export const RECENT_GLOBAL_ACTIVITY = [
  { ip: '203.0.113.24', action: 'Failed Login', severity: 'High', time: '14:32:08' },
  { ip: '172.16.0.3', action: 'Port Scan', severity: 'Medium', time: '14:32:05' },
  { ip: '198.51.100.11', action: 'Malware Activity', severity: 'High', time: '14:31:58' },
  { ip: '45.77.12.90', action: 'Suspicious Request', severity: 'Medium', time: '14:31:47' },
];

export const THREAT_CATEGORIES = [
  { name: 'Brute Force', percentage: 30, color: '#FF4D5E' },
  { name: 'Malware', percentage: 20, color: '#FF8A4C' },
  { name: 'DDoS', percentage: 15, color: '#F59E0B' },
  { name: 'Web Exploit', percentage: 10, color: '#11C5D9' },
  { name: 'Insider', percentage: 10, color: '#3B82F6' },
  { name: 'Other', percentage: 10, color: '#20D89B' },
];
