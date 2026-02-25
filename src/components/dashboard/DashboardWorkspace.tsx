'use client';

import { useDashboard } from '@/context/dashboard-context';
import { mustRedirectToFirstLoginReset } from '@/modules/auth/application/first-login-guard';
import { PresetItem } from '@/types/dashboard';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import VideoDetailsPanel from './VideoDetailsPanel';
import VideoGenerationDashboard from './VideoGenerationDashboard';

const SIDEBAR_COLLAPSED_STORAGE_KEY = 'inkai-dashboard-sidebar-collapsed';

const DashboardWorkspace = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { token, isHydrated, mustResetPassword, videos, createVideo, renameVideo, presets, presetCategories, loadingPresets, presetsError, loadingJobs, jobsError } =
    useDashboard();
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
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isReturningToCreate, setIsReturningToCreate] = useState(false);
  const [createViewAnimationKey, setCreateViewAnimationKey] = useState(0);

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

  const selectedVideo = useMemo(() => {
    if (!selectedVideoId) {
      return null;
    }
    return videos.find((video) => video.id === selectedVideoId) ?? null;
  }, [selectedVideoId, videos]);

  const handleGenerateVideo = async (payload: {
    title: string;
    imageFile: File;
    imageSrc: string;
    format: string;
    prompt: string;
    preset: PresetItem;
  }) => {
    const createdVideo = await createVideo({
      title: payload.title,
      imageFile: payload.imageFile,
      imageSrc: payload.imageSrc,
      preset: payload.preset,
    });

    return createdVideo;
  };

  const handleCreateNewVideo = () => {
    if (!selectedVideoId) {
      return;
    }

    setIsReturningToCreate(true);
    window.setTimeout(() => {
      setSelectedVideoId(null);
      setCreateViewAnimationKey((prev) => prev + 1);
      setIsReturningToCreate(false);
    }, 280);
  };

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
    <main className="bg-background-3 dark:bg-background-7 h-dvh overflow-hidden">
      <div className="flex h-full w-full overflow-hidden">
        <DashboardSidebar
          collapsed={sidebarCollapsed}
          onToggle={handleToggleSidebar}
          videos={videos}
          selectedVideoId={selectedVideoId}
          onSelectVideo={(videoId) => {
            setSelectedVideoId(videoId);
            setMobileMenuOpen(false);
          }}
          onCreateNewVideo={() => {
            handleCreateNewVideo();
            setMobileMenuOpen(false);
          }}
          onRenameVideo={renameVideo}
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
        />

        <div className="flex min-h-0 flex-1 min-w-0 flex-col overflow-hidden">
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

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-3 sm:p-4 md:p-8 lg:p-10">
            {loadingJobs && !selectedVideo && videos.length === 0 ? (
              <p className="text-tagline-2 text-secondary/70 dark:text-accent/70 text-center">Carregando vídeos...</p>
            ) : null}
            {jobsError && !selectedVideo ? <p className="text-tagline-2 text-ns-red text-center mb-4">{jobsError}</p> : null}
            {selectedVideo ? (
              <div className={`flex min-h-0 flex-1 flex-col transition-all duration-300 ${isReturningToCreate ? '-translate-x-8 opacity-0' : 'translate-x-0 opacity-100'}`}>
                <div className="min-h-0 flex-1 overflow-y-auto">
                  <VideoDetailsPanel video={selectedVideo} onCreateNewVideo={handleCreateNewVideo} />
                </div>
              </div>
            ) : (
              <div className="min-h-0 flex-1">
                <VideoGenerationDashboard
                  presets={presets}
                  presetCategories={presetCategories}
                  loadingPresets={loadingPresets}
                  presetsError={presetsError}
                  onGenerateVideo={handleGenerateVideo}
                  animateInTrigger={createViewAnimationKey}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardWorkspace;
