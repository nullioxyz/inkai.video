'use client';

import MosaicCardSkeleton from '@/components/common/skeletons/MosaicCardSkeleton';
import { resolvePresetCarouselScrollState, resolvePresetCarouselStep } from '@/modules/videos/application/preset-carousel';
import type { PresetItem } from '@/types/dashboard';
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import PresetHorizontalNavigation from './PresetHorizontalNavigation';

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
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const syncScrollState = useCallback(() => {
    const viewport = scrollRef.current;
    if (!viewport) {
      return;
    }

    const scrollState = resolvePresetCarouselScrollState(viewport.scrollLeft, viewport.scrollWidth, viewport.clientWidth);
    setCanScrollLeft(scrollState.canScrollLeft);
    setCanScrollRight(scrollState.canScrollRight);
  }, []);

  const scrollByOffset = useCallback((direction: 'left' | 'right') => {
    const viewport = scrollRef.current;
    if (!viewport) {
      return;
    }

    const offset = resolvePresetCarouselStep(viewport.clientWidth);
    viewport.scrollBy({
      left: direction === 'left' ? -offset : offset,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    syncScrollState();
    const viewport = scrollRef.current;
    if (!viewport) {
      return;
    }

    viewport.addEventListener('scroll', syncScrollState, { passive: true });
    window.addEventListener('resize', syncScrollState);

    return () => {
      viewport.removeEventListener('scroll', syncScrollState);
      window.removeEventListener('resize', syncScrollState);
    };
  }, [filteredPresets.length, syncScrollState]);

  return (
    <div className="space-y-2">
      <PresetHorizontalNavigation
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
        onScrollLeft={() => scrollByOffset('left')}
        onScrollRight={() => scrollByOffset('right')}
      />

      <div
        ref={scrollRef}
        data-lenis-prevent="true"
        className="overflow-x-auto overflow-y-hidden overscroll-x-contain pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x snap-x snap-mandatory">
        {loadingPresets ? (
          <div className="flex w-max gap-2.5">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={`preset-skeleton-${index}`} className="w-[154px] shrink-0 snap-start sm:w-[164px] md:w-[174px]">
                <MosaicCardSkeleton mediaAspectClassName="aspect-[4/3]" lines={['h-3.5 w-2/3']} contentClassName="space-y-2 p-2.5" />
              </div>
            ))}
          </div>
        ) : presetsError ? (
          <p className="text-tagline-2 text-ns-red text-center">{presetsError}</p>
        ) : (
          <Suspense
            fallback={<div className="h-[200px] w-full animate-pulse rounded-[12px] bg-background-3 dark:bg-background-7" />}>
            <PresetGrid
              presets={filteredPresets}
              selectedPresetId={selectedPresetId}
              onSelectPreset={(presetId) => onSelectPreset(presetId)}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default PresetGridSection;
