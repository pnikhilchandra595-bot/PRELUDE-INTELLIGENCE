import os
import sys
import json
from dotenv import load_dotenv

sys.path.insert(0, os.path.abspath("."))
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
load_dotenv()

from backend.hindsight.client import HindsightClient
from backend.llm.groq_client import GroqClientWrapper
from backend.services.content_service import ContentStrategyService
from backend.services.feedback_service import FeedbackSynthesizerService
from backend.services.brief_service import BriefMeService

def test_pipeline():
    print("=" * 60)
    print("TESTING PERSON 2 MODULES END-TO-END")
    print("=" * 60)

    memory = HindsightClient()
    llm = GroqClientWrapper()

    # 1. Content Strategy
    print("\n[1] Testing Content Strategy Service...")
    content_svc = ContentStrategyService(memory, llm)
    log_res = content_svc.log_content_performance(
        title="Scaling Microservices with Serverless Containers",
        topic="Cloud Architecture",
        views=9800,
        shares=140,
        conversion_rate=0.042
    )
    print(f"  -> Ingested: {log_res['title']} (Memory ID: {log_res['memory_id']})")
    
    print("  -> Generating strategy recommendations for 'DevOps'...")
    strat_res = content_svc.generate_strategy_recommendations(target_topic="DevOps")
    print("  -> Recommendations generated:")
    print(f"     Assessment: {strat_res.get('performance_assessment')}")
    print(f"     Target Persona: {strat_res.get('target_persona')}")
    print(f"     Actionable angles: {strat_res.get('recommendations')}")

    # 2. Feedback Synthesizer
    print("\n[2] Testing Feedback Synthesizer Service...")
    feedback_svc = FeedbackSynthesizerService(memory, llm)
    fb_res = feedback_svc.ingest_feedback(
        raw_text="The billing CSV export failed again with HTTP 504 on 50k rows.",
        source="support_ticket",
        user_identifier="enterprise_client_99"
    )
    print(f"  -> Ingested feedback (Memory ID: {fb_res['memory_id']})")

    print("  -> Synthesizing feedback themes...")
    synth_res = feedback_svc.synthesize_themes(focus_area="Billing")
    print("  -> Synthesis complete:")
    print(f"     Overall Sentiment: {synth_res.get('overall_sentiment')}")
    print(f"     Themes found: {len(synth_res.get('themes', []))}")
    for t in synth_res.get("themes", []):
        print(f"       - {t.get('theme_name')} ({t.get('sentiment')}): {t.get('description')}")

    # 3. Cross-Module Brief Me
    print("\n[3] Testing Cross-Module /brief-me Service...")
    brief_svc = BriefMeService(memory, llm)
    query = "What should I know before calling Acme Corp regarding pricing and our billing performance?"
    print(f"  -> Query: '{query}'")
    brief_res = brief_svc.generate_brief(query=query)
    print("  -> Brief Result:")
    print(f"     Executive Summary: {brief_res.get('executive_summary')}")
    print(f"     Modules Represented: {brief_res.get('modules_represented')}")
    print(f"     Referenced Memories Count: {brief_res.get('referenced_memory_count')}")
    print("     Action Items:")
    for act in brief_res.get("action_items", []):
        print(f"       * {act}")

    print("\n" + "=" * 60)
    print("ALL PERSON 2 MODULES VERIFIED SUCCESSFULLY!")
    print("=" * 60)

if __name__ == "__main__":
    test_pipeline()
