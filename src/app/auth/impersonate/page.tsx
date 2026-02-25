'use client';

import { ApiError } from '@/lib/api/client';
import { exchangeImpersonationHash, getMe } from '@/lib/api/dashboard';
import { getStoredAuthToken, setStoredAuthToken } from '@/lib/auth-session';
import { normalizeImpersonationHash } from '@/modules/auth/application/impersonation-hash';
import { resolvePostLoginRoute } from '@/modules/auth/application/post-login-route';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ImpersonatePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('Validando acesso...');

  useEffect(() => {
    const hash = normalizeImpersonationHash(searchParams.get('impersonation_hash'));
    if (!hash) {
      router.replace('/login');
      return;
    }

    const currentToken = getStoredAuthToken();
    if (!currentToken) {
      router.replace(`/login?impersonation_hash=${encodeURIComponent(hash)}`);
      return;
    }

    const run = async () => {
      try {
        setMessage('Trocando sessão...');
        const exchanged = await exchangeImpersonationHash(currentToken, hash);
        setStoredAuthToken(exchanged.access_token);
        const me = await getMe(exchanged.access_token);
        router.replace(resolvePostLoginRoute(me.must_reset_password));
      } catch (error) {
        const fallback = 'Não foi possível assumir este usuário.';
        const details = error instanceof ApiError ? error.message : fallback;
        setMessage(details);
      }
    };

    void run();
  }, [router, searchParams]);

  return (
    <main className="dark bg-background-7 flex min-h-screen items-center justify-center px-4">
      <div className="bg-background-6 border-stroke-7 w-full max-w-md rounded-2xl border p-8 text-center">
        <h1 className="text-accent text-xl font-semibold">Impersonação</h1>
        <p className="text-tagline-2 text-accent/80 mt-3">{message}</p>
      </div>
    </main>
  );
};

export default ImpersonatePage;
