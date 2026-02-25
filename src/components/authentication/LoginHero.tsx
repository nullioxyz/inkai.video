'use client';

import { ApiError } from '@/lib/api/client';
import { getStoredAuthToken, setStoredAuthToken } from '@/lib/auth-session';
import { loginWithImpersonationUseCase } from '@/modules/auth/application/login-with-impersonation';
import { resolvePostLoginRoute } from '@/modules/auth/application/post-login-route';
import { createAuthModule } from '@/modules/auth';
import Image from 'next/image';
import mainLogo from '@public/images/shared/main-logo.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import RevealAnimation from '../animation/RevealAnimation';

const authModule = createAuthModule();

const LoginHero = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (getStoredAuthToken()) {
      router.replace('/dashboard');
    }
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      const session = await loginWithImpersonationUseCase(authModule.gateway, {
        email,
        password,
        impersonationHash:
          typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('impersonation_hash') : null,
      });
      setStoredAuthToken(session.accessToken);
      router.push(resolvePostLoginRoute(session.mustResetPassword));
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Não foi possível fazer login.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="main-container">
        <RevealAnimation delay={0.1}>
          <div className="bg-background-6 border-stroke-7 mx-auto w-full min-w-[400px] max-w-[400px] rounded-[20px] border px-10 py-14">
            <div className="mb-10 flex justify-center">
              <Image src={mainLogo} alt="Inkai" width={150} height={36} className="dark:invert" />
            </div>
            <form onSubmit={handleSubmit}>
              <fieldset className="mb-4 space-y-2">
                <label htmlFor="email" className="text-tagline-2 text-accent block font-medium select-none">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="auth-form-input"
                  placeholder="Email address"
                  required
                />
              </fieldset>
              <fieldset className="mb-3 space-y-2">
                <label htmlFor="password" className="text-tagline-2 text-accent block font-medium select-none">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="auth-form-input"
                  placeholder="At least 8 characters"
                  minLength={8}
                  required
                />
              </fieldset>
              {errorMessage && <p className="text-tagline-3 text-ns-red mt-3">{errorMessage}</p>}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-md btn-primary w-full first-letter:uppercase before:content-none disabled:opacity-50">
                  {isSubmitting ? 'Entrando...' : 'Log In'}
                </button>
              </div>
            </form>
            <div className="mt-6 flex justify-center">
              <Link
                href="/"
                className="border-stroke-7 text-tagline-2 text-accent/85 hover:bg-background-7 hover:text-accent inline-flex items-center gap-2 rounded-full border px-5 py-2.5 transition">
                <span aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M15 6 9 12l6 6" />
                  </svg>
                </span>
                <span>Back to landing</span>
              </Link>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

LoginHero.displayName = 'LoginHero';
export default LoginHero;
