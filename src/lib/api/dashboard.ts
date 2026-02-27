import { apiRequest } from './client';
import { LoginRequestContext, buildLoginRequestHeaders, resolveBrowserLoginContext } from './login-context';

interface ResourceResponse<T> {
  data: T;
}

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    from: number | null;
    to: number | null;
    per_page: number;
    total: number;
    last_page: number;
  };
}

export interface AuthTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface ImpersonationExchangeResponse extends AuthTokenResponse {
  impersonation: {
    is_impersonating: boolean;
    actor_id: number;
    subject_id: number;
  };
}

export interface BackendModel {
  id: number;
  platform_id: number;
  name: string;
  slug: string;
  version: string | null;
  active: boolean;
  created_at: string | null;
  updated_at: string | null;
}

export interface BackendPreset {
  id: number;
  default_model_id: number;
  name: string;
  prompt: string;
  negative_prompt: string | null;
  duration_seconds: number | null;
  preview_image_url?: string | null;
  preview_video_url: string | null;
  aspect_ratio: string | null;
  tags?: BackendPresetTag[];
  created_at: string | null;
  updated_at: string | null;
}

export interface BackendPresetTag {
  id: number;
  name: string;
  slug: string;
}

export interface BackendPresetFiltersResponse {
  aspect_ratios: string[];
  tags: BackendPresetTag[];
}

export interface CreatedInputResponse {
  id: number;
  preset_id: number;
  user_id: number;
  status: 'created' | 'processing' | 'done' | 'failed' | 'cancelled';
  title?: string | null;
  original_filename: string | null;
  mime_type: string | null;
  size_bytes: number | null;
}

export interface PredictionOutputResponse {
  id: number;
  kind: 'video' | 'thumbnail' | 'gif';
  path: string;
  mime_type: string | null;
  size_bytes: number | null;
  file_url: string | null;
  playback_url?: string | null;
  created_at: string | null;
}

export interface PredictionResponse {
  id: number;
  external_id: string | null;
  status: string;
  source: string;
  attempt: number;
  queued_at: string | null;
  started_at: string | null;
  finished_at: string | null;
  failed_at: string | null;
  canceled_at: string | null;
  error_code: string | null;
  error_message: string | null;
  outputs: PredictionOutputResponse[];
  created_at: string | null;
  updated_at: string | null;
}

