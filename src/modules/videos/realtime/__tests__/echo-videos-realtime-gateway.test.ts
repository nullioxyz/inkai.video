import { describe, expect, it } from 'vitest';
import { createEchoVideosRealtimeGateway } from '../echo-videos-realtime-gateway';

describe('echo videos realtime gateway', () => {
  it('returns noop unsubscribe when websocket is disabled', async () => {
    process.env.NEXT_PUBLIC_IAVIDEO_WS_ENABLED = 'false';
    const gateway = createEchoVideosRealtimeGateway();

    const unsubscribe = await gateway.subscribeToUserJobs({
      token: 'token',
      userId: 1,
      onJobUpdated: () => {},
    });

    expect(typeof unsubscribe).toBe('function');
  });
});
