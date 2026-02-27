'use client';

import { useLocale } from '@/context/LocaleContext';
import type { VideoJobStatus } from '@/types/dashboard';

const STATUS_CLASS: Record<VideoJobStatus, string> = {
  processing: 'bg-ns-yellow-light text-secondary',
  completed: 'bg-ns-green-light text-secondary',
  failed: 'bg-ns-red text-secondary dark:text-accent',
  canceled: 'bg-background-12 dark:bg-background-7 text-secondary/70 dark:text-accent/70',
};

interface StatusBadgeProps {
  status: VideoJobStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { t } = useLocale();
  const statusKeyMap: Record<VideoJobStatus, 'status.processing' | 'status.completed' | 'status.failed' | 'status.canceled'> = {
    processing: 'status.processing',
    completed: 'status.completed',
    failed: 'status.failed',
    canceled: 'status.canceled',
  };

  return (
    <span className={`text-tagline-3 rounded-sm px-3 py-1 font-medium ${STATUS_CLASS[status]}`}>{t(statusKeyMap[status])}</span>
  );
};

export default StatusBadge;
