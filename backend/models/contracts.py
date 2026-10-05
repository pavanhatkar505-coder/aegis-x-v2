from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class TelemetryEvent(BaseModel):
    server_id: str
    event_type: str
    timestamp: str
    severity: str = "low"
    source: str = "agent"
    details: Dict[str, Any] = Field(default_factory=dict)


class Incident(BaseModel):
    incident_id: str
    server_id: str
    incident_type: str
    severity: str
    current_risk: float
    evidence: List[str] = Field(default_factory=list)


class RemediationAction(BaseModel):
    action_id: str
    action_type: str
    target: str

    expected_risk_reduction: float
    incident_coverage: float
    asset_importance: float
    compliance_benefit: float
    expected_disruption: float


class HistoricalOutcome(BaseModel):
    similar_cases: int = 0
    history_available: bool = False
    success_rate: Optional[float] = None
    average_risk_reduction: Optional[float] = None


class SimulationResult(BaseModel):
    simulation_id: str
    action_id: str
    server_id: str

    passed: bool

    before_risk: float
    after_risk: float

    security_effectiveness: float
    operational_disruption: float
    services_preserved: bool

    new_issues: List[str] = Field(default_factory=list)


class RankedAction(BaseModel):
    action_id: str
    score: float
    rank: int
    reason: str


class DecisionResult(BaseModel):
    incident_id: str
    phase: str
    rankings: List[RankedAction]
