import { describe, expect, it } from 'vitest';
import { resolveMediaUrl } from '../resolveMediaUrl';

describe('resolveMediaUrl', () => {
  it('returns image url in new frontend format unchanged', () => {
    expect(resolveMediaUrl('https://inkai.video/image/abc123/image')).toBe('https://inkai.video/image/abc123/image');
  });

  it('returns video url in new frontend format unchanged', () => {
    expect(resolveMediaUrl('https://inkai.video/video/abc123/output.mp4')).toBe('https://inkai.video/video/abc123/output.mp4');
  });

  it('returns absolute cdn urls unchanged', () => {
    expect(resolveMediaUrl('https://cdn.example.com/assets/video.mp4')).toBe('https://cdn.example.com/assets/video.mp4');
  });

  it('returns null for empty or missing values', () => {
    expect(resolveMediaUrl(null)).toBeNull();
    expect(resolveMediaUrl(undefined)).toBeNull();
    expect(resolveMediaUrl('   ')).toBeNull();
  });

  it('supports optional legacy relative fallback', () => {
    expect(resolveMediaUrl('/storage/jobs/file.mp4', { enableLegacyRelativeFallback: true, legacyBaseUrl: 'https://app.inkai.ai' })).toBe(
      'https://app.inkai.ai/storage/jobs/file.mp4',
    );
  });

  it('returns legacy relative path as-is when fallback is disabled', () => {
    expect(resolveMediaUrl('/storage/jobs/file.mp4')).toBe('/storage/jobs/file.mp4');
  });
});
