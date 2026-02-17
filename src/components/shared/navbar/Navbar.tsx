'use client';
import RevealAnimation from '@/components/animation/RevealAnimation';
import LocaleSwitcher from '@/components/shared/LocaleSwitcher';
import { useNavbarScroll } from '@/hooks/useScrollHeader';
import { cn } from '@/utils/cn';
import logoDark from '@public/images/shared/logo-dark.svg';
import logo from '@public/images/shared/logo.svg';
import mainLogo from '@public/images/shared/main-logo.svg';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = ({ showTopNav }: { showTopNav: boolean }) => {
  const { isScrolled } = useNavbarScroll(150);

  return (
    <header
      className={cn(
        'lp:!max-w-[1290px] fixed top-5 left-1/2 z-50 mx-auto w-full max-w-[350px] -translate-x-1/2 transition-all duration-500 ease-in-out max-[400px]:max-w-[350px] min-[425px]:max-w-[375px] min-[500px]:max-w-[450px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]',
        showTopNav ? 'top-13.5' : 'top-5',
        isScrolled && 'top-2',
      )}>
      <RevealAnimation direction="up" offset={100} delay={0.1} instant>
        <div className="flex items-center justify-between px-2.5 py-2.5 xl:py-0">
          <div>
            <Link href="/">
              <span className="sr-only">Home</span>
              <figure className="hidden lg:block lg:max-w-[198px]">
                <Image src={mainLogo} alt="Inkai" className="dark:invert" />
              </figure>
              <figure className="block max-w-[44px] lg:hidden">
                <Image src={logo} alt="Inkai" className="block w-full dark:hidden" />
                <Image src={logoDark} alt="Inkai" className="hidden w-full dark:block" />
              </figure>
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <LocaleSwitcher
              compact
              className="[&_select]:bg-secondary [&_select]:border-secondary [&_select]:text-accent [&_select]:h-10 [&_select]:rounded-full [&_select]:pl-4 [&_select]:pr-9 [&_select]:py-0 [&_select]:leading-none [&_select]:text-tagline-2 [&_select]:font-medium"
            />
          </div>
        </div>
      </RevealAnimation>
    </header>
  );
};

Navbar.displayName = 'Navbar';
export default Navbar;
