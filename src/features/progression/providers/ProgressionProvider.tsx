import { useEffect, type PropsWithChildren } from 'react';
import { useQuery } from '@tanstack/react-query';

import { PROGRESSION_QUERY_KEYS } from '../constants';
import { ProgressionCelebrationHost } from '../components/ProgressionCelebrationHost';
import { progressionService } from '../services/progression-service';
import { useProgressionStore } from '../store/progression-store';

export function ProgressionProvider({ children }: PropsWithChildren) {
  const hydrate = useProgressionStore((store) => store.hydrate);
  const isHydrated = useProgressionStore((store) => store.isHydrated);

  const query = useQuery({
    queryKey: PROGRESSION_QUERY_KEYS.state,
    queryFn: () => progressionService.loadState(),
    staleTime: Infinity
  });

  useEffect(() => {
    if (query.data && !isHydrated) {
      hydrate(query.data);
    }
  }, [hydrate, isHydrated, query.data]);

  return (
    <>
      {children}
      <ProgressionCelebrationHost />
    </>
  );
}
