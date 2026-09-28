# API Contract & Schema Specification

This document provides the frontend developers (Persons 3 & 4) and teammate Person 1 with the exact request and response schemas for all Person 2 endpoints.

Base URL: `http://127.0.0.1:8000/api/v1`

---

## 1. System Health

### `GET /health`
Returns connection status to Hindsight and LLM provider.

#### Response (200 OK)
```json
{
  "status": "ok",
  "hindsight_mode": "live",
  "groq_primary_model": "openai/gpt-oss-20b",
  "groq_fallback_model": "openai/gpt-oss-120b"
}
```

---

## 2. Cross-Module Intelligence ("Brief Me")

### `POST /brief-me`
The flagship cross-module briefing endpoint. Combines memories from Competitive Intelligence, Meeting Prep, Feedback Synthesis, and Content Strategy.

#### Request Body
```json
{
  "query": "What should I know before calling Acme Corp regarding pricing and our billing performance?",
  "role": "sales" 
}
```
* `role` (optional): `"executive"` (default), `"sales"`, `"product"`, or `"marketing"`.

#### Response (200 OK)
```json
{
  "data": {
    "query": "What should I know before calling Acme Corp regarding pricing and our billing performance?",
    "role": "sales",
    "is_cold_start": false,
    "confidence_level": "high",
    "confidence_assessment": "Grounded in multiple verified meeting records and support tickets from September 2026.",
    "executive_summary": "Acme Corp is evaluating renewal pricing against an aggressive 20% discount from ApexCloud. Meanwhile, Acme has submitted repeated support complaints about 2-minute CSV export timeouts in the billing dashboard.",
    "causal_chains": [
      {
        "cause_event": "ApexCloud announced a 20% price cut on Enterprise tier on Sept 15.",
        "effect_outcome": "Acme VP of Engineering Sarah Chen demanded custom pricing matching their $80k budget cap on Sept 18.",
        "plausibility_reasoning": "Direct temporal proximity and competitive price matching leverage.",
        "citations": ["mem_seed_49b1", "mem_seed_9b21"]
      }
    ],
    "cross_module_insights": [
      {
        "insight": "Technical friction in billing CSV exports is compounding pricing sensitivity during renewal.",
        "modules_involved": ["meeting_prep", "feedback_synthesis", "competitive_intel"],
        "citations": ["mem_seed_4092", "mem_seed_9b21"]
      }
    ],
    "action_items": [
      "Prepare custom pricing schedule under the $80k/yr ceiling before the call.",
      "Brief client on engineering ticket #4092 fix for the billing CSV export."
    ],
    "referenced_memory_count": 4,
    "modules_represented": ["competitive_intel", "meeting_prep", "feedback_synthesis"],
    "has_applied_corrections": false
  },
  "error": null
}
```

#### Cold-Start Response (200 OK)
When zero memories exist for the query:
```json
{
  "data": {
    "query": "Quantum computing roadmap for Acme Corp",
    "role": "executive",
    "is_cold_start": true,
    "confidence_level": "cold_start",
    "confidence_assessment": "Zero relevant records exist in Hindsight memory for this query. No assumptions or external facts were made.",
    "executive_summary": "No prior records found. This is a cold start. External discovery or data ingestion is required before briefing can be generated.",
    "causal_chains": [],
    "cross_module_insights": [],
    "action_items": [
      "Ingest meeting notes, customer feedback, or competitor intel related to this topic.",
      "Verify exact naming of entities (e.g. company name, contact, product feature)."
    ],
    "referenced_memory_count": 0,
    "modules_represented": []
  },
  "error": null
}
```

---

## 3. Self-Correction Loop

### `POST /correction`
Submits a user-verified correction to overwrite or refine historical memory.

#### Request Body
```json
{
  "query": "Acme Corp SOC2 compliance status",
  "original_summary": "Acme Corp needs SOC2 compliance before Q4 renewal.",
  "correction": "Acme Corp finished their SOC2 audit early on Sept 25th.",
  "entity": "Acme Corp"
}
```

#### Response (200 OK)
```json
{
  "data": {
    "status": "success",
    "memory_id": "mem_cde62ee5aa",
    "correction_applied": "Acme Corp finished their SOC2 audit early on Sept 25th.",
    "entity": "Acme Corp"
  },
  "error": null
}
```

---

## 4. Content Strategy Module

### `POST /content`
Logs content engagement metrics and retains the entry in Hindsight.

#### Request Body
```json
{
  "title": "Migrating Kubernetes Clusters with Zero Downtime",
  "topic": "DevOps",
  "views": 14200,
  "shares": 180,
  "conversion_rate": 0.026,
  "notes": "Strong reception on Reddit /r/devops"
}
```

#### Response (200 OK)
```json
{
  "data": {
    "status": "success",
    "memory_id": "mem_2e673e4760",
    "title": "Migrating Kubernetes Clusters with Zero Downtime",
    "topic": "DevOps",
    "views": 14200
  },
  "error": null
}
```

### `GET /content/recommendations?topic=DevOps`
Recalls past content pieces on the given topic from memory and produces LLM recommendations.

#### Response (200 OK)
```json
{
  "data": {
    "topic": "DevOps",
    "performance_assessment": "Prior deep-dive technical articles outperformed high-level summaries by 8x.",
    "recommendations": [
      "Advanced GitOps with ArgoCD for Multi-Cluster K8s",
      "Kube-Cost Optimization: Slashing Idle Cluster Expenses"
    ],
    "target_persona": "Senior SREs and Cloud Platform Engineers",
    "channels": ["Substack", "Hacker News", "Reddit r/devops"],
    "recalled_memories_count": 3
  },
  "error": null
}
```

---

## 5. Feedback Synthesizer Module

### `POST /feedback`
Ingests raw customer feedback (tickets, surveys, reviews) into Hindsight.

#### Request Body
```json
{
  "raw_text": "The billing CSV export failed again with HTTP 504 on large accounts.",
  "source": "support_ticket",
  "user_identifier": "acme_admin_1",
  "metadata": {
    "account_tier": "enterprise",
    "severity": "high"
  }
}
```

#### Response (200 OK)
```json
{
  "data": {
    "status": "success",
    "memory_id": "mem_50c7a9ad09",
    "source": "support_ticket"
  },
  "error": null
}
```

### `GET /feedback/synthesis?focus_area=Billing`
Recalls feedback memories in the focus area and clusters them into themes.

#### Response (200 OK)
```json
{
  "data": {
    "focus_area": "Billing",
    "overall_sentiment": "negative",
    "themes": [
      {
        "theme_name": "CSV Export Timeout (HTTP 504)",
        "sentiment": "negative",
        "frequency_estimate": 4,
        "description": "Enterprise accounts with >50k transactions experience server timeouts when generating CSVs."
      }
    ],
    "top_actionable_improvements": [
      "Convert CSV export to an asynchronous background job with email delivery.",
      "Add pagination and date filtering to the billing transaction history view."
    ],
    "total_feedback_items_analyzed": 5
  },
  "error": null
}
```
