import { CreditStatementEntryViewModel, CreditVideoGenerationViewModel } from '@/modules/credits/domain/view-models';
import { DailyGenerationQuota } from '@/modules/videos/domain/contracts';
import { GenerationEstimate, ModelItem, PresetItem, VideoJobItem } from '@/types/dashboard';

export interface CreateVideoPayload {
  title: string;
  imageFile: File;
  imageSrc: string;
  model: ModelItem;
  preset: PresetItem;
  durationSeconds?: number | null;
  estimatedCreditsRequired?: number;
  estimatedGenerationCostUsd?: string | null;
}

export interface EstimateVideoPayload {
  model: ModelItem;
  preset: PresetItem;
  durationSeconds?: number | null;
}

export interface DashboardContextType {
  token: string | null;
  sessionExpired: boolean;
  isHydrated: boolean;
  userId: number | null;
  userName: string;
  userEmail: string;
  userLanguageId: number | null;
  userLanguageSlug: string | null;
  themePreference: 'light' | 'dark' | 'system';
  userRoles: string[];
  canAccessAdmin: boolean;
  mustResetPassword: boolean;
  quota: DailyGenerationQuota | null;
  quotaError: string | null;
  realtimeConnected: boolean;
  creditBalance: number;
  creditStatement: CreditStatementEntryViewModel[];
  creditVideoGenerations: CreditVideoGenerationViewModel[];
  videos: VideoJobItem[];
  models: ModelItem[];
  presetsByModelId: Record<string, PresetItem[]>;
  presetCategoriesByModelId: Record<string, string[]>;
  loadingPresets: boolean;
  loadingJobs: boolean;
  jobsError: string | null;
  presetsError: string | null;
  createVideo: (payload: CreateVideoPayload) => Promise<VideoJobItem>;
  estimateVideoGeneration: (payload: EstimateVideoPayload) => Promise<GenerationEstimate>;
  refreshQuota: () => Promise<DailyGenerationQuota | null>;
  updatePreferences: (payload: { languageId?: number | null; themePreference?: 'light' | 'dark' | 'system' | null }) => Promise<void>;
  renameVideo: (videoId: string, title: string) => Promise<void>;
  resetPassword: (currentPassword: string, newPassword: string, confirmation: string) => Promise<void>;
  cancelVideo: (video: VideoJobItem) => Promise<void>;
  refreshJobs: () => Promise<void>;
  restoreSession: (nextToken: string) => void;
  markSessionExpired: () => void;
  logout: () => void;
}
