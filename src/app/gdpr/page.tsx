'use client';

import { useLocale } from '@/context/LocaleContext';

const GdprPage = () => {
  const { t } = useLocale();

  const rights = [t('gdpr.r1'), t('gdpr.r2'), t('gdpr.r3'), t('gdpr.r4')];

  return (
    <main className="bg-background-3 dark:bg-background-7 min-h-screen">
      <section className="main-container px-5 py-16 md:py-24">
        <div className="mx-auto max-w-4xl space-y-8">
          <header className="space-y-4">
            <h1 className="text-heading-3 text-secondary dark:text-accent">{t('gdpr.title')}</h1>
            <p className="text-tagline-1 text-secondary/70 dark:text-accent/70">{t('gdpr.subtitle')}</p>
          </header>

          <article className="space-y-2">
            <h2 className="text-heading-6 text-secondary dark:text-accent">{t('gdpr.commitmentTitle')}</h2>
            <p className="text-tagline-1 text-secondary/80 dark:text-accent/80">{t('gdpr.commitmentText')}</p>
          </article>

          <div className="space-y-4">
            <h2 className="text-heading-6 text-secondary dark:text-accent">{t('gdpr.rightsTitle')}</h2>
            <ul className="space-y-2">
              {rights.map((right) => (
                <li key={right} className="text-tagline-1 text-secondary/80 dark:text-accent/80">
                  • {right}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GdprPage;
