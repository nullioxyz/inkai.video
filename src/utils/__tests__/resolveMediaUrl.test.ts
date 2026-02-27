import { describe, expect, it } from 'vitest';
import { resolveMediaUrl } from '../resolveMediaUrl';

describe('resolveMediaUrl', () => {
  it('returns absolute frontend urls unchanged', () => {
    expect(resolveMediaUrl('https://app.inkai.ai/storage/video.mp4')).toBe('https://app.inkai.ai/storage/video.mp4');
  });

  it('returns absolute cdn urls unchanged', () => {
    expect(resolveMediaUrl('https://cdn.example.com/assets/video.mp4')).toBe('https://cdn.example.com/assets/video.mp4');
  });

  it('returns null for empty or missing values', () => {
    expect(resolveMediaUrl(null)).toBeNull();
    expect(resolveMediaUrl(undefined)).toBeNull();
    expect(resolveMediaUrl('   ')).toBeNull();
  });

  it('supports legacy relative paths when enabled', () => {
    expect(resolveMediaUrl('/storage/jobs/file.mp4', { allowRelative: true, legacyBaseUrl: 'https://app.inkai.ai' })).toBe(
      'https://app.inkai.ai/storage/jobs/file.mp4',
    );
  });

  it('keeps relative path when legacy mode is enabled without base url', () => {
    expect(resolveMediaUrl('storage/jobs/file.mp4', { allowRelative: true })).toBe('/storage/jobs/file.mp4');
  });

  it('normalizes host values without protocol', () => {
    expect(resolveMediaUrl('127.0.0.1:8000/storage/jobs/file.mp4')).toBe('https://127.0.0.1:8000/storage/jobs/file.mp4');
  });

  it('normalizes localhost storage urls to relative path for local proxying', () => {
    expect(resolveMediaUrl('http://127.0.0.1:8000/storage/jobs/file.mp4?x=1')).toBe('/storage/jobs/file.mp4?x=1');
  });

  it('rejects relative paths when legacy mode is disabled', () => {
    expect(resolveMediaUrl('/storage/jobs/file.mp4', { allowRelative: false, legacyBaseUrl: 'https://app.inkai.ai' })).toBeNull();
  });
});
