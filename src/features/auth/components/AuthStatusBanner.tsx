import { View } from 'react-native';

import { Text } from '@/components/ui';
import { cn } from '@/utils';

type AuthStatusBannerProps = {
  message: string;
  tone?: 'danger' | 'success';
};

export function AuthStatusBanner({ message, tone = 'danger' }: AuthStatusBannerProps) {
  return (
    <View
      className={cn(
        'rounded-md border px-3 py-2',
        tone === 'danger' && 'border-danger/30 bg-danger/10',
        tone === 'success' && 'border-success/30 bg-success/10'
      )}
    >
      <Text tone={tone} variant="caption">
        {message}
      </Text>
    </View>
  );
}
