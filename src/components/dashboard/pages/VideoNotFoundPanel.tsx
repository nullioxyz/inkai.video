'use client';

import PageSectionHeader from '@/components/dashboard/common/PageSectionHeader';
import { useLocale } from '@/context/LocaleContext';

const VideoNotFoundPanel = () => {
  const { t } = useLocale();

  return (
    <section className="border-stroke-3 dark:border-stroke-7 bg-background-1 dark:bg-background-6 shadow-1 rounded-[12px] border p-5">
      <PageSectionHeader title={t('video.notFoundTitle')} description={t('video.notFoundDescription')} />
    </section>
  );
};

export default VideoNotFoundPanel;
