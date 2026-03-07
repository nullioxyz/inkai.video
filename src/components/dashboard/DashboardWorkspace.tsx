'use client';

import { useDashboard } from '@/context/dashboard-context';
import { useLocale } from '@/context/LocaleContext';
import { mustRedirectToFirstLoginReset } from '@/modules/auth/application/first-login-guard';
import { shouldRedirectToLogin } from '@/modules/dashboard/application/session-expiration';
import { shouldPollQuotaFallback } from '@/modules/videos/application/quota-polling';
import type { ModelItem, PresetItem } from '@/types/dashboard';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import DashboardSidebar from '@/components/sidebar/Sidebar';
import WorkspaceCreateView from './workspace/WorkspaceCreateView';
import WorkspaceDetailView from './workspace/WorkspaceDetailView';
import WorkspaceStatusMessages from './workspace/WorkspaceStatusMessages';
import { usePersistedSidebarCollapse } from '@/components/sidebar/hooks/usePersistedSidebarCollapse';
import MobileDashboardTopBar from '@/components/topbar/MobileDashboardTopBar';

const DashboardWorkspace = () => {
  const { t } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const {
    token,
    sessionExpired,
    isHydrated,
    mustResetPassword,
    videos,
    createVideo,
    estimateVideoGeneration,
    renameVideo,
    models,
    presetsByModelId,
    presetCategoriesByModelId,
    loadingPresets,
    presetsError,
    loadingJobs,
    jobsError,
    quota,
    quotaError,
    realtimeConnected,
    refreshQuota,
    creditBalance,
  } = useDashboard();
  const { collapsed: sidebarCollapsed, toggle: handleToggleSidebar } = usePersistedSidebarCollapse();
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isReturningToCreate, setIsReturningToCreate] = useState(false);
  const [createViewAnimationKey, setCreateViewAnimationKey] = useState(0);

  useEffect(() => {
    if (
      shouldRedirectToLogin({
        isHydrated,
        token,
        sessionExpired,
      })
    ) {
      router.replace('/login');
    }
  }, [isHydrated, router, sessionExpired, token]);

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
    model: ModelItem;
    preset: PresetItem;
    durationSeconds?: number | null;
    estimatedCreditsRequired?: number;
    estimatedGenerationCostUsd?: string | null;
  }) => {
    const createdVideo = await createVideo({
      title: payload.title,
      imageFile: payload.imageFile,
      imageSrc: payload.imageSrc,
      model: payload.model,
      preset: payload.preset,
      durationSeconds: payload.durationSeconds,
      estimatedCreditsRequired: payload.estimatedCreditsRequired,
      estimatedGenerationCostUsd: payload.estimatedGenerationCostUsd,
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

  useEffect(() => {
    if (
      !shouldPollQuotaFallback({
        token,
        realtimeConnected,
        selectedVideoId,
      })
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      void refreshQuota();
    }, 30000);

    return () => {
      window.clearInterval(interval);
    };
  }, [refreshQuota, realtimeConnected, selectedVideoId, token]);

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
          <MobileDashboardTopBar onOpenMenu={() => setMobileMenuOpen(true)} />

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-3 sm:p-4 md:p-8 lg:p-10">
            <WorkspaceStatusMessages
              showLoading={loadingJobs && !selectedVideo && videos.length === 0}
              loadingLabel={t('dashboard.loadingVideos')}
              errorMessage={!selectedVideo ? jobsError : null}
            />
            {selectedVideo ? (
              <WorkspaceDetailView video={selectedVideo} isReturningToCreate={isReturningToCreate} onCreateNewVideo={handleCreateNewVideo} />
            ) : (
              <WorkspaceCreateView
                models={models}
                presetsByModelId={presetsByModelId}
                presetCategoriesByModelId={presetCategoriesByModelId}
                loadingPresets={loadingPresets}
                presetsError={presetsError}
                quota={quota}
                quotaError={quotaError}
                creditBalance={creditBalance}
                onEstimateVideo={estimateVideoGeneration}
                onGenerateVideo={handleGenerateVideo}
                animateInTrigger={createViewAnimationKey}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardWorkspace;
