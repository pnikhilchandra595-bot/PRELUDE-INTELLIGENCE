# Prelude Intelligence — User Guide & Feature Walkthrough

Welcome to the **Prelude Intelligence** user guide. This document provides a walkthrough of all platform capabilities, interactive dashboards, intelligence tools, and export workflows.

---

## 🧭 Navigation & Global Controls

Prelude is structured into two main surfaces:
1. **Public Marketing & Educational Experience** (`/`, `/landing`, `/how-it-works`, `/compare`, `/success-stories`, `/story`)
2. **Enterprise Intelligence Hub Application** (`/app/*`)

### Top Navigation Controls
- **Global "Brief Me" Modal (`Cmd+K` / `Ctrl+K`)**: Opens the instant cross-module intelligence synthesizer from anywhere in the app.
- **Backend Mode Switcher (Top Right Bar)**:
  - **Live Backend (`http://127.0.0.1:8000/api/v1`)**: Queries live FastAPI services, Groq inference, and Hindsight memory nodes.
  - **Mock Demo Mode**: Uses zero-latency internal mock records, ideal for offline presentations and demonstrations.

---

## 1. Public Marketing Experience

### 1.1 Landing Page (`/` or `/landing`)
- **Dynamic Hero Section**: Highlighting real-time cross-silo memory unification.
- **Interactive ROI Calculator**: Quantifies revenue saved from churn reduction and accelerated deal cycles.
- **3-Step Process Flow**: Visually demonstrates *Ingest*, *Cross-Silo Context Graphing*, and *Role-Tailored Synthesis*.
- **Customer Testimonials**: Enterprise proof points from VP of Engineering and RevOps leaders.
- **CTA**: Direct launch into the live intelligence portal via the **"Launch Intelligence Hub"** button.

### 1.2 Interactive Architecture & Story Pages
- **How It Works (`/how-it-works`)**: Step-by-step breakdown of how Hindsight's vector graph outperforms traditional static RAG.
- **Competitive Comparison (`/compare`)**: Side-by-side matrix comparing Prelude vs traditional CRMs, static wikis, and standard chatbots.
- **Success Stories (`/success-stories`)**: Enterprise case studies detailing multi-million dollar churn avoidance.

---

## 2. Hub Overview & Cognitive Memory Graph (`/app`)

The **Hub Overview** serves as the executive command center.

