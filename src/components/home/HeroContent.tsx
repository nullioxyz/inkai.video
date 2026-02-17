import { useLocale } from '@/context/LocaleContext';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/Button';

const HeroContent = () => {
  const { t } = useLocale();

  return (
    <div className="main-container z-10 flex flex-col items-center text-center">
      <RevealAnimation delay={0.1}>
        <span className="badge badge-yellow mb-5">{t('landing.badge')}</span>
      </RevealAnimation>
      <RevealAnimation delay={0.2}>
        <h1 className="max-[426px]:text-heading-5 max-sm:text-heading-4 mb-4 font-medium max-[426px]:mb-2.5 max-sm:max-w-[450px]">
          {t('landing.title.line1')}
          <br className="hidden md:block" />
          {t('landing.title.line2')}
        </h1>
      </RevealAnimation>
      <RevealAnimation delay={0.3}>
        <p className="mb-10 max-w-[625px] max-sm:max-w-[420px] sm:mb-14">{t('landing.description')}</p>
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
    </div>
  );
};

export default HeroContent;
