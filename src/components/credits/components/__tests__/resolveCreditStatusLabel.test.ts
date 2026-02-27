import { describe, expect, it } from 'vitest';
import { resolveCreditStatusLabel } from '../resolveCreditStatusLabel';

const t = (key: string) => `tr:${key}`;

describe('resolveCreditStatusLabel', () => {
  it('maps known statuses to translation keys', () => {
    expect(resolveCreditStatusLabel({ status: 'pending', t: t as never })).toBe('tr:status.processing');
    expect(resolveCreditStatusLabel({ status: 'succeeded', t: t as never })).toBe('tr:status.completed');
    expect(resolveCreditStatusLabel({ status: 'canceled', t: t as never })).toBe('tr:status.canceled');
  });

  it('returns original status for unknown values', () => {
    expect(resolveCreditStatusLabel({ status: 'mystery_status', t: t as never })).toBe('mystery_status');
  });
});
