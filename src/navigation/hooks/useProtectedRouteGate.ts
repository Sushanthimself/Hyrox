import { useAuth } from '@/features/auth/hooks/useAuth';

export function useProtectedRouteGate() {
  const auth = useAuth();

  return {
    hasCompletedOnboarding: auth.hasCompletedOnboarding,
    isAuthenticated: auth.isAuthenticated && auth.isEmailVerified,
    isReady: auth.isReady,
    needsEmailVerification: auth.needsEmailVerification
  };
}

export function usePublicRouteGate() {
  const auth = useAuth();

  return {
    hasCompletedOnboarding: auth.hasCompletedOnboarding,
    isAuthenticated: auth.isAuthenticated,
    isEmailVerified: auth.isEmailVerified,
    isReady: auth.isReady,
    needsEmailVerification: auth.needsEmailVerification,
    pendingVerificationEmail: auth.pendingVerificationEmail
  };
}

export function useRootRouteGate() {
  const auth = useAuth();

  return {
    hasCompletedOnboarding: auth.hasCompletedOnboarding,
    isAuthenticated: auth.isAuthenticated && auth.isEmailVerified,
    isReady: auth.isReady,
    needsEmailVerification:
      auth.needsEmailVerification || Boolean(auth.pendingVerificationEmail)
  };
}
