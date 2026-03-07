export type PresetCategory = string;

export interface ModelItem {
  id: string;
  backendModelId: number;
  name: string;
  slug: string;
  subtitle?: string | null;
  version?: string | null;
  providerModelKey?: string | null;
  costPerSecondUsd?: string | null;
  availableForGeneration: boolean;
  publicVisible: boolean;
  sortOrder: number;
}

export interface PresetTagItem {
  id: number;
  name: string;
  slug: string;
}

export interface PresetItem {
  id: string;
  category: PresetCategory;
  tags?: PresetTagItem[];
  name: string;
  description: string;
  imageSrc: string;
  previewImageUrl?: string | null;
  backendModelId?: number;
  backendPresetId?: number;
  aspectRatio?: string | null;
  durationSeconds?: number | null;
  previewVideoUrl?: string | null;
}

export interface GenerationEstimate {
  modelId: number;
  presetId: number;
  durationSeconds: number;
  creditsRequired: number;
  modelCostPerSecondUsd: string | null;
  estimatedGenerationCostUsd: string | null;
  creditUnitValueUsd: string | null;
}

export type VideoJobStatus = 'processing' | 'completed' | 'failed' | 'canceled';

export interface VideoJobItem {
  id: string;
  title: string;
  imageSrc: string;
  videoUrl: string;
  modelName?: string | null;
  presetName?: string | null;
  status: VideoJobStatus;
  format: string;
  prompt: string;
  createdAt: string;
  inputId?: number;
  durationSeconds?: number | null;
  estimatedCostUsd?: string | null;
  billingStatus?: string | null;
  creditsUsed?: number;
}

export interface GeneratedVideoRecord extends VideoJobItem {
  creditsUsed: number;
}
