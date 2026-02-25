import { BackendJobResponse } from '@/lib/api/dashboard';
import { VideoJobItem } from '@/types/dashboard';

export const normalizeVideoStatus = (status: string): VideoJobItem['status'] => {
  if (status === 'done' || status === 'succeeded') {
    return 'completed';
  }
  if (status === 'failed') {
    return 'failed';
  }
  if (status === 'cancelled' || status === 'canceled') {
    return 'canceled';
  }
  return 'processing';
};

const resolveOutputUrl = (job: BackendJobResponse) => {
  const outputs = job.prediction?.outputs ?? [];
  const videoOutput = outputs.find((output) => output.kind === 'video');

  return videoOutput?.playback_url ?? videoOutput?.file_url ?? videoOutput?.path ?? '';
};

export const mapJobToVideoItem = (job: BackendJobResponse): VideoJobItem => {
  return {
    id: String(job.id),
    inputId: job.id,
    title: job.title || job.original_filename || `Job #${job.id}`,
    imageSrc: job.start_image_url || '/images/ns-img-417.jpg',
    videoUrl: resolveOutputUrl(job),
    status: normalizeVideoStatus(job.status),
    format: '9:16',
    prompt: '',
    createdAt: job.created_at ?? new Date().toISOString(),
    creditsUsed: job.credit_debited ? 1 : 0,
  };
};
