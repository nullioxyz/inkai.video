'use client';

import { isAuthApiError, resolveApiErrorMessage } from '@/lib/api/client';
import { CreditStatementEntryResponse, CreditVideoGenerationResponse, getCreditsBalance, getCreditsStatement, getCreditsVideoGenerations, resetFirstLoginPassword } from '@/lib/api/dashboard';
import { clearStoredAuthToken, getStoredAuthToken } from '@/lib/auth-session';
import { createAuthModule } from '@/modules/auth';
import { mapPresetToViewModel } from '@/modules/presets/application/mappers';
import { createPresetsModule } from '@/modules/presets';
import { mapJobToVideoItem } from '@/modules/videos/application/mappers';
import { replaceVideosSorted, upsertVideoById } from '@/modules/videos/application/state';
import { createVideosModule } from '@/modules/videos';
import { PresetItem, VideoJobItem } from '@/types/dashboard';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface CreateVideoPayload {
  title: string;
  imageFile: File;
  imageSrc: string;
  preset: PresetItem;
}

export interface CreditStatementEntryViewModel {
  id: number;
  delta: number;
  balanceAfter: number;
  reason: string;
  referenceType: string;
  referenceId: number | null;
  createdAt: string | null;
}

export interface CreditVideoGenerationViewModel {
  inputId: number;
  title: string | null;
  status: string;
  presetId: number | null;
  presetName: string | null;
  predictionId: number | null;
  predictionStatus: string | null;
  predictionErrorCode: string | null;
  predictionErrorMessage: string | null;
  outputVideoUrl: string | null;
  creditsDebited: number;
  creditsRefunded: number;
  creditsUsed: number;
  isFailed: boolean;
  isCanceled: boolean;
  isRefunded: boolean;
  failureCode: string | null;
  failureMessage: string | null;
  failureReason: string | null;
  cancellationReason: string | null;
  creditEvents: Array<{
    ledgerId: number | null;
    type: string;
    operation: string;
    delta: number;
    balanceAfter: number | null;
    reason: string;
    referenceType: string;
    referenceId: number | null;
    createdAt: string | null;
  }>;
  createdAt: string | null;
  updatedAt: string | null;
}

const mapCreditStatementToViewModel = (entry: CreditStatementEntryResponse): CreditStatementEntryViewModel => {
  return {
    id: entry.id,
    delta: entry.delta,
    balanceAfter: entry.balance_after,
    reason: entry.reason,
    referenceType: entry.reference_type,
    referenceId: entry.reference_id,
    createdAt: entry.created_at,
  };
};

const mapCreditVideoGenerationToViewModel = (entry: CreditVideoGenerationResponse): CreditVideoGenerationViewModel => {
  return {
    inputId: entry.input_id,
    title: entry.title,
    status: entry.status,
    presetId: entry.preset?.id ?? null,
    presetName: entry.preset?.name ?? null,
    predictionId: entry.prediction?.id ?? null,
    predictionStatus: entry.prediction?.status ?? null,
    predictionErrorCode: entry.prediction?.error_code ?? null,
    predictionErrorMessage: entry.prediction?.error_message ?? null,
    outputVideoUrl: entry.prediction?.output_video_url ?? null,
    creditsDebited: entry.credits_debited,
    creditsRefunded: entry.credits_refunded,
    creditsUsed: entry.credits_used,
    isFailed: Boolean(entry.is_failed),
    isCanceled: Boolean(entry.is_canceled),
    isRefunded: Boolean(entry.is_refunded),
    failureCode: entry.failure?.code ?? null,
    failureMessage: entry.failure?.message ?? null,
    failureReason: entry.failure?.reason ?? null,
    cancellationReason: entry.cancellation?.reason ?? null,
    creditEvents: (entry.credit_events ?? []).map((event) => ({
      ledgerId: event?.ledger_id ?? null,
      type: event?.type ?? '',
      operation: event?.operation ?? '',
      delta: Number(event?.delta ?? 0),
      balanceAfter: event?.balance_after ?? null,
      reason: event?.reason ?? '',
      referenceType: event?.reference_type ?? '',
      referenceId: event?.reference_id ?? null,
      createdAt: event?.created_at ?? null,
    })),
    createdAt: entry.created_at,
    updatedAt: entry.updated_at,
  };
};

