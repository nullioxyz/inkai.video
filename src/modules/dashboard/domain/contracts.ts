import { CreditStatementEntryViewModel, CreditVideoGenerationViewModel } from '@/modules/credits/domain/view-models';
import { DailyGenerationQuota } from '@/modules/videos/domain/contracts';
import { PresetItem, VideoJobItem } from '@/types/dashboard';

export interface CreateVideoPayload {
  title: string;
  imageFile: File;
  imageSrc: string;
  preset: PresetItem;
}

export interface DashboardContextType {
  token: string | null;
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
  presets: PresetItem[];
  presetCategories: string[];
  loadingPresets: boolean;
  loadingJobs: boolean;
  jobsError: string | null;
  presetsError: string | null;
  createVideo: (payload: CreateVideoPayload) => Promise<VideoJobItem>;
  refreshQuota: () => Promise<DailyGenerationQuota | null>;
  updatePreferences: (payload: { languageId?: number | null; themePreference?: 'light' | 'dark' | 'system' | null }) => Promise<void>;
  renameVideo: (videoId: string, title: string) => Promise<void>;
  resetPassword: (currentPassword: string, newPassword: string, confirmation: string) => Promise<void>;
  cancelVideo: (video: VideoJobItem) => Promise<void>;
  refreshJobs: () => Promise<void>;
  logout: () => void;
}
