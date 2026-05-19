import { useInfiniteQuery } from '@tanstack/react-query';

import { FEED_PAGE_SIZE, FEED_QUERY_KEYS } from '../constants/query-keys';
import { feedService } from '../services/feed-service';
import type { FeedItem, FeedPageCursor } from '../types/feed';

export function useFeedQuery() {
  return useInfiniteQuery({
    queryKey: FEED_QUERY_KEYS.infinite,
    initialPageParam: null as FeedPageCursor,
    queryFn: ({ pageParam }) =>
      feedService.fetchPage({
        cursor: pageParam,
        limit: FEED_PAGE_SIZE
      }),
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
    staleTime: 30_000
  });
}

export function flattenFeedPages(pages: { items: FeedItem[] }[] | undefined): FeedItem[] {
  if (!pages) {
    return [];
  }

  return pages.flatMap((page) => page.items);
}
