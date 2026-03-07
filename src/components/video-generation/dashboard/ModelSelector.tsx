'use client';

import { useLocale } from '@/context/LocaleContext';
import type { ModelItem } from '@/types/dashboard';

interface ModelSelectorProps {
  models: ModelItem[];
  selectedModelId: string | null;
  onSelectModel: (modelId: string) => void;
}

const ModelSelector = ({ models, selectedModelId, onSelectModel }: ModelSelectorProps) => {
  const { t } = useLocale();

  if (models.length === 0) {
    return (
      <div className="rounded-[18px] border border-dashed border-ns-red/35 bg-ns-red/5 px-4 py-5 text-center">
        <p className="text-tagline-2 text-ns-red">{t('dashboard.noModelsAvailable')}</p>
      </div>
    );
  }

  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h3 className="text-tagline-1 text-secondary dark:text-accent font-medium">{t('dashboard.chooseModelTitle')}</h3>
        <p className="text-tagline-3 text-secondary/60 dark:text-accent/60">{t('dashboard.chooseModelDescription')}</p>
      </div>

      <div
        data-lenis-prevent="true"
        className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {models.map((model) => {
          const isSelected = model.id === selectedModelId;

          return (
            <button
              key={model.id}
              type="button"
              aria-pressed={isSelected}
              disabled={!model.availableForGeneration}
              onClick={() => onSelectModel(model.id)}
              className={`min-w-[132px] shrink-0 rounded-[14px] border px-3 py-3 text-left transition ${
                isSelected
                  ? 'border-secondary bg-secondary text-accent dark:border-accent dark:bg-accent dark:text-secondary'
                  : 'border-stroke-3 bg-background-1/80 text-secondary hover:border-secondary/40 dark:border-stroke-7 dark:bg-background-6/80 dark:text-accent dark:hover:border-accent/40'
              } disabled:cursor-not-allowed disabled:opacity-50`}>
              <div className="space-y-1">
                <span className="text-tagline-2 block font-medium">{model.name}</span>
                {!model.availableForGeneration ? <p className="text-tagline-3 text-ns-red">{t('dashboard.modelUnavailable')}</p> : null}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ModelSelector;
