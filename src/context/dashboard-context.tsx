'use client';

import { ApiError, isAuthApiError, resolveApiErrorMessage, setPreferredApiLocale } from '@/lib/api/client';
import { clearStoredAuthToken, getStoredAuthToken } from '@/lib/auth-session';
import { getJobsQuota, updateUserPreferences } from '@/lib/api/dashboard';
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
import { DailyGenerationQuota } from '@/modules/videos/domain/contracts';
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
  const [userLanguageId, setUserLanguageId] = useState<number | null>(null);
  const [userLanguageSlug, setUserLanguageSlug] = useState<string | null>(null);
  const [themePreference, setThemePreference] = useState<'light' | 'dark' | 'system'>('system');
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [canAccessAdmin, setCanAccessAdmin] = useState(false);
  const [mustResetPassword, setMustResetPassword] = useState(false);
  const [quota, setQuota] = useState<DailyGenerationQuota | null>(null);
  const [quotaError, setQuotaError] = useState<string | null>(null);
  const [realtimeConnected, setRealtimeConnected] = useState(false);

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
      setPreferredApiLocale(null);
      setUserId(null);
      setUserName('');
      setUserEmail('');
      setUserLanguageId(null);
      setUserLanguageSlug(null);
      setThemePreference('system');
      setUserRoles([]);
      setCanAccessAdmin(false);
      setMustResetPassword(false);
      setQuota(null);
      setQuotaError(null);
      setRealtimeConnected(false);
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
        const [me, loadedVideos, loadedPresets, loadedCredits, loadedQuota] = await Promise.all([
          fetchDashboardMe(dashboardDependencies.authGateway, token),
          fetchDashboardVideos(dashboardDependencies.videosGateway, token),
          fetchDashboardPresets(dashboardDependencies.presetsGateway, token),
          fetchDashboardCredits(token),
          getJobsQuota(token),
        ]);

        setUserId(me.id);
        setUserName(me.name);
        setUserEmail(me.email);
        setUserLanguageId(me.language?.id ?? null);
        setUserLanguageSlug(me.language?.slug ?? null);
        setPreferredApiLocale(me.language?.slug ?? null);
        setThemePreference(me.theme_preference ?? 'system');
        setUserRoles(me.roles ?? []);
        setCanAccessAdmin(Boolean(me.can_access_admin));
        setMustResetPassword(me.must_reset_password);
        setQuota(loadedQuota);
        setQuotaError(null);

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

  const refreshQuota = useCallback(async () => {
    if (!token) {
      return null;
    }

    try {
      const nextQuota = await getJobsQuota(token);
      setQuota(nextQuota);
      setQuotaError(null);
      return nextQuota;
    } catch (error) {
      const message = resolveApiErrorMessage(error, 'Falha ao carregar cota diária.');
      setQuotaError(message);
      if (isAuthApiError(error)) {
        clearStoredAuthToken();
        setToken(null);
      }
      return null;
    }
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
      onGenerationLimitAlert: (nextQuota) => {
        setQuota(nextQuota);
        setQuotaError(null);
      },
      onError: () => {
        setRealtimeConnected(false);
      },
    }).then((stop) => {
      unsubscribe = stop;
      setRealtimeConnected(true);
    });

    return () => {
      setRealtimeConnected(false);
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

      const latestQuota = await refreshQuota();
      if (latestQuota?.limit_reached) {
        throw new Error('Você atingiu o limite diário de gerações. Entre em contato com o suporte para ampliar sua cota.');
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
      await refreshQuota();

      return created;
    },
    [fetchCredits, refreshJobs, refreshQuota, token],
  );

  const cancelVideo = useCallback(
    async (video: VideoJobItem) => {
      if (!token || !video.inputId) {
        return;
      }

      try {
        await dashboardDependencies.videosGateway.cancelJob(token, video.inputId);
        setVideos((current) => markCanceledVideo(current, video.id));

        await refreshJobs().catch(() => {
          // noop
        });
        await fetchCredits(token).catch(() => {
          // noop
        });
      } catch (error) {
        if (isAuthApiError(error)) {
          clearStoredAuthToken();
          setToken(null);
          throw error;
        }

        if (error instanceof ApiError && error.status === 422) {
          await refreshJobs().catch(() => {
            // noop
          });
          throw new Error('Este job não pode mais ser cancelado.');
        }

        await refreshJobs().catch(() => {
          // noop
        });
        throw new Error(resolveApiErrorMessage(error, 'Não foi possível cancelar a geração agora.'));
      }
    },
    [fetchCredits, refreshJobs, token],
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

  const updatePreferencesInContext = useCallback(
    async ({ languageId, themePreference: nextThemePreference }: { languageId?: number | null; themePreference?: 'light' | 'dark' | 'system' | null }) => {
      if (!token) {
        throw new Error('Você precisa estar logado para atualizar preferências.');
      }

      const payload: { language_id?: number | null; theme_preference?: 'light' | 'dark' | 'system' | null } = {};

      if (languageId !== undefined) {
        payload.language_id = languageId;
      }

      if (nextThemePreference !== undefined) {
        payload.theme_preference = nextThemePreference;
      }

      try {
        const me = await updateUserPreferences(token, payload);
        setUserName(me.name);
        setUserEmail(me.email);
        setUserLanguageId(me.language?.id ?? null);
        setUserLanguageSlug(me.language?.slug ?? null);
        setPreferredApiLocale(me.language?.slug ?? null);
        setThemePreference(me.theme_preference ?? 'system');
        setUserRoles(me.roles ?? []);
        setCanAccessAdmin(Boolean(me.can_access_admin));
        setMustResetPassword(me.must_reset_password);
      } catch (error) {
        if (isAuthApiError(error)) {
          clearStoredAuthToken();
          setToken(null);
        }
        throw error;
      }
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
      userLanguageId,
      userLanguageSlug,
      themePreference,
      userRoles,
      canAccessAdmin,
      mustResetPassword,
      quota,
      quotaError,
      realtimeConnected,
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
      refreshQuota,
      updatePreferences: updatePreferencesInContext,
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
      canAccessAdmin,
      presetCategories,
      presets,
      presetsError,
      refreshJobs,
      refreshQuota,
      renameVideo,
      resetPassword,
      updatePreferencesInContext,
      token,
      userEmail,
      userLanguageId,
      userLanguageSlug,
      userId,
      userName,
      userRoles,
      videos,
      themePreference,
      quota,
      quotaError,
      realtimeConnected,
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