export interface BackendJobResponse {
  id: number;
  preset_id: number;
  preset?: {
    id: number;
    name: string;
  } | null;
  user_id: number;
  status: 'created' | 'processing' | 'done' | 'failed' | 'cancelled';
  title?: string | null;
  original_filename: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  credit_debited: boolean;
  start_image_url: string | null;
  prediction: PredictionResponse | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface MeResponse {
  id: number;
  name: string;
  email: string;
  username: string;
  phone_number: string | null;
  country_code?: string | null;
  theme_preference?: 'light' | 'dark' | 'system' | null;
  language?: {
    id: number | null;
    title: string | null;
    slug: string | null;
  } | null;
  roles?: string[];
  can_access_admin?: boolean;
  active: boolean;
  credit_balance: number;
  must_reset_password: boolean;
  last_login_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface FirstLoginResetPasswordPayload {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface CreditBalanceResponse {
  user_id: number;
  credit_balance: number;
  updated_at: string | null;
}

export interface CreditStatementEntryResponse {
  id: number;
  delta: number;
  balance_after: number;
  reason: string;
  reference_type: string;
  reference_id: number | null;
  created_at: string | null;
}

export interface CreditVideoGenerationResponse {
  input_id: number;
  title: string | null;
  status: string;
  preset: {
    id: number | null;
    name: string | null;
  } | null;
  prediction: {
    id: number | null;
    status: string | null;
    error_code?: string | null;
    error_message?: string | null;
    output_video_url: string | null;
  } | null;
  credits_debited: number;
  credits_refunded: number;
  credits_used: number;
  is_failed?: boolean;
  is_canceled?: boolean;
  is_refunded?: boolean;
  failure?: {
    code?: string | null;
    message?: string | null;
    reason?: string | null;
  } | null;
  cancellation?: {
    reason?: string | null;
  } | null;
  credit_events?: Array<{
    ledger_id?: number | null;
    type?: string | null;
    operation?: string | null;
    amount?: number | null;
    delta?: number | null;
    balance_after?: number | null;
    reason?: string | null;
    reference_type?: string | null;
    reference_id?: number | null;
    created_at?: string | null;
  }>;
  created_at: string | null;
  updated_at: string | null;
}

export interface CreditPurchaseOrderResponse {
  id: number;
  user_id: number;
  provider: string;
  external_id: string | null;
  status: string;
  credits: number;
  amount_cents: number;
  currency: string;
  checkout_url: string | null;
  failure_code: string | null;
  failure_message: string | null;
  paid_at: string | null;
  failed_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface DailyGenerationQuotaResponse {
  daily_limit: number;
  used_today: number;
  remaining_today: number;
  near_limit: boolean;
  limit_reached: boolean;
}

export interface UpdateUserPreferencesPayload {
  language_id?: number | null;
  theme_preference?: 'light' | 'dark' | 'system' | null;
}

export const loginWithEmail = async (email: string, password: string, context?: LoginRequestContext) => {
  const resolvedContext = {
    ...resolveBrowserLoginContext(),
    ...context,
  };

  const response = await apiRequest<ResourceResponse<AuthTokenResponse>>('/api/auth/login', {
    method: 'POST',
    json: { email, password },
    headers: buildLoginRequestHeaders(resolvedContext),
  });

  return response.data;
};

export const exchangeImpersonationHash = async (token: string, hash: string) => {
  const response = await apiRequest<ResourceResponse<ImpersonationExchangeResponse>>('/api/auth/impersonation/exchange', {
    method: 'POST',
    token,
    json: { hash },
  });

  return response.data;
};

export const listModels = async (token: string) => {
  const response = await apiRequest<PaginatedResponse<BackendModel>>('/api/models?per_page=50&page=1', {
    token,
  });

  return response.data;
};

export const listPresetsByModel = async (
  token: string,
  modelId: number,
  filters?: {
    aspectRatio?: string;
    tag?: string;
    tags?: string[];
  },
) => {
  const searchParams = new URLSearchParams({
    per_page: '100',
    page: '1',
  });

  if (filters?.aspectRatio) {
    searchParams.set('aspect_ratio', filters.aspectRatio);
  }

  if (filters?.tag) {
    searchParams.set('tag', filters.tag);
  }

  if (filters?.tags?.length) {
    searchParams.set('tags', filters.tags.join(','));
  }

  const response = await apiRequest<PaginatedResponse<BackendPreset>>(`/api/models/${modelId}/presets?${searchParams.toString()}`, {
    token,
  });

  return response.data;
};

export const listPresetFiltersByModel = async (token: string, modelId: number) => {
  const response = await apiRequest<ResourceResponse<BackendPresetFiltersResponse>>(`/api/models/${modelId}/presets/filters`, {
    token,
  });

  return response.data;
};

export const createInput = async (token: string, presetId: number, image: File, title?: string) => {
  const formData = new FormData();
  formData.append('preset_id', String(presetId));
  if (title && title.trim() !== '') {
    formData.append('title', title.trim());
  }
  formData.append('image', image);

  const response = await apiRequest<ResourceResponse<CreatedInputResponse>>('/api/input/create', {
    method: 'POST',
    token,
    body: formData,
  });

  return response.data;
};

export const cancelInputPrediction = async (token: string, inputId: number) => {
  await apiRequest('/api/prediction/cancel', {
    method: 'POST',
    token,
    json: { input_id: inputId },
  });
};

export const cancelJobGeneration = async (token: string, jobId: number) => {
  await apiRequest(`/api/jobs/${jobId}/cancel`, {
    method: 'POST',
    token,
  });
};

export const listJobs = async (token: string, page = 1, perPage = 100) => {
  const response = await apiRequest<PaginatedResponse<BackendJobResponse>>(`/api/jobs?page=${page}&per_page=${perPage}`, {
    token,
  });

  return response;
};

export const getJobDetail = async (token: string, jobId: number) => {
  const response = await apiRequest<ResourceResponse<BackendJobResponse>>(`/api/jobs/${jobId}`, {
    token,
  });

  return response.data;
};

export const renameJobTitle = async (token: string, jobId: number, title: string) => {
  const response = await apiRequest<ResourceResponse<CreatedInputResponse>>(`/api/jobs/${jobId}/title`, {
    method: 'PATCH',
    token,
    json: { title },
  });

  return response.data;
};

export const getMe = async (token: string) => {
  const response = await apiRequest<ResourceResponse<MeResponse>>('/api/auth/me', {
    token,
  });

  return response.data;
};

export const resetFirstLoginPassword = async (token: string, payload: FirstLoginResetPasswordPayload) => {
  const response = await apiRequest<ResourceResponse<MeResponse>>('/api/auth/first-login/reset-password', {
    method: 'POST',
    token,
    json: payload,
  });

  return response.data;
};

export const getCreditsBalance = async (token: string) => {
  const response = await apiRequest<ResourceResponse<CreditBalanceResponse>>('/api/credits/balance', {
    token,
  });

  return response.data;
};

export const getCreditsStatement = async (token: string, page = 1, perPage = 50) => {
  const response = await apiRequest<PaginatedResponse<CreditStatementEntryResponse>>(
    `/api/credits/statement?page=${page}&per_page=${perPage}`,
    {
      token,
    },
  );

  return response;
};

export const getCreditsVideoGenerations = async (token: string, page = 1, perPage = 50) => {
  const response = await apiRequest<PaginatedResponse<CreditVideoGenerationResponse>>(
    `/api/credits/video-generations?page=${page}&per_page=${perPage}`,
    {
      token,
    },
  );

  return response;
};

export const createCreditsPurchase = async (token: string, credits: number, idempotencyKey?: string) => {
  const headers: HeadersInit | undefined =
    idempotencyKey && idempotencyKey.trim() !== '' ? { 'Idempotency-Key': idempotencyKey.trim() } : undefined;

  const response = await apiRequest<ResourceResponse<CreditPurchaseOrderResponse>>('/api/payments/credits/purchase', {
    method: 'POST',
    token,
    headers,
    json: { credits },
  });

  return response.data;
};

export const getJobsQuota = async (token: string) => {
  const response = await apiRequest<ResourceResponse<DailyGenerationQuotaResponse>>('/api/jobs/quota', {
    token,
  });

  return response.data;
};

export const updateUserPreferences = async (token: string, payload: UpdateUserPreferencesPayload) => {
  await apiRequest<ResourceResponse<MeResponse>>('/api/auth/preferences', {
    method: 'PATCH',
    token,
    json: payload,
  });

  return getMe(token);
};
