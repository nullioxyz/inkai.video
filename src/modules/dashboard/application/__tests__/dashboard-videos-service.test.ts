import { describe, expect, it, vi } from 'vitest';
import { createDashboardVideo, estimateDashboardVideo, makeFallbackCreatedVideo, markCanceledVideo, upsertSortedVideo } from '../services/dashboard-videos-service';

describe('dashboard videos service', () => {
  it('marks selected video as canceled', () => {
    const result = markCanceledVideo(
      [
        {
          id: '1',
          title: 'first',
          imageSrc: '',
          videoUrl: '',
          status: 'processing',
          format: '9:16',
          prompt: '',
          createdAt: '2026-01-01T00:00:00.000Z',
        },
      ],
      '1',
    );

    expect(result[0].status).toBe('canceled');
  });

  it('creates fallback item with estimated credits and model metadata', () => {
    const fallback = makeFallbackCreatedVideo({
      title: 'Tattoo',
      imageFile: {} as File,
      imageSrc: '/img.png',
      model: {
        id: '9',
        backendModelId: 9,
        name: 'Kling',
        slug: 'kling',
        availableForGeneration: true,
        publicVisible: true,
        sortOrder: 1,
      },
      preset: {
        id: '1',
        category: '9:16',
        name: 'Preset',
        description: 'desc',
        imageSrc: '/preset.png',
        backendPresetId: 10,
      },
      durationSeconds: 8,
      estimatedCreditsRequired: 3,
      estimatedGenerationCostUsd: '0.7500',
    });

    expect(fallback.title).toBe('Tattoo');
    expect(fallback.status).toBe('processing');
    expect(fallback.modelName).toBe('Kling');
    expect(fallback.creditsUsed).toBe(3);
    expect(fallback.estimatedCostUsd).toBe('0.7500');
  });

  it('estimates generation through gateway and maps response', async () => {
    const gateway = {
      estimateJob: vi.fn().mockResolvedValue({
        model_id: 9,
        preset_id: 8,
        duration_seconds: 8,
        credits_required: 3,
        model_cost_per_second_usd: '0.1500',
        estimated_generation_cost_usd: '0.7500',
        credit_unit_value_usd: '0.3500',
      }),
    };

    const estimate = await estimateDashboardVideo({
      gateway: gateway as never,
      token: 'token',
      payload: {
        model: {
          id: '9',
          backendModelId: 9,
          name: 'Kling',
          slug: 'kling',
          availableForGeneration: true,
          publicVisible: true,
          sortOrder: 1,
        },
        preset: {
          id: '8',
          category: '9:16',
          name: 'Preset',
          description: 'desc',
          imageSrc: '/preset.png',
          backendPresetId: 8,
        },
        durationSeconds: 8,
      },
    });

    expect(estimate.creditsRequired).toBe(3);
    expect(gateway.estimateJob).toHaveBeenCalledWith('token', {
      modelId: 9,
      presetId: 8,
      durationSeconds: 8,
    });
  });

  it('returns null when gateway create flow cannot resolve detail', async () => {
    const gateway = {
      createJob: vi.fn().mockResolvedValue(null),
    };

    const result = await createDashboardVideo({
      gateway: gateway as never,
      token: 'token',
      payload: {
        title: 'x',
        imageFile: {} as File,
        imageSrc: '/x.png',
        model: {
          id: '9',
          backendModelId: 9,
          name: 'Kling',
          slug: 'kling',
          availableForGeneration: true,
          publicVisible: true,
          sortOrder: 1,
        },
        preset: {
          id: '1',
          category: '9:16',
          name: 'Preset',
          description: 'desc',
          imageSrc: '/preset.png',
          backendPresetId: 8,
        },
      },
    });

    expect(result).toBeNull();
  });

  it('upserts and keeps videos sorted by createdAt desc', () => {
    const result = upsertSortedVideo(
      [
        {
          id: '1',
          title: 'first',
          imageSrc: '',
          videoUrl: '',
          status: 'processing',
          format: '9:16',
          prompt: '',
          createdAt: '2026-01-01T00:00:00.000Z',
        },
      ],
      {
        id: '2',
        title: 'second',
        imageSrc: '',
        videoUrl: '',
        status: 'processing',
        format: '9:16',
        prompt: '',
        createdAt: '2026-01-02T00:00:00.000Z',
      },
    );

    expect(result[0].id).toBe('2');
  });
});