interface DashboardContextType {
  token: string | null;
  isHydrated: boolean;
  userId: number | null;
  userName: string;
  userEmail: string;
  mustResetPassword: boolean;
  creditBalance: number;
  creditStatement: CreditStatementEntryViewModel[];
  creditVideoGenerations: CreditVideoGenerationViewModel[];
  videos: VideoJobItem[];
  presets: PresetItem[];
  presetCategories: string[];
  loadingPresets: boolean;
  loadingJobs: boolean;
  jobsError: string | null;
  presetsError: string | null;
  createVideo: (payload: CreateVideoPayload) => Promise<VideoJobItem>;
  renameVideo: (videoId: string, title: string) => Promise<void>;
  resetPassword: (currentPassword: string, newPassword: string, confirmation: string) => Promise<void>;
  cancelVideo: (video: VideoJobItem) => Promise<void>;
  refreshJobs: () => Promise<void>;
  logout: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);
const authModule = createAuthModule();
const presetsModule = createPresetsModule();
const videosModule = createVideosModule();

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
    const [balance, statement, videoGenerations] = await Promise.all([
      getCreditsBalance(activeToken),
      getCreditsStatement(activeToken, 1, 100).then((response) => response.data),
      getCreditsVideoGenerations(activeToken, 1, 100).then((response) => response.data),
    ]);

    setCreditBalance(balance.credit_balance);
    setCreditStatement(statement.map(mapCreditStatementToViewModel));
    setCreditVideoGenerations(videoGenerations.map(mapCreditVideoGenerationToViewModel));
  }, []);

  const fetchJobs = useCallback(async (activeToken: string) => {
    const rows = await videosModule.gateway.listJobs(activeToken, 1, 100);
    setVideos(replaceVideosSorted(rows.map(mapJobToVideoItem)));
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
        const [me, jobRows, presetRows, presetFilters, balance, statement, videoGenerations] = await Promise.all([
          authModule.gateway.getMe(token),
          videosModule.gateway.listJobs(token, 1, 100),
          presetsModule.gateway.listPresets(token),
          presetsModule.gateway.listPresetFilters(token),
          getCreditsBalance(token),
          getCreditsStatement(token, 1, 100).then((response) => response.data),
          getCreditsVideoGenerations(token, 1, 100).then((response) => response.data),
        ]);

        const mappedPresets = presetRows.map(mapPresetToViewModel);
        const categoriesFromFilters = presetFilters
          .flatMap((entry) => [
            ...entry.filters.tags.map((tag) => tag.slug),
            ...entry.filters.aspect_ratios,
          ])
          .filter((category) => category.trim() !== '');
        const categoriesFromPresets = mappedPresets.flatMap((preset) => {
          const tags = preset.tags ?? [];
          return tags.length ? tags.map((tag) => tag.slug) : [preset.category];
        });

        setUserId(me.id);
        setUserName(me.name);
        setUserEmail(me.email);
        setMustResetPassword(me.must_reset_password);
        setVideos(replaceVideosSorted(jobRows.map(mapJobToVideoItem)));
        setPresets(mappedPresets);
        setPresetCategories(Array.from(new Set([...categoriesFromFilters, ...categoriesFromPresets])));
        setCreditBalance(balance.credit_balance);
        setCreditStatement(statement.map(mapCreditStatementToViewModel));
        setCreditVideoGenerations(videoGenerations.map(mapCreditVideoGenerationToViewModel));
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

    void videosModule.realtime
      .subscribeToUserJobs({
        token,
        userId,
        onJobUpdated: (job) => {
          setVideos((current) => replaceVideosSorted(upsertVideoById(current, mapJobToVideoItem(job))));
          void fetchCredits(token).catch(() => {
            // noop
          });
        },
        onError: () => {
          // noop
        },
      })
      .then((stop) => {
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
      const message = resolveApiErrorMessage(error, 'Falha ao atualizar jobs');
      setJobsError(message);
    } finally {
      setLoadingJobs(false);
    }
  }, [fetchJobs, token]);

  const createVideo = useCallback(async (payload: CreateVideoPayload) => {
    if (!token) {
      throw new Error('Você precisa estar logado para gerar vídeos.');
    }

    if (!payload.preset.backendPresetId) {
      throw new Error('Preset inválido para geração.');
    }

    let createdJob;
    try {
      createdJob = await videosModule.gateway.createJob(token, payload.preset.backendPresetId, payload.imageFile, payload.title);
    } catch (error) {
      throw new Error(resolveApiErrorMessage(error, 'Falha ao gerar vídeo.'));
    }

    if (!createdJob) {
      await refreshJobs();
      const fallback: VideoJobItem = {
        id: `temp-${Date.now()}`,
        title: payload.title || payload.preset.name,
        imageSrc: payload.imageSrc,
        videoUrl: '',
        status: 'processing',
        format: payload.preset.aspectRatio ?? '9:16',
        prompt: payload.preset.description,
        createdAt: new Date().toISOString(),
        creditsUsed: 1,
      };
      return fallback;
    }

    const mapped = mapJobToVideoItem(createdJob);
    mapped.title = payload.title || mapped.title;
    mapped.imageSrc = payload.imageSrc || mapped.imageSrc;

    setVideos((current) => replaceVideosSorted(upsertVideoById(current, mapped)));
    await fetchCredits(token).catch(() => {
      // noop
    });

    return mapped;
  }, [fetchCredits, refreshJobs, token]);

  const cancelVideo = useCallback(async (video: VideoJobItem) => {
    if (!token || !video.inputId) {
      return;
    }

    await videosModule.gateway.cancelJob(token, video.inputId);
    setVideos((current) =>
      current.map((item) =>
        item.id === video.id
          ? {
              ...item,
              status: 'canceled',
            }
          : item,
      ),
    );

    await fetchCredits(token).catch(() => {
      // noop
    });
  }, [fetchCredits, token]);

  const renameVideo = useCallback(async (videoId: string, title: string) => {
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
    setVideos((current) =>
      current.map((video) =>
        video.id === videoId
          ? {
              ...video,
              title: normalized,
            }
          : video,
      ),
    );

    if (!target.inputId) {
      return;
    }

    if (!token) {
      setVideos((current) =>
        current.map((video) =>
          video.id === videoId
            ? {
                ...video,
                title: previousTitle,
              }
            : video,
        ),
      );
      throw new Error('Você precisa estar logado para renomear vídeos.');
    }

    try {
      const updated = await videosModule.gateway.renameJob(token, target.inputId, normalized);
      setVideos((current) => replaceVideosSorted(upsertVideoById(current, mapJobToVideoItem(updated))));
    } catch (error) {
      setVideos((current) =>
        current.map((video) =>
          video.id === videoId
            ? {
                ...video,
                title: previousTitle,
              }
            : video,
        ),
      );
      throw error;
    }
  }, [token, videos]);

  const resetPassword = useCallback(async (currentPassword: string, newPassword: string, confirmation: string) => {
    if (!token) {
      throw new Error('Você precisa estar logado para redefinir senha.');
    }

    try {
      const me = await resetFirstLoginPassword(token, {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmation,
      });
      setMustResetPassword(me.must_reset_password);
    } catch (error) {
      throw new Error(resolveApiErrorMessage(error, 'Não foi possível redefinir a senha.'));
    }
  }, [token]);

  const logout = useCallback(() => {
    clearStoredAuthToken();
    setToken(null);
  }, []);

  const contextValue: DashboardContextType = useMemo(() => ({
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
  }), [
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
  ]);

  return <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>;
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};
