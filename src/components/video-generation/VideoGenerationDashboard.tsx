'use client';

import type { GenerationEstimate, ModelItem, PresetItem, VideoJobItem } from '@/types/dashboard';
import { DailyGenerationQuota } from '@/modules/videos/domain/contracts';
import GenerationViewHeader from './dashboard/GenerationViewHeader';
import GenerationQuotaBanner from './dashboard/GenerationQuotaBanner';
import VideoGenerationCreateView from './dashboard/VideoGenerationCreateView';
import VideoGenerationPreviewView from './dashboard/VideoGenerationPreviewView';
import { VideoGenerationFormProvider } from './context/VideoGenerationFormContext';
import { useVideoGenerationDashboard } from './useVideoGenerationDashboard';

interface GenerateVideoPayload {
  title: string;
  imageFile: File;
  imageSrc: string;
  model: ModelItem;
  preset: PresetItem;
  durationSeconds?: number | null;
  estimatedCreditsRequired?: number;
  estimatedGenerationCostUsd?: string | null;
}

interface VideoGenerationDashboardProps {
  models: ModelItem[];
  presetsByModelId: Record<string, PresetItem[]>;
  presetCategoriesByModelId: Record<string, string[]>;
  loadingPresets?: boolean;
  presetsError?: string | null;
  quota?: DailyGenerationQuota | null;
  quotaError?: string | null;
  creditBalance: number;
  onEstimateVideo: (payload: { model: ModelItem; preset: PresetItem; durationSeconds?: number | null }) => Promise<GenerationEstimate>;
  onGenerateVideo: (payload: GenerateVideoPayload) => Promise<VideoJobItem>;
  animateInTrigger?: number;
}

const VideoGenerationDashboard = ({
  models,
  presetsByModelId,
  presetCategoriesByModelId,
  loadingPresets = false,
  presetsError = null,
  quota = null,
  quotaError = null,
  creditBalance,
  onEstimateVideo,
  onGenerateVideo,
  animateInTrigger = 0,
}: VideoGenerationDashboardProps) => {
  return (
    <VideoGenerationFormProvider>
      <VideoGenerationDashboardContent
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
    </VideoGenerationFormProvider>
  );
};

const VideoGenerationDashboardContent = ({
  models,
  presetsByModelId,
  presetCategoriesByModelId,
  loadingPresets = false,
  presetsError = null,
  quota = null,
  quotaError = null,
  creditBalance,
  onEstimateVideo,
  onGenerateVideo,
  animateInTrigger = 0,
}: VideoGenerationDashboardProps) => {
  const {
    isTransitioning,
    previewVideo,
    isEnteringFromDetail,
    selectedCategory,
    selectedModel,
    filteredPresets,
    selectedPreset,
    isGenerating,
    disabledReason,
    generationErrorMessage,
    estimateErrorMessage,
    canGenerate,
    hasInsufficientBalance,
    emptyPresetsMessage,
    generateButtonLabel,
    setSelectedCategory,
    setSelectedModelId,
    setSelectedPresetId,
    handleGenerate,
    handleResetCreation,
  } = useVideoGenerationDashboard({
    models,
    presetsByModelId,
    presetCategoriesByModelId,
    creditBalance,
    quotaReached: Boolean(quota?.limit_reached),
    onEstimateVideo,
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
        {!previewVideo && <GenerationQuotaBanner quota={quota} quotaError={quotaError} />}

        <div className="mt-8 flex min-h-0 flex-1 flex-col overflow-hidden">
          {!previewVideo ? (
            <VideoGenerationCreateView
              isTransitioning={isTransitioning}
              models={models}
              selectedModelId={selectedModel?.id ?? null}
              onSelectModel={setSelectedModelId}
              presetCategories={selectedModel ? presetCategoriesByModelId[selectedModel.id] ?? [] : []}
              selectedCategory={selectedCategory ?? ''}
              onSelectCategory={setSelectedCategory}
              loadingPresets={loadingPresets}
              presetsError={presetsError}
              filteredPresets={filteredPresets}
              selectedPresetId={selectedPreset?.id ?? null}
              onSelectPreset={setSelectedPresetId}
              isGenerating={isGenerating}
              disabledReason={disabledReason}
              generationErrorMessage={generationErrorMessage}
              estimateErrorMessage={estimateErrorMessage}
              emptyPresetsMessage={emptyPresetsMessage}
              hasInsufficientBalance={hasInsufficientBalance}
              generateButtonLabel={generateButtonLabel}
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
