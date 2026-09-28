import logging
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone
from backend.hindsight.client import HindsightClient
from backend.llm.groq_client import GroqClientWrapper

logger = logging.getLogger(__name__)

class BriefMeService:
    """
    Person 2 Core + Stretch Service:
    - Tier 1: Confidence/Uncertainty scoring, airtight cold-start honesty
    - Tier 2: Causal chain surfacing, role-based brief formatting, self-correction memory loop
    - Dual-compatible adapter: supports both advanced backend schema and frontend BriefMeResponse
    """
    def __init__(self, memory_client: HindsightClient, llm_client: GroqClientWrapper):
        self.memory = memory_client
        self.llm = llm_client

    def generate_brief(
        self,
        query: str,
        role: str = "executive"
    ) -> Dict[str, Any]:
        """
        Cross-module unified briefing with role-based framing,
        causal chain surfacing, and dual frontend/backend compatibility.
        """
        valid_roles = ["executive", "sales", "product", "marketing"]
        if role.lower() not in valid_roles:
            role = "executive"

        # 1. Broad cross-module recall without module filters
        recalled_items = self.memory.recall(query=query, limit=15)
        now_iso = datetime.now(timezone.utc).isoformat()

        # 2. Check for Airtight Cold-Start
        if not recalled_items:
            cold_summary = "No prior records found in the memory repository. This is a cold start. External discovery or data ingestion is required before briefing can be generated."
            return {
                "query": query,
                "role": role.lower(),
                "is_cold_start": True,
                "confidence_level": "cold_start",
                "confidence_score": 10,
                "confidence_assessment": "Zero relevant records exist in Hindsight memory for this query. No assumptions or external facts were made.",
                "executive_summary": cold_summary,
                "synthesized_answer": cold_summary,
                "key_takeaways": [
                    "No historical context available for this entity or query.",
                    "Ingest meeting notes, customer feedback, or competitor intel to seed memory."
                ],
                "recommended_action": "Initiate discovery and log customer interactions into Hindsight memory.",
                "action_items": [
                    "Ingest meeting notes, customer feedback, or competitor intel related to this topic.",
                    "Verify exact naming of entities (e.g. company name, contact, product feature)."
                ],
                "sources": [],
                "causal_chains": [],
                "cross_module_insights": [],
                "referenced_memory_count": 0,
                "modules_represented": [],
                "generated_at": now_iso
            }

        # 3. Organize memories and separate user corrections (elevated priority)
        memories_by_module: Dict[str, List[Dict[str, Any]]] = {}
        user_corrections: List[Dict[str, Any]] = []

        for item in recalled_items:
            mod = item.get("tags", {}).get("module", "general")
            if mod == "correction":
                user_corrections.append(item)
            else:
                memories_by_module.setdefault(mod, []).append(item)

        # Build prompt context with explicit provenance/citation tags
        context_blocks = []

        if user_corrections:
            context_blocks.append("### CRITICAL USER CORRECTIONS (HIGHEST TRUTH PRECEDENCE):")
            for corr in user_corrections:
                context_blocks.append(f"- [Correction ID: {corr.get('id')}] {corr.get('content')}")

        for mod, items in memories_by_module.items():
            context_blocks.append(f"### Module: {mod.upper()}")
            for it in items:
                context_blocks.append(f"- [Memory ID: {it.get('id')}] {it.get('content')}")

        context_str = "\n".join(context_blocks)

        # 4. Role-specific lens guidelines
        role_guidelines = {
            "executive": "Focus on high-level business risks, bottom-line financial impact, and strategic alignment.",
            "sales": "Focus on pricing sensitivity, competitor counter-arguments, client budget blockers, and closing leverage.",
            "product": "Focus on user friction, bug reports, feature requests, and product parity gaps.",
            "marketing": "Focus on brand positioning, competitor messaging shifts, audience reception, and content opportunities."
        }
        role_instruction = role_guidelines.get(role.lower(), role_guidelines["executive"])

        # 5. Prompt Groq for synthesis
        system_prompt = f"""You are the Central Intelligence Agent for an enterprise Product & Marketing Hub.
You synthesize information across persistent memory (Hindsight).

TARGET AUDIENCE ROLE: {role.upper()}
ROLE LENS: {role_instruction}

CRITICAL RULES:
1. Ground every single claim in the provided memories. Always cite Memory IDs.
2. If data is limited (1-2 memories), declare LOW or MEDIUM confidence.
3. If USER CORRECTIONS are provided, they OVERRIDE older contradictory memories.
4. Causal Chains: Identify any plausible cause-and-effect links between events.
5. Never hallucinate outside knowledge."""

        user_prompt = f"""User Query: "{query}"

Retrieved Cross-Module Memories:
{context_str}

Please generate an intelligence brief in valid JSON matching the schema."""

        schema_hint = """{
  "query": string,
  "role": string,
  "is_cold_start": boolean,
  "confidence_level": "high" | "medium" | "low" | "insufficient_history",
  "confidence_assessment": string,
  "executive_summary": string,
  "causal_chains": [
    {
      "cause_event": string,
      "effect_outcome": string,
      "plausibility_reasoning": string,
      "citations": [string]
    }
  ],
  "cross_module_insights": [
    {
      "insight": string,
      "modules_involved": [string],
      "citations": [string]
    }
  ],
  "action_items": [string]
}"""

        result = self.llm.structured_json_completion(
            system_prompt=system_prompt,
            user_prompt=user_prompt,
            schema_hint=schema_hint
        )

        # Normalize role and confidence
        result["role"] = role.lower()
        level = result.get("confidence_level", "medium").lower()
        score_map = {"high": 94, "medium": 78, "low": 45, "insufficient_history": 32, "cold_start": 10}
        result["confidence_score"] = score_map.get(level, 75)

        # Dual-compatibility aliasing for React frontend
        summary_text = result.get("executive_summary", "")
        result["synthesized_answer"] = summary_text

        # Map insights to key_takeaways
        insights = result.get("cross_module_insights", [])
        result["key_takeaways"] = [
            i.get("insight") for i in insights if isinstance(i, dict) and "insight" in i
        ] or [summary_text[:120] + "..."]

        # Map recommended action
        action_list = result.get("action_items", [])
        result["recommended_action"] = action_list[0] if action_list else "Align internal stakeholders on findings."

        # Map structured sources for frontend badge/quote render
        module_map = {
            "competitive_intel": "competitors",
            "competitor": "competitors",
            "content_strategy": "content",
            "meeting_prep": "contacts",
            "meeting": "contacts",
            "feedback_synthesis": "feedback",
            "feedback": "feedback"
        }
        sources = []
        for it in recalled_items:
            raw_mod = it.get("tags", {}).get("module", "general")
            frontend_mod = module_map.get(raw_mod, "feedback")
            snippet = it.get("content", "")
            title = it.get("tags", {}).get("entity") or it.get("tags", {}).get("topic") or f"{frontend_mod.capitalize()} Intel"
            sources.append({
                "module": frontend_mod,
                "title": title,
                "snippet": snippet[:200] + ("..." if len(snippet) > 200 else ""),
                "date": it.get("tags", {}).get("date") or it.get("created_at", "")[:10] or "2026-09-27"
            })
        result["sources"] = sources
        result["generated_at"] = now_iso
        result["referenced_memory_count"] = len(recalled_items)
        result["modules_represented"] = list(memories_by_module.keys())
        if user_corrections:
            result["has_applied_corrections"] = True

        return result

    def record_user_correction(
        self,
        query: str,
        original_summary: str,
        correction: str,
        entity: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Self-Correction Loop (Tier 2 Stretch Goal):
        Retains a verified user correction as a high-precedence memory into Hindsight.
        """
        correction_text = (
            f"USER CORRECTION for query '{query}': '{correction}'. "
            f"Supersedes previous belief: '{original_summary[:200]}'."
        )
        tags = {
            "module": "correction",
            "type": "user_feedback_correction",
            "entity": entity or "general",
            "original_query": query
        }

        memory_id = self.memory.retain(content=correction_text, tags=tags)
        logger.info(f"Recorded user correction into memory: {memory_id}")

        return {
            "status": "success",
            "memory_id": memory_id,
            "correction_applied": correction,
            "entity": entity
        }
