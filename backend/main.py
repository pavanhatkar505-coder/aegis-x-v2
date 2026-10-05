from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="AEGIS-X Controller")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Telemetry(BaseModel):
    server_id: str
    failed_logins: int
    source_ip: str

incidents = []

@app.get("/health")
def health():
    return {"status": "online", "service": "main-controller"}

@app.post("/detect")
def detect(event: Telemetry):
    if event.failed_logins >= 10:
        incident = {
            "incident_id": f"INC-{len(incidents)+1:03}",
            "server_id": event.server_id,
            "type": "AUTH_BRUTE_FORCE",
            "severity": "CRITICAL",
            "risk": 87,
            "source_ip": event.source_ip,
            "actions": [
                "RESTRICT_ACCESS",
                "ENABLE_FIREWALL",
                "BLOCK_SOURCE"
            ]
        }
        incidents.append(incident)
        return {"detected": True, "incident": incident}

    return {"detected": False}

@app.get("/incidents")
def get_incidents():
    return incidents
