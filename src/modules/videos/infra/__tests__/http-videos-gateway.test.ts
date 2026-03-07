import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError } from '@/lib/api/client';
import * as api from '@/lib/api/dashboard';
import { createHttpVideosGateway } from '../http-videos-gateway';

vi.mock('@/lib/api/dashboard', () => ({
  listJobs: vi.fn(),
  estimateInput: vi.fn(),
  createInput: vi.fn(),
  getJobDetail: vi.fn(),
  renameJobTitle: vi.fn(),
  cancelJobGeneration: vi.fn(),
  cancelInputPrediction: vi.fn(),
}));

describe('http videos gateway', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('lists jobs from API response', async () => {
    vi.mocked(api.listJobs).mockResolvedValue({
      data: [
        {
          id: 1,
          model_id: 1,
          preset_id: 1,
          user_id: 1,
          status: 'processing',
          original_filename: null,
          mime_type: null,
          size_bytes: null,
          duration_seconds: 5,
          estimated_cost_usd: '0.3500',
          credits_charged: 1,
          billing_status: 'charged',
          credit_debited: false,
          start_image_url: null,
          prediction: null,
          created_at: null,
          updated_at: null,
        },
      ],
      meta: { current_page: 1, from: 1, to: 1, per_page: 100, total: 1, last_page: 1 },
    });

    const gateway = createHttpVideosGateway();
    const rows = await gateway.listJobs('token');
    expect(rows).toHaveLength(1);
  });

  it('estimates generation cost through backend endpoint', async () => {
    vi.mocked(api.estimateInput).mockResolvedValue({
      model_id: 1,
      preset_id: 2,
      duration_seconds: 5,
      credits_required: 3,
      model_cost_per_second_usd: '0.1500',
      estimated_generation_cost_usd: '0.7500',
      credit_unit_value_usd: '0.3500',
    });

    const gateway = createHttpVideosGateway();
    const estimate = await gateway.estimateJob('token', {
      modelId: 1,
      presetId: 2,
      durationSeconds: 5,
    });

    expect(estimate.credits_required).toBe(3);
    expect(vi.mocked(api.estimateInput)).toHaveBeenCalledWith('token', {
      modelId: 1,
      presetId: 2,
      durationSeconds: 5,
    });
  });

  it('creates job and resolves detail', async () => {
    vi.mocked(api.createInput).mockResolvedValue({
      id: 22,
      model_id: 3,
      preset_id: 1,
      user_id: 1,
      status: 'created',
      title: 'Minha tattoo',
      original_filename: 'x.png',
      mime_type: 'image/png',
      size_bytes: 100,
      duration_seconds: 8,
      estimated_cost_usd: '0.7500',
      credits_charged: 3,
      billing_status: 'charged',
    });
    vi.mocked(api.getJobDetail).mockResolvedValue({
      id: 22,
      model_id: 3,
      preset_id: 1,
      user_id: 1,
      status: 'processing',
      title: 'Minha tattoo',
      original_filename: 'x.png',
      mime_type: 'image/png',
      size_bytes: 100,
      duration_seconds: 8,
      estimated_cost_usd: '0.7500',
      credits_charged: 3,
      billing_status: 'charged',
      credit_debited: true,
      start_image_url: null,
      prediction: null,
      created_at: null,
      updated_at: null,
    });

    const gateway = createHttpVideosGateway();
    const job = await gateway.createJob('token', {
      modelId: 3,
      presetId: 1,
      durationSeconds: 8,
      image: {} as File,
      title: 'Minha tattoo',
    });

    expect(job?.id).toBe(22);
    expect(vi.mocked(api.createInput)).toHaveBeenCalledWith('token', {
      modelId: 3,
      presetId: 1,
      durationSeconds: 8,
      image: expect.anything(),
      title: 'Minha tattoo',
    });
  });

  it('renames an existing job title', async () => {
    vi.mocked(api.renameJobTitle).mockResolvedValue({
      id: 22,
      model_id: 3,
      preset_id: 1,
      user_id: 1,
      status: 'processing',
      title: 'Novo nome',
      original_filename: 'x.png',
      mime_type: 'image/png',
      size_bytes: 100,
      duration_seconds: 8,
      estimated_cost_usd: '0.7500',
      credits_charged: 3,
      billing_status: 'charged',
    });
    vi.mocked(api.getJobDetail).mockResolvedValue({
      id: 22,
      model_id: 3,
      preset_id: 1,
      user_id: 1,
      status: 'processing',
      title: 'Novo nome',
      original_filename: 'x.png',
      mime_type: 'image/png',
      size_bytes: 100,
      duration_seconds: 8,
      estimated_cost_usd: '0.7500',
      credits_charged: 3,
      billing_status: 'charged',
      credit_debited: true,
      start_image_url: 'https://cdn/image.png',
      prediction: null,
      created_at: null,
      updated_at: null,
    });

    const gateway = createHttpVideosGateway();
    const job = await gateway.renameJob('token', 22, 'Novo nome');

    expect(job.title).toBe('Novo nome');
    expect(vi.mocked(api.renameJobTitle)).toHaveBeenCalledWith('token', 22, 'Novo nome');
    expect(vi.mocked(api.getJobDetail)).toHaveBeenCalledWith('token', 22);
  });

  it('cancels a job using the new endpoint', async () => {
    const gateway = createHttpVideosGateway();
    await gateway.cancelJob('token', 33);

    expect(vi.mocked(api.cancelJobGeneration)).toHaveBeenCalledWith('token', 33);
    expect(vi.mocked(api.cancelInputPrediction)).not.toHaveBeenCalled();
  });

  it('falls back to legacy cancel endpoint when new endpoint is unavailable', async () => {
    vi.mocked(api.cancelJobGeneration).mockRejectedValueOnce(new ApiError('Not found', 404, {}));

    const gateway = createHttpVideosGateway();
    await gateway.cancelJob('token', 44);

    expect(vi.mocked(api.cancelJobGeneration)).toHaveBeenCalledWith('token', 44);
    expect(vi.mocked(api.cancelInputPrediction)).toHaveBeenCalledWith('token', 44);
  });

  it('does not fallback for business/auth errors and rethrows', async () => {
    vi.mocked(api.cancelJobGeneration).mockRejectedValueOnce(new ApiError('Unprocessable', 422, {}));

    const gateway = createHttpVideosGateway();

    await expect(gateway.cancelJob('token', 45)).rejects.toBeInstanceOf(ApiError);
    expect(vi.mocked(api.cancelInputPrediction)).not.toHaveBeenCalled();
  });
});
