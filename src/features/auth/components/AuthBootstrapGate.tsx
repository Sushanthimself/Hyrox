import type { PropsWithChildren } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Text } from '@/components/ui';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useTheme } from '@/theme';

export function AuthBootstrapGate({ children }: PropsWithChildren) {
  const { isReady } = useAuth();
  const { theme } = useTheme();

  if (!isReady) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        <ActivityIndicator color={theme.color.accent} size="large" />
        <Text className="mt-4 tracking-[0.24em]" tone="muted" variant="overline">
          HYROX
        </Text>
        <Text className="mt-2 text-center" tone="muted" variant="caption">
          Restoring your athlete session…
        </Text>
      </View>
    );
  }

  return children;
}
