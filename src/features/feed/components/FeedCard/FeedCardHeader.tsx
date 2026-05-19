import { memo, type PropsWithChildren, type ReactNode } from 'react';
import { View } from 'react-native';

import { Avatar, Badge, Text } from '@/components/ui';
import type { FeedActor, FeedItemKind } from '../../types/feed';
import { formatFeedTimestamp, getFeedKindLabel } from '../../utils/feed-helpers';

type FeedCardHeaderProps = {
  actor: FeedActor;
  badgeVariant?: 'accent' | 'danger' | 'neutral' | 'primary' | 'success' | 'warning';
  createdAt: string;
  kind: FeedItemKind;
  trailing?: ReactNode;
};

function FeedCardHeaderRoot({ actor, badgeVariant = 'neutral', createdAt, kind, trailing }: FeedCardHeaderProps) {
  return (
    <View className="flex-row items-start gap-3">
      <Avatar fallback={actor.displayName} size="md" />
      <View className="min-w-0 flex-1 gap-1">
        <View className="flex-row items-center justify-between gap-2">
          <View className="min-w-0 flex-1">
            <Text className="font-bold" numberOfLines={1} variant="bodyStrong">
              {actor.displayName}
            </Text>
            <Text tone="muted" variant="caption">
              @{actor.handle}
              {actor.rankLabel ? ` · ${actor.rankLabel}` : ''}
            </Text>
          </View>
          <Text tone="muted" variant="caption">
            {formatFeedTimestamp(createdAt)}
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Badge label={getFeedKindLabel(kind)} variant={badgeVariant} />
          {trailing}
        </View>
      </View>
    </View>
  );
}

function FeedCardMeta({
  children,
  className,
  tone = 'primary'
}: PropsWithChildren<{ className?: string; tone?: 'muted' | 'primary' }>) {
  return (
    <Text className={className} tone={tone === 'muted' ? 'muted' : 'primary'} variant="caption">
      {children}
    </Text>
  );
}

export const FeedCardHeader = Object.assign(memo(FeedCardHeaderRoot), {
  Meta: memo(FeedCardMeta)
});
