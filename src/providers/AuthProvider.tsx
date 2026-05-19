import { useEffect, type PropsWithChildren } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { AUTH_QUERY_KEYS } from '@/features/auth/constants';
import { authService } from '@/features/auth/services/auth-service';
import { useAuthStore } from '@/store/auth-store';
import { registerSupabaseAppStateAuthRefresh, supabase } from '@/services/supabase/client';

export function AuthProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const hydrateOnboardingFlags = useAuthStore((state) => state.hydrateOnboardingFlags);
  const setReady = useAuthStore((state) => state.setReady);
  const setSession = useAuthStore((state) => state.setSession);

  const sessionQuery = useQuery({
    queryKey: AUTH_QUERY_KEYS.session,
    queryFn: async () => {
      const result = await authService.getSession();
      if (result.error) {
        return null;
      }
      return result.data;
    },
    staleTime: Infinity,
    retry: false
  });

  useEffect(() => {
    const unregisterAppState = registerSupabaseAppStateAuthRefresh();

    const bootstrap = async () => {
      await hydrateOnboardingFlags();
      setSession(sessionQuery.data ?? null);
      setReady(true);
    };

    if (sessionQuery.isFetched) {
      void bootstrap();
    }

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      queryClient.setQueryData(AUTH_QUERY_KEYS.session, session);
    });

    return () => {
      subscription.unsubscribe();
      unregisterAppState();
    };
  }, [
    hydrateOnboardingFlags,
    queryClient,
    sessionQuery.data,
    sessionQuery.isFetched,
    setReady,
    setSession
  ]);

  return children;
}
