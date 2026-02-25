import { cancelInputPrediction, createInput, getJobDetail, listJobs, renameJobTitle } from '@/lib/api/dashboard';
import { VideosGateway } from '../domain/contracts';

export const createHttpVideosGateway = (): VideosGateway => {
  return {
    listJobs: async (token, page = 1, perPage = 100) => {
      const response = await listJobs(token, page, perPage);
      return response.data;
    },
    createJob: async (token, presetId, image, title) => {
      const created = await createInput(token, presetId, image, title);
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
          preset_id: renamed.preset_id,
          user_id: renamed.user_id,
          status: renamed.status,
          title: renamed.title ?? null,
          original_filename: renamed.original_filename,
          mime_type: renamed.mime_type,
          size_bytes: renamed.size_bytes,
          credit_debited: false,
          start_image_url: null,
          prediction: null,
          created_at: null,
          updated_at: null,
        };
      }
    },
    cancelJob: async (token, inputId) => {
      await cancelInputPrediction(token, inputId);
    },
  };
};
