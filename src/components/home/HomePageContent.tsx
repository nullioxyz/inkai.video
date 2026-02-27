'use client';

import { useInstitutionalContent } from '@/hooks/useInstitutionalContent';
import { useSocialNetworks } from '@/hooks/useSocialNetworks';
import Hero from './Hero';

const HomePageContent = () => {
  const institutional = useInstitutionalContent('initial-page-text');
  const socialNetworks = useSocialNetworks();

  const hasInstitutionalError = Boolean(institutional.error) && !institutional.data;
  const hasSocialError = Boolean(socialNetworks.error) && socialNetworks.data.length === 0;

  return (
    <main className="space-y-10 bg-white">
      <Hero institutionalContent={institutional.data} socialNetworks={socialNetworks.data} />

      {institutional.isNotFound ? (
        <section className="main-container px-5 pb-12">
          <div className="border-stroke-3 dark:border-stroke-7 rounded-xl border p-4 text-center">
            <p className="text-tagline-1 text-secondary/80 dark:text-accent/80">Initial content is currently unavailable.</p>
          </div>
        </section>
      ) : null}

      {hasInstitutionalError || hasSocialError ? (
        <section className="main-container px-5 pb-12">
          <div className="border-stroke-3 dark:border-stroke-7 rounded-xl border p-4 text-center">
            <p className="text-tagline-1 text-secondary/80 dark:text-accent/80">
              {institutional.error || socialNetworks.error || 'Unable to load homepage content right now.'}
            </p>
          </div>
        </section>
      ) : null}
    </main>
  );
};

export default HomePageContent;
