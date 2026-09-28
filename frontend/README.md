# Prelude Intelligence — Liquid Glass Frontend

A flagship 2026 shared-memory intelligence hub for marketing and product teams, engineered with a custom **Liquid Glass** visual identity.

![Prelude Intelligence Interface Placeholder](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80)

---

## 💎 Design System: Liquid Glass

Prelude is built on a custom design system with GPU-safe organic physics:
- **Background Mesh**: Deep navy base (`#060813`) with 4 harmonic drifting blurred blobs (Teal, Violet, Rose, Electric Blue) on 30–48s keyframe loops and a subtle SVG film-grain texture.
- **Glass Surfaces (Three Physical Tiers)**:
  - `GlassCard`: `rgba(255, 255, 255, 0.065)`, `backdrop-filter: blur(24px) saturate(180%)`, 3D cursor-reactive tilt (max 4° spring), pointer-following radial specular spotlight, 1px gradient border, and inset highlight (`inset 0 1px 0 rgba(255,255,255,0.25)`).
  - `GlassPanel`: Structural containers, floating sidebar, and modals with `blur(36px) saturate(190%)` and deep grounding shadows.
  - `GlassPill`: Fully rounded interactive controls with specular sweep transitions and Framer Motion squash press dynamics.
- **Liquid Refraction**: GPU-safe SVG `<feDisplacementMap>` + `<feTurbulence>` filter for organic fluid edge refraction on hero search inputs and active indicators.
- **Accessibility & Contrast**: Strict WCAG AA contrast compliance across dark glass surfaces, with `@supports not (backdrop-filter)` fallback for legacy browsers and `@media (prefers-reduced-motion)` safety.
- **Responsive Layout**: Floating glass sidebar collapses into a floating glass tab bar on mobile (tested down to 375px).

---

## 🗺️ Screen Architecture & Navigation

| Screen | Route | Key Capabilities |
|---|---|---|
| **Dashboard** | `/` | Greeting, hero Brief Me search bar, 4 module summary cards with live sparklines, animated Memory Growth chart, and "Since your last visit" feed. |
| **Contact Brief** | `/contacts/:id` | **Flagship Screen**: Staggered streaming facts with soft glow, Context Depth badge (`Rich` / `Growing` / `Low`), open promises, competitor activity, feedback signals, and interactive sentence-level `(i)` icons opening the **"Why this answer"** provenance drawer. Cold start handling for new contacts. |
| **Competitor Timeline** | `/competitors/:id` | Vertical glowing timeline of events (pricing, feature launch, messaging, hiring), type icons, freshness dots (green <14d, amber 14–60d, red >60d), and competitor switcher. |
| **Campaigns** | `/campaigns` | Campaign list (channel, audience, message angle, outcome) and "Get campaign brief" glass form returning what worked, what didn't, competitor context, and suggested angle. |
| **Feedback Themes** | `/feedback` | Clustered theme cards with sentiment bars, longitudinal sentiment-over-time area chart, and modal drill-down to underlying support tickets. |
| **Content Library** | `/content` | Filterable grid by topic, performance sort, relative bar visualizations for views/shares, and anomaly badges on statistical outliers. |
| **Onboard Me** | `/onboard` | Day 1 new-hire turnover brief. Input any account or entity to generate a consolidated 360° brief across all 4 modules with module-colored glass sections. |
| **Marketing Landing Page** | `/landing` | Complete public-facing product landing page with auto-rotating hero keywords, benefits checklist, interactive 4-step pipeline, customer testimonials carousel, old-vs-new comparison table, and lead capture form. |
| **Design System** | `/preview` | Interactive gallery showcasing all 3 glass surface tiers, liquid refraction inputs, badges, freshness dots, and the 4 mandatory states. |

---

## ⚡ Signature Moments

1. **Liquid Command Palette (`⌘K` / `Ctrl+K`)**: Global Brief Me search input morphs fluidly into a command-palette modal with preset queries, role adaptation, and a **"Compare (Without Memory)"** split view.
2. **Streaming Fact Arrival**: Contact Brief facts arrive one-by-one with staggered spring timing and a glowing landing pulse.
3. **"Why This Answer" Drawer**: Clicking any sentence citation icon slides out a glass side drawer revealing the exact memory ID, source module, date, and verified fact excerpt from Hindsight.
4. **Time Machine Replay**: Top-bar slider allows fast-forwarding 4 weeks, triggering the `/replay` endpoint and animating real-time memory growth counters and chart data.

---

## 🛠️ Stack & Dependencies

- **React 19** + **TypeScript** + **Vite 8**
- **Tailwind CSS v3** (Custom tokenized liquid glass configuration)
- **Framer Motion** (Spring physics, layoutId indicators, 3D tilt, and drawers)
- **TanStack Query v5** (Server state, caching, refetching, and mutations)
- **Recharts** (Memory growth and sentiment trajectory charts)
- **Lucide React** (Modern line iconography)
- **React Router v7** (Nested routes and layout preservation)

---

## ⚙️ Environment Variables

Create `.env` in the `frontend` folder:

```bash
# FastAPI backend base URL
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1

# Toggle between live backend and realistic local mock store (default: false)
VITE_USE_MOCKS=false

# Hindsight Cluster API Key
VITE_HINDSIGHT_API_KEY=hsk_79b65639db25a983ff0c8c12054815af_63b8189b4c316840
```

### Switching From Mocks to Live Backend

1. **Via UI**: Click the **"Live API / Mock Store"** badge in the top right header to instantly toggle between live backend queries and local seeded storage.
2. **Via Config**: Set `VITE_USE_MOCKS=false` in `frontend/.env`. The client automatically falls back to local data if the backend is temporarily offline, ensuring 100% demo resilience.

---

## 🚀 Running Locally

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev

# Run TypeScript typecheck & production build
npm run build
```

Development server runs on **`http://localhost:5173`**.
