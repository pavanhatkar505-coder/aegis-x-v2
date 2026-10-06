import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000';

export const AegisAPI = {
  getStatus: async () => {
    const res = await axios.get(`${API_BASE}/api/status`);
    return res.data;
  },
  getAlerts: async () => {
    const res = await axios.get(`${API_BASE}/alerts`);
    return res.data.alerts;
  },
  getTopology: async () => {
    const res = await axios.get(`${API_BASE}/api/topology`);
    return res.data;
  },
  launchAttack: async (targetHost) => {
    const res = await axios.post(`${API_BASE}/api/range/launch`, {
      scenario: 'brute_force',
      intensity: 'aggressive',
      target_user: 'root',
      custom_ip: '198.51.100.23',
      target_host: targetHost
    });
    return res.data;
  },
  isolateHost: async (targetHost) => {
    const res = await axios.post(`${API_BASE}/api/containment/execute`, {
      target_type: "host",
      target_value: targetHost,
      action: "ISOLATE"
    });
    return res.data;
  }
};
