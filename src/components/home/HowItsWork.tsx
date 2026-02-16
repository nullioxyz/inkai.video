import newArrow from '@public/images/icons/new-arrow.svg';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/Button';
const HowItsWork = () => {
  return (
    <section className="py-20 md:py-28 lg:py-34 xl:py-39">
      <div className="main-container">
        <div className="mb-10 text-center md:mb-11 lg:mx-auto lg:max-w-[730px]">
          <RevealAnimation delay={0.1}>
            <span className="badge badge-gray-light-v2 mb-4">How It Work</span>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <h2 className="mb-3">Generate AI Speech with NextSaaS</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <p>Turn text into natural, human-like voices instantly with powerful AI speech technology.</p>
          </RevealAnimation>
        </div>
        <div className="relative flex flex-col items-center justify-center gap-8 max-lg:flex-wrap sm:flex-row">
          <RevealAnimation delay={0.4} direction="left" offset={80}>
            <div className="bg-ns-green flex w-full max-w-[408px] flex-col justify-between rounded-[20px] p-11 max-sm:space-y-8 sm:min-h-[350px]">
              <div className="text-center">
                <span className="ns-shape-3 text-secondary text-[52px]"> </span>
              </div>
              <div className="space-y-1 text-center max-md:space-y-0.5">
                <h3 className="text-heading-6 md:text-heading-5">Multiple voice options.</h3>
                <p className="text-tagline-1 text-secondary/60">
                  Choose from a wide range of male and female voices to match your brand’s style.
                </p>
              </div>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={0.5} direction="left" offset={100} duration={0.6}>
            <div className="bg-background-3 absolute top-1/2 left-[31%] z-10 hidden w-full max-w-[52px] -translate-y-1/2 overflow-hidden rounded-[80px] px-4 py-9 ring-8 ring-white lg:inline-block">
              <Marquee autoFill speed={30} direction="right" className="size-6 overflow-hidden">
                <figure className="flex size-6 items-center justify-center">
                  <Image src={newArrow} alt="new-arrow" className="size-full object-cover" />
                  <Image src={newArrow} alt="new-arrow" className="size-full object-cover" />
                </figure>
              </Marquee>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={0.7} direction="left" offset={70} duration={0.5}>
            <div className="bg-background-3 flex w-full max-w-[408px] flex-col justify-between rounded-[20px] p-11 max-sm:space-y-8 sm:min-h-[350px]">
              <div className="text-center">
                <span className="ns-shape-2 text-secondary text-[52px]"> </span>
              </div>
              <div className="space-y-1 text-center max-md:space-y-0.5">
                <h3 className="text-heading-6 md:text-heading-5">Realistic &amp; clear audio</h3>
                <p className="text-tagline-1 text-secondary/60">
                  Deliver lifelike speech that feels authentic and engaging for your audience.
                </p>
              </div>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={0.8} direction="left" offset={100} duration={0.6}>
            <div className="bg-background-3 absolute top-1/2 right-[31%] z-10 hidden w-full max-w-[52px] -translate-y-1/2 overflow-hidden rounded-[80px] px-4 py-9 ring-8 ring-white lg:inline-block">
              <Marquee autoFill speed={30} direction="right" className="size-6 overflow-hidden">
                <figure className="flex size-6 items-center justify-center">
                  <Image src={newArrow} alt="new-arrow" className="size-full object-cover" />
                  <Image src={newArrow} alt="new-arrow" className="size-full object-cover" />
                </figure>
              </Marquee>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={1} direction="left" offset={80} duration={0.7}>
            <div className="bg-ns-green flex w-full max-w-[408px] flex-col justify-between rounded-[20px] p-11 max-sm:space-y-8 sm:min-h-[350px]">
              <div className="text-center">
                <span className="ns-shape-8 text-secondary text-[52px]"> </span>
              </div>
              <div className="space-y-1 text-center max-md:space-y-0.5">
                <h3 className="text-heading-6 md:text-heading-5">Fast &amp; easy conversion.</h3>
                <p className="text-tagline-1 text-secondary/60">
                  Convert your text into speech within seconds — no technical skills required.
                </p>
              </div>
            </div>
          </RevealAnimation>
        </div>

        <RevealAnimation delay={0.5}>
          <div className="group mt-14 text-center">
            <LinkButton href="/pricing" btnClass="btn-xl-v2 btn-secondary-v2 group-hover/btn-v2:btn-primary-v2">
              Generate Voice
            </LinkButton>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

HowItsWork.displayName = 'HowItsWork';
export default HowItsWork;
