import { describe, expect, it, vi } from 'vitest';
import { buildPresetCategories, fetchDashboardGenerationCatalog } from '../services/dashboard-presets-service';

describe('dashboard presets service', () => {
  it('builds deduplicated categories from filters and presets', () => {
    const categories = buildPresetCategories(
      [
        {
          id: '1',
          category: '9:16',
          name: 'Preset A',
          description: '',
          imageSrc: '',
          tags: [{ id: 1, name: 'Anime', slug: 'anime' }],
        },
      ],
      {
        aspect_ratios: ['9:16', '16:9'],
        tags: [{ slug: 'anime' }, { slug: 'realistic' }],
      },
    );

    expect(categories).toEqual(['anime', 'realistic', '9:16', '16:9']);
  });

  it('groups presets and categories by model id', async () => {
    const gateway = {
      listModels: vi.fn().mockResolvedValue([
        {
          id: 1,
          platform_id: 1,
          name: 'Kling',
          slug: 'kling',
          provider_model_key: 'kling-v2',
          version: '2.5',
          active: true,
          public_visible: true,
          available_for_generation: true,
          cost_per_second_usd: '0.1500',
          sort_order: 2,
          created_at: null,
          updated_at: null,
        },
      ]),
      listPresets: vi.fn().mockResolvedValue([
        {
          id: 10,
          default_model_id: 1,
          name: 'Preset',
          prompt: 'Prompt',
          negative_prompt: null,
          duration_seconds: 5,
          preview_image_url: null,
          preview_video_url: null,
          aspect_ratio: '9:16',
          tags: [{ id: 1, name: 'Anime', slug: 'anime' }],
          created_at: null,
          updated_at: null,
        },
      ]),
      listPresetFilters: vi.fn().mockResolvedValue({
        aspect_ratios: ['9:16'],
        tags: [{ id: 1, name: 'Anime', slug: 'anime' }],
      }),
    };

    const snapshot = await fetchDashboardGenerationCatalog(gateway as never, 'token');

    expect(snapshot.models[0].backendModelId).toBe(1);
    expect(snapshot.presetsByModelId['1'][0].backendPresetId).toBe(10);
    expect(snapshot.presetCategoriesByModelId['1']).toEqual(['anime', '9:16']);
  });
});
