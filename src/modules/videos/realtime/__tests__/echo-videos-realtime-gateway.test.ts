import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createEchoVideosRealtimeGateway } from '../echo-videos-realtime-gateway';

const listeners = new Map<string, (payload: unknown) => void>();
const listen = vi.fn((event: string, callback: (payload: unknown) => void) => {
  listeners.set(event, callback);
});
const stopListening = vi.fn();
const leave = vi.fn();
const disconnect = vi.fn();
const privateChannel = vi.fn(() => ({
  listen,
  stopListening,
}));

vi.mock('socket.io-client', () => ({
  io: vi.fn(() => ({})),
}));

vi.mock('laravel-echo', () => ({
  default: vi.fn(() => ({
    private: privateChannel,
    leave,
    disconnect,
  })),
}));

describe('echo videos realtime gateway', () => {
  beforeEach(() => {
    listeners.clear();
    listen.mockClear();
    stopListening.mockClear();
    leave.mockClear();
    disconnect.mockClear();
    privateChannel.mockClear();
    process.env.NEXT_PUBLIC_IAVIDEO_WS_ENABLED = 'true';
  });

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

  it('handles session logged out broadcast and unsubscribes listeners', async () => {
    const onSessionLoggedOut = vi.fn();
    const gateway = createEchoVideosRealtimeGateway();

    const unsubscribe = await gateway.subscribeToUserJobs({
      token: 'token',
      userId: 9,
      onJobUpdated: () => {},
      onSessionLoggedOut,
    });

    const eventCallback = listeners.get('.session-logged-out');
    expect(eventCallback).toBeTypeOf('function');

    eventCallback?.({ type: 'session_logged_out', reason: 'manual_logout' });
    expect(onSessionLoggedOut).toHaveBeenCalledWith({
      type: 'session_logged_out',
      reason: 'manual_logout',
    });

    unsubscribe();
    expect(stopListening).toHaveBeenCalledWith('.session-logged-out');
    expect(leave).toHaveBeenCalledWith('user.9');
    expect(disconnect).toHaveBeenCalled();
  });
});
