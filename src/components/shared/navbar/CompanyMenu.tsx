'use client';
import {
  AboutIcon,
  CareerIcon,
  CaseStudyICon,
  CustomersIcon,
  ManifestoIcon,
  ServiceIcon,
  TeamIcon,
  TestimonialIcon,
  UseCaseIcon,
  WhyChooseUsIcon,
} from '@/icons/menu-icon';
import { cn } from '@/utils/cn';
import newArrowWhite from '@public/images/icons/new-arrow-white.svg';
import nsImg422 from '@public/images/ns-img-422.jpg';
import Image from 'next/image';
import Link from 'next/link';
import CompanyMenuLink, { type CompanyMenuLinkProps } from './CompanyMenuLink';

type CompanyLink = Omit<CompanyMenuLinkProps, 'onClose'>;

const aboutLinks: CompanyLink[] = [
  {
    title: 'About Us',
    description: 'See how others are using NextSaaS',
    href: '/about',
    icon: AboutIcon,
  },
  {
    title: 'Our Team',
    description: 'Dynamic content solutions',
    href: '/team',
    icon: TeamIcon,
  },
  {
    title: 'Career',
    description: 'Join our team',
    href: '/career',
    icon: CareerIcon,
  },
  {
    title: 'Why Choose Us',
    description: 'Our unique selling points and competitive advantages',
    href: '/why-choose-us',
    icon: WhyChooseUsIcon,
  },
];

const cultureLinks: CompanyLink[] = [
  {
    title: 'Our Manifesto',
    description: 'Our values and principles',
    href: '/our-manifesto',
    icon: ManifestoIcon,
  },
  {
    title: 'Customers',
    description: 'Success stories and testimonials',
    href: '/customer',
    icon: CustomersIcon,
  },
  {
    title: 'Testimonials',
    description: 'What our customers say about us',
    href: '/testimonial',
    icon: TestimonialIcon,
  },
  {
    title: 'Case Studies',
    description: 'Real-world examples of our solutions',
    href: '/case-study',
    icon: CaseStudyICon,
  },
];

const solutionLinks: CompanyLink[] = [
  {
    title: 'Services',
    description: 'Our services and offerings',
    href: '/services',
    icon: ServiceIcon,
  },
  {
    title: 'Use Cases',
    description: 'Real-world examples of our solutions',
    href: '/use-case',
    icon: UseCaseIcon,
  },
];

const CompanyMenu = ({
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
          '0.3 ease ease fixed top-full left-1/2 z-40 h-3 w-[946px] -translate-x-1/2 bg-transparent transition-opacity duration-300',
          menuDropdownId === 'company-mega-menu' ? '!pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      <div
        id="company-mega-menu"
        className={cn(
          'dark:bg-background-6 border-stroke-1 ease fixed top-full left-1/2 z-50 mt-2 hidden w-full -translate-x-1/2 items-start gap-y-6 rounded-[20px] border bg-white p-4 transition-all duration-300 md:w-[946px] md:gap-x-6 xl:flex dark:border-white/10',
          // when hover show the menu
          menuDropdownId === 'company-mega-menu'
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2.5 opacity-0',
        )}>
        <div className="flex-1 space-y-3">
          <ul className="space-y-2">
            {aboutLinks.map((link) => (
              <CompanyMenuLink key={link.title} {...link} onClose={handleClose} />
            ))}
          </ul>
        </div>
        <div className="flex-1 space-y-3">
          <ul className="space-y-2">
            {cultureLinks.map((link) => (
              <CompanyMenuLink key={link.title} {...link} onClose={handleClose} />
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <div className="space-y-3">
            <ul className="space-y-2">
              {solutionLinks.map((link) => (
                <CompanyMenuLink key={link.title} {...link} onClose={handleClose} />
              ))}
            </ul>
          </div>
          <p className="text-tagline-2 text-secondary/60 dark:text-accent/60 p-3 font-medium">What’s new</p>
          <div>
            <figure className="group relative h-[166px] w-full max-w-full overflow-hidden rounded-[14px]">
              <Image src={nsImg422} alt="What’s new" className="h-full w-full rounded-[14px] object-cover" />
              <div className="absolute top-3 bottom-3 left-3 w-full space-y-5 p-2">
                <div>
                  <p className="text-tagline-1 text-secondary font-normal">Product updates</p>
                  <p className="text-tagline-2 text-secondary/60 w-full max-w-[169px] font-normal">
                    Stay ahead with the latest features and improvements.
                  </p>
                </div>
                <Link
                  onClick={handleClose}
                  href="/documentation"
                  className="group-hover:bg-primary-500 group bg-secondary relative flex h-9.5 w-16 items-center justify-center space-y-5 overflow-hidden rounded-[40px] px-5 py-2 ring-[6px] ring-white transition-all duration-500 ease-in-out">
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
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

CompanyMenu.displayName = 'CompanyMenu';
export default CompanyMenu;
