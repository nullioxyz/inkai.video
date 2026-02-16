'use client';
import Link from 'next/link';
import type { ComponentType } from 'react';
import HoverBgTransform from '../hover-bg-transform';

type ResourcesMenuLinkProps = {
  label: string;
  href: string;
  icon: ComponentType;

  onClose?: () => void;
};

const ResourcesMenuLink = ({ label, href, icon: Icon, onClose }: ResourcesMenuLinkProps) => (
  <li>
    <Link href={href} onClick={onClose} className="group relative flex items-center gap-2 rounded-[10px] p-3">
      <HoverBgTransform className="group-hover:opacity-100" />
      <span className="relative z-10">
        <Icon />
      </span>
      <span className="text-tagline-1 text-secondary dark:text-accent relative z-10 font-normal">{label}</span>
    </Link>
  </li>
);

export type { ResourcesMenuLinkProps };
export default ResourcesMenuLink;
