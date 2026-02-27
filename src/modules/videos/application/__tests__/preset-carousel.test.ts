import { describe, expect, it } from 'vitest';
import { resolvePresetCarouselScrollState, resolvePresetCarouselStep } from '../preset-carousel';

describe('preset carousel', () => {
  it('resolves horizontal scroll flags', () => {
    expect(resolvePresetCarouselScrollState(0, 1000, 400)).toEqual({
      canScrollLeft: false,
      canScrollRight: true,
    });

    expect(resolvePresetCarouselScrollState(620, 1000, 400)).toEqual({
      canScrollLeft: true,
      canScrollRight: false,
    });
  });

  it('calculates scroll step with sensible minimum', () => {
    expect(resolvePresetCarouselStep(200)).toBe(220);
    expect(resolvePresetCarouselStep(600)).toBeCloseTo(492, 5);
  });
});
