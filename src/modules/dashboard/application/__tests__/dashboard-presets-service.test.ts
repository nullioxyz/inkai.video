import { describe, expect, it } from 'vitest';
import { buildPresetCategories } from '../services/dashboard-presets-service';

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
      [
        {
          modelId: 1,
          filters: {
            aspect_ratios: ['9:16', '16:9'],
            tags: [{ slug: 'anime' }, { slug: 'realistic' }],
          },
        },
      ],
    );

    expect(categories).toEqual(['anime', 'realistic', '9:16', '16:9']);
  });
});
