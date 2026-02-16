'use client';
import Link from 'next/link';
import type { ComponentType } from 'react';
import HoverBgTransform from '../hover-bg-transform';

type CompanyMenuLinkProps = {
  title: string;
  description: string;
  href: string;
  icon: ComponentType;
  onClose?: () => void;
};

const CompanyMenuLink = ({ title, description, href, icon: Icon, onClose }: CompanyMenuLinkProps) => (
  <li>
    <Link href={href} onClick={onClose} className="group relative flex items-start gap-2 p-3">
      <HoverBgTransform className="group-hover:opacity-100" />
      <div className="border-stroke-1 relative z-10 mt-1 flex size-7 shrink-0 items-center justify-center rounded-lg border p-1 dark:border-white/10">
        <Icon />
      </div>
      <div className="relative z-10">
        <p className="text-tagline-1 text-secondary dark:text-accent font-normal">{title}</p>
        <p className="text-tagline-2 text-secondary/60 dark:text-accent/60 font-normal">{description}</p>
      </div>
    </Link>
  </li>
);

export type { CompanyMenuLinkProps };
export default CompanyMenuLink;
