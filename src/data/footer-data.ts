import { FooterData } from '@/interface';

export const footerLinks: FooterData[] = [
  {
    titleKey: 'footer.title.company',
    links: [
      { labelKey: 'footer.link.about', href: '/about' },
      { labelKey: 'footer.link.contact', href: '/contact-us' },
    ],
  },
  {
    titleKey: 'footer.title.support',
    links: [
      { labelKey: 'footer.link.faq', href: '/faq' },
      { labelKey: 'footer.link.tutorial', href: '/tutorial' },
    ],
  },
  {
    titleKey: 'footer.title.legal',
    links: [
      { labelKey: 'footer.link.terms', href: '/terms-conditions' },
      { labelKey: 'footer.link.privacy', href: '/privacy-policy' },
      { labelKey: 'footer.link.refund', href: '/refund-policy' },
      { labelKey: 'footer.link.gdpr', href: '/gdpr' },
    ],
  },
];
