import { ApiError } from '@/lib/api/client';
import { cancelInputPrediction, cancelJobGeneration, createInput, estimateInput, getJobDetail, listJobs, renameJobTitle } from '@/lib/api/dashboard';
import { VideosGateway } from '../domain/contracts';

export const createHttpVideosGateway = (): VideosGateway => {
  return {
    listJobs: async (token, page = 1, perPage = 100) => {
      const response = await listJobs(token, page, perPage);
      return response.data;
    },
    estimateJob: async (token, payload) => estimateInput(token, payload),
    createJob: async (token, payload) => {
      const created = await createInput(token, payload);
      try {
        return await getJobDetail(token, created.id);
      } catch {
        return null;
      }
    },
    getJobDetail: async (token, jobId) => getJobDetail(token, jobId),
    renameJob: async (token, inputId, title) => {
      const renamed = await renameJobTitle(token, inputId, title);
      try {
        return await getJobDetail(token, renamed.id);
      } catch {
        return {
          id: renamed.id,
          model_id: renamed.model_id,
          preset_id: renamed.preset_id,
          user_id: renamed.user_id,
          status: renamed.status,
          title: renamed.title ?? null,
          original_filename: renamed.original_filename,
          mime_type: renamed.mime_type,
          size_bytes: renamed.size_bytes,
          duration_seconds: renamed.duration_seconds ?? null,
          estimated_cost_usd: renamed.estimated_cost_usd ?? null,
          credits_charged: renamed.credits_charged ?? 0,
          billing_status: renamed.billing_status ?? null,
          credit_debited: false,
          start_image_url: null,
          prediction: null,
          created_at: null,
          updated_at: null,
        };
      }
    },
    cancelJob: async (token, inputId) => {
      try {
        await cancelJobGeneration(token, inputId);
      } catch (error) {
        const shouldFallbackToLegacy =
          error instanceof ApiError && (error.status === 404 || error.status === 405 || error.status === 501);

        if (!shouldFallbackToLegacy) {
          throw error;
        }

        await cancelInputPrediction(token, inputId);
      }
    },
  };
};
