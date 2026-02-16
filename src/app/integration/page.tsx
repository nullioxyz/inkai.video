import Integration from '@/components/integration/Integration';
import Process from '@/components/integration/Process';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Integration - AI Application || NextSaaS',
};

const Integration02 = () => {
  return (
    <main className="bg-background-1 dark:bg-background-6">
      <Integration />
      <Process />
      <CTAV1
        className="dark:bg-background-8 bg-white"
        badgeText="Get started"
        badgeClass="!badge-green"
        ctaHeading="Build a complete website using the assistance"
        description="Start your free trial today and see your ideas come to life easily and creatively."
        ctaBtnText="Get started"
      />
    </main>
  );
};

Integration02.displayName = 'Integration02';
export default Integration02;
