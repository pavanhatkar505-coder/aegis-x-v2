import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  Brain,
  ChevronRight,
  Network,
  Play,
  Server,
  Shield,
  ShieldCheck,
  Zap
} from "lucide-react";

import "./App.css";

function App() {const [decisionOpen, setDecisionOpen] = useState(false);
const [loading, setLoading] = useState(false);
const [analysis, setAnalysis] = useState<any>(null);

async function investigate() {
  setDecisionOpen(true);
  setLoading(true);

  try {
    const response = await fetch("http://localhost:8002/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        incident_id: "INC-001",
        incident_type: "AUTH_BRUTE_FORCE",
        server_id: "SERVER-02",
        risk_score: 87
      })
    });

    const data = await response.json();
    setAnalysis(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="app">

      <aside className="sidebar">

        <div className="logo">
          <div className="logoIcon">
            <Shield size={22}/>
          </div>

          <div>
            <strong>AEGIS-X</strong>
            <span>DECISION INTELLIGENCE</span>
          </div>
        </div>

        <div className="navTitle">OPERATIONS</div>

        <button className="nav active">
          <Activity size={18}/>
          Command Center
        </button>

        <button className="nav">
          <AlertTriangle size={18}/>
          Incidents
        </button>

        <button className="nav">
          <Network size={18}/>
          Infrastructure
        </button>

        <div className="navTitle">INTELLIGENCE</div>

        <button className="nav">
          <Zap size={18}/>
          Vortex
        </button>

        <button className="nav">
          <Brain size={18}/>
          Outcome Memory
        </button>

        <div className="systemBox">
          <div className="greenDot"/>
          SYSTEM NOMINAL
          <span>4 nodes connected</span>
        </div>

      </aside>


      <main className="main">

        <header>

          <div>
            <div className="eyebrow">
              SECURITY OPERATIONS
            </div>

            <h1>Command Center</h1>

            <p>
              Autonomous security decision intelligence
            </p>
          </div>

          <div className="live">
            <span/>
            LIVE
          </div>

        </header>


        <section className="stats">

          <div className="stat">
            <Server/>
            <div>
              <span>CONNECTED NODES</span>
              <strong>03</strong>
            </div>
          </div>

          <div className="stat danger">
            <AlertTriangle/>
            <div>
              <span>ACTIVE INCIDENTS</span>
              <strong>01</strong>
            </div>
          </div>

          <div className="stat">
            <ShieldCheck/>
            <div>
              <span>SECURITY POSTURE</span>
              <strong>82%</strong>
            </div>
          </div>

          <div className="stat danger">
            <Activity/>
            <div>
              <span>CURRENT RISK</span>
              <strong>87</strong>
            </div>
          </div>

        </section>


        <div className="grid">

          <section className="panel topology">

            <div className="panelHeader">
              <div>
                <span>LIVE TOPOLOGY</span>
                <h2>Infrastructure</h2>
              </div>

              <div className="monitoring">
                ● MONITORING
              </div>
            </div>


            <div className="network">

              <div className="attacker">
                <AlertTriangle/>
                <strong>185.220.101.4</strong>
                <span>THREAT SOURCE</span>
              </div>

              <div className="attackLine">
                <span>BRUTE FORCE</span>
              </div>

              <div className="servers">

                <div className="serverNode">
                  <Server/>
                  <strong>SERVER-01</strong>
                  <span>HEALTHY</span>
                </div>

                <div className="serverNode compromised">
                  <AlertTriangle/>
                  <strong>SERVER-02</strong>
                  <span>UNDER ATTACK</span>
                </div>

                <div className="serverNode">
                  <Server/>
                  <strong>SERVER-03</strong>
                  <span>HEALTHY</span>
                </div>

              </div>

            </div>

          </section>


          <section className="panel incident">

            <div className="criticalLabel">
              CRITICAL INCIDENT
            </div>

            <h2>Authentication Brute Force</h2>

            <p className="incidentId">
              INC-001 • SERVER-02
            </p>


            <div className="riskCircle">
              <strong>87</strong>
              <span>RISK</span>
            </div>


            <div className="details">

              <div>
                <span>SOURCE</span>
                <strong>185.220.101.4</strong>
              </div>

              <div>
                <span>FAILED LOGINS</span>
                <strong>25</strong>
              </div>

              <div>
                <span>SEVERITY</span>
                <strong className="red">
                  CRITICAL
                </strong>
              </div>

            </div>


           <button className="investigate" onClick={investigate}>
              INVESTIGATE DECISION
             <ChevronRight size={18}/>
            </button>

          </section>

        </div>


        <section className="decisionStrip">

          <div className="decisionIcon">
            <Zap/>
          </div>

          <div>
            <span>DECISION REQUIRED</span>
            <strong>
              Remediation candidates ready for simulation
            </strong>
          </div>

          <div className="actions">
            3 ACTIONS
          </div>

          <button>
            <Play size={16}/>
            OPEN DECISION LAYER
          </button>

        </section>

      </main>
{decisionOpen && (
  <div className="decisionTest">
    {loading && <p>Analyzing...</p>}

    {!loading && analysis && (
      <p>
        Decision Engine connected — {analysis.decision_state}
      </p>
    )}
  </div>
)}

    </div>
  );
}

export default App;
