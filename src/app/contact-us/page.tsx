'use client';

import { useLocale } from '@/context/LocaleContext';
import { FormEvent, useState } from 'react';

const ContactUsPage = () => {
  const { t } = useLocale();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <main className="bg-background-3 dark:bg-background-7 min-h-screen">
      <section className="main-container px-5 py-16 md:py-24">
        <div className="mx-auto max-w-2xl space-y-8">
          <header className="space-y-4 text-center">
            <h1 className="text-heading-3 text-secondary dark:text-accent">{t('contact.title')}</h1>
            <p className="text-tagline-1 text-secondary/70 dark:text-accent/70">{t('contact.subtitle')}</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="contact-name" className="text-tagline-2 text-secondary dark:text-accent font-medium">
                {t('contact.name')}
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={t('contact.namePlaceholder')}
                className="border-stroke-3 dark:border-stroke-7 bg-background-1/40 dark:bg-background-7/40 text-secondary dark:text-accent h-11 w-full rounded-[10px] border px-4 outline-none transition focus:border-primary-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-tagline-2 text-secondary dark:text-accent font-medium">
                {t('contact.email')}
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t('contact.emailPlaceholder')}
                className="border-stroke-3 dark:border-stroke-7 bg-background-1/40 dark:bg-background-7/40 text-secondary dark:text-accent h-11 w-full rounded-[10px] border px-4 outline-none transition focus:border-primary-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-tagline-2 text-secondary dark:text-accent font-medium">
                {t('contact.message')}
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={6}
                placeholder={t('contact.messagePlaceholder')}
                className="border-stroke-3 dark:border-stroke-7 bg-background-1/40 dark:bg-background-7/40 text-secondary dark:text-accent w-full rounded-[10px] border px-4 py-3 outline-none transition focus:border-primary-400"
              />
            </div>

            <button type="submit" className="btn-md-v2 btn-v2-white h-10 rounded-[10px] px-5 text-tagline-2 font-medium">
              {t('contact.submit')}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ContactUsPage;
