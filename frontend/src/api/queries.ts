import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from './client';
import {
  BriefMeRequest,
  CampaignBriefRequest,
  OnboardRequest,
  CompetitorEvent,
  Campaign,
} from '../types/api';

// 1. Competitors Hooks
export function useCompetitors() {
  return useQuery({
    queryKey: ['competitors'],
    queryFn: () => api.getCompetitors(),
  });
}

export function useCompetitorTimeline(id: string, params?: { from?: string; to?: string }) {
  return useQuery({
    queryKey: ['competitor-timeline', id, params],
    queryFn: () => api.getCompetitorTimeline(id, params),
    enabled: Boolean(id),
  });
}

export function useAddCompetitorEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, event }: { id: string; event: Partial<CompetitorEvent> }) =>
      api.addCompetitorEvent(id, event),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['competitor-timeline', id] });
      queryClient.invalidateQueries({ queryKey: ['competitors'] });
    },
  });
}

// 2. Content Hooks
export function useContent(params?: { topic?: string; search?: string; sort?: 'views' | 'shares' | 'published_at' }) {
  return useQuery({
    queryKey: ['content', params],
    queryFn: () => api.getContent(params),
  });
}

// 3. Contacts Hooks
export function useContactsList() {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: () => api.getContactsList(),
  });
}

export function useContactBrief(id: string) {
  return useQuery({
    queryKey: ['contact-brief', id],
    queryFn: () => api.getContactBrief(id),
    enabled: Boolean(id),
  });
}

// 4. Feedback Hooks
export function useFeedbackThemes() {
  return useQuery({
    queryKey: ['feedback-themes'],
    queryFn: () => api.getFeedbackThemes(),
  });
}

// 5. Campaigns Hooks
export function useCampaigns() {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: () => api.getCampaigns(),
  });
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (campaign: Partial<Campaign>) => api.createCampaign(campaign),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });
}

export function useCampaignBrief() {
  return useMutation({
    mutationFn: (request: CampaignBriefRequest) => api.getCampaignBrief(request),
  });
}

// 6. Cross-Module Brief Me Hook
export function useBriefMe() {
  return useMutation({
    mutationFn: (request: BriefMeRequest) => api.briefMe(request),
  });
}

// 7. Onboard Hook
export function useOnboard() {
  return useMutation({
    mutationFn: (request: OnboardRequest) => api.onboard(request),
  });
}

// 8. Memory Stats & Time Machine Replay
export function useMemoryStats() {
  return useQuery({
    queryKey: ['memory-stats'],
    queryFn: () => api.getMemoryStats(),
  });
}

export function useTimeMachineReplay() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (weeks: number = 4) => api.replay(weeks),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memory-stats'] });
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['competitors'] });
    },
  });
}
