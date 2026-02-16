'use client';

import Link from 'next/link';
import { useState } from 'react';

import { CheckIcon } from '@/icons';
import { cn } from '@/utils/cn';

import RevealAnimation from '../animation/RevealAnimation';

type PricingPlan = {
  id: string;
  title: string;
  description: string;
  monthlyPrice: string;
  annualPrice: string;
  descriptionMuted?: boolean;
  featured?: boolean;
  features: {
    label: string;
    active: boolean;
  }[];
};

const pricingPlans: PricingPlan[] = [
  {
    id: 'simplified',
    title: 'Simplified',
    description: 'For individuals and small teams with unlimited trial access.',
    monthlyPrice: '19.00',
    annualPrice: '230.00',
    features: [
      { label: 'Single Payment', active: true },
      { label: 'Selling your own items', active: false },
      { label: 'Powerful integration', active: false },
    ],
  },
  {
    id: 'basic',
    title: 'Basic',
    description: 'For individuals and small teams with unlimited trial access.',
    monthlyPrice: '3342.00',
    annualPrice: '4420.00',
    featured: true,
    descriptionMuted: true,
    features: [
      { label: 'Unlimited Bandwidth', active: true },
      { label: 'Promotional Tools', active: true },
      { label: 'Single Payment', active: true },
      { label: 'Single Payment', active: true },
      { label: 'Selling your own items', active: false },
      { label: 'Powerful integration', active: false },
    ],
  },
  {
    id: 'enhanced',
    title: 'Enhanced',
    description: 'For individuals and small teams with unlimited trial access.',
    monthlyPrice: '4800.00',
    annualPrice: '5800.00',
    descriptionMuted: true,
    features: [
      { label: 'Selling on your own conditions', active: true },
      { label: 'Seamless integrations', active: true },
      { label: 'Real-time streaming', active: false },
    ],
  },
];

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState<boolean>(false);

  return (
    <section className="relative pt-[100px] pb-20 md:pt-[160px] md:pb-[100px] lg:pb-[150px] xl:pb-[200px]">
      <div className="main-container flex flex-col gap-[70px]">
        <div className="flex flex-col items-center text-center">
          <RevealAnimation delay={0.2}>
            <span className="badge badge-yellow-v2 mb-5"> Our Pricing </span>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <h2 className="mx-auto mb-8 max-w-[650px]">Select the pricing plan that best suits your needs.</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.4}>
            <div className="relative z-0">
              <RevealAnimation delay={1} duration={1.2} direction="up" offset={200}>
                <span className="bg-secondary dark:bg-accent text-accent dark:text-secondary text-tagline-2 absolute -top-2.5 -right-6 z-11 inline-block w-[90px] rotate-[20deg] rounded-[36px] px-3.5 py-1.5 font-normal capitalize shadow-xs">
                  save 40%
                </span>
              </RevealAnimation>
              <label className="dark:bg-background-9 relative z-[10] inline-flex cursor-pointer items-center rounded-full bg-white px-[57px] py-6">
                <span className="text-secondary dark:text-accent mr-2.5 text-base font-normal">Monthly</span>
                <input
                  type="checkbox"
                  id="priceCheck"
                  checked={isAnnual}
                  onChange={(e) => setIsAnnual(e.target.checked)}
                  className="peer sr-only"
                  aria-label="Toggle between monthly and yearly pricing"
                />
                <span className="bg-secondary dark:bg-accent *: dark:after:bg-background-9 after:bg-accent d relative h-[28px] w-13 rounded-[34px] after:absolute after:start-[2px] after:top-1/2 after:h-6 after:w-6 after:-translate-y-1/2 after:rounded-full after:transition-all after:content-[''] peer-checked:after:start-[2px] peer-checked:after:translate-x-full" />
                <span className="text-secondary dark:text-accent ms-2.5 text-base font-normal">Yearly</span>
              </label>
            </div>
          </RevealAnimation>
        </div>
        <div className="relative">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => {
              return (
                <RevealAnimation key={plan.id} delay={0.3 + index * 0.1} instant>
                  <div
                    className={cn(
                      'flex-1 rounded-[20px] max-lg:w-full',
                      plan.featured && "bg-[url('/images/ns-img-25.png')] bg-cover bg-center bg-no-repeat p-2.5",
                    )}>
                    <div
                      className={cn(
                        'rounded-[20px] p-8',
                        plan.featured ? 'dark:bg-background-8 bg-white' : 'bg-background-3 dark:bg-background-5',
                      )}>
                      <h3 className="text-heading-5 mb-2 font-normal">{plan.title}</h3>
                      <p
                        className={cn(
                          'mb-6 max-w-[250px]',
                          plan.descriptionMuted && 'text-secondary/60 dark:text-accent/60',
                        )}>
                        {plan.description}
                      </p>
                      <div className="mb-7">
                        <h4 className="text-heading-4 font-normal">
                          $<span>{isAnnual ? plan.annualPrice : plan.monthlyPrice}</span>
                        </h4>
                        <p className="text-secondary dark:text-accent">{isAnnual ? 'Per Year' : 'Per Month'}</p>
                      </div>
                      <Link
                        href="/contact-us"
                        className={cn(
                          'btn btn-md mb-8 block w-full text-center first-letter:uppercase before:content-none',
                          plan.featured
                            ? 'btn-secondary dark:btn-accent hover:btn-primary'
                            : 'btn-white dark:btn-white-dark hover:btn-secondary dark:hover:btn-accent',
                        )}>
                        Get started
                      </Link>
                      <ul className="relative list-none space-y-2.5">
                        {plan.features.map((feature) => (
                          <li key={`${plan.id}-${feature.label}`} className="flex items-center gap-2.5">
                            <span
                              className={cn(
                                'flex h-5 w-5 items-center justify-center rounded-full',
                                feature.active
                                  ? 'bg-secondary dark:bg-accent'
                                  : 'border-secondary/20 dark:border-accent/20 dark:bg-background-9 border bg-white',
                              )}>
                              <CheckIcon className={cn(!feature.active && 'fill-secondary/60 dark:fill-accent/60')} />
                            </span>
                            <span
                              className={cn(
                                'text-tagline-1 font-normal',
                                feature.active
                                  ? 'text-secondary dark:text-accent'
                                  : 'text-secondary/60 dark:text-accent/60',
                              )}>
                              {feature.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </RevealAnimation>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
