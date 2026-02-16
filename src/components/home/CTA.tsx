import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/Button';

const CTA = () => {
  return (
    <section className="pt-14 pb-14 md:pt-16 md:pb-16 lg:pt-[88px] lg:pb-[88px] xl:pt-[112px] xl:pb-[112px]">
      <div className="main-container">
        <div className="mx-auto max-w-[649px] space-y-8 text-center">
          <RevealAnimation delay={0.1}>
            <h2>Discover the key features of our mobile app.</h2>
          </RevealAnimation>
          <div className="flex flex-col items-center justify-center gap-x-4 gap-y-3 md:flex-row md:gap-y-0">
            <RevealAnimation delay={0.4} direction="left" offset={50}>
              <div className="group w-[90%] list-none sm:w-auto">
                <LinkButton href="#" btnClass="btn-xl-v2 btn-secondary-v2 group-hover/btn-v2:btn-primary-v2">
                  App store
                </LinkButton>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={0.5} direction="left" offset={50}>
              <div className="group w-[90%] list-none sm:w-auto">
                <LinkButton href="#" btnClass="btn-xl-v2 btn-ash-v2 !border-0 group-hover/btn-v2:btn-secondary-v2">
                  Google play
                </LinkButton>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

CTA.displayName = 'CTA';
export default CTA;
