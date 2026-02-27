'use client';

import { useDashboard } from '@/context/dashboard-context';
import { mustRedirectToFirstLoginReset } from '@/modules/auth/application/first-login-guard';
import type { VideoJobItem } from '@/types/dashboard';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import DashboardSidebar from '@/components/sidebar/Sidebar';
import { usePersistedSidebarCollapse } from '@/components/sidebar/hooks/usePersistedSidebarCollapse';
import MobileDashboardTopBar from '@/components/topbar/MobileDashboardTopBar';

interface DashboardContentShellProps {
  children: ReactNode;
  videos?: VideoJobItem[];
  selectedVideoId?: string | null;
}

const DashboardContentShell = ({ children, videos, selectedVideoId = null }: DashboardContentShellProps) => {
  const { videos: contextVideos, token, isHydrated, renameVideo, mustResetPassword } = useDashboard();
  const router = useRouter();
  const pathname = usePathname();
  const resolvedVideos = videos ?? contextVideos;
  const { collapsed: sidebarCollapsed, toggle: handleToggleSidebar } = usePersistedSidebarCollapse();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isHydrated && !token) {
      router.replace('/login');
    }
  }, [isHydrated, router, token]);

  useEffect(() => {
    if (!isHydrated || !token) {
      return;
    }

    if (mustRedirectToFirstLoginReset(mustResetPassword, pathname)) {
      router.replace('/first-login/reset-password');
    }
  }, [isHydrated, mustResetPassword, pathname, router, token]);

  return (
    <main className="bg-background-3 dark:bg-background-7 min-h-screen">
      <div className="flex min-h-screen w-full">
        <DashboardSidebar
          collapsed={sidebarCollapsed}
          onToggle={handleToggleSidebar}
          videos={resolvedVideos}
          selectedVideoId={selectedVideoId}
          onSelectVideo={(videoId) => {
            router.push(`/dashboard/video/${videoId}`);
            setMobileMenuOpen(false);
          }}
          onCreateNewVideo={() => {
            router.push('/dashboard');
            setMobileMenuOpen(false);
          }}
          onRenameVideo={renameVideo}
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
        />

        <div className="flex min-h-screen flex-1 min-w-0 flex-col">
          <MobileDashboardTopBar onOpenMenu={() => setMobileMenuOpen(true)} />

          <div className="flex-1 min-h-0 p-3 sm:p-4 md:p-8 lg:p-10">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default DashboardContentShell;
