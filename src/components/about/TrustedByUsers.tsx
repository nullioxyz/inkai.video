import { StarIconV3 } from '@/icons';
import RevealAnimation from '../animation/RevealAnimation';

const TrustedByUsers = () => {
  return (
    <section
      className="pt-14 pb-14 md:pt-16 md:pb-16 lg:pt-[88px] lg:pb-[88px] xl:pt-[100px] xl:pb-[100px]"
      aria-label="Trusted by users section">
      <div className="main-container">
        <div className="max-h-auto bg-secondary dark:bg-background-6 flex flex-col items-center gap-x-8 gap-y-10 rounded-[20px] py-14 lg:max-h-[280px] lg:flex-row lg:items-start">
          <div className="space-y-3 max-sm:px-3 max-sm:text-center lg:w-[37%] lg:pl-12">
            <RevealAnimation delay={0.1}>
              <h2 className="lg:text-heading-3 text-white">Grow together</h2>
            </RevealAnimation>
            <RevealAnimation delay={0.2}>
              <p className="text-accent/60 px-4 md:px-0">
                We’re not just a software platform we’re a partner in your long-term success.
              </p>
            </RevealAnimation>
          </div>
          <div className="flex flex-col justify-around gap-x-6 gap-y-10 md:flex-row md:justify-center lg:w-[63%] lg:justify-around lg:pr-12">
            {/* First rating */}
            <RevealAnimation delay={0.3}>
              <div className="flex flex-col items-center">
                <span className="bg-ns-green text-heading-5 mb-6 rounded-full px-7 py-2"> 4.7 </span>
                <div className="mb-3 flex gap-2" aria-label="5 out of 5 stars">
                  <StarIconV3 />
                  <StarIconV3 />
                  <StarIconV3 />
                  <StarIconV3 />
                  <StarIconV3 />
                </div>
                <span className="text-tagline-1 text-white">Top customer fulfillment</span>
              </div>
            </RevealAnimation>
            {/* Second rating */}
            <RevealAnimation delay={0.4}>
              <div className="flex flex-col items-center">
                <span className="bg-ns-red text-heading-5 mb-6 rounded-full px-7 py-2">4.3</span>
                <div className="mb-3 flex gap-2" aria-label="5 out of 5 stars">
                  <StarIconV3 />
                  <StarIconV3 />
                  <StarIconV3 />
                  <StarIconV3 />
                </div>
                <span className="text-tagline-1 text-white">Best payment software</span>
              </div>
            </RevealAnimation>
            {/* Third rating */}
            <RevealAnimation delay={0.5}>
              <div className="flex flex-col items-center">
                <span className="bg-ns-cyan text-heading-5 mb-6 rounded-full px-7 py-2">4.9</span>
                <div className="mb-3 flex gap-2" aria-label="5 out of 5 stars">
                  <StarIconV3 />
                  <StarIconV3 />
                  <StarIconV3 />
                </div>
                <span className="text-tagline-1 text-white">Top payment company</span>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedByUsers;
