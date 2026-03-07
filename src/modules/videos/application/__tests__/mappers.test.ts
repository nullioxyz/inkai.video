import { describe, expect, it } from 'vitest';
import { mapGenerationEstimateToViewModel, mapJobToVideoItem, normalizeVideoStatus } from '../mappers';

describe('video mapper', () => {
  it('normalizes backend status', () => {
    expect(normalizeVideoStatus('done')).toBe('completed');
    expect(normalizeVideoStatus('cancelled')).toBe('canceled');
    expect(normalizeVideoStatus('cancelled_after_retries')).toBe('canceled');
    expect(normalizeVideoStatus('canceled_after_retries')).toBe('canceled');
    expect(normalizeVideoStatus('failed')).toBe('failed');
    expect(normalizeVideoStatus('processing')).toBe('processing');
  });

  it('maps job with output url', () => {
    const mapped = mapJobToVideoItem({
      id: 1,
      model_id: 3,
      model: { id: 3, name: 'Kling', provider_model_key: 'kling-v2' },
      preset_id: 1,
      preset: { id: 1, name: 'Anime Preset' },
      user_id: 1,
      status: 'done',
      title: 'Titulo customizado',
      original_filename: 'video.mp4',
      mime_type: null,
      size_bytes: null,
      duration_seconds: 8,
      estimated_cost_usd: '0.7500',
      credits_charged: 3,
      billing_status: 'charged',
      credit_debited: true,
      start_image_url: 'https://inkai.video/image/token-image/image',
      prediction: {
        id: 2,
        external_id: 'abc',
        status: 'succeeded',
        source: 'web',
        attempt: 1,
        queued_at: null,
        started_at: null,
        finished_at: null,
        failed_at: null,
        canceled_at: null,
        duration_seconds: 8,
        cost_estimate_usd: '0.7500',
        cost_actual_usd: null,
        error_code: null,
        error_message: null,
        outputs: [
          {
            id: 7,
            kind: 'video',
            path: 'https://inkai.video/video/token-path/path.mp4',
            mime_type: null,
            size_bytes: null,
            file_url: 'https://inkai.video/video/token-file/file.mp4',
            created_at: null,
          },
        ],
        created_at: null,
        updated_at: null,
      },
      created_at: '2026-02-25T10:00:00.000Z',
      updated_at: null,
    });

    expect(mapped.imageSrc).toBe('https://inkai.video/image/token-image/image');
    expect(mapped.videoUrl).toBe('https://inkai.video/video/token-file/file.mp4');
    expect(mapped.modelName).toBe('Kling');
    expect(mapped.presetName).toBe('Anime Preset');
    expect(mapped.status).toBe('completed');
    expect(mapped.title).toBe('Titulo customizado');
    expect(mapped.creditsUsed).toBe(3);
    expect(mapped.durationSeconds).toBe(8);
    expect(mapped.estimatedCostUsd).toBe('0.7500');
  });

  it('keeps legacy relative urls unchanged when backend still returns them', () => {
    const mapped = mapJobToVideoItem({
      id: 2,
      model_id: 3,
      model: null,
      preset_id: 1,
      preset: null,
      user_id: 1,
      status: 'done',
      title: 'Legacy URL',
      original_filename: 'video.mp4',
      mime_type: null,
      size_bytes: null,
      duration_seconds: null,
      estimated_cost_usd: null,
      credits_charged: 1,
      billing_status: 'charged',
      credit_debited: true,
      start_image_url: '/storage/start.png',
      prediction: {
        id: 2,
        external_id: 'abc',
        status: 'succeeded',
        source: 'web',
        attempt: 1,
        queued_at: null,
        started_at: null,
        finished_at: null,
        failed_at: null,
        canceled_at: null,
        duration_seconds: null,
        cost_estimate_usd: null,
        cost_actual_usd: null,
        error_code: null,
        error_message: null,
        outputs: [
          {
            id: 8,
            kind: 'video',
            path: '/storage/internal-only.mp4',
            mime_type: null,
            size_bytes: null,
            file_url: '/storage/file.mp4',
            playback_url: '/storage/playback.mp4',
            created_at: null,
          },
        ],
        created_at: null,
        updated_at: null,
      },
      created_at: '2026-02-25T10:00:00.000Z',
      updated_at: null,
    });

    expect(mapped.imageSrc).toBe('/storage/start.png');
    expect(mapped.videoUrl).toBe('/storage/playback.mp4');
    expect(mapped.presetName).toBeNull();
  });

  it('falls back to output path when playback/file urls are missing', () => {
    const mapped = mapJobToVideoItem({
      id: 3,
      model_id: 4,
      model: { id: 4, name: 'Luma', provider_model_key: 'luma' },
      preset_id: 1,
      user_id: 1,
      status: 'done',
      title: 'Path fallback',
      original_filename: 'video.mp4',
      mime_type: null,
      size_bytes: null,
      duration_seconds: null,
      estimated_cost_usd: null,
      credits_charged: 1,
      billing_status: 'charged',
      credit_debited: true,
      start_image_url: null,
      prediction: {
        id: 3,
        external_id: 'abc',
        status: 'succeeded',
        source: 'web',
        attempt: 1,
        queued_at: null,
        started_at: null,
        finished_at: null,
        failed_at: null,
        canceled_at: null,
        duration_seconds: null,
        cost_estimate_usd: null,
        cost_actual_usd: null,
        error_code: null,
        error_message: null,
        outputs: [
          {
            id: 9,
            kind: 'video',
            path: '/storage/fallback-path.mp4',
            mime_type: null,
            size_bytes: null,
            file_url: null,
            playback_url: null,
            created_at: null,
          },
        ],
        created_at: null,
        updated_at: null,
      },
      created_at: '2026-02-25T10:00:00.000Z',
      updated_at: null,
    });

    expect(mapped.videoUrl).toBe('/storage/fallback-path.mp4');
  });

  it('maps generation estimate into view model', () => {
    const estimate = mapGenerationEstimateToViewModel({
      model_id: 1,
      preset_id: 12,
      duration_seconds: 5,
      credits_required: 3,
      model_cost_per_second_usd: '0.1500',
      estimated_generation_cost_usd: '0.7500',
      credit_unit_value_usd: '0.3500',
    });

    expect(estimate.modelId).toBe(1);
    expect(estimate.presetId).toBe(12);
    expect(estimate.durationSeconds).toBe(5);
    expect(estimate.creditsRequired).toBe(3);
    expect(estimate.estimatedGenerationCostUsd).toBe('0.7500');
  });
});
