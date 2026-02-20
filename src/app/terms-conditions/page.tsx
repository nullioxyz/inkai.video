'use client';

import { useLocale } from '@/context/LocaleContext';

const TermsConditionsPage = () => {
  const { t } = useLocale();

  const sections = [
    { title: t('terms.s1.title'), text: t('terms.s1.text') },
    { title: t('terms.s2.title'), text: t('terms.s2.text') },
    { title: t('terms.s3.title'), text: t('terms.s3.text') },
    { title: t('terms.s4.title'), text: t('terms.s4.text') },
    { title: t('terms.s5.title'), text: t('terms.s5.text') },
  ];

  return (
    <main className="bg-background-3 dark:bg-background-7 min-h-screen">
      <section className="main-container px-5 py-16 md:py-24">
        <div className="mx-auto max-w-4xl space-y-8">
          <header className="space-y-4">
            <h1 className="text-heading-3 text-secondary dark:text-accent">{t('terms.title')}</h1>
            <p className="text-tagline-1 text-secondary/70 dark:text-accent/70">{t('terms.subtitle')}</p>
          </header>

          <div className="space-y-6">
            {sections.map((section) => (
              <article key={section.title} className="space-y-2">
                <h2 className="text-heading-6 text-secondary dark:text-accent">{section.title}</h2>
                <p className="text-tagline-1 text-secondary/80 dark:text-accent/80">{section.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsConditionsPage;
