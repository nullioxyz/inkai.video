'use client';

import { DASHBOARD_VIDEO_LIBRARY } from '@/data/dashboard/videos';
import { VideoJobItem } from '@/types/dashboard';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import DashboardSidebar from '../DashboardSidebar';

interface DashboardContentShellProps {
  children: ReactNode;
  videos?: VideoJobItem[];
  selectedVideoId?: string | null;
}

const SIDEBAR_COLLAPSED_STORAGE_KEY = 'inkai-dashboard-sidebar-collapsed';

const DashboardContentShell = ({ children, videos = DASHBOARD_VIDEO_LIBRARY, selectedVideoId = null }: DashboardContentShellProps) => {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      const saved = localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const handleToggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SIDEBAR_COLLAPSED_STORAGE_KEY, String(next));
      } catch {
        // Ignore storage access issues.
      }
      return next;
    });
  };

  return (
    <main className="bg-background-3 dark:bg-background-7 min-h-screen">
      <div className="flex min-h-screen w-full">
        <DashboardSidebar
          collapsed={sidebarCollapsed}
          onToggle={handleToggleSidebar}
          videos={videos}
          selectedVideoId={selectedVideoId}
          onSelectVideo={(videoId) => router.push(`/dashboard/video/${videoId}`)}
          onCreateNewVideo={() => router.push('/dashboard')}
        />

        <div className="flex-1 p-4 md:p-8 lg:p-10">{children}</div>
      </div>
    </main>
  );
};

export default DashboardContentShell;
