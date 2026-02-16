'use client';

import { useLocale } from '@/context/LocaleContext';
import { VideoJobItem } from '@/types/dashboard';
import logo from '@public/images/shared/logo.svg';
import logoDark from '@public/images/shared/logo-dark.svg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface SidebarMenuItem {
  key: string;
  labelKey: 'sidebar.gallery' | 'sidebar.credits' | 'sidebar.account' | 'sidebar.settings' | 'sidebar.logout';
  href: string;
  icon: ReactNode;
}

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  videos: VideoJobItem[];
  selectedVideoId: string | null;
  onSelectVideo: (videoId: string) => void;
  onCreateNewVideo: () => void;
}

const menuItems: SidebarMenuItem[] = [
  {
    key: 'gallery',
    labelKey: 'sidebar.gallery',
    href: '/dashboard/gallery',
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
        <path d="M8 13.5l2.7-2.7a1 1 0 0 1 1.4 0L14 12.7" />
        <path d="M12.5 15.5l2.2-2.2a1 1 0 0 1 1.4 0l2 2" />
        <circle cx="8.2" cy="8.4" r="1.2" />
      </svg>
    ),
  },
  {
    key: 'credits',
    labelKey: 'sidebar.credits',
    href: '/dashboard/credits',
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 9.5h14a2.5 2.5 0 0 1 2.5 2.5v5A2.5 2.5 0 0 1 18 19.5H6A2.5 2.5 0 0 1 3.5 17V10A.5.5 0 0 1 4 9.5Z" />
        <path d="M6.5 9.5V8A2.5 2.5 0 0 1 9 5.5h8a2 2 0 0 1 0 4H6.5Z" />
        <circle cx="15.8" cy="14.5" r="1.2" />
      </svg>
    ),
  },
  {
    key: 'account',
    labelKey: 'sidebar.account',
    href: '/dashboard/account',
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="9.2" r="2.4" />
        <path d="M7.5 17c1.2-1.9 2.8-2.8 4.5-2.8s3.3.9 4.5 2.8" />
      </svg>
    ),
  },
  {
    key: 'settings',
    labelKey: 'sidebar.settings',
    href: '/dashboard/settings',
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 6.5h14" />
        <path d="M5 12h14" />
        <path d="M5 17.5h14" />
        <circle cx="9" cy="6.5" r="1.6" />
        <circle cx="14.5" cy="12" r="1.6" />
        <circle cx="11" cy="17.5" r="1.6" />
      </svg>
    ),
  },
  {
    key: 'logout',
    labelKey: 'sidebar.logout',
    href: '/login',
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h7A1.5 1.5 0 0 1 19 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 9 18.5V17" />
        <path d="M13.5 12H4.5" />
        <path d="m7.5 8.8-3.2 3.2 3.2 3.2" />
      </svg>
    ),
  },
];

const STATUS_DOT: Record<VideoJobItem['status'], string> = {
  processing: 'bg-ns-yellow',
  completed: 'bg-ns-green',
  failed: 'bg-ns-red',
  canceled: 'bg-stroke-5',
};

const STATUS_LABEL_KEY: Record<VideoJobItem['status'], 'status.processing' | 'status.completed' | 'status.failed' | 'status.canceled'> = {
  processing: 'status.processing',
  completed: 'status.completed',
  failed: 'status.failed',
  canceled: 'status.canceled',
};

