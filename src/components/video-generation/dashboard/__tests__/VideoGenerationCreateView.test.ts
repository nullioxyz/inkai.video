import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import VideoGenerationCreateView from '../VideoGenerationCreateView';

vi.mock('@/context/LocaleContext', () => ({
  useLocale: () => ({
    t: (key: string) => {
      const messages: Record<string, string> = {
        'quota.limitReached': 'Limit reached',
        'dashboard.modelUnavailable': 'Model unavailable',
        'dashboard.insufficientBalance': 'Insufficient balance',
      };

      return messages[key] ?? key;
    },
  }),
}));

vi.mock('../PresetSelectionHeader', () => ({
  default: () => createElement('div', null, 'Preset selection header'),
}));

vi.mock('../ModelSelector', () => ({
  default: () => createElement('div', null, 'Model selector'),
}));

vi.mock('../../PresetCategoryFilter', () => ({
  default: () => createElement('div', null, 'Category filter'),
}));

vi.mock('../PresetScrollHint', () => ({
  default: () => createElement('div', null, 'Preset scroll hint'),
}));

vi.mock('../PresetGridSection', () => ({
  default: () => createElement('div', null, 'Preset grid'),
}));

vi.mock('../../UploadAndTitleSection', () => ({
  default: () => createElement('div', null, 'Upload and title'),
}));

describe('VideoGenerationCreateView', () => {
  it('renders model and preset flow without credits summary', () => {
    const html = renderToStaticMarkup(
      createElement(VideoGenerationCreateView, {
        isTransitioning: false,
        models: [],
        selectedModelId: '1',
        onSelectModel: () => undefined,
        presetCategories: ['arm'],
        selectedCategory: 'arm',
        onSelectCategory: () => undefined,
        loadingPresets: false,
        presetsError: null,
        filteredPresets: [],
        selectedPresetId: '2',
        onSelectPreset: () => undefined,
        isGenerating: false,
        disabledReason: null,
        generationErrorMessage: null,
        estimateErrorMessage: null,
        emptyPresetsMessage: null,
        hasInsufficientBalance: false,
        generateButtonLabel: 'Generate',
        onGenerate: () => undefined,
        canGenerate: true,
      }),
    );

    expect(html).toContain('Model selector');
    expect(html).toContain('Preset grid');
    expect(html).not.toContain('Credits summary');
  });

  it('keeps estimate and balance errors visible without the removed summary panel', () => {
    const html = renderToStaticMarkup(
      createElement(VideoGenerationCreateView, {
        isTransitioning: false,
        models: [],
        selectedModelId: '1',
        onSelectModel: () => undefined,
        presetCategories: [],
        selectedCategory: '',
        onSelectCategory: () => undefined,
        loadingPresets: false,
        presetsError: null,
        filteredPresets: [],
        selectedPresetId: null,
        onSelectPreset: () => undefined,
        isGenerating: false,
        disabledReason: 'insufficient_balance',
        generationErrorMessage: 'Generation failed',
        estimateErrorMessage: 'Estimate failed',
        emptyPresetsMessage: null,
        hasInsufficientBalance: true,
        generateButtonLabel: 'Generate',
        onGenerate: () => undefined,
        canGenerate: false,
      }),
    );

    expect(html).toContain('Estimate failed');
    expect(html).toContain('Insufficient balance');
    expect(html).toContain('Generation failed');
  });
});
