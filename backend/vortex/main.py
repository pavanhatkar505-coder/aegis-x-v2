from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid

app = FastAPI(title="AEGIS-X Vortex")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class SimulationRequest(BaseModel):
    server_id: str
    action: str
    current_risk: float

@app.get("/health")
def health():
    return {
        "status": "online",
        "service": "vortex"
    }

@app.post("/simulate")
def simulate(req: SimulationRequest):

    profiles = {
        "RESTRICT_ACCESS": {
            "risk_reduction": 45,
            "disruption": 60,
            "ssh": False,
            "web": True,
            "issues": ["SSH administration unavailable"]
        },
        "ENABLE_FIREWALL": {
            "risk_reduction": 40,
            "disruption": 8,
            "ssh": True,
            "web": True,
            "issues": []
        },
        "BLOCK_SOURCE": {
            "risk_reduction": 28,
            "disruption": 3,
            "ssh": True,
            "web": True,
            "issues": []
        }
    }

    profile = profiles.get(req.action)

    if profile is None:
        return {
            "success": False,
            "error": "Unknown remediation action"
        }

    after_risk = max(
        0,
        req.current_risk - profile["risk_reduction"]
    )

    return {
        "success": True,
        "simulation_id": "VX-" + uuid.uuid4().hex[:8].upper(),
        "server_id": req.server_id,
        "action": req.action,

        "before": {
            "risk": req.current_risk,
            "ssh": True,
            "web": True
        },

        "after": {
            "risk": after_risk,
            "ssh": profile["ssh"],
            "web": profile["web"]
        },

        "risk_reduction": profile["risk_reduction"],
        "operational_disruption": profile["disruption"],

        "services_preserved":
            profile["ssh"] and profile["web"],

        "issues": profile["issues"],

        "timeline": [
            "Snapshot captured",
            "Isolated twin created",
            "Remediation applied",
            "Services tested",
            "Security impact calculated",
            "Simulation completed"
        ]
    }
