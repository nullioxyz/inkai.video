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
        <div className="grid grid-cols-12 justify-between gap-x-0 gap-y-16 pt-16 pb-12 xl:pt-[90px]">
          <RevealAnimation delay={0.1}>
            <div className="col-span-12 xl:col-span-4">
              <div className="max-w-[306px]">
                <figure>
                  <Image src={darkLogo} alt="NextSass Logo" />
                </figure>
                <p className="text-accent/60 text-tagline-1 mt-4 mb-7 font-normal">
                  {t('footer.description')}
                </p>
                <div className="flex items-center gap-3">
                  <Link target="_blank" href="https://www.instagram.com">
                    <span className="sr-only">Instagram</span>
                    <Image className="size-6" src={instagram} alt="Instagram" />
                  </Link>
                  <div className="bg-stroke-1/20 h-6 w-px" />
                  <Link target="_blank" href="https://www.youtube.com">
                    <span className="sr-only">Youtube</span>
                    <Image className="size-6" src={youtube} alt="Youtube" />
                  </Link>
                  <div className="bg-stroke-1/20 h-6 w-px" />
                  <Link target="_blank" href="https://www.linkedin.com">
                    <span className="sr-only">LinkedIn</span>
                    <Image className="size-6" src={linkedin} alt="LinkedIn" />
                  </Link>
                </div>
              </div>
            </div>
          </RevealAnimation>
          <div className="col-span-12 grid grid-cols-12 gap-x-0 gap-y-8 xl:col-span-8">
            {footerLinks.map(({ titleKey, links }, index) => (
              <div className="col-span-12 md:col-span-4" key={titleKey}>
                <RevealAnimation delay={0.2 + index * 0.1}>
                  <div className="space-y-8">
                    <p className="sm:text-heading-6 text-tagline-1 text-primary-50 font-normal">{t(titleKey as MessageKey)}</p>
                    <ul className="space-y-5">
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
        <div className="relative pt-[26px] pb-[42px] text-center">
          <FooterDivider className="bg-accent/10 dark:bg-stroke-6" />
          <RevealAnimation delay={0.68} offset={10} start="top 105%">
            <div className="mb-5 flex justify-center">
              <LocaleSwitcher
                compact
                className="text-accent/70 dark:text-accent [&_select]:bg-background-8/70 [&_select]:border-stroke-7 [&_select]:text-accent"
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
