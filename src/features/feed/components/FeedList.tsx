import { memo, useCallback, useMemo, type ReactElement } from 'react';
import { ActivityIndicator, RefreshControl, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { Text } from '@/components/ui';
import { MotionFeedItem } from '@/motion';
import { useTheme } from '@/theme';

import { flattenFeedPages, useFeedQuery } from '../hooks/useFeedQuery';
import type { FeedItem } from '../types/feed';
import { FeedCardRenderer } from './FeedCard/FeedCardRenderer';
import { FeedEmptyState, FeedErrorState, FeedSkeleton } from './states';

const SEPARATOR_HEIGHT = 16;
const FIRST_PAGE_ANIMATION_LIMIT = 6;

type FeedListProps = {
  ListHeaderComponent?: ReactElement | null;
};

export const FeedList = memo(function FeedList({ ListHeaderComponent }: FeedListProps) {
  const { theme } = useTheme();
  const query = useFeedQuery();

  const items = useMemo(() => flattenFeedPages(query.data?.pages), [query.data?.pages]);
  const isInitialLoading = query.isPending;
  const isRefreshing = query.isRefetching && !query.isFetchingNextPage;

  const handleEndReached = useCallback(() => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      void query.fetchNextPage();
    }
  }, [query]);

  const renderItem = useCallback(
    ({ index, item }: { index: number; item: FeedItem }) => {
      const content = <FeedCardRenderer item={item} />;
      const shouldAnimate = index < FIRST_PAGE_ANIMATION_LIMIT && !isRefreshing;

      if (!shouldAnimate) {
        return content;
      }

      return (
        <MotionFeedItem index={index} interactive={false}>
          {content}
        </MotionFeedItem>
      );
    },
    [isRefreshing]
  );

  const keyExtractor = useCallback((item: FeedItem) => item.id, []);

  const getItemType = useCallback((item: FeedItem) => item.kind, []);

  if (isInitialLoading) {
    return (
      <View className="flex-1 px-4 pt-2">
        {ListHeaderComponent}
        <FeedSkeleton />
      </View>
    );
  }

  if (query.isError) {
    return (
      <View className="flex-1">
        {ListHeaderComponent}
        <FeedErrorState
          message={query.error instanceof Error ? query.error.message : undefined}
          onRetry={() => void query.refetch()}
        />
      </View>
    );
  }

  return (
    <FlashList
      ItemSeparatorComponent={ItemSeparator}
      ListEmptyComponent={<FeedEmptyState onRefresh={() => void query.refetch()} />}
      ListFooterComponent={
        query.isFetchingNextPage ? (
          <View className="items-center py-6">
            <ActivityIndicator color={theme.color.accent} />
          </View>
        ) : query.hasNextPage ? null : items.length > 0 ? (
          <Text className="py-6 text-center" tone="muted" variant="caption">
            You&apos;re caught up — go claim more ground.
          </Text>
        ) : null
      }
      ListHeaderComponent={ListHeaderComponent ?? undefined}
      contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 16, paddingTop: 8 }}
      data={items}
      drawDistance={480}
      getItemType={getItemType}
      keyExtractor={keyExtractor}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.45}
      refreshControl={
        <RefreshControl
          onRefresh={() => void query.refetch()}
          refreshing={isRefreshing}
          tintColor={theme.color.accent}
        />
      }
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
});

const ItemSeparator = memo(function ItemSeparator() {
  return <View style={{ height: SEPARATOR_HEIGHT }} />;
});
