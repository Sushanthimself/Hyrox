export const FEED_QUERY_KEYS = {
  all: ['feed'] as const,
  infinite: ['feed', 'infinite'] as const,
  item: (id: string) => ['feed', 'item', id] as const
} as const;

export const FEED_PAGE_SIZE = 8;
