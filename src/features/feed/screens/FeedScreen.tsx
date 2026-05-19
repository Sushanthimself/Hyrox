import { Screen } from '@/components/ui';

import { FeedHeader, FeedList } from '../components';

export function FeedScreen() {
  return (
    <Screen className="flex-1 px-0" contentClassName="flex-1 px-0 py-0">
      <FeedList ListHeaderComponent={<FeedHeader />} />
    </Screen>
  );
}
