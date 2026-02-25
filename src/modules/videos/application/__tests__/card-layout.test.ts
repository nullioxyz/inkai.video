import { describe, expect, it } from 'vitest';
import { resolveCardRatio, resolveCardWidthClass } from '../card-layout';

describe('card layout', () => {
  it('resolves ratio from format text', () => {
    expect(resolveCardRatio('9:16')).toBeCloseTo(9 / 16, 4);
    expect(resolveCardRatio('MP4 - 1:1')).toBeCloseTo(1, 4);
  });

  it('falls back to 16:9 when format is invalid', () => {
    expect(resolveCardRatio('sem formato')).toBeCloseTo(16 / 9, 4);
    expect(resolveCardRatio(undefined)).toBeCloseTo(16 / 9, 4);
  });

  it('maps width classes by ratio bucket', () => {
    expect(resolveCardWidthClass(9 / 16)).toContain('max-w-[170px]');
    expect(resolveCardWidthClass(3 / 4)).toContain('max-w-[220px]');
    expect(resolveCardWidthClass(1)).toContain('max-w-[280px]');
    expect(resolveCardWidthClass(16 / 9)).toContain('max-w-[360px]');
  });
});
