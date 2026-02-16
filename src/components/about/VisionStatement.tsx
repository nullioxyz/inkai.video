import vision1Img from '@public/images/ns-img-357.png';
import vision2Img from '@public/images/ns-img-358.png';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';

const VisionStatement = () => {
  return (
    <section className="pt-32 pb-14 sm:pt-36 md:pt-42 md:pb-16 lg:pb-[88px] xl:pt-[180px] xl:pb-[100px]">
      <div className="main-container space-y-12 md:space-y-16 lg:space-y-[100px]">
        <div className="mx-auto max-w-[780px] space-y-3 text-center">
          <RevealAnimation delay={0.2}>
            <span className="badge badge-cyan mb-5">Passion meets purpose</span>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <h2 className="font-medium">Built for progress. designed for possibility.</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.4}>
            <p>
              At NextSaaS, we believe software should empower people, not overwhelm them. That&apos;s why we&apos;ve
              created a flexible, intuitive platform that helps teams streamline operations, gain clarity from data, and
              scale faster, without the complexity.
            </p>
          </RevealAnimation>
        </div>
        <article className="flex flex-col gap-8 md:flex-row">
          <RevealAnimation delay={0.5} instant={true}>
            <figure className="max-w-full overflow-hidden rounded-[20px] md:max-w-[630px]">
              <Image src={vision1Img} className="h-full w-full object-cover" alt="vision-1" />
            </figure>
          </RevealAnimation>
          <RevealAnimation delay={0.6} instant={true}>
            <figure className="max-w-full overflow-hidden rounded-[20px] md:max-w-[630px]">
              <Image src={vision2Img} className="h-full w-full object-cover" alt="vision-2" />
            </figure>
          </RevealAnimation>
        </article>
      </div>
    </section>
  );
};

VisionStatement.displayName = 'VisionStatement';
export default VisionStatement;
