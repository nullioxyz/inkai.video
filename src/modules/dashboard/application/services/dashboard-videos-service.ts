import { resolveApiErrorMessage } from '@/lib/api/client';
import { mapJobToVideoItem } from '@/modules/videos/application/mappers';
import { replaceVideosSorted, upsertVideoById } from '@/modules/videos/application/state';
import { RealtimeUnsubscribe, VideosGateway, VideosRealtimeGateway } from '@/modules/videos/domain/contracts';
import { CreateVideoPayload } from '@/modules/dashboard/domain/contracts';
import { VideoJobItem } from '@/types/dashboard';

export const fetchDashboardVideos = async (gateway: VideosGateway, token: string, page = 1, perPage = 100): Promise<VideoJobItem[]> => {
  const rows = await gateway.listJobs(token, page, perPage);
  return replaceVideosSorted(rows.map(mapJobToVideoItem));
};

export const subscribeDashboardVideos = async ({
  realtime,
  token,
  userId,
  onJobUpdated,
  onError,
}: {
  realtime: VideosRealtimeGateway;
  token: string;
  userId: number;
  onJobUpdated: (video: VideoJobItem) => void;
  onError?: (error: unknown) => void;
}): Promise<RealtimeUnsubscribe> => {
  return realtime.subscribeToUserJobs({
    token,
    userId,
    onJobUpdated: (job) => {
      onJobUpdated(mapJobToVideoItem(job));
    },
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
  if (!payload.preset.backendPresetId) {
    throw new Error('Preset inválido para geração.');
  }

  try {
    const createdJob = await gateway.createJob(token, payload.preset.backendPresetId, payload.imageFile, payload.title);
    if (!createdJob) {
      return null;
    }

    const mapped = mapJobToVideoItem(createdJob);
    mapped.title = payload.title || mapped.title;
    mapped.imageSrc = payload.imageSrc || mapped.imageSrc;
    return mapped;
  } catch (error) {
    throw new Error(resolveApiErrorMessage(error, 'Falha ao gerar vídeo.'));
  }
};

export const makeFallbackCreatedVideo = (payload: CreateVideoPayload): VideoJobItem => {
  return {
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
