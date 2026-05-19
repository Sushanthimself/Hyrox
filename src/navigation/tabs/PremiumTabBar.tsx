import { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components';
import { useHapticFeedback } from '@/hooks';
import { useTheme } from '@/theme';
import { cn, usePressAnimation } from '@/utils';

import { TAB_ITEMS, type TabRouteName } from './tab-items';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type PremiumTabButtonProps = {
  color: string;
  isFocused: boolean;
  item: (typeof TAB_ITEMS)[number];
  onPress: () => void;
  onLongPress: () => void;
};

function PremiumTabButton({ color, isFocused, item, onLongPress, onPress }: PremiumTabButtonProps) {
  const { animatedStyle, onPressIn, onPressOut } = usePressAnimation({ scale: 0.94 });
  const Icon = item.icon;

  return (
    <AnimatedPressable
      accessibilityLabel={item.label}
      accessibilityRole="button"
      className={cn(
        'h-14 flex-1 items-center justify-center gap-1 rounded-lg',
        isFocused && 'bg-primary/15'
      )}
      onLongPress={onLongPress}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={animatedStyle}
    >
      <View className={cn('rounded-full px-2 py-1', isFocused && 'bg-primary/15')}>
        <Icon color={color} size={20} strokeWidth={isFocused ? 2.6 : 2.1} />
      </View>
      <Text
        className={cn('text-xs', isFocused ? 'font-bold text-primary' : 'font-medium')}
        tone={isFocused ? 'primary' : 'muted'}
      >
        {item.label}
      </Text>
    </AnimatedPressable>
  );
}

export function PremiumTabBar({ descriptors, navigation, state }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { selection } = useHapticFeedback();
  const { theme } = useTheme();

  const getColor = useCallback(
    (isFocused: boolean) => (isFocused ? theme.color.primary : theme.color.mutedForeground),
    [theme.color.mutedForeground, theme.color.primary]
  );

  return (
    <View
      className="absolute bottom-0 left-0 right-0 border-t border-border/10 bg-background/80 px-3 pt-2"
      style={{ paddingBottom: Math.max(insets.bottom, 10) }}
    >
      <View className="flex-row rounded-xl border border-border/10 bg-card/85 p-1.5">
        {TAB_ITEMS.map((item) => {
          const routeIndex = state.routes.findIndex((route) => route.name === item.name);
          const route = state.routes[routeIndex];
          const isFocused = state.index === routeIndex;

          const onPress = () => {
            const event = navigation.emit({
              canPreventDefault: true,
              target: route.key,
              type: 'tabPress'
            });

            if (!isFocused && !event.defaultPrevented) {
              selection();
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              target: route.key,
              type: 'tabLongPress'
            });
          };

          return (
            <PremiumTabButton
              color={getColor(isFocused)}
              isFocused={isFocused}
              item={item}
              key={item.name}
              onLongPress={onLongPress}
              onPress={onPress}
            />
          );
        })}
      </View>
    </View>
  );
}

export type PremiumTabRouteName = TabRouteName;
