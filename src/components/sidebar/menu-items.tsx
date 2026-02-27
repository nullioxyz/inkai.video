import { SidebarMenuItem } from './types';

export const menuItems: SidebarMenuItem[] = [
  {
    key: 'gallery',
    labelKey: 'sidebar.gallery',
    href: '/dashboard/gallery',
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
        <path d="M8 13.5l2.7-2.7a1 1 0 0 1 1.4 0L14 12.7" />
        <path d="M12.5 15.5l2.2-2.2a1 1 0 0 1 1.4 0l2 2" />
        <circle cx="8.2" cy="8.4" r="1.2" />
      </svg>
    ),
  },
  {
    key: 'credits',
    labelKey: 'sidebar.credits',
    href: '/dashboard/credits',
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 9.5h14a2.5 2.5 0 0 1 2.5 2.5v5A2.5 2.5 0 0 1 18 19.5H6A2.5 2.5 0 0 1 3.5 17V10A.5.5 0 0 1 4 9.5Z" />
        <path d="M6.5 9.5V8A2.5 2.5 0 0 1 9 5.5h8a2 2 0 0 1 0 4H6.5Z" />
        <circle cx="15.8" cy="14.5" r="1.2" />
      </svg>
    ),
  },
  {
    key: 'account',
    labelKey: 'sidebar.account',
    href: '/dashboard/account',
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="9.2" r="2.4" />
        <path d="M7.5 17c1.2-1.9 2.8-2.8 4.5-2.8s3.3.9 4.5 2.8" />
      </svg>
    ),
  },
  {
    key: 'settings',
    labelKey: 'sidebar.settings',
    href: '/dashboard/settings',
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 6.5h14" />
        <path d="M5 12h14" />
        <path d="M5 17.5h14" />
        <circle cx="9" cy="6.5" r="1.6" />
        <circle cx="14.5" cy="12" r="1.6" />
        <circle cx="11" cy="17.5" r="1.6" />
      </svg>
    ),
  },
  {
    key: 'logout',
    labelKey: 'sidebar.logout',
    href: '/login',
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h7A1.5 1.5 0 0 1 19 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 9 18.5V17" />
        <path d="M13.5 12H4.5" />
        <path d="m7.5 8.8-3.2 3.2 3.2 3.2" />
      </svg>
    ),
  },
];
