'use client';

import PageSectionHeader from '@/components/page-header/PageSectionHeader';
import MosaicGrid from '@/components/common/mosaic/MosaicGrid';
import MosaicCardSkeleton from '@/components/common/skeletons/MosaicCardSkeleton';
import GalleryVideoCard from '@/components/videos/GalleryVideoCard';
import { useLocale } from '@/context/LocaleContext';
import type { VideoJobItem } from '@/types/dashboard';
import { useMemo } from 'react';

interface GalleryPageContentProps {
  videos: VideoJobItem[];
  loading?: boolean;
}

const GalleryPageContent = ({ videos, loading = false }: GalleryPageContentProps) => {
  const { t } = useLocale();
  const skeletons = useMemo(() => Array.from({ length: 10 }), []);

  return (
    <section className="space-y-6">
      <PageSectionHeader title={t('gallery.title')} description={t('gallery.description')} />

      <div className="mt-4">
        {loading && videos.length === 0 && (
          <MosaicGrid
            items={skeletons}
            getKey={(_, index) => `gallery-skeleton-${index}`}
            renderItem={() => <MosaicCardSkeleton />}
          />
        )}
        {!loading && videos.length > 0 && (
          <MosaicGrid items={videos} getKey={(video) => video.id} renderItem={(video) => <GalleryVideoCard video={video} />} />
        )}
      </div>
    </section>
  );
};

export default GalleryPageContent;
