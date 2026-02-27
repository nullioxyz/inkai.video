import VideoGenerationDashboard from '@/components/video-generation/VideoGenerationDashboard';
import type { PresetItem, VideoJobItem } from '@/types/dashboard';

interface WorkspaceCreateViewProps {
  presets: PresetItem[];
  presetCategories: string[];
  loadingPresets: boolean;
  presetsError: string | null;
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

const WorkspaceCreateView = ({ presets, presetCategories, loadingPresets, presetsError, animateInTrigger, onGenerateVideo }: WorkspaceCreateViewProps) => {
  return (
    <div className="min-h-0 flex-1">
      <VideoGenerationDashboard
        presets={presets}
        presetCategories={presetCategories}
        loadingPresets={loadingPresets}
        presetsError={presetsError}
        onGenerateVideo={onGenerateVideo}
        animateInTrigger={animateInTrigger}
      />
    </div>
  );
};

export default WorkspaceCreateView;
