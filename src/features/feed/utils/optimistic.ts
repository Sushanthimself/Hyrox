import type { InfiniteData } from '@tanstack/react-query';

import type { FeedItem, FeedInteractions, FeedPage } from '../types/feed';

export type FeedInfiniteData = InfiniteData<FeedPage, string | null>;

export function mapFeedPages(
  data: FeedInfiniteData,
  mapper: (item: FeedItem) => FeedItem
): FeedInfiniteData {
  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      items: page.items.map(mapper)
    }))
  };
}

export function patchFeedItemInteractions(
  data: FeedInfiniteData,
  itemId: string,
  patch: Partial<FeedInteractions>
): FeedInfiniteData {
  return mapFeedPages(data, (item) =>
    item.id === itemId
      ? {
          ...item,
          interactions: {
            ...item.interactions,
            ...patch
          }
        }
      : item
  );
}

export function toggleFeedLikeInCache(
  data: FeedInfiniteData,
  itemId: string,
  liked: boolean
): FeedInfiniteData {
  return mapFeedPages(data, (item) => {
    if (item.id !== itemId) {
      return item;
    }

    const wasLiked = item.interactions.viewerHasLiked;
    const likeDelta = liked && !wasLiked ? 1 : !liked && wasLiked ? -1 : 0;

    return {
      ...item,
      interactions: {
        ...item.interactions,
        viewerHasLiked: liked,
        likeCount: Math.max(0, item.interactions.likeCount + likeDelta)
      }
    };
  });
}
