import { memo } from 'react';
import { Pressable, View } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

import { Text } from '@/components/ui';
import { useTheme } from '@/theme';

type LogScreenHeaderProps = {
  onBack?: () => void;
  rightSlot?: React.ReactNode;
  subtitle?: string;
  title: string;
};

export const LogScreenHeader = memo(function LogScreenHeader({
  onBack,
  rightSlot,
  subtitle,
  title
}: LogScreenHeaderProps) {
  const { theme } = useTheme();

  return (
    <View className="flex-row items-center gap-3 pb-4 pt-2">
      {onBack ? (
        <Pressable
          accessibilityLabel="Go back"
          className="h-10 w-10 items-center justify-center rounded-full border border-border/15 bg-surface/60"
          onPress={onBack}
        >
          <ChevronLeft color={theme.color.foreground} size={20} />
        </Pressable>
      ) : (
        <View className="w-10" />
      )}
      <View className="flex-1 gap-0.5">
        <Text tone="accent" variant="overline">
          Record
        </Text>
        <Text variant="heading">{title}</Text>
        {subtitle ? (
          <Text tone="muted" variant="caption">
            {subtitle}
          </Text>
        ) : null}
      </View>
      {rightSlot ?? <View className="w-10" />}
    </View>
  );
});
