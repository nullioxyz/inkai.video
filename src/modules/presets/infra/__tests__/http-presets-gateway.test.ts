import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as api from '@/lib/api/dashboard';
import { createHttpPresetsGateway } from '../http-presets-gateway';

vi.mock('@/lib/api/dashboard', () => ({
  listModels: vi.fn(),
  listPresetsByModel: vi.fn(),
  listPresetFiltersByModel: vi.fn(),
}));

describe('http presets gateway', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads models from backend', async () => {
    vi.mocked(api.listModels).mockResolvedValue([
      {
        id: 1,
        platform_id: 1,
        name: 'Kling',
        slug: 'kling',
        version: '2.5',
        active: true,
        created_at: null,
        updated_at: null,
      },
    ]);

    const gateway = createHttpPresetsGateway();
    const rows = await gateway.listModels('token');

    expect(rows).toHaveLength(1);
    expect(vi.mocked(api.listModels)).toHaveBeenCalledWith('token');
  });

  it('forwards model-specific presets filters to backend requests', async () => {
    vi.mocked(api.listPresetsByModel).mockResolvedValue([
      {
        id: 10,
        default_model_id: 1,
        name: 'Preset',
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
    const rows = await gateway.listPresets('token', 1, { aspectRatio: '9:16', tag: 'anime' });

    expect(rows).toHaveLength(1);
    expect(vi.mocked(api.listPresetsByModel)).toHaveBeenCalledWith('token', 1, { aspectRatio: '9:16', tag: 'anime' });
  });

  it('loads model-specific preset filters', async () => {
    vi.mocked(api.listPresetFiltersByModel).mockResolvedValue({
      aspect_ratios: ['9:16'],
      tags: [{ id: 1, name: 'Anime', slug: 'anime' }],
    });

    const gateway = createHttpPresetsGateway();
    const filters = await gateway.listPresetFilters('token', 1);

    expect(filters.tags[0].slug).toBe('anime');
    expect(vi.mocked(api.listPresetFiltersByModel)).toHaveBeenCalledWith('token', 1);
  });
});
