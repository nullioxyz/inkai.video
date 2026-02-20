'use client';

import { useLocale } from '@/context/LocaleContext';

const AboutPage = () => {
  const { t } = useLocale();

  return (
    <main className="bg-background-3 dark:bg-background-7 min-h-screen">
      <section className="main-container px-5 py-16 md:py-24">
        <div className="mx-auto max-w-4xl space-y-8">
          <header className="space-y-4">
            <h1 className="text-heading-3 text-secondary dark:text-accent">{t('about.title')}</h1>
            <p className="text-tagline-1 text-secondary/70 dark:text-accent/70">{t('about.subtitle')}</p>
          </header>

          <div className="grid gap-4 md:grid-cols-3">
            <article className="border-stroke-3 dark:border-stroke-7 rounded-[10px] border p-4">
              <h2 className="text-tagline-1 text-secondary dark:text-accent font-medium">{t('about.card1.title')}</h2>
              <p className="text-tagline-2 text-secondary/70 dark:text-accent/70 mt-2">{t('about.card1.text')}</p>
            </article>
            <article className="border-stroke-3 dark:border-stroke-7 rounded-[10px] border p-4">
              <h2 className="text-tagline-1 text-secondary dark:text-accent font-medium">{t('about.card2.title')}</h2>
              <p className="text-tagline-2 text-secondary/70 dark:text-accent/70 mt-2">{t('about.card2.text')}</p>
            </article>
            <article className="border-stroke-3 dark:border-stroke-7 rounded-[10px] border p-4">
              <h2 className="text-tagline-1 text-secondary dark:text-accent font-medium">{t('about.card3.title')}</h2>
              <p className="text-tagline-2 text-secondary/70 dark:text-accent/70 mt-2">{t('about.card3.text')}</p>
            </article>
          </div>

          <div className="space-y-4">
            <p className="text-tagline-1 text-secondary/80 dark:text-accent/80">{t('about.body1')}</p>
            <p className="text-tagline-1 text-secondary/80 dark:text-accent/80">{t('about.body2')}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
