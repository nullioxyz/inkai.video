import { BackendGenerationEstimateResponse, BackendJobResponse } from '@/lib/api/dashboard';
import { GenerationEstimate, VideoJobItem } from '@/types/dashboard';
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

export const mapGenerationEstimateToViewModel = (estimate: BackendGenerationEstimateResponse): GenerationEstimate => {
  return {
    modelId: estimate.model_id,
    presetId: estimate.preset_id,
    durationSeconds: estimate.duration_seconds,
    creditsRequired: estimate.credits_required,
    modelCostPerSecondUsd: estimate.model_cost_per_second_usd,
    estimatedGenerationCostUsd: estimate.estimated_generation_cost_usd,
    creditUnitValueUsd: estimate.credit_unit_value_usd,
  };
};

export const mapJobToVideoItem = (job: BackendJobResponse): VideoJobItem => {
  return {
    id: String(job.id),
    inputId: job.id,
    title: job.title || job.original_filename || `Job #${job.id}`,
    imageSrc: resolveMediaUrl(job.start_image_url) ?? '/images/ns-img-417.jpg',
    videoUrl: resolveOutputUrl(job),
    modelName: job.model?.name ?? null,
    presetName: job.preset?.name ?? null,
    status: normalizeVideoStatus(job.status),
    format: '9:16',
    prompt: '',
    createdAt: job.created_at ?? new Date().toISOString(),
    durationSeconds: job.duration_seconds ?? job.prediction?.duration_seconds ?? null,
    estimatedCostUsd: job.estimated_cost_usd ?? job.prediction?.cost_estimate_usd ?? null,
    billingStatus: job.billing_status ?? null,
    creditsUsed: job.credits_charged ?? (job.credit_debited ? 1 : 0),
  };
};
