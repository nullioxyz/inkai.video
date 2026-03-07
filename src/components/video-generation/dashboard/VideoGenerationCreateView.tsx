'use client';

import { useLocale } from '@/context/LocaleContext';
import type { GenerateDisabledReason } from '@/modules/videos/application/generation-action-state';
import type { ModelItem, PresetCategory, PresetItem } from '@/types/dashboard';
import PresetCategoryFilter from '../PresetCategoryFilter';
import UploadAndTitleSection from '../UploadAndTitleSection';
import ModelSelector from './ModelSelector';
import PresetGridSection from './PresetGridSection';
import PresetScrollHint from './PresetScrollHint';
import PresetSelectionHeader from './PresetSelectionHeader';

interface VideoGenerationCreateViewProps {
  isTransitioning: boolean;
  models: ModelItem[];
  selectedModelId: string | null;
  onSelectModel: (modelId: string | null) => void;
  presetCategories: PresetCategory[];
  selectedCategory: PresetCategory | '';
  onSelectCategory: (category: PresetCategory) => void;
  loadingPresets: boolean;
  presetsError: string | null;
  filteredPresets: PresetItem[];
  selectedPresetId: string | null;
  onSelectPreset: (presetId: string | null) => void;
  isGenerating: boolean;
  disabledReason: GenerateDisabledReason;
  generationErrorMessage: string | null;
  estimateErrorMessage: string | null;
  emptyPresetsMessage: string | null;
  hasInsufficientBalance: boolean;
  generateButtonLabel: string;
  onGenerate: () => void;
  canGenerate: boolean;
}

const VideoGenerationCreateView = ({
  isTransitioning,
  models,
  selectedModelId,
  onSelectModel,
  presetCategories,
  selectedCategory,
  onSelectCategory,
  loadingPresets,
  presetsError,
  filteredPresets,
  selectedPresetId,
  onSelectPreset,
  isGenerating,
  disabledReason,
  generationErrorMessage,
  estimateErrorMessage,
  emptyPresetsMessage,
  hasInsufficientBalance,
  generateButtonLabel,
  onGenerate,
  canGenerate,
}: VideoGenerationCreateViewProps) => {
  const { t } = useLocale();

  const disabledFeedback =
    disabledReason === 'quota_reached'
      ? t('quota.limitReached')
      : disabledReason === 'model_unavailable'
        ? t('dashboard.modelUnavailable')
        : disabledReason === 'insufficient_balance'
          ? t('dashboard.insufficientBalance')
        : null;

  return (
    <div
      className={`relative flex min-h-0 flex-1 flex-col overflow-hidden transition-all duration-350 ${
        isTransitioning ? 'translate-x-12 opacity-0' : 'translate-x-0 opacity-100'
      }`}>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain pb-6 pr-1">
        <section className="flex min-h-full flex-col gap-6 pb-28">
          <PresetSelectionHeader />

          <ModelSelector models={models} selectedModelId={selectedModelId} onSelectModel={(modelId) => onSelectModel(modelId)} />

          <div className="space-y-3">
            {presetCategories.length > 0 ? (
              <PresetCategoryFilter
                categories={presetCategories}
                activeCategory={selectedCategory}
                onChange={(nextCategory) => onSelectCategory(nextCategory)}
              />
            ) : null}

            <div className="relative">
              <PresetScrollHint />
              <PresetGridSection
                loadingPresets={loadingPresets}
                presetsError={presetsError}
                filteredPresets={filteredPresets}
                selectedPresetId={selectedPresetId}
                onSelectPreset={(presetId) => onSelectPreset(presetId)}
              />
            </div>
          </div>

          {emptyPresetsMessage && !loadingPresets && !presetsError ? (
            <p className="text-tagline-2 text-secondary/70 dark:text-accent/70 text-center">{emptyPresetsMessage}</p>
          ) : null}
          {estimateErrorMessage ? <p className="text-tagline-2 text-ns-red text-center">{estimateErrorMessage}</p> : null}
          {hasInsufficientBalance && !disabledFeedback ? <p className="text-tagline-2 text-ns-red text-center">{t('dashboard.insufficientBalance')}</p> : null}
          {disabledFeedback ? <p className="text-tagline-2 text-ns-red text-center">{disabledFeedback}</p> : null}
          {generationErrorMessage ? <p className="text-tagline-2 text-ns-red text-center">{generationErrorMessage}</p> : null}
        </section>
      </div>

      <div className="pointer-events-none sticky bottom-0 z-20 shrink-0 bg-gradient-to-t from-background-3 via-background-3/95 to-transparent pt-4 dark:from-background-7 dark:via-background-7/95">
        <div className="pointer-events-auto bg-background-3/90 dark:bg-background-7/90 backdrop-blur-sm">
        <UploadAndTitleSection
          onGenerate={onGenerate}
          canGenerate={canGenerate}
          disabled={isTransitioning || isGenerating}
          generateButtonLabel={generateButtonLabel}
          generateButtonTitle={generateButtonLabel}
          generateDisabled={!canGenerate}
          isGenerating={isGenerating}
        />
        </div>
      </div>
    </div>
  );
};

export default VideoGenerationCreateView;
