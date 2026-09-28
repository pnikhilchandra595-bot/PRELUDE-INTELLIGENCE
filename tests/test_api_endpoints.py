from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_health():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "groq_primary_model" in data

def test_content_endpoints():
    # 1. Post content
    post_res = client.post(
        "/api/v1/content",
        json={
            "title": "Automating Multi-Cloud Failover",
            "topic": "DevOps",
            "views": 4500,
            "shares": 50,
            "conversion_rate": 0.03
        }
    )
    assert post_res.status_code == 200
    assert post_res.json()["data"]["status"] == "success"

    # 2. Get content list
    list_res = client.get("/api/v1/content?topic=DevOps")
    assert list_res.status_code == 200
    items = list_res.json()["data"]
    assert len(items) > 0
    assert "title" in items[0]
    assert "views" in items[0]

def test_feedback_endpoints():
    post_res = client.post(
        "/api/v1/feedback",
        json={
            "raw_text": "The CSV export is running slowly for large accounts.",
            "source": "support_ticket",
            "user_identifier": "test_user_1"
        }
    )
    assert post_res.status_code == 200
    assert post_res.json()["data"]["status"] == "success"

    # Get feedback themes matching frontend schema
    themes_res = client.get("/api/v1/feedback/themes")
    assert themes_res.status_code == 200
    data = themes_res.json()["data"]
    assert "themes" in data
    assert "sentiment_trend" in data
    assert len(data["themes"]) > 0

def test_competitor_and_contact_endpoints():
    # Competitors
    comp_res = client.get("/api/v1/competitors")
    assert comp_res.status_code == 200
    assert len(comp_res.json()["data"]) > 0

    timeline_res = client.get("/api/v1/competitors/comp-apex/timeline")
    assert timeline_res.status_code == 200
    assert len(timeline_res.json()["data"]) > 0

    # Contacts
    contacts_res = client.get("/api/v1/contacts")
    assert contacts_res.status_code == 200
    assert len(contacts_res.json()["data"]) > 0

    brief_res = client.get("/api/v1/contacts/cont-sarah/brief")
    assert brief_res.status_code == 200
    data = brief_res.json()["data"]
    assert data["contact"] == "Sarah Chen"
    assert "summary" in data
    assert len(data["open_promises"]) > 0

def test_brief_me_dual_compatibility():
    brief_res = client.post(
        "/api/v1/brief-me",
        json={
            "query": "What should I know before calling Acme Corp?",
            "role": "sales"
        }
    )
    assert brief_res.status_code == 200
    data = brief_res.json()["data"]
    # Check frontend contract keys
    assert "synthesized_answer" in data
    assert "confidence_score" in data
    assert isinstance(data["confidence_score"], int)
    assert "key_takeaways" in data
    assert "recommended_action" in data
    assert "sources" in data
    # Check backend stretch keys
    assert "causal_chains" in data
    assert "action_items" in data
    assert "confidence_level" in data
