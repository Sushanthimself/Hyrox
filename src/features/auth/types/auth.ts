import type { Session, User } from '@supabase/supabase-js';

export type AuthStatus = 'authenticated' | 'loading' | 'unauthenticated';

export type SocialAuthProvider = 'apple' | 'google';

export type AuthUser = User;

export type AuthSession = Session;

export type AuthCredentials = {
  email: string;
  password: string;
};

export type SignUpPayload = AuthCredentials & {
  displayName?: string;
};

export type AuthResult<T = void> =
  | { data: T; error: null }
  | { data: null; error: AuthError };

export type AuthError = {
  code: string;
  message: string;
};

export type OnboardingAuthIntent = {
  displayName?: string;
  email: string;
  userId: string;
};
