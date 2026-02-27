'use client';

import VideoCard from '@/components/videos/VideoCard';
import { useLocale } from '@/context/LocaleContext';
import { resolveCardRatio } from '@/modules/videos/application/card-layout';
import type { VideoJobItem } from '@/types/dashboard';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

interface GalleryVideoCardProps {
  video: VideoJobItem;
}

const GalleryVideoCard = ({ video }: GalleryVideoCardProps) => {
  const { t, intlLocale } = useLocale();
  const previewRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [previewPlaying, setPreviewPlaying] = useState(false);

  const cardRatio = resolveCardRatio(video.format);
  const hasPreviewVideo = Boolean(video.videoUrl);
  const createdLabel = new Date(video.createdAt).toLocaleDateString(intlLocale);
  const remainingDays = Math.max(0, Math.ceil((new Date(video.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000 - Date.now()) / (24 * 60 * 60 * 1000)));
  const showPreview = isHovered && hasPreviewVideo && previewPlaying;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!hasPreviewVideo || !previewRef.current) {
      return;
    }
    previewRef.current.currentTime = 0;
    void previewRef.current.play().catch(() => {
      // noop
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPreviewPlaying(false);
    if (!previewRef.current) {
      return;
    }
    previewRef.current.pause();
    previewRef.current.currentTime = 0;
  };

  return (
    <VideoCard.Root onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="transition hover:border-primary-400">
      <Link href={`/dashboard/video/${video.id}`} className="group block">
        <VideoCard.Media style={{ aspectRatio: cardRatio }}>
          {!imageLoaded && <div className="absolute inset-0 animate-pulse bg-background-3 dark:bg-background-7" aria-hidden />}
          <Image
            src={imageFailed ? '/images/ns-img-323.png' : video.imageSrc}
            alt={video.title}
            fill
            className={`object-cover transition duration-300 ${imageLoaded ? (showPreview ? 'opacity-0' : 'opacity-100 group-hover:scale-105') : 'opacity-0'}`}
            sizes="(max-width: 768px) 100vw, 33vw"
            onLoad={() => setImageLoaded(true)}
            onLoadingComplete={() => setImageLoaded(true)}
            onError={() => {
              setImageFailed(true);
              setImageLoaded(true);
            }}
          />
          {hasPreviewVideo && (
            <video
              ref={previewRef}
              src={video.videoUrl}
              muted
              loop
              playsInline
              preload="auto"
              className={`absolute inset-0 h-full w-full object-cover transition duration-300 ${showPreview ? 'opacity-100' : 'opacity-0'}`}
              onPlaying={() => setPreviewPlaying(true)}
              aria-hidden
            />
          )}
        </VideoCard.Media>
      </Link>

      <VideoCard.Content>
        <div className="flex items-start justify-between gap-3">
          <Link href={`/dashboard/video/${video.id}`} className="min-w-0 flex-1">
            <VideoCard.Title>{video.title}</VideoCard.Title>
          </Link>
          {video.videoUrl ? (
            <a
              href={video.videoUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center text-secondary/70 transition hover:text-secondary dark:text-accent/70 dark:hover:text-accent"
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
          <VideoCard.Meta>
            {t('gallery.createdAt')} {createdLabel}
          </VideoCard.Meta>
          <VideoCard.Meta>
            {t('gallery.deletionIn', {
              days: String(remainingDays),
              unit: remainingDays === 1 ? t('settings.day.one') : t('settings.day.other'),
            })}
          </VideoCard.Meta>
        </Link>
      </VideoCard.Content>
    </VideoCard.Root>
  );
};

export default GalleryVideoCard;
