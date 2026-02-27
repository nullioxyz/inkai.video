import VideoGenerationDashboard from '@/components/video-generation/VideoGenerationDashboard';
import { DailyGenerationQuota } from '@/modules/videos/domain/contracts';
import type { PresetItem, VideoJobItem } from '@/types/dashboard';

interface WorkspaceCreateViewProps {
  presets: PresetItem[];
  presetCategories: string[];
  loadingPresets: boolean;
  presetsError: string | null;
  quota: DailyGenerationQuota | null;
  quotaError: string | null;
  animateInTrigger: number;
  onGenerateVideo: (payload: {
    title: string;
    imageFile: File;
    imageSrc: string;
    format: string;
    prompt: string;
    preset: PresetItem;
  }) => Promise<VideoJobItem>;
}

const WorkspaceCreateView = ({
  presets,
  presetCategories,
  loadingPresets,
  presetsError,
  quota,
  quotaError,
  animateInTrigger,
  onGenerateVideo,
}: WorkspaceCreateViewProps) => {
  return (
    <div className="min-h-0 flex-1">
      <VideoGenerationDashboard
        presets={presets}
        presetCategories={presetCategories}
        loadingPresets={loadingPresets}
        presetsError={presetsError}
        quota={quota}
        quotaError={quotaError}
        onGenerateVideo={onGenerateVideo}
        animateInTrigger={animateInTrigger}
      />
    </div>
  );
};

export default WorkspaceCreateView;
