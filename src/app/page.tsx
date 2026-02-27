import HomePageContent from '@/components/home/HomePageContent';
import { seoApi } from '@/lib/api/public-content';
import { resolveServerApiLocale } from '@/lib/locale/resolve-server-locale';
import { buildSeoMetadata } from '@/lib/seo/metadata';
import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await resolveServerApiLocale();

  try {
    const seo = await seoApi.show('home', locale);
    return buildSeoMetadata(seo, {
      fallbackTitle: 'Inkai',
    });
  } catch {
    return buildSeoMetadata(null, {
      fallbackTitle: 'Inkai',
    });
  }
};

const page = () => {
  return <HomePageContent />;
};

export default page;
