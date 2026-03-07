import { BackendModel, BackendPreset } from '@/lib/api/dashboard';
import { ModelItem, PresetItem } from '@/types/dashboard';
import { resolveMediaUrl } from '@/utils/resolveMediaUrl';

const fallbackPresetImage = '/images/ns-img-323.png';

export const mapModelToViewModel = (model: BackendModel): ModelItem => {
  const subtitleParts = [model.version, model.provider_model_key].filter((value): value is string => Boolean(value && value.trim() !== ''));

  return {
    id: String(model.id),
    backendModelId: model.id,
    name: model.name,
    slug: model.slug,
    subtitle: subtitleParts.join(' • ') || model.slug,
    version: model.version,
    providerModelKey: model.provider_model_key ?? null,
    costPerSecondUsd: model.cost_per_second_usd ?? null,
    availableForGeneration: model.available_for_generation ?? model.active,
    publicVisible: model.public_visible ?? true,
    sortOrder: model.sort_order ?? 0,
  };
};

export const mapPresetToViewModel = (preset: BackendPreset): PresetItem => {
  const tags = preset.tags ?? [];
  const previewImageUrl = resolveMediaUrl(preset.preview_image_url);
  const previewVideoUrl = resolveMediaUrl(preset.preview_video_url);

  return {
    id: String(preset.id),
    category: tags[0]?.slug ?? preset.aspect_ratio ?? 'geral',
    tags,
    name: preset.name,
    description: preset.prompt || 'Sem descrição',
    imageSrc: previewImageUrl ?? fallbackPresetImage,
    previewImageUrl,
    backendModelId: preset.default_model_id,
    backendPresetId: preset.id,
    aspectRatio: preset.aspect_ratio,
    durationSeconds: preset.duration_seconds,
    previewVideoUrl,
  };
};
