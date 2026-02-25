'use client';

import StatusBadge from '@/components/common/StatusBadge';
import RevealAnimation from '@/components/animation/RevealAnimation';
import { useDashboard } from '@/context/dashboard-context';
import { useLocale } from '@/context/LocaleContext';
import {
  parseAspectRatio,
  resolveVideoDisplayRatio,
  resolveVideoFrameWidthClass,
  toAspectRatioLabel,
} from '@/modules/videos/application/player-layout';
import { VideoJobItem } from '@/types/dashboard';
import { useEffect, useMemo, useState } from 'react';

interface VideoDetailsPanelProps {
  video: VideoJobItem;
  onCreateNewVideo: () => void;
  hideActions?: boolean;
  actionsVisible?: boolean;
}

const VideoDetailsPanel = ({ video, onCreateNewVideo, hideActions = false, actionsVisible }: VideoDetailsPanelProps) => {
  const { token } = useDashboard();
  const { t, intlLocale } = useLocale();
  const [detectedRatio, setDetectedRatio] = useState<number | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const createdAt = new Date(video.createdAt).toLocaleString(intlLocale);
  const isProcessing = video.status === 'processing';
  const showActions = actionsVisible ?? !isProcessing;
  const hasVideoOutput = Boolean(video.videoUrl);
  const canDownloadFromBackend = Boolean(video.inputId && token);
  const formatFromPayload = parseAspectRatio(video.format);
  const displayRatio = resolveVideoDisplayRatio({
    fallbackFormat: video.format,
    measuredRatio: detectedRatio,
  });
  const frameWidthClass = resolveVideoFrameWidthClass(displayRatio);
  const formatLabel = useMemo(() => {
    if (detectedRatio) {
      return toAspectRatioLabel(detectedRatio);
    }

    if (formatFromPayload) {
      return toAspectRatioLabel(formatFromPayload);
    }

    return video.format;
  }, [detectedRatio, formatFromPayload, video.format]);

  useEffect(() => {
    setDetectedRatio(null);
    setVideoLoading(true);
  }, [video.videoUrl]);

  const handleDownload = async () => {
    if (!video.inputId || !token || downloading) {
      return;
    }

    setDownloading(true);
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_IAVIDEO_API_URL ?? 'http://127.0.0.1:8000';
      const endpoint = `${apiBaseUrl}/api/jobs/${video.inputId}/download`;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/octet-stream',
        },
      });

      if (!response.ok) {
        throw new Error('Falha ao baixar vídeo');
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${video.title || 'video'}.mp4`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch {
      // noop
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section className="flex min-h-[70vh] flex-col justify-center space-y-6 py-4">
      {!hideActions && (
        <RevealAnimation delay={0.05} instant direction="up" offset={24}>
          <div
            className={`flex items-center justify-center gap-2 transition-all duration-400 ${
              showActions ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
            }`}>
            {isProcessing || !hasVideoOutput || !canDownloadFromBackend ? (
              <button
                type="button"
                disabled
                className="inline-flex h-8 w-8 cursor-not-allowed items-center justify-center text-secondary/40 dark:text-accent/40">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 4v10" />
                  <path d="m8.5 10.5 3.5 3.5 3.5-3.5" />
                  <path d="M4.5 18.5h15" />
                </svg>
              </button>
            ) : (
                <button
                  type="button"
                  onClick={() => {
                    void handleDownload();
                  }}
                disabled={downloading}
                aria-label={t('dashboard.downloadVideo')}
                title={t('dashboard.downloadVideo')}
                className="inline-flex h-8 w-8 items-center justify-center text-secondary/70 transition hover:text-secondary disabled:cursor-not-allowed disabled:opacity-50 dark:text-accent/70 dark:hover:text-accent">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 4v10" />
                  <path d="m8.5 10.5 3.5 3.5 3.5-3.5" />
                  <path d="M4.5 18.5h15" />
                </svg>
              </button>
            )}

            <button
              type="button"
              onClick={onCreateNewVideo}
              className="btn-md-v2 btn-v2-white inline-flex h-10 cursor-pointer items-center gap-2 rounded-[10px] px-4 text-tagline-2 font-medium transition hover:bg-background-2 dark:hover:bg-background-7">
              <span className="shrink-0">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="4" y="4" width="16" height="16" rx="3" />
                  <path d="M12 8v8" />
                  <path d="M8 12h8" />
                </svg>
              </span>
              {t('dashboard.createNewVideo')}
            </button>
          </div>
        </RevealAnimation>
      )}

      <div className="space-y-6">
        <RevealAnimation delay={0.12} instant direction="up" offset={32}>
          <div className={`border-stroke-3 dark:border-stroke-7 mx-auto w-full overflow-hidden rounded-[12px] border ${frameWidthClass}`}>
            <div className="relative" style={{ aspectRatio: displayRatio }}>
              {isProcessing ? (
                <>
                  <img src={video.imageSrc} alt={video.title} className="h-full w-full object-cover opacity-65" />
                  <div className="bg-background-7/30 dark:bg-background-8/30 absolute inset-0 flex items-center justify-center backdrop-blur-[1px]">
                    <div className="flex flex-col items-center gap-3 text-center">
                      <span className="border-secondary/50 border-t-secondary inline-flex h-8 w-8 animate-spin rounded-full border-2" />
                      <p className="text-tagline-2 text-accent/90 font-medium">{t('dashboard.generating')}</p>
                    </div>
                  </div>
                </>
              ) : !hasVideoOutput ? (
                <>
                  <img src={video.imageSrc} alt={video.title} className="h-full w-full object-cover opacity-65" />
                  <div className="bg-background-7/30 dark:bg-background-8/30 absolute inset-0 flex items-center justify-center backdrop-blur-[1px]">
                    <div className="flex flex-col items-center gap-3 text-center">
                      <p className="text-tagline-2 text-accent/90 font-medium">Vídeo ainda indisponível para reprodução.</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {videoLoading && (
                    <div className="bg-background-8/55 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[1.5px]">
                      <div className="flex flex-col items-center gap-3 text-center">
                        <span className="border-accent/50 border-t-accent inline-flex h-8 w-8 animate-spin rounded-full border-2" />
                        <p className="text-tagline-2 text-accent/90 font-medium">Carregando reprodução...</p>
                      </div>
                    </div>
                  )}

                  <video
                    src={video.videoUrl}
                    controls
                    preload="metadata"
                    onWaiting={() => setVideoLoading(true)}
                    onCanPlay={() => setVideoLoading(false)}
                    onLoadedMetadata={(event) => {
                      const element = event.currentTarget;
                      if (!element.videoWidth || !element.videoHeight) {
                        return;
                      }
                      setDetectedRatio(element.videoWidth / element.videoHeight);
                    }}
                    className="h-full w-full bg-black object-contain"
                  />
                </>
              )}
            </div>
          </div>
        </RevealAnimation>

        <RevealAnimation delay={0.2} instant direction="up" offset={24}>
          <div className="mx-auto w-full max-w-[620px] space-y-4">
            <h2 className="text-heading-6 text-secondary dark:text-accent font-medium">{t('dashboard.videoDetails')}</h2>
            <ul className="space-y-3 text-tagline-2 text-secondary/70 dark:text-accent/70">
              <li>
                <span className="text-secondary dark:text-accent font-medium">{t('dashboard.videoTitle')}:</span> {video.title}
              </li>
              <li>
                <span className="text-secondary dark:text-accent font-medium">{t('dashboard.videoFormat')}:</span> {formatLabel}
              </li>
              <li>
                <span className="text-secondary dark:text-accent font-medium">{t('dashboard.videoPrompt')}:</span> {video.prompt}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-secondary dark:text-accent font-medium">{t('dashboard.videoStatus')}:</span>
                <StatusBadge status={video.status} />
              </li>
              <li>
                <span className="text-secondary dark:text-accent font-medium">{t('dashboard.videoCreatedAt')}:</span> {createdAt}
              </li>
            </ul>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default VideoDetailsPanel;
