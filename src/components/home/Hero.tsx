'use client';

import HeroBackgroundVideo from './HeroBackgroundVideo';
import HeroContent from './HeroContent';

const Hero = () => {
  return (
    <section className="dark:bg-background-8 relative z-0 min-h-[100svh] overflow-hidden bg-white">
      <HeroBackgroundVideo />
      <div className="relative z-10 pt-[160px] pb-[140px] max-[641px]:pb-16 max-[426px]:pb-10 sm:pt-[280px]">
        <HeroContent />
      </div>
    </section>
  );
};

export default Hero;
