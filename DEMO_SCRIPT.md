# 🎬 PRELUDE INTELLIGENCE // HACKATHON PRESENTATION SCRIPT

> **Structure & Timing Guide:** 4 Acts (Total ~3.5 to 4 minutes)  
> Aligned with the official rubric: **Intro** (30s) ➔ **The Problem** (30s) ➔ **The Demo** (2-3 min) ➔ **Wrap Up** (30s).

---

## 1. ⏱️ Quick Intro (30 sec) — Who, What, Why
**URL:** `http://127.0.0.1:5173/`

- **Who you are:** 
  > *"Hi everyone, we’re the team behind Prelude Intelligence."*
- **What you built:** 
  > *"We built an autonomous, shared-memory intelligence hub for cross-functional enterprise teams, powered by Vectorize Hindsight and Groq."*
- **One sentence on WHY:** 
  > *"Enterprise revenue teams lose millions in churn every year because Sales, Product, Support, and Marketing operate in disconnected silos with cross-functional context amnesia."*
- **Visual Cue:** Show the home page hero section and click **"Launch Intelligence Hub"** (top right) to enter `/app`.

---

## 2. ⏱️ The Problem (30 sec) — Show the Agent Failing Without Memory
**URL:** `http://127.0.0.1:5173/app`

- **Open Global Brief Me:** Press `Cmd+K` (or `Ctrl+K`).
- **Select Prompt:** Click chip **`Target Dossier`** (*"What should I know before calling Jane Doe at Acme Corp?"*). Click **Synthesize**.
- **Click the "Compare (Without Memory)" Split Toggle:**
  - Point directly to the **red-tinted card ("WITHOUT PERSISTENT MEMORY / GENERIC LLM")**:
  > *"Look at what happens when a standard LLM answers this without persistent memory. It gives generic boilerplate: 'Thank the customer for their business and discuss standard contract renewal rates.'*
  > *It suffers from three catastrophic blindspots: It has zero clue that competitor ApexCloud dropped prices by 20% three days ago, it misses 3 angry Zendesk tickets about billing CSV timeouts, and it suggests pricing that violates their internal budget cap."*

---

## 3. ⏱️ The Demo (2–3 min) — Real Interaction & Live Retain / Recall

### Part A: Live Recall & The Cognitive Memory Graph (1 min)
**URL:** `http://127.0.0.1:5173/app`
1. **Interactive Memory Graph:**
   - Click the **"Jane Doe (Acme Corp)"** node on the Overview SVG graph.
   - Point out how it instantly illuminates connected nodes: **ApexCloud (-20% Cut)** and **ENG-842 (Async Chunking)**.
   - *"Hindsight isn't just a vector search; it's an evolving graph connecting customer relationships to engineering tickets and competitor moves."*
2. **Review Causal Chains & Citations:**
   - In the Brief Me response, highlight the **Causal Chain**: *ApexCloud discount (cause) ➔ Jane demanding budget match (effect)*, complete with cryptographic memory citations (`[mem_seed_49b1]`).

### Part B: Departmental Contradiction Radar (1 min)
**URL:** `http://127.0.0.1:5173/app/contacts/jane-doe`
1. **Navigate to Jane Doe's Dossier:**
   - Show the **Telemetry Triad**: Deal Value ($140k ARR), Renewal (Oct 15), Churn Risk (High Hazard).
2. **The "Aha!" Moment — Contradiction Radar:**
   - Point to the contradiction card:
   > *"Here is the breakthrough: Our memory radar caught an internal contradiction no human spotted. Sales notes recorded Jane stating an $80k hard budget cap. But simultaneously, DevOps Slack channels requested specs for a $140k multi-cluster upgrade! Prelude arms the rep with the exact tactical talk-track to navigate this."*
3. **Export Executive 1-Pager:**
   - Click **"Export Executive 1-Pager"** ➔ click **"Copy Markdown"** or **"Print / Save PDF"**.

### Part C: Live Retain — Self-Correction / Memory Ingestion (45 sec)
**Option 1 (In UI):**
- In the Brief Me modal or Contact Dossier, use the **Self-Correction** or **Feedback Ingest** (`/app/feedback`):
  - Enter: *"Jane Doe confirmed Acme Corp completed their SOC2 audit early on Sept 25th."*
  - Click **Submit Correction / Retain**.
  - Show how Hindsight immediately accepts and indexes the new memory observation with high priority.
**Option 2 (Terminal Smoke Verification - Optional Backup):**
- Run `python test_hindsight_live.py` to show live terminal output of `client.retain(...)` followed by `client.recall(...)` against the local Hindsight cluster.

---

## 4. ⏱️ Wrap Up (30 sec) — Key Takeaway & What Surprised Us

- **One Key Takeaway:**
  > *"Persistent memory isn't just about answering questions faster — it's about giving enterprise agents an evolving institutional brain that prevents million-dollar blindspots."*
- **What Surprised Us:**
  > *"What surprised us most was how naturally Hindsight's cross-encoder recall and entity linking detected contradictions between departments. Finding that Sales and DevOps had conflicting numbers for the same account was completely emergent — Hindsight turned what would have been a lost renewal into an expansion deal."*
- **Final Closing:**
  > *"Thank you! Check out the live app at localhost:5173 and our full docs in `/docs`."*

