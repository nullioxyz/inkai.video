'use client';

import { useLocale } from '@/context/LocaleContext';

const PresetSelectionHeader = () => {
  const { t } = useLocale();

  return (
    <div className="space-y-2 text-center">
      <h2 className="text-heading-6 text-secondary dark:text-accent font-medium">{t('dashboard.choosePresetTitle')}</h2>
      <p className="text-tagline-2 text-secondary/60 dark:text-accent/60">{t('dashboard.choosePresetDescription')}</p>
    </div>
  );
};

export default PresetSelectionHeader;
