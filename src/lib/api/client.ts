type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiRequestOptions {
  method?: ApiMethod;
  token?: string | null;
  body?: BodyInit | null;
  json?: unknown;
  headers?: HeadersInit;
}

export class ApiError extends Error {
  status: number;

  payload: unknown;

  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

type ApiErrorPayload = {
  message?: string;
  errors?: Record<string, string[] | string>;
};

const extractValidationMessage = (payload: unknown): string | null => {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const candidate = payload as ApiErrorPayload;
  const { errors } = candidate;

  if (!errors || typeof errors !== 'object') {
    return null;
  }

  for (const value of Object.values(errors)) {
    if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') {
      return value[0];
    }
    if (typeof value === 'string' && value.trim() !== '') {
      return value;
    }
  }

  return null;
};

export const resolveApiErrorMessage = (error: unknown, fallbackMessage: string): string => {
  if (!(error instanceof ApiError)) {
    return error instanceof Error ? error.message : fallbackMessage;
  }

  const payloadMessage = extractValidationMessage(error.payload);
  if (payloadMessage) {
    return payloadMessage;
  }

  return error.message || fallbackMessage;
};

export const isAuthApiError = (error: unknown): boolean => {
  return error instanceof ApiError && (error.status === 401 || error.status === 403);
};

const API_BASE_URL = process.env.NEXT_PUBLIC_IAVIDEO_API_URL ?? 'http://127.0.0.1:8000';

const buildUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export const apiRequest = async <T>(path: string, options: ApiRequestOptions = {}): Promise<T> => {
  const { method = 'GET', token, body, json, headers } = options;
  const requestHeaders = new Headers(headers);
  requestHeaders.set('Accept', 'application/json');

  let resolvedBody: BodyInit | null | undefined = body;

  if (json !== undefined) {
    requestHeaders.set('Content-Type', 'application/json');
    resolvedBody = JSON.stringify(json);
  }

  if (token) {
    requestHeaders.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(buildUrl(path), {
    method,
    body: resolvedBody,
    headers: requestHeaders,
  });

  const contentType = response.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload !== null && 'message' in payload && typeof payload.message === 'string'
        ? payload.message
        : 'Request failed';
    throw new ApiError(message, response.status, payload);
  }

  return payload as T;
};
