import ProcessOperation from '@/components/process/ProcessOperation';
import ProcessStep from '@/components/process/ProcessStep';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Process - AI Application || NextSaaS',
};

const Process02 = () => {
  return (
    <main className="bg-background-3 dark:bg-background-7">
      <ProcessStep />
      <ProcessOperation />
      <CTAV1
        className="dark:bg-background-5 bg-white"
        badgeText="Get started"
        badgeClass="!badge-cyan-v2"
        ctaHeading="Build a complete website using the assistance"
        description="Start your free trial today and see your ideas come to life easily and creatively."
        ctaBtnText="Get started"
      />
    </main>
  );
};

Process02.displayName = 'Process02';
export default Process02;
