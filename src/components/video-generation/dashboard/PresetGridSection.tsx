'use client';

import MosaicCardSkeleton from '@/components/common/skeletons/MosaicCardSkeleton';
import type { PresetItem } from '@/types/dashboard';
import { lazy, Suspense, type WheelEvent } from 'react';

const PresetGrid = lazy(() => import('../PresetGrid'));

interface PresetGridSectionProps {
  loadingPresets: boolean;
  presetsError: string | null;
  filteredPresets: PresetItem[];
  selectedPresetId: string | null;
  onSelectPreset: (presetId: string | null) => void;
}

const PresetGridSection = ({
  loadingPresets,
  presetsError,
  filteredPresets,
  selectedPresetId,
  onSelectPreset,
}: PresetGridSectionProps) => {
  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    if (element.scrollHeight <= element.clientHeight) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    element.scrollTop += event.deltaY;
  };

  return (
    <div
      data-lenis-prevent="true"
      className="h-[46vh] overflow-y-auto overscroll-contain pr-1 md:h-[50vh]"
      onWheel={handleWheel}>
      {loadingPresets ? (
        <div className="mx-auto grid w-full max-w-[980px] grid-cols-1 gap-2.5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <MosaicCardSkeleton
              key={`preset-skeleton-${index}`}
              mediaAspectClassName="aspect-[4/3]"
              lines={['h-3.5 w-2/3']}
              contentClassName="space-y-2 p-2.5"
            />
          ))}
        </div>
      ) : presetsError ? (
        <p className="text-tagline-2 text-ns-red text-center">{presetsError}</p>
      ) : (
        <Suspense
          fallback={<div className="mx-auto h-[200px] w-full max-w-[980px] animate-pulse rounded-[12px] bg-background-3 dark:bg-background-7" />}>
          <PresetGrid
            presets={filteredPresets}
            selectedPresetId={selectedPresetId}
            onSelectPreset={(presetId) => onSelectPreset(presetId)}
          />
        </Suspense>
      )}
    </div>
  );
};

export default PresetGridSection;
