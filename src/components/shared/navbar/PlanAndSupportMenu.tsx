'use client';
import {
  AffiliatePolicyIcon,
  AffiliateProgramIcon,
  GDPRIcon,
  LegalNoticeIcon,
  LoginIcon,
  PrivacyIcon,
  ReferralProgramIcon,
  RefundPolicyIcon,
  SignUpIcon,
  TermsConditionsIcon,
} from '@/icons/menu-icon';
import { cn } from '@/utils/cn';
import nsImg419 from '@public/images/ns-img-419.jpg';
import Image from 'next/image';
import Link from 'next/link';
import type { ComponentType } from 'react';
import PlanAndSupportMenuLink from './PlanAndSupportMenuLink';

type PlanSupportLink = {
  title: string;
  description: string;
  href: string;
  icon: ComponentType;
};

const accountLinks: PlanSupportLink[] = [
  {
    title: 'Login',
    description: 'Login to continue',
    href: '/login',
    icon: LoginIcon,
  },
  {
    title: 'Create Account',
    description: 'Learn more about this',
    href: '/signup',
    icon: SignUpIcon,
  },
  {
    title: 'Referral Program',
    description: 'Learn more about this',
    href: '/referral-program',
    icon: ReferralProgramIcon,
  },
  {
    title: 'Affiliate Program',
    description: 'Learn more about this',
    href: '/affiliates',
    icon: AffiliateProgramIcon,
  },
  {
    title: 'Affiliate Policy',
    description: 'Learn more about this',
    href: '/affiliate-policy',
    icon: AffiliatePolicyIcon,
  },
];

const policyLinks: PlanSupportLink[] = [
  {
    title: 'Terms & Conditions',
    description: 'Learn more about this',
    href: '/terms-conditions',
    icon: TermsConditionsIcon,
  },
  {
    title: 'Privacy Policy',
    description: 'Learn more about this',
    href: '/privacy-policy',
    icon: PrivacyIcon,
  },
  {
    title: 'Refund Policy',
    description: 'Learn more about this',
    href: '/refund-policy',
    icon: RefundPolicyIcon,
  },
  {
    title: 'GDPR',
    description: 'Check compliance details',
    href: '/gdpr',
    icon: GDPRIcon,
  },
  {
    title: 'Legal',
    description: 'Access legal details',
    href: '/legal',
    icon: LegalNoticeIcon,
  },
];

const PlanAndSupportMenu = ({
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
          '0.3 ease ease fixed top-full left-1/2 z-40 h-3 w-full max-w-[952px] -translate-x-1/2 bg-transparent transition-opacity duration-300',
          menuDropdownId === 'plan-and-support-mega-menu'
            ? '!pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      />
      <div
        id="plan-and-support-mega-menu"
        className={cn(
          'dark:bg-background-6 border-stroke-1 ease fixed top-full left-1/2 z-50 mt-2 hidden w-full -translate-x-1/2 space-y-6 rounded-[20px] border bg-white p-4 transition-all duration-300 md:w-[952px] xl:flex',
          menuDropdownId === 'plan-and-support-mega-menu'
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2.5 opacity-0',
        )}>
        <div className="flex items-start gap-y-6 md:gap-x-6">
          <ul className="flex-1 space-y-2">
            {accountLinks.map((link) => (
              <PlanAndSupportMenuLink key={link.title} {...link} onClose={handleClose} />
            ))}
          </ul>
          <ul className="flex-1 space-y-2">
            {policyLinks.map((link) => (
              <PlanAndSupportMenuLink key={link.title} {...link} onClose={handleClose} />
            ))}
          </ul>
          <figure className="w-full flex-1 space-y-3">
            <p className="text-tagline-2 text-secondary/60 dark:text-accent/60 font-medium">What's New</p>
            <Link href="/changelog">
              <figure className="group relative min-h-[200px] w-full max-w-full overflow-hidden rounded-[14px]">
                <Image
                  src={nsImg419}
                  alt="What's New"
                  className="h-full w-full rounded-[14px] object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 size-full space-y-1 transition-all duration-500 ease-in-out group-hover:top-5 group-hover:left-5">
                  <p className="text-tagline-1 font-medium text-white">AI Changelog</p>
                  <p className="text-tagline-3 w-full max-w-[212px] font-normal text-white/60">
                    Access all your workflows, analytics, and integrations in one smart dashboard.
                  </p>
                </div>
              </figure>
            </Link>
          </figure>
        </div>
      </div>
    </div>
  );
};

PlanAndSupportMenu.displayName = 'PlanAndSupportMenu';
export default PlanAndSupportMenu;
