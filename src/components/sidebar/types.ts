import type { VideoJobItem } from '@/types/dashboard';
import { ReactNode } from 'react';

export interface SidebarMenuItem {
  key: string;
  labelKey: 'sidebar.gallery' | 'sidebar.credits' | 'sidebar.account' | 'sidebar.settings' | 'sidebar.logout';
  href: string;
  icon: ReactNode;
}

export type SidebarStatusLabelKey = 'status.processing' | 'status.completed' | 'status.failed' | 'status.canceled';

export const STATUS_DOT: Record<VideoJobItem['status'], string> = {
  processing: 'bg-ns-yellow',
  completed: 'bg-ns-green',
  failed: 'bg-ns-red',
  canceled: 'bg-stroke-5',
};

export const STATUS_LABEL_KEY: Record<VideoJobItem['status'], SidebarStatusLabelKey> = {
  processing: 'status.processing',
  completed: 'status.completed',
  failed: 'status.failed',
  canceled: 'status.canceled',
};
