export interface PresetPreviewState {
  isHovering: boolean;
  previewVideoFailed: boolean;
}

export const initialPresetPreviewState: PresetPreviewState = {
  isHovering: false,
  previewVideoFailed: false,
};

export const resolveHasPreviewVideo = (previewVideoUrl?: string | null, previewVideoFailed = false) => {
  return Boolean(previewVideoUrl) && !previewVideoFailed;
};

export const onPresetPreviewVideoCanPlay = (state: PresetPreviewState): PresetPreviewState => {
  return { ...state, previewVideoFailed: false };
};

export const onPresetPreviewVideoError = (state: PresetPreviewState): PresetPreviewState => {
  return { ...state, isHovering: false, previewVideoFailed: true };
};
