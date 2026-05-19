import type {
  FeedPage,
  FetchFeedPageInput,
  SetFeedReactionInput,
  ToggleFeedLikeInput
} from '../types/feed';

import { mockFeedService } from './mock-feed-service';

/**
 * Feed service facade — swap `mockFeedService` for API client when backend ships.
 */
export const feedService = {
  fetchPage: (input?: FetchFeedPageInput): Promise<FeedPage> => mockFeedService.fetchPage(input),
  toggleLike: (input: ToggleFeedLikeInput) => mockFeedService.toggleLike(input),
  setReaction: (input: SetFeedReactionInput) => mockFeedService.setReaction(input)
};

export type FeedService = typeof feedService;
