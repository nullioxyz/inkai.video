import CareerContent from '@/components/career/CareerContent';
import Features from '@/components/career/Features';
import Positions from '@/components/career/Positions';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Career - AI Application || NextSaaS',
};

const page = () => {
  return (
    <main className="bg-background-3 dark:bg-background-5">
      <CareerContent />
      <Features />
      <Positions />
      <CTAV1
        className="dark:bg-background-6 bg-white"
        badgeClass="badge-green"
        badgeText="Get Started"
        ctaHeading="Ready to start earning with NextSaaS?"
        description="If you have any questions, feel free to reach out to our team."
        ctaBtnText="Get started"
      />
    </main>
  );
};

export default page;
