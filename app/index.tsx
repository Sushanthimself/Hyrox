import { Redirect, type Href } from 'expo-router';

import { ROUTES } from '@/constants';
import { AuthBootstrapGate } from '@/features/auth/components/AuthBootstrapGate';
import { useRootRouteGate } from '@/navigation/hooks/useProtectedRouteGate';

function RootRedirect() {
  const gate = useRootRouteGate();

  if (!gate.isReady) {
    return null;
  }

  if (!gate.isAuthenticated) {
    if (gate.needsEmailVerification) {
      return <Redirect href={ROUTES.auth.verifyEmail as Href} />;
    }

    return <Redirect href={ROUTES.auth.signIn as Href} />;
  }

  if (!gate.hasCompletedOnboarding) {
    return <Redirect href={ROUTES.onboarding.index as Href} />;
  }

  return <Redirect href={ROUTES.tabs.home as Href} />;
}

export default function IndexRoute() {
  return (
    <AuthBootstrapGate>
      <RootRedirect />
    </AuthBootstrapGate>
  );
}
