import { describe, expect, it } from 'vitest';
import { mapPresetToViewModel } from '../mappers';

describe('preset mapper', () => {
  it('maps backend preset into view model', () => {
    const preset = mapPresetToViewModel({
      id: 10,
      default_model_id: 2,
      name: 'Preset',
      prompt: 'Prompt',
      negative_prompt: null,
      duration_seconds: 5,
      preview_image_url: 'https://cdn.example/preset.jpg',
      preview_video_url: null,
      aspect_ratio: '9:16',
      tags: [{ id: 1, name: 'Anime', slug: 'anime' }],
      created_at: null,
      updated_at: null,
    });

    expect(preset.id).toBe('10');
    expect(preset.backendPresetId).toBe(10);
    expect(preset.category).toBe('anime');
    expect(preset.imageSrc).toBe('https://cdn.example/preset.jpg');
    expect(preset.tags[0].slug).toBe('anime');
  });

  it('falls back to aspect ratio and default image when tags/image are missing', () => {
    const preset = mapPresetToViewModel({
      id: 11,
      default_model_id: 2,
      name: 'Preset sem media',
      prompt: 'Prompt',
      negative_prompt: null,
      duration_seconds: 5,
      preview_image_url: null,
      preview_video_url: null,
      aspect_ratio: '9:16',
      tags: [],
      created_at: null,
      updated_at: null,
    });

    expect(preset.category).toBe('9:16');
    expect(preset.imageSrc).toBe('/images/ns-img-323.png');
    expect(preset.tags).toEqual([]);
  });
});
