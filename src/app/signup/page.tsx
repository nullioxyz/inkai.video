import SignupHero from '@/components/authentication/SignupHero';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Signup - AI Application || NextSaaS',
};

const page = () => {
  return (
    <main className="bg-background-3 dark:bg-background-7">
      <SignupHero />
      <CTAV1
        className="dark:bg-background-6 bg-white"
        badgeClass="badge-yellow-v2"
        badgeText="Get Started"
        ctaHeading="Build a complete website using the assistance"
        description="Start your free trial today and see your ideas come to life easily and creatively."
        ctaBtnText="Get started"
      />
    </main>
  );
};
export default page;
