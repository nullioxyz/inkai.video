'use client';

import type { VideoJobItem, PresetItem } from '@/types/dashboard';
import GenerationViewHeader from './dashboard/GenerationViewHeader';
import VideoGenerationCreateView from './dashboard/VideoGenerationCreateView';
import VideoGenerationPreviewView from './dashboard/VideoGenerationPreviewView';
import { VideoGenerationFormProvider } from './context/VideoGenerationFormContext';
import { useVideoGenerationDashboard } from './useVideoGenerationDashboard';

interface GenerateVideoPayload {
  title: string;
  imageFile: File;
  imageSrc: string;
  format: string;
  prompt: string;
  preset: PresetItem;
}

interface VideoGenerationDashboardProps {
  presets: PresetItem[];
  presetCategories: string[];
  loadingPresets?: boolean;
  presetsError?: string | null;
  onGenerateVideo: (payload: GenerateVideoPayload) => Promise<VideoJobItem>;
  animateInTrigger?: number;
}

const VideoGenerationDashboard = ({
  presets,
  presetCategories,
  loadingPresets = false,
  presetsError = null,
  onGenerateVideo,
  animateInTrigger = 0,
}: VideoGenerationDashboardProps) => {
  return (
    <VideoGenerationFormProvider>
      <VideoGenerationDashboardContent
        presets={presets}
        presetCategories={presetCategories}
        loadingPresets={loadingPresets}
        presetsError={presetsError}
        onGenerateVideo={onGenerateVideo}
        animateInTrigger={animateInTrigger}
      />
    </VideoGenerationFormProvider>
  );
};

const VideoGenerationDashboardContent = ({
  presets,
  presetCategories,
  loadingPresets = false,
  presetsError = null,
  onGenerateVideo,
  animateInTrigger = 0,
}: VideoGenerationDashboardProps) => {
  const {
    isTransitioning,
    previewVideo,
    isEnteringFromDetail,
    selectedCategory,
    filteredPresets,
    errorMessage,
    selectedPreset,
    setSelectedCategory,
    setSelectedPresetId,
    handleGenerate,
    handleResetCreation,
    canGenerate,
  } = useVideoGenerationDashboard({
    presets,
    presetCategories,
    onGenerateVideo,
    animateInTrigger,
  });

  return (
    <section className="flex h-full min-h-0 w-full flex-col">
      <div
        className={`mx-auto relative flex h-full w-full max-w-[1120px] min-h-0 flex-col transition-all duration-350 ${
          isEnteringFromDetail ? 'translate-x-8 opacity-0' : 'translate-x-0 opacity-100'
        }`}>
        <GenerationViewHeader hasPreviewVideo={Boolean(previewVideo)} />

        <div className="mt-8 flex min-h-0 flex-1 flex-col overflow-hidden">
          {!previewVideo ? (
            <VideoGenerationCreateView
              isTransitioning={isTransitioning}
              presetCategories={presetCategories}
              selectedCategory={selectedCategory ?? ''}
              onSelectCategory={setSelectedCategory}
              loadingPresets={loadingPresets}
              presetsError={presetsError}
              filteredPresets={filteredPresets}
              selectedPresetId={selectedPreset?.id ?? null}
              onSelectPreset={setSelectedPresetId}
              errorMessage={errorMessage}
              onGenerate={handleGenerate}
              canGenerate={canGenerate}
            />
          ) : (
            <VideoGenerationPreviewView video={previewVideo} onCreateNewVideo={handleResetCreation} />
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoGenerationDashboard;
