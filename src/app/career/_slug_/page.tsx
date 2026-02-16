import CareerDetailsBody from '@/components/career/CareerDetailsBody';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import getMarkDownData from '@/utils/getMarkDownData';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const careers = getMarkDownData('src/data/career');
  return careers.map((career) => ({
    slug: career.slug,
  }));
}

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Career Details - AI Application || NextSaaS',
};

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  return (
    <main className="bg-background-3 dark:bg-background-7">
      <CareerDetailsBody slug={slug} />
      <CTAV1
        className="dark:bg-background-5 bg-white"
        badgeClass="!badge-yellow-v2"
        badgeText="Get Started"
        ctaHeading="Build a complete website using the assistance"
        description="Start your free trial today and see your ideas come to life easily and creatively."
        ctaBtnText="Get started"
      />
    </main>
  );
};

export default page;
