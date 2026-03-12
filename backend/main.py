from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
from typing import List

app = FastAPI(title="Civic Avatar API")

# Configure CORS for the frontend (React Vite default port is 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TownhallRequest(BaseModel):
    query: str
    language: str = "auto"

class TownhallResponse(BaseModel):
    response_text: str
    source_citation: str
    c2pa_verified: bool = True
    latency_ms: int

@app.post("/api/chat/townhall", response_model=TownhallResponse)
async def chat_townhall(req: TownhallRequest):
    # Simulated RAG response
    responses = [
        ("Phase 2 of the Digital Goals 2026 includes full spectrum coverage for Block B starting next quarter.", "Telecom Strategy Doc (Pg 42)"),
        ("The new compliance rules mandate C2PA signatures on all municipal notices.", "IT Ministry Guidelines 2026"),
        ("Grievance redressal SLA has been reduced to 48 hours for civic issues.", "Delhi Civic Ordinance 24/A")
    ]
    resp, source = random.choice(responses)
    
    return TownhallResponse(
        response_text=f"{resp} (Query received: '{req.query}')",
        source_citation=source,
        latency_ms=random.randint(40, 120)
    )

class TicketEscalation(BaseModel):
    id: str
    issue_type: str
    wait_time: str
    severity: str

@app.get("/api/queue/escalation", response_model=List[TicketEscalation])
async def get_escalation_queue():
    return [
        {"id": "#E-9921", "issue_type": "Complex Policy Query", "wait_time": "02m 45s", "severity": "HIGH"},
        {"id": "#E-9922", "issue_type": "Emotional Distress", "wait_time": "01m 12s", "severity": "CRITICAL"},
        {"id": "#E-9925", "issue_type": "Dialect Mismatch", "wait_time": "05m 30s", "severity": "MEDIUM"},
    ]

class ProvenanceLog(BaseModel):
    timestamp: str
    status: str
    title: str
    description: str

@app.get("/api/logs/provenance", response_model=List[ProvenanceLog])
async def get_provenance_logs():
    return [
        {"timestamp": "14:02:12", "status": "SYNC_OK", "title": "Core Identity Re-Verification", "description": "Neural weights successfully validated against Ministry of Electronics DB."},
        {"timestamp": "13:58:45", "status": "SYS_UPDATE", "title": "Tone Adjustment Module", "description": "Formal protocol increased by 12% following user interaction feedback logs."},
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
