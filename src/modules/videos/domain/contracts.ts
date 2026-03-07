import { BackendGenerationEstimateResponse, BackendJobResponse } from '@/lib/api/dashboard';

export interface DailyGenerationQuota {
  daily_limit: number;
  used_today: number;
  remaining_today: number;
  near_limit: boolean;
  limit_reached: boolean;
}

export interface EstimateJobPayload {
  modelId: number;
  presetId: number;
  durationSeconds?: number | null;
}

export interface CreateJobPayload extends EstimateJobPayload {
  image: File;
  title?: string;
}

export interface VideosGateway {
  listJobs(token: string, page?: number, perPage?: number): Promise<BackendJobResponse[]>;
  estimateJob(token: string, payload: EstimateJobPayload): Promise<BackendGenerationEstimateResponse>;
  createJob(token: string, payload: CreateJobPayload): Promise<BackendJobResponse | null>;
  getJobDetail(token: string, jobId: number): Promise<BackendJobResponse>;
  renameJob(token: string, inputId: number, title: string): Promise<BackendJobResponse>;
  cancelJob(token: string, inputId: number): Promise<void>;
}

export interface RealtimeUnsubscribe {
  (): void;
}

export interface VideosRealtimeGateway {
  subscribeToUserJobs(args: {
    token: string;
    userId: number;
    onJobUpdated: (job: BackendJobResponse) => void;
    onGenerationLimitAlert?: (quota: DailyGenerationQuota) => void;
    onSessionLoggedOut?: (payload: { reason?: string; logged_out_at?: string; type?: string }) => void;
    onError?: (error: unknown) => void;
  }): Promise<RealtimeUnsubscribe>;
}
