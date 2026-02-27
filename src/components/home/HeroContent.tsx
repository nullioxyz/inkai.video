import { InstitutionalContent, SocialNetworkItem } from '@/lib/api/public-content';
import { useLocale } from '@/context/LocaleContext';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/Button';

interface HeroContentProps {
  institutionalContent?: InstitutionalContent | null;
  socialNetworks?: SocialNetworkItem[];
}

const HeroContent = ({ institutionalContent, socialNetworks = [] }: HeroContentProps) => {
  const { t } = useLocale();
  const hasInstitutionalTitle = Boolean(institutionalContent?.title && institutionalContent.title.trim() !== '');
  const titleLine1 = hasInstitutionalTitle ? institutionalContent?.title : t('landing.title.line1');
  const titleLine2 = institutionalContent?.subtitle || (hasInstitutionalTitle ? '' : t('landing.title.line2'));
  const description = institutionalContent?.description || institutionalContent?.short_description || t('landing.description');

  return (
    <div className="main-container z-10 flex flex-col items-center text-center">
      <RevealAnimation delay={0.1}>
        <span className="badge badge-yellow mb-5">{titleLine2}</span>
      </RevealAnimation>
      <RevealAnimation delay={0.2}>
        <h1 className="max-[426px]:text-heading-5 max-sm:text-heading-4 mb-4 font-medium max-[426px]:mb-2.5 max-sm:max-w-[450px]">
          {titleLine1}
        </h1>
      </RevealAnimation>
      <RevealAnimation delay={0.3}>
        <p className="mb-10 max-w-[625px] max-sm:max-w-[420px] sm:mb-14">{description}</p>
      </RevealAnimation>
      <ul className="mb-7 flex flex-col gap-4 max-md:w-full md:mb-14 md:flex-row">
        <RevealAnimation delay={0.3} direction="left" offset={50}>
          <li>
            <LinkButton href="/login" btnClass="btn-xl-v2 btn-secondary-v2 group-hover/btn-v2:btn-primary-v2">
              {t('landing.login')}
            </LinkButton>
          </li>
        </RevealAnimation>
      </ul>
      {socialNetworks.length > 0 ? (
        <RevealAnimation delay={0.4}>
          <ul className="flex flex-wrap items-center justify-center gap-3">
            {socialNetworks.map((socialNetwork) => (
              <li key={socialNetwork.id}>
                <a
                  href={socialNetwork.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tagline-2 text-accent/80 hover:text-accent underline-offset-4 hover:underline">
                  {socialNetwork.slug}
                </a>
              </li>
            ))}
          </ul>
        </RevealAnimation>
      ) : null}
    </div>
  );
};

export default HeroContent;
