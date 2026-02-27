'use client';

import PresetCategoryComponent from '@/components/video-generation/category/PresetCategory';
import type { PresetCategory } from '@/types/dashboard';

interface PresetCategoryFilterProps {
  categories: PresetCategory[];
  activeCategory: PresetCategory | '';
  onChange: (category: PresetCategory) => void;
}

const PresetCategoryFilter = ({ categories, activeCategory, onChange }: PresetCategoryFilterProps) => {
  return <PresetCategoryComponent categories={categories} activeCategory={activeCategory} onChange={onChange} />;
};

export default PresetCategoryFilter;
