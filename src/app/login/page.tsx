import LoginHero from '@/components/authentication/LoginHero';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Login - Inkai || NextSaaS',
};

const page = () => {
  return (
    <main className="dark bg-background-7">
      <LoginHero />
    </main>
  );
};
export default page;
