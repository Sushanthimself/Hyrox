import { FEED_PAGE_SIZE } from '../constants/query-keys';
import type {
  FeedItem,
  FeedPage,
  FetchFeedPageInput,
  SetFeedReactionInput,
  ToggleFeedLikeInput
} from '../types/feed';

import { MOCK_FEED_ITEMS } from './mock-feed-data';

const LATENCY_MS = 420;

function delay(ms = LATENCY_MS) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function parseCursor(cursor: string | null | undefined): number {
  if (!cursor) {
    return 0;
  }

  const offset = Number.parseInt(cursor, 10);
  return Number.isFinite(offset) ? offset : 0;
}

function cloneItem(item: FeedItem): FeedItem {
  return {
    ...item,
    interactions: { ...item.interactions }
  };
}

/** In-memory interaction overlay until a real API exists. */
const interactionOverlay = new Map<string, FeedItem['interactions']>();

function applyOverlay(item: FeedItem): FeedItem {
  const overlay = interactionOverlay.get(item.id);
  if (!overlay) {
    return cloneItem(item);
  }

  return {
    ...item,
    interactions: {
      ...item.interactions,
      ...overlay
    }
  };
}

export const mockFeedService = {
  async fetchPage(input: FetchFeedPageInput = {}): Promise<FeedPage> {
    await delay();

    const limit = input.limit ?? FEED_PAGE_SIZE;
    const offset = parseCursor(input.cursor);
    const slice = MOCK_FEED_ITEMS.slice(offset, offset + limit).map(applyOverlay);
    const nextOffset = offset + limit;
    const hasMore = nextOffset < MOCK_FEED_ITEMS.length;

    return {
      items: slice,
      hasMore,
      nextCursor: hasMore ? String(nextOffset) : null
    };
  },

  async toggleLike(input: ToggleFeedLikeInput): Promise<FeedItem['interactions']> {
    await delay(180);

    const source = MOCK_FEED_ITEMS.find((item) => item.id === input.itemId);
    if (!source) {
      throw new Error('Feed item not found.');
    }

    const current = applyOverlay(source).interactions;
    const wasLiked = current.viewerHasLiked;
    const likeDelta = input.liked && !wasLiked ? 1 : !input.liked && wasLiked ? -1 : 0;

    const next = {
      ...current,
      viewerHasLiked: input.liked,
      likeCount: Math.max(0, current.likeCount + likeDelta)
    };

    interactionOverlay.set(input.itemId, next);
    return next;
  },

  async setReaction(input: SetFeedReactionInput): Promise<FeedItem['interactions']> {
    await delay(180);

    const source = MOCK_FEED_ITEMS.find((item) => item.id === input.itemId);
    if (!source) {
      throw new Error('Feed item not found.');
    }

    const current = applyOverlay(source).interactions;
    const hadReaction = Boolean(current.viewerReaction);
    const hasReaction = Boolean(input.reaction);
    const reactionDelta = hasReaction && !hadReaction ? 1 : !hasReaction && hadReaction ? -1 : 0;

    const next = {
      ...current,
      viewerReaction: input.reaction,
      reactionCount: Math.max(0, current.reactionCount + reactionDelta)
    };

    interactionOverlay.set(input.itemId, next);
    return next;
  }
};
