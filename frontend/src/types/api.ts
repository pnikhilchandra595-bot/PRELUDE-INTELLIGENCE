export type ErrorCode = 
  | 'VALIDATION_ERROR' 
  | 'NOT_FOUND' 
  | 'LLM_TIMEOUT' 
  | 'MEMORY_UNAVAILABLE'
  | 'INTERNAL_ERROR';

export interface ApiErrorPayload {
  code: ErrorCode;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiResponse<T> {
  data: T | null;
  error: ApiErrorPayload | null;
}

export class ApiError extends Error {
  code: ErrorCode;
  details?: Record<string, unknown>;
  status?: number;

  constructor(payload: ApiErrorPayload, status = 500) {
    super(payload.message);
    this.name = 'ApiError';
    this.code = payload.code;
    this.details = payload.details;
    this.status = status;
  }
}

// 1. Competitors
export type CompetitorEventType = 'pricing' | 'feature' | 'messaging' | 'hiring';

export interface CompetitorEvent {
  id: string;
  competitor_id: string;
  competitor_name: string;
  event_type: CompetitorEventType;
  title: string;
  description: string;
  event_date: string; // ISO date 'YYYY-MM-DD'
  age_days: number;
  impact_level?: 'low' | 'medium' | 'high' | 'critical';
  source_url?: string;
  tags?: string[];
}

export interface Competitor {
  id: string;
  name: string;
  domain: string;
  category: string;
  tier: 'tier_1' | 'tier_2' | 'emerging';
  event_count: number;
}

// 2. Content Pieces
export interface ContentPiece {
  id: string;
  title: string;
  topic: string;
  url: string;
  published_at: string;
  views: number;
  shares: number;
  read_time_minutes?: number;
  performance_score?: number;
  format?: 'blog' | 'case_study' | 'whitepaper' | 'webinar';
  summary?: string;
  is_anomaly?: boolean;
}

// 3. Contact Brief & Provenance Sources
export interface FactSource {
  sentence_index: number;
  memory_id: string;
  module: 'meeting' | 'competitor' | 'feedback' | 'content' | 'campaign';
  date: string;
  excerpt: string;
  age_days: number;
}

export type ContextDepth = 'low' | 'growing' | 'rich';

export interface ContactBriefData {
  contact_id?: string;
  contact: string;
  company?: string;
  role?: string;
  last_meeting: string | null;
  context_depth: ContextDepth;
  open_promises: string[];
  relevant_competitor_activity: string[];
  relevant_feedback: string[];
  summary: string;
  sources: FactSource[];
  age_days?: number;
  deal_value?: string;
  renewal_date?: string;
  churn_risk?: 'low' | 'medium' | 'high';
  call_transcripts?: Array<{
    timestamp: string;
    speaker: string;
    text: string;
    sentiment?: 'positive' | 'neutral' | 'frustrated' | 'urgent';
  }>;
  engineering_tickets?: Array<{
    key: string;
    title: string;
    status: 'in_progress' | 'resolved' | 'review' | 'blocked';
    assignee?: string;
  }>;
  arr_history?: Array<{
    quarter: string;
    arr_k: number;
    stage: string;
  }>;
  stance_evolution?: Array<{
    period: string;
    stance: string;
    sentiment: 'cautious' | 'evaluating' | 'at_risk' | 'champion';
    trigger: string;
  }>;
  contradictions?: Array<{
    id: string;
    severity: 'critical' | 'moderate' | 'watch';
    title: string;
    silo_a: { source: string; claim: string };
    silo_b: { source: string; claim: string };
    action_item: string;
  }>;
}

export interface ContactListItem {
  id: string;
  name: string;
  company: string;
  role: string;
  has_history: boolean;
  context_depth: ContextDepth;
}

// 4. Feedback Themes
export interface SentimentDataPoint {
  date: string;
  positive: number;
  neutral: number;
  negative: number;
  overall_score: number;
}

export interface FeedbackTheme {
  id: string;
  name: string;
  category: 'onboarding' | 'pricing' | 'usability' | 'features' | 'support';
  sentiment: 'positive' | 'neutral' | 'negative';
  sentiment_score: number;
  mention_count: number;
  trend: 'up' | 'down' | 'stable';
  summary: string;
  top_quotes: string[];
  affected_segments: string[];
}

export interface FeedbackItem {
  id: string;
  theme_id: string;
  account: string;
  user: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  text: string;
  date: string;
  age_days: number;
}

export interface FeedbackThemesResponse {
  themes: FeedbackTheme[];
  sentiment_trend: SentimentDataPoint[];
  total_feedback_count: number;
  avg_sentiment: number;
}

// 5. Campaigns & Campaign Brief
export interface Campaign {
  id: string;
  name: string;
  channel: 'email' | 'linkedin' | 'ads' | 'blog' | 'webinar';
  audience: string;
  message_angle: string;
  launched_at: string;
  outcome_summary: string;
  hindsight_memory_id?: string;
}

export interface CampaignBriefRequest {
  audience: string;
  goal: string;
}

export interface CampaignBriefResponse {
  audience: string;
  goal: string;
  what_worked: string[];
  what_didnt: string[];
  competitor_context: string[];
  suggested_angle: string;
  sources: FactSource[];
  is_cold_start?: boolean;
}

// 6. Onboard Me
export interface OnboardRequest {
  entity: string;
}

export interface OnboardModuleSummary {
  module: 'competitive' | 'content' | 'meeting' | 'feedback';
  title: string;
  highlights: string[];
  memory_count: number;
  freshness: string;
}

export interface OnboardResponse {
  entity: string;
  consolidated_summary: string;
  modules: OnboardModuleSummary[];
  total_memories: number;
  key_stakeholders: { name: string; role: string; sentiment: string }[];
  generated_at: string;
}

// 7. Time Machine & Memory Stats
export interface MemoryGrowthPoint {
  week: string;
  count: number;
  cumulative: number;
}

export interface MemoryStats {
  total_memories: number;
  weekly_growth: MemoryGrowthPoint[];
  active_entities: number;
  cross_module_connections: number;
  cluster_health: 'healthy' | 'syncing' | 'degraded';
  last_retained_at: string;
}

export interface ReplayResponse {
  weeks: number;
  memories_replayed: number;
  previous_count: number;
  new_count: number;
  message: string;
}

// 8. Brief Me Hero Query & Comparison
export interface BriefMeSource {
  module: 'competitors' | 'content' | 'contacts' | 'feedback';
  title: string;
  snippet: string;
  date?: string;
  url?: string;
  age_days?: number;
}

export interface BriefMeRequest {
  query: string;
  role?: 'executive' | 'sales' | 'product' | 'marketing';
}

export interface BriefMeResponse {
  query: string;
  synthesized_answer: string;
  key_takeaways: string[];
  recommended_action?: string;
  confidence_score: number;
  sources: BriefMeSource[];
  generated_at: string;
  generic_comparison?: {
    generic_answer: string;
    missing_context: string[];
    drawbacks: string;
  };
}