const DashboardSidebar = ({
  collapsed,
  onToggle,
  videos,
  selectedVideoId,
  onSelectVideo,
  onCreateNewVideo,
}: DashboardSidebarProps) => {
  const pathname = usePathname();
  const { t, intlLocale } = useLocale();

  const isMenuItemActive = (menuKey: string, href: string) => {
    if (menuKey === 'gallery') {
      return pathname.startsWith('/dashboard/gallery') || pathname.startsWith('/dashboard/video/');
    }
    return pathname.startsWith(href);
  };

  const formatSidebarDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString(intlLocale, { day: '2-digit', month: '2-digit' });
  };

  return (
    <aside
      className={`border-stroke-3 dark:border-stroke-7 bg-background-2 dark:bg-background-8 text-secondary dark:text-accent sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ${collapsed ? 'w-[78px]' : 'w-[290px]'}`}>
      <div className="flex h-full flex-col">
        <div className="border-stroke-3 dark:border-stroke-7 flex items-center justify-between border-b px-4 py-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <Image src={logoDark} alt="Inkai" width={28} height={28} className="block dark:hidden" />
            <Image src={logo} alt="Inkai" width={28} height={28} className="hidden dark:block" />
            {!collapsed && <span className="text-tagline-2 font-medium tracking-wide text-secondary dark:text-accent">INKAI</span>}
          </div>

          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? t('sidebar.showSidebar') : t('sidebar.hideSidebar')}
            className="text-secondary/70 dark:text-accent/70 hover:bg-background-4 dark:hover:bg-background-7 hover:text-secondary dark:hover:text-accent rounded-sm p-1.5 transition">
            {collapsed ? (
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="m9 5 7 7-7 7" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="m15 5-7 7 7 7" />
              </svg>
            )}
          </button>
        </div>

        <nav aria-label="Dashboard navigation" className="border-stroke-3 dark:border-stroke-7 space-y-1 border-b px-3 py-4">
          <button
            type="button"
            onClick={onCreateNewVideo}
            className="text-tagline-2 text-secondary/70 dark:text-accent/70 hover:bg-background-4 dark:hover:bg-background-7 hover:text-secondary dark:hover:text-accent flex w-full cursor-pointer items-center gap-3 rounded-sm px-3 py-2 text-left transition">
            <span className="shrink-0">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="4" y="4" width="16" height="16" rx="3" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
              </svg>
            </span>
            {!collapsed && <span>{t('sidebar.createNewVideo')}</span>}
          </button>

          {menuItems.map((item) => {
            const isActive = isMenuItemActive(item.key, item.href);

            return (
              <Link
                key={item.key}
                href={item.href}
                className={`text-tagline-2 flex items-center gap-3 rounded-sm px-3 py-2 transition ${
                  isActive
                    ? 'bg-background-4 dark:bg-background-7 text-secondary dark:text-accent'
                    : 'text-secondary/70 dark:text-accent/70 hover:bg-background-4 dark:hover:bg-background-7 hover:text-secondary dark:hover:text-accent'
                }`}>
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && <span>{t(item.labelKey)}</span>}
              </Link>
            );
          })}
        </nav>

        <section className="flex-1 overflow-y-auto px-2 py-4">
          {!collapsed && <p className="text-tagline-3 mb-3 font-medium tracking-wide text-secondary/50 dark:text-accent/50">{t('sidebar.videos')}</p>}

          <div className="space-y-1">
            {videos.length === 0 ? (
              !collapsed && <p className="text-tagline-3 text-secondary/50 dark:text-accent/50">{t('sidebar.noVideos')}</p>
            ) : (
              videos.map((video) => {
                const selected = video.id === selectedVideoId;

                return (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => onSelectVideo(video.id)}
                    className={`w-full cursor-pointer rounded-sm px-3 py-2 text-left transition ${
                      selected
                        ? 'bg-background-4 dark:bg-background-7 text-secondary dark:text-accent'
                        : 'text-secondary/70 dark:text-accent/70 hover:bg-background-4/70 dark:hover:bg-background-7/70 hover:text-secondary dark:hover:text-accent'
                    }`}>
                    <div className="flex items-start gap-2">
                      {!collapsed && (
                        <span className="text-secondary/50 dark:text-accent/50 mt-0.5 shrink-0">
                          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
                            <path d="m10 9 5 3-5 3V9Z" />
                          </svg>
                        </span>
                      )}

                      {!collapsed && (
                        <div className="min-w-0 flex-1 space-y-1">
                          <p className="truncate text-sm text-secondary dark:text-accent">{video.title}</p>
                          <p className="text-tagline-3 flex items-center gap-1.5 text-secondary/50 dark:text-accent/50">
                            <span className={`inline-block h-1.5 w-1.5 rounded-full ${STATUS_DOT[video.status]}`} />
                            <span>{t(STATUS_LABEL_KEY[video.status])}</span>
                            <span>•</span>
                            <span>{formatSidebarDate(video.createdAt)}</span>
                          </p>
                        </div>
                      )}

                      {collapsed && (
                        <span className={`mx-auto mt-1 inline-block h-1.5 w-1.5 rounded-full ${STATUS_DOT[video.status]}`} />
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </section>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
