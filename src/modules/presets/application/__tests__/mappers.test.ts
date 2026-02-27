import { afterEach, describe, expect, it } from 'vitest';
import { mapPresetToViewModel } from '../mappers';

describe('preset mapper', () => {
  const originalFrontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

  afterEach(() => {
    if (originalFrontendUrl === undefined) {
      delete process.env.NEXT_PUBLIC_FRONTEND_URL;
      return;
    }
    process.env.NEXT_PUBLIC_FRONTEND_URL = originalFrontendUrl;
  });

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

  it('resolves legacy relative media urls', () => {
    process.env.NEXT_PUBLIC_FRONTEND_URL = 'https://app.inkai.ai';

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

    expect(preset.imageSrc).toBe('https://app.inkai.ai/storage/preset.jpg');
    expect(preset.previewVideoUrl).toBe('https://app.inkai.ai/storage/preset.mp4');
  });
});
