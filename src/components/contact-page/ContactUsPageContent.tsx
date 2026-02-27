'use client';

import { useCreateContact } from '@/hooks/useCreateContact';
import mailIcon from '@public/images/icons/mail-open.svg';
import gradientTwo from '@public/images/ns-img-509.png';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useMemo, useState } from 'react';
import RevealAnimation from '../animation/RevealAnimation';

const ContactUsPageContent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const { submit, isSubmitting, successId, error, fieldErrors } = useCreateContact();

  const successMessage = useMemo(() => {
    if (!successId) {
      return null;
    }

    return `Contact sent successfully. Ticket #${successId}.`;
  }, [successId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await submit({
      name,
      email,
      phone: phone.trim() || undefined,
      message,
    });

    if (result.ok) {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }
  };

  return (
    <main className="bg-background-3 dark:bg-background-7">
      <section className="pt-32 pb-14 sm:pt-36 md:pt-42 md:pb-16 lg:pb-20 xl:pt-[180px] xl:pb-[100px]">
        <div className="main-container px-5">
          <div className="space-y-[70px]">
            <div className="mx-auto max-w-[680px] space-y-3 text-center">
              <RevealAnimation delay={0.2}>
                <h2>Reach out to our support team for help.</h2>
              </RevealAnimation>
              <RevealAnimation delay={0.3}>
                <p>Send your message and our team will reply soon.</p>
              </RevealAnimation>
            </div>

            <div className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:items-start lg:gap-8 xl:gap-[70px]">
              <RevealAnimation delay={0.4}>
                <div className="bg-secondary dark:bg-background-6 relative w-full space-y-6 overflow-hidden rounded-[20px] p-11 text-center md:max-w-[371px]">
                  <figure className="pointer-events-none absolute -top-[206px] -left-[36px] size-[350px] rotate-[62deg] overflow-hidden select-none">
                    <Image src={gradientTwo} alt="Decorative gradient overlay" className="size-full object-cover" />
                  </figure>
                  <figure className="mx-auto size-10 overflow-hidden">
                    <Image src={mailIcon} alt="Email icon" className="size-full object-cover" />
                  </figure>
                  <div className="space-y-2.5">
                    <p className="text-heading-6 text-accent">Email Us</p>
                    <p className="text-accent/60">
                      <Link href="mailto:support@inkai.com">support@inkai.com</Link>
                    </p>
                  </div>
                </div>
              </RevealAnimation>

              <RevealAnimation
                delay={0.3}
                className="dark:bg-background-6 mx-auto w-full max-w-[847px] rounded-4xl bg-white p-6 md:p-8 lg:p-11">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                    <div className="w-full space-y-2 lg:max-w-[364px]">
                      <label htmlFor="contact-name" className="text-tagline-2 text-secondary dark:text-accent block font-medium">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="dark:focus-visible:border-stroke-4/20 dark:border-stroke-7 dark:bg-background-6 border-stroke-3 bg-background-1 text-tagline-2 placeholder:text-secondary/60 focus:border-secondary dark:placeholder:text-accent/60 dark:text-accent h-[48px] w-full rounded-full border px-[18px] py-3 font-normal focus:outline-none xl:h-[41px]"
                        aria-invalid={Boolean(fieldErrors.name?.length)}
                        aria-describedby={fieldErrors.name?.length ? 'contact-name-error' : undefined}
                      />
                      {fieldErrors.name?.length ? (
                        <p id="contact-name-error" className="text-tagline-3 text-ns-red">
                          {fieldErrors.name[0]}
                        </p>
                      ) : null}
                    </div>

                    <div className="w-full max-w-[364px] space-y-2">
                      <label htmlFor="contact-phone" className="text-tagline-2 text-secondary dark:text-accent block font-medium">
                        Phone (optional)
                      </label>
                      <input
                        id="contact-phone"
                        type="text"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        className="dark:focus-visible:border-stroke-4/20 dark:border-stroke-7 dark:bg-background-6 border-stroke-3 bg-background-1 text-tagline-2 placeholder:text-secondary/60 focus:border-secondary dark:placeholder:text-accent/60 dark:text-accent h-[48px] w-full rounded-full border px-[18px] py-3 font-normal focus:outline-none xl:h-[41px]"
                        aria-invalid={Boolean(fieldErrors.phone?.length)}
                        aria-describedby={fieldErrors.phone?.length ? 'contact-phone-error' : undefined}
                      />
                      {fieldErrors.phone?.length ? (
                        <p id="contact-phone-error" className="text-tagline-3 text-ns-red">
                          {fieldErrors.phone[0]}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-tagline-2 text-secondary dark:text-accent block font-medium">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="dark:focus-visible:border-stroke-4/20 dark:border-stroke-7 dark:bg-background-6 border-stroke-3 bg-background-1 text-tagline-2 placeholder:text-secondary/60 focus:border-secondary dark:placeholder:text-accent/60 dark:text-accent h-[48px] w-full rounded-full border px-[18px] py-3 font-normal focus:outline-none xl:h-[41px]"
                      aria-invalid={Boolean(fieldErrors.email?.length)}
                      aria-describedby={fieldErrors.email?.length ? 'contact-email-error' : undefined}
                    />
                    {fieldErrors.email?.length ? (
                      <p id="contact-email-error" className="text-tagline-3 text-ns-red">
                        {fieldErrors.email[0]}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-tagline-2 text-secondary dark:text-accent block font-medium">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={7}
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      className="dark:bg-background-6 dark:border-stroke-7 border-stroke-3 bg-background-1 text-tagline-2 placeholder:text-secondary/60 focus:border-secondary dark:placeholder:text-accent/60 dark:text-accent w-full rounded-xl border px-[18px] py-3 font-normal focus:outline-none"
                      aria-invalid={Boolean(fieldErrors.message?.length)}
                      aria-describedby={fieldErrors.message?.length ? 'contact-message-error' : undefined}
                    />
                    {fieldErrors.message?.length ? (
                      <p id="contact-message-error" className="text-tagline-3 text-ns-red">
                        {fieldErrors.message[0]}
                      </p>
                    ) : null}
                  </div>

                  {error ? <p className="text-tagline-2 text-ns-red">{error}</p> : null}
                  {successMessage ? <p className="text-tagline-2 text-ns-green">{successMessage}</p> : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-md btn-secondary hover:btn-primary dark:btn-accent w-full disabled:cursor-not-allowed disabled:opacity-70 before:content-none">
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </button>
                </form>
              </RevealAnimation>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUsPageContent;
