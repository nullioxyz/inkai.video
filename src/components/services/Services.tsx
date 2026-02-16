import avatar1 from '@public/images/ns-avatar-1.png';
import avatar2 from '@public/images/ns-avatar-2.png';
import avatar3 from '@public/images/ns-avatar-3.png';
import timeIncrease from '@public/images/ns-img-100.png';
import controlCard from '@public/images/ns-img-101.png';
import revenue from '@public/images/ns-img-102.png';
import balance from '@public/images/ns-img-103.png';
import earning from '@public/images/ns-img-393.svg';
import dailyPayment from '@public/images/ns-img-395.svg';
import earningDark from '@public/images/ns-img-dark-212.svg';
import dailyPaymentDark from '@public/images/ns-img-dark-214.svg';
import revenueDark from '@public/images/ns-img-dark-74.png';
import balanceDark from '@public/images/ns-img-dark-75.png';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/Button';

const Services = () => {
  return (
    <section className="pt-32 pb-24 sm:pt-36 md:pt-42 md:pb-32 lg:pb-44 xl:pt-[180px] xl:pb-[200px]">
      <div className="main-container">
        <div className="mb-[70px] space-y-5 text-center">
          <RevealAnimation delay={0.2}>
            <span className="badge badge-green">Services</span>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <h2>Enterprise-grade security &amp; intelligence</h2>
          </RevealAnimation>
        </div>
        <div className="flex flex-wrap gap-4 space-y-[42px]">
          <RevealAnimation delay={0.4}>
            <div className="border-stroke-1 dark:border-stroke-7 bg-background-1 dark:bg-background-6 rounded-[20px] border p-7 lg:max-w-full lg:p-[42px]">
              <div className="grid grid-cols-12 items-center gap-y-10 lg:gap-20 xl:gap-[100px]">
                <div className="col-span-12 lg:col-span-6">
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <h3>Automated Background Replacement</h3>
                      <p className="w-full max-w-[410px]">
                        Utilize comprehensive data security frameworks to effectively safeguard sensitive information
                        from unauthorized access and breaches.
                      </p>
                    </div>
                    <div>
                      <LinkButton
                        href="/services/automated-background-replacement"
                        btnClass="btn-md-v2 btn-v2-white group-hover/btn-v2:btn-primary-v2">
                        Read more
                      </LinkButton>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <div className="flex items-center gap-8">
                    <figure className="w-full max-w-[233px] overflow-hidden rounded-2xl">
                      <Image src={timeIncrease} alt="time increase" className="w-full" />
                    </figure>
                    <figure className="w-full max-w-[350px] overflow-hidden rounded-[20px]">
                      <Image src={controlCard} alt="control car" className="w-full" />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </RevealAnimation>
          <RevealAnimation delay={0.5}>
            <div className="border-stroke-1 dark:border-stroke-7 bg-background-1 dark:bg-background-6 rounded-[20px] border p-7 lg:max-w-full lg:p-[42px]">
              <div className="grid grid-cols-12 items-center gap-y-10 lg:gap-20 xl:gap-[100px]">
                <div className="col-span-12 lg:col-span-6">
                  <div className="flex items-center gap-8">
                    <figure className="h-full max-h-[317px] w-full max-w-[326px] overflow-hidden rounded-[20px]">
                      <Image src={revenue} alt="revenue" className="h-full w-full object-cover dark:hidden" />
                      <Image src={revenueDark} alt="revenue" className="hidden h-full w-full object-cover dark:block" />
                    </figure>
                    <figure className="h-full max-h-[178px] w-full max-w-[255px] overflow-hidden rounded-2xl">
                      <Image src={balance} alt="balance" className="h-full w-full object-cover dark:hidden" />
                      <Image src={balanceDark} alt="balance" className="hidden h-full w-full object-cover dark:block" />
                    </figure>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <h3>Batch Image Processing</h3>
                      <p className="w-full max-w-[493px]">
                        Utilize advanced predictive analytics to proactively identify potential threats before they
                        escalate. by analyzing patterns and trends in data.
                      </p>
                    </div>
                    <div>
                      <LinkButton
                        href="/services/batch-image-processing"
                        btnClass="btn-md-v2 btn-v2-white group-hover/btn-v2:btn-primary-v2">
                        View more
                      </LinkButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealAnimation>
          <RevealAnimation delay={0.6}>
            <div className="border-stroke-1 dark:border-stroke-7 bg-background-1 dark:bg-background-6 rounded-[20px] border p-7 lg:max-w-full lg:p-[42px]">
              <div className="grid grid-cols-12 items-center gap-y-10 lg:gap-20 xl:gap-[100px]">
                <div className="col-span-12 lg:col-span-6">
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <h3>Cloud Integration</h3>
                      <p className="w-full max-w-[380px]">
                        Continuously monitor for vulnerabilities and implement proactive measures to prevent cyber
                        attacks before they can occur.
                      </p>
                    </div>
                    <div>
                      <LinkButton
                        href="/services/cloud-integration"
                        btnClass="btn-md-v2 btn-v2-white group-hover/btn-v2:btn-primary-v2">
                        View more
                      </LinkButton>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <div className="flex items-start gap-8">
                    <figure className="h-full max-h-[345px] w-full max-w-[350px] overflow-hidden rounded-[20px]">
                      <Image src={earning} alt="earning" className="h-full w-full object-cover dark:hidden" />
                      <Image src={earningDark} alt="earning" className="hidden h-full w-full object-cover dark:block" />
                    </figure>
                    <div className="space-y-8">
                      <figure className="h-full max-h-[190px] w-full max-w-[286px] overflow-hidden rounded-2xl">
                        <Image
                          src={dailyPayment}
                          alt="daily payment"
                          className="h-full w-full object-cover dark:hidden"
                        />
                        <Image
                          src={dailyPaymentDark}
                          alt="daily payment"
                          className="hidden h-full w-full object-cover dark:block"
                        />
                      </figure>
                      <div>
                        <div className="space-y-4">
                          <div className="flex cursor-pointer -space-x-3.5">
                            <Image
                              className="bg-ns-green inline-block size-11 rounded-full ring-4 ring-white"
                              src={avatar1}
                              alt="Avatar 1"
                            />
                            <Image
                              className="bg-ns-green inline-block size-11 rounded-full ring-4 ring-white"
                              src={avatar2}
                              alt="Avatar 2"
                            />
                            <Image
                              className="bg-ns-green relative z-0 inline-block size-11 rounded-full ring-4 ring-white"
                              src={avatar3}
                              alt="Avatar 3"
                            />
                            <div className="bg-ns-green text-secondary/80 text-tagline-3 relative z-10 inline-flex size-11 items-center justify-center rounded-full font-medium ring-4 ring-white">
                              99+
                            </div>
                          </div>
                          <div>
                            <p className="text-secondary dark:text-accent font-medium">Trusted by 20k+</p>
                            <p className="text-tagline-2 font-normal">Customers across the globe</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealAnimation>
          <RevealAnimation delay={0.7}>
            <div className="border-stroke-1 dark:border-stroke-7 bg-background-1 dark:bg-background-6 rounded-[20px] border p-7 lg:max-w-full lg:p-[42px]">
              <div className="grid grid-cols-12 items-center gap-y-10 lg:gap-20 xl:gap-[100px]">
                <div className="col-span-12 lg:col-span-6">
                  <div className="flex items-start -space-x-20">
                    <figure className="w-full max-w-[408px] overflow-hidden rounded-[20px]">
                      <Image src={revenue} alt="revenue" className="h-full w-full object-cover dark:hidden" />
                      <Image src={revenueDark} alt="revenue" className="hidden h-full w-full object-cover dark:block" />
                    </figure>
                    <figure className="mt-4 w-full max-w-[225px] overflow-hidden rounded-2xl">
                      <Image src={balance} alt="balance" className="h-full w-full object-cover dark:hidden" />
                      <Image src={balanceDark} alt="balance" className="hidden h-full w-full object-cover dark:block" />
                    </figure>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <h3>Color Correction & Enhancement</h3>
                      <p className="w-full max-w-[493px]">
                        Utilize advanced predictive analytics to proactively identify potential threats before they
                        escalate. by analyzing patterns and trends in data.
                      </p>
                    </div>
                    <div>
                      <LinkButton
                        href="/services/color-correction-and-enhancement"
                        btnClass="btn-md-v2 btn-v2-white group-hover/btn-v2:btn-primary-v2">
                        Read more
                      </LinkButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};
Services.displayName = 'Services';
export default Services;
