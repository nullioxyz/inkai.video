import Image from 'next/image';
import mainLogo from '@public/images/shared/main-logo.svg';
import Link from 'next/link';
import RevealAnimation from '../animation/RevealAnimation';

const LoginHero = () => {
  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="main-container">
        <RevealAnimation delay={0.1}>
          <div className="bg-background-6 border-stroke-7 mx-auto w-full min-w-[400px] max-w-[400px] rounded-[20px] border px-10 py-14">
            <div className="mb-10 flex justify-center">
              <Image src={mainLogo} alt="Inkai" width={150} height={36} className="dark:invert" />
            </div>
            <form>
              <fieldset className="mb-4 space-y-2">
                <label htmlFor="email" className="text-tagline-2 text-accent block font-medium select-none">
                  Your email
                </label>
                <input type="email" id="email" className="auth-form-input" placeholder="Email address" />
              </fieldset>
              <fieldset className="mb-3 space-y-2">
                <label htmlFor="password" className="text-tagline-2 text-accent block font-medium select-none">
                  Password
                </label>
                <input type="password" id="password" className="auth-form-input" placeholder="At least 8 characters" />
              </fieldset>
              <div className="mt-8">
                <button type="submit" className="btn btn-md btn-primary w-full first-letter:uppercase before:content-none">
                  Log In
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
