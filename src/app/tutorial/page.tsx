'use client';

import { useLocale } from '@/context/LocaleContext';

const TutorialPage = () => {
  const { t } = useLocale();

  const steps = [t('tutorial.step1'), t('tutorial.step2'), t('tutorial.step3'), t('tutorial.step4')];

  return (
    <main className="bg-background-3 dark:bg-background-7 min-h-screen">
      <section className="main-container px-5 py-16 md:py-24">
        <div className="mx-auto max-w-4xl space-y-8">
          <header className="space-y-4 text-center">
            <h1 className="text-heading-3 text-secondary dark:text-accent">{t('tutorial.title')}</h1>
            <p className="text-tagline-1 text-secondary/70 dark:text-accent/70">{t('tutorial.subtitle')}</p>
          </header>

          <div className="border-stroke-3 dark:border-stroke-7 overflow-hidden rounded-[12px] border">
            <div className="relative aspect-video w-full">
              <video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                controls
                preload="metadata"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-heading-6 text-secondary dark:text-accent">{t('tutorial.stepsTitle')}</h2>
            <ol className="space-y-2">
              {steps.map((step, index) => (
                <li key={step} className="text-tagline-1 text-secondary/80 dark:text-accent/80">
                  {index + 1}. {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TutorialPage;
