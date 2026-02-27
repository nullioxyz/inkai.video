import { CreditStatementEntryViewModel, CreditVideoGenerationViewModel } from '@/modules/credits/domain/view-models';
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
  mustResetPassword: boolean;
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
  renameVideo: (videoId: string, title: string) => Promise<void>;
  resetPassword: (currentPassword: string, newPassword: string, confirmation: string) => Promise<void>;
  cancelVideo: (video: VideoJobItem) => Promise<void>;
  refreshJobs: () => Promise<void>;
  logout: () => void;
}
