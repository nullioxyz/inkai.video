import facebookImage from '@public/images/icons/facebook-v2.svg';
import googleImage from '@public/images/icons/google.svg';
import Image from 'next/image';
import Link from 'next/link';
import RevealAnimation from '../animation/RevealAnimation';

const LoginHero = () => {
  return (
    <section className="pt-[120px] pb-[70px] lg:pt-[180px] lg:pb-[100px]">
      <div className="main-container">
        <RevealAnimation delay={0.1}>
          <div className="mx-auto w-full max-w-[866px] overflow-hidden rounded-4xl bg-cover bg-center bg-no-repeat sm:bg-[url('/images/ns-img-375.jpg')] sm:p-[70px]">
            <RevealAnimation delay={0.1}>
              <div className="bg-background-1 dark:bg-background-6 max-w-[400px] rounded-[20px] px-8 py-14">
                <form className="mb-6">
                  <fieldset className="mb-4 space-y-2">
                    <label
                      htmlFor="email"
                      className="text-tagline-2 text-secondary dark:text-accent block font-medium select-none">
                      Your email
                    </label>
                    <input type="email" id="email" className="auth-form-input" placeholder="Email address" />
                  </fieldset>
                  <fieldset className="mb-3 space-y-2">
                    <label
                      htmlFor="password"
                      className="text-tagline-2 text-secondary dark:text-accent block font-medium select-none">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="auth-form-input"
                      placeholder="At least 8 characters"
                    />
                  </fieldset>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="inline-flex cursor-pointer items-center gap-2">
                        <input type="checkbox" name="terms" className="peer sr-only" aria-label="Remember me" />
                        <span className="border-stroke-3 dark:border-stroke-7 after:bg-primary-500 peer-checked:border-primary-500 relative size-5 cursor-pointer rounded-full border after:absolute after:top-1/2 after:left-1/2 after:size-3 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:opacity-0 peer-checked:after:opacity-100" />
                        <span className="text-tagline-2 text-secondary dark:text-accent font-medium select-none">
                          Remember me
                        </span>
                      </label>
                    </div>
                    <div>
                      <Link href="#" className="text-tagline-2 text-secondary dark:text-accent font-medium underline">
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                  <div className="mt-8">
                    <button
                      type="submit"
                      className="btn btn-md btn-primary w-full first-letter:uppercase before:content-none">
                      Log In
                    </button>
                  </div>
                </form>
                <div>
                  <p className="text-tagline-2 text-secondary dark:text-accent flex items-center justify-center gap-1 text-center font-normal">
                    Not registered yet?
                    <Link href="/signup" className="text-tagline-1 footer-link-v2 font-medium">
                      Create an Account
                    </Link>
                  </p>
                  <div className="py-8 text-center">
                    <p className="text-tagline-2 text-secondary dark:text-accent font-normal">Or</p>
                  </div>
                  <div className="space-y-4">
                    <button className="border-stroke-3 dark:border-stroke-7 group hover:bg-primary-500 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border px-8 py-3 transition-colors duration-500 ease-in-out">
                      <span className="block size-6">
                        <Image src={googleImage} alt="google" className="size-full" />
                      </span>
                      <span className="text-tagline-2 text-secondary dark:text-accent group-hover:text-accent font-medium transition-colors duration-500 ease-in-out">
                        Continue with Google
                      </span>
                    </button>
                    <button className="border-stroke-3 dark:border-stroke-7 group hover:bg-primary-500 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border px-8 py-3 transition-colors duration-500 ease-in-out">
                      <span className="block size-6">
                        <Image src={facebookImage} alt="facebook" className="size-full" />
                      </span>
                      <span className="text-tagline-2 text-secondary dark:text-accent group-hover:text-accent font-medium transition-colors duration-500 ease-in-out">
                        Continue with facebook
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </RevealAnimation>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

LoginHero.displayName = 'LoginHero';
export default LoginHero;
