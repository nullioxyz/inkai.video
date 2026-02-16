import Client from '@/components/pricing/Client';
import Faq from '@/components/pricing/Faq';
import Pricing from '@/components/pricing/Pricing';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Pricing - AI Application || NextSaaS',
};

const page = () => {
  return (
    <main className="bg-background-1 dark:bg-background-6">
      <Pricing />
      <Client />
      <Faq />
      <CTAV1
        className="dark:bg-background-5 bg-background-1"
        badgeText="Get started"
        badgeClass="!badge-yellow-v2"
        ctaHeading="Build a complete website using the assistance"
        description="Start your free trial today and see your ideas come to life easily and creatively."
        ctaBtnText="Get started"
      />
    </main>
  );
};

export default page;
