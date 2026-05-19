import { ScrollView, View, type ScrollViewProps, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cn } from '@/utils';

type ScreenProps = ViewProps & {
  contentClassName?: string;
  scroll?: boolean;
  scrollProps?: ScrollViewProps;
};

export function Screen({
  children,
  className,
  contentClassName,
  scroll,
  scrollProps,
  ...props
}: ScreenProps) {
  return (
    <SafeAreaView className={cn('flex-1 bg-background', className)} {...props}>
      {scroll ? (
        <ScrollView
          className="flex-1"
          contentContainerClassName={cn('px-4 py-4', contentClassName)}
          showsVerticalScrollIndicator={false}
          {...scrollProps}
        >
          {children}
        </ScrollView>
      ) : (
        <View className={cn('flex-1 px-4 py-4', contentClassName)}>{children}</View>
      )}
    </SafeAreaView>
  );
}
