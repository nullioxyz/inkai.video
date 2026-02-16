import { cn } from '@/utils/cn';
import confluenceIcon from '@public/images/icons/confluence.svg';
import edgeIcon from '@public/images/icons/edge.svg';
import figmaIcon from '@public/images/icons/figma.svg';
import framerIcon from '@public/images/icons/framer.svg';
import gmailIcon from '@public/images/icons/gmail.svg';
import googleMeetIcon from '@public/images/icons/google-meet.svg';
import googleIcon from '@public/images/icons/google.svg';
import marvelDarkIcon from '@public/images/icons/marvel-dark.svg';
import marvelIcon from '@public/images/icons/marvel.svg';
import microsoftIcon from '@public/images/icons/microsoft.svg';
import yammerDarkIcon from '@public/images/icons/ms_yammer-dark.svg';
import yammerIcon from '@public/images/icons/ms_yammer.svg';
import slackIcon from '@public/images/icons/slack.svg';
import snapchatIcon from '@public/images/icons/snapchat.svg';
import vlWhiteIcon from '@public/images/icons/vl-white.svg';
import vlIcon from '@public/images/icons/vl.svg';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import RevealAnimation from '../animation/RevealAnimation';

interface IntegrationProps {
  className?: string;
  badgeClass?: string;
}
const Integration = ({ className, badgeClass }: IntegrationProps) => {
  return (
    <section className={cn('py-14 md:py-16 lg:py-[88px] xl:py-[160px]', className)} aria-label="Integration Partners">
      <div className="main-container">
        <div className="space-y-[70px]">
          {/* integration heading  */}
          <div className="mx-auto max-w-[1028px] space-y-5 text-center">
            <RevealAnimation delay={0.2}>
              <span className={cn('badge badge-green', badgeClass)}>Integration</span>
            </RevealAnimation>
            <div className="space-y-3">
              <RevealAnimation delay={0.3}>
                <h2>Enhance your productivity effortlessly with over 50 integrations.</h2>
              </RevealAnimation>
              <RevealAnimation delay={0.4}>
                <p className="mx-auto max-w-[582px]">
                  Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. It&apos;s not
                  Latin though it looks like nothing.
                </p>
              </RevealAnimation>
            </div>
          </div>
          {/* brand logos  */}
          <RevealAnimation delay={0.5} instant>
            <div className="space-y-7">
              {/* marquee logo one  */}
              <div className="relative mx-auto max-w-[1128px]">
                <div className="from-background-2/90 dark:from-background-6 absolute top-0 left-0 z-40 h-[115px] w-[15%] bg-gradient-to-r to-transparent md:w-[20%]" />
                <div className="from-background-2/90 dark:from-background-6 absolute top-0 right-0 z-40 h-[115px] w-[15%] bg-gradient-to-l to-transparent md:w-[20%]" />

                <Marquee autoFill speed={40}>
                  <div className="flex items-center justify-center">
                    <figure className="dark:bg-background-6 ml-8 flex size-[70px] items-center justify-center rounded-full bg-white md:size-[100px]">
                      <Image src={googleIcon} alt="Google logo" loading="lazy" className="size-12" />
                    </figure>
                    <figure className="dark:bg-background-6 flex size-[70px] items-center justify-center rounded-full bg-white md:size-[100px]">
                      <Image src={slackIcon} alt="Slack logo" loading="lazy" className="size-12" />
                    </figure>
                    <figure className="dark:bg-background-6 flex size-[70px] items-center justify-center rounded-full bg-white md:size-[100px]">
                      <Image src={confluenceIcon} alt="Confluence logo" loading="lazy" className="size-12" />
                    </figure>
                    <figure className="dark:bg-background-6 flex size-[70px] items-center justify-center rounded-full bg-white md:size-[100px]">
                      <Image src={snapchatIcon} alt="Snapchat logo" loading="lazy" className="size-12" />
                    </figure>
                    <figure className="dark:bg-background-6 flex size-[70px] items-center justify-center rounded-full bg-white md:size-[100px]">
                      <Image src={yammerIcon} alt="Yammer logo" loading="lazy" className="size-12 dark:hidden" />
                      <Image
                        src={yammerDarkIcon}
                        alt="Yammer logo"
                        loading="lazy"
                        className="hidden dark:inline-block"
                      />
                    </figure>
                    <figure className="dark:bg-background-6 flex size-[70px] items-center justify-center rounded-full bg-white md:size-[100px]">
                      <Image src={figmaIcon} alt="Figma logo" loading="lazy" className="size-12" />
                    </figure>
                    <figure className="dark:bg-background-6 flex size-[70px] items-center justify-center rounded-full bg-white md:size-[100px]">
                      <Image src={microsoftIcon} alt="Microsoft logo" loading="lazy" className="size-12" />
                    </figure>
                  </div>
                </Marquee>
              </div>
              {/* marquee logo two  */}
              <div className="relative mx-auto max-w-[985px]">
                <div className="from-background-2/90 dark:from-background-6 absolute top-0 left-0 z-40 h-[115px] w-[15%] bg-gradient-to-r to-transparent md:w-[20%]" />
                <div className="from-background-2/90 dark:from-background-6 absolute top-0 right-0 z-40 h-[115px] w-[15%] bg-gradient-to-l to-transparent md:w-[20%]" />
                <Marquee autoFill direction="right" speed={40}>
                  <div className="flex items-center justify-center gap-[34px]">
                    <figure className="dark:bg-background-6 ml-8 flex size-[70px] items-center justify-center rounded-full bg-white md:size-[100px]">
                      <Image src={googleMeetIcon} alt="Google Meet logo" loading="lazy" className="size-12" />
                    </figure>
                    <figure className="dark:bg-background-6 flex size-[70px] items-center justify-center rounded-full bg-white md:size-[100px]">
                      <Image src={edgeIcon} alt="Microsoft Edge logo" width={48} height={48} loading="lazy" />
                    </figure>
                    <figure className="dark:bg-background-6 flex size-[70px] items-center justify-center rounded-full bg-white md:size-[100px]">
                      <Image src={vlIcon} alt="LV logo" loading="lazy" className="size-12 dark:hidden" />
                      <Image src={vlWhiteIcon} alt="LV logo" loading="lazy" className="hidden dark:inline-block" />
                    </figure>
                    <figure className="dark:bg-background-6 flex size-[70px] items-center justify-center rounded-full bg-white md:size-[100px]">
                      <Image src={framerIcon} alt="Framer logo" loading="lazy" className="size-12" />
                    </figure>
                    <figure className="dark:bg-background-6 flex size-[70px] items-center justify-center rounded-full bg-white md:size-[100px]">
                      <Image src={marvelIcon} alt="Marvel logo" loading="lazy" className="size-12 dark:hidden" />
                      <Image
                        src={marvelDarkIcon}
                        alt="Marvel logo"
                        loading="lazy"
                        className="hidden dark:inline-block"
                      />
                    </figure>
                    <figure className="dark:bg-background-6 flex size-[70px] items-center justify-center rounded-full bg-white md:size-[100px]">
                      <Image src={confluenceIcon} alt="Confluence logo" loading="lazy" className="size-12" />
                    </figure>
                    <figure className="dark:bg-background-6 flex size-[70px] items-center justify-center rounded-full bg-white md:size-[100px]">
                      <Image src={gmailIcon} alt="Gmail logo" loading="lazy" className="size-12" />
                    </figure>
                  </div>
                </Marquee>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default Integration;
