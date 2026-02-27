'use client';

import { useLocale } from '@/context/LocaleContext';
import DashboardGreeting from '../DashboardGreeting';

interface GenerationViewHeaderProps {
  hasPreviewVideo: boolean;
}

const GenerationViewHeader = ({ hasPreviewVideo }: GenerationViewHeaderProps) => {
  const { t } = useLocale();

  if (hasPreviewVideo) {
    return (
      <header className="text-center">
        <h1 className="text-heading-5 text-secondary dark:text-accent md:text-heading-4 font-normal">
          {t('dashboard.processingTitle')}
        </h1>
      </header>
    );
  }

  return <DashboardGreeting />;
};

export default GenerationViewHeader;
