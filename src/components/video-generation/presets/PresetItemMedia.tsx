'use client';

import { useLocale } from '@/context/LocaleContext';
import { resolveCardRatio } from '@/modules/videos/application/card-layout';
import type { PresetItem } from '@/types/dashboard';
import Image from 'next/image';
import { useRef, useState } from 'react';
import PresetPreviewFallbackOverlay from './PresetPreviewFallbackOverlay';
import PresetPreviewVideo from './PresetPreviewVideo';
import PresetSelectedOverlay from './PresetSelectedOverlay';

interface PresetItemMediaProps {
  preset: PresetItem;
  alt: string;
  selected: boolean;
}

const PresetItemMedia = ({ preset, alt, selected }: PresetItemMediaProps) => {
  const { t } = useLocale();
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const hasPreviewVideo = Boolean(preset.previewVideoUrl);
  const cardRatio = resolveCardRatio(preset.aspectRatio);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (!hasPreviewVideo || !previewVideoRef.current) {
      return;
    }

    const video = previewVideoRef.current;
    video.currentTime = 0;
    void video.play().catch(() => {
      // Ignore autoplay blocking errors.
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (!previewVideoRef.current) {
      return;
    }

    const video = previewVideoRef.current;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: cardRatio }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {!imageLoaded && <div className="absolute inset-0 animate-pulse bg-background-3 dark:bg-background-7" aria-hidden />}
      <Image
        src={imageFailed ? '/images/ns-img-323.png' : preset.imageSrc}
        alt={alt}
        fill
        className={`object-cover transition duration-300 ${
          imageLoaded ? (isHovering && hasPreviewVideo ? 'opacity-0' : 'opacity-100 group-hover:scale-105') : 'opacity-0'
        }`}
        sizes="(max-width: 768px) 100vw, 33vw"
        onLoad={() => setImageLoaded(true)}
        onLoadingComplete={() => setImageLoaded(true)}
        onError={() => {
          setImageFailed(true);
          setImageLoaded(true);
        }}
      />
      {hasPreviewVideo ? (
        <PresetPreviewVideo previewVideoRef={previewVideoRef} src={preset.previewVideoUrl ?? ''} isHovering={isHovering} />
      ) : (
        <PresetPreviewFallbackOverlay label={t('preset.preview')} />
      )}
      {selected ? <PresetSelectedOverlay /> : null}
    </div>
  );
};

export default PresetItemMedia;
