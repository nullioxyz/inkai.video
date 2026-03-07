import { listModels, listPresetFiltersByModel, listPresetsByModel } from '@/lib/api/dashboard';
import { PresetsGateway } from '../domain/contracts';

export const createHttpPresetsGateway = (): PresetsGateway => {
  return {
    listModels: async (token) => listModels(token),
    listPresets: async (token, modelId, filters) => listPresetsByModel(token, modelId, filters),
    listPresetFilters: async (token, modelId) => listPresetFiltersByModel(token, modelId),
  };
};
