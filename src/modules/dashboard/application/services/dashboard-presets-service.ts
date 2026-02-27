import { mapPresetToViewModel } from '@/modules/presets/application/mappers';
import { PresetsGateway } from '@/modules/presets/domain/contracts';
import { PresetItem } from '@/types/dashboard';

export interface DashboardPresetsSnapshot {
  presets: PresetItem[];
  presetCategories: string[];
}

export const buildPresetCategories = (
  presets: PresetItem[],
  presetFilters: Array<{ modelId: number; filters: { aspect_ratios: string[]; tags: Array<{ slug: string }> } }>,
): string[] => {
  const categoriesFromFilters = presetFilters
    .flatMap((entry) => [...entry.filters.tags.map((tag) => tag.slug), ...entry.filters.aspect_ratios])
    .filter((category) => category.trim() !== '');

  const categoriesFromPresets = presets.flatMap((preset) => {
    const tags = preset.tags ?? [];
    return tags.length ? tags.map((tag) => tag.slug) : [preset.category];
  });

  return Array.from(new Set([...categoriesFromFilters, ...categoriesFromPresets]));
};

export const fetchDashboardPresets = async (gateway: PresetsGateway, token: string): Promise<DashboardPresetsSnapshot> => {
  const [presetRows, presetFilters] = await Promise.all([gateway.listPresets(token), gateway.listPresetFilters(token)]);
  const presets = presetRows.map(mapPresetToViewModel);

  return {
    presets,
    presetCategories: buildPresetCategories(presets, presetFilters),
  };
};
