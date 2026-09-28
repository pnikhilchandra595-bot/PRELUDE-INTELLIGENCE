from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List

from backend.hindsight.client import HindsightClient
from backend.llm.groq_client import GroqClientWrapper
from backend.services.content_service import ContentStrategyService
from backend.services.feedback_service import FeedbackSynthesizerService
from backend.services.brief_service import BriefMeService
from backend.services.crm_service import CRMAndCompetitorService

router = APIRouter(prefix="/api/v1")

# Singletons for services
memory_client = HindsightClient()
llm_client = GroqClientWrapper()

content_service = ContentStrategyService(memory_client, llm_client)
feedback_service = FeedbackSynthesizerService(memory_client, llm_client)
brief_service = BriefMeService(memory_client, llm_client)
crm_service = CRMAndCompetitorService(memory_client, llm_client)

# Pydantic Request Models
class ContentLogRequest(BaseModel):
    title: str = Field(..., examples=["Zero Downtime K8s Migration"])
    topic: str = Field(..., examples=["DevOps"])
    views: int = Field(default=0, examples=[5200])
    shares: int = Field(default=0, examples=[120])
    conversion_rate: float = Field(default=0.0, examples=[0.035])
    notes: Optional[str] = Field(default="", examples=["Strong reception on Reddit"])

class FeedbackIngestRequest(BaseModel):
    raw_text: str = Field(..., examples=["Billing export is taking too long to load."])
    source: str = Field(default="support_ticket", examples=["support_ticket"])
    user_identifier: str = Field(default="user_123", examples=["user_123"])
    metadata: Optional[Dict[str, Any]] = None

class BriefMeRequest(BaseModel):
    query: str = Field(..., examples=["What should I know before calling Acme Corp regarding pricing?"])
    role: Optional[str] = Field(default="executive", examples=["sales", "product", "executive", "marketing"])

class UserCorrectionRequest(BaseModel):
    query: str = Field(..., examples=["What is Acme Corp's compliance status?"])
    original_summary: str = Field(..., examples=["Acme Corp needs SOC2 compliance before Q4 renewal."])
    correction: str = Field(..., examples=["Acme Corp completed their SOC2 audit early on Sept 25th."])
    entity: Optional[str] = Field(default="Acme Corp", examples=["Acme Corp"])

# --- System Health Endpoints ---

@router.get("/health")
def health_check():
    return {
        "status": "ok",
        "hindsight_mode": "live" if memory_client.is_live else "mock",
        "groq_primary_model": llm_client.primary_model,
        "groq_fallback_model": llm_client.fallback_model
    }

@router.get("/test-groq")
def test_groq_connection():
    """Smoke test the Groq LLM API directly."""
    try:
        res = llm_client.chat_completion(
            messages=[{"role": "user", "content": "Respond with the word 'CONNECTED' and nothing else."}],
            max_tokens=20
        )
        return {"status": "success", "result": res}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq API connection test failed: {str(e)}")

# --- Content Strategy Endpoints ---

