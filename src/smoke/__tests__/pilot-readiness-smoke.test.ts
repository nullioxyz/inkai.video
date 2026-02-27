import { describe, expect, it } from 'vitest';
import { isCancelableVideoStatus } from '@/modules/videos/application/cancel-state';
import { shouldPollQuotaFallback } from '@/modules/videos/application/quota-polling';
import { resolvePresetCarouselScrollState } from '@/modules/videos/application/preset-carousel';

describe('pilot readiness smoke', () => {
  it('keeps generation fallback polling active only when realtime is unavailable on create view', () => {
    expect(shouldPollQuotaFallback({ token: 'token', realtimeConnected: false, selectedVideoId: null })).toBe(true);
    expect(shouldPollQuotaFallback({ token: 'token', realtimeConnected: true, selectedVideoId: null })).toBe(false);
    expect(shouldPollQuotaFallback({ token: 'token', realtimeConnected: false, selectedVideoId: '123' })).toBe(false);
  });

  it('keeps cancelability strictly to running jobs', () => {
    expect(isCancelableVideoStatus('created')).toBe(true);
    expect(isCancelableVideoStatus('processing')).toBe(true);
    expect(isCancelableVideoStatus('completed')).toBe(false);
    expect(isCancelableVideoStatus('failed')).toBe(false);
    expect(isCancelableVideoStatus('canceled')).toBe(false);
  });

  it('maintains horizontal presets navigation guards', () => {
    expect(resolvePresetCarouselScrollState(0, 1000, 400)).toEqual({ canScrollLeft: false, canScrollRight: true });
    expect(resolvePresetCarouselScrollState(600, 1000, 400)).toEqual({ canScrollLeft: true, canScrollRight: false });
  });
});
