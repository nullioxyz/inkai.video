'use client';

import { ApiError, resolveApiErrorMessage, setPreferredApiLocale } from '@/lib/api/client';
import { clearStoredAuthToken, getStoredAuthToken } from '@/lib/auth-session';
import { getJobsQuota, updateUserPreferences } from '@/lib/api/dashboard';
import SessionExpiredLoginModal from '@/components/authentication/SessionExpiredLoginModal';
import { isSessionExpiredError } from '@/modules/dashboard/application/session-expiration';
import { fetchDashboardMe, resetDashboardPassword } from '@/modules/dashboard/application/services/dashboard-auth-service';
import { fetchDashboardCredits } from '@/modules/dashboard/application/services/dashboard-credits-service';
import { fetchDashboardGenerationCatalog } from '@/modules/dashboard/application/services/dashboard-presets-service';
import {
  createDashboardVideo,
  estimateDashboardVideo,
  fetchDashboardVideos,
  makeFallbackCreatedVideo,
  markCanceledVideo,
  renameDashboardVideo,
  subscribeDashboardVideos,
  upsertSortedVideo,
} from '@/modules/dashboard/application/services/dashboard-videos-service';
import { CreateVideoPayload, DashboardContextType, EstimateVideoPayload } from '@/modules/dashboard/domain/contracts';
import { dashboardDependencies } from '@/modules/dashboard/infra/dependencies';
import { CreditStatementEntryViewModel, CreditVideoGenerationViewModel } from '@/modules/credits/domain/view-models';
import { DailyGenerationQuota } from '@/modules/videos/domain/contracts';
import { ModelItem, PresetItem, VideoJobItem } from '@/types/dashboard';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type { CreateVideoPayload, DashboardContextType } from '@/modules/dashboard/domain/contracts';
export type { CreditStatementEntryViewModel, CreditVideoGenerationViewModel } from '@/modules/credits/domain/view-models';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [sessionExpired, setSessionExpired] = useState(false);
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
  const [models, setModels] = useState<ModelItem[]>([]);
  const [presetsByModelId, setPresetsByModelId] = useState<Record<string, PresetItem[]>>({});
  const [presetCategoriesByModelId, setPresetCategoriesByModelId] = useState<Record<string, string[]>>({});

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

  const markSessionExpired = useCallback(() => {
    clearStoredAuthToken();
    setToken(null);
    setSessionExpired(true);
  }, []);

  const restoreSession = useCallback((nextToken: string) => {
    setJobsError(null);
    setPresetsError(null);
    setQuotaError(null);
    setSessionExpired(false);
    setToken(nextToken);
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

  const checkSessionAlive = useCallback(async () => {
    if (!token || sessionExpired) {
      return;
    }

    try {
      await fetchDashboardMe(dashboardDependencies.authGateway, token);
    } catch (error) {
      if (isSessionExpiredError(error)) {
        markSessionExpired();
      }
    }
  }, [markSessionExpired, sessionExpired, token]);

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
      setModels([]);
      setPresetsByModelId({});
      setPresetCategoriesByModelId({});
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
        const [me, loadedVideos, loadedGenerationCatalog, loadedCredits, loadedQuota] = await Promise.all([
          fetchDashboardMe(dashboardDependencies.authGateway, token),
          fetchDashboardVideos(dashboardDependencies.videosGateway, token),
          fetchDashboardGenerationCatalog(dashboardDependencies.presetsGateway, token),
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
        setModels(loadedGenerationCatalog.models);
        setPresetsByModelId(loadedGenerationCatalog.presetsByModelId);
        setPresetCategoriesByModelId(loadedGenerationCatalog.presetCategoriesByModelId);

        setCreditBalance(loadedCredits.creditBalance);
        setCreditStatement(loadedCredits.creditStatement);
        setCreditVideoGenerations(loadedCredits.creditVideoGenerations);
      } catch (error) {
        if (isSessionExpiredError(error)) {
          markSessionExpired();
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
  }, [markSessionExpired, token]);

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
      if (isSessionExpiredError(error)) {
        markSessionExpired();
        return null;
      }

      const message = resolveApiErrorMessage(error, 'Falha ao carregar cota diária.');
      setQuotaError(message);
      return null;
    }
  }, [markSessionExpired, token]);

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
        void fetchCredits(token).catch((error) => {
          if (isSessionExpiredError(error)) {
            markSessionExpired();
          }
        });
      },
      onGenerationLimitAlert: (nextQuota) => {
        setQuota(nextQuota);
        setQuotaError(null);
      },
      onSessionLoggedOut: () => {
        markSessionExpired();
      },
      onError: (error) => {
        if (isSessionExpiredError(error)) {
          markSessionExpired();
          return;
        }
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
  }, [fetchCredits, markSessionExpired, token, userId]);

  useEffect(() => {
    if (!token) {
      return;
    }

    const interval = window.setInterval(() => {
      const hasProcessingJobs = videos.some((video) => video.status === 'processing');
      if (hasProcessingJobs) {
        void fetchJobs(token).catch((error) => {
          if (isSessionExpiredError(error)) {
            markSessionExpired();
          }
        });
      }
    }, 12000);

    return () => {
      window.clearInterval(interval);
    };
  }, [fetchJobs, markSessionExpired, token, videos]);

  useEffect(() => {
    if (!token) {
      return;
    }

    const interval = window.setInterval(() => {
      void fetchCredits(token).catch((error) => {
        if (isSessionExpiredError(error)) {
          markSessionExpired();
        }
      });
    }, 30000);

    return () => {
      window.clearInterval(interval);
    };
  }, [fetchCredits, markSessionExpired, token]);

  useEffect(() => {
    if (!token || sessionExpired) {
      return;
    }

    void checkSessionAlive();

    const interval = window.setInterval(() => {
      void checkSessionAlive();
    }, 60000);

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void checkSessionAlive();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [checkSessionAlive, sessionExpired, token]);

  const refreshJobs = useCallback(async () => {
    if (!token) {
      return;
    }

    setLoadingJobs(true);
    setJobsError(null);
    try {
      await fetchJobs(token);
    } catch (error) {
      if (isSessionExpiredError(error)) {
        markSessionExpired();
        return;
      }
      setJobsError(resolveApiErrorMessage(error, 'Falha ao atualizar jobs'));
    } finally {
      setLoadingJobs(false);
    }
  }, [fetchJobs, markSessionExpired, token]);

  const estimateVideoGeneration = useCallback(
    async (payload: EstimateVideoPayload) => {
      if (!token) {
        throw new Error('Você precisa estar logado para estimar a geração.');
      }

      try {
        return await estimateDashboardVideo({
          gateway: dashboardDependencies.videosGateway,
          token,
          payload,
        });
      } catch (error) {
        if (isSessionExpiredError(error)) {
          markSessionExpired();
        }

        throw error;
      }
    },
    [markSessionExpired, token],
  );

  const createVideo = useCallback(
    async (payload: CreateVideoPayload) => {
      if (!token) {
        throw new Error('Você precisa estar logado para gerar vídeos.');
      }

      const latestQuota = await refreshQuota();
      if (latestQuota?.limit_reached) {
        throw new Error('Você atingiu o limite diário de gerações. Entre em contato com o suporte para ampliar sua cota.');
      }

      let created: VideoJobItem | null = null;
      try {
        created = await createDashboardVideo({
          gateway: dashboardDependencies.videosGateway,
          token,
          payload,
        });
      } catch (error) {
        if (isSessionExpiredError(error)) {
          markSessionExpired();
        }
        throw error;
      }

      if (!created) {
        await refreshJobs();
        return makeFallbackCreatedVideo(payload);
      }

      setVideos((current) => upsertSortedVideo(current, created));
      await fetchCredits(token).catch((error) => {
        if (isSessionExpiredError(error)) {
          markSessionExpired();
        }
      });
      await refreshQuota();

      return created;
    },
    [fetchCredits, markSessionExpired, refreshJobs, refreshQuota, token],
  );

  const cancelVideo = useCallback(
    async (video: VideoJobItem) => {
      if (!token || !video.inputId) {
        return;
      }

      try {
        await dashboardDependencies.videosGateway.cancelJob(token, video.inputId);
        setVideos((current) => markCanceledVideo(current, video.id));

        await refreshJobs().catch((error) => {
          if (isSessionExpiredError(error)) {
            markSessionExpired();
          }
        });
        await fetchCredits(token).catch((error) => {
          if (isSessionExpiredError(error)) {
            markSessionExpired();
          }
        });
      } catch (error) {
        if (isSessionExpiredError(error)) {
          markSessionExpired();
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
    [fetchCredits, markSessionExpired, refreshJobs, token],
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
        if (isSessionExpiredError(error)) {
          markSessionExpired();
        }
        throw error;
      }
    },
    [markSessionExpired, token],
  );

  const logout = useCallback(() => {
    clearStoredAuthToken();
    setSessionExpired(false);
    setToken(null);
  }, []);

  const contextValue: DashboardContextType = useMemo(
    () => ({
      token,
      sessionExpired,
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
      models,
      presetsByModelId,
      presetCategoriesByModelId,
      loadingPresets,
      loadingJobs,
      jobsError,
      presetsError,
      createVideo,
      estimateVideoGeneration,
      refreshQuota,
      updatePreferences: updatePreferencesInContext,
      renameVideo,
      resetPassword,
      cancelVideo,
      refreshJobs,
      restoreSession,
      markSessionExpired,
      logout,
    }),
    [
      cancelVideo,
      createVideo,
      creditBalance,
      creditStatement,
      creditVideoGenerations,
      estimateVideoGeneration,
      isHydrated,
      jobsError,
      loadingJobs,
      loadingPresets,
      logout,
      mustResetPassword,
      canAccessAdmin,
      markSessionExpired,
      models,
      presetCategoriesByModelId,
      presetsByModelId,
      presetsError,
      refreshJobs,
      refreshQuota,
      renameVideo,
      resetPassword,
      updatePreferencesInContext,
      token,
      sessionExpired,
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
      restoreSession,
    ],
  );

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
      <SessionExpiredLoginModal open={sessionExpired && !token} onRestoreSession={restoreSession} />
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }

  return context;
};
