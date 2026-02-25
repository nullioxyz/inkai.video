import { describe, expect, it, vi } from 'vitest';
import * as api from '@/lib/api/dashboard';
import { createHttpPresetsGateway } from '../http-presets-gateway';

vi.mock('@/lib/api/dashboard', () => ({
  listModels: vi.fn(),
  listPresetsByModel: vi.fn(),
  listPresetFiltersByModel: vi.fn(),
}));

describe('http presets gateway', () => {
  it('loads and flattens presets from all models', async () => {
    vi.mocked(api.listModels).mockResolvedValue([
      { id: 1, platform_id: 1, name: 'm1', slug: 'm1', version: null, active: true, created_at: null, updated_at: null },
      { id: 2, platform_id: 1, name: 'm2', slug: 'm2', version: null, active: true, created_at: null, updated_at: null },
    ]);

    vi.mocked(api.listPresetsByModel)
      .mockResolvedValueOnce([
        {
          id: 10,
          default_model_id: 1,
          name: 'p1',
          prompt: 'a',
          negative_prompt: null,
          duration_seconds: 5,
          preview_image_url: null,
          preview_video_url: null,
          aspect_ratio: '9:16',
          tags: [],
          created_at: null,
          updated_at: null,
        },
      ])
      .mockResolvedValueOnce([
        {
          id: 11,
          default_model_id: 2,
          name: 'p2',
          prompt: 'b',
          negative_prompt: null,
          duration_seconds: 5,
          preview_image_url: null,
          preview_video_url: null,
          aspect_ratio: '9:16',
          tags: [],
          created_at: null,
          updated_at: null,
        },
      ]);

    const gateway = createHttpPresetsGateway();
    const rows = await gateway.listPresets('token');

    expect(rows).toHaveLength(2);
  });

  it('forwards presets filters to backend requests', async () => {
    vi.mocked(api.listModels).mockResolvedValue([
      { id: 1, platform_id: 1, name: 'm1', slug: 'm1', version: null, active: true, created_at: null, updated_at: null },
    ]);

    vi.mocked(api.listPresetsByModel).mockResolvedValue([
      {
        id: 10,
        default_model_id: 1,
        name: 'p1',
        prompt: 'a',
        negative_prompt: null,
        duration_seconds: 5,
        preview_image_url: null,
        preview_video_url: null,
        aspect_ratio: '9:16',
        tags: [],
        created_at: null,
        updated_at: null,
      },
    ]);

    const gateway = createHttpPresetsGateway();
    await gateway.listPresets('token', { aspectRatio: '9:16', tag: 'anime' });

    expect(vi.mocked(api.listPresetsByModel)).toHaveBeenCalledWith('token', 1, { aspectRatio: '9:16', tag: 'anime' });
  });

  it('loads filters from all models', async () => {
    vi.mocked(api.listModels).mockResolvedValue([
      { id: 1, platform_id: 1, name: 'm1', slug: 'm1', version: null, active: true, created_at: null, updated_at: null },
      { id: 2, platform_id: 1, name: 'm2', slug: 'm2', version: null, active: true, created_at: null, updated_at: null },
    ]);

    vi.mocked(api.listPresetFiltersByModel)
      .mockResolvedValueOnce({
        aspect_ratios: ['9:16'],
        tags: [{ id: 1, name: 'Anime', slug: 'anime' }],
      })
      .mockResolvedValueOnce({
        aspect_ratios: ['16:9'],
        tags: [{ id: 2, name: 'Realistic', slug: 'realistic' }],
      });

    const gateway = createHttpPresetsGateway();
    const rows = await gateway.listPresetFilters('token');

    expect(rows).toHaveLength(2);
    expect(rows[0].modelId).toBe(1);
    expect(rows[0].filters.tags[0].slug).toBe('anime');
    expect(vi.mocked(api.listPresetFiltersByModel)).toHaveBeenCalledTimes(2);
  });
});
