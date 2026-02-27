import { describe, expect, it } from 'vitest';
import { ApiError } from '@/lib/api/client';
import { parsePreferenceFieldErrors, submitPreferencesRequest } from '../useUpdatePreferences';

describe('useUpdatePreferences helpers', () => {
  it('extracts field-level validation errors from 422 payload', () => {
    const parsed = parsePreferenceFieldErrors({
      message: 'The given data was invalid.',
      errors: {
        language_id: ['Invalid language.'],
        theme_preference: ['Invalid theme preference.'],
      },
    });

    expect(parsed.language_id).toEqual(['Invalid language.']);
    expect(parsed.theme_preference).toEqual(['Invalid theme preference.']);
  });

  it('returns field errors and message when submit fails with 422', async () => {
    const result = await submitPreferencesRequest(
      async () => {
        throw new ApiError('Request failed', 422, {
          message: 'The given data was invalid.',
          errors: {
            language_id: ['Language is required.'],
            theme_preference: ['Theme is invalid.'],
          },
        });
      },
      {
        languageId: 2,
        themePreference: 'dark',
      },
    );

    expect(result.ok).toBe(false);
    expect(result.fieldErrors.language_id).toEqual(['Language is required.']);
    expect(result.fieldErrors.theme_preference).toEqual(['Theme is invalid.']);
  });
});
