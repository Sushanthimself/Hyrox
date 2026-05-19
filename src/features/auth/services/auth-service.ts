import type { AuthError as SupabaseAuthError, Session, User } from '@supabase/supabase-js';

import { createAppUrl } from '@/navigation/deep-linking';
import { supabase } from '@/services/supabase/client';

import type {
  AuthCredentials,
  AuthError,
  AuthResult,
  SignUpPayload,
  SocialAuthProvider
} from '../types/auth';
import { mapSupabaseAuthError } from '../utils/errors';

function success<T>(data: T): AuthResult<T> {
  return { data, error: null };
}

function failure(error: SupabaseAuthError | Error): AuthResult<never> {
  return { data: null, error: mapSupabaseAuthError(error) };
}

export function isEmailVerified(user: User | null): boolean {
  if (!user) {
    return false;
  }

  return Boolean(user.email_confirmed_at);
}

export const authService = {
  async getSession(): Promise<AuthResult<Session | null>> {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      return failure(error);
    }

    return success(data.session);
  },

  async signIn(credentials: AuthCredentials): Promise<AuthResult<Session>> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email.trim().toLowerCase(),
      password: credentials.password
    });

    if (error || !data.session) {
      return failure(error ?? new Error('Unable to sign in.'));
    }

    return success(data.session);
  },

  async signUp(payload: SignUpPayload): Promise<AuthResult<{ session: Session | null; user: User | null }>> {
    const email = payload.email.trim().toLowerCase();

    const { data, error } = await supabase.auth.signUp({
      email,
      password: payload.password,
      options: {
        emailRedirectTo: createAppUrl('/auth/verify-email'),
        data: {
          display_name: payload.displayName?.trim()
        }
      }
    });

    if (error) {
      return failure(error);
    }

    return success({ session: data.session, user: data.user });
  },

  async signOut(): Promise<AuthResult<void>> {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return failure(error);
    }

    return success(undefined);
  },

  async resetPassword(email: string): Promise<AuthResult<void>> {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: createAppUrl('/auth/forgot-password')
    });

    if (error) {
      return failure(error);
    }

    return success(undefined);
  },

  async resendVerificationEmail(email: string): Promise<AuthResult<void>> {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: createAppUrl('/auth/verify-email')
      }
    });

    if (error) {
      return failure(error);
    }

    return success(undefined);
  },

  async refreshSession(): Promise<AuthResult<Session | null>> {
    const { data, error } = await supabase.auth.refreshSession();

    if (error) {
      return failure(error);
    }

    return success(data.session);
  },

  /** Reserved for Apple / Google — wired when OAuth credentials are configured. */
  async signInWithProvider(_provider: SocialAuthProvider): Promise<AuthResult<Session>> {
    return {
      data: null,
      error: {
        code: 'oauth_not_configured',
        message: 'Social sign-in is coming soon.'
      } satisfies AuthError
    };
  }
};
