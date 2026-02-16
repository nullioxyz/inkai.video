'use client';
import { useGSAP } from '@gsap/react';
import featureVideoCard1 from '@public/images/ns-img-311.png';
import featureVideoCard2 from '@public/images/ns-img-312.png';
import featureVideoCard3 from '@public/images/ns-img-313.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';
import RevealAnimation from '../animation/RevealAnimation';

gsap.registerPlugin(ScrollTrigger);

const FeaturesFileCard = () => {
  const featureCard1Ref = useRef<HTMLElement>(null);
  const featureCard2Ref = useRef<HTMLElement>(null);
  const featureCard3Ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const featureCard1 = featureCard1Ref.current;
      const featureCard2 = featureCard2Ref.current;
      const featureCard3 = featureCard3Ref.current;

      if (featureCard1) {
        gsap.from(featureCard1, {
          x: 100,
          rotation: 0,
          duration: 0.8,
          delay: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: featureCard1,
            start: 'top 90%',
            end: 'bottom 20%',
            scrub: 2,
          },
        });
      }

      if (featureCard2) {
        gsap.from(featureCard2, {
          rotation: 18,
          duration: 0.8,
          delay: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: featureCard2,
            start: 'top 90%',
            end: 'bottom 20%',
            scrub: 2,
          },
        });
      }

      if (featureCard3) {
        gsap.from(featureCard3, {
          x: -100,
          rotation: 0,
          duration: 0.8,
          delay: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: featureCard3,
            start: 'top 90%',
            end: 'bottom 20%',
            scrub: 2,
          },
        });
      }
    },
    { scope: featureCard1Ref },
  );

  return (
    <RevealAnimation delay={0.2}>
      <div className="space-y-8 rounded-[20px] bg-white p-5 sm:p-8 md:p-5 xl:p-8">
        <div className="flex items-center justify-center -space-x-12">
          <figure
            ref={featureCard1Ref}
            className="shadow-13 w-full max-w-[214px] rotate-[12deg] overflow-hidden rounded-b-[15px]">
            <Image src={featureVideoCard1} alt="feature-1" className="h-full w-full object-cover" />
          </figure>
          <figure ref={featureCard2Ref} className="relative z-10 w-full max-w-[214px] overflow-hidden rounded-b-[15px]">
            <Image src={featureVideoCard2} alt="feature-1" className="h-full w-full object-cover" />
          </figure>
          <figure
            ref={featureCard3Ref}
            className="shadow-13 relative z-10 w-full max-w-[214px] -rotate-[12deg] overflow-hidden rounded-b-[15px]">
            <Image src={featureVideoCard3} alt="feature-1" className="h-full w-full object-cover" />
          </figure>
        </div>
        <RevealAnimation delay={0.1} start="top 97%">
          <div className="relative z-20 max-md:space-y-0.5">
            <h3 className="text-heading-6 md:text-heading-5">Get your completed files.</h3>
            <p className="max-w-[450px]">
              The inputs are multiplied by their respective weights, summed, and then passed through the activation
              function.
            </p>
          </div>
        </RevealAnimation>
      </div>
    </RevealAnimation>
  );
};

FeaturesFileCard.displayName = 'FeaturesFileCard';
export default FeaturesFileCard;
