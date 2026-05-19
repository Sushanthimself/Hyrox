import { memo, type PropsWithChildren, type ReactNode } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui';
import { cn } from '@/utils';

type FormSectionProps = PropsWithChildren<{
  action?: ReactNode;
  className?: string;
  description?: string;
  title: string;
}>;

export const FormSection = memo(function FormSection({
  action,
  children,
  className,
  description,
  title
}: FormSectionProps) {
  return (
    <View className={cn('gap-3', className)}>
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1 gap-1">
          <Text variant="title">{title}</Text>
          {description ? (
            <Text tone="muted" variant="caption">
              {description}
            </Text>
          ) : null}
        </View>
        {action}
      </View>
      {children}
    </View>
  );
});
