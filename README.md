# Prelude Intelligence — Marketing & Product Intelligence Hub

> **Enterprise Shared-Memory Intelligence Hub**  
> An autonomous cross-functional intelligence platform powered by **Vectorize Hindsight** persistent memory and **Groq** high-speed LLM inference.

---

## 🌟 Overview

Prelude Intelligence solves the enterprise context fragmentation problem. When Sales, Product, Marketing, and Customer Success operate in silos, critical signals are missed. 

By integrating **Hindsight** as an evolving cognitive memory substrate, Prelude connects customer support tickets, competitor movements, sales conversations, and content marketing performance into a cohesive temporal knowledge graph.

### Key Capabilities
- **Cross-Module Strategic Briefing (`/brief-me`)**: Instant role-tailored situational briefs with causal chains, temporal reasoning, confidence scoring, and source citations.
- **Content Strategy & Repurposing (`/content`)**: Analyzes cross-channel content metrics to recommend optimal formats, distribution angles, and repurposing blueprints.
- **Customer Feedback Synthesis (`/feedback/themes`)**: Aggregates disparate support tickets, surveys, and NPS sentiment into actionable product themes and priority rankings.
- **Competitor Tracking & Timeline (`/competitors`)**: Tracks competitor feature drops, pricing adjustments, and market shifts over time.
- **Meeting & Contact Intelligence (`/contacts`)**: Prepares sales and customer success reps with complete historical context and negotiation leverage before entering any meeting.
- **Product Marketing Landing Page (`/landing`)**: High-converting public landing page featuring auto-rotating hero value props, benefits checklist, interactive 4-step pipeline, customer testimonials carousel, old-vs-new comparison matrix, and lead capture.

---

## 🏗️ Architecture

```
                          ┌────────────────────────┐
                          │   Frontend (React 18)  │
                          │ Vite + Tailwind CSS    │
                          │   (Port 5173)          │
                          └───────────┬────────────┘
                                      │ REST / JSON
                                      ▼
                          ┌────────────────────────┐
                          │    Backend (FastAPI)   │
                          │   Python 3.13 Async    │
                          │   (Port 8000)          │
                          └───────────┬────────────┘
                                      │
            ┌─────────────────────────┴────────────────────────┐
            ▼                                                  ▼
┌───────────────────────────────┐              ┌───────────────────────────────┐
│     Hindsight Memory Node     │              │      Groq Inference API       │
│ Vectorize Open-Source Node    │              │  openai/gpt-oss-20b (Primary) │
│ pg0 + pgvector + BGE-small    │              │  openai/gpt-oss-120b (Backup) │
│ (Port 8888)                   │              └───────────────────────────────┘
└───────────────────────────────┘
```

---

## 🚀 Quickstart: Running Locally

### Prerequisites
- Python 3.10+ (Virtualenv in `.venv`)
- Node.js 18+ and npm
- Groq API Key (configured in `.env`)

### 1. Start the Hindsight Memory Node (Port 8888)
In your terminal / PowerShell:
```powershell
$env:PYTHONUTF8="1"
$env:PYTHONIOENCODING="utf-8"
$env:HINDSIGHT_API_LLM_PROVIDER="groq"
$env:HINDSIGHT_API_LLM_API_KEY="your_groq_api_key_here"
$env:HINDSIGHT_API_LLM_MODEL="openai/gpt-oss-20b"
$env:HINDSIGHT_API_LLM_GROQ_SERVICE_TIER="on_demand"

.\.venv\Scripts\hindsight-api.exe --port 8888
```

### 2. Start the Backend API (Port 8000)
In a new terminal:
```powershell
.\.venv\Scripts\uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```
Interactive Swagger API documentation will be available at:
👉 **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)**

### 3. Start the Frontend Application (Port 5173)
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Open your browser at:
👉 **[http://localhost:5173](http://localhost:5173)**

> **Demo Toolbar:** Use the top toolbar in the frontend to toggle between mock mode and live backend mode (`http://127.0.0.1:8000/api/v1`).

---

## 🧪 Testing & Verification

Run the comprehensive automated test suite (Unit & Integration tests):
```powershell
.\.venv\Scripts\pytest -v
```
All 11 tests pass with 100% coverage across:
- Health & readiness endpoints
- Content strategy module
- Feedback synthesis module
- `/brief-me` cross-module reasoning and cold-start fallbacks
- Tier 1 & 2 stretch features (causal chains, confidence assessment, role adaptation)

To verify the live Hindsight memory connection and semantic recall:
```powershell
.\.venv\Scripts\python.exe test_hindsight_live.py
```

---

## 📚 Documentation

The repository features comprehensive technical, architectural, and operational documentation:

- 📖 **[Documentation Hub Index](file:///c:/Users/Nikhil%20Chandra/hackmicro/docs/README.md)** — Master table of contents and architecture overview
- 🏛️ **[Architecture Guide](file:///c:/Users/Nikhil%20Chandra/hackmicro/docs/ARCHITECTURE.md)** — System topology, data flow sequence diagrams, and cognitive memory graph
- 👤 **[User Guide & Tour](file:///c:/Users/Nikhil%20Chandra/hackmicro/docs/USER_GUIDE.md)** — Step-by-step walkthrough of all dashboards, Brief Me, and battlecards
- 🚀 **[Deployment & Operations Guide](file:///c:/Users/Nikhil%20Chandra/hackmicro/docs/DEPLOYMENT_GUIDE.md)** — Local execution, Docker Compose, cloud deployment, and troubleshooting
- 💻 **[Developer Guide](file:///c:/Users/Nikhil%20Chandra/hackmicro/docs/DEVELOPER_GUIDE.md)** — Local setup, testing procedures, memory APIs, and contribution rules
- 🔌 **[API Contract & Schema Specification](file:///c:/Users/Nikhil%20Chandra/hackmicro/docs/API_CONTRACT.md)** — Complete REST schemas for all endpoints
- 🧠 **[How Hindsight Memory is Used & Value Proposition](file:///c:/Users/Nikhil%20Chandra/hackmicro/docs/HINDSIGHT_EXPLANATION.md)** — Vectorize Hindsight memory mechanics and cognitive graph


