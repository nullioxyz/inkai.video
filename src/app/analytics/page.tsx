import AnalyticsDetails from '@/components/analytics/AnalyticsDetails';
import AnalyticsHero from '@/components/analytics/AnalyticsHero';
import AnalyticsTestimonial from '@/components/analytics/AnalyticsTestimonial';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Analytics - AI Application || NextSaaS',
};

const page = () => {
  return (
    <main className="bg-background-3 dark:bg-background-7">
      <AnalyticsHero />
      <AnalyticsDetails />
      <AnalyticsTestimonial />
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

export default page;
