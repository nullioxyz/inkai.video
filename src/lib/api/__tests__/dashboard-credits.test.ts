import { describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../client';
import { createCreditsPurchase, getCreditsBalance, getCreditsStatement, getCreditsVideoGenerations } from '../dashboard';

vi.mock('../client', () => ({
  apiRequest: vi.fn(),
}));

describe('dashboard credits api', () => {
  it('loads credit balance from backend endpoint', async () => {
    vi.mocked(apiRequest).mockResolvedValue({
      data: {
        user_id: 1,
        credit_balance: 12,
        updated_at: null,
      },
    });

    const response = await getCreditsBalance('token');

    expect(response.credit_balance).toBe(12);
    expect(vi.mocked(apiRequest)).toHaveBeenCalledWith('/api/credits/balance', { token: 'token' });
  });

  it('loads credit statement with pagination params', async () => {
    vi.mocked(apiRequest).mockResolvedValue({
      data: [],
      meta: { current_page: 2, from: null, to: null, per_page: 25, total: 0, last_page: 1 },
    });

    await getCreditsStatement('token', 2, 25);

    expect(vi.mocked(apiRequest)).toHaveBeenCalledWith('/api/credits/statement?page=2&per_page=25', { token: 'token' });
  });

  it('loads video generations history with pagination params', async () => {
    vi.mocked(apiRequest).mockResolvedValue({
      data: [
        {
          input_id: 10,
          title: 'Tattoo video',
          status: 'done',
          preset: { id: 2, name: 'Preset' },
          prediction: { id: 5, status: 'succeeded', output_video_url: 'https://cdn.example.com/video.mp4' },
          credits_debited: 1,
          credits_refunded: 0,
          credits_used: 1,
          created_at: null,
          updated_at: null,
        },
      ],
      meta: { current_page: 1, from: 1, to: 1, per_page: 50, total: 1, last_page: 1 },
    });

    const response = await getCreditsVideoGenerations('token', 1, 50);

    expect(response.data[0].input_id).toBe(10);
    expect(vi.mocked(apiRequest)).toHaveBeenCalledWith('/api/credits/video-generations?page=1&per_page=50', { token: 'token' });
  });

  it('creates a credit purchase with idempotency header when provided', async () => {
    vi.mocked(apiRequest).mockResolvedValue({
      data: {
        id: 11,
        user_id: 1,
        provider: 'fakepay',
        external_id: 'ext-123',
        status: 'pending',
        credits: 20,
        amount_cents: 2000,
        currency: 'USD',
        checkout_url: 'https://checkout.example.com',
        failure_code: null,
        failure_message: null,
        paid_at: null,
        failed_at: null,
        created_at: null,
        updated_at: null,
      },
    });

    const response = await createCreditsPurchase('token', 20, 'purchase-key-1');

    expect(response.id).toBe(11);
    expect(vi.mocked(apiRequest)).toHaveBeenCalledWith('/api/payments/credits/purchase', {
      method: 'POST',
      token: 'token',
      headers: {
        'Idempotency-Key': 'purchase-key-1',
      },
      json: { credits: 20 },
    });
  });
});
