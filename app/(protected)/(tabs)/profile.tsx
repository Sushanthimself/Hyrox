import { View } from 'react-native';

import { Button, Screen, Text } from '@/components/ui';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useSignOut } from '@/features/auth/hooks/useSignOut';

export default function ProfileRoute() {
  const auth = useAuth();
  const { isPending, signOut } = useSignOut();

  return (
    <Screen scroll contentClassName="gap-6">
      <View className="gap-2">
        <Text tone="accent" variant="overline">
          Athlete profile
        </Text>
        <Text variant="heading">{auth.user?.email ?? 'Athlete'}</Text>
        <Text tone="muted" variant="body">
          Protected profile shell — rank cards and achievements land here next.
        </Text>
      </View>

      <Button fullWidth loading={isPending} onPress={signOut} variant="secondary">
        Sign out
      </Button>
    </Screen>
  );
}
