import Marquee from 'react-fast-marquee';
import RevealAnimation from '../animation/RevealAnimation';

import avatar1 from '@public/images/ns-avatar-1.png';
import avatar15 from '@public/images/ns-avatar-15.png';
import avatar16 from '@public/images/ns-avatar-16.png';
import avatar17 from '@public/images/ns-avatar-17.png';
import avatar18 from '@public/images/ns-avatar-18.png';
import avatar19 from '@public/images/ns-avatar-19.png';
import avatar2 from '@public/images/ns-avatar-2.png';
import avatar3 from '@public/images/ns-avatar-3.png';
import handsPhone from '@public/images/ns-img-310.png';
import Image from 'next/image';
import FeaturesFileCard from './FeaturesFileCard';

const voicesTop = [
  { id: 1, name: 'Voice-01', avatar: avatar15 },
  { id: 2, name: 'Voice-02', avatar: avatar16 },
  { id: 3, name: 'Voice-03', avatar: avatar17 },
  { id: 4, name: 'Voice-04', avatar: avatar18 },
];

const voicesBottom = [
  { id: 1, name: 'Voice-01', avatar: avatar19 },
  { id: 2, name: 'Voice-02', avatar: avatar1 },
  { id: 3, name: 'Voice-03', avatar: avatar2 },
  { id: 4, name: 'Voice-04', avatar: avatar3 },
];

const Features = () => {
  return (
    <section className="max-[1920px]:px-5">
      <div className="bg-background-12 mx-auto max-w-[1880px] rounded-3xl py-20 lg:rounded-4xl lg:py-30 xl:py-39">
        <div className="main-container">
          <div className="mb-10 space-y-4 text-center md:mb-14 lg:mx-auto lg:max-w-[740px]">
            <RevealAnimation delay={0.1}>
              <span className="badge badge-white-v2 text-secondary font-medium">Feature</span>
            </RevealAnimation>
            <RevealAnimation delay={0.2}>
              <h2>Robust features that enhance your mobile experience.</h2>
            </RevealAnimation>
          </div>
          {/* features grid */}
          <div className="grid grid-cols-12 gap-y-10 md:gap-x-8">
            {/* feature item 1 */}
            <RevealAnimation delay={0.1}>
              <div className="col-span-12 md:col-span-6">
                <div className="relative h-full min-h-[450px] max-w-full overflow-hidden rounded-[20px] bg-white sm:min-h-[780px] md:min-h-[720px] lg:p-10.5">
                  <RevealAnimation delay={0.1}>
                    <div className="absolute bottom-0 left-0 z-10 h-[480px] w-full bg-(image:--color-gradient-11) blur-[2px] md:bottom-20 lg:bottom-0" />
                  </RevealAnimation>
                  <RevealAnimation delay={0.2}>
                    <figure className="absolute right-0 bottom-2 md:bottom-40 lg:bottom-20 xl:bottom-2">
                      <Image src={handsPhone} alt="feature-1" className="h-full w-full object-cover" />
                    </figure>
                  </RevealAnimation>
                  <RevealAnimation delay={0.2}>
                    <div className="absolute right-10.5 bottom-10.5 left-6 z-20 max-md:space-y-0.5 sm:left-10.5 md:left-6 md:space-y-1.5 xl:left-10.5">
                      <h3 className="text-heading-6 md:text-heading-5">Duplicate the voice</h3>
                      <p className="max-w-[450px]">
                        Each NextSaaS applies an activation function to the weighted sum of its inputs to generate an
                        output.
                      </p>
                    </div>
                  </RevealAnimation>
                </div>
              </div>
            </RevealAnimation>
            {/* feature item 2 */}
            <div className="col-span-12 space-y-8 md:col-span-6">
              <RevealAnimation delay={0.4}>
                <div className="space-y-6 rounded-[20px] bg-white p-5 sm:p-8 md:p-5 xl:p-8">
                  <div className="bg-background-12 relative space-y-7 overflow-hidden rounded-2xl pt-[25px] pb-[27px]">
                    {/* Left gradient overlay */}
                    <div className="from-background-12 pointer-events-none absolute top-0 left-0 z-10 h-full w-[20%] bg-gradient-to-r to-transparent" />
                    {/* Right gradient overlay */}
                    <div className="from-background-12 pointer-events-none absolute top-0 right-0 z-10 h-full w-[20%] bg-gradient-to-l to-transparent" />
                    <Marquee>
                      <div className="flex items-center gap-x-7">
                        {voicesTop.map((voice, index) => (
                          <div
                            key={index + 1}
                            className="inline-flex w-full max-w-[168px] min-w-[168px] items-center gap-x-3 rounded-[300px] bg-white p-1 first:ml-7">
                            <figure className="size-14 overflow-hidden rounded-[300px]">
                              <Image src={voice.avatar} alt={voice.name} className="size-full object-cover" />
                            </figure>
                            <span className="text-it-heading-6 text-secondary font-normal">{voice.name}</span>
                          </div>
                        ))}
                      </div>
                    </Marquee>
                    <Marquee direction="right">
                      <div className="flex items-center gap-x-7">
                        {voicesBottom.map((voice, index) => (
                          <div
                            key={index + 1}
                            className="inline-flex w-full max-w-[168px] min-w-[168px] items-center gap-x-3 rounded-[300px] bg-white p-1 first:ml-7">
                            <figure className="size-14 overflow-hidden rounded-[300px]">
                              <Image src={voice.avatar} alt={voice.name} className="size-full object-cover" />
                            </figure>
                            <span className="text-it-heading-6 text-secondary font-normal">{voice.name}</span>
                          </div>
                        ))}
                      </div>
                    </Marquee>
                  </div>
                  <RevealAnimation delay={0.4} start="top 97%">
                    <div className="max-md:space-y-0.5 md:space-y-1.5">
                      <h3 className="text-heading-6 md:text-heading-5">Create a voiceover for your video.</h3>
                      <p className="max-w-[450px]">
                        A NextSaaS network consists of nodes called NextSaaS that are interconnected. These NextSaaS are
                        organized into layers.
                      </p>
                    </div>
                  </RevealAnimation>
                </div>
              </RevealAnimation>
              <FeaturesFileCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Features.displayName = 'Features';
export default Features;
