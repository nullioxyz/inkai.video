import { BackendJobResponse } from '@/lib/api/dashboard';

export interface DailyGenerationQuota {
  daily_limit: number;
  used_today: number;
  remaining_today: number;
  near_limit: boolean;
  limit_reached: boolean;
}

export interface VideosGateway {
  listJobs(token: string, page?: number, perPage?: number): Promise<BackendJobResponse[]>;
  createJob(token: string, presetId: number, image: File, title?: string): Promise<BackendJobResponse | null>;
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
    onError?: (error: unknown) => void;
  }): Promise<RealtimeUnsubscribe>;
}
