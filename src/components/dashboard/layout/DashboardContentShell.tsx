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

const DashboardContentShell = ({ children, videos = DASHBOARD_VIDEO_LIBRARY, selectedVideoId = null }: DashboardContentShellProps) => {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <main className="bg-background-3 dark:bg-background-7 min-h-screen">
      <div className="flex min-h-screen w-full">
        <DashboardSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((prev) => !prev)}
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
