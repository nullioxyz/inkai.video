import VideoGenerationDashboard from '@/components/video-generation/VideoGenerationDashboard';
import { DailyGenerationQuota } from '@/modules/videos/domain/contracts';
import type { GenerationEstimate, ModelItem, PresetItem, VideoJobItem } from '@/types/dashboard';

interface WorkspaceCreateViewProps {
  models: ModelItem[];
  presetsByModelId: Record<string, PresetItem[]>;
  presetCategoriesByModelId: Record<string, string[]>;
  loadingPresets: boolean;
  presetsError: string | null;
  quota: DailyGenerationQuota | null;
  quotaError: string | null;
  creditBalance: number;
  animateInTrigger: number;
  onEstimateVideo: (payload: { model: ModelItem; preset: PresetItem; durationSeconds?: number | null }) => Promise<GenerationEstimate>;
  onGenerateVideo: (payload: {
    title: string;
    imageFile: File;
    imageSrc: string;
    model: ModelItem;
    preset: PresetItem;
    durationSeconds?: number | null;
    estimatedCreditsRequired?: number;
    estimatedGenerationCostUsd?: string | null;
  }) => Promise<VideoJobItem>;
}

const WorkspaceCreateView = ({
  models,
  presetsByModelId,
  presetCategoriesByModelId,
  loadingPresets,
  presetsError,
  quota,
  quotaError,
  creditBalance,
  animateInTrigger,
  onEstimateVideo,
  onGenerateVideo,
}: WorkspaceCreateViewProps) => {
  return (
    <div className="min-h-0 flex-1">
      <VideoGenerationDashboard
        models={models}
        presetsByModelId={presetsByModelId}
        presetCategoriesByModelId={presetCategoriesByModelId}
        loadingPresets={loadingPresets}
        presetsError={presetsError}
        quota={quota}
        quotaError={quotaError}
        creditBalance={creditBalance}
        onEstimateVideo={onEstimateVideo}
        onGenerateVideo={onGenerateVideo}
        animateInTrigger={animateInTrigger}
      />
    </div>
  );
};

export default WorkspaceCreateView;
