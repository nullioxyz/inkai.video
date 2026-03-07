import { ApiError, resolveApiErrorMessage } from '@/lib/api/client';
import { mapGenerationEstimateToViewModel, mapJobToVideoItem } from '@/modules/videos/application/mappers';
import { replaceVideosSorted, upsertVideoById } from '@/modules/videos/application/state';
import { DailyGenerationQuota, RealtimeUnsubscribe, VideosGateway, VideosRealtimeGateway } from '@/modules/videos/domain/contracts';
import { CreateVideoPayload, EstimateVideoPayload } from '@/modules/dashboard/domain/contracts';
import { GenerationEstimate, VideoJobItem } from '@/types/dashboard';

export const fetchDashboardVideos = async (gateway: VideosGateway, token: string, page = 1, perPage = 100): Promise<VideoJobItem[]> => {
  const rows = await gateway.listJobs(token, page, perPage);
  return replaceVideosSorted(rows.map(mapJobToVideoItem));
};

export const subscribeDashboardVideos = async ({
  realtime,
  token,
  userId,
  onJobUpdated,
  onGenerationLimitAlert,
  onSessionLoggedOut,
  onError,
}: {
  realtime: VideosRealtimeGateway;
  token: string;
  userId: number;
  onJobUpdated: (video: VideoJobItem) => void;
  onGenerationLimitAlert?: (quota: DailyGenerationQuota) => void;
  onSessionLoggedOut?: (payload: { reason?: string; logged_out_at?: string; type?: string }) => void;
  onError?: (error: unknown) => void;
}): Promise<RealtimeUnsubscribe> => {
  return realtime.subscribeToUserJobs({
    token,
    userId,
    onJobUpdated: (job) => {
      onJobUpdated(mapJobToVideoItem(job));
    },
    onGenerationLimitAlert,
    onSessionLoggedOut,
    onError,
  });
};

export const createDashboardVideo = async ({
  gateway,
  token,
  payload,
}: {
  gateway: VideosGateway;
  token: string;
  payload: CreateVideoPayload;
}): Promise<VideoJobItem | null> => {
  if (!payload.model.backendModelId) {
    throw new Error('Modelo inválido para geração.');
  }

  if (!payload.preset.backendPresetId) {
    throw new Error('Preset inválido para geração.');
  }

  try {
    const createdJob = await gateway.createJob(token, {
      modelId: payload.model.backendModelId,
      presetId: payload.preset.backendPresetId,
      durationSeconds: payload.durationSeconds ?? payload.preset.durationSeconds ?? null,
      image: payload.imageFile,
      title: payload.title,
    });
    if (!createdJob) {
      return null;
    }

    const mapped = mapJobToVideoItem(createdJob);
    mapped.title = payload.title || mapped.title;
    mapped.imageSrc = payload.imageSrc || mapped.imageSrc;
    mapped.modelName = mapped.modelName || payload.model.name;
    mapped.presetName = mapped.presetName || payload.preset.name;
    return mapped;
  } catch (error) {
    if (error instanceof ApiError && (error.status === 401 || error.status === 403 || error.status === 419)) {
      throw error;
    }

    throw new Error(resolveApiErrorMessage(error, 'Falha ao gerar vídeo.'));
  }
};

export const estimateDashboardVideo = async ({
  gateway,
  token,
  payload,
}: {
  gateway: VideosGateway;
  token: string;
  payload: EstimateVideoPayload;
}): Promise<GenerationEstimate> => {
  if (!payload.model.backendModelId) {
    throw new Error('Modelo inválido para estimativa.');
  }

  if (!payload.preset.backendPresetId) {
    throw new Error('Preset inválido para estimativa.');
  }

  try {
    const estimate = await gateway.estimateJob(token, {
      modelId: payload.model.backendModelId,
      presetId: payload.preset.backendPresetId,
      durationSeconds: payload.durationSeconds ?? payload.preset.durationSeconds ?? null,
    });

    return mapGenerationEstimateToViewModel(estimate);
  } catch (error) {
    if (error instanceof ApiError && (error.status === 401 || error.status === 403 || error.status === 419)) {
      throw error;
    }

    throw new Error(resolveApiErrorMessage(error, 'Falha ao calcular custo da geração.'));
  }
};

export const makeFallbackCreatedVideo = (payload: CreateVideoPayload): VideoJobItem => {
  return {
    id: `temp-${Date.now()}`,
    title: payload.title || payload.preset.name,
    imageSrc: payload.imageSrc,
    videoUrl: '',
    modelName: payload.model.name,
    presetName: payload.preset.name,
    status: 'processing',
    format: payload.preset.aspectRatio ?? '9:16',
    prompt: payload.preset.description,
    createdAt: new Date().toISOString(),
    durationSeconds: payload.durationSeconds ?? payload.preset.durationSeconds ?? null,
    estimatedCostUsd: payload.estimatedGenerationCostUsd ?? null,
    creditsUsed: payload.estimatedCreditsRequired ?? 0,
  };
};

export const renameDashboardVideo = async ({
  gateway,
  token,
  inputId,
  title,
}: {
  gateway: VideosGateway;
  token: string;
  inputId: number;
  title: string;
}): Promise<VideoJobItem> => {
  const updated = await gateway.renameJob(token, inputId, title);
  return mapJobToVideoItem(updated);
};

export const markCanceledVideo = (videos: VideoJobItem[], videoId: string): VideoJobItem[] => {
  return videos.map((item) => (item.id === videoId ? { ...item, status: 'canceled' } : item));
};

export const upsertSortedVideo = (videos: VideoJobItem[], video: VideoJobItem): VideoJobItem[] => {
  return replaceVideosSorted(upsertVideoById(videos, video));
};
