import { afterEach, describe, expect, it } from 'vitest';
import { mapCreditStatementToViewModel, mapCreditVideoGenerationToViewModel } from '../mappers';

describe('credits mappers', () => {
  const originalFrontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

  afterEach(() => {
    if (originalFrontendUrl === undefined) {
      delete process.env.NEXT_PUBLIC_FRONTEND_URL;
      return;
    }
    process.env.NEXT_PUBLIC_FRONTEND_URL = originalFrontendUrl;
  });

  it('maps statement entry from backend response', () => {
    const result = mapCreditStatementToViewModel({
      id: 1,
      delta: -1,
      balance_after: 10,
      reason: 'input',
      reference_type: 'input_creation',
      reference_id: 77,
      created_at: '2026-01-01T10:00:00.000Z',
    });

    expect(result.balanceAfter).toBe(10);
    expect(result.referenceType).toBe('input_creation');
  });

  it('maps video generation and normalizes optional nested fields', () => {
    const result = mapCreditVideoGenerationToViewModel({
      input_id: 10,
      title: 'video',
      status: 'done',
      preset: { id: 3, name: 'Preset' },
      prediction: { id: 2, status: 'succeeded', output_video_url: 'https://cdn/video.mp4' },
      credits_debited: 1,
      credits_refunded: 0,
      credits_used: 1,
      is_failed: false,
      is_canceled: false,
      is_refunded: false,
      credit_events: [{ delta: -1, reference_type: 'input_creation', reason: 'Input' }],
      created_at: null,
      updated_at: null,
    });

    expect(result.inputId).toBe(10);
    expect(result.creditEvents[0].delta).toBe(-1);
    expect(result.creditEvents[0].referenceType).toBe('input_creation');
  });

  it('resolves legacy relative output_video_url', () => {
    process.env.NEXT_PUBLIC_FRONTEND_URL = 'https://app.inkai.ai';

    const result = mapCreditVideoGenerationToViewModel({
      input_id: 11,
      title: 'video',
      status: 'done',
      preset: { id: 3, name: 'Preset' },
      prediction: { id: 2, status: 'succeeded', output_video_url: '/storage/output.mp4' },
      credits_debited: 1,
      credits_refunded: 0,
      credits_used: 1,
      is_failed: false,
      is_canceled: false,
      is_refunded: false,
      credit_events: [],
      created_at: null,
      updated_at: null,
    });

    expect(result.outputVideoUrl).toBe('https://app.inkai.ai/storage/output.mp4');
  });

  it('keeps output url null when value is empty', () => {
    const result = mapCreditVideoGenerationToViewModel({
      input_id: 12,
      title: 'video',
      status: 'done',
      preset: { id: 3, name: 'Preset' },
      prediction: { id: 2, status: 'succeeded', output_video_url: '   ' },
      credits_debited: 1,
      credits_refunded: 0,
      credits_used: 1,
      is_failed: false,
      is_canceled: false,
      is_refunded: false,
      credit_events: [],
      created_at: null,
      updated_at: null,
    });

    expect(result.outputVideoUrl).toBeNull();
  });
});
