import { describe, expect, it } from 'vitest';
import { parseAspectRatio, resolveVideoDisplayRatio, resolveVideoFrameWidthClass, toAspectRatioLabel } from '../player-layout';

describe('player layout', () => {
  it('parses common aspect ratio formats', () => {
    expect(parseAspectRatio('9:16')).toBeCloseTo(9 / 16, 4);
    expect(parseAspectRatio('3/4')).toBeCloseTo(3 / 4, 4);
    expect(parseAspectRatio('MP4 - 16:9')).toBeCloseTo(16 / 9, 4);
    expect(parseAspectRatio('1.777')).toBeCloseTo(1.777, 4);
  });

  it('returns null for invalid aspect ratio values', () => {
    expect(parseAspectRatio('')).toBeNull();
    expect(parseAspectRatio('abc')).toBeNull();
    expect(parseAspectRatio('0:4')).toBeNull();
    expect(parseAspectRatio('-1')).toBeNull();
  });

  it('prefers real video dimensions when available', () => {
    const ratio = resolveVideoDisplayRatio({
      fallbackFormat: '9:16',
      videoWidth: 1920,
      videoHeight: 1080,
    });

    expect(ratio).toBeCloseTo(16 / 9, 4);
  });

  it('falls back to format and then defaults to 16:9', () => {
    expect(resolveVideoDisplayRatio({ fallbackFormat: '3:4' })).toBeCloseTo(3 / 4, 4);
    expect(resolveVideoDisplayRatio({ fallbackFormat: 'invalid' })).toBeCloseTo(16 / 9, 4);
  });

  it('maps known ratios to friendly labels', () => {
    expect(toAspectRatioLabel(9 / 16)).toBe('9:16');
    expect(toAspectRatioLabel(3 / 4)).toBe('3:4');
    expect(toAspectRatioLabel(16 / 9)).toBe('16:9');
  });

  it('returns adaptive frame width classes by ratio bucket', () => {
    expect(resolveVideoFrameWidthClass(9 / 16)).toContain('max-w-[190px]');
    expect(resolveVideoFrameWidthClass(3 / 4)).toContain('max-w-[240px]');
    expect(resolveVideoFrameWidthClass(1)).toContain('max-w-[310px]');
    expect(resolveVideoFrameWidthClass(16 / 9)).toBe('max-w-[430px]');
  });
});
