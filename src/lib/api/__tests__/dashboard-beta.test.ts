import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../client';
import { getJobsQuota, updateUserPreferences } from '../dashboard';

vi.mock('../client', () => ({
  apiRequest: vi.fn(),
}));

describe('dashboard beta api', () => {
  beforeEach(() => {
    vi.mocked(apiRequest).mockReset();
  });

  it('loads daily generation quota', async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce({
      data: {
        daily_limit: 10,
        used_today: 7,
        remaining_today: 3,
        near_limit: true,
        limit_reached: false,
      },
    });

    const quota = await getJobsQuota('token');

    expect(quota.remaining_today).toBe(3);
    expect(vi.mocked(apiRequest)).toHaveBeenCalledWith('/api/jobs/quota', {
      token: 'token',
    });
  });

  it('updates preferences and refreshes me payload', async () => {
    vi.mocked(apiRequest)
      .mockResolvedValueOnce({ data: { id: 1 } })
      .mockResolvedValueOnce({
        data: {
          id: 7,
          name: 'Rafael',
          email: 'rafael@mail.com',
          username: 'rafael',
          phone_number: null,
          active: true,
          credit_balance: 10,
          must_reset_password: false,
          last_login_at: null,
          created_at: null,
          updated_at: null,
          theme_preference: 'dark',
          language: { id: 2, title: 'Portuguese', slug: 'pt-BR' },
          roles: ['admin'],
          can_access_admin: true,
        },
      });

    const me = await updateUserPreferences('token', {
      language_id: 2,
      theme_preference: 'dark',
    });

    expect(me.theme_preference).toBe('dark');
    expect(vi.mocked(apiRequest)).toHaveBeenNthCalledWith(1, '/api/auth/preferences', {
      method: 'PATCH',
      token: 'token',
      json: {
        language_id: 2,
        theme_preference: 'dark',
      },
    });
    expect(vi.mocked(apiRequest)).toHaveBeenNthCalledWith(2, '/api/auth/me', {
      token: 'token',
    });
  });
});
