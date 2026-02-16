import CTAV1 from '@/components/shared/cta/CTAV1';
import Banner from '@/components/tutorial/Banner';
import Blog from '@/components/tutorial/Blog';
import Community from '@/components/tutorial/Community';
import Features from '@/components/tutorial/Features';
import Integration from '@/components/tutorial/Integration';
import Services from '@/components/tutorial/Services';
import Tutorials from '@/components/tutorial/Tutorials';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Tutorial - AI Application || NextSaaS',
};

const Tutorial = () => {
  return (
    <main className="bg-background-3 dark:bg-background-5 overflow-x-hidden">
      <Banner />
      <Blog />
      <Features />
      <Tutorials />
      <Services />
      <Integration />
      <Community />
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

export default Tutorial;
