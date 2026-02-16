import CTAV1 from '@/components/shared/cta/CTAV1';
import FeatureIntro from '@/components/use-case/FeatureIntro';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';
import FinanceAndOperation from '../../components/use-case/FinanceAndOperation';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Use Case - AI Application || NextSaaS',
};

const page = () => {
  return (
    <main className="bg-background-3 dark:bg-background-5">
      <FeatureIntro />
      <FinanceAndOperation />
      <CTAV1
        className="dark:bg-background-5 bg-white"
        badgeClass="!badge-yellow-v2"
        badgeText="Get Started"
        ctaHeading="Ready to start earning with NextSaaS?"
        description="If you have any questions, feel free to reach out to our team."
        ctaBtnText="Get started"
      />
    </main>
  );
};

export default page;
