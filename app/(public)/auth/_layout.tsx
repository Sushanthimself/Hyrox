import { Stack, useSegments } from 'expo-router';

import { PublicRoute, usePublicRouteGate } from '@/navigation';

export default function AuthLayout() {
  const gate = usePublicRouteGate();
  const segments = useSegments() as string[];
  const isVerifyRoute = segments.includes('verify-email');

  return (
    <PublicRoute {...gate} allowUnverified={isVerifyRoute}>
      <Stack screenOptions={{ animation: 'fade_from_bottom', headerShown: false }} />
    </PublicRoute>
  );
}
