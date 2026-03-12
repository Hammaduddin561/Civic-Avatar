from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from database import Base
import datetime

class Grievance(Base):
    __tablename__ = "grievances"

    id = Column(String, primary_key=True, index=True) # e.g. G-88219
    citizen_id = Column(String)
    issue_type = Column(String)
    description = Column(String)
    status = Column(String, default="OPEN") # OPEN, IN_PROGRESS, RESOLVED
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    severity = Column(String, default="MEDIUM") # LOW, MEDIUM, HIGH, CRITICAL

class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    target_demographic = Column(String)
    status = Column(String) # ACTIVE, COMPLETED, PAUSED
    calls_made = Column(Integer, default=0)

class EscalationQueue(Base):
    __tablename__ = "escalation_queue"

    id = Column(String, primary_key=True, index=True) # Matches grievance ID typically
    issue_type = Column(String)
    wait_time_seconds = Column(Integer, default=0)
    severity = Column(String)
    is_intercepted = Column(Boolean, default=False)

class ProvenanceLog(Base):
    __tablename__ = "provenance_logs"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(String) 
    status = Column(String) # SYNC_OK, SYS_UPDATE, SYS_WARN
    title = Column(String)
    description = Column(String)
