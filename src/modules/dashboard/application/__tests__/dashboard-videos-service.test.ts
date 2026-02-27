import { describe, expect, it, vi } from 'vitest';
import { createDashboardVideo, makeFallbackCreatedVideo, markCanceledVideo, upsertSortedVideo } from '../services/dashboard-videos-service';

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

  it('creates fallback item when API cannot return created job detail', () => {
    const fallback = makeFallbackCreatedVideo({
      title: 'Tattoo',
      imageFile: {} as File,
      imageSrc: '/img.png',
      preset: {
        id: '1',
        category: '9:16',
        name: 'Preset',
        description: 'desc',
        imageSrc: '/preset.png',
        backendPresetId: 10,
      },
    });

    expect(fallback.title).toBe('Tattoo');
    expect(fallback.status).toBe('processing');
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
