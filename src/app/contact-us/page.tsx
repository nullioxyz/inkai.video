import ContactUsPageContent from '@/components/contact-page/ContactUsPageContent';
import { seoApi } from '@/lib/api/public-content';
import { resolveServerApiLocale } from '@/lib/locale/resolve-server-locale';
import { buildSeoMetadata } from '@/lib/seo/metadata';
import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await resolveServerApiLocale();

  try {
    const seo = await seoApi.show('contact-us', locale);
    return buildSeoMetadata(seo, {
      fallbackTitle: 'Contact Us | Inkai',
    });
  } catch {
    return buildSeoMetadata(null, {
      fallbackTitle: 'Contact Us | Inkai',
    });
  }
};

const ContactUsPage = () => {
  return <ContactUsPageContent />;
};

export default ContactUsPage;
