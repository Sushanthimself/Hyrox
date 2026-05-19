import { useEffect, type PropsWithChildren } from 'react';
import { useRouter, type Href } from 'expo-router';

import { ROUTES } from '@/constants';

type ProtectedRouteProps = PropsWithChildren<{
  hasCompletedOnboarding: boolean;
  isAuthenticated: boolean;
  isReady: boolean;
  needsEmailVerification: boolean;
}>;

export function ProtectedRoute({
  children,
  hasCompletedOnboarding,
  isAuthenticated,
  isReady,
  needsEmailVerification
}: ProtectedRouteProps) {
  const router = useRouter();
  const redirectHref = needsEmailVerification
    ? (ROUTES.auth.verifyEmail as Href)
    : !isAuthenticated
      ? (ROUTES.auth.signIn as Href)
      : !hasCompletedOnboarding
        ? (ROUTES.onboarding.index as Href)
        : null;

  useEffect(() => {
    if (isReady && redirectHref) {
      router.replace(redirectHref as Href);
    }
  }, [isReady, redirectHref, router]);

  if (!isReady) {
    return null;
  }

  if (redirectHref) {
    return null;
  }

  return children;
}
