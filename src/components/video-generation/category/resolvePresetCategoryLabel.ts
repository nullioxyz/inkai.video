import type { MessageKey } from '@/i18n/messages';
import type { PresetCategory } from '@/types/dashboard';

export const resolvePresetCategoryLabel = (category: PresetCategory, t: (key: MessageKey) => string) => {
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
