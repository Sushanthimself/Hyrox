import { useMemo } from 'react';

import { authStoreSelectors, useAuthStore, type AuthStore } from '@/store/auth-store';

import { isEmailVerified } from '../services/auth-service';

export function useAuth() {
  const store = useAuthStore();

  return useMemo(
    () => ({
      hasCompletedOnboarding: store.hasCompletedOnboarding,
      isAuthenticated: authStoreSelectors.isAuthenticated(store),
      isEmailVerified: isEmailVerified(store.user),
      isReady: store.isReady,
      needsEmailVerification: authStoreSelectors.needsEmailVerification(store),
      onboardingEntryPrepared: store.onboardingEntryPrepared,
      onboardingIntent: store.onboardingIntent,
      pendingVerificationEmail: store.pendingVerificationEmail,
      session: store.session,
      status: store.status,
      user: store.user
    }),
    [store]
  );
}

export function useAuthStoreSlice<T>(selector: (state: AuthStore) => T): T {
  return useAuthStore(selector);
}
