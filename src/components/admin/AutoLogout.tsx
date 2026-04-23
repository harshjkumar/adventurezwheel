'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function AutoLogout({ timeoutMinutes = 60 }: { timeoutMinutes?: number }) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }, [router, supabase]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleLogout, timeoutMinutes * 60 * 1000);
    };

    // Events that signify user activity
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];

    // Initialize timer
    resetTimer();

    // Attach listeners
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    return () => {
      clearTimeout(timeoutId);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [handleLogout, timeoutMinutes]);

  return null;
}
