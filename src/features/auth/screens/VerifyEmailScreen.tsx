import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRouter, type Href } from 'expo-router';
import { MailCheck } from 'lucide-react-native';

import { Button, Text } from '@/components/ui';
import { ROUTES } from '@/constants';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAuthStore } from '@/store/auth-store';
import { useTheme } from '@/theme';

import { AuthGlassCard } from '../components/AuthGlassCard';
import { AuthShell } from '../components/AuthShell';
import { AuthStatusBanner } from '../components/AuthStatusBanner';
import { useResendVerificationMutation } from '../hooks/useAuthMutations';
import { useSignOut } from '../hooks/useSignOut';
import { authService } from '../services/auth-service';

export function VerifyEmailScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const auth = useAuth();
  const pendingVerificationEmail = useAuthStore((state) => state.pendingVerificationEmail);
  const setPendingVerificationEmail = useAuthStore((state) => state.setPendingVerificationEmail);
  const resend = useResendVerificationMutation();
  const { isPending: isSigningOut, signOut } = useSignOut();

  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const email = pendingVerificationEmail ?? auth.user?.email ?? '';

  useEffect(() => {
    if (auth.isReady && auth.isEmailVerified) {
      const destination = auth.hasCompletedOnboarding
        ? ROUTES.tabs.home
        : ROUTES.onboarding.index;
      router.replace(destination as Href);
    }
  }, [auth.hasCompletedOnboarding, auth.isEmailVerified, auth.isReady, router]);

  const handleResend = useCallback(async () => {
    if (!email) {
      setFormError('No email on file. Sign up again to continue.');
      return;
    }

    setFormError(null);
    setSuccessMessage(null);

    const result = await resend.mutateAsync(email);

    if (result.error) {
      setFormError(result.error.message);
      return;
    }

    setSuccessMessage('Verification email sent. Check your inbox.');
  }, [email, resend]);

  const handleRefresh = useCallback(async () => {
    setFormError(null);
    const result = await authService.refreshSession();

    if (result.error) {
      setFormError(result.error.message);
      return;
    }

    if (result.data?.user?.email_confirmed_at) {
      await setPendingVerificationEmail(null);
      router.replace(
        (auth.hasCompletedOnboarding ? ROUTES.tabs.home : ROUTES.onboarding.index) as Href
      );
      return;
    }

    setFormError('Email not verified yet. Open the link in your inbox.');
  }, [auth.hasCompletedOnboarding, router, setPendingVerificationEmail]);

  const handleSignOut = useCallback(async () => {
    await setPendingVerificationEmail(null);
    await signOut();
  }, [setPendingVerificationEmail, signOut]);

  return (
    <AuthShell
      subtitle="Confirm your email to unlock rank progression, leaderboards, and your athlete profile."
      title="Verify your email"
    >
      <AuthGlassCard>
        <View className="items-center gap-3 py-2">
          <View className="rounded-full border border-accent/30 bg-accent/10 p-4">
            <MailCheck color={theme.color.accent} size={28} />
          </View>
          <Text className="text-center" variant="bodyStrong">
            {email || 'your inbox'}
          </Text>
          <Text className="text-center leading-6" tone="muted" variant="caption">
            Tap the link in your email. We'll detect verification automatically when you return.
          </Text>
        </View>

        {formError ? <AuthStatusBanner message={formError} /> : null}
        {successMessage ? <AuthStatusBanner message={successMessage} tone="success" /> : null}

        <Button fullWidth haptic="impact" loading={resend.isPending} onPress={handleResend} variant="secondary">
          Resend verification email
        </Button>
        <Button fullWidth haptic="impact" onPress={handleRefresh} variant="primary">
          I've verified — continue
        </Button>
        <Button fullWidth loading={isSigningOut} onPress={handleSignOut} variant="ghost">
          Use a different account
        </Button>
      </AuthGlassCard>
    </AuthShell>
  );
}
