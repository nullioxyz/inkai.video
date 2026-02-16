export type PresetCategory = 'braço' | 'costas' | 'pescoço' | 'pernas' | 'antebraço' | 'peitoral';

export interface PresetItem {
  id: string;
  category: PresetCategory;
  name: string;
  description: string;
  imageSrc: string;
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
}

export interface GeneratedVideoRecord extends VideoJobItem {
  creditsUsed: number;
}
