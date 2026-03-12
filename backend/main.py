from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
import random
import datetime
import requests

import models
from database import engine, get_db

# Create all tables in the engine
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Civic Avatar API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- SEED INITIAL DATA -----------------
@app.on_event("startup")
def seed_data():
    db = next(get_db())
    if db.query(models.EscalationQueue).count() == 0:
        escalations = [
            models.EscalationQueue(id="#E-9921", issue_type="Complex Policy Query", wait_time_seconds=165, severity="HIGH"),
            models.EscalationQueue(id="#E-9922", issue_type="Emotional Distress", wait_time_seconds=72, severity="CRITICAL"),
            models.EscalationQueue(id="#E-9925", issue_type="Dialect Mismatch", wait_time_seconds=330, severity="MEDIUM"),
        ]
        db.add_all(escalations)
        
        logs = [
            models.ProvenanceLog(timestamp="14:02:12", status="SYNC_OK", title="Core Identity Re-Verification", description="Neural weights successfully validated against Ministry of Electronics DB."),
            models.ProvenanceLog(timestamp="13:58:45", status="SYS_UPDATE", title="Tone Adjustment Module", description="Formal protocol increased by 12% following user interaction feedback logs."),
        ]
        db.add_all(logs)

        campaigns = [
            models.Campaign(title="Drain Cleaning Awareness", target_demographic="Block B", status="ACTIVE", calls_made=142),
            models.Campaign(title="Vaccination Drive Reminder", target_demographic="Elderly > 60", status="PAUSED", calls_made=1050)
        ]
        db.add_all(campaigns)

        db.commit()


# ----------------- SCHEMAS -----------------
class TownhallRequest(BaseModel):
    query: str
    language: str = "auto"
class TownhallResponse(BaseModel):
    response_text: str
    source_citation: str
    c2pa_verified: bool = True
    latency_ms: int

class GrievanceCreate(BaseModel):
    citizen_id: str
    description: str
class GrievanceResponse(BaseModel):
    id: str
    status: str
    created_at: datetime.datetime

class EscalationQueueResp(BaseModel):
    id: str
    issue_type: str
    wait_time: str
    severity: str

class ProvenanceLogResp(BaseModel):
    timestamp: str
    status: str
    title: str
    description: str

class CampaignResp(BaseModel):
    id: int
    title: str
    target_demographic: str
    status: str
    calls_made: int


# ----------------- TOWNHALL -----------------
@app.post("/api/chat/townhall", response_model=TownhallResponse)
async def chat_townhall(req: TownhallRequest, db: Session = Depends(get_db)):
    responses = [
        ("Phase 2 of the Digital Goals 2026 includes full spectrum coverage for Block B starting next quarter.", "Telecom Strategy Doc (Pg 42)"),
        ("The new compliance rules mandate C2PA signatures on all municipal notices.", "IT Ministry Guidelines 2026"),
        ("Grievance redressal SLA has been reduced to 48 hours for civic issues.", "Delhi Civic Ordinance 24/A")
    ]
    resp, source = random.choice(responses)
    
    # Log the interaction cryptographically in db (simulated via ProvenanceLog)
    new_log = models.ProvenanceLog(
        timestamp=datetime.datetime.now().strftime("%H:%M:%S"),
        status="SYNC_OK",
        title="Townhall Query Processed",
        description=f"Query '{req.query[:20]}...' securely verified via RAG pipelines."
    )
    db.add(new_log)
    db.commit()

    return TownhallResponse(
        response_text=f"{resp}",
        source_citation=source,
        latency_ms=random.randint(40, 120)
    )

# ----------------- SERVICE MODE (NEW) -----------------
@app.post("/api/service/grievance", response_model=GrievanceResponse)
async def file_grievance(req: GrievanceCreate, db: Session = Depends(get_db)):
    # Generate unique ID
    g_id = f"#G-{random.randint(10000, 99999)}"
    
    # Basic issue categorization
    severity = "MEDIUM"
    if "urgent" in req.description.lower() or "emergency" in req.description.lower():
        severity = "CRITICAL"

    grievance = models.Grievance(
        id=g_id,
        citizen_id=req.citizen_id,
        description=req.description,
        issue_type="Service Request",
        severity=severity
    )
    db.add(grievance)

    # For hackathon demo: Escalate critical stuff directly to queue
    if severity == "CRITICAL":
        esc = models.EscalationQueue(
            id=g_id,
            issue_type="Escalated Grievance",
            wait_time_seconds=0,
            severity="CRITICAL"
        )
        db.add(esc)

    db.commit()
    db.refresh(grievance)
    return grievance

@app.get("/api/service/grievances", response_model=List[GrievanceResponse])
async def list_grievances(db: Session = Depends(get_db)):
    return db.query(models.Grievance).order_by(models.Grievance.created_at.desc()).all()

# ----------------- OUTREACH MODE (NEW) -----------------
@app.get("/api/outreach/campaigns", response_model=List[CampaignResp])
async def list_campaigns(db: Session = Depends(get_db)):
    return db.query(models.Campaign).all()

@app.post("/api/outreach/campaign/{campaign_id}/trigger", response_model=CampaignResp)
async def trigger_calls(campaign_id: int, db: Session = Depends(get_db)):
    campaign = db.query(models.Campaign).filter(models.Campaign.id == campaign_id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    # Simulate making calls
    campaign.calls_made += random.randint(5, 15)
    db.commit()
    db.refresh(campaign)

    new_log = models.ProvenanceLog(
        timestamp=datetime.datetime.now().strftime("%H:%M:%S"),
        status="SYS_WARN",
        title=f"Campaign ID {campaign_id} Triggered",
        description=f"Outbound calling nodes activated. Batches running in asynchronous threads."
    )
    db.add(new_log)
    db.commit()
    return campaign

# ----------------- OPERATIONS DASHBOARD -----------------
@app.get("/api/queue/escalation", response_model=List[EscalationQueueResp])
async def get_escalation_queue(db: Session = Depends(get_db)):
    items = db.query(models.EscalationQueue).all()
    out = []
    
    def format_time(seconds):
        mins, secs = divmod(seconds, 60)
        return f"{mins:02d}m {secs:02d}s"

    for item in items:
        out.append(EscalationQueueResp(
            id=item.id,
            issue_type=item.issue_type,
            wait_time=format_time(item.wait_time_seconds),
            severity=item.severity
        ))
        # Keep wait times moving forward in db
        item.wait_time_seconds += 15
    db.commit()
    return out

@app.get("/api/logs/provenance", response_model=List[ProvenanceLogResp])
async def get_provenance_logs(db: Session = Depends(get_db)):
    return db.query(models.ProvenanceLog).order_by(models.ProvenanceLog.id.desc()).limit(10).all()

# ----------------- HEYGEN INTEGRATION -----------------
HEYGEN_API_KEY = "sk_V2_hgu_ka6fVmQajCd_NBx6MStsIZL1bCql3eqmwfdUogveAJ9C"

@app.post("/api/heygen/token")
async def get_heygen_token():
    try:
        res = requests.post(
            "https://api.heygen.com/v1/streaming.create_token",
            headers={"x-api-key": HEYGEN_API_KEY}
        )
        res.raise_for_status()
        return res.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
