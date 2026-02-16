import avatarImg from '@public/images/ns-avatar-1.png';
import gradientImg from '@public/images/ns-img-498.png';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';

const Reviews = () => {
  return (
    <section className="overflow-hidden max-lg:mt-12">
      <div className="main-container">
        <RevealAnimation delay={0.1}>
          <div className="bg-background-2 dark:bg-background-6 relative flex flex-col items-center overflow-hidden rounded-4xl py-[100px]">
            {/* gradient bg  */}
            <RevealAnimation delay={0.2} direction="left" offset={100}>
              <div className="pointer-events-none absolute -top-[90%] -left-[65%] h-[600px] w-[500px] rotate-[34deg] select-none max-[376px]:-left-[76%] md:-top-[73%] md:-left-[30%] lg:-top-[70%] lg:-left-[21%] xl:-left-[15%]">
                <Image
                  src={gradientImg}
                  alt="Decorative gradient background overlay"
                  className="h-full w-full object-cover"
                />
              </div>
            </RevealAnimation>
            <figure className="flex flex-col items-center justify-center space-y-4">
              <Image
                src={avatarImg}
                alt="Avatar"
                className="bg-ns-yellow size-10 rounded-full object-cover ring-2 ring-white"
              />
              <figcaption className="text-tagline-2 dark:text-accent font-medium">From our CEO</figcaption>
            </figure>
            <p className="max-sm:text-tagline-2 mx-auto mt-6 mb-4 max-w-[626px] text-center text-xl max-sm:px-2">
              NextSaaS was born from a simple idea: What if the tools we use to run our businesses made things easier?
              We&apos;re building a platform that scales with you, adapts to your needs, and grows with your team.
            </p>
            <strong className="dark:text-accent text-lg leading-[1.5] font-medium">
              Daniel Carter, CEO &amp; Co-Founder
            </strong>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

Reviews.displayName = 'Reviews';
export default Reviews;
