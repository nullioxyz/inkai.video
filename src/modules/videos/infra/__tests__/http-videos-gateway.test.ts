import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError } from '@/lib/api/client';
import * as api from '@/lib/api/dashboard';
import { createHttpVideosGateway } from '../http-videos-gateway';

vi.mock('@/lib/api/dashboard', () => ({
  listJobs: vi.fn(),
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
          preset_id: 1,
          user_id: 1,
          status: 'processing',
          original_filename: null,
          mime_type: null,
          size_bytes: null,
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

  it('creates job and resolves detail', async () => {
    vi.mocked(api.createInput).mockResolvedValue({
      id: 22,
      preset_id: 1,
      user_id: 1,
      status: 'created',
      title: 'Minha tattoo',
      original_filename: 'x.png',
      mime_type: 'image/png',
      size_bytes: 100,
    });
    vi.mocked(api.getJobDetail).mockResolvedValue({
      id: 22,
      preset_id: 1,
      user_id: 1,
      status: 'processing',
      title: 'Minha tattoo',
      original_filename: 'x.png',
      mime_type: 'image/png',
      size_bytes: 100,
      credit_debited: true,
      start_image_url: null,
      prediction: null,
      created_at: null,
      updated_at: null,
    });

    const gateway = createHttpVideosGateway();
    const job = await gateway.createJob('token', 1, {} as File, 'Minha tattoo');
    expect(job?.id).toBe(22);
    expect(vi.mocked(api.createInput)).toHaveBeenCalledWith('token', 1, expect.anything(), 'Minha tattoo');
  });

  it('renames an existing job title', async () => {
    vi.mocked(api.renameJobTitle).mockResolvedValue({
      id: 22,
      preset_id: 1,
      user_id: 1,
      status: 'processing',
      title: 'Novo nome',
      original_filename: 'x.png',
      mime_type: 'image/png',
      size_bytes: 100,
    });
    vi.mocked(api.getJobDetail).mockResolvedValue({
      id: 22,
      preset_id: 1,
      user_id: 1,
      status: 'processing',
      title: 'Novo nome',
      original_filename: 'x.png',
      mime_type: 'image/png',
      size_bytes: 100,
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
