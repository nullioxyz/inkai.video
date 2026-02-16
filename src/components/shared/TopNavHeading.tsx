'use client';
import { useAppContext } from '@/context/AppContext';
import { cn } from '@/utils/cn';
import logo from '@public/images/shared/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import RevealAnimation from '../animation/RevealAnimation';

const TopNavHeading = ({ className }: { className?: string }) => {
  const { showTopNav, setShowTopNav } = useAppContext();

  if (!showTopNav) {
    return null;
  }

  return (
    <RevealAnimation delay={0.1} direction="up" instant>
      <div className={cn('bg-ns-green top-nav px-5 py-1.5', className)}>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <figure className="size-9 max-[400px]:pt-0.5">
                <Image src={logo} alt="Top Green Nav" />
              </figure>
              <figcaption className="text-secondary font-inter-tight md:text-tagline-2 text-[10px] leading-[150%] font-normal">
                AI Applications new homepage is live now
              </figcaption>
            </div>
            <div className="flex items-center gap-x-3">
              <Link
                href="/contact-us-page"
                className="shadow-1 bg-background-5 border-stroke-7 text-accent hidden h-8 cursor-pointer rounded-full px-4 py-1 text-center font-normal text-nowrap transition-all duration-300 ease-in-out hover:scale-102 md:inline-block">
                <span>Grab it</span>
              </Link>
              <Link
                href="/contact-us-page"
                className="shadow-1 border-stroke-7 text-secondary flex h-8 cursor-pointer items-center justify-center rounded-full border bg-transparent px-4 py-1 text-center font-normal text-nowrap transition-all duration-300 ease-in-out hover:scale-102">
                <span>Learn More</span>
              </Link>
              <button onClick={() => setShowTopNav(false)} className="close-top-nav ml-1 size-6 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M22.8358 22.3639L22.3643 22.8353C22.104 23.0956 21.6819 23.0956 21.4215 22.8353L16.0004 17.4141L10.5792 22.8352C10.3189 23.0956 9.89675 23.0956 9.6364 22.8352L9.16499 22.3638C8.90464 22.1035 8.90464 21.6814 9.16499 21.421L14.5862 15.9999L9.16499 10.5787C8.90464 10.3184 8.90464 9.89626 9.16499 9.63591L9.63639 9.16451C9.89674 8.90416 10.3189 8.90416 10.5792 9.16451L16.0004 14.5857L21.4215 9.1645C21.6819 8.90415 22.104 8.90415 22.3643 9.1645L22.8358 9.6359C23.0961 9.89625 23.0961 10.3184 22.8358 10.5787L17.4146 15.9999L22.8358 21.421C23.0961 21.6814 23.0961 22.1035 22.8358 22.3639Z"
                    className="fill-secondary"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </RevealAnimation>
  );
};

TopNavHeading.displayName = 'TopNavHeading';
export default TopNavHeading;
