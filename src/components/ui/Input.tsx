import { forwardRef } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';

import { useTheme } from '@/theme';
import { cn } from '@/utils';

import { Text } from './Text';

type InputProps = TextInputProps & {
  error?: string;
  label?: string;
};

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { className, error, label, placeholderTextColor, ...props },
  ref
) {
  const { theme } = useTheme();

  return (
    <View className="gap-2">
      {label ? (
        <Text className="font-semibold" variant="caption">
          {label}
        </Text>
      ) : null}
      <TextInput
        className={cn(
          'h-12 rounded-md border border-input/15 bg-surface px-4 text-md text-foreground',
          error && 'border-danger/40',
          className
        )}
        placeholderTextColor={placeholderTextColor ?? theme.color.mutedForeground}
        ref={ref}
        selectionColor={theme.color.primary}
        {...props}
      />
      {error ? (
        <Text tone="danger" variant="caption">
          {error}
        </Text>
      ) : null}
    </View>
  );
});
