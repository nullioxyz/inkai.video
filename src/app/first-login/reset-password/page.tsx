'use client';

import FirstLoginResetPasswordHero from '@/components/authentication/FirstLoginResetPasswordHero';
import { getMe } from '@/lib/api/dashboard';
import { getStoredAuthToken } from '@/lib/auth-session';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const FirstLoginResetPasswordPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getStoredAuthToken();
    if (!token) {
      router.replace('/login');
      return;
    }

    const check = async () => {
      try {
        const me = await getMe(token);
        if (!me.must_reset_password) {
          router.replace('/dashboard');
        }
      } catch {
        router.replace('/login');
      }
    };

    void check();
  }, [router]);

  return (
    <main className="dark bg-background-7">
      <FirstLoginResetPasswordHero />
    </main>
  );
};

export default FirstLoginResetPasswordPage;
