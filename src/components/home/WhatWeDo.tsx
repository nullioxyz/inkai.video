'use client';
import { useWordAnimation } from '@/hooks/useWordAnimation';
import RevealAnimation from '../animation/RevealAnimation';

const WhatWeDo = () => {
  const { titleRef } = useWordAnimation({
    start: 'top 80%',
  });
  return (
    <section className="max-[1920px]:px-5">
      <RevealAnimation delay={0.2}>
        <div className="bg-secondary mx-auto max-w-[1880px] rounded-3xl px-5 lg:py-24 xl:rounded-4xl xl:py-28">
          <div className="mx-auto max-w-[1400px] py-16 lg:py-20 xl:py-30">
            <h2
              ref={titleRef}
              className="split-text-team-title text-accent font-inter-tight text-heading-5 sm:text-heading-4 md:text-heading-3 lg:text-heading-2 xl:text-heading-1 text-center font-light wrap-break-word 2xl:text-[88px] 2xl:leading-[120%]">
              Helping businesses harness AI-powered marketing solutions to enhance engagement, increase conversions, and
              achieve new heights of growth and success.
            </h2>
          </div>
        </div>
      </RevealAnimation>
    </section>
  );
};

WhatWeDo.displayName = 'WhatWeDo';
export default WhatWeDo;
