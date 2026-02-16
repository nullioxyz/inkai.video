import CTAV1 from '@/components/shared/cta/CTAV1';
import Experience from '@/components/testimonial/Experience';
import Integration from '@/components/testimonial/Integration';
import TestimonialMarquee from '@/components/testimonial/TestimonialMarquee';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Testimonial - AI Application || NextSaaS',
};

const TestimonialTwoPage = () => {
  return (
    <main className="bg-background-3 dark:bg-background-7">
      <TestimonialMarquee />
      <Experience />
      <Integration />
      <CTAV1
        className="dark:bg-background-6 bg-white"
        badgeClass="badge-cyan"
        badgeText="Get started"
        ctaHeading="Build a complete website using the"
        spanText="assistance"
        description="Start your free trial today and see your ideas come to life easily and creatively."
        ctaBtnText="Get started"
      />
    </main>
  );
};
TestimonialTwoPage.displayName = 'TestimonialTwoPage';
export default TestimonialTwoPage;
