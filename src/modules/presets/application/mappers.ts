import { BackendPreset } from '@/lib/api/dashboard';
import { PresetItem } from '@/types/dashboard';
import { resolveMediaUrl } from '@/utils/resolveMediaUrl';

const fallbackPresetImage = '/images/ns-img-323.png';

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
