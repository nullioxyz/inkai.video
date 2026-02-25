'use client';

import PageSectionHeader from '@/components/dashboard/common/PageSectionHeader';
import { useLocale } from '@/context/LocaleContext';
import { resolveCardRatio } from '@/modules/videos/application/card-layout';
import { VideoJobItem } from '@/types/dashboard';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

interface GalleryPageContentProps {
  videos: VideoJobItem[];
  loading?: boolean;
}

const GalleryPageContent = ({ videos, loading = false }: GalleryPageContentProps) => {
  const { t, intlLocale } = useLocale();
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [playingPreviews, setPlayingPreviews] = useState<Record<string, boolean>>({});
  const previewRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const createdLabel = (isoDate: string) => new Date(isoDate).toLocaleDateString(intlLocale);
  const getRemainingDaysToDelete = (isoDate: string) => {
    const createdAt = new Date(isoDate).getTime();
    const deleteAt = createdAt + 7 * 24 * 60 * 60 * 1000;
    const remaining = Math.ceil((deleteAt - Date.now()) / (24 * 60 * 60 * 1000));
    return Math.max(0, remaining);
  };

  return (
    <section className="space-y-6">
      <PageSectionHeader title={t('gallery.title')} description={t('gallery.description')} />

      <div className="mt-4 columns-1 gap-1.5 sm:columns-3 xl:columns-5">
        {loading && videos.length === 0 && (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <article
                key={`gallery-skeleton-${index}`}
                className="border-stroke-3 dark:border-stroke-7 mb-1.5 w-full break-inside-avoid animate-pulse overflow-hidden rounded-[12px] border sm:mb-2">
                <div className="aspect-[3/4] bg-background-3 dark:bg-background-7" />
                <div className="space-y-2 p-3">
                  <div className="h-3.5 w-2/3 rounded bg-background-3 dark:bg-background-7" />
                  <div className="h-3 w-1/2 rounded bg-background-3 dark:bg-background-7" />
                </div>
              </article>
            ))}
          </>
        )}
        {videos.map((video) => {
          const remainingDays = getRemainingDaysToDelete(video.createdAt);
          const cardRatio = resolveCardRatio(video.format);
          const hasPreviewVideo = Boolean(video.videoUrl);
          const isHovered = hoveredVideoId === video.id;
          const isImageLoaded = loadedImages[video.id] ?? false;
          const hasImageError = failedImages[video.id] ?? false;
          const isPreviewPlaying = playingPreviews[video.id] ?? false;
          const shouldShowPreview = isHovered && hasPreviewVideo && isPreviewPlaying;

          return (
            <article
              key={video.id}
              onMouseEnter={() => {
                setHoveredVideoId(video.id);
                if (!hasPreviewVideo) {
                  return;
                }
                const previewVideo = previewRefs.current[video.id];
                if (!previewVideo) {
                  return;
                }
                previewVideo.currentTime = 0;
                void previewVideo.play().catch(() => {
                  // noop
                });
              }}
              onMouseLeave={() => {
                setHoveredVideoId((current) => (current === video.id ? null : current));
                setPlayingPreviews((current) => ({
                  ...current,
                  [video.id]: false,
                }));
                const previewVideo = previewRefs.current[video.id];
                if (!previewVideo) {
                  return;
                }
                previewVideo.pause();
                previewVideo.currentTime = 0;
              }}
              className="border-stroke-3 dark:border-stroke-7 mb-1.5 w-full break-inside-avoid overflow-hidden rounded-[12px] border transition hover:border-primary-400 sm:mb-2">
              <Link href={`/dashboard/video/${video.id}`} className="group block">
                <div className="relative overflow-hidden" style={{ aspectRatio: cardRatio }}>
                  {!isImageLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-background-3 dark:bg-background-7" aria-hidden />
                  )}
                  <Image
                    src={hasImageError ? '/images/ns-img-323.png' : video.imageSrc}
                    alt={video.title}
                    fill
                    className={`object-cover transition duration-300 ${
                      isImageLoaded ? (shouldShowPreview ? 'opacity-0' : 'opacity-100 group-hover:scale-105') : 'opacity-0'
                    }`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onLoad={() =>
                      setLoadedImages((current) => ({
                        ...current,
                        [video.id]: true,
                      }))
                    }
                    onLoadingComplete={() =>
                      setLoadedImages((current) => ({
                        ...current,
                        [video.id]: true,
                      }))
                    }
                    onError={() => {
                      setFailedImages((current) => ({
                        ...current,
                        [video.id]: true,
                      }));
                      setLoadedImages((current) => ({
                        ...current,
                        [video.id]: true,
                      }));
                    }}
                  />
                  {hasPreviewVideo && (
                    <video
                      ref={(element) => {
                        previewRefs.current[video.id] = element;
                      }}
                      src={video.videoUrl}
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className={`absolute inset-0 h-full w-full object-cover transition duration-300 ${shouldShowPreview ? 'opacity-100' : 'opacity-0'}`}
                      onPlaying={() =>
                        setPlayingPreviews((current) => ({
                          ...current,
                          [video.id]: true,
                        }))
                      }
                      aria-hidden
                    />
                  )}
                </div>
              </Link>

              <div className="space-y-2 p-4">
                <div className="flex items-start justify-between gap-3">
                  <Link href={`/dashboard/video/${video.id}`} className="min-w-0 flex-1">
                    <p className="text-tagline-1 text-secondary dark:text-accent truncate font-medium">{video.title}</p>
                  </Link>

                  {video.videoUrl ? (
                    <a
                      href={video.videoUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center text-secondary/70 transition hover:text-secondary dark:text-accent/70 dark:hover:text-accent"
                      aria-label={t('dashboard.downloadVideo')}
                      title={t('dashboard.downloadVideo')}>
                      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 4v10" />
                        <path d="m8.5 10.5 3.5 3.5 3.5-3.5" />
                        <path d="M4.5 18.5h15" />
                      </svg>
                    </a>
                  ) : (
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center text-secondary/35 dark:text-accent/35">
                      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 4v10" />
                        <path d="m8.5 10.5 3.5 3.5 3.5-3.5" />
                        <path d="M4.5 18.5h15" />
                      </svg>
                    </span>
                  )}
                </div>

                <Link href={`/dashboard/video/${video.id}`} className="block space-y-2">
                  <p className="text-tagline-3 text-secondary/60 dark:text-accent/60">
                    {t('gallery.createdAt')} {createdLabel(video.createdAt)}
                  </p>
                  <p className="text-tagline-3 text-secondary/60 dark:text-accent/60">
                    {t('gallery.deletionIn', {
                      days: String(remainingDays),
                      unit: remainingDays === 1 ? t('settings.day.one') : t('settings.day.other'),
                    })}
                  </p>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default GalleryPageContent;
