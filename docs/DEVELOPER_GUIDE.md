# Prelude Intelligence — Developer Guide & Contribution Standards

This guide is designed for developers contributing to or extending **Prelude Intelligence**. It covers the local development environment, codebase architecture, adding new memory domains, and executing the test suite.

---

## 📂 Project Directory Structure

```
hackmicro/
├── backend/                  # FastAPI Application
│   ├── hindsight/            # Hindsight client wrapper & fallback store
│   │   ├── client.py         # Unified Hindsight SDK connector & mock fallback
│   │   └── mock_store.py     # Deterministic seed memories
│   ├── llm/                  # Groq LLM integration
│   │   └── groq_client.py    # Resilient Groq wrapper with dual-model fallback
│   ├── routes/               # API route definitions
│   │   └── api.py            # Primary /api/v1 router
│   ├── services/             # Domain service layer
│   │   ├── brief_service.py  # Flagship /brief-me causal synthesizer
│   │   ├── crm_service.py    # Contact briefs, contradiction radar, battlecards
│   │   ├── content_service.py# Content strategy & repurposing engine
│   │   └── feedback_service.py# Ticket clustering & theme extraction
│   └── main.py               # FastAPI entry point & CORS configuration
│
├── frontend/                 # React 18 Single-Page Application
│   ├── src/
│   │   ├── api/              # API client abstraction layer
│   │   ├── components/       # Shared UI widgets, navbars, modals
│   │   ├── context/          # React contexts (e.g. ApiModeContext)
│   │   ├── pages/            # View pages (Overview, Contacts, Competitors, etc.)
│   │   └── types/            # TypeScript interface definitions
│   ├── package.json          # Frontend dependencies
│   └── vite.config.ts        # Vite configuration & proxy settings
│
├── docs/                     # Comprehensive documentation suite
│   ├── README.md             # Documentation index
│   ├── ARCHITECTURE.md       # System design & topology
│   ├── USER_GUIDE.md         # Application walkthrough
│   ├── DEVELOPER_GUIDE.md    # Developer onboarding & test guide
│   ├── DEPLOYMENT_GUIDE.md   # Deployment instructions
│   ├── API_CONTRACT.md       # REST schemas & endpoints
│   └── HINDSIGHT_EXPLANATION.md # Memory rationale & mechanics
│
├── tests/                    # Pytest test suite
│   ├── test_api_endpoints.py # API integration tests
│   ├── test_person2_services.py # Service unit tests
│   └── test_person2_stretch_goals.py # Causal chain & confidence tests
│
├── .env.example              # Template environment configuration
├── docker-compose.yml        # Multi-container orchestration
├── Dockerfile.backend        # FastAPI container specification
├── Dockerfile.frontend       # Nginx SPA container specification
└── requirements.txt          # Python dependencies
```

---

## 🛠️ Local Development Setup

### 1. Backend Setup
```bash
# Activate virtualenv
source .venv/bin/activate  # Or .\.venv\Scripts\Activate.ps1 on Windows

# Install dev dependencies
pip install -r requirements.txt

# Run backend with auto-reload
uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🧠 Working with the Hindsight Memory Layer

### Retaining an Observation
To write a factual observation to Hindsight, call `retain()` via `HindsightClient`:

```python
from backend.hindsight.client import HindsightClient

memory_client = HindsightClient()

# Retain a new memory
memory_id = memory_client.retain(
    content="Sarah Chen stated Acme Corp is evaluating an expansion to 500 seats if CSV export times are resolved.",
    tags={
        "module": "meeting_prep",
        "entity": "Acme Corp",
        "contact": "Jane Doe",
        "priority": "high",
        "source": "zoom_transcript_2026_09_28"
    }
)
print(f"Stored observation with ID: {memory_id}")
```

### Recalling Context
To semantically search across memories in the `marketing-product-hub` bank:

```python
# Semantic vector search with reranking
results = memory_client.recall(
    query="Acme Corp seat expansion requirements",
    top_k=5,
    threshold=0.65
)

for item in results:
    print(f"[{item.id}] (Module: {item.tags.get('module')}): {item.content}")
```

---

## 🤖 Working with the Groq Inference Engine

The `GroqClientWrapper` (`backend/llm/groq_client.py`) provides:
- Automatic failover between primary (`openai/gpt-oss-120b`) and fallback (`openai/gpt-oss-20b`).
- Automatic retry on rate limits or network hiccups.
- JSON structure enforcement.

```python
from backend.llm.groq_client import GroqClientWrapper

llm = GroqClientWrapper()

messages = [
    {"role": "system", "content": "You are a strategic intelligence assistant. Respond in JSON."},
    {"role": "user", "content": "Synthesize the risk profile of Acme Corp."}
]

# Request JSON output
response_data = llm.chat_completion_json(
    messages=messages,
    temperature=0.1,
    max_tokens=1000
)
```

---

## ➕ Adding a New Domain Service

When introducing a new module (e.g. `billing_service.py`):
1. **Create the Service File** in `backend/services/`:
   - Initialize with `memory_client: HindsightClient` and `llm_client: GroqClientWrapper`.
   - Implement domain logic using `memory_client.recall()` and `llm_client.chat_completion_json()`.
2. **Expose Endpoints** in `backend/routes/api.py`:
   - Define Pydantic request and response models.
   - Instantiate your service singleton and mount endpoints under `/api/v1`.
3. **Add Integration Tests** in `tests/`:
   - Ensure both mock and live scenarios pass.

---

## 🧪 Testing Guidelines

Run tests using pytest:

```bash
# Run all unit and integration tests
pytest -v

# Run API contract validation specifically
pytest tests/test_api_endpoints.py -v

# Run stretch feature tests (causal chains & confidence scoring)
pytest tests/test_person2_stretch_goals.py -v
```

### Smoke Scripts
We maintain three lightweight smoke verification scripts in the project root:
- `test_groq_smoke.py`: Direct connection verification to Groq API.
- `test_hindsight_live.py`: Real-time recall verification against the Hindsight cluster.
- `test_modules_end_to_end.py`: Comprehensive end-to-end service validation script.

---

## 🎨 Frontend Development Standards

- **State Management**: Keep API calls in `frontend/src/api/` and respect `ApiModeContext`. The app must work seamlessly in both live backend and mock demo modes.
- **Styling**: Use Tailwind CSS utility classes adhering to the dark slate palette (`bg-slate-900`, `text-slate-100`, accents `indigo-500`, `cyan-400`).
- **Icons**: Use `@heroicons/react` or `lucide-react` for clean SVG icons.
- **Design System Preview**: You can preview all design primitives at `/app/design-system`.

---

## 📦 Pull Request & Code Review Checklist

Before opening a pull request:
- [ ] Automated tests pass (`pytest -v`).
- [ ] No hardcoded secrets or API keys in code (use `.env`).
- [ ] Endpoints adhere to standard response wrapper `{"data": ..., "error": None}`.
- [ ] Frontend builds without TypeScript or Vite errors (`npm run build`).
- [ ] Changes documented in [docs/API_CONTRACT.md](file:///c:/Users/Nikhil%20Chandra/hackmicro/docs/API_CONTRACT.md) if request/response shapes changed.
