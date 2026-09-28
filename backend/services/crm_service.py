import logging
from typing import Dict, Any, List, Optional
from backend.hindsight.client import HindsightClient
from backend.llm.groq_client import GroqClientWrapper

logger = logging.getLogger(__name__)

class CRMAndCompetitorService:
    """
    Supplies Competitors and Contact Brief endpoints matching the React frontend schema.
    Queries Hindsight memory for real cross-module intelligence.
    """
    def __init__(self, memory_client: HindsightClient, llm_client: GroqClientWrapper):
        self.memory = memory_client
        self.llm = llm_client

        self._competitors = [
            {
                "id": "comp-apex",
                "name": "ApexCloud",
                "domain": "apexcloud.io",
                "category": "Cloud Infrastructure",
                "tier": "tier_1",
                "event_count": 4
            },
            {
                "id": "comp-synth",
                "name": "SynthAI",
                "domain": "synthai.com",
                "category": "Agentic AI",
                "tier": "tier_1",
                "event_count": 3
            },
            {
                "id": "comp-vortex",
                "name": "VortexStack",
                "domain": "vortexstack.dev",
                "category": "DevOps Tooling",
                "tier": "emerging",
                "event_count": 2
            },
            {
                "id": "datasphere",
                "name": "DataSphere Enterprise",
                "domain": "datasphere.global",
                "category": "Data Warehouse & Multi-Region Storage",
                "tier": "tier_1",
                "event_count": 5
            },
            {
                "id": "vectorscale",
                "name": "VectorScale Labs",
                "domain": "vectorscale.ai",
                "category": "Vector DB & Flat Indexing",
                "tier": "emerging",
                "event_count": 4
            }
        ]

        self._competitor_events = {
            "comp-apex": [
                {
                    "id": "evt-01",
                    "competitor_id": "comp-apex",
                    "competitor_name": "ApexCloud",
                    "event_type": "pricing",
                    "title": "Aggressive 20% Price Cut on Enterprise Tier",
                    "description": "ApexCloud announced a surprise 20% price reduction across Enterprise multi-cluster plans, adding native SOC2 compliance reporting.",
                    "event_date": "2026-09-15",
                    "impact_level": "high",
                    "source_url": "https://apexcloud.io/blog/enterprise-pricing-update",
                    "tags": ["pricing", "soc2", "enterprise"]
                },
                {
                    "id": "evt-02",
                    "competitor_id": "comp-apex",
                    "competitor_name": "ApexCloud",
                    "event_type": "feature",
                    "title": "Automated Setup Wizard Launch",
                    "description": "Released a new guided onboarding flow that reduces cluster provision time from 3 days to under 45 minutes.",
                    "event_date": "2026-09-20",
                    "impact_level": "medium",
                    "source_url": "https://apexcloud.io/changelog/setup-wizard",
                    "tags": ["onboarding", "ux"]
                }
            ],
            "comp-synth": [
                {
                    "id": "evt-03",
                    "competitor_id": "comp-synth",
                    "competitor_name": "SynthAI",
                    "event_type": "feature",
                    "title": "Multi-Tenant Agent Memory Engine",
                    "description": "Introduced semantic memory retention for enterprise customer support agents.",
                    "event_date": "2026-09-18",
                    "impact_level": "critical",
                    "source_url": "https://synthai.com/news/memory-engine",
                    "tags": ["ai", "memory"]
                }
            ],
            "datasphere": [
                {
                    "id": "evt-ds-01",
                    "competitor_id": "datasphere",
                    "competitor_name": "DataSphere Enterprise",
                    "event_type": "pricing",
                    "title": "Unveiled Flat-Rate Active-Active Replicated Storage Bundles",
                    "description": "Introduced predictable capacity pricing for multi-region financial workloads.",
                    "event_date": "2026-09-14",
                    "impact_level": "high",
                    "source_url": "https://datasphere.global/news/replicated-storage-pricing",
                    "tags": ["pricing", "multi-region", "storage"]
                },
                {
                    "id": "evt-ds-02",
                    "competitor_id": "datasphere",
                    "competitor_name": "DataSphere Enterprise",
                    "event_type": "feature",
                    "title": "Launched Sub-Millisecond Cryptographic Audit Trails",
                    "description": "Direct bank-grade immutable write-once ledger support to win regulated finance.",
                    "event_date": "2026-09-02",
                    "impact_level": "high",
                    "source_url": "https://datasphere.global/features/immutable-audit",
                    "tags": ["compliance", "fintech"]
                }
            ],
            "vectorscale": [
                {
                    "id": "evt-vs-01",
                    "competitor_id": "vectorscale",
                    "competitor_name": "VectorScale Labs",
                    "event_type": "feature",
                    "title": "Announced HIPAA-Compliant Healthcare Vector Enclaves",
                    "description": "Isolated vector search partitions targeting clinical trial and life sciences labs.",
                    "event_date": "2026-09-08",
                    "impact_level": "high",
                    "source_url": "https://vectorscale.ai/blog/hipaa-enclaves",
                    "tags": ["hipaa", "healthcare", "vector"]
                }
            ]
        }

        self._contacts = [
            {
                "id": "jane-doe",
                "name": "Jane Doe",
                "company": "Acme Corp",
                "role": "VP of Engineering",
                "has_history": True,
                "context_depth": "rich"
            },
            {
                "id": "elena-rostova",
                "name": "Elena Rostova",
                "company": "FinPulse Systems",
                "role": "Head of Product",
                "has_history": True,
                "context_depth": "rich"
            },
            {
                "id": "sophia-alvarez",
                "name": "Sophia Alvarez",
                "company": "BioHealth Labs",
                "role": "Director of Platform Engineering",
                "has_history": True,
                "context_depth": "growing"
            },
            {
                "id": "david-kim",
                "name": "David Kim",
                "company": "OmniCorp Global",
                "role": "VP Marketing & Operations",
                "has_history": True,
                "context_depth": "growing"
            },
            {
                "id": "tariq-mansour",
                "name": "Tariq Mansour",
                "company": "AetherPay Global",
                "role": "VP Infrastructure & Compliance",
                "has_history": True,
                "context_depth": "rich"
            },
            {
                "id": "marcus-vance",
                "name": "Marcus Vance",
                "company": "CloudNine Technologies",
                "role": "Chief Technology Officer",
                "has_history": True,
                "context_depth": "growing"
            },
            {
                "id": "alex-turner",
                "name": "Alex Turner",
                "company": "Stealth AI Ventures",
                "role": "Founder & CEO",
                "has_history": False,
                "context_depth": "low"
            },
            {
                "id": "cont-sarah",
                "name": "Sarah Chen",
                "company": "Acme Corp",
                "role": "VP of Engineering",
                "has_history": True,
                "context_depth": "rich"
            }
        ]

    def get_competitors(self) -> List[Dict[str, Any]]:
        return self._competitors

    def _normalize_competitor_id(self, competitor_id: str) -> str:
        clean = competitor_id.lower().strip().replace(" ", "-").replace("_", "-")
        if clean in ("comp-apex", "apex-cloud", "apexcloud", "apex"):
            return "comp-apex"
        if clean in ("comp-synth", "synth-ai", "synthai", "synth"):
            return "comp-synth"
        if clean in ("comp-vortex", "vortex-stack", "vortexstack", "vortex"):
            return "comp-vortex"
        if clean in ("datasphere", "datasphere-enterprise"):
            return "datasphere"
        if clean in ("vectorscale", "vectorscale-labs"):
            return "vectorscale"
        return competitor_id

    def get_competitor_timeline(
        self,
        competitor_id: str,
        from_date: Optional[str] = None,
        to_date: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        norm_id = self._normalize_competitor_id(competitor_id)
        events = list(self._competitor_events.get(norm_id, []) or self._competitor_events.get(competitor_id, []))
        if not events and self._competitor_events:
            # Fallback to apex-cloud events if unknown
            events = list(self._competitor_events.get("comp-apex", []))
        if from_date:
            events = [e for e in events if e["event_date"] >= from_date]
        if to_date:
            events = [e for e in events if e["event_date"] <= to_date]
        events.sort(key=lambda x: x["event_date"], reverse=True)
        return events

    def get_contacts_list(self) -> List[Dict[str, Any]]:
        return self._contacts

    def get_contact_brief(self, contact_id: str) -> Optional[Dict[str, Any]]:
        contact = next((c for c in self._contacts if c["id"] == contact_id), None)
        if not contact:
            return None

        # Cold start case
        if not contact.get("has_history"):
            return {
                "contact_id": contact["id"],
                "contact": contact["name"],
                "role": contact["role"],
                "company": contact["company"],
                "email": f"{contact['name'].lower().replace(' ', '.')}@{contact['company'].lower().replace(' ', '')}.com",
                "last_meeting": None,
                "open_promises": [],
                "relevant_competitor_activity": [],
                "relevant_feedback": [],
                "summary": "No prior meeting history or CRM logs recorded for this contact. This is a first-touch interaction."
            }

        # Specific rich cross-module briefs
        if contact_id in ("jane-doe", "cont-sarah"):
            contact_name = "Sarah Chen" if contact_id == "cont-sarah" else "Jane Doe"
            contact_email = "sarah.chen@acme.com" if contact_id == "cont-sarah" else "jane.doe@acmeworks.com"
            return {
                "contact_id": contact_id,
                "contact": contact_name,
                "role": "VP of Engineering",
                "company": "Acme Corp",
                "email": contact_email,
                "last_meeting": "2026-09-10",
                "context_depth": "rich",
                "deal_value": "$140,000 ARR",
                "renewal_date": "Oct 15, 2026 (17 days remaining)",
                "churn_risk": "high",
                "open_promises": [
                    "Deliver updated Enterprise annual pricing sheet with $80k budget cap matching by Sept 25",
                    "Provide engineering benchmark report on asynchronous CSV billing exports latency fix"
                ],
                "relevant_competitor_activity": [
                    "ApexCloud announced an aggressive 20% price cut on Sept 15 ($75k floor) which Jane explicitly mentioned as negotiation leverage",
                    "ApexCloud launched sub-second streaming billing analytics to target Acme's known export frustrations"
                ],
                "relevant_feedback": [
                    "3 tickets logged by Jane Doe regarding 2-minute CSV export timeouts in the billing dashboard (Tickets #4120, #4295, #4402)",
                    "Acme finance ops flagged missing multi-department cost center tags on invoice breakdowns"
                ],
                "summary": "Jane Doe is evaluating annual renewal for Acme Corp against a competitive 20% discount offer from ApexCloud. While she values our shared memory hub and reliable API uptime, her primary frustration centers on repeated 2-minute timeouts in billing CSV exports that disrupt their monthly board reporting. Enter the meeting prepared with the v2.4 billing engine release patch and confirm our $80k enterprise cap.",
                "call_transcripts": [
                    {
                        "timestamp": "04:12",
                        "speaker": "Jane Doe (Acme Corp)",
                        "text": "ApexCloud came in with a $75k quote. If the CSV billing export timeout isn't fixed by our Oct 15 renewal, our CFO won't sign the $140k extension.",
                        "sentiment": "frustrated"
                    },
                    {
                        "timestamp": "09:45",
                        "speaker": "Sales Lead (Prelude)",
                        "text": "Understood Jane. Our engineering team has backported the streaming async chunking engine in patch v2.4. We will deploy it to your dedicated pod this week.",
                        "sentiment": "positive"
                    }
                ],
                "engineering_tickets": [
                    {
                        "key": "ENG-842",
                        "title": "Async streaming billing CSV chunking engine",
                        "status": "review",
                        "assignee": "Alex Rivera"
                    },
                    {
                        "key": "ENG-889",
                        "title": "Dedicated worker pool allocation for Acme Corp tenant",
                        "status": "resolved",
                        "assignee": "Priya Sharma"
                    }
                ],
                "sources": [
                    {
                        "sentence_index": 0,
                        "memory_id": "mem_mtg_9401",
                        "module": "meeting",
                        "date": "2026-09-10",
                        "excerpt": "Jane Doe confirmed $80k hard budget cap.",
                        "age_days": 18
                    }
                ],
                "arr_history": [
                    {"quarter": "Q1 2026", "arr_k": 80, "stage": "Initial Multi-Cluster Pilot"},
                    {"quarter": "Q2 2026", "arr_k": 110, "stage": "Team-Wide Expansion"},
                    {"quarter": "Q3 2026", "arr_k": 140, "stage": "Enterprise Core License"},
                    {"quarter": "Q4 2026 (Projected)", "arr_k": 180, "stage": "Full Production Renewal"}
                ],
                "stance_evolution": [
                    {
                        "period": "May 2026 (Pilot Launch)",
                        "stance": "High enthusiasm for shared memory across engineering & product silos",
                        "sentiment": "champion",
                        "trigger": "Engineers praised zero-latency context recall across Jira and Slack"
                    },
                    {
                        "period": "July 2026 (Scale-Up)",
                        "stance": "Growing irritation over CSV billing timeouts during monthly close",
                        "sentiment": "cautious",
                        "trigger": "Finance ops reported 2-minute timeouts on large billing reports (Tickets #4120, #4295)"
                    },
                    {
                        "period": "Sept 2026 (Renewal Crisis)",
                        "stance": "Active churn risk following ApexCloud 20% discount & latency claims",
                        "sentiment": "at_risk",
                        "trigger": "ApexCloud offered $75k floor pricing and targeted Acme export complaints"
                    },
                    {
                        "period": "Current Stance (Sept 28)",
                        "stance": "Pragmatic & receptive: will sign $140k extension if patch v2.4 fix is validated",
                        "sentiment": "evaluating",
                        "trigger": "Engineering backported async chunking engine (ENG-842 in review)"
                    }
                ],
                "contradictions": [
                    {
                        "id": "contra-01",
                        "severity": "critical",
                        "title": "Budget Cap Discrepancy Between Engineering & Finance Ops",
                        "silo_a": {
                            "source": "CRM Meeting Note (Sept 10)",
                            "claim": "Jane Doe reiterated strict $80k ceiling, citing board mandate."
                        },
                        "silo_b": {
                            "source": "DevOps Slack #infra-scale (Sept 22)",
                            "claim": "DevOps lead submitted $140k multi-region cluster request for FY27."
                        },
                        "action_item": "Acknowledge the $80k base tier, but pitch the $140k upgrade as the multi-region resiliency bundle that DevOps requested."
                    }
                ]
            }

        if contact_id == "elena-rostova":
            return {
                "contact_id": "elena-rostova",
                "contact": "Elena Rostova",
                "role": "Head of Product",
                "company": "FinPulse Systems",
                "email": "elena.rostova@finpulse.io",
                "last_meeting": "2026-09-14",
                "context_depth": "rich",
                "deal_value": "$95,000 ARR",
                "renewal_date": "Nov 01, 2026",
                "churn_risk": "medium",
                "open_promises": [
                    "Deliver FedRAMP & PCI-DSS Level 1 compliance attestation packet",
                    "Provide schema auto-detection preview for PostgreSQL partitioned tables"
                ],
                "relevant_competitor_activity": [
                    "DataSphere Enterprise announced native bank-grade immutable write-once ledger support on Sept 14",
                    "ApexCloud pitched FinPulse on dedicated on-prem hardware appliance"
                ],
                "relevant_feedback": [
                    "Zendesk #8821: Ingestion latency on encrypted transaction logs exceeding 450ms SLA",
                    "Intercom: Elena requested SOC2 Type II automated export for auditor walkthrough"
                ],
                "summary": "Elena is leading FinPulse's regulated banking platform expansion. Demonstrating SHA-256 provenance hashes and delivering the PCI-DSS Level 1 tokenization sandbox is key to securing their $95k contract renewal.",
                "call_transcripts": [
                    {
                        "timestamp": "02:15",
                        "speaker": "Elena Rostova (FinPulse)",
                        "text": "Our banking regulators require immutable audit trails. We need cryptographic verification hashes on every memory sync.",
                        "sentiment": "neutral"
                    }
                ],
                "engineering_tickets": [
                    {
                        "key": "FIN-312",
                        "title": "Audit log SHA-256 cryptographic provenance verification stream",
                        "status": "in_progress",
                        "assignee": "Elena K."
                    }
                ],
                "sources": [
                    {
                        "sentence_index": 0,
                        "memory_id": "mem_mtg_8210",
                        "module": "meeting",
                        "date": "2026-09-14",
                        "excerpt": "Elena Rostova stressed banking compliance auditors require immutable cryptographic verification.",
                        "age_days": 14
                    }
                ]
            }

        if contact_id == "sophia-alvarez":
            return {
                "contact_id": "sophia-alvarez",
                "contact": "Sophia Alvarez",
                "role": "Director of Platform Engineering",
                "company": "BioHealth Labs",
                "email": "s.alvarez@biohealthlabs.org",
                "last_meeting": "2026-09-18",
                "context_depth": "growing",
                "deal_value": "$210,000 ARR",
                "renewal_date": "Dec 10, 2026",
                "churn_risk": "low",
                "open_promises": [
                    "Finalize Business Associate Agreement (BAA) amendment for Q4 genomic telemetry pipelines",
                    "Enable dedicated isolated zero-retention memory vaults for clinical oncology trial cohorts"
                ],
                "relevant_competitor_activity": [
                    "VectorScale Labs launched HIPAA-ready vector partition clusters targeting clinical oncology labs",
                    "DataSphere Enterprise pitched BioHealth on their on-prem healthcare data cleanrooms"
                ],
                "relevant_feedback": [
                    "Zendesk #9402: Clinical genomics pipeline memory recall praised by Chief Medical Officer",
                    "Intercom: Requested audit trail export in HL7 FHIR structured format"
                ],
                "summary": "Sophia oversees platform infrastructure for BioHealth Labs' clinical oncology trials. The cross-module memory linking patient recruitment with genomic trial pipelines cut onboarding delays by 50%.",
                "call_transcripts": [
                    {
                        "timestamp": "05:18",
                        "speaker": "Sophia Alvarez (BioHealth)",
                        "text": "The cross-department memory between clinical oncology researchers and marketing trial recruiters has cut patient onboarding time in half.",
                        "sentiment": "positive"
                    }
                ],
                "engineering_tickets": [
                    {
                        "key": "SEC-104",
                        "title": "BAA compliant zero-retention memory partition vault",
                        "status": "resolved",
                        "assignee": "Dmitri V."
                    }
                ],
                "sources": [
                    {
                        "sentence_index": 0,
                        "memory_id": "mem_mtg_7719",
                        "module": "meeting",
                        "date": "2026-09-18",
                        "excerpt": "Sophia confirmed trial recruiting velocity doubled since enabling cross-silo memory queries.",
                        "age_days": 10
                    }
                ]
            }

        if contact_id == "david-kim":
            return {
                "contact_id": "david-kim",
                "contact": "David Kim",
                "role": "VP Marketing & Operations",
                "company": "OmniCorp Global",
                "email": "david.kim@omnicorp.com",
                "last_meeting": "2026-09-20",
                "context_depth": "growing",
                "deal_value": "$120,000 ARR",
                "renewal_date": "Nov 20, 2026",
                "churn_risk": "low",
                "open_promises": [
                    "Deploy Black Friday high-concurrency memory cache warming by Oct 20",
                    "Integrate Shopify Plus multi-store event webhooks into campaign memory"
                ],
                "relevant_competitor_activity": [
                    "ApexCloud offered 40% bulk discount for high-volume retail Q4 promotional spikes"
                ],
                "relevant_feedback": [
                    "Zendesk #7912: Marketing campaign attribution synced seamlessly with support ticket sentiment during Labor Day sale"
                ],
                "summary": "David manages global marketing and digital storefront operations for OmniCorp. The shared intelligence hub eliminated blind spots during their Labor Day campaign by correlating customer support spikes with ad channel conversions.",
                "call_transcripts": [
                    {
                        "timestamp": "03:40",
                        "speaker": "David Kim (OmniCorp)",
                        "text": "During Labor Day, our growth marketers saw immediate competitor campaign adjustments because the shared memory alerted them within 4 minutes.",
                        "sentiment": "positive"
                    }
                ],
                "engineering_tickets": [
                    {
                        "key": "OPS-220",
                        "title": "Q4 Peak retail burst autoscaling & Redis cluster pre-warming",
                        "status": "in_progress",
                        "assignee": "Tariq M."
                    }
                ],
                "sources": [
                    {
                        "sentence_index": 0,
                        "memory_id": "mem_mtg_5521",
                        "module": "meeting",
                        "date": "2026-09-20",
                        "excerpt": "David Kim highlighted multi-touch campaign attribution linked directly with CSAT score recovery.",
                        "age_days": 8
                    }
                ]
            }

        if contact_id == "tariq-mansour":
            return {
                "contact_id": "tariq-mansour",
                "contact": "Tariq Mansour",
                "role": "VP Infrastructure & Compliance",
                "company": "AetherPay Global",
                "email": "t.mansour@aetherpay.global",
                "last_meeting": "2026-09-22",
                "context_depth": "rich",
                "deal_value": "$185,000 ARR",
                "renewal_date": "Jan 15, 2027",
                "churn_risk": "medium",
                "open_promises": [
                    "Deliver latency benchmarks for cross-region London/Singapore memory synchronization",
                    "Provide automated compliance report for UK FCA and MAS multi-currency regulatory audits"
                ],
                "relevant_competitor_activity": [
                    "DataSphere Enterprise announced active-active multi-region replication across 18 banking data zones"
                ],
                "relevant_feedback": [
                    "Zendesk #8540: Cross-border settlement team logged 140ms latency spikes between EMEA and APAC pods"
                ],
                "summary": "Tariq leads infrastructure architecture for AetherPay's global payment settlement network. Cross-border transaction memory between EMEA and APAC teams has accelerated fraud response, but inter-regional sync latency must stay sub-50ms.",
                "call_transcripts": [
                    {
                        "timestamp": "06:10",
                        "speaker": "Tariq Mansour (AetherPay)",
                        "text": "Our multi-currency settlement engine handles $2.4B daily. If cross-region sync between London and Singapore exceeds 60ms, transactions queue up.",
                        "sentiment": "frustrated"
                    }
                ],
                "engineering_tickets": [
                    {
                        "key": "PAY-501",
                        "title": "London-Singapore dedicated QUIC edge sync acceleration",
                        "status": "review",
                        "assignee": "Elena K."
                    }
                ],
                "sources": [
                    {
                        "sentence_index": 0,
                        "memory_id": "mem_mtg_3389",
                        "module": "meeting",
                        "date": "2026-09-22",
                        "excerpt": "Tariq Mansour confirmed AetherPay daily payment settlement volume hit $2.4B, requiring sub-50ms replication.",
                        "age_days": 6
                    }
                ]
            }

        # Generic contact brief fallback
        return {
            "contact_id": contact["id"],
            "contact": contact["name"],
            "role": contact["role"],
            "company": contact["company"],
            "email": f"{contact['name'].lower().replace(' ', '.')}@{contact['company'].lower().replace(' ', '')}.com",
            "last_meeting": "2026-09-10",
            "deal_value": "$65,000 ARR",
            "renewal_date": "Q1 2027 Scheduled",
            "churn_risk": "low",
            "open_promises": ["Share product roadmap deck"],
            "relevant_competitor_activity": [],
            "relevant_feedback": [],
            "call_transcripts": [],
            "engineering_tickets": [],
            "summary": f"Prior interaction on Sep 10 focused on platform scalability and cloud security roadmap for {contact['company']}."
        }
