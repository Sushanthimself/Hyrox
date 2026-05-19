export const AUTH_QUERY_KEYS = {
  all: ['auth'] as const,
  session: ['auth', 'session'] as const
} as const;

export const SECURE_STORAGE_KEYS = {
  onboardingComplete: 'hyrox_onboarding_complete',
  onboardingIntent: 'hyrox_onboarding_intent',
  pendingVerificationEmail: 'hyrox_pending_verification_email'
} as const;
