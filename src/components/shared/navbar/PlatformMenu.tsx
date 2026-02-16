'use client';
import {
  AnalyticsIconV2,
  CareerIconV2,
  IntegrationIconV2,
  PricingIcon,
  SupportIconV2,
  WhitePaperIconV2,
} from '@/icons/menu-icon';
import { cn } from '@/utils/cn';
import newArrowWhite from '@public/images/icons/new-arrow-white.svg';
import nsImg424 from '@public/images/ns-img-424.jpg';
import nsImg425 from '@public/images/ns-img-425.jpg';
import Image from 'next/image';
import Link from 'next/link';
import type { ComponentType } from 'react';
import PlatformMenuLink from './PlatformMenuLink';

type SimpleNavLink = {
  label: string;
  href: string;
  closesMenu?: boolean;
};

type IntegrationLink = SimpleNavLink & {
  icon: ComponentType;
};

const overviewLinks: SimpleNavLink[] = [
  { label: 'Features & Capabilities', href: '/features', closesMenu: true },
  { label: 'Process & Workflow', href: '/process' },
  { label: 'Security & Compliance', href: '/security' },
  { label: 'Our Brandkit', href: '/brandkit' },
  { label: 'Download App', href: '/download' },
  { label: 'Press', href: '/press' },
];

const integrationLinks: IntegrationLink[] = [
  {
    label: 'Pricing',
    href: '/pricing',
    icon: PricingIcon,
  },
  {
    label: 'HR & Payroll',
    href: '/career',
    icon: CareerIconV2,
  },
  {
    label: 'Customer Support',
    href: '/support',
    icon: SupportIconV2,
  },
  {
    label: 'Analytics & Reporting',
    href: '/analytics',
    icon: AnalyticsIconV2,
  },
  {
    label: 'Whitepaper & Reports',
    href: '/whitepaper',
    icon: WhitePaperIconV2,
  },
  {
    label: 'Explore All Integrations',
    href: '/integration',
    icon: IntegrationIconV2,
  },
];

