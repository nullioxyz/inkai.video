'use client';

import { useLocale } from '@/context/LocaleContext';
import { useDashboard } from '@/context/dashboard-context';
import type { VideoJobItem } from '@/types/dashboard';
import { usePathname } from 'next/navigation';
import SidebarHeader from './SidebarHeader';
import SidebarNavigation from './SidebarNavigation';
import SidebarPanel from './SidebarPanel';
import SidebarVideosList from './SidebarVideosList';
import { useSidebarRename } from './useSidebarRename';

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  videos: VideoJobItem[];
  selectedVideoId: string | null;
  onSelectVideo: (videoId: string) => void;
  onCreateNewVideo: () => void;
  onRenameVideo: (videoId: string, title: string) => Promise<void>;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const DashboardSidebar = ({
  collapsed,
  onToggle,
  videos,
  selectedVideoId,
  onSelectVideo,
  onCreateNewVideo,
  onRenameVideo,
  mobileOpen = false,
  onMobileClose,
}: DashboardSidebarProps) => {
  const pathname = usePathname();
  const { t, intlLocale } = useLocale();
  const { logout } = useDashboard();
  const rename = useSidebarRename({ onRenameVideo, t });

  const handleMobileClose = () => {
    onMobileClose?.();
  };

  const formatSidebarDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString(intlLocale, { day: '2-digit', month: '2-digit' });
  };

  const renderSidebarContent = (isMobile: boolean) => {
    const isCollapsed = isMobile ? false : collapsed;

    return (
      <div className="flex h-full flex-col">
        <SidebarHeader mobile={isMobile} collapsed={isCollapsed} onToggle={onToggle} onMobileClose={handleMobileClose} t={t} />

        <SidebarNavigation
          collapsed={isCollapsed}
          pathname={pathname}
          t={t}
          onCreate={() => {
            onCreateNewVideo();
            if (isMobile) {
              handleMobileClose();
            }
          }}
          onLogout={() => {
            logout();
            if (isMobile) {
              handleMobileClose();
            }
          }}
        />

        <SidebarVideosList
          videos={videos}
          collapsed={isCollapsed}
          selectedVideoId={selectedVideoId}
          t={t}
          formatDate={formatSidebarDate}
          onSelectVideo={(videoId) => {
            onSelectVideo(videoId);
            if (isMobile) {
              handleMobileClose();
            }
          }}
          rename={rename}
        />
      </div>
    );
  };

  return (
    <>
      <SidebarPanel mobile={false} collapsed={collapsed} mobileOpen={mobileOpen} onMobileClose={handleMobileClose}>
        {renderSidebarContent(false)}
      </SidebarPanel>

      <SidebarPanel mobile collapsed={collapsed} mobileOpen={mobileOpen} onMobileClose={handleMobileClose}>
        {renderSidebarContent(true)}
      </SidebarPanel>
    </>
  );
};

export default DashboardSidebar;
