import { Stack } from 'expo-router';

import { AppProviders } from '@/providers';

export function RootLayout() {
  return (
    <AppProviders>
      <Stack screenOptions={{ animation: 'fade', headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(public)" />
        <Stack.Screen name="(protected)" />
        <Stack.Screen
          name="modals"
          options={{ animation: 'slide_from_bottom', presentation: 'modal' }}
        />
      </Stack>
    </AppProviders>
  );
}
