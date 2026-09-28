# Prelude Intelligence — Deployment & Operations Guide

This guide covers deployment instructions for Prelude Intelligence across local environments, Docker Compose containers, and production cloud infrastructure.

---

## 📋 System Prerequisites

| Component | Minimum Version | Recommended | Notes |
| :--- | :--- | :--- | :--- |
| **Python** | 3.10+ | 3.11 or 3.13 | Virtual environment recommended in `.venv` |
| **Node.js** | 18.x | 20 LTS | Required for frontend build & Vite dev server |
| **Docker** (Optional) | 24.0+ | Docker Desktop 4.25+ | Required for containerized execution |
| **Docker Compose** | 2.20+ | Included with Docker | For multi-container orchestration |
| **Groq API Key** | — | Active Key | Sign up at [console.groq.com](https://console.groq.com) |

---

## ⚙️ Environment Variables Reference (`.env`)

Create or update the `.env` file in the project root:

```ini
# --- Groq LLM Inference ---
GROQ_API_KEY=your_actual_groq_api_key_here
GROQ_PRIMARY_MODEL=openai/gpt-oss-120b
GROQ_FALLBACK_MODEL=openai/gpt-oss-20b

# --- Vectorize Hindsight Cognitive Memory Substrate ---
HINDSIGHT_API_URL=http://127.0.0.1:8888
HINDSIGHT_API_KEY=
HINDSIGHT_API_LLM_PROVIDER=groq
HINDSIGHT_API_LLM_API_KEY=your_actual_groq_api_key_here
HINDSIGHT_API_LLM_MODEL=openai/gpt-oss-20b
HINDSIGHT_API_LLM_GROQ_SERVICE_TIER=on_demand

# --- Application Server Settings ---
PORT=8000
HOST=127.0.0.1
DEBUG=False
PYTHONUNBUFFERED=1
```

---

## 🚀 Option 1: Native Local Deployment

### 1.1 Python Virtual Environment & Dependencies

#### Windows (PowerShell):
```powershell
# Clone or navigate to the workspace
cd "c:\Users\Nikhil Chandra\hackmicro"

# Create and activate virtual environment (if not already present)
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# Install requirements
python -m pip install --upgrade pip
pip install -r requirements.txt
```

#### Linux / macOS (Bash):
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

### 1.2 Start Hindsight Memory Daemon (Port 8888)

The Hindsight node manages persistent entity memory and vector indexing.

#### Windows (PowerShell):
```powershell
$env:PYTHONUTF8="1"
$env:PYTHONIOENCODING="utf-8"
$env:HINDSIGHT_API_LLM_PROVIDER="groq"
$env:HINDSIGHT_API_LLM_API_KEY="your_groq_api_key_here"
$env:HINDSIGHT_API_LLM_MODEL="openai/gpt-oss-20b"
$env:HINDSIGHT_API_LLM_GROQ_SERVICE_TIER="on_demand"

.\.venv\Scripts\hindsight-api.exe --port 8888
```

#### Linux / macOS (Bash):
```bash
export PYTHONUTF8="1"
export HINDSIGHT_API_LLM_PROVIDER="groq"
export HINDSIGHT_API_LLM_API_KEY="your_groq_api_key_here"
export HINDSIGHT_API_LLM_MODEL="openai/gpt-oss-20b"

./.venv/bin/hindsight-api --port 8888
```

### 1.3 Start FastAPI Backend (Port 8000)

In a second terminal window:

```powershell
# Windows
.\.venv\Scripts\uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

```bash
# Linux / macOS
uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

Verify backend health at: **[http://127.0.0.1:8000/api/v1/health](http://127.0.0.1:8000/api/v1/health)**  
Interactive Swagger docs: **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)**

### 1.4 Start React + Vite Frontend (Port 5173)

In a third terminal window:

```bash
cd frontend
npm install
npm run dev
```

Open the application at: **[http://localhost:5173](http://localhost:5173)**

---

## 🐳 Option 2: Containerized Deployment (Docker Compose)

The repository includes a ready-to-run multi-stage `docker-compose.yml` orchestrating all three services.

### 2.1 Launch Stack
```bash
docker-compose up --build -d
```

### 2.2 Verify Container Status
```bash
docker-compose ps
```
You should see:
- `backend` running on `0.0.0.0:8000`
- `frontend` running on `0.0.0.0:5173` and `0.0.0.0:80`
- `hindsight` running on `0.0.0.0:8888`

### 2.3 Tail Logs
```bash
# Follow all container logs
docker-compose logs -f

# Follow backend specifically
docker-compose logs -f backend
```

### 2.4 Tear Down
```bash
docker-compose down -v
```

---

## ☁️ Option 3: Production Cloud Deployment

### 3.1 Backend & Hindsight on Google Cloud (Cloud Run / GKE) or AWS
1. **Hindsight Persistence**:
   - For production, run Hindsight on a container VM with an attached persistent SSD disk mounted to store the `pg0` vector graph database.
2. **FastAPI Backend (Cloud Run / AWS ECS)**:
   - Build image via `Dockerfile.backend`.
   - Set environment variables (`GROQ_API_KEY`, `HINDSIGHT_API_URL`).
   - Configure health check probe path: `/api/v1/health` on port `8000`.
   - Configure auto-scaling: 1 to 10 instances with minimum 1 instance to avoid cold starts.

### 3.2 Frontend Deployment (Vercel / Netlify / Cloudflare Pages)
1. Build the production static asset bundle:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the generated `frontend/dist` folder to your CDN of choice.
3. Configure URL rewrites for Single-Page Application (SPA) routing:
   - Route all `/*` requests to `/index.html`.
4. Set environment variable `VITE_API_URL=https://your-backend-api-domain.com/api/v1`.

---

## 🔍 Verification & Health Checks

Execute the following curl commands to verify connectivity:

```bash
# 1. Backend Health Check
curl http://127.0.0.1:8000/api/v1/health

# Expected response:
# {"status":"ok","hindsight_mode":"live","groq_primary_model":"openai/gpt-oss-120b","groq_fallback_model":"openai/gpt-oss-20b"}

# 2. Test Groq Inference Directly
curl http://127.0.0.1:8000/api/v1/test-groq

# 3. Test Cross-Module Briefing
curl -X POST http://127.0.0.1:8000/api/v1/brief-me \
  -H "Content-Type: application/json" \
  -d '{"query":"Summarize Jane Doe pricing risks","role":"sales"}'
```

---

## 🛠️ Operational Troubleshooting

### Issue 1: Port Collision on 8000, 8888, or 5173
**Symptom**: `OSError: [WinError 10048] address already in use`  
**Fix**:
```powershell
# Windows: Find PID occupying port 8000 or 8888
netstat -ano | findstr :8000
# Kill process by PID
taskkill /F /PID <PID_NUMBER>
```

### Issue 2: Groq 429 Rate Limits
**Symptom**: `RateLimitError: Rate limit reached for model`  
**Mitigation**: The `GroqClientWrapper` automatically falls back to `openai/gpt-oss-20b` or `qwen/qwen3-32b`. Ensure your Groq account has an active tier or switch primary/fallback models in `.env`.

### Issue 3: Hindsight Local Daemon Unicode Error on Windows
**Symptom**: `UnicodeEncodeError: 'charmap' codec can't encode character`  
**Fix**: Always set `$env:PYTHONUTF8="1"` and `$env:PYTHONIOENCODING="utf-8"` in PowerShell before launching `hindsight-api.exe`.
