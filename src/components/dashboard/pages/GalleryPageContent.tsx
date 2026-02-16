'use client';

import PageSectionHeader from '@/components/dashboard/common/PageSectionHeader';
import { useLocale } from '@/context/LocaleContext';
import { GeneratedVideoRecord } from '@/types/dashboard';
import Image from 'next/image';
import Link from 'next/link';

interface GalleryPageContentProps {
  videos: GeneratedVideoRecord[];
}

const GalleryPageContent = ({ videos }: GalleryPageContentProps) => {
  const { t, intlLocale } = useLocale();
  const createdLabel = (isoDate: string) => new Date(isoDate).toLocaleDateString(intlLocale);
  const getRemainingDaysToDelete = (isoDate: string) => {
    const createdAt = new Date(isoDate).getTime();
    const deleteAt = createdAt + 7 * 24 * 60 * 60 * 1000;
    const remaining = Math.ceil((deleteAt - Date.now()) / (24 * 60 * 60 * 1000));
    return Math.max(0, remaining);
  };

  return (
    <section className="space-y-6">
      <PageSectionHeader title={t('gallery.title')} description={t('gallery.description')} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {videos.map((video) => {
          const remainingDays = getRemainingDaysToDelete(video.createdAt);
          return (
            <article
              key={video.id}
              className="border-stroke-3 dark:border-stroke-7 overflow-hidden rounded-[12px] border transition hover:border-primary-400">
              <Link href={`/dashboard/video/${video.id}`} className="group block">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={video.imageSrc}
                    alt={video.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </Link>

              <div className="space-y-2 p-4">
                <div className="flex items-start justify-between gap-3">
                  <Link href={`/dashboard/video/${video.id}`} className="min-w-0 flex-1">
                    <p className="text-tagline-1 text-secondary dark:text-accent truncate font-medium">{video.title}</p>
                  </Link>

                  <a
                    href={video.videoUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-md-v2 btn-secondary-v2 inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-[10px]"
                    aria-label={t('dashboard.downloadVideo')}
                    title={t('dashboard.downloadVideo')}>
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 4v10" />
                      <path d="m8.5 10.5 3.5 3.5 3.5-3.5" />
                      <path d="M4.5 18.5h15" />
                    </svg>
                  </a>
                </div>

                <Link href={`/dashboard/video/${video.id}`} className="block space-y-2">
                  <p className="text-tagline-3 text-secondary/60 dark:text-accent/60">
                    {t('gallery.createdAt')} {createdLabel(video.createdAt)}
                  </p>
                  <p className="text-tagline-3 text-secondary/60 dark:text-accent/60">
                    {t('gallery.deletionIn', {
                      days: String(remainingDays),
                      unit: remainingDays === 1 ? t('settings.day.one') : t('settings.day.other'),
                    })}
                  </p>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default GalleryPageContent;
