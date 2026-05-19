import { View } from 'react-native';
import { Apple, Mail } from 'lucide-react-native';

import { Button, Text } from '@/components/ui';
import { useTheme } from '@/theme';

import type { SocialAuthProvider } from '../types/auth';

type SocialAuthPlaceholderProps = {
  onProviderPress?: (provider: SocialAuthProvider) => void;
};

const providers: { icon: typeof Apple; id: SocialAuthProvider; label: string }[] = [
  { icon: Apple, id: 'apple', label: 'Apple' },
  { icon: Mail, id: 'google', label: 'Google' }
];

export function SocialAuthPlaceholder({ onProviderPress }: SocialAuthPlaceholderProps) {
  const { theme } = useTheme();

  return (
    <View className="gap-3">
      <View className="flex-row items-center gap-3">
        <View className="h-px flex-1 bg-border/20" />
        <Text tone="muted" variant="caption">
          Or continue with
        </Text>
        <View className="h-px flex-1 bg-border/20" />
      </View>

      <View className="flex-row gap-3">
        {providers.map(({ icon: Icon, id, label }) => (
          <Button
            className="flex-1 border-border/25 bg-surface/40"
            haptic="impact"
            key={id}
            onPress={() => onProviderPress?.(id)}
            size="md"
            variant="ghost"
          >
            <View className="flex-row items-center gap-2">
              <Icon color={theme.color.foreground} size={18} />
              <Text className="font-semibold" variant="caption">
                {label}
              </Text>
            </View>
          </Button>
        ))}
      </View>

      <Text className="text-center" tone="muted" variant="caption">
        Social sign-in launches in a future release.
      </Text>
    </View>
  );
}
