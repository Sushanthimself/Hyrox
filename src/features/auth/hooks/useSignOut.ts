import { useCallback } from 'react';
import { useRouter, type Href } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';

import { ROUTES } from '@/constants';
import { useAuthStore } from '@/store/auth-store';

import { AUTH_QUERY_KEYS } from '../constants';
import { useSignOutMutation } from './useAuthMutations';

export function useSignOut() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const reset = useAuthStore((state) => state.reset);
  const setPendingVerificationEmail = useAuthStore((state) => state.setPendingVerificationEmail);
  const signOutMutation = useSignOutMutation();

  const signOut = useCallback(async () => {
    const result = await signOutMutation.mutateAsync();

    if (result.error) {
      return result;
    }

    await setPendingVerificationEmail(null);
    await reset();
    queryClient.setQueryData(AUTH_QUERY_KEYS.session, null);
    queryClient.removeQueries({ queryKey: AUTH_QUERY_KEYS.all });
    router.replace(ROUTES.auth.signIn as Href);

    return result;
  }, [queryClient, reset, router, setPendingVerificationEmail, signOutMutation]);

  return {
    isPending: signOutMutation.isPending,
    signOut
  };
}
