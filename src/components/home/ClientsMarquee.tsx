import clientLogo10Dark from '@public/images/icons/client-logo-10-dark.svg';
import clientLogo10 from '@public/images/icons/client-logo-10.svg';
import clientLogo6Dark from '@public/images/icons/client-logo-6-dark.svg';
import clientLogo6 from '@public/images/icons/client-logo-6.svg';
import clientLogo7Dark from '@public/images/icons/client-logo-7-dark.svg';
import clientLogo7 from '@public/images/icons/client-logo-7.svg';
import clientLogo8Dark from '@public/images/icons/client-logo-8-dark.svg';
import clientLogo8 from '@public/images/icons/client-logo-8.svg';
import clientLogo9Dark from '@public/images/icons/client-logo-9-dark.svg';
import clientLogo9 from '@public/images/icons/client-logo-9.svg';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import RevealAnimation from '../animation/RevealAnimation';

const ClientsMarquee = () => {
  return (
    <section>
      <RevealAnimation delay={0.2}>
        <div className="relative">
          <div className="dark:from-background-5 absolute top-0 left-0 z-40 h-full w-[15%] bg-gradient-to-r from-white to-transparent md:w-[20%]" />
          <div className="dark:from-background-5 absolute top-0 right-0 z-40 h-full w-[15%] bg-gradient-to-l from-white to-transparent md:w-[20%]" />
          <Marquee autoFill speed={40}>
            <div className="flex items-center justify-center gap-8 py-7.5">
              <figure className="ml-8 min-w-[140px] md:min-w-[201px]">
                <Image src={clientLogo6} alt="Client 1 logo" loading="lazy" className="dark:hidden" />
                <Image src={clientLogo6Dark} alt="Client 1 logo" loading="lazy" className="hidden dark:inline-block" />
              </figure>
              <figure className="min-w-[140px] md:min-w-[201px]">
                <Image src={clientLogo7} alt="Client 2 logo" loading="lazy" className="dark:hidden" />
                <Image src={clientLogo7Dark} alt="Client 2 logo" loading="lazy" className="hidden dark:inline-block" />
              </figure>
              <figure className="min-w-[140px] md:min-w-[201px]">
                <Image src={clientLogo8} alt="Client 3 logo" loading="lazy" className="dark:hidden" />
                <Image src={clientLogo8Dark} alt="Client 3 logo" loading="lazy" className="hidden dark:inline-block" />
              </figure>
              <figure className="min-w-[140px] md:min-w-[201px]">
                <Image src={clientLogo9} alt="Client 4 logo" loading="lazy" className="dark:hidden" />
                <Image src={clientLogo9Dark} alt="Client 4 logo" loading="lazy" className="hidden dark:inline-block" />
              </figure>
              <figure className="min-w-[140px] md:min-w-[201px]">
                <Image src={clientLogo10} alt="Client 5 logo" loading="lazy" className="dark:hidden" />
                <Image src={clientLogo10Dark} alt="Client 5 logo" loading="lazy" className="hidden dark:inline-block" />
              </figure>
            </div>
          </Marquee>
        </div>
      </RevealAnimation>
    </section>
  );
};

ClientsMarquee.displayName = 'ClientsMarquee';
export default ClientsMarquee;
