import type { MessageKey } from '@/i18n/messages';
import StatusBadge from '@/components/common/StatusBadge';
import type { VideoJobItem } from '@/types/dashboard';

interface VideoDetailsInfoProps {
  video: VideoJobItem;
  formatLabel: string;
  createdAt: string;
  t: (key: MessageKey) => string;
}

const VideoDetailsInfo = ({ video, formatLabel, createdAt, t }: VideoDetailsInfoProps) => {
  return (
    <>
      <div className="space-y-2">
        <p className="text-tagline-3 text-secondary/60 dark:text-accent/60">{t('dashboard.videoDetails')}</p>
        <h1 className="text-heading-6 text-secondary dark:text-accent line-clamp-2 break-words font-medium">{video.title}</h1>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="bg-background-7 border-stroke-7 text-tagline-3 text-secondary dark:text-accent rounded-full border px-2.5 py-1">
          {t('dashboard.videoFormat')}: {formatLabel}
        </span>
        <span className="text-tagline-3 text-secondary/70 dark:text-accent/70 inline-flex items-center gap-2">
          {t('dashboard.videoStatus')}: <StatusBadge status={video.status} />
        </span>
      </div>

      <dl className="space-y-2 border-t border-dashed border-secondary/25 pt-4 text-tagline-2">
        <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-3">
          <dt className="text-secondary/60 dark:text-accent/60">{t('dashboard.videoPrompt')}</dt>
          <dd className="text-secondary dark:text-accent break-words">{video.prompt || '-'}</dd>
        </div>
        <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-3">
          <dt className="text-secondary/60 dark:text-accent/60">{t('dashboard.videoCreatedAt')}</dt>
          <dd className="text-secondary dark:text-accent">{createdAt}</dd>
        </div>
      </dl>
    </>
  );
};

export default VideoDetailsInfo;