const PlatformMenu = ({
  menuDropdownId,
  setMenuDropdownId,
}: {
  menuDropdownId: string | null;
  setMenuDropdownId: (id: string | null) => void;
}) => {
  const handleClose = () => setMenuDropdownId(null);

  return (
    <div>
      <div
        className={cn(
          '0.3 ease ease fixed top-full left-1/2 z-40 h-3 w-full -translate-x-1/2 bg-transparent transition-opacity duration-300 lg:w-[1290px]',
          menuDropdownId === 'platform-mega-menu'
            ? '!pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      />
      <div
        id="platform-mega-menu"
        className={cn(
          'dark:bg-background-6 border-stroke-1 ease fixed top-full left-1/2 z-50 mt-2 hidden w-full -translate-x-1/2 rounded-[20px] border bg-white p-4 transition-all duration-300 lg:w-[1290px] xl:flex dark:border-white/10',
          menuDropdownId === 'platform-mega-menu'
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2.5 opacity-0',
        )}>
        <div className="grid grid-cols-12 items-start gap-y-6 md:gap-x-6">
          <div className="col-span-12 grid grid-cols-12 gap-x-6 lg:col-span-6">
            <div className="col-span-12 xl:col-span-6">
              <div>
                <p className="text-tagline-2 text-secondary/60 dark:text-accent/60 p-3 font-medium">Overview</p>
                <ul>
                  {overviewLinks.map((link) => (
                    <PlatformMenuLink key={link.label} {...link} onClose={handleClose} />
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-span-12 xl:col-span-6">
              <div>
                <p className="text-tagline-2 text-secondary/60 dark:text-accent/60 p-3 font-medium">Integrations</p>
                <ul>
                  {integrationLinks.map((link) => (
                    <PlatformMenuLink key={link.label} {...link} variant="icon" onClose={handleClose} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-12 grid grid-cols-12 gap-x-6 lg:col-span-6">
            <div className="col-span-12 xl:col-span-6">
              <article className="border-stroke-1 dark:border-background-7 group space-y-3 rounded-2xl border p-3">
                <Link
                  onClick={handleClose}
                  href="/blog/10-Proven-Marketing-Strategies-for-Rapid-Business-Growth"
                  className="block">
                  <figure className="overflow-hidden rounded-lg">
                    <Image
                      src={nsImg424}
                      alt="Featured"
                      className="h-full w-full rounded-lg object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                  </figure>
                </Link>
                <div className="space-y-14">
                  <Link href="/blog/10-Proven-Marketing-Strategies-for-Rapid-Business-Growth" className="block">
                    <div>
                      <p className="text-heading-6 text-secondary dark:text-accent font-normal">Merge Unified</p>
                      <p className="text-tagline-1 text-secondary/60 dark:text-accent/60 font-normal">
                        One API. Countless product <br />
                        integrations.
                      </p>
                    </div>
                  </Link>
                  <div>
                    <Link
                      href="/blog/10-Proven-Marketing-Strategies-for-Rapid-Business-Growth"
                      className="bg-secondary group group-hover:bg-primary-500 ring-background-12 dark:ring-background-7 relative flex h-9.5 w-16 items-center justify-center space-y-5 overflow-hidden rounded-full px-5 py-2 ring-[6px] transition-all duration-500 ease-in-out">
                      <figure className="relative size-6 items-center justify-center overflow-hidden">
                        <Image
                          src={newArrowWhite}
                          alt="new-arrow"
                          className="absolute inset-0 size-full -translate-x-6 object-cover transition-transform duration-400 ease-in-out group-hover:translate-x-1"
                        />
                        <Image
                          src={newArrowWhite}
                          alt="new-arrow"
                          className="size-full object-cover transition-transform duration-400 ease-in-out group-hover:translate-x-6"
                        />
                      </figure>
                    </Link>
                  </div>
                </div>
              </article>
            </div>
            <div className="col-span-12 xl:col-span-6">
              <article className="border-stroke-1 dark:border-background-7 group space-y-3 rounded-2xl border p-3">
                <Link
                  onClick={handleClose}
                  href="/blog/a-customized-electronic-prescription-designed-specifically"
                  className="block">
                  <figure className="overflow-hidden rounded-lg">
                    <Image
                      src={nsImg425}
                      alt="Featured"
                      className="h-full w-full rounded-lg object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                  </figure>
                </Link>
                <div className="space-y-14">
                  <Link href="/blog/a-customized-electronic-prescription-designed-specifically" className="block">
                    <div>
                      <p className="text-heading-6 text-secondary dark:text-accent font-normal">Combine Unified</p>
                      <p className="text-tagline-1 text-secondary/60 dark:text-accent/60 font-normal">
                        One API. Countless product <br />
                        integrations.
                      </p>
                    </div>
                  </Link>
                  <div>
                    <Link
                      href="/blog/a-customized-electronic-prescription-designed-specifically"
                      className="bg-secondary group group-hover:bg-primary-500 ring-background-12 dark:ring-background-7 relative flex h-9.5 w-16 items-center justify-center space-y-5 overflow-hidden rounded-full px-5 py-2 ring-[6px] transition-all duration-500 ease-in-out">
                      <figure className="relative size-6 items-center justify-center overflow-hidden">
                        <Image
                          src={newArrowWhite}
                          alt="new-arrow"
                          className="absolute inset-0 size-full -translate-x-6 object-cover transition-transform duration-400 ease-in-out group-hover:translate-x-1"
                        />
                        <Image
                          src={newArrowWhite}
                          alt="new-arrow"
                          className="size-full object-cover transition-transform duration-400 ease-in-out group-hover:translate-x-6"
                        />
                      </figure>
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PlatformMenu.displayName = 'PlatformMenu';
export default PlatformMenu;
