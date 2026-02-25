'use client';

import { useLocale } from '@/context/LocaleContext';
import { PresetCategory } from '@/types/dashboard';

interface PresetCategoryFilterProps {
  categories: PresetCategory[];
  activeCategory: PresetCategory | '';
  onChange: (category: PresetCategory) => void;
}

const PresetCategoryFilter = ({ categories, activeCategory, onChange }: PresetCategoryFilterProps) => {
  const { t } = useLocale();

  const categoryLabel = (category: PresetCategory) => {
    if (category === 'braço') {
      return t('preset.category.arm');
    }
    if (category === 'costas') {
      return t('preset.category.back');
    }
    if (category === 'pescoço') {
      return t('preset.category.neck');
    }
    if (category === 'pernas') {
      return t('preset.category.legs');
    }
    if (category === 'antebraço') {
      return t('preset.category.forearm');
    }
    if (category === 'peitoral') {
      return t('preset.category.chest');
    }

    return category.replaceAll('-', ' ');
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => {
        const isActive = category === activeCategory;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`text-tagline-2 cursor-pointer rounded-[10px] border px-4 py-2 font-medium capitalize transition ${
              isActive
                ? 'border-background-7 bg-background-7 text-accent shadow-[0_6px_18px_rgba(26,26,28,0.22)] dark:border-background-1 dark:bg-background-1 dark:text-secondary dark:shadow-[0_6px_18px_rgba(252,252,252,0.12)]'
                : 'border-stroke-3 dark:border-stroke-7 text-secondary/70 dark:text-accent/70 bg-transparent hover:border-stroke-4 dark:hover:border-stroke-6 hover:text-secondary dark:hover:text-accent'
            }`}>
            {categoryLabel(category)}
          </button>
        );
      })}
    </div>
  );
};

export default PresetCategoryFilter;
