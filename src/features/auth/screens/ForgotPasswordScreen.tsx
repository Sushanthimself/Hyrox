import { useCallback, useState } from 'react';
import { Pressable } from 'react-native';
import { useRouter, type Href } from 'expo-router';

import { Button, Input, Text } from '@/components/ui';
import { ROUTES } from '@/constants';

import { AuthGlassCard } from '../components/AuthGlassCard';
import { AuthShell } from '../components/AuthShell';
import { AuthStatusBanner } from '../components/AuthStatusBanner';
import { useResetPasswordMutation } from '../hooks/useAuthMutations';
import { validateEmail } from '../utils/validation';

export function ForgotPasswordScreen() {
  const router = useRouter();
  const resetPassword = useResetPasswordMutation();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    const nextEmailError = validateEmail(email);
    setEmailError(nextEmailError);
    setFormError(null);
    setSuccessMessage(null);

    if (nextEmailError) {
      return;
    }

    const result = await resetPassword.mutateAsync(email.trim().toLowerCase());

    if (result.error) {
      setFormError(result.error.message);
      return;
    }

    setSuccessMessage('Recovery link sent. Check your inbox to restore access.');
  }, [email, resetPassword]);

  return (
    <AuthShell
      footer={
        <Pressable accessibilityRole="button" onPress={() => router.replace(ROUTES.auth.signIn as Href)}>
          <Text className="text-center font-bold" tone="accent" variant="caption">
            Back to sign in
          </Text>
        </Pressable>
      }
      subtitle="We'll send a secure recovery link so you can get back to training."
      title="Reset access"
    >
      <AuthGlassCard>
        {formError ? <AuthStatusBanner message={formError} /> : null}
        {successMessage ? <AuthStatusBanner message={successMessage} tone="success" /> : null}

        <Input
          autoCapitalize="none"
          autoComplete="email"
          error={emailError}
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          placeholder="athlete@hyrox.com"
          value={email}
        />

        <Button
          fullWidth
          haptic="impact"
          loading={resetPassword.isPending}
          onPress={handleSubmit}
          size="lg"
        >
          Send recovery link
        </Button>
      </AuthGlassCard>
    </AuthShell>
  );
}
