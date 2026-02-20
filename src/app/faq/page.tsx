'use client';

import { useLocale } from '@/context/LocaleContext';

const FAQPage = () => {
  const { t } = useLocale();

  const items = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
  ];

  return (
    <main className="bg-background-3 dark:bg-background-7 min-h-screen">
      <section className="main-container px-5 py-16 md:py-24">
        <div className="mx-auto max-w-4xl space-y-8">
          <header className="space-y-4 text-center">
            <h1 className="text-heading-3 text-secondary dark:text-accent">{t('faq.title')}</h1>
            <p className="text-tagline-1 text-secondary/70 dark:text-accent/70">{t('faq.subtitle')}</p>
          </header>

          <div className="space-y-3">
            {items.map((item) => (
              <details key={item.q} className="border-stroke-3 dark:border-stroke-7 rounded-[10px] border p-4">
                <summary className="text-tagline-1 text-secondary dark:text-accent cursor-pointer font-medium">{item.q}</summary>
                <p className="text-tagline-2 text-secondary/70 dark:text-accent/70 mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQPage;
