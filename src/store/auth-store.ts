import { create } from 'zustand';

import { SECURE_STORAGE_KEYS } from '@/features/auth/constants';
import type { AuthSession, AuthStatus, AuthUser, OnboardingAuthIntent } from '@/features/auth/types/auth';
import { secureAppStorage } from '@/services/supabase/auth-storage';

type AuthStoreState = {
  hasCompletedOnboarding: boolean;
  isReady: boolean;
  onboardingEntryPrepared: boolean;
  onboardingIntent: OnboardingAuthIntent | null;
  pendingVerificationEmail: string | null;
  session: AuthSession | null;
  status: AuthStatus;
  user: AuthUser | null;
};

type AuthStoreActions = {
  hydrateOnboardingFlags: () => Promise<void>;
  markOnboardingComplete: () => Promise<void>;
  prepareOnboardingEntry: (intent: OnboardingAuthIntent) => Promise<void>;
  reset: () => Promise<void>;
  setPendingVerificationEmail: (email: string | null) => Promise<void>;
  setReady: (isReady: boolean) => void;
  setSession: (session: AuthSession | null) => void;
};

export type AuthStore = AuthStoreState & AuthStoreActions;

const initialState: AuthStoreState = {
  hasCompletedOnboarding: false,
  isReady: false,
  onboardingEntryPrepared: false,
  onboardingIntent: null,
  pendingVerificationEmail: null,
  session: null,
  status: 'loading',
  user: null
};

async function readOnboardingComplete(): Promise<boolean> {
  const value = await secureAppStorage.getItem(SECURE_STORAGE_KEYS.onboardingComplete);
  return value === 'true';
}

async function readOnboardingIntent(): Promise<OnboardingAuthIntent | null> {
  const raw = await secureAppStorage.getItem(SECURE_STORAGE_KEYS.onboardingIntent);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as OnboardingAuthIntent;
  } catch {
    return null;
  }
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  ...initialState,

  hydrateOnboardingFlags: async () => {
    const [hasCompletedOnboarding, onboardingIntent, pendingVerificationEmail] = await Promise.all([
      readOnboardingComplete(),
      readOnboardingIntent(),
      secureAppStorage.getItem(SECURE_STORAGE_KEYS.pendingVerificationEmail)
    ]);

    set({
      hasCompletedOnboarding,
      onboardingEntryPrepared: Boolean(onboardingIntent),
      onboardingIntent,
      pendingVerificationEmail
    });
  },

  markOnboardingComplete: async () => {
    await secureAppStorage.setItem(SECURE_STORAGE_KEYS.onboardingComplete, 'true');
    await secureAppStorage.removeItem(SECURE_STORAGE_KEYS.onboardingIntent);

    set({
      hasCompletedOnboarding: true,
      onboardingEntryPrepared: false,
      onboardingIntent: null
    });
  },

  prepareOnboardingEntry: async (intent) => {
    await secureAppStorage.setItem(SECURE_STORAGE_KEYS.onboardingIntent, JSON.stringify(intent));
    await secureAppStorage.setItem(SECURE_STORAGE_KEYS.onboardingComplete, 'false');

    set({
      hasCompletedOnboarding: false,
      onboardingEntryPrepared: true,
      onboardingIntent: intent
    });
  },

  reset: async () => {
    await Promise.all([
      secureAppStorage.removeItem(SECURE_STORAGE_KEYS.onboardingComplete),
      secureAppStorage.removeItem(SECURE_STORAGE_KEYS.onboardingIntent),
      secureAppStorage.removeItem(SECURE_STORAGE_KEYS.pendingVerificationEmail)
    ]);

    set({
      ...initialState,
      isReady: true,
      status: 'unauthenticated'
    });
  },

  setPendingVerificationEmail: async (pendingVerificationEmail) => {
    if (pendingVerificationEmail) {
      await secureAppStorage.setItem(
        SECURE_STORAGE_KEYS.pendingVerificationEmail,
        pendingVerificationEmail
      );
    } else {
      await secureAppStorage.removeItem(SECURE_STORAGE_KEYS.pendingVerificationEmail);
    }

    set({ pendingVerificationEmail });
  },

  setReady: (isReady) => set({ isReady }),

  setSession: (session) => {
    const user = session?.user ?? null;

    set({
      session,
      status: user ? 'authenticated' : 'unauthenticated',
      user
    });
  }
}));

export const authStoreSelectors = {
  isAuthenticated: (state: AuthStore) => state.status === 'authenticated' && Boolean(state.user),
  isEmailVerified: (state: AuthStore) => Boolean(state.user?.email_confirmed_at),
  needsEmailVerification: (state: AuthStore) =>
    Boolean(state.user) && !state.user?.email_confirmed_at
};
