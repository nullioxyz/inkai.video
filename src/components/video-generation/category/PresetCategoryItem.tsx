import type { MessageKey } from '@/i18n/messages';
import type { PresetCategory } from '@/types/dashboard';
import { resolvePresetCategoryLabel } from './resolvePresetCategoryLabel';

interface PresetCategoryItemProps {
  category: PresetCategory;
  active: boolean;
  onSelect: (category: PresetCategory) => void;
  t: (key: MessageKey) => string;
}

const PresetCategoryItem = ({ category, active, onSelect, t }: PresetCategoryItemProps) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(category)}
      className={`text-tagline-2 cursor-pointer rounded-[10px] border px-4 py-2 font-medium capitalize transition ${
        active
          ? 'border-background-7 bg-background-7 text-accent shadow-[0_6px_18px_rgba(26,26,28,0.22)] dark:border-background-1 dark:bg-background-1 dark:text-secondary dark:shadow-[0_6px_18px_rgba(252,252,252,0.12)]'
          : 'border-stroke-3 dark:border-stroke-7 text-secondary/70 dark:text-accent/70 bg-transparent hover:border-stroke-4 dark:hover:border-stroke-6 hover:text-secondary dark:hover:text-accent'
      }`}>
      {resolvePresetCategoryLabel(category, t)}
    </button>
  );
};

export default PresetCategoryItem;
