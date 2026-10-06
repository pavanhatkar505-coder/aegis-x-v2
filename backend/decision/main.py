from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI(title="AEGIS-X Decision Engine")


class Action(BaseModel):
    action_id: str
    risk_reduction: float
    coverage: float
    disruption: float


class OptimizeRequest(BaseModel):
    actions: List[Action]


@app.get("/health")
def health():
    return {
        "status": "online",
        "service": "decision-engine"
    }


@app.post("/pre-optimize")
def optimize(req: OptimizeRequest):

    ranked = []

    for action in req.actions:
        score = (
            action.risk_reduction * 0.55
            + action.coverage * 0.35
            - action.disruption * 0.20
        )

        ranked.append({
            "action_id": action.action_id,
            "score": round(score, 2)
        })

    ranked.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    for index, item in enumerate(ranked):
        item["rank"] = index + 1

    return {"rankings": ranked}

# ==========================================================
# AEGIS-X OUTCOME MEMORY
# ==========================================================

outcome_memory = []

@app.get("/memory/{incident_type}")
def get_memory(incident_type: str):

    matches = [
        item for item in outcome_memory
        if item["incident_type"] == incident_type
    ]

    if len(matches) == 0:
        return {
            "history_available": False,
            "similar_cases": 0,
            "status": "NEW_SCENARIO",
            "message": "No previous outcome. Vortex simulation required."
        }

    return {
        "history_available": True,
        "similar_cases": len(matches),
        "outcomes": matches
    }


class MemoryRecord(BaseModel):
    incident_type: str
    action: str
    risk_before: float
    risk_after: float
    disruption: float
    successful: bool


@app.post("/memory")
def store_memory(record: MemoryRecord):

    data = record.model_dump()

    outcome_memory.append(data)

    return {
        "stored": True,
        "total_cases": len(outcome_memory),
        "record": data
    }
class IncidentRequest(BaseModel):
    incident_id: str
    incident_type: str
    server_id: str
    risk_score: float


@app.post("/analyze")
def analyze_incident(req: IncidentRequest):

    actions = [
        {
            "action_id": "ENABLE_FIREWALL",
            "risk_reduction": 40,
            "coverage": 92,
            "disruption": 8
        },
        {
            "action_id": "BLOCK_SOURCE",
            "risk_reduction": 28,
            "coverage": 78,
            "disruption": 3
        },
        {
            "action_id": "RESTRICT_ACCESS",
            "risk_reduction": 45,
            "coverage": 96,
            "disruption": 60
        }
    ]

    ranked = []

    for action in actions:

        score = (
            action["risk_reduction"] * 0.55
            + action["coverage"] * 0.35
            - action["disruption"] * 0.20
        )

        ranked.append({
            **action,
            "score": round(score, 2)
        })

    ranked.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    for index, item in enumerate(ranked):
        item["rank"] = index + 1

    memory_matches = [
        item for item in outcome_memory
        if item["incident_type"] == req.incident_type
    ]

    return {
        "incident": {
            "id": req.incident_id,
            "type": req.incident_type,
            "server": req.server_id,
            "risk": req.risk_score
        },

        "memory": {
            "history_available": len(memory_matches) > 0,
            "similar_cases": len(memory_matches)
        },

        "decision_state":
            "MEMORY_AVAILABLE"
            if len(memory_matches) > 0
            else "SIMULATION_REQUIRED",

        "candidate_actions": ranked
    }
