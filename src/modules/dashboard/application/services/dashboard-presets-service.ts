import { mapModelToViewModel, mapPresetToViewModel } from '@/modules/presets/application/mappers';
import { PresetsGateway } from '@/modules/presets/domain/contracts';
import { ModelItem, PresetItem } from '@/types/dashboard';

export interface DashboardGenerationCatalogSnapshot {
  models: ModelItem[];
  presetsByModelId: Record<string, PresetItem[]>;
  presetCategoriesByModelId: Record<string, string[]>;
}

export const buildPresetCategories = (
  presets: PresetItem[],
  presetFilters: { aspect_ratios: string[]; tags: Array<{ slug: string }> },
): string[] => {
  const categoriesFromFilters = [...presetFilters.tags.map((tag) => tag.slug), ...presetFilters.aspect_ratios]
    .filter((category) => category.trim() !== '');

  const categoriesFromPresets = presets.flatMap((preset) => {
    const tags = preset.tags ?? [];
    return tags.length ? tags.map((tag) => tag.slug) : [preset.category];
  });

  return Array.from(new Set([...categoriesFromFilters, ...categoriesFromPresets]));
};

export const fetchDashboardGenerationCatalog = async (
  gateway: PresetsGateway,
  token: string,
): Promise<DashboardGenerationCatalogSnapshot> => {
  const modelRows = await gateway.listModels(token);
  const models = modelRows
    .map(mapModelToViewModel)
    .filter((model) => model.publicVisible)
    .sort((left, right) => {
      if (left.sortOrder !== right.sortOrder) {
        return left.sortOrder - right.sortOrder;
      }

      return left.name.localeCompare(right.name);
    });

  const entries = await Promise.all(
    models.map(async (model) => {
      const [presetRows, presetFilters] = await Promise.all([
        gateway.listPresets(token, model.backendModelId),
        gateway.listPresetFilters(token, model.backendModelId),
      ]);
      const presets = presetRows.map(mapPresetToViewModel);

      return {
        modelId: model.id,
        presets,
        presetCategories: buildPresetCategories(presets, presetFilters),
      };
    }),
  );

  const presetsByModelId = Object.fromEntries(entries.map((entry) => [entry.modelId, entry.presets]));
  const presetCategoriesByModelId = Object.fromEntries(entries.map((entry) => [entry.modelId, entry.presetCategories]));

  return {
    models,
    presetsByModelId,
    presetCategoriesByModelId,
  };
};
