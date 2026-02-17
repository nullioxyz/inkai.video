'use client';

import RevealAnimation from '@/components/animation/RevealAnimation';
import LocaleSwitcher from '@/components/shared/LocaleSwitcher';
import { useLocale } from '@/context/LocaleContext';
import { MessageKey } from '@/i18n/messages';
import { footerLinks } from '@/data/footer-data';
import { cn } from '@/utils/cn';
import instagram from '@public/images/icons/instagram.svg';
import linkedin from '@public/images/icons/linkedin.svg';
import youtube from '@public/images/icons/youtube.svg';
import gradientImg from '@public/images/ns-img-532.png';
import darkLogo from '@public/images/shared/logo-dark.svg';
import Image from 'next/image';
import Link from 'next/link';
import FooterDivider from './FooterDivider';

const Footer = ({ className }: { className?: string }) => {
  const currentYear = new Date().getFullYear();
  const { t } = useLocale();

  return (
    <footer className={cn('bg-secondary dark:bg-background-8 relative z-0 overflow-hidden', className)}>
      <RevealAnimation delay={0.3} offset={50} direction="up">
        <figure className="pointer-events-none absolute -top-[1320px] left-1/2 -z-1 size-[1635px] -translate-x-1/2 select-none">
          <Image src={gradientImg} alt="footer-four-gradient" className="size-full object-cover" />
        </figure>
      </RevealAnimation>
      <div className="main-container px-5">
        <div className="grid grid-cols-1 gap-y-10 pt-12 pb-10 sm:pt-14 xl:grid-cols-12 xl:gap-y-16 xl:pt-[90px] xl:pb-12">
          <RevealAnimation delay={0.1}>
            <div className="xl:col-span-4">
              <div className="mx-auto max-w-[340px] text-center xl:mx-0 xl:max-w-[306px] xl:text-left">
                <figure className="flex justify-center xl:justify-start">
                  <Image src={darkLogo} alt="NextSass Logo" />
                </figure>
                <p className="text-accent/60 text-tagline-1 mt-4 mb-7 font-normal">
                  {t('footer.description')}
                </p>
                <div className="flex items-center justify-center gap-3 xl:justify-start">
                  <Link target="_blank" href="https://www.instagram.com">
                    <span className="sr-only">Instagram</span>
                    <span className="bg-accent/10 inline-flex size-10 items-center justify-center rounded-full">
                      <Image className="size-5" src={instagram} alt="Instagram" />
                    </span>
                  </Link>
                  <Link target="_blank" href="https://www.youtube.com">
                    <span className="sr-only">Youtube</span>
                    <span className="bg-accent/10 inline-flex size-10 items-center justify-center rounded-full">
                      <Image className="size-5" src={youtube} alt="Youtube" />
                    </span>
                  </Link>
                  <Link target="_blank" href="https://www.linkedin.com">
                    <span className="sr-only">LinkedIn</span>
                    <span className="bg-accent/10 inline-flex size-10 items-center justify-center rounded-full">
                      <Image className="size-5" src={linkedin} alt="LinkedIn" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </RevealAnimation>
          <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8 xl:col-span-8 xl:grid-cols-3 xl:gap-x-0">
            {footerLinks.map(({ titleKey, links }, index) => (
              <div key={titleKey}>
                <RevealAnimation delay={0.2 + index * 0.1}>
                  <div className="space-y-5 text-center sm:text-left">
                    <p className="sm:text-heading-6 text-tagline-1 text-primary-50 font-normal">{t(titleKey as MessageKey)}</p>
                    <ul className="space-y-3">
                      {links.map(({ labelKey, href }) => (
                        <li key={labelKey}>
                          <Link href={href} className="footer-link">
                            {t(labelKey as MessageKey)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealAnimation>
              </div>
            ))}
          </div>
        </div>
        <div className="relative pt-6 pb-8 text-center sm:pb-10">
          <FooterDivider className="bg-accent/10 dark:bg-stroke-6" />
          <RevealAnimation delay={0.68} offset={10} start="top 105%">
            <div className="mb-5 flex justify-center">
              <LocaleSwitcher
                compact
                className="text-accent/70 dark:text-accent [&_select]:bg-background-8/70 [&_select]:border-stroke-7 [&_select]:text-accent [&_select]:pl-3 [&_select]:pr-8 [&_select]:py-0 [&_select]:leading-none"
              />
            </div>
          </RevealAnimation>
          <RevealAnimation delay={0.7} offset={10} start="top 105%">
            <p className="text-tagline-1 text-primary-50 font-normal">{`Copyright ©${currentYear} Inkai`}</p>
          </RevealAnimation>
        </div>
      </div>
    </footer>
  );
};
Footer.displayName = 'Footer';
export default Footer;
