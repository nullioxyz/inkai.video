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
      preview_image_url: 'https://inkai.video/image/preset-token/image',
      preview_video_url: 'https://inkai.video/video/preset-token/preview.mp4',
      aspect_ratio: '9:16',
      tags: [{ id: 1, name: 'Anime', slug: 'anime' }],
      created_at: null,
      updated_at: null,
    });

    expect(preset.id).toBe('10');
    expect(preset.backendPresetId).toBe(10);
    expect(preset.category).toBe('anime');
    expect(preset.imageSrc).toBe('https://inkai.video/image/preset-token/image');
    expect(preset.previewVideoUrl).toBe('https://inkai.video/video/preset-token/preview.mp4');
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

  it('keeps legacy relative media urls unchanged', () => {
    const preset = mapPresetToViewModel({
      id: 12,
      default_model_id: 2,
      name: 'Preset relativo',
      prompt: 'Prompt',
      negative_prompt: null,
      duration_seconds: 5,
      preview_image_url: '/storage/preset.jpg',
      preview_video_url: '/storage/preset.mp4',
      aspect_ratio: '1:1',
      tags: [{ id: 1, name: 'General', slug: 'general' }],
      created_at: null,
      updated_at: null,
    });

    expect(preset.imageSrc).toBe('/storage/preset.jpg');
    expect(preset.previewVideoUrl).toBe('/storage/preset.mp4');
  });
});
