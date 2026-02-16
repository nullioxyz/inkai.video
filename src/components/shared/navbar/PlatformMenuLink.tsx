'use client';
import Link from 'next/link';
import type { ComponentType, JSX } from 'react';
import HoverBgTransform from '../hover-bg-transform';

type PlatformMenuLinkProps = {
  label: string;
  href: string;
  variant?: 'text' | 'icon';
  icon?: ComponentType;

  onClose?: () => void;
};

const PlatformMenuLink = ({
  label,
  href,
  variant = 'text',
  icon: Icon,

  onClose,
}: PlatformMenuLinkProps): JSX.Element => {
  if (variant === 'icon') {
    return (
      <li>
        <Link href={href} onClick={onClose} className="group relative flex items-center gap-2 p-3">
          <HoverBgTransform className="group-hover:opacity-100" />
          <span className="relative z-10">{Icon && <Icon />}</span>
          <span className="text-tagline-1 text-secondary dark:text-accent relative z-10 font-normal">{label}</span>
        </Link>
      </li>
    );
  }

  return (
    <li>
      <Link href={href} onClick={onClose} className="group relative block p-3">
        <HoverBgTransform className="group-hover:opacity-100" />
        <span className="text-tagline-1 text-secondary dark:text-accent relative z-10 font-normal">{label}</span>
      </Link>
    </li>
  );
};

export type { PlatformMenuLinkProps };
export default PlatformMenuLink;
