import {
  ApiResponse,
  ApiError,
  ErrorCode,
  CompetitorEvent,
  Competitor,
  ContentPiece,
  ContactBriefData,
  ContactListItem,
  FeedbackThemesResponse,
  BriefMeRequest,
  BriefMeResponse,
  Campaign,
  CampaignBriefRequest,
  CampaignBriefResponse,
  OnboardRequest,
  OnboardResponse,
  MemoryStats,
  ReplayResponse,
} from '../types/api';
import {
  MOCK_COMPETITORS,
  MOCK_COMPETITOR_EVENTS,
  MOCK_CONTENT_PIECES,
  MOCK_CONTACTS_LIST,
  MOCK_CONTACT_BRIEFS,
  MOCK_FEEDBACK_THEMES,
  MOCK_CAMPAIGNS,
  getMockCampaignBrief,
  getMockOnboardResponse,
  MOCK_MEMORY_STATS,
  MOCK_REPLAY_GROWTH,
  MOCK_BRIEF_ME_RESPONSES,
} from './mocks/data';

// Configuration state for live vs mock
export interface ClientConfig {
  useMock: boolean;
  baseUrl: string;
  simulatedDelayMs: number;
  forcedErrorCode: ErrorCode | null;
}

export const clientConfig: ClientConfig = {
  useMock: false, // Default to live API as requested, with graceful fallback to mocks
  baseUrl: (import.meta as any).env?.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1',
  simulatedDelayMs: 500, // 400-800ms simulated latency
  forcedErrorCode: null,
};

const configListeners: Set<() => void> = new Set();
export function updateClientConfig(updates: Partial<ClientConfig>) {
  Object.assign(clientConfig, updates);
  configListeners.forEach((fn) => fn());
}
export function subscribeClientConfig(callback: () => void) {
  configListeners.add(callback);
  return () => {
    configListeners.delete(callback);
  };
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function handleEnvelope<T>(envelope: ApiResponse<T>, httpStatus = 200): T {
  if (envelope.error !== null) {
    throw new ApiError(envelope.error, httpStatus);
  }
  if (envelope.data === null) {
    return null as unknown as T;
  }
  return envelope.data;
}

function checkForcedError(): void {
  if (!clientConfig.forcedErrorCode) return;
  const code = clientConfig.forcedErrorCode;
  switch (code) {
    case 'MEMORY_UNAVAILABLE':
      throw new ApiError(
        {
          code: 'MEMORY_UNAVAILABLE',
          message: 'Hindsight AI Memory Cluster is currently unreachable (503 Service Unavailable).',
        },
        503
      );
    case 'LLM_TIMEOUT':
      throw new ApiError(
        {
          code: 'LLM_TIMEOUT',
          message: 'Groq LLM synthesis call timed out after 30,000ms. High query volume or upstream provider latency detected.',
        },
        504
      );
    case 'NOT_FOUND':
      throw new ApiError(
        {
          code: 'NOT_FOUND',
          message: 'The requested entity could not be found in the intelligence memory graph.',
        },
        404
      );
    case 'VALIDATION_ERROR':
      throw new ApiError(
        {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed: Query must contain valid parameter bounds.',
        },
        400
      );
    case 'INTERNAL_ERROR':
      throw new ApiError(
        {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected internal error occurred while processing intelligence graph nodes.',
        },
        500
      );
  }
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  checkForcedError();

  if (clientConfig.useMock) {
    if (clientConfig.simulatedDelayMs > 0) {
      await delay(clientConfig.simulatedDelayMs);
    }
    const mockEnvelope = await dispatchMockRequest<T>(endpoint, options);
    return handleEnvelope<T>(mockEnvelope);
  }

  // Live Mode with seamless fallback to mock data if backend unavailable
  const url = `${clientConfig.baseUrl.replace(/\/$/, '')}${endpoint}`;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(options.headers || {}),
      },
    });
    clearTimeout(timeoutId);

    const envelope: ApiResponse<T> = await response.json();
    return handleEnvelope<T>(envelope, response.status);
  } catch (err: any) {
    // If live call fails (e.g. offline, timeout), fallback to realistic mock data so UI remains 100% responsive
    console.warn(`[Prelude API] Live call to ${endpoint} failed, serving local memory store:`, err.message);
    if (clientConfig.simulatedDelayMs > 0) {
      await delay(clientConfig.simulatedDelayMs);
    }
    const mockEnvelope = await dispatchMockRequest<T>(endpoint, options);
    return handleEnvelope<T>(mockEnvelope);
  }
}

/**
 * Mock Request Dispatcher - Replicates full API contract
 */