![Hub Overview](file:///c:/Users/Nikhil%20Chandra/hackmicro/docs/images/overview_preview.png)

### Key Features
1. **Live Institutional Knowledge Telemetry**:
   - Total Active Memories in Bank (`marketing-product-hub`).
   - Monitored Cross-Departmental Entities.
   - Identified and Resolved Contradictions.
   - Weekly Knowledge Growth velocity chart.
2. **Interactive SVG Memory Graph**:
   - Nodes represent real-world entities: Customer contacts (e.g. *Jane Doe*), competitors (e.g. *ApexCloud*), features (*CSV Exports*), and Jira tickets (*ENG-842*).
   - **Clicking an Entity Node**: Instantly highlights all first-order and second-order causal linkages.
   - **Hover Details**: Displays the underlying timestamp, source department, and memory provenance ID.
3. **Time-Machine Simulation (`/replay`)**:
   - Simulate adding 1 to 4 weeks of organizational memory with a single click to demonstrate knowledge compounding over time.

---

## 3. Flagship "Brief Me" Synthesizer (`Cmd+K`)

Access the **Brief Me** modal using the global keyboard shortcut or clicking the **"Brief Me"** prompt in the header.

### How to Use
1. **Enter Your Natural Language Question**:
   - Example: *"What should I know before calling Acme Corp regarding pricing and our billing performance?"*
   - Or click one of the quick prompt chips:
     - `Target Dossier`: Pre-call briefings for key accounts.
     - `Competitor Move`: Analyzing pricing shifts or new releases.
     - `Churn Radar`: Identifying customers facing friction.
2. **Select Target Role**:
   - `Executive`: High-level strategic briefing with revenue risk highlights.
   - `Sales`: Negotiation leverage, competitor counter-arguments, and discount limits.
   - `Product`: Technical pain points, bug recurrence, and roadmap expectations.
   - `Marketing`: Narrative angles, proof points, and campaign positioning.
3. **Review Causal Chains & Confidence Score**:
   - Inspect the detected cause-and-effect sequences with specific memory citation links (e.g., `[mem_seed_49b1]`).
   - View the calculated confidence level (*High / Medium / Low*) with grounded reasoning.
4. **"Compare (Without Memory)" Toggle**:
   - Toggle this switch to view how a generic LLM without institutional memory answers vs Prelude. Notice how generic AI gives generic advice, while Prelude mentions the exact 20% ApexCloud discount and Jane Doe's specific Zendesk tickets.
5. **Self-Correction Feedback Loop**:
   - If an assumption is outdated, click **"Submit Correction"** (e.g., *"Acme finalized SOC2 compliance early"*). The system stores a priority observation in Hindsight, instantly updating future answers.

---

## 4. Contact & Account Intelligence (`/app/contacts`)

Navigate to `/app/contacts` and select an account such as **Jane Doe (Acme Corp)**.

### Features
1. **Account Telemetry Triad**:
   - **Deal Value**: `$140,000 ARR`
   - **Target Renewal Date**: `October 15, 2026`
   - **Calculated Churn Risk**: `High Hazard (Compounded friction)`
2. **Departmental Contradiction Radar (The Aha! Moment)**:
   - Compares disparate internal signals side-by-side.
   - *Example Blindspot*: Sales notes report a strict $80,000 budget cap, while DevOps Slack channels requested sizing for a $140,000 multi-cluster rollout.
   - Provides account executives with the tactical playbook to pitch expansion without meeting resistance.
3. **Stance Evolution & ARR Trajectory**:
   - Tracks how customer sentiment migrated across Q1, Q2, and Q3.
   - Forecasts ARR trajectories based on contract resolution scenarios.
4. **Executive 1-Pager Export**:
   - Click **"Export Executive 1-Pager"** to open a clean, print-ready executive memo.
   - Click **"Copy Markdown"** for quick pasting into Notion, Slack, or email.
   - Click **"Print / Save PDF"** for formatted PDF generation.

---

## 5. Competitive Intelligence & Battlecards (`/app/competitors`)

Navigate to `/app/competitors` to inspect live market competitors (e.g. **ApexCloud**, **SynthAI**, **DataSphere**).

### Features
1. **Rivals Matrix**:
   - Side-by-side feature, pricing, and infrastructure posture comparisons across all competitors.
2. **Chronological Intelligence Timeline**:
   - Track every move in temporal sequence: pricing adjustments, key executive hires, and feature releases.
3. **1-Pager Sales Battlecard**:
   - **3 Winning Talk-Tracks**: Tested counter-positions against competitor claims.
   - **Landmines to Avoid**: Common traps competitors bait sales reps into during evaluations.
   - **Recent Radar Signals**: Verified market shifts from the last 30 days.
   - Click **"Export Battlecard"** to download or print an offline sales sheet.

---

## 6. Feedback Themes & Sentiment Synthesis (`/app/feedback`)

Navigate to `/app/feedback` to synthesize high-volume unstructured customer input.

### Features
1. **Cross-Channel Ingestion**:
   - Consolidates Zendesk support tickets, community Slack conversations, and NPS survey comments.
2. **Automated Theme Clustering**:
   - Automatically clusters issues into prioritized themes (e.g. *CSV Export Timeouts*, *SSO Configuration*, *Rate Limit Clarity*).
3. **Sentiment & Urgency Scoring**:
   - Visualizes urgency distribution across critical, high, and medium severity tiers.
4. **Engineering Roadmap Handoff**:
   - Generates actionable bug specifications and Jira-ready problem statements with attached customer quotes.

---

## 7. Content Strategy & Repurposing Engine (`/app/content`)

Navigate to `/app/content` to maximize the impact of content marketing assets.

### Features
1. **Performance Quadrant**:
   - Plots published assets by views and conversion efficiency to identify high-performing pieces.
2. **Topic Opportunity Recommendations**:
   - Synthesizes customer pain points and competitor weak spots into suggested editorial topics.
3. **Automated Repurposing Blueprints**:
   - Turn high-performing technical blog posts into multi-slide LinkedIn carousels, executive email newsletters, and webinar speaking outlines with one click.

---

## 8. Campaigns & Onboarding Simulator (`/app/campaigns`, `/app/onboard`)

- **Campaign Brief Generator (`/app/campaigns`)**: Generates targeted multi-channel campaigns based on live competitor vulnerabilities and market opportunities.
- **Enterprise Onboard Simulator (`/app/onboard`)**: Simulates ingesting an entire enterprise customer's historical communications, Jira tickets, and CRM history, demonstrating zero-latency memory graph construction.
