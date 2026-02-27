import { describe, expect, it } from 'vitest';
import { isCancelableVideoStatus } from '../cancel-state';

describe('cancel state', () => {
  it('allows cancel for created and processing', () => {
    expect(isCancelableVideoStatus('created')).toBe(true);
    expect(isCancelableVideoStatus('processing')).toBe(true);
  });

  it('disallows cancel for terminal statuses', () => {
    expect(isCancelableVideoStatus('completed')).toBe(false);
    expect(isCancelableVideoStatus('failed')).toBe(false);
    expect(isCancelableVideoStatus('canceled')).toBe(false);
  });
});
