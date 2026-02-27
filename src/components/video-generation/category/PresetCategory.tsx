'use client';

import { useLocale } from '@/context/LocaleContext';
import type { PresetCategory } from '@/types/dashboard';
import PresetCategoryItem from './PresetCategoryItem';

interface PresetCategoryProps {
  categories: PresetCategory[];
  activeCategory: PresetCategory | '';
  onChange: (category: PresetCategory) => void;
}

const PresetCategory = ({ categories, activeCategory, onChange }: PresetCategoryProps) => {
  const { t } = useLocale();

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <PresetCategoryItem key={category} category={category} active={category === activeCategory} onSelect={onChange} t={t} />
      ))}
    </div>
  );
};

export default PresetCategory;
