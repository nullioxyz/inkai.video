'use client';

import PageSectionHeader from '@/components/dashboard/common/PageSectionHeader';
import StatusBadge from '@/components/common/StatusBadge';
import { useLocale } from '@/context/LocaleContext';
import { getRemainingCredits, getUsedCredits } from '@/data/dashboard/videos';
import { GeneratedVideoRecord } from '@/types/dashboard';

interface CreditsPageContentProps {
  videos: GeneratedVideoRecord[];
}

const CreditsPageContent = ({ videos }: CreditsPageContentProps) => {
  const { t, intlLocale } = useLocale();
  const usedCredits = getUsedCredits(videos);
  const remainingCredits = getRemainingCredits(videos);
  const createdLabel = (isoDate: string) => new Date(isoDate).toLocaleDateString(intlLocale);

  return (
    <section className="space-y-6">
      <PageSectionHeader title={t('credits.title')} description={t('credits.description')} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <article className="border-stroke-3 dark:border-stroke-7 rounded-[12px] border p-4">
          <p className="text-tagline-3 text-secondary/60 dark:text-accent/60">{t('credits.used')}</p>
          <p className="text-heading-5 text-secondary dark:text-accent font-normal">{usedCredits}</p>
        </article>
        <article className="border-stroke-3 dark:border-stroke-7 rounded-[12px] border p-4">
          <p className="text-tagline-3 text-secondary/60 dark:text-accent/60">{t('credits.remaining')}</p>
          <p className="text-heading-5 text-secondary dark:text-accent font-normal">{remainingCredits}</p>
        </article>
      </div>

      <div className="border-stroke-3 dark:border-stroke-7 overflow-x-auto rounded-[12px] border">
        <table className="min-w-full">
          <thead>
            <tr className="border-stroke-3 dark:border-stroke-7 border-b">
              <th className="text-tagline-3 text-secondary/60 dark:text-accent/60 px-4 py-3 text-left font-medium">{t('credits.table.video')}</th>
              <th className="text-tagline-3 text-secondary/60 dark:text-accent/60 px-4 py-3 text-left font-medium">{t('credits.table.used')}</th>
              <th className="text-tagline-3 text-secondary/60 dark:text-accent/60 px-4 py-3 text-left font-medium">{t('credits.table.status')}</th>
              <th className="text-tagline-3 text-secondary/60 dark:text-accent/60 px-4 py-3 text-left font-medium">{t('credits.table.createdAt')}</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video.id} className="border-stroke-3 dark:border-stroke-7 border-b last:border-0">
                <td className="text-tagline-2 text-secondary dark:text-accent px-4 py-3">{video.title}</td>
                <td className="text-tagline-2 text-secondary dark:text-accent px-4 py-3">{video.creditsUsed}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={video.status} />
                </td>
                <td className="text-tagline-2 text-secondary/70 dark:text-accent/70 px-4 py-3">{createdLabel(video.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CreditsPageContent;
