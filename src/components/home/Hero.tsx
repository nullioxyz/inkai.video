'use client';

import { InstitutionalContent, SocialNetworkItem } from '@/lib/api/public-content';
import HeroBackgroundVideo from './HeroBackgroundVideo';
import HeroContent from './HeroContent';

interface HeroProps {
  institutionalContent?: InstitutionalContent | null;
  socialNetworks?: SocialNetworkItem[];
}

const Hero = ({ institutionalContent, socialNetworks = [] }: HeroProps) => {
  return (
    <section className="dark:bg-background-8 relative z-0 min-h-[100svh] overflow-hidden bg-white">
      <HeroBackgroundVideo />
      <div className="relative z-10 pt-[160px] pb-[140px] max-[641px]:pb-16 max-[426px]:pb-10 sm:pt-[280px]">
        <HeroContent institutionalContent={institutionalContent} socialNetworks={socialNetworks} />
      </div>
    </section>
  );
};

export default Hero;
