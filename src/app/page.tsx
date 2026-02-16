import Hero from '@/components/home/Hero';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Inkai || NextSaaS',
};

const page = () => {
  return (
    <main className="space-y-10 bg-white">
      <Hero />
    </main>
  );
};

export default page;
