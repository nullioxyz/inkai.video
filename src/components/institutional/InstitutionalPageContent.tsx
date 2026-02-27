'use client';

import { useInstitutionalContent } from '@/hooks/useInstitutionalContent';

interface InstitutionalPageContentProps {
  slug: string;
  emptyTitle: string;
  emptyDescription: string;
}

const InstitutionalPageContent = ({ slug, emptyTitle, emptyDescription }: InstitutionalPageContentProps) => {
  const { data, error, isLoading, isNotFound } = useInstitutionalContent(slug);

  if (isLoading) {
    return (
      <main className="bg-background-3 dark:bg-background-7 min-h-screen">
        <section className="main-container px-5 py-16 md:py-24">
          <div className="mx-auto max-w-4xl animate-pulse space-y-4">
            <div className="bg-background-4 dark:bg-background-6 h-10 w-2/3 rounded" />
            <div className="bg-background-4 dark:bg-background-6 h-5 w-full rounded" />
            <div className="bg-background-4 dark:bg-background-6 h-5 w-4/5 rounded" />
          </div>
        </section>
      </main>
    );
  }

  if (isNotFound) {
    return (
      <main className="bg-background-3 dark:bg-background-7 min-h-screen">
        <section className="main-container px-5 py-16 md:py-24">
          <div className="mx-auto max-w-4xl space-y-3 text-center">
            <h1 className="text-heading-4 text-secondary dark:text-accent">{emptyTitle}</h1>
            <p className="text-tagline-1 text-secondary/70 dark:text-accent/70">{emptyDescription}</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-background-3 dark:bg-background-7 min-h-screen">
      <section className="main-container px-5 py-16 md:py-24">
        <div className="mx-auto max-w-4xl space-y-6">
          <header className="space-y-3">
            <h1 className="text-heading-3 text-secondary dark:text-accent">{data?.title || emptyTitle}</h1>
            {data?.subtitle ? <p className="text-tagline-1 text-secondary/70 dark:text-accent/70">{data.subtitle}</p> : null}
          </header>

          {data?.short_description ? <p className="text-tagline-1 text-secondary/80 dark:text-accent/80">{data.short_description}</p> : null}

          {data?.description ? <p className="text-tagline-1 text-secondary/80 dark:text-accent/80 whitespace-pre-line">{data.description}</p> : null}

          {error ? <p className="text-tagline-2 text-ns-red">{error}</p> : null}
        </div>
      </section>
    </main>
  );
};

export default InstitutionalPageContent;
