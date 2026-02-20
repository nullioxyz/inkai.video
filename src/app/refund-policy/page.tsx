'use client';

import { useLocale } from '@/context/LocaleContext';

const RefundPolicyPage = () => {
  const { t } = useLocale();

  const points = [t('refund.point1'), t('refund.point2'), t('refund.point3'), t('refund.point4')];

  return (
    <main className="bg-background-3 dark:bg-background-7 min-h-screen">
      <section className="main-container px-5 py-16 md:py-24">
        <div className="mx-auto max-w-4xl space-y-8">
          <header className="space-y-4">
            <h1 className="text-heading-3 text-secondary dark:text-accent">{t('refund.title')}</h1>
            <p className="text-tagline-1 text-secondary/70 dark:text-accent/70">{t('refund.subtitle')}</p>
          </header>

          <div className="space-y-4">
            <h2 className="text-heading-6 text-secondary dark:text-accent">{t('refund.eligibilityTitle')}</h2>
            <ul className="space-y-2">
              {points.map((point) => (
                <li key={point} className="text-tagline-1 text-secondary/80 dark:text-accent/80">
                  • {point}
                </li>
              ))}
            </ul>
          </div>

          <article className="space-y-2">
            <h2 className="text-heading-6 text-secondary dark:text-accent">{t('refund.requestTitle')}</h2>
            <p className="text-tagline-1 text-secondary/80 dark:text-accent/80">{t('refund.requestText')}</p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default RefundPolicyPage;
