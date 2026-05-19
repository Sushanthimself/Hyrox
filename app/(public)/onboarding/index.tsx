import { Screen, Text, Button, Card, Badge } from '@/components';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'expo-router';

export default function OnboardingRoute() {
  const markOnboardingComplete = useAuthStore((state) => state.markOnboardingComplete);
  const router = useRouter();

  return (
    <Screen contentClassName="flex-1 justify-center p-6 gap-6" scroll>
      <Badge label="Onboarding" variant="primary" className="self-start" />
      <Text variant="display">Welcome to HYROX</Text>
      
      <Card variant="glass" className="p-4">
        <Text tone="muted">
          Your athlete identity has been secured. Let's head straight to your new Profile dashboard.
        </Text>
      </Card>

      <Button 
        onPress={async () => {
          await markOnboardingComplete();
          router.replace('/');
        }} 
        size="lg" 
        fullWidth
      >
        Enter Arena
      </Button>
    </Screen>
  );
}
