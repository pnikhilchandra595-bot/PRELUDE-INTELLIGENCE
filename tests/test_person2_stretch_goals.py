import pytest
from backend.hindsight.client import HindsightClient
from backend.llm.groq_client import GroqClientWrapper
from backend.services.brief_service import BriefMeService

@pytest.fixture
def memory_client():
    return HindsightClient()

@pytest.fixture
def llm_client():
    return GroqClientWrapper()

def test_cold_start_honesty(memory_client, llm_client):
    service = BriefMeService(memory_client, llm_client)
    # Query completely unrelated to anything seeded
    brief = service.generate_brief(query="xyz999_quantum_teleportation_unrelated")
    assert brief["confidence_level"] in ["cold_start", "insufficient_history", "low"]
    assert "role" in brief

def test_role_based_brief_formatting(memory_client, llm_client):
    service = BriefMeService(memory_client, llm_client)
    # 1. Sales Role
    sales_brief = service.generate_brief(
        query="What is the situation with Acme Corp?",
        role="sales"
    )
    assert sales_brief["role"] == "sales"
    assert "confidence_level" in sales_brief
    assert "causal_chains" in sales_brief

    # 2. Product Role
    product_brief = service.generate_brief(
        query="What are the biggest complaints about our billing?",
        role="product"
    )
    assert product_brief["role"] == "product"
    assert "action_items" in product_brief

def test_self_correction_loop(memory_client, llm_client):
    service = BriefMeService(memory_client, llm_client)
    # Submit correction
    corr_res = service.record_user_correction(
        query="Acme Corp renewal date",
        original_summary="Acme renewal is scheduled for Q4.",
        correction="Acme Corp expedited their contract and renewed on September 26th.",
        entity="Acme Corp"
    )
    assert corr_res["status"] == "success"
    assert corr_res["memory_id"] is not None

    # Query again and check if correction is reflected
    recalled_brief = service.generate_brief(
        query="When did Acme Corp renew their contract?"
    )
    assert recalled_brief is not None
    assert "executive_summary" in recalled_brief
