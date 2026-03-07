'use client';

import { useLocale } from '@/context/LocaleContext';
import { resolveGenerateActionState } from '@/modules/videos/application/generation-action-state';
import type { GenerationEstimate, ModelItem, PresetItem, VideoJobItem } from '@/types/dashboard';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { useVideoGenerationForm } from './context/VideoGenerationFormContext';

const FIXED_VIDEO_DURATION_SECONDS = 5;

interface GenerateVideoPayload {
  title: string;
  imageFile: File;
  imageSrc: string;
  model: ModelItem;
  preset: PresetItem;
  durationSeconds?: number | null;
  estimatedCreditsRequired?: number;
  estimatedGenerationCostUsd?: string | null;
}

interface UseVideoGenerationDashboardArgs {
  models: ModelItem[];
  presetsByModelId: Record<string, PresetItem[]>;
  presetCategoriesByModelId: Record<string, string[]>;
  creditBalance: number;
  quotaReached: boolean;
  onEstimateVideo: (payload: { model: ModelItem; preset: PresetItem; durationSeconds?: number | null }) => Promise<GenerationEstimate>;
  onGenerateVideo: (payload: GenerateVideoPayload) => Promise<VideoJobItem>;
  animateInTrigger?: number;
}

interface UiState {
  isTransitioning: boolean;
  previewVideo: VideoJobItem | null;
  isEnteringFromDetail: boolean;
  selectedModelId: string | null;
  selectedCategory: string | null;
  selectedPresetId: string | null;
}

type UiAction =
  | { type: 'set_transitioning'; payload: boolean }
  | { type: 'set_preview'; payload: VideoJobItem | null }
  | { type: 'set_entering'; payload: boolean }
  | { type: 'set_model'; payload: string | null }
  | { type: 'set_category'; payload: string | null }
  | { type: 'set_preset'; payload: string | null }
  | { type: 'reset_creation' };

