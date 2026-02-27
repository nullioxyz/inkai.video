'use client';

import type { PresetItem, PresetCategory } from '@/types/dashboard';
import PresetCategoryFilter from '../PresetCategoryFilter';
import UploadAndTitleSection from '../UploadAndTitleSection';
import PresetGridSection from './PresetGridSection';
import PresetScrollHint from './PresetScrollHint';
import PresetSelectionHeader from './PresetSelectionHeader';

interface VideoGenerationCreateViewProps {
  isTransitioning: boolean;
  presetCategories: PresetCategory[];
  selectedCategory: PresetCategory | '';
  onSelectCategory: (category: PresetCategory) => void;
  loadingPresets: boolean;
  presetsError: string | null;
  filteredPresets: PresetItem[];
  selectedPresetId: string | null;
  onSelectPreset: (presetId: string | null) => void;
  errorMessage: string | null;
  onGenerate: () => void;
  canGenerate: boolean;
}

const VideoGenerationCreateView = ({
  isTransitioning,
  presetCategories,
  selectedCategory,
  onSelectCategory,
  loadingPresets,
  presetsError,
  filteredPresets,
  selectedPresetId,
  onSelectPreset,
  errorMessage,
  onGenerate,
  canGenerate,
}: VideoGenerationCreateViewProps) => {
  return (
    <div
      className={`flex min-h-0 flex-1 flex-col overflow-hidden transition-all duration-350 ${
        isTransitioning ? 'translate-x-12 opacity-0' : 'translate-x-0 opacity-100'
      }`}>
      <div className="min-h-0 flex-1 overflow-hidden pb-6">
        <section className="flex h-full min-h-0 flex-col gap-6 overflow-hidden">
          <PresetSelectionHeader />

          <PresetCategoryFilter
            categories={presetCategories}
            activeCategory={selectedCategory}
            onChange={(nextCategory) => onSelectCategory(nextCategory)}
          />

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

          {errorMessage && <p className="text-tagline-2 text-ns-red text-center">{errorMessage}</p>}
        </section>
      </div>

      <div className="shrink-0 bg-background-3/90 dark:bg-background-7/90 backdrop-blur-sm">
        <UploadAndTitleSection onGenerate={onGenerate} canGenerate={canGenerate} disabled={isTransitioning} />
      </div>
    </div>
  );
};

export default VideoGenerationCreateView;
