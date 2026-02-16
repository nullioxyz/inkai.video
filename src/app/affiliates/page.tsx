import AffiliateProcess from '@/components/affiliates/AffiliateProcess';
import AffiliateProgram from '@/components/affiliates/AffiliateProgram';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Affiliates - AI Application || NextSaaS',
};

const page = () => {
  return (
    <main className="bg-background-3 dark:bg-background-7">
      <AffiliateProgram />
      <AffiliateProcess />
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