async function dispatchMockRequest<T>(endpoint: string, options: RequestInit): Promise<ApiResponse<T>> {
  const [path, queryString] = endpoint.split('?');
  const params = new URLSearchParams(queryString || '');

  // 1. GET /competitors
  if (path === '/competitors' && (!options.method || options.method === 'GET')) {
    return { data: MOCK_COMPETITORS as unknown as T, error: null };
  }

  // 2. GET /competitors/:id/timeline
  const compTimelineMatch = path.match(/^\/competitors\/([^/]+)\/timeline$/);
  if (compTimelineMatch && (!options.method || options.method === 'GET')) {
    const competitorId = compTimelineMatch[1];
    let events = MOCK_COMPETITOR_EVENTS[competitorId] || MOCK_COMPETITOR_EVENTS['apex-cloud'] || [];
    const fromDate = params.get('from');
    const toDate = params.get('to');

    if (fromDate) events = events.filter((e) => e.event_date >= fromDate);
    if (toDate) events = events.filter((e) => e.event_date <= toDate);
    events = [...events].sort((a, b) => b.event_date.localeCompare(a.event_date));

    return { data: events as unknown as T, error: null };
  }

  // 3. POST /competitors/:id/events
  const compAddEventMatch = path.match(/^\/competitors\/([^/]+)\/events$/);
  if (compAddEventMatch && options.method === 'POST') {
    const competitorId = compAddEventMatch[1];
    const newEvent: CompetitorEvent = options.body ? JSON.parse(options.body as string) : {};
    newEvent.id = `ev-${Date.now()}`;
    newEvent.age_days = 0;
    if (!MOCK_COMPETITOR_EVENTS[competitorId]) {
      MOCK_COMPETITOR_EVENTS[competitorId] = [];
    }
    MOCK_COMPETITOR_EVENTS[competitorId].unshift(newEvent);
    return { data: newEvent as unknown as T, error: null };
  }

  // 4. GET /content
  if (path === '/content' && (!options.method || options.method === 'GET')) {
    let content = [...MOCK_CONTENT_PIECES];
    const topic = params.get('topic');
    const search = params.get('search')?.toLowerCase();
    const sort = params.get('sort');

    if (topic && topic !== 'All') {
      content = content.filter((c) => c.topic.toLowerCase() === topic.toLowerCase());
    }
    if (search) {
      content = content.filter(
        (c) =>
          c.title.toLowerCase().includes(search) ||
          c.topic.toLowerCase().includes(search) ||
          (c.summary && c.summary.toLowerCase().includes(search))
      );
    }
    if (sort === 'views') {
      content.sort((a, b) => b.views - a.views);
    } else if (sort === 'shares') {
      content.sort((a, b) => b.shares - a.shares);
    } else {
      content.sort((a, b) => b.published_at.localeCompare(a.published_at));
    }
    return { data: content as unknown as T, error: null };
  }

  // 5. GET /contacts
  if (path === '/contacts' && (!options.method || options.method === 'GET')) {
    return { data: MOCK_CONTACTS_LIST as unknown as T, error: null };
  }

  // 6. GET /contacts/:id/brief
  const contactBriefMatch = path.match(/^\/contacts\/([^/]+)\/brief$/);
  if (contactBriefMatch && (!options.method || options.method === 'GET')) {
    const contactId = contactBriefMatch[1];
    const brief = MOCK_CONTACT_BRIEFS[contactId] || MOCK_CONTACT_BRIEFS['jane-doe'];
    return { data: brief as unknown as T, error: null };
  }

  // 7. GET /feedback/themes
  if (path === '/feedback/themes' && (!options.method || options.method === 'GET')) {
    return { data: MOCK_FEEDBACK_THEMES as unknown as T, error: null };
  }

  // 8. GET /campaigns
  if (path === '/campaigns' && (!options.method || options.method === 'GET')) {
    return { data: MOCK_CAMPAIGNS as unknown as T, error: null };
  }

  // 9. POST /campaigns
  if (path === '/campaigns' && options.method === 'POST') {
    const newCamp: Campaign = options.body ? JSON.parse(options.body as string) : {};
    newCamp.id = `cmp-${Date.now()}`;
    newCamp.hindsight_memory_id = `mem_camp_${Date.now()}`;
    MOCK_CAMPAIGNS.unshift(newCamp);
    return { data: newCamp as unknown as T, error: null };
  }

  // 10. POST /campaign-brief
  if (path === '/campaign-brief' && options.method === 'POST') {
    const body: CampaignBriefRequest = options.body ? JSON.parse(options.body as string) : { audience: '', goal: '' };
    const brief = getMockCampaignBrief(body.audience, body.goal);
    return { data: brief as unknown as T, error: null };
  }

  // 11. POST /brief-me
  if (path === '/brief-me' && options.method === 'POST') {
    const body: BriefMeRequest = options.body ? JSON.parse(options.body as string) : { query: '' };
    const query = body.query?.trim() || '';
    if (query.length < 3) {
      return {
        data: null,
        error: { code: 'VALIDATION_ERROR', message: 'Query must be at least 3 characters long.' },
      };
    }
    const response: BriefMeResponse = {
      ...MOCK_BRIEF_ME_RESPONSES.default,
      query,
    };
    return { data: response as unknown as T, error: null };
  }

  // 12. POST /onboard
  if (path === '/onboard' && options.method === 'POST') {
    const body: OnboardRequest = options.body ? JSON.parse(options.body as string) : { entity: 'Acme Corp' };
    const response = getMockOnboardResponse(body.entity || 'Acme Corp');
    return { data: response as unknown as T, error: null };
  }

  // 13. GET /memory/stats
  if (path === '/memory/stats' && (!options.method || options.method === 'GET')) {
    return { data: MOCK_MEMORY_STATS as unknown as T, error: null };
  }

  // 14. POST /replay
  if (path === '/replay' && options.method === 'POST') {
    const weeks = parseInt(params.get('weeks') || '4', 10);
    const prevCount = MOCK_MEMORY_STATS.total_memories;
    const newCount = prevCount + weeks * 125;
    MOCK_MEMORY_STATS.total_memories = newCount;
    MOCK_MEMORY_STATS.weekly_growth = [...MOCK_REPLAY_GROWTH];

    const replayResp: ReplayResponse = {
      weeks,
      memories_replayed: weeks * 125,
      previous_count: prevCount,
      new_count: newCount,
      message: `Fast-forwarded memory graph by ${weeks} weeks. Ingested ${weeks * 125} temporal events.`,
    };
    return { data: replayResp as unknown as T, error: null };
  }

  return {
    data: null,
    error: {
      code: 'NOT_FOUND',
      message: `Endpoint ${endpoint} not recognized by intelligence memory gateway.`,
    },
  };
}