const initialUiState: UiState = {
  isTransitioning: false,
  previewVideo: null,
  isEnteringFromDetail: false,
  selectedModelId: null,
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
    case 'set_model':
      return { ...state, selectedModelId: action.payload };
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
  models,
  presetsByModelId,
  presetCategoriesByModelId,
  creditBalance,
  quotaReached,
  onEstimateVideo,
  onGenerateVideo,
  animateInTrigger = 0,
}: UseVideoGenerationDashboardArgs) => {
  const [uiState, dispatch] = useReducer(uiReducer, initialUiState);
  const [estimate, setEstimate] = useState<GenerationEstimate | null>(null);
  const [isEstimating, setIsEstimating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [estimateErrorMessage, setEstimateErrorMessage] = useState<string | null>(null);
  const { t } = useLocale();
  const form = useVideoGenerationForm();
  const defaultModel = useMemo(() => models.find((model) => model.availableForGeneration) ?? models[0] ?? null, [models]);

  const selectedModel = useMemo(() => {
    return models.find((model) => model.id === uiState.selectedModelId) ?? defaultModel;
  }, [defaultModel, models, uiState.selectedModelId]);

  const modelPresets = useMemo(() => {
    if (!selectedModel) {
      return [];
    }

    return presetsByModelId[selectedModel.id] ?? [];
  }, [presetsByModelId, selectedModel]);

  const modelPresetCategories = useMemo(() => {
    if (!selectedModel) {
      return [];
    }

    return presetCategoriesByModelId[selectedModel.id] ?? [];
  }, [presetCategoriesByModelId, selectedModel]);

  useEffect(() => {
    if (models.length === 0) {
      dispatch({ type: 'set_model', payload: null });
      return;
    }

    if ((!uiState.selectedModelId || !models.some((model) => model.id === uiState.selectedModelId)) && defaultModel) {
      dispatch({ type: 'set_model', payload: defaultModel.id });
    }
  }, [defaultModel, models, uiState.selectedModelId]);

  useEffect(() => {
    if (modelPresetCategories.length === 0) {
      dispatch({ type: 'set_category', payload: null });
      return;
    }

    if (!uiState.selectedCategory || !modelPresetCategories.includes(uiState.selectedCategory)) {
      dispatch({ type: 'set_category', payload: modelPresetCategories[0] });
    }
  }, [modelPresetCategories, uiState.selectedCategory]);

  const filteredPresets = useMemo(() => {
    if (!uiState.selectedCategory) {
      return modelPresets;
    }

    return modelPresets.filter((preset) => {
      const tags = preset.tags ?? [];
      if (tags.length) {
        return tags.some((tag) => tag.slug === uiState.selectedCategory);
      }
      return preset.category === uiState.selectedCategory;
    });
  }, [modelPresets, uiState.selectedCategory]);

  const selectedPreset = useMemo(() => {
    return modelPresets.find((preset) => preset.id === uiState.selectedPresetId) ?? filteredPresets[0] ?? null;
  }, [filteredPresets, modelPresets, uiState.selectedPresetId]);

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
    if (form.durationSeconds === FIXED_VIDEO_DURATION_SECONDS) {
      return;
    }

    form.setDurationSeconds(FIXED_VIDEO_DURATION_SECONDS);
  }, [form.durationSeconds, form.setDurationSeconds]);

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

  useEffect(() => {
    if (!selectedModel || !selectedPreset || form.durationSeconds === null || form.durationSeconds === undefined || form.durationSeconds < 1) {
      setEstimate(null);
      setEstimateErrorMessage(null);
      setIsEstimating(false);
      return;
    }

    let cancelled = false;

    setEstimate(null);
    setEstimateErrorMessage(null);
    setIsEstimating(true);

    void onEstimateVideo({
      model: selectedModel,
      preset: selectedPreset,
      durationSeconds: form.durationSeconds,
    })
      .then((nextEstimate) => {
        if (cancelled) {
          return;
        }

        setEstimate(nextEstimate);
      })
      .catch((error) => {
        if (cancelled) {
          return;
        }

        setEstimate(null);
        setEstimateErrorMessage(error instanceof Error ? error.message : 'Falha ao calcular custo da geração.');
      })
      .finally(() => {
        if (cancelled) {
          return;
        }

        setIsEstimating(false);
      });

    return () => {
      cancelled = true;
    };
  }, [form.durationSeconds, onEstimateVideo, selectedModel, selectedPreset]);

  const actionState = useMemo(
    () =>
      resolveGenerateActionState({
        hasInputImage: Boolean(form.inputImageSrc && form.inputImageFile),
        hasSelectedModel: Boolean(selectedModel),
        hasSelectedPreset: Boolean(selectedPreset),
        hasValidDuration: form.durationSeconds !== null && form.durationSeconds !== undefined && form.durationSeconds >= 1 && form.durationSeconds <= 300,
        modelAvailable: selectedModel?.availableForGeneration ?? false,
        quotaReached,
        isEstimating,
        isGenerating: isGenerating || uiState.isTransitioning,
        estimate,
        creditBalance,
      }),
    [
      creditBalance,
      estimate,
      form.durationSeconds,
      form.inputImageFile,
      form.inputImageSrc,
      isEstimating,
      isGenerating,
      quotaReached,
      selectedModel,
      selectedPreset,
      uiState.isTransitioning,
    ],
  );

  const handleGenerate = useCallback(async () => {
    if (
      !form.inputImageSrc ||
      !form.inputImageFile ||
      !selectedModel ||
      !selectedPreset ||
      !actionState.canGenerate ||
      uiState.previewVideo
    ) {
      return;
    }

    form.setError(null);
    setIsGenerating(true);
    dispatch({ type: 'set_transitioning', payload: true });

    try {
      const createdVideo = await onGenerateVideo({
        title: form.title.trim() || selectedPreset.name,
        imageFile: form.inputImageFile,
        imageSrc: form.inputImageSrc,
        model: selectedModel,
        preset: selectedPreset,
        durationSeconds: FIXED_VIDEO_DURATION_SECONDS,
        estimatedCreditsRequired: estimate?.creditsRequired,
        estimatedGenerationCostUsd: estimate?.estimatedGenerationCostUsd,
      });

      dispatch({ type: 'set_preview', payload: createdVideo });
    } catch (error) {
      form.setError(error instanceof Error ? error.message : 'Falha ao gerar vídeo.');
    } finally {
      setIsGenerating(false);
      window.setTimeout(() => {
        dispatch({ type: 'set_transitioning', payload: false });
      }, 280);
    }
  }, [actionState.canGenerate, estimate, form, onGenerateVideo, selectedModel, selectedPreset, uiState.previewVideo]);

  const handleResetCreation = useCallback(() => {
    dispatch({ type: 'reset_creation' });
    setEstimate(null);
    setEstimateErrorMessage(null);
    setIsEstimating(false);
    setIsGenerating(false);
    form.setError(null);
    form.reset();
  }, [form]);

  const emptyPresetsMessage =
    selectedModel && modelPresets.length === 0 ? t('dashboard.noPresetsForModel', { model: selectedModel.name }) : null;

  const generateButtonLabel = isGenerating
    ? t('dashboard.generatingButton')
    : isEstimating
      ? t('dashboard.calculatingEstimate')
      : t('dashboard.generateVideo');

  return {
    ...uiState,
    selectedModel,
    selectedPreset,
    filteredPresets,
    isGenerating,
    disabledReason: actionState.disabledReason,
    generationErrorMessage: form.errorMessage,
    estimateErrorMessage,
    canGenerate: actionState.canGenerate,
    hasInsufficientBalance: actionState.hasInsufficientBalance,
    emptyPresetsMessage,
    generateButtonLabel,
    setSelectedModelId: (value: string | null) => {
      form.setError(null);
      dispatch({ type: 'set_model', payload: value });
    },
    setSelectedCategory: (value: string | null) => {
      form.setError(null);
      dispatch({ type: 'set_category', payload: value });
    },
    setSelectedPresetId: (value: string | null) => {
      form.setError(null);
      dispatch({ type: 'set_preset', payload: value });
    },
    handleGenerate,
    handleResetCreation,
  };
};
