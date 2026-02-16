import feature1Img from '@public/images/ns-img-80.png';
import Image from 'next/image';
import NumberAnimation from '../animation/NumberAnimation';
import RevealAnimation from '../animation/RevealAnimation';
import Progress from './Progress';

const OurMission = () => {
  return (
    <section className="overflow-hidden pt-14 pb-14 md:pt-16 md:pb-16 lg:pt-[88px] lg:pb-[88px] xl:pt-[100px] xl:pb-[100px]">
      <div className="main-container">
        <div className="grid grid-cols-12 items-center gap-y-12 lg:gap-x-0 xl:gap-x-28">
          <div className="col-span-12 lg:col-span-6">
            <div className="space-y-3">
              <RevealAnimation delay={0.2}>
                <span className="badge badge-cyan mb-5">Our Mission</span>
              </RevealAnimation>
              <RevealAnimation delay={0.3}>
                <h2>To help teams work and grow with smart, secure software.</h2>
              </RevealAnimation>
              <RevealAnimation delay={0.4}>
                <p>
                  We help companies turn messy workflows into manageable systems—one dashboard, one automation, one
                  insight at a time.
                </p>
              </RevealAnimation>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <div>
              <figure className="relative w-full md:w-[500px]">
                <RevealAnimation delay={0.4}>
                  <div className="w-full">
                    <Image src={feature1Img} alt="features" className="w-full" />
                  </div>
                </RevealAnimation>
                <RevealAnimation delay={0.5} direction="right" offset={100}>
                  <div className="shadow-2 dark:bg-background-7 absolute top-3/4 left-[35%] h-[100px] w-[220px] -translate-y-3/4 overflow-hidden rounded-xl bg-white p-6 sm:left-[63%] md:left-[60%] md:w-[288px] lg:left-[1%] xl:left-[50%] 2xl:left-[60%]">
                    <figcaption className="flex justify-between gap-2">
                      <span className="text-tagline-1 dark:text-accent font-normal"> Today&apos;s Revenue </span>
                      <p className="text-secondary dark:text-accent flex items-center gap-1 text-lg leading-[1.5] font-medium">
                        $
                        <NumberAnimation
                          number={53224}
                          speed={1000}
                          interval={180}
                          rooms={5}
                          heightSpaceRatio={2.5}
                          className="text-secondary dark:text-accent text-lg leading-[1.5] font-medium"></NumberAnimation>
                      </p>
                    </figcaption>
                    <Progress />
                  </div>
                </RevealAnimation>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

OurMission.displayName = 'OurMission';
export default OurMission;
