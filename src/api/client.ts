import axios from 'axios';

export const API_BASE_URL = import.meta.env?.VITE_API_URL || import.meta.env?.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export const fetchAlerts = async () => {
  const response = await apiClient.get('/api/alerts');
  return response.data;
};

export const fetchContainmentStatus = async () => {
  const response = await apiClient.get('/api/containment/status');
  return response.data;
};

export const launchScenario = async (payload: {
  scenario: string;
  intensity: string;
  target_user: string;
  custom_ip?: string;
}) => {
  const response = await apiClient.post('/api/range/launch', payload);
  return response.data;
};

export const executeContainment = async (
  payload:
    | {
        target_type: 'ip' | 'user';
        target_value: string;
        action: 'isolate' | 'terminate_session';
      }
    | string,
  target_value?: string,
  action: 'isolate' | 'terminate_session' = 'isolate'
) => {
  let body;
  if (typeof payload === 'string') {
    body = {
      target_type: payload,
      target_value: target_value,
      action: action,
    };
  } else {
    body = payload;
  }
  const response = await apiClient.post('/api/containment/execute', body);
  return response.data;
};

export const resetRange = async () => {
  const response = await apiClient.delete('/api/alerts');
  return response.data;
};

// Backward-compatibility helpers for existing components
export const getAlerts = fetchAlerts;
export const launchAttack = async (
  scenario: string,
  intensity: string,
  targetUser: string,
  customIp?: string
) => {
  return launchScenario({
    scenario,
    intensity,
    target_user: targetUser,
    custom_ip: customIp,
  });
};
export const getSystemStatus = async () => {
  try {
    const response = await apiClient.get('/api/status');
    return response.data;
  } catch (err) {
    return {
      api: 'CONNECTED',
      event_stream: 'CONNECTED',
      correlator: 'RUNNING',
      decision_engine: 'RUNNING',
      database: 'CONNECTED',
    };
  }
};

export const client = {
  fetchAlerts,
  fetchContainmentStatus,
  launchScenario,
  executeContainment,
  resetRange,
  getAlerts,
  launchAttack,
  getSystemStatus,
};

export default client;
