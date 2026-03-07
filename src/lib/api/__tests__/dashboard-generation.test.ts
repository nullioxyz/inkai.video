import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../client';
import { createInput, estimateInput, listModels } from '../dashboard';

vi.mock('../client', () => ({
  apiRequest: vi.fn(),
}));

describe('dashboard generation api', () => {
  beforeEach(() => {
    vi.mocked(apiRequest).mockReset();
  });

  it('loads available models', async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce({
      data: [
        {
          id: 1,
          platform_id: 1,
          name: 'Kling',
          slug: 'kling',
          version: '2.5',
          active: true,
          created_at: null,
          updated_at: null,
        },
      ],
      meta: { current_page: 1, from: 1, to: 1, per_page: 50, total: 1, last_page: 1 },
    });

    const models = await listModels('token');

    expect(models[0].name).toBe('Kling');
    expect(vi.mocked(apiRequest)).toHaveBeenCalledWith('/api/models?per_page=50&page=1', {
      token: 'token',
    });
  });

  it('requests official credit estimate with model, preset and duration', async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce({
      data: {
        model_id: 1,
        preset_id: 12,
        duration_seconds: 5,
        credits_required: 3,
        model_cost_per_second_usd: '0.1500',
        estimated_generation_cost_usd: '0.7500',
        credit_unit_value_usd: '0.3500',
      },
    });

    const estimate = await estimateInput('token', {
      modelId: 1,
      presetId: 12,
      durationSeconds: 5,
    });

    expect(estimate.credits_required).toBe(3);
    expect(vi.mocked(apiRequest)).toHaveBeenCalledWith('/api/input/estimate', {
      method: 'POST',
      token: 'token',
      json: {
        model_id: 1,
        preset_id: 12,
        duration_seconds: 5,
      },
    });
  });

  it('creates input with multipart payload including model and duration', async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce({
      data: {
        id: 99,
        model_id: 1,
        preset_id: 12,
        user_id: 7,
        status: 'created',
        title: 'Tattoo',
        original_filename: 'input.png',
        mime_type: 'image/png',
        size_bytes: 100,
        duration_seconds: 5,
        estimated_cost_usd: '0.7500',
        credits_charged: 3,
        billing_status: 'charged',
      },
    });

    await createInput('token', {
      modelId: 1,
      presetId: 12,
      durationSeconds: 5,
      title: 'Tattoo',
      image: new File(['x'], 'input.png', { type: 'image/png' }),
    });

    const [, options] = vi.mocked(apiRequest).mock.calls[0];
    const formData = options?.body as FormData;

    expect(formData.get('model_id')).toBe('1');
    expect(formData.get('preset_id')).toBe('12');
    expect(formData.get('duration_seconds')).toBe('5');
    expect(formData.get('title')).toBe('Tattoo');
  });
});
