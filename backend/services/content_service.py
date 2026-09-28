import logging
from typing import Dict, Any, List, Optional
from backend.hindsight.client import HindsightClient
from backend.llm.groq_client import GroqClientWrapper

logger = logging.getLogger(__name__)

class ContentStrategyService:
    def __init__(self, memory_client: HindsightClient, llm_client: GroqClientWrapper):
        self.memory = memory_client
        self.llm = llm_client
        self._content_store = [
            {
                "id": "cnt-1",
                "title": "The Silent Killer of Enterprise AI: Cross-Functional Context Amnesia",
                "topic": "Product Architecture",
                "url": "https://prelude.internal/blog/context-amnesia",
                "published_at": "2026-09-18",
                "views": 14850,
                "shares": 1420,
                "read_time_minutes": 7,
                "performance_score": 96,
                "format": "blog",
                "summary": "Why isolated vector search fails in cross-functional workflows, and how persistent memory bridges Sales, Product, and Marketing.",
                "is_anomaly": True
            },
            {
                "id": "cnt-2",
                "title": "Benchmarking Cognitive Memory vs Traditional RAG at Scale",
                "topic": "Engineering & AI",
                "url": "https://prelude.internal/whitepapers/memory-vs-rag",
                "published_at": "2026-09-11",
                "views": 11200,
                "shares": 890,
                "read_time_minutes": 14,
                "performance_score": 92,
                "format": "whitepaper",
                "summary": "Empirical analysis showing a 68% reduction in hallucination when using evolving graph memory vs flat embedding stores."
            },
            {
                "id": "cnt-3",
                "title": "Case Study: How Acme Corp Identified $140k in Billing Friction with Prelude",
                "topic": "Customer Success",
                "url": "https://prelude.internal/case-studies/acme-corp",
                "published_at": "2026-09-04",
                "views": 8400,
                "shares": 610,
                "read_time_minutes": 6,
                "performance_score": 88,
                "format": "case_study",
                "summary": "Jane Doe and her engineering team connected customer support ticket patterns directly to renewal risk before customer churn occurred."
            },
            {
                "id": "cnt-4",
                "title": "Mastering Enterprise Contract Negotiations in a Shifting Cloud Market",
                "topic": "Sales Strategy",
                "url": "https://prelude.internal/webinars/enterprise-negotiation",
                "published_at": "2026-08-28",
                "views": 6700,
                "shares": 430,
                "read_time_minutes": 45,
                "performance_score": 79,
                "format": "webinar",
                "summary": "Tactical playbooks for counteracting competitor price cuts and feature parity claims using customer historical telemetry."
            },
            {
                "id": "cnt-5",
                "title": "Why Real-Time CSV Billing Exports Are Mission Critical for Financial Closes",
                "topic": "Product Usability",
                "url": "https://prelude.internal/blog/billing-export-latency",
                "published_at": "2026-08-20",
                "views": 5900,
                "shares": 310,
                "read_time_minutes": 5,
                "performance_score": 74,
                "format": "blog",
                "summary": "An investigation into financial accounting timeouts and how background asynchronous worker queues resolve latency spikes."
            },
            {
                "id": "cnt-6",
                "title": "Designing Shared Cognitive Substrates for Multi-Agent Fleets",
                "topic": "Engineering & AI",
                "url": "https://prelude.internal/blog/shared-cognitive-substrates",
                "published_at": "2026-08-12",
                "views": 9800,
                "shares": 850,
                "read_time_minutes": 9,
                "performance_score": 87,
                "format": "blog",
                "summary": "Architectural patterns for preventing agent hallucinations through atomic retain and semantic recall constraints."
            },
            {
                "id": "cnt-7",
                "title": "Q3 Enterprise SaaS Pricing Index: The Rise of Consumption Hybrid Models",
                "topic": "Market Intelligence",
                "url": "https://prelude.internal/reports/q3-pricing-index",
                "published_at": "2026-08-01",
                "views": 7300,
                "shares": 510,
                "read_time_minutes": 11,
                "performance_score": 81,
                "format": "whitepaper",
                "summary": "Comprehensive breakdown of 200 B2B enterprise software contract structures and tier discount thresholds."
            },
            {
                "id": "cnt-8",
                "title": "Reducing Onboarding Time from 14 Days to 2 Hours",
                "topic": "Customer Success",
                "url": "https://prelude.internal/case-studies/onboarding-speed",
                "published_at": "2026-07-22",
                "views": 4800,
                "shares": 220,
                "read_time_minutes": 6,
                "performance_score": 68,
                "format": "case_study",
                "summary": "Automating schema ingestion and tenant provisioning to eliminate early friction in developer onboarding."
            },
            {
                "id": "cnt-9",
                "title": "From Feedback to Roadmap: Synthesizing 10,000 Support Tickets into Features",
                "topic": "Product Architecture",
                "url": "https://prelude.internal/blog/feedback-synthesis-playbook",
                "published_at": "2026-07-10",
                "views": 6100,
                "shares": 390,
                "read_time_minutes": 8,
                "performance_score": 76,
                "format": "blog",
                "summary": "How semantic clustering detects emergent patterns that traditional keyword tags completely miss."
            },
            {
                "id": "cnt-10",
                "title": "The Modern Competitive Intelligence Stack for Fast-Moving SaaS",
                "topic": "Market Intelligence",
                "url": "https://prelude.internal/blog/modern-ci-stack",
                "published_at": "2026-06-28",
                "views": 5200,
                "shares": 290,
                "read_time_minutes": 6,
                "performance_score": 71,
                "format": "blog",
                "summary": "Tracking pricing shifts, executive hiring, and changelogs without falling prey to noisy vanity metrics."
            },
            {
                "id": "cnt-11",
                "title": "Building Mission-Critical Workflows on Async Fast-Inference LLMs",
                "topic": "Engineering & AI",
                "url": "https://prelude.internal/blog/groq-fast-inference-architecture",
                "published_at": "2026-06-15",
                "views": 8900,
                "shares": 720,
                "read_time_minutes": 8,
                "performance_score": 85,
                "format": "blog",
                "summary": "Achieving sub-500ms end-to-end response times with hardware-accelerated token generation."
            },
            {
                "id": "cnt-12",
                "title": "Preventing Churn Before the Renewal Call: Early Warning Signals",
                "topic": "Sales Strategy",
                "url": "https://prelude.internal/blog/early-churn-warning",
                "published_at": "2026-06-01",
                "views": 7900,
                "shares": 640,
                "read_time_minutes": 7,
                "performance_score": 83,
                "format": "blog",
                "summary": "Why support ticket frequency and export failure counts are the truest leading indicators of enterprise renewal risk."
            }
        ]

    def log_content_performance(
        self,
        title: str,
        topic: str,
        views: int,
        shares: int = 0,
        conversion_rate: float = 0.0,
        notes: str = ""
    ) -> Dict[str, Any]:
        """Logs a content piece and stores it in Hindsight memory."""
        content_summary = (
            f"Content Piece '{title}' (Topic: {topic}) - Views: {views}, "
            f"Shares: {shares}, Conversion Rate: {conversion_rate * 100:.1f}%. {notes}"
        )
        tags = {
            "module": "content_strategy",
            "topic": topic,
            "views": views,
            "shares": shares,
            "conversion_rate": conversion_rate
        }
        memory_id = self.memory.retain(content=content_summary, tags=tags)
        
        # Add to store
        new_piece = {
            "id": f"cnt-{len(self._content_store) + 1:02d}",
            "title": title,
            "topic": topic,
            "url": f"https://blog.prelude.internal/{title.lower().replace(' ', '-')}",
            "published_at": "2026-09-27",
            "views": views,
            "shares": shares,
            "read_time_minutes": 5,
            "performance_score": min(99, int((views / 150) + (shares * 0.2))),
            "format": "blog",
            "summary": notes or f"Published article on {topic} with {views} views."
        }
        self._content_store.insert(0, new_piece)

        return {
            "status": "success",
            "memory_id": memory_id,
            "title": title,
            "topic": topic,
            "views": views
        }

    def list_content_pieces(
        self,
        topic: Optional[str] = None,
        search: Optional[str] = None,
        sort: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """Lists content pieces with filtering and sorting matching frontend API contract."""
        items = list(self._content_store)

        if topic and topic.lower() != "all":
            items = [c for c in items if c["topic"].lower() == topic.lower()]

        if search:
            q = search.lower()
            items = [
                c for c in items 
                if q in c["title"].lower() or q in c["topic"].lower() or q in (c.get("summary") or "").lower()
            ]

        if sort == "views":
            items.sort(key=lambda x: x["views"], reverse=True)
        elif sort == "shares":
            items.sort(key=lambda x: x["shares"], reverse=True)
        else:
            items.sort(key=lambda x: x["published_at"], reverse=True)

        return items

    def generate_strategy_recommendations(self, target_topic: str) -> Dict[str, Any]:
        """
        Recalls historical content performance from memory and uses Groq to generate
        data-grounded recommendations for upcoming content.
        """
        past_content = self.memory.recall(
            query=f"content performance for {target_topic}",
            filters={"module": "content_strategy"}
        )

        context_lines = []
        for c in past_content:
            context_lines.append(f"- [{c.get('created_at', 'Past')}] {c.get('content')}")
        context_str = "\n".join(context_lines) if context_lines else "No prior content records found for this topic."

        system_prompt = (
            "You are a Content Strategy Intelligence Agent. Your goal is to analyze historical "
            "content engagement and provide actionable recommendations. Base your conclusions "
            "strictly on the provided historical memory. If no records exist, provide cold-start best practices."
        )
        user_prompt = f"""
Target Topic: {target_topic}

Historical Content Memory:
{context_str}

Please generate an intelligence report with:
1. Historical Performance Assessment (what worked, what underperformed)
2. Strategic Recommendations (3 high-impact article angles)
3. Target Persona & Distribution Channels
"""
        schema_hint = """{
  "topic": string,
  "performance_assessment": string,
  "recommendations": [string],
  "target_persona": string,
  "channels": [string]
}"""

        result = self.llm.structured_json_completion(
            system_prompt=system_prompt,
            user_prompt=user_prompt,
            schema_hint=schema_hint
        )
        result["recalled_memories_count"] = len(past_content)
        return result
