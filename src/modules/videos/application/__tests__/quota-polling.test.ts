import { describe, expect, it } from 'vitest';
import { shouldPollQuotaFallback } from '../quota-polling';

describe('quota polling fallback', () => {
  it('polls when socket is disconnected and user is on create view', () => {
    expect(
      shouldPollQuotaFallback({
        token: 'token',
        realtimeConnected: false,
        selectedVideoId: null,
      }),
    ).toBe(true);
  });

  it('does not poll when websocket is connected', () => {
    expect(
      shouldPollQuotaFallback({
        token: 'token',
        realtimeConnected: true,
        selectedVideoId: null,
      }),
    ).toBe(false);
  });

  it('does not poll when user is on detail view', () => {
    expect(
      shouldPollQuotaFallback({
        token: 'token',
        realtimeConnected: false,
        selectedVideoId: 'abc',
      }),
    ).toBe(false);
  });
});
