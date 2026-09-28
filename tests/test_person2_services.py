import pytest
from backend.hindsight.client import HindsightClient
from backend.llm.groq_client import GroqClientWrapper
from backend.services.content_service import ContentStrategyService
from backend.services.feedback_service import FeedbackSynthesizerService
from backend.services.brief_service import BriefMeService

@pytest.fixture
def memory_client():
    return HindsightClient()

@pytest.fixture
def llm_client():
    return GroqClientWrapper()

def test_content_strategy_service(memory_client, llm_client):
    service = ContentStrategyService(memory_client, llm_client)
    res = service.log_content_performance(
        title="CI/CD Pipeline Best Practices",
        topic="DevOps",
        views=3200,
        shares=40
    )
    assert res["status"] == "success"
    assert res["memory_id"].startswith("mem_")

def test_feedback_synthesizer_service(memory_client, llm_client):
    service = FeedbackSynthesizerService(memory_client, llm_client)
    res = service.ingest_feedback(
        raw_text="The login screen frequently fails with CORS errors.",
        source="support_ticket"
    )
    assert res["status"] == "success"
    assert res["memory_id"].startswith("mem_")

def test_brief_service_cross_module(memory_client, llm_client):
    service = BriefMeService(memory_client, llm_client)
    brief = service.generate_brief("What are the key concerns regarding Acme Corp?")
    assert "executive_summary" in brief
    assert "action_items" in brief
    assert len(brief["action_items"]) > 0
    assert brief["referenced_memory_count"] > 0
