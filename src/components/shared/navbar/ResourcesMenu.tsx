'use client';
import {
  BlogIcon,
  ContactIcon,
  FaqIcon,
  GlossaryIcon,
  SuccessIcon,
  SupportIcon,
  TutorialIcon,
} from '@/icons/menu-icon';
import { cn } from '@/utils/cn';
import type { ComponentType } from 'react';
import ResourcesMenuLink from './ResourcesMenuLink';

type ResourceLink = {
  label: string;
  href: string;
  icon: ComponentType;
};

const resourceLinks: ResourceLink[] = [
  {
    label: 'Blog',
    href: '/blog',
    icon: BlogIcon,
  },
  {
    label: 'Tutorial',
    href: '/tutorial',
    icon: TutorialIcon,
  },
  {
    label: 'FAQ',
    href: '/faq',
    icon: FaqIcon,
  },
  {
    label: 'Glossary',
    href: '/glossary',
    icon: GlossaryIcon,
  },
  {
    label: 'Support',
    href: '/support',
    icon: SupportIcon,
  },
  {
    label: 'Contact',
    href: '/contact-us',
    icon: ContactIcon,
  },
  {
    label: 'Success Stories',
    href: '/success-stories',
    icon: SuccessIcon,
  },
];

const ResourcesMenu = ({
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
          '0.3 ease ease absolute top-full left-1/2 z-40 h-3 w-[280px] -translate-x-1/2 bg-transparent transition-opacity duration-300',
          menuDropdownId === 'resources-dropdown-menu'
            ? '!pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      />
      <div
        id="resources-dropdown-menu"
        className={cn(
          'dark:bg-background-6 border-stroke-1 ease absolute top-full left-1/2 z-50 mt-2 hidden w-[280px] -translate-x-1/2 rounded-[20px] border bg-white p-3 transition-all duration-300 xl:block',
          menuDropdownId === 'resources-dropdown-menu'
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2.5 opacity-0',
        )}>
        <ul className="space-y-2">
          {resourceLinks.map((link) => (
            <ResourcesMenuLink key={link.label} {...link} onClose={handleClose} />
          ))}
        </ul>
      </div>
    </div>
  );
};

ResourcesMenu.displayName = 'ResourcesMenu';
export default ResourcesMenu;