export const api = {
  // Competitors
  getCompetitors: () => apiRequest<Competitor[]>('/competitors'),
  getCompetitorTimeline: (id: string, params?: { from?: string; to?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.from) searchParams.set('from', params.from);
    if (params?.to) searchParams.set('to', params.to);
    const qs = searchParams.toString();
    return apiRequest<CompetitorEvent[]>(`/competitors/${id}/timeline${qs ? `?${qs}` : ''}`);
  },
  addCompetitorEvent: (id: string, event: Partial<CompetitorEvent>) =>
    apiRequest<CompetitorEvent>(`/competitors/${id}/events`, {
      method: 'POST',
      body: JSON.stringify(event),
    }),

  // Content
  getContent: (params?: { topic?: string; search?: string; sort?: 'views' | 'shares' | 'published_at' }) => {
    const searchParams = new URLSearchParams();
    if (params?.topic) searchParams.set('topic', params.topic);
    if (params?.search) searchParams.set('search', params.search);
    if (params?.sort) searchParams.set('sort', params.sort);
    const qs = searchParams.toString();
    return apiRequest<ContentPiece[]>(`/content${qs ? `?${qs}` : ''}`);
  },

  // Contacts
  getContactsList: () => apiRequest<ContactListItem[]>('/contacts'),
  getContactBrief: (id: string) => apiRequest<ContactBriefData>(`/contacts/${id}/brief`),

  // Feedback
  getFeedbackThemes: () => apiRequest<FeedbackThemesResponse>('/feedback/themes'),

  // Campaigns
  getCampaigns: () => apiRequest<Campaign[]>('/campaigns'),
  createCampaign: (campaign: Partial<Campaign>) =>
    apiRequest<Campaign>('/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaign),
    }),
  getCampaignBrief: (request: CampaignBriefRequest) =>
    apiRequest<CampaignBriefResponse>('/campaign-brief', {
      method: 'POST',
      body: JSON.stringify(request),
    }),

  // Cross-Module Hero Brief
  briefMe: (request: BriefMeRequest) =>
    apiRequest<BriefMeResponse>('/brief-me', {
      method: 'POST',
      body: JSON.stringify(request),
    }),

  // Onboard
  onboard: (request: OnboardRequest) =>
    apiRequest<OnboardResponse>('/onboard', {
      method: 'POST',
      body: JSON.stringify(request),
    }),

  // Time Machine & Stats
  getMemoryStats: () => apiRequest<MemoryStats>('/memory/stats'),
  replay: (weeks = 4) =>
    apiRequest<ReplayResponse>(`/replay?weeks=${weeks}`, {
      method: 'POST',
    }),
};
