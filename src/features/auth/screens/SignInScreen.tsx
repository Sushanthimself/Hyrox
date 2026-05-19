import { useCallback, useState } from 'react';
import { Pressable } from 'react-native';
import { Link, useRouter, type Href } from 'expo-router';

import { Button, Input, Text } from '@/components/ui';
import { ROUTES } from '@/constants';
import { useAuthStore } from '@/store/auth-store';

import { AuthGlassCard } from '../components/AuthGlassCard';
import { AuthShell } from '../components/AuthShell';
import { AuthStatusBanner } from '../components/AuthStatusBanner';
import { SocialAuthPlaceholder } from '../components/SocialAuthPlaceholder';
import { useSignInMutation } from '../hooks/useAuthMutations';
import { authService } from '../services/auth-service';
import type { FieldErrors } from '../utils/validation';
import { validateEmail, validatePassword } from '../utils/validation';

type SignInFields = 'email' | 'password';

export function SignInScreen() {
  const router = useRouter();
  const signIn = useSignInMutation();
  const hasCompletedOnboarding = useAuthStore((state) => state.hasCompletedOnboarding);
  const setPendingVerificationEmail = useAuthStore((state) => state.setPendingVerificationEmail);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<SignInFields>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    const nextErrors: FieldErrors<SignInFields> = {
      email: validateEmail(email),
      password: validatePassword(password)
    };

    setFieldErrors(nextErrors);
    setFormError(null);

    if (nextErrors.email || nextErrors.password) {
      return;
    }

    const result = await signIn.mutateAsync({
      email: email.trim().toLowerCase(),
      password
    });

    if (result.error) {
      setFormError(result.error.message);
      return;
    }

    const user = result.data.user;
    if (!user) {
      return;
    }

    if (!user.email_confirmed_at) {
      await setPendingVerificationEmail(user.email ?? email.trim().toLowerCase());
      router.replace(ROUTES.auth.verifyEmail as Href);
      return;
    }

    const destination = hasCompletedOnboarding ? ROUTES.tabs.home : ROUTES.onboarding.index;
    router.replace(destination as Href);
  }, [email, hasCompletedOnboarding, password, router, setPendingVerificationEmail, signIn]);

  const handleSocialPress = useCallback(async () => {
    const result = await authService.signInWithProvider('apple');
    if (result.error) {
      setFormError(result.error.message);
    }
  }, []);

  return (
    <AuthShell
      footer={
        <Text className="text-center" tone="muted" variant="caption">
          New to the arena?{' '}
          <Link href={ROUTES.auth.signUp as Href}>
            <Text className="font-bold" tone="accent" variant="caption">
              Create your athlete account
            </Text>
          </Link>
        </Text>
      }
      subtitle="Sign in to your athlete identity, rank progression, and competition feed."
      title="Enter the arena"
    >
      <AuthGlassCard>
        {formError ? <AuthStatusBanner message={formError} /> : null}

        <Input
          autoCapitalize="none"
          autoComplete="email"
          error={fieldErrors.email}
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          placeholder="athlete@hyrox.com"
          value={email}
        />
        <Input
          autoCapitalize="none"
          autoComplete="password"
          error={fieldErrors.password}
          label="Password"
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry
          value={password}
        />

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push(ROUTES.auth.forgotPassword as Href)}
        >
          <Text className="text-right font-semibold" tone="accent" variant="caption">
            Forgot password?
          </Text>
        </Pressable>

        <Button fullWidth haptic="impact" loading={signIn.isPending} onPress={handleSubmit} size="lg">
          Sign in
        </Button>

        <SocialAuthPlaceholder onProviderPress={handleSocialPress} />
      </AuthGlassCard>
    </AuthShell>
  );
}
