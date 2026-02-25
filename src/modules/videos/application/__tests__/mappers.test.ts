import { describe, expect, it } from 'vitest';
import { mapJobToVideoItem, normalizeVideoStatus } from '../mappers';

describe('video mapper', () => {
  it('normalizes backend status', () => {
    expect(normalizeVideoStatus('done')).toBe('completed');
    expect(normalizeVideoStatus('cancelled')).toBe('canceled');
    expect(normalizeVideoStatus('failed')).toBe('failed');
    expect(normalizeVideoStatus('processing')).toBe('processing');
  });

  it('maps job with output url', () => {
    const mapped = mapJobToVideoItem({
      id: 1,
      preset_id: 1,
      user_id: 1,
      status: 'done',
      title: 'Titulo customizado',
      original_filename: 'video.mp4',
      mime_type: null,
      size_bytes: null,
      credit_debited: true,
      start_image_url: 'https://example.com/image.png',
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
            path: 'https://example.com/path.mp4',
            mime_type: null,
            size_bytes: null,
            file_url: 'https://example.com/file.mp4',
            created_at: null,
          },
        ],
        created_at: null,
        updated_at: null,
      },
      created_at: '2026-02-25T10:00:00.000Z',
      updated_at: null,
    });

    expect(mapped.videoUrl).toBe('https://example.com/file.mp4');
    expect(mapped.status).toBe('completed');
    expect(mapped.title).toBe('Titulo customizado');
  });
});
