import { memo } from 'react';
import { View } from 'react-native';
import { MapPin } from 'lucide-react-native';

import { Button, Text } from '@/components/ui';
import { BlurContainer } from '@/components/ui/BlurContainer';
import { useTheme } from '@/theme';

import type { RunRoutePlaceholder } from '../../types/workout';

type RoutePlaceholderCardProps = {
  onAttachPlaceholder?: () => void;
  route: RunRoutePlaceholder;
};

/** GPS map integration lands here — no live tracking in this phase. */
export const RoutePlaceholderCard = memo(function RoutePlaceholderCard({
  onAttachPlaceholder,
  route
}: RoutePlaceholderCardProps) {
  const { theme } = useTheme();

  return (
    <BlurContainer className="border-border/15" intensity={20}>
      <View className="gap-3 p-4">
        <View className="flex-row items-center gap-3">
          <View className="rounded-full border border-primary/30 bg-primary/10 p-3">
            <MapPin color={theme.color.primary} size={20} />
          </View>
          <View className="flex-1 gap-1">
            <Text variant="bodyStrong">Route</Text>
            <Text tone="muted" variant="caption">
              {route.label}
            </Text>
          </View>
        </View>
        <Text tone="muted" variant="caption">
          Live GPS, map preview, and route replay will attach here. For now, log distance and time
          manually.
        </Text>
        {onAttachPlaceholder ? (
          <Button onPress={onAttachPlaceholder} size="sm" variant="secondary">
            Mark route pending
          </Button>
        ) : null}
      </View>
    </BlurContainer>
  );
});
