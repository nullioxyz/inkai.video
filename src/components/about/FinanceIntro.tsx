import { CheckIcon } from '@/icons';
import totalEarnImg from '@public/images/ns-img-356.png';
import roundImageImg from '@public/images/ns-img-73.png';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/Button';

const principles = [
  { id: 1, label: 'Clarity Over Clutter' },
  { id: 2, label: 'People Before Features' },
  { id: 3, label: 'Security as a Standard' },
];

const FinanceIntro = () => {
  return (
    <section className="overflow-hidden py-12 md:py-32 lg:py-40 xl:py-48 2xl:py-[200px]">
      <div className="main-container flex flex-col-reverse items-center gap-x-24 gap-y-12 lg:flex-row">
        <div className="relative flex w-full justify-start overflow-hidden md:flex-1 lg:w-auto">
          <RevealAnimation delay={0.2}>
            <Image src={roundImageImg} alt="Finance Hero" className="h-auto w-full max-w-[450px]" />
          </RevealAnimation>
          <RevealAnimation delay={0.3} direction="right" offset={90}>
            <div className="text-heading-4 bg-ns-yellow absolute top-[49%] right-[15%] flex max-h-[70px] max-w-[219px] items-center justify-center rounded-2xl p-4">
              $
              <div
                data-counter=""
                data-number={24545000}
                data-speed={1000}
                data-interval={180}
                data-rooms={8}
                data-height-space="2.3">
                2,45450.00
              </div>
            </div>
          </RevealAnimation>
          <RevealAnimation delay={0.5} direction="right" offset={100}>
            <figure className="shadow-10 absolute right-[17%] bottom-[15%] hidden w-full max-w-[186px] overflow-hidden rounded-xl sm:block">
              <Image src={totalEarnImg} alt="Finance Hero" className="size-full object-cover" />
            </figure>
          </RevealAnimation>
        </div>
        <div className="flex flex-col md:flex-1 lg:items-start lg:text-left">
          <RevealAnimation delay={0.2}>
            <h2 className="mb-3">Values play a crucial role in shaping our perspective</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <p className="mb-6">
              Our values serve as the foundation for how we interpret the world around us. They influence our decisions,
              guide our actions
            </p>
          </RevealAnimation>
          <ul className="mb-10 space-y-2 md:mb-14 md:space-y-3.5">
            {principles.map((item, idx) => (
              <RevealAnimation key={item.id} delay={0.4 + idx * 0.1}>
                <li className="text-tagline-1 dark:text-accent flex items-center gap-3 font-medium">
                  <span className="bg-secondary dark:bg-accent/10 flex size-[18px] items-center justify-center rounded-full">
                    <CheckIcon />
                  </span>
                  {item.label}
                </li>
              </RevealAnimation>
            ))}
          </ul>
          <RevealAnimation delay={0.7}>
            <div>
              <LinkButton
                href="/signup"
                className="mx-auto block w-full md:inline-block md:w-auto"
                btnClass="btn-xl-v2 btn-secondary-v2 group-hover/btn-v2:btn-v2-white">
                Get started
              </LinkButton>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

FinanceIntro.displayName = 'FinanceIntro';
export default FinanceIntro;
