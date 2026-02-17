'use client';

import { DASHBOARD_VIDEO_LIBRARY } from '@/data/dashboard/videos';
import { VideoJobItem } from '@/types/dashboard';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import DashboardSidebar from '../DashboardSidebar';

interface DashboardContentShellProps {
  children: ReactNode;
  videos?: VideoJobItem[];
  selectedVideoId?: string | null;
}

const SIDEBAR_COLLAPSED_STORAGE_KEY = 'inkai-dashboard-sidebar-collapsed';

const DashboardContentShell = ({ children, videos = DASHBOARD_VIDEO_LIBRARY, selectedVideoId = null }: DashboardContentShellProps) => {
  const router = useRouter();
  const pathname = usePathname();
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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
          onSelectVideo={(videoId) => {
            router.push(`/dashboard/video/${videoId}`);
            setMobileMenuOpen(false);
          }}
          onCreateNewVideo={() => {
            router.push('/dashboard');
            setMobileMenuOpen(false);
          }}
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
        />

        <div className="flex min-h-screen flex-1 min-w-0 flex-col">
          <div className="bg-background-3/90 dark:bg-background-7/90 border-stroke-3 dark:border-stroke-7 sticky top-0 z-30 flex items-center justify-between border-b px-3 py-3 backdrop-blur-sm md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="text-secondary dark:text-accent hover:bg-background-4 dark:hover:bg-background-8 rounded-sm p-2 transition">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            </button>
            <p className="text-tagline-2 text-secondary dark:text-accent font-medium">Inkai</p>
            <span className="w-9" aria-hidden />
          </div>

          <div className="flex-1 min-h-0 p-3 sm:p-4 md:p-8 lg:p-10">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default DashboardContentShell;
