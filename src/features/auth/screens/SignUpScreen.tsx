import { useCallback, useState } from 'react';
import { Link, useRouter, type Href } from 'expo-router';

import { Button, Input, Text } from '@/components/ui';
import { ROUTES } from '@/constants';
import { useAuthStore } from '@/store/auth-store';

import { AuthGlassCard } from '../components/AuthGlassCard';
import { AuthShell } from '../components/AuthShell';
import { AuthStatusBanner } from '../components/AuthStatusBanner';
import { SocialAuthPlaceholder } from '../components/SocialAuthPlaceholder';
import { useSignUpMutation } from '../hooks/useAuthMutations';
import { authService } from '../services/auth-service';
import type { FieldErrors } from '../utils/validation';
import {
  validateDisplayName,
  validateEmail,
  validatePassword,
  validatePasswordConfirmation
} from '../utils/validation';

type SignUpFields = 'confirmPassword' | 'displayName' | 'email' | 'password';

export function SignUpScreen() {
  const router = useRouter();
  const signUp = useSignUpMutation();
  const prepareOnboardingEntry = useAuthStore((state) => state.prepareOnboardingEntry);
  const setPendingVerificationEmail = useAuthStore((state) => state.setPendingVerificationEmail);

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<SignUpFields>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    const nextErrors: FieldErrors<SignUpFields> = {
      displayName: validateDisplayName(displayName),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validatePasswordConfirmation(password, confirmPassword)
    };

    setFieldErrors(nextErrors);
    setFormError(null);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const result = await signUp.mutateAsync({
      displayName: displayName.trim(),
      email: normalizedEmail,
      password
    });

    if (result.error) {
      setFormError(result.error.message);
      return;
    }

    const user = result.data.user;
    const userId = user?.id;

    if (userId) {
      await prepareOnboardingEntry({
        displayName: displayName.trim(),
        email: normalizedEmail,
        userId
      });
    }

    await setPendingVerificationEmail(normalizedEmail);
    router.replace(ROUTES.auth.verifyEmail as Href);
  }, [
    confirmPassword,
    displayName,
    email,
    password,
    prepareOnboardingEntry,
    router,
    setPendingVerificationEmail,
    signUp
  ]);

  const handleSocialPress = useCallback(async () => {
    const result = await authService.signInWithProvider('google');
    if (result.error) {
      setFormError(result.error.message);
    }
  }, []);

  return (
    <AuthShell
      footer={
        <Text className="text-center" tone="muted" variant="caption">
          Already training with us?{' '}
          <Link href={ROUTES.auth.signIn as Href}>
            <Text className="font-bold" tone="accent" variant="caption">
              Sign in
            </Text>
          </Link>
        </Text>
      }
      subtitle="Create your athlete identity and step into rank progression built for serious competitors."
      title="Claim your lane"
    >
      <AuthGlassCard>
        {formError ? <AuthStatusBanner message={formError} /> : null}

        <Input
          autoCapitalize="words"
          autoComplete="name"
          error={fieldErrors.displayName}
          label="Athlete name"
          onChangeText={setDisplayName}
          placeholder="Alex Rivera"
          value={displayName}
        />
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
          autoComplete="new-password"
          error={fieldErrors.password}
          label="Password"
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry
          value={password}
        />
        <Input
          autoCapitalize="none"
          autoComplete="new-password"
          error={fieldErrors.confirmPassword}
          label="Confirm password"
          onChangeText={setConfirmPassword}
          placeholder="••••••••"
          secureTextEntry
          value={confirmPassword}
        />

        <Button fullWidth haptic="impact" loading={signUp.isPending} onPress={handleSubmit} size="lg">
          Create account
        </Button>

        <SocialAuthPlaceholder onProviderPress={handleSocialPress} />
      </AuthGlassCard>
    </AuthShell>
  );
}
