'use client';

import { useLocale } from '@/context/LocaleContext';
import { useState } from 'react';
import RevealAnimation from '../animation/RevealAnimation';
import SocialAuth from './SocialAuth';
import AuthField from './components/AuthField';
import AuthSubmitButton from './components/AuthSubmitButton';
import SignupBackgroundCard from './components/SignupBackgroundCard';
import SignupDivider from './components/SignupDivider';
import SignupInnerCard from './components/SignupInnerCard';

const SignupHero = () => {
  const { t } = useLocale();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <section className="pt-[120px] pb-[70px] lg:pt-[180px] lg:pb-[100px]">
      <div className="main-container">
        <RevealAnimation delay={0.1}>
          <SignupBackgroundCard>
            <RevealAnimation delay={0.1}>
              <SignupInnerCard>
                <form>
                  <AuthField
                    id="username"
                    type="text"
                    label={t('auth.signup.usernameLabel')}
                    placeholder={t('auth.signup.usernamePlaceholder')}
                    value={username}
                    onChange={setUsername}
                  />
                  <AuthField
                    id="email"
                    type="email"
                    label={t('auth.signup.emailLabel')}
                    placeholder={t('auth.signup.emailPlaceholder')}
                    value={email}
                    onChange={setEmail}
                  />
                  <AuthField
                    id="password"
                    type="password"
                    label={t('auth.signup.passwordLabel')}
                    placeholder={t('auth.signup.passwordPlaceholder')}
                    value={password}
                    onChange={setPassword}
                  />
                  <AuthField
                    id="confirm-password"
                    type="password"
                    label={t('auth.signup.confirmPasswordLabel')}
                    placeholder={t('auth.signup.confirmPasswordPlaceholder')}
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                  />
                  <AuthSubmitButton label={t('auth.signup.submit')} disabled={false} />
                </form>
                <SignupDivider label={t('auth.common.or')} />
                <SocialAuth />
              </SignupInnerCard>
            </RevealAnimation>
          </SignupBackgroundCard>
        </RevealAnimation>
      </div>
    </section>
  );
};

SignupHero.displayName = 'SignupHero';
export default SignupHero;
