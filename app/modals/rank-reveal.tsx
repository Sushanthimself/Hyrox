import { useLocalSearchParams, useRouter } from 'expo-router';

import { Button, Screen } from '@/components/ui';
import { RankReveal } from '@/motion';

export default function RankRevealModalRoute() {
  const router = useRouter();
  const params = useLocalSearchParams<{ rank?: string; subtitle?: string }>();

  return (
    <Screen className="justify-center bg-overlay/90" contentClassName="items-center gap-6">
      <RankReveal
        playKey={params.rank ?? 'preview'}
        rankLabel={params.rank ?? 'Champion I'}
        subtitle={params.subtitle ?? 'Preview rank celebration'}
      />
      <Button onPress={() => router.back()} variant="secondary">
        Close
      </Button>
    </Screen>
  );
}
