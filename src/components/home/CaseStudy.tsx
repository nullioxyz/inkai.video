import { ICaseStudy } from '@/interface';
import getMarkDownData from '@/utils/getMarkDownData';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/Button';

const CaseStudy = () => {
  const caseStudyData = getMarkDownData<ICaseStudy & { [key: string]: unknown }>('src/data/case-study').filter(
    (project) => project.showHomePage === true,
  );

  return (
    <section className="py-16 lg:py-20 xl:py-25">
      <div className="main-container">
        <div className="mb-10 text-center lg:mb-[70px]">
          <div className="space-y-3">
            <RevealAnimation delay={0.1}>
              <h2>Experience the power of our platform.</h2>
            </RevealAnimation>
            <RevealAnimation delay={0.2}>
              <p className="mx-auto max-w-[680px]">
                Our platform is crafted with a clean, user-friendly interface that ensures effortless navigation while
                delivering powerful capabilities under the hood. Every feature..
              </p>
            </RevealAnimation>
          </div>
        </div>
        <div className="mb-14">
          <div className="grid grid-cols-12 gap-y-14 lg:gap-x-14">
            <RevealAnimation delay={0.3}>
              <div className="col-span-12">
                <figure className="space-y-6">
                  <div className="group relative h-[300px] w-full cursor-pointer overflow-hidden rounded-[20px] lg:h-[802px]">
                    <Image
                      src={caseStudyData[0]?.thumbnail || ''}
                      fill
                      priority
                      className="h-full w-full rounded-[20px] object-cover transition-transform duration-500 group-hover:scale-110"
                      alt="portfolio"
                    />
                    {/* Black Overlay */}
                    <div className="absolute inset-0 transition-all duration-500 ease-in-out group-hover:bg-black/40" />
                    <div className="group/btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%-8px)] scale-95 opacity-0 transition-all duration-500 ease-out group-hover:-translate-y-1/2 group-hover:scale-110 group-hover:opacity-100">
                      <LinkButton
                        href={`/case-study/${caseStudyData[0]?.slug || ''}`}
                        btnClass="btn-xl-v2 btn-green-v2 group-hover/btn-v2:btn-primary-v2">
                        View details
                      </LinkButton>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
                    <h3 className="text-heading-6 sm:text-heading-5 lg:max-w-[250px]">{caseStudyData[0].title}</h3>
                    <p className="max-w-[257px] text-left md:text-right">{caseStudyData[0].description}</p>
                  </div>
                </figure>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.1}>
              <div className="col-span-12 lg:col-span-6">
                <figure className="space-y-6">
                  <div className="group relative h-[300px] w-full cursor-pointer overflow-hidden rounded-[20px] lg:h-[802px]">
                    <Image
                      src={caseStudyData[2]?.thumbnail || ''}
                      className="h-full w-full rounded-[20px] object-cover transition-transform duration-500 group-hover:scale-110"
                      alt="portfolio"
                      fill
                      priority
                    />
                    {/* Black Overlay */}
                    <div className="absolute inset-0 bg-black/0 transition-all duration-500 ease-in-out group-hover:bg-black/40" />
                    <div className="group/btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%-8px)] scale-95 opacity-0 transition-all duration-500 ease-out group-hover:-translate-y-1/2 group-hover:scale-110 group-hover:opacity-100">
                      <LinkButton
                        href={`/case-study/${caseStudyData[2]?.slug || ''}`}
                        btnClass="btn-xl-v2 btn-green-v2 group-hover/btn-v2:btn-primary-v2">
                        View details
                      </LinkButton>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
                    <h3 className="text-heading-6 sm:text-heading-5 lg:max-w-[250px]">
                      {caseStudyData[2].title || ''}
                    </h3>
                    <p className="max-w-[257px] text-left md:text-right">{caseStudyData[2].description}</p>
                  </div>
                </figure>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.2}>
              <div className="col-span-12 lg:col-span-6">
                <figure className="space-y-6">
                  <div className="group relative h-[300px] w-full cursor-pointer overflow-hidden rounded-[20px] lg:h-[802px]">
                    <Image
                      src={caseStudyData[3]?.thumbnail || ''}
                      fill
                      priority
                      alt="portfolio"
                      className="h-full w-full rounded-[20px] object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Black Overlay */}
                    <div className="absolute inset-0 bg-black/0 transition-all duration-500 ease-in-out group-hover:bg-black/40" />
                    <div className="group/btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%-8px)] scale-95 opacity-0 transition-all duration-500 ease-out group-hover:-translate-y-1/2 group-hover:scale-110 group-hover:opacity-100">
                      <LinkButton
                        href={`/case-study/${caseStudyData[3]?.slug || ''}`}
                        btnClass="btn-xl-v2 btn-green-v2 group-hover/btn-v2:btn-primary-v2">
                        View details
                      </LinkButton>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
                    <h3 className="text-heading-6 sm:text-heading-5 lg:max-w-[250px]">{caseStudyData[3].title}</h3>
                    <p className="max-w-[257px] text-left md:text-right">{caseStudyData[3].description}</p>
                  </div>
                </figure>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.1}>
              <div className="col-span-12">
                <figure className="space-y-6">
                  <div className="group relative h-[300px] w-full cursor-pointer overflow-hidden rounded-[20px] lg:h-[802px]">
                    <Image
                      src={caseStudyData[1]?.thumbnail || ''}
                      fill
                      priority
                      className="h-full w-full rounded-[20px] object-cover transition-transform duration-500 group-hover:scale-110"
                      alt="portfolio"
                    />
                    {/* Black Overlay */}
                    <div className="absolute inset-0 bg-black/0 transition-all duration-500 ease-in-out group-hover:bg-black/40" />
                    <div className="group/btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%-8px)] scale-95 opacity-0 transition-all duration-500 ease-out group-hover:-translate-y-1/2 group-hover:scale-110 group-hover:opacity-100">
                      <LinkButton
                        href={`/case-study/${caseStudyData[1]?.slug || ''}`}
                        btnClass="btn-xl-v2 btn-green-v2 group-hover/btn-v2:btn-primary-v2">
                        View details
                      </LinkButton>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
                    <h3 className="text-heading-6 sm:text-heading-5">{caseStudyData[1].title}</h3>
                    <p className="max-w-[257px] text-left md:text-right">{caseStudyData[1].description}</p>
                  </div>
                </figure>
              </div>
            </RevealAnimation>
          </div>
        </div>

        <RevealAnimation delay={0.2}>
          <div className="group text-center">
            <LinkButton href="/case-study" btnClass="btn-xl-v2 btn-secondary-v2 group-hover/btn-v2:btn-primary-v2">
              See all projects
            </LinkButton>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

CaseStudy.displayName = 'CaseStudy';
export default CaseStudy;
