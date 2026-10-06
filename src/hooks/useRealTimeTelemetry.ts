import { useState, useEffect, useCallback, useRef } from 'react';
import { SecurityEvent, SecurityAlert, Incident, SystemHealth, OverviewMetrics } from '../types/security';
import { fetchAlerts, fetchContainmentStatus, initialIncidents } from '../api/securityClient';

const INITIAL_EVENTS: SecurityEvent[] = [
  { id: 'EVT-1001', timestamp: '17:08:32', server: 'AUTH-01', user: 'alice', event_type: 'failed_login', source_ip: '192.168.1.50', severity: 'HIGH' },
  { id: 'EVT-1002', timestamp: '17:08:31', server: 'K8S-NODE-07', user: 'service_deploy', event_type: 'sudo_elevation', source_ip: '172.16.0.44', severity: 'CRITICAL' },
  { id: 'EVT-1003', timestamp: '17:08:29', server: 'PROD-API-03', user: 'admin', event_type: 'rate_limit_exceeded', source_ip: '198.51.100.23', severity: 'HIGH' },
  { id: 'EVT-1004', timestamp: '17:08:25', server: 'DB-MAIN-02', user: 'pawan', event_type: 'dns_txt_query', source_ip: '10.0.4.112', severity: 'MEDIUM' },
  { id: 'EVT-1005', timestamp: '17:08:20', server: 'GATEWAY-01', user: 'guest', event_type: 'invalid_cert', source_ip: '198.51.100.12', severity: 'LOW' },
];

export function useRealTimeTelemetry() {
  const [events, setEvents] = useState<SecurityEvent[]>(INITIAL_EVENTS);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [containedEntities, setContainedEntities] = useState<string[]>(['ip:192.168.1.50']);
  const [isStreamingPaused, setIsStreamingPaused] = useState(false);
  const [toastNotification, setToastNotification] = useState<{ message: string; severity: string } | null>(null);

  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    api: 'CONNECTED',
    event_stream: 'CONNECTED',
    correlator: 'RUNNING',
    decision_engine: 'RUNNING',
    database: 'CONNECTED',
  });

  const eventCounterRef = useRef(1006);

  // Poll backend & generate real-time stream simulation events
  const syncTelemetry = useCallback(async () => {
    try {
      const [backendAlerts, containmentStatus] = await Promise.all([
        fetchAlerts(),
        fetchContainmentStatus(),
      ]);

      if (backendAlerts && backendAlerts.length > 0) {
        setAlerts(backendAlerts);
      }
      if (containmentStatus && containmentStatus.contained_entities) {
        setContainedEntities(containmentStatus.contained_entities);
      }

      setSystemHealth(prev => ({ ...prev, api: 'CONNECTED', database: 'CONNECTED' }));
    } catch (err) {
      setSystemHealth(prev => ({ ...prev, api: 'DEGRADED' }));
    }
  }, []);

  // Live incoming event generator (simulates real-time Kafka/Wazuh stream)
  const generateLiveStreamEvent = useCallback(() => {
    if (isStreamingPaused) return;

    const servers = ['AUTH-01', 'PROD-API-03', 'K8S-NODE-07', 'DB-MAIN-02', 'EDGE-FW-01'];
    const users = ['alice', 'admin', 'pawan', 'dev_sarah', 'root', 'service_deploy'];
    const eventTypes = [
      'failed_login', 
      'successful_login', 
      'privilege_change', 
      'dns_txt_burst', 
      'unauthorized_access', 
      'ssh_brute_burst', 
      'sudo_token_reuse'
    ];
    const ips = ['192.168.1.50', '198.51.100.23', '10.0.4.112', '172.16.0.44', '198.51.100.12', '192.168.1.105'];
    const severities: ('LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL')[] = ['LOW', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

    const chosenSeverity = severities[Math.floor(Math.random() * severities.length)];
    const chosenUser = users[Math.floor(Math.random() * users.length)];
    const chosenIp = ips[Math.floor(Math.random() * ips.length)];
    const chosenServer = servers[Math.floor(Math.random() * servers.length)];
    const chosenType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

    const nowStr = new Date().toLocaleTimeString('en-US', { hour12: false });
    const newEvtId = `EVT-${eventCounterRef.current++}`;

    const newEvent: SecurityEvent = {
      id: newEvtId,
      timestamp: nowStr,
      server: chosenServer,
      user: chosenUser,
      event_type: chosenType,
      source_ip: chosenIp,
      severity: chosenSeverity
    };

    setEvents(prev => [newEvent, ...prev.slice(0, 75)]);

    // Trigger toast notification for CRITICAL / HIGH events
    if (chosenSeverity === 'CRITICAL' || chosenSeverity === 'HIGH') {
      setToastNotification({
        message: `⚡ [${chosenSeverity}] ${chosenType.toUpperCase()} from ${chosenIp} on ${chosenServer}`,
        severity: chosenSeverity
      });
      setTimeout(() => setToastNotification(null), 4000);
    }
  }, [isStreamingPaused]);

  // Main polling loop (every 2.5 seconds)
  useEffect(() => {
    syncTelemetry();
    const syncInterval = setInterval(syncTelemetry, 2500);
    const streamInterval = setInterval(generateLiveStreamEvent, 2000);

    return () => {
      clearInterval(syncInterval);
      clearInterval(streamInterval);
    };
  }, [syncTelemetry, generateLiveStreamEvent]);

  // Compute Overall Overview Metrics
  const computeOverviewMetrics = (): OverviewMetrics => {
    const activeCount = incidents.filter(i => i.status !== 'Resolved').length;
    const criticalCount = alerts.filter(a => a.severity === 'CRITICAL').length + incidents.filter(i => i.severity === 'CRITICAL' && i.status !== 'Resolved').length;
    const eps = Math.round(events.length * 1.4);
    
    const totalRisk = incidents.reduce((acc, curr) => acc + curr.risk_score, 0);
    const avgRisk = incidents.length > 0 ? Math.round(totalRisk / incidents.length) : 78;

    return {
      active_incidents: activeCount,
      active_incidents_trend: '+12% vs last 24h',
      critical_alerts: criticalCount,
      critical_alerts_trend: '+4 critical threats',
      events_per_sec: eps,
      events_per_sec_trend: 'Peak 240/s',
      average_risk_score: avgRisk,
      average_risk_score_trend: 'HIGH RISK (DEFCON 2)',
    };
  };

  const handlePauseStream = () => setIsStreamingPaused(true);
  const handleResumeStream = () => setIsStreamingPaused(false);
  const handleClearStream = () => setEvents([]);

  // Incident state modifiers
  const handleUpdateIncidentStatus = (incidentId: string, newStatus: 'Investigating' | 'Resolved' | 'Escalated') => {
    setIncidents(prev => prev.map(inc => {
      if (inc.incident_id === incidentId) {
        return { ...inc, status: newStatus };
      }
      return inc;
    }));
  };

  const handleAddIncidentNote = (incidentId: string, note: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.incident_id === incidentId) {
        const existingNotes = inc.notes || [];
        return { ...inc, notes: [...existingNotes, `${new Date().toLocaleTimeString()} - ${note}`] };
      }
      return inc;
    }));
  };

  return {
    events,
    alerts,
    incidents,
    containedEntities,
    systemHealth,
    isStreamingPaused,
    toastNotification,
    metrics: computeOverviewMetrics(),
    handlePauseStream,
    handleResumeStream,
    handleClearStream,
    handleUpdateIncidentStatus,
    handleAddIncidentNote,
    syncTelemetry,
    setContainedEntities
  };
}
