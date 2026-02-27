import InstitutionalPageContent from '@/components/institutional/InstitutionalPageContent';
import { seoApi } from '@/lib/api/public-content';
import { resolveServerApiLocale } from '@/lib/locale/resolve-server-locale';
import { buildSeoMetadata } from '@/lib/seo/metadata';
import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await resolveServerApiLocale();

  try {
    const seo = await seoApi.show('about', locale);
    return buildSeoMetadata(seo, {
      fallbackTitle: 'About | Inkai',
    });
  } catch {
    return buildSeoMetadata(null, {
      fallbackTitle: 'About | Inkai',
    });
  }
};

const AboutPage = () => {
  return (
    <InstitutionalPageContent
      slug="about"
      emptyTitle="About content unavailable"
      emptyDescription="This institutional section is not available right now."
    />
  );
};

export default AboutPage;
