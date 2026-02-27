'use client';

import RevealAnimation from '@/components/animation/RevealAnimation';
import { useVideoDownload } from '@/components/videos/hooks/useVideoDownload';
import VideoPlaybackSurface from '@/components/videos/video-details/VideoPlaybackSurface';
import { useDashboard } from '@/context/dashboard-context';
import { useLocale } from '@/context/LocaleContext';
import { parseAspectRatio, toAspectRatioLabel } from '@/modules/videos/application/player-layout';
import type { VideoJobItem } from '@/types/dashboard';
import { useEffect, useMemo, useState } from 'react';
import VideoDetailsActions from './components/VideoDetailsActions';
import VideoDetailsInfo from './components/VideoDetailsInfo';

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
  const [videoLoading, setVideoLoading] = useState(true);
  const { downloading, canDownloadFromBackend, download } = useVideoDownload({
    inputId: video.inputId,
    token,
    title: video.title,
  });
  const createdAt = video.createdAt ? new Date(video.createdAt).toLocaleString(intlLocale) : '-';
  const isProcessing = video.status === 'processing';
  const showActions = actionsVisible ?? !isProcessing;
  const hasVideoOutput = Boolean(video.videoUrl);
  const formatFromPayload = parseAspectRatio(video.format);
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

  return (
    <section className="py-3 md:py-5">
      <div className="mx-auto w-full max-w-[1460px]">
        <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,7fr)_minmax(320px,3fr)]">
          <RevealAnimation delay={0.1} instant direction="up" offset={28}>
            <article className="border-stroke-3 bg-background-6 dark:border-stroke-7 overflow-hidden rounded-[18px] border shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
              <div className="relative h-[300px] w-full md:h-[380px] lg:h-[440px] xl:h-[500px]">
                <VideoPlaybackSurface
                  video={video}
                  loading={videoLoading}
                  onWaiting={() => setVideoLoading(true)}
                  onCanPlay={() => setVideoLoading(false)}
                  onLoadedMetadata={setDetectedRatio}
                  generatingLabel={t('dashboard.generating')}
                />
              </div>
            </article>
          </RevealAnimation>

          <RevealAnimation delay={0.16} instant direction="up" offset={24}>
            <aside className="border-stroke-3 bg-background-1/95 dark:bg-background-6 dark:border-stroke-7 xl:sticky xl:top-5 rounded-[18px] border p-5">
              <div className="space-y-6">
                <VideoDetailsInfo video={video} formatLabel={formatLabel} createdAt={createdAt} t={t} />

                {!hideActions && (
                  <VideoDetailsActions
                    showActions={showActions}
                    canDownload={!isProcessing && hasVideoOutput && canDownloadFromBackend}
                    downloading={downloading}
                    onDownload={() => {
                      void download();
                    }}
                    onCreateNewVideo={onCreateNewVideo}
                    t={t}
                  />
                )}
              </div>
            </aside>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default VideoDetailsPanel;
