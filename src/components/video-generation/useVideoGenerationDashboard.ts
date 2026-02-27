'use client';

import type { VideoJobItem, PresetItem } from '@/types/dashboard';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useVideoGenerationForm } from './context/VideoGenerationFormContext';

interface GenerateVideoPayload {
  title: string;
  imageFile: File;
  imageSrc: string;
  format: string;
  prompt: string;
  preset: PresetItem;
}

interface UseVideoGenerationDashboardArgs {
  presets: PresetItem[];
  presetCategories: string[];
  onGenerateVideo: (payload: GenerateVideoPayload) => Promise<VideoJobItem>;
  animateInTrigger?: number;
}

interface UiState {
  isTransitioning: boolean;
  previewVideo: VideoJobItem | null;
  isEnteringFromDetail: boolean;
  selectedCategory: string | null;
  selectedPresetId: string | null;
}

type UiAction =
  | { type: 'set_transitioning'; payload: boolean }
  | { type: 'set_preview'; payload: VideoJobItem | null }
  | { type: 'set_entering'; payload: boolean }
  | { type: 'set_category'; payload: string | null }
  | { type: 'set_preset'; payload: string | null }
  | { type: 'reset_creation' };

const initialUiState: UiState = {
  isTransitioning: false,
  previewVideo: null,
  isEnteringFromDetail: false,
  selectedCategory: null,
  selectedPresetId: null,
};

const uiReducer = (state: UiState, action: UiAction): UiState => {
  switch (action.type) {
    case 'set_transitioning':
      return { ...state, isTransitioning: action.payload };
    case 'set_preview':
      return { ...state, previewVideo: action.payload };
    case 'set_entering':
      return { ...state, isEnteringFromDetail: action.payload };
    case 'set_category':
      return { ...state, selectedCategory: action.payload };
    case 'set_preset':
      return { ...state, selectedPresetId: action.payload };
    case 'reset_creation':
      return { ...state, previewVideo: null, isTransitioning: false };
    default:
      return state;
  }
};

export const useVideoGenerationDashboard = ({
  presets,
  presetCategories,
  onGenerateVideo,
  animateInTrigger = 0,
}: UseVideoGenerationDashboardArgs) => {
  const [uiState, dispatch] = useReducer(uiReducer, initialUiState);
  const form = useVideoGenerationForm();

  useEffect(() => {
    if (presetCategories.length === 0) {
      dispatch({ type: 'set_category', payload: null });
      return;
    }

    if (!uiState.selectedCategory || !presetCategories.includes(uiState.selectedCategory)) {
      dispatch({ type: 'set_category', payload: presetCategories[0] });
    }
  }, [presetCategories, uiState.selectedCategory]);

  const filteredPresets = useMemo(() => {
    if (!uiState.selectedCategory) {
      return presets;
    }

    return presets.filter((preset) => {
      const tags = preset.tags ?? [];
      if (tags.length) {
        return tags.some((tag) => tag.slug === uiState.selectedCategory);
      }
      return preset.category === uiState.selectedCategory;
    });
  }, [presets, uiState.selectedCategory]);

  const selectedPreset = useMemo(() => {
    return presets.find((preset) => preset.id === uiState.selectedPresetId) ?? filteredPresets[0] ?? null;
  }, [filteredPresets, presets, uiState.selectedPresetId]);

  useEffect(() => {
    if (filteredPresets.length === 0) {
      dispatch({ type: 'set_preset', payload: null });
      return;
    }

    const isCurrentCategoryPreset = filteredPresets.some((preset) => preset.id === uiState.selectedPresetId);
    if (!isCurrentCategoryPreset) {
      dispatch({ type: 'set_preset', payload: filteredPresets[0].id });
    }
  }, [filteredPresets, uiState.selectedPresetId]);

  useEffect(() => {
    if (animateInTrigger === 0) {
      return;
    }

    dispatch({ type: 'set_entering', payload: true });
    const raf = window.requestAnimationFrame(() => {
      dispatch({ type: 'set_entering', payload: false });
    });

    return () => window.cancelAnimationFrame(raf);
  }, [animateInTrigger]);

  const handleGenerate = useCallback(async () => {
    if (!form.inputImageSrc || !form.inputImageFile || !selectedPreset || uiState.isTransitioning || uiState.previewVideo) {
      return;
    }

    form.setError(null);
    dispatch({ type: 'set_transitioning', payload: true });

    try {
      const createdVideo = await onGenerateVideo({
        title: form.title.trim() || selectedPreset.name,
        imageFile: form.inputImageFile,
        imageSrc: form.inputImageSrc,
        format: selectedPreset.aspectRatio ?? '9:16',
        prompt: selectedPreset.description,
        preset: selectedPreset,
      });

      dispatch({ type: 'set_preview', payload: createdVideo });
    } catch (error) {
      form.setError(error instanceof Error ? error.message : 'Falha ao gerar vídeo.');
    } finally {
      window.setTimeout(() => {
        dispatch({ type: 'set_transitioning', payload: false });
      }, 280);
    }
  }, [form, onGenerateVideo, selectedPreset, uiState.isTransitioning, uiState.previewVideo]);

  const handleResetCreation = useCallback(() => {
    dispatch({ type: 'reset_creation' });
    form.setError(null);
    form.reset();
  }, [form]);

  return {
    ...uiState,
    selectedPreset,
    filteredPresets,
    canGenerate: Boolean(form.inputImageSrc && form.inputImageFile && selectedPreset),
    errorMessage: form.errorMessage,
    setSelectedCategory: (value: string | null) => dispatch({ type: 'set_category', payload: value }),
    setSelectedPresetId: (value: string | null) => dispatch({ type: 'set_preset', payload: value }),
    handleGenerate,
    handleResetCreation,
  };
};
