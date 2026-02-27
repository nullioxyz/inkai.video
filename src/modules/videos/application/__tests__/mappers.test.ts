import { describe, expect, it } from 'vitest';
import { mapJobToVideoItem, normalizeVideoStatus } from '../mappers';

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
      preset_id: 1,
      preset: { id: 1, name: 'Anime Preset' },
      user_id: 1,
      status: 'done',
      title: 'Titulo customizado',
      original_filename: 'video.mp4',
      mime_type: null,
      size_bytes: null,
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
    expect(mapped.presetName).toBe('Anime Preset');
    expect(mapped.status).toBe('completed');
    expect(mapped.title).toBe('Titulo customizado');
  });

  it('keeps legacy relative urls unchanged when backend still returns them', () => {
    const mapped = mapJobToVideoItem({
      id: 2,
      preset_id: 1,
      preset: null,
      user_id: 1,
      status: 'done',
      title: 'Legacy URL',
      original_filename: 'video.mp4',
      mime_type: null,
      size_bytes: null,
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
      preset_id: 1,
      user_id: 1,
      status: 'done',
      title: 'Path fallback',
      original_filename: 'video.mp4',
      mime_type: null,
      size_bytes: null,
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
});
