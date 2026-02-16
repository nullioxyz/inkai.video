import BlogShowcase from '@/components/blog/BlogShowcase';
import FeaturedBlog from '@/components/blog/FeaturedBlog';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Blog - AI Application || NextSaaS',
};

const page = () => {
  return (
    <main className="bg-background-4 dark:bg-background-9">
      <FeaturedBlog />
      <BlogShowcase />
      <CTAV1
        className="dark:bg-background-7 bg-white"
        badgeClass="!badge-yellow-v2"
        badgeText="Get started"
        ctaHeading="Build a complete website using the assistance"
        description="Start your free trial today and see your ideas come to life easily and creatively."
        ctaBtnText="Get started"
      />
    </main>
  );
};

export default page;
