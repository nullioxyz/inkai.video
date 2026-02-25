import { describe, expect, it } from 'vitest';
import { nextPage, normalizeCreditStatus, previousPage, shouldShowAuditSubline } from '../table-state';

const baseRow = {
  inputId: 1,
  title: 'Video',
  status: 'done',
  presetId: 1,
  presetName: 'Preset',
  predictionId: 10,
  predictionStatus: 'succeeded',
  predictionErrorCode: null,
  predictionErrorMessage: null,
  outputVideoUrl: null,
  creditsDebited: 1,
  creditsRefunded: 0,
  creditsUsed: 1,
  isFailed: false,
  isCanceled: false,
  isRefunded: false,
  failureCode: null,
  failureMessage: null,
  failureReason: null,
  cancellationReason: null,
  creditEvents: [
    {
      ledgerId: 1,
      type: 'debit',
      operation: 'debit',
      delta: -1,
      balanceAfter: 9,
      reason: 'Charge for input creation',
      referenceType: 'input_creation',
      referenceId: 1,
      createdAt: '2026-02-25T00:00:00Z',
    },
  ],
  createdAt: '2026-02-25T00:00:00Z',
  updatedAt: '2026-02-25T00:00:00Z',
};

describe('credits table state', () => {
  it('normalizes backend statuses for UI', () => {
    expect(normalizeCreditStatus('done')).toBe('completed');
    expect(normalizeCreditStatus('succeeded')).toBe('completed');
    expect(normalizeCreditStatus('cancelled')).toBe('canceled');
    expect(normalizeCreditStatus('queued')).toBe('processing');
    expect(normalizeCreditStatus('failed')).toBe('failed');
  });

  it('shows audit subline when there is refund flag', () => {
    expect(shouldShowAuditSubline({ ...baseRow, isRefunded: true })).toBe(true);
  });

  it('shows audit subline when there is failure reason', () => {
    expect(shouldShowAuditSubline({ ...baseRow, failureReason: 'Generation failed' })).toBe(true);
  });

  it('shows audit subline when there is any non-creation credit event', () => {
    expect(
      shouldShowAuditSubline({
        ...baseRow,
        creditEvents: [
          ...baseRow.creditEvents,
          {
            ...baseRow.creditEvents[0],
            ledgerId: 2,
            type: 'refund',
            operation: 'refund',
            delta: 1,
            referenceType: 'input_prediction_creation_failed',
          },
        ],
      }),
    ).toBe(true);
  });

  it('hides audit subline for clean creation-only flow', () => {
    expect(shouldShowAuditSubline(baseRow)).toBe(false);
  });

  it('handles pagination boundaries', () => {
    expect(previousPage(1)).toBe(1);
    expect(previousPage(3)).toBe(2);
    expect(nextPage(1, 5)).toBe(2);
    expect(nextPage(5, 5)).toBe(5);
  });
});
