import Features from '@/components/services/Features';
import Services from '@/components/services/Services';
import ServicesV2 from '@/components/services/ServicesV2';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Services - AI Application || NextSaaS',
};

const page = () => {
  return (
    <main className="bg-background-1 dark:bg-background-6">
      <Services />
      <ServicesV2 />
      <Features />
      <CTAV1
        className="dark:bg-background-6 bg-white"
        badgeClass="hidden"
        ctaHeading="Build a complete website using the"
        spanText="assistance"
        description="Start your free trial today and see your ideas come to life easily and creatively."
        ctaBtnText="Get started"
      />
    </main>
  );
};

export default page;