@router.get("/content")
def get_content_list(
    topic: Optional[str] = Query(default=None),
    search: Optional[str] = Query(default=None),
    sort: Optional[str] = Query(default=None)
):
    try:
        result = content_service.list_content_pieces(topic=topic, search=search, sort=sort)
        return {"data": result, "error": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/content")
def log_content(req: ContentLogRequest):
    try:
        result = content_service.log_content_performance(
            title=req.title,
            topic=req.topic,
            views=req.views,
            shares=req.shares,
            conversion_rate=req.conversion_rate,
            notes=req.notes
        )
        return {"data": result, "error": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/content/recommendations")
def get_content_recommendations(topic: str = Query(..., description="Target content topic")):
    try:
        result = content_service.generate_strategy_recommendations(target_topic=topic)
        return {"data": result, "error": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- Feedback Synthesizer Endpoints ---

@router.get("/feedback/themes")
def get_feedback_themes():
    """Returns feedback themes and trends matching React frontend schema."""
    try:
        result = feedback_service.get_feedback_themes_response()
        return {"data": result, "error": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/feedback")
def ingest_feedback(req: FeedbackIngestRequest):
    try:
        result = feedback_service.ingest_feedback(
            raw_text=req.raw_text,
            source=req.source,
            user_identifier=req.user_identifier,
            metadata=req.metadata
        )
        return {"data": result, "error": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/feedback/synthesis")
def synthesize_feedback(focus_area: str = Query(default="all", description="Focus area or feature")):
    try:
        result = feedback_service.synthesize_themes(focus_area=focus_area)
        return {"data": result, "error": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- Competitor Intelligence Endpoints ---

@router.get("/competitors")
def list_competitors():
    try:
        result = crm_service.get_competitors()
        return {"data": result, "error": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/competitors/{id}/timeline")
def get_competitor_timeline(
    id: str,
    from_date: Optional[str] = Query(default=None, alias="from"),
    to_date: Optional[str] = Query(default=None, alias="to")
):
    try:
        result = crm_service.get_competitor_timeline(competitor_id=id, from_date=from_date, to_date=to_date)
        return {"data": result, "error": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- Contact & Meeting Prep Endpoints ---

@router.get("/contacts")
def list_contacts():
    try:
        result = crm_service.get_contacts_list()
        return {"data": result, "error": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/contacts/{id}/brief")
def get_contact_brief(id: str):
    brief = crm_service.get_contact_brief(contact_id=id)
    if not brief:
        raise HTTPException(
            status_code=404,
            detail={"code": "NOT_FOUND", "message": f"Contact with ID '{id}' was not found."}
        )
    return {"data": brief, "error": None}

# --- Flagship Cross-Module Brief Me Endpoint ---

@router.post("/brief-me")
def brief_me(req: BriefMeRequest):
    try:
        result = brief_service.generate_brief(query=req.query, role=req.role or "executive")
        return {"data": result, "error": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- Self-Correction Loop Endpoint ---

@router.post("/correction")
def submit_correction(req: UserCorrectionRequest):
    try:
        result = brief_service.record_user_correction(
            query=req.query,
            original_summary=req.original_summary,
            correction=req.correction,
            entity=req.entity
        )
        return {"data": result, "error": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- Marketing Campaigns Endpoints ---

class CampaignBriefRequest(BaseModel):
    audience: str
    goal: str

class OnboardRequest(BaseModel):
    entity: Optional[str] = "Acme Corp"

_campaigns_store = [
    {
        "id": "cmp-1",
        "name": "Q4 Enterprise Reliability & Scale Offensive",
        "channel": "linkedin",
        "status": "active",
        "start_date": "2026-09-01",
        "end_date": "2026-10-31",
        "budget": 24000,
        "leads_generated": 142,
        "conversions": 18,
        "cpa": 169,
        "key_message": "Sub-millisecond memory sync with zero export timeouts. Proven on dedicated enterprise pods.",
        "hindsight_memory_id": "mem_camp_1104",
        "audience": "VPs of Engineering & Directors of Platform",
        "recommended_by_hindsight": True
    },
    {
        "id": "cmp-2",
        "name": "Displacing ApexCloud: The Cold-Start Reality",
        "channel": "email",
        "status": "active",
        "start_date": "2026-09-18",
        "end_date": "2026-10-15",
        "budget": 12000,
        "leads_generated": 88,
        "conversions": 11,
        "cpa": 136,
        "key_message": "Don't trade a 20% discount for 8-second vector cold starts and surprise egress fees.",
        "hindsight_memory_id": "mem_camp_1105",
        "audience": "Engineering Leaders with Upcoming Cloud Renewals",
        "recommended_by_hindsight": True
    }
]

@router.get("/campaigns")
def list_campaigns():
    return {"data": _campaigns_store, "error": None}

@router.post("/campaigns")
def create_campaign(camp: Dict[str, Any]):
    camp["id"] = f"cmp-{len(_campaigns_store) + 1}"
    _campaigns_store.insert(0, camp)
    return {"data": camp, "error": None}

@router.post("/campaign-brief")
def generate_campaign_brief(req: CampaignBriefRequest):
    return {
        "data": {
            "title": f"Strategic Campaign: {req.goal[:40]}...",
            "target_audience": req.audience,
            "core_narrative": f"Focus on eliminating cross-department context friction for {req.audience}. Grounded in recent customer feedback regarding export timeouts and competitive discount threats.",
            "recommended_channels": ["linkedin", "email", "webinar"],
            "key_talking_points": [
                "Zero-latency institutional memory across Sales, Product, and Support.",
                "Sub-150ms recall vs competitor 8-second cold start latency.",
                "All-inclusive enterprise pricing with dedicated pod isolation."
            ],
            "competitor_counter_angles": [
                "Counter ApexCloud's 20% discount by highlighting unannounced credit egress surcharges.",
                "Highlight our SHA-256 cryptographic provenance verification."
            ],
            "relevant_memory_sources": [
                {"module": "competitor", "claim": "ApexCloud 20% price cut on Sept 15"},
                {"module": "meeting", "claim": "Jane Doe reiterated $80k hard budget cap"}
            ]
        },
        "error": None
    }

# --- Onboard Simulator Endpoint ---

@router.post("/onboard")
def onboard_entity(req: OnboardRequest):
    entity = req.entity or "Acme Corp"
    return {
        "data": {
            "entity": entity,
            "status": "completed",
            "ingested_nodes": 14,
            "linked_memories": 8,
            "detected_contradictions": 1,
            "signals": [
                {"type": "crm", "description": f"Imported meeting logs and pipeline stage for {entity}"},
                {"type": "support", "description": f"Clustered 3 recurring Zendesk tickets regarding CSV timeouts"},
                {"type": "competitor", "description": f"Linked active competitor pricing threat from ApexCloud"}
            ]
        },
        "error": None
    }

# --- Memory Graph & Stats Endpoints ---

@router.get("/memory/stats")
def get_memory_stats():
    return {
        "data": {
            "total_memories": 342,
            "active_entities": 48,
            "contradictions_resolved": 12,
            "weekly_growth": [
                {"week": "W1 Aug", "memories": 45, "cumulative": 180},
                {"week": "W2 Aug", "memories": 52, "cumulative": 232},
                {"week": "W3 Aug", "memories": 38, "cumulative": 270},
                {"week": "W4 Aug", "memories": 41, "cumulative": 311},
                {"week": "W1 Sep", "memories": 31, "cumulative": 342}
            ]
        },
        "error": None
    }

@router.post("/replay")
def replay_time_machine(weeks: int = Query(default=1)):
    return {
        "data": {
            "simulated_weeks": weeks,
            "new_memories_added": weeks * 28,
            "new_total": 342 + (weeks * 28),
            "events_simulated": [
                f"Simulated {weeks * 4} new customer touchpoints",
                f"Ingested {weeks * 3} competitor intelligence signals"
            ]
        },
        "error": None
    }

