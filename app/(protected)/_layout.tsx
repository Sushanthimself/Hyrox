import { Stack } from 'expo-router';

import { ProtectedRoute, useProtectedRouteGate } from '@/navigation';

export default function ProtectedLayout() {
  const gate = useProtectedRouteGate();

  return (
    <ProtectedRoute
      hasCompletedOnboarding={gate.hasCompletedOnboarding}
      isAuthenticated={gate.isAuthenticated}
      isReady={gate.isReady}
      needsEmailVerification={gate.needsEmailVerification}
    >
      <Stack screenOptions={{ animation: 'fade', headerShown: false }} />
    </ProtectedRoute>
  );
}
