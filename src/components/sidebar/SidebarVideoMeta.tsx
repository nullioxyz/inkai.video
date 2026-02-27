import type { MessageKey } from '@/i18n/messages';
import type { VideoJobItem } from '@/types/dashboard';
import { STATUS_DOT, STATUS_LABEL_KEY } from './types';

interface SidebarVideoMetaProps {
  video: VideoJobItem;
  dateLabel: string;
  t: (key: MessageKey) => string;
}

const SidebarVideoMeta = ({ video, dateLabel, t }: SidebarVideoMetaProps) => {
  return (
    <p className="text-tagline-3 flex items-center gap-1.5 text-secondary/50 dark:text-accent/50">
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${STATUS_DOT[video.status]}`} />
      <span>{t(STATUS_LABEL_KEY[video.status])}</span>
      <span>•</span>
      <span>{dateLabel}</span>
    </p>
  );
};

export default SidebarVideoMeta;
