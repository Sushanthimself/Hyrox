import { useEffect, type PropsWithChildren } from 'react';
import { useRouter, type Href } from 'expo-router';

import { ROUTES } from '@/constants';

type PublicRouteProps = PropsWithChildren<{
  allowUnverified?: boolean;
  hasCompletedOnboarding: boolean;
  isAuthenticated: boolean;
  isEmailVerified: boolean;
  isReady: boolean;
  needsEmailVerification: boolean;
  pendingVerificationEmail: string | null;
}>;

export function PublicRoute({
  allowUnverified = false,
  children,
  hasCompletedOnboarding,
  isAuthenticated,
  isEmailVerified,
  isReady,
  needsEmailVerification,
  pendingVerificationEmail
}: PublicRouteProps) {
  const router = useRouter();

  const canStayOnVerifyRoute =
    allowUnverified && (needsEmailVerification || Boolean(pendingVerificationEmail));

  const redirectHref: Href | null = !isReady
    ? null
    : canStayOnVerifyRoute
      ? null
      : isAuthenticated && needsEmailVerification
        ? (ROUTES.auth.verifyEmail as Href)
        : isAuthenticated && isEmailVerified
          ? hasCompletedOnboarding
            ? (ROUTES.tabs.home as Href)
            : (ROUTES.onboarding.index as Href)
          : null;

  useEffect(() => {
    if (redirectHref) {
      router.replace(redirectHref);
    }
  }, [redirectHref, router]);

  if (!isReady || redirectHref) {
    return null;
  }

  return children;
}
