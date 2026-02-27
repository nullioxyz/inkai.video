import { BackendJobResponse } from '@/lib/api/dashboard';
import { VideoJobItem } from '@/types/dashboard';
import { resolveMediaUrl } from '@/utils/resolveMediaUrl';

export const normalizeVideoStatus = (status: string): VideoJobItem['status'] => {
  const normalized = status.trim().toLowerCase();

  if (normalized === 'done' || normalized === 'succeeded') {
    return 'completed';
  }
  if (normalized === 'failed') {
    return 'failed';
  }
  if (
    normalized === 'cancelled' ||
    normalized === 'canceled' ||
    normalized === 'cancelled_after_retries' ||
    normalized === 'canceled_after_retries'
  ) {
    return 'canceled';
  }
  return 'processing';
};

const resolveOutputUrl = (job: BackendJobResponse) => {
  const outputs = job.prediction?.outputs ?? [];
  const videoOutput = outputs.find((output) => output.kind === 'video');

  return (
    resolveMediaUrl(videoOutput?.playback_url) ??
    resolveMediaUrl(videoOutput?.file_url) ??
    resolveMediaUrl(videoOutput?.path) ??
    ''
  );
};

export const mapJobToVideoItem = (job: BackendJobResponse): VideoJobItem => {
  return {
    id: String(job.id),
    inputId: job.id,
    title: job.title || job.original_filename || `Job #${job.id}`,
    imageSrc: resolveMediaUrl(job.start_image_url) ?? '/images/ns-img-417.jpg',
    videoUrl: resolveOutputUrl(job),
    presetName: job.preset?.name ?? null,
    status: normalizeVideoStatus(job.status),
    format: '9:16',
    prompt: '',
    createdAt: job.created_at ?? new Date().toISOString(),
    creditsUsed: job.credit_debited ? 1 : 0,
  };
};
