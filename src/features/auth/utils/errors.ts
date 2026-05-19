import type { AuthError as SupabaseAuthError } from '@supabase/supabase-js';

import type { AuthError } from '../types/auth';

const MESSAGE_MAP: Record<string, string> = {
  email_not_confirmed: 'Confirm your email before signing in.',
  invalid_credentials: 'Email or password is incorrect.',
  user_already_exists: 'An account with this email already exists.',
  weak_password: 'Choose a stronger password.',
  over_email_send_rate_limit: 'Too many emails sent. Try again shortly.',
  over_request_rate_limit: 'Too many attempts. Wait a moment and retry.'
};

export function mapSupabaseAuthError(error: SupabaseAuthError | Error): AuthError {
  const code = 'code' in error && typeof error.code === 'string' ? error.code : 'auth_error';
  const fallback = error.message || 'Something went wrong. Please try again.';
  const message = MESSAGE_MAP[code] ?? fallback;

  return { code, message };
}

export function toAuthError(message: string, code = 'auth_error'): AuthError {
  return { code, message };
}
