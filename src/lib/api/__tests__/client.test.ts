import { describe, expect, it } from 'vitest';
import { ApiError, isAuthApiError, resolveApiErrorMessage } from '../client';

describe('api client error resolver', () => {
  it('returns fallback for unknown errors', () => {
    const message = resolveApiErrorMessage('unknown', 'Falha genérica');
    expect(message).toBe('Falha genérica');
  });

  it('returns native error message for non ApiError instances', () => {
    const message = resolveApiErrorMessage(new Error('Erro local'), 'Falha genérica');
    expect(message).toBe('Erro local');
  });

  it('returns first validation message from array payload', () => {
    const error = new ApiError('Request failed', 422, {
      message: 'The given data was invalid.',
      errors: {
        image: ['A imagem deve estar no formato 9:16.'],
      },
    });

    const message = resolveApiErrorMessage(error, 'Falha genérica');
    expect(message).toBe('A imagem deve estar no formato 9:16.');
  });

  it('returns validation message when payload error field is a string', () => {
    const error = new ApiError('Request failed', 422, {
      message: 'The given data was invalid.',
      errors: {
        title: 'Título inválido.',
      },
    });

    const message = resolveApiErrorMessage(error, 'Falha genérica');
    expect(message).toBe('Título inválido.');
  });

  it('falls back to ApiError message when no validation errors exist', () => {
    const error = new ApiError('Falha ao gerar vídeo.', 422, {
      message: 'The given data was invalid.',
    });

    const message = resolveApiErrorMessage(error, 'Falha genérica');
    expect(message).toBe('Falha ao gerar vídeo.');
  });

  it('identifies unauthorized api errors', () => {
    expect(isAuthApiError(new ApiError('Unauthorized', 401, {}))).toBe(true);
    expect(isAuthApiError(new ApiError('Forbidden', 403, {}))).toBe(true);
    expect(isAuthApiError(new ApiError('Validation', 422, {}))).toBe(false);
    expect(isAuthApiError(new Error('local'))).toBe(false);
  });
});
