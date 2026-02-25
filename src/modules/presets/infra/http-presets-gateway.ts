import { listModels, listPresetFiltersByModel, listPresetsByModel } from '@/lib/api/dashboard';
import { PresetsGateway } from '../domain/contracts';

export const createHttpPresetsGateway = (): PresetsGateway => {
  return {
    listPresets: async (token, filters) => {
      const models = await listModels(token);
      const rows = await Promise.all(models.map((model) => listPresetsByModel(token, model.id, filters)));
      return rows.flat();
    },
    listPresetFilters: async (token) => {
      const models = await listModels(token);
      const rows = await Promise.all(
        models.map(async (model) => ({
          modelId: model.id,
          filters: await listPresetFiltersByModel(token, model.id),
        })),
      );

      return rows;
    },
  };
};
