import { useEffect, type PropsWithChildren, type ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui';
import { useTheme } from '@/theme';
import { cn } from '@/utils';

type AuthShellProps = PropsWithChildren<{
  footer?: ReactNode;
  subtitle: string;
  title: string;
}>;

export function AuthShell({ children, footer, subtitle, title }: AuthShellProps) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const pulse = useSharedValue(0.35);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(0.85, { duration: 3200, easing: Easing.inOut(Easing.quad) }),
      -1,
      true
    );
  }, [pulse]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: pulse.value
  }));

  return (
    <View className="flex-1 bg-background">
      <LinearGradient
        colors={[theme.color.background, '#0A1018', theme.color.background]}
        end={{ x: 0.5, y: 1 }}
        start={{ x: 0.5, y: 0 }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View
        className="absolute -right-16 top-24 h-56 w-56 rounded-full bg-primary/20"
        style={glowStyle}
      />
      <Animated.View
        className="absolute -left-20 bottom-40 h-72 w-72 rounded-full bg-accent/15"
        style={glowStyle}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <ScrollView
          contentContainerClassName="grow px-5 pb-8 pt-6"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={FadeInUp.duration(520).delay(80)}>
            <Text className="mb-2 tracking-[0.28em]" tone="accent" variant="overline">
              HYROX
            </Text>
            <Text className="mb-3" variant="display">
              {title}
            </Text>
            <Text className="max-w-[92%] leading-6" tone="muted" variant="body">
              {subtitle}
            </Text>
          </Animated.View>

          <Animated.View className={cn('mt-8')} entering={FadeInDown.duration(560).delay(160)}>
            {children}
          </Animated.View>

          {footer ? (
            <Animated.View className="mt-6" entering={FadeInUp.duration(480).delay(280)}>
              {footer}
            </Animated.View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
