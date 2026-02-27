import { describe, expect, it, vi } from 'vitest';
import { getCreditsBalance, getCreditsStatement, getCreditsVideoGenerations } from '@/lib/api/dashboard';
import { fetchDashboardCredits } from '../services/dashboard-credits-service';

vi.mock('@/lib/api/dashboard', () => ({
  getCreditsBalance: vi.fn(),
  getCreditsStatement: vi.fn(),
  getCreditsVideoGenerations: vi.fn(),
}));

describe('dashboard credits service', () => {
  it('loads and maps credits snapshot', async () => {
    vi.mocked(getCreditsBalance).mockResolvedValue({
      user_id: 1,
      credit_balance: 9,
      updated_at: null,
    });

    vi.mocked(getCreditsStatement).mockResolvedValue({
      data: [
        {
          id: 10,
          delta: -1,
          balance_after: 9,
          reason: 'input',
          reference_type: 'input_creation',
          reference_id: 11,
          created_at: null,
        },
      ],
      meta: { current_page: 1, from: 1, to: 1, per_page: 100, total: 1, last_page: 1 },
    });

    vi.mocked(getCreditsVideoGenerations).mockResolvedValue({
      data: [
        {
          input_id: 11,
          title: 'video',
          status: 'done',
          preset: { id: 1, name: 'Preset' },
          prediction: { id: 1, status: 'succeeded', output_video_url: null },
          credits_debited: 1,
          credits_refunded: 0,
          credits_used: 1,
          created_at: null,
          updated_at: null,
        },
      ],
      meta: { current_page: 1, from: 1, to: 1, per_page: 100, total: 1, last_page: 1 },
    });

    const snapshot = await fetchDashboardCredits('token');

    expect(snapshot.creditBalance).toBe(9);
    expect(snapshot.creditStatement[0].balanceAfter).toBe(9);
    expect(snapshot.creditVideoGenerations[0].inputId).toBe(11);
  });
});
