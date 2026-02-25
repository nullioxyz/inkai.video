export type PresetCategory = string;

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

export type VideoJobStatus = 'processing' | 'completed' | 'failed' | 'canceled';

export interface VideoJobItem {
  id: string;
  title: string;
  imageSrc: string;
  videoUrl: string;
  status: VideoJobStatus;
  format: string;
  prompt: string;
  createdAt: string;
  inputId?: number;
  creditsUsed?: number;
}

export interface GeneratedVideoRecord extends VideoJobItem {
  creditsUsed: number;
}
