import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import ModelSelector from '../ModelSelector';

vi.mock('@/context/LocaleContext', () => ({
  useLocale: () => ({
    t: (key: string) => {
      const messages: Record<string, string> = {
        'dashboard.chooseModelTitle': 'Choose a generation model',
        'dashboard.chooseModelDescription': 'Description',
        'dashboard.modelUnavailable': 'Unavailable',
        'dashboard.noModelsAvailable': 'No models',
      };

      return messages[key] ?? key;
    },
  }),
}));

describe('ModelSelector', () => {
  it('renders available models with metadata', () => {
    const html = renderToStaticMarkup(
      createElement(ModelSelector, {
        models: [
          {
            id: '1',
            backendModelId: 1,
            name: 'Kling',
            slug: 'kling',
            subtitle: '2.5',
            availableForGeneration: true,
            publicVisible: true,
            sortOrder: 1,
          },
        ],
        selectedModelId: '1',
        onSelectModel: () => undefined,
      }),
    );

    expect(html).toContain('Choose a generation model');
    expect(html).toContain('Kling');
    expect(html).not.toContain('2.5');
    expect(html).not.toContain('0.1500');
  });
});
