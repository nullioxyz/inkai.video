'use client';

import { isAuthApiError, resolveApiErrorMessage } from '@/lib/api/client';
import { clearStoredAuthToken, getStoredAuthToken } from '@/lib/auth-session';
import { fetchDashboardMe, resetDashboardPassword } from '@/modules/dashboard/application/services/dashboard-auth-service';
import { fetchDashboardCredits } from '@/modules/dashboard/application/services/dashboard-credits-service';
import { fetchDashboardPresets } from '@/modules/dashboard/application/services/dashboard-presets-service';
import {
  createDashboardVideo,
  fetchDashboardVideos,
  makeFallbackCreatedVideo,
  markCanceledVideo,
  renameDashboardVideo,
  subscribeDashboardVideos,
  upsertSortedVideo,
} from '@/modules/dashboard/application/services/dashboard-videos-service';
import { CreateVideoPayload, DashboardContextType } from '@/modules/dashboard/domain/contracts';
import { dashboardDependencies } from '@/modules/dashboard/infra/dependencies';
import { CreditStatementEntryViewModel, CreditVideoGenerationViewModel } from '@/modules/credits/domain/view-models';
import { PresetItem, VideoJobItem } from '@/types/dashboard';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type { CreateVideoPayload, DashboardContextType } from '@/modules/dashboard/domain/contracts';
export type { CreditStatementEntryViewModel, CreditVideoGenerationViewModel } from '@/modules/credits/domain/view-models';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [mustResetPassword, setMustResetPassword] = useState(false);

  const [videos, setVideos] = useState<VideoJobItem[]>([]);
  const [presets, setPresets] = useState<PresetItem[]>([]);
  const [presetCategories, setPresetCategories] = useState<string[]>([]);

  const [creditBalance, setCreditBalance] = useState(0);
  const [creditStatement, setCreditStatement] = useState<CreditStatementEntryViewModel[]>([]);
  const [creditVideoGenerations, setCreditVideoGenerations] = useState<CreditVideoGenerationViewModel[]>([]);

  const [loadingPresets, setLoadingPresets] = useState(false);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [presetsError, setPresetsError] = useState<string | null>(null);
  const [jobsError, setJobsError] = useState<string | null>(null);

  useEffect(() => {
    setToken(getStoredAuthToken());
    setIsHydrated(true);
  }, []);

  const fetchCredits = useCallback(async (activeToken: string) => {
    const credits = await fetchDashboardCredits(activeToken);
    setCreditBalance(credits.creditBalance);
    setCreditStatement(credits.creditStatement);
    setCreditVideoGenerations(credits.creditVideoGenerations);
  }, []);

  const fetchJobs = useCallback(async (activeToken: string) => {
    const rows = await fetchDashboardVideos(dashboardDependencies.videosGateway, activeToken);
    setVideos(rows);
  }, []);

  useEffect(() => {
    if (!token) {
      setUserId(null);
      setUserName('');
      setUserEmail('');
      setMustResetPassword(false);
      setVideos([]);
      setPresets([]);
      setPresetCategories([]);
      setCreditBalance(0);
      setCreditStatement([]);
      setCreditVideoGenerations([]);
      return;
    }

    const loadDashboard = async () => {
      setLoadingJobs(true);
      setLoadingPresets(true);
      setJobsError(null);
      setPresetsError(null);

      try {
        const [me, loadedVideos, loadedPresets, loadedCredits] = await Promise.all([
          fetchDashboardMe(dashboardDependencies.authGateway, token),
          fetchDashboardVideos(dashboardDependencies.videosGateway, token),
          fetchDashboardPresets(dashboardDependencies.presetsGateway, token),
          fetchDashboardCredits(token),
        ]);

        setUserId(me.id);
        setUserName(me.name);
        setUserEmail(me.email);
        setMustResetPassword(me.must_reset_password);

        setVideos(loadedVideos);
        setPresets(loadedPresets.presets);
        setPresetCategories(loadedPresets.presetCategories);

        setCreditBalance(loadedCredits.creditBalance);
        setCreditStatement(loadedCredits.creditStatement);
        setCreditVideoGenerations(loadedCredits.creditVideoGenerations);
      } catch (error) {
        if (isAuthApiError(error)) {
          clearStoredAuthToken();
          setToken(null);
          return;
        }

        const message = resolveApiErrorMessage(error, 'Falha ao carregar dashboard');
        setJobsError(message);
        setPresetsError(message);
      } finally {
        setLoadingJobs(false);
        setLoadingPresets(false);
      }
    };

    void loadDashboard();
  }, [token]);

  useEffect(() => {
    if (!token || !userId) {
      return;
    }

    let unsubscribe: (() => void) | undefined;

    void subscribeDashboardVideos({
      realtime: dashboardDependencies.videosRealtime,
      token,
      userId,
      onJobUpdated: (video) => {
        setVideos((current) => upsertSortedVideo(current, video));
        void fetchCredits(token).catch(() => {
          // noop
        });
      },
      onError: () => {
        // noop
      },
    }).then((stop) => {
      unsubscribe = stop;
    });

    return () => {
      unsubscribe?.();
    };
  }, [fetchCredits, token, userId]);

  useEffect(() => {
    if (!token) {
      return;
    }

    const interval = window.setInterval(() => {
      const hasProcessingJobs = videos.some((video) => video.status === 'processing');
      if (hasProcessingJobs) {
        void fetchJobs(token).catch(() => {
          // noop
        });
      }
    }, 12000);

    return () => {
      window.clearInterval(interval);
    };
  }, [fetchJobs, token, videos]);

  useEffect(() => {
    if (!token) {
      return;
    }

    const interval = window.setInterval(() => {
      void fetchCredits(token).catch(() => {
        // noop
      });
    }, 30000);

    return () => {
      window.clearInterval(interval);
    };
  }, [fetchCredits, token]);

  const refreshJobs = useCallback(async () => {
    if (!token) {
      return;
    }

    setLoadingJobs(true);
    setJobsError(null);
    try {
      await fetchJobs(token);
    } catch (error) {
      setJobsError(resolveApiErrorMessage(error, 'Falha ao atualizar jobs'));
    } finally {
      setLoadingJobs(false);
    }
  }, [fetchJobs, token]);

  const createVideo = useCallback(
    async (payload: CreateVideoPayload) => {
      if (!token) {
        throw new Error('Você precisa estar logado para gerar vídeos.');
      }

      const created = await createDashboardVideo({
        gateway: dashboardDependencies.videosGateway,
        token,
        payload,
      });

      if (!created) {
        await refreshJobs();
        return makeFallbackCreatedVideo(payload);
      }

      setVideos((current) => upsertSortedVideo(current, created));
      await fetchCredits(token).catch(() => {
        // noop
      });

      return created;
    },
    [fetchCredits, refreshJobs, token],
  );

  const cancelVideo = useCallback(
    async (video: VideoJobItem) => {
      if (!token || !video.inputId) {
        return;
      }

      await dashboardDependencies.videosGateway.cancelJob(token, video.inputId);
      setVideos((current) => markCanceledVideo(current, video.id));

      await fetchCredits(token).catch(() => {
        // noop
      });
    },
    [fetchCredits, token],
  );

  const renameVideo = useCallback(
    async (videoId: string, title: string) => {
      const normalized = title.trim();
      if (!normalized) {
        throw new Error('Título inválido.');
      }

      const target = videos.find((video) => video.id === videoId);
      if (!target) {
        throw new Error('Vídeo não encontrado.');
      }

      if (target.title === normalized) {
        return;
      }

      const previousTitle = target.title;
      setVideos((current) => current.map((video) => (video.id === videoId ? { ...video, title: normalized } : video)));

      if (!target.inputId) {
        return;
      }

      if (!token) {
        setVideos((current) => current.map((video) => (video.id === videoId ? { ...video, title: previousTitle } : video)));
        throw new Error('Você precisa estar logado para renomear vídeos.');
      }

      try {
        const updated = await renameDashboardVideo({
          gateway: dashboardDependencies.videosGateway,
          token,
          inputId: target.inputId,
          title: normalized,
        });

        setVideos((current) => upsertSortedVideo(current, updated));
      } catch (error) {
        setVideos((current) => current.map((video) => (video.id === videoId ? { ...video, title: previousTitle } : video)));
        throw error;
      }
    },
    [token, videos],
  );

  const resetPassword = useCallback(
    async (currentPassword: string, newPassword: string, confirmation: string) => {
      if (!token) {
        throw new Error('Você precisa estar logado para redefinir senha.');
      }

      const me = await resetDashboardPassword(token, currentPassword, newPassword, confirmation);
      setMustResetPassword(me.must_reset_password);
    },
    [token],
  );

  const logout = useCallback(() => {
    clearStoredAuthToken();
    setToken(null);
  }, []);

  const contextValue: DashboardContextType = useMemo(
    () => ({
      token,
      isHydrated,
      userId,
      userName,
      userEmail,
      mustResetPassword,
      creditBalance,
      creditStatement,
      creditVideoGenerations,
      videos,
      presets,
      presetCategories,
      loadingPresets,
      loadingJobs,
      jobsError,
      presetsError,
      createVideo,
      renameVideo,
      resetPassword,
      cancelVideo,
      refreshJobs,
      logout,
    }),
    [
      cancelVideo,
      createVideo,
      creditBalance,
      creditStatement,
      creditVideoGenerations,
      isHydrated,
      jobsError,
      loadingJobs,
      loadingPresets,
      logout,
      mustResetPassword,
      presetCategories,
      presets,
      presetsError,
      refreshJobs,
      renameVideo,
      resetPassword,
      token,
      userEmail,
      userId,
      userName,
      videos,
    ],
  );

  return <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>;
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }

  return context;
};
