import { useMutation } from '@tanstack/react-query';

import { AUTH_QUERY_KEYS } from '../constants';
import { authService } from '../services/auth-service';
import type { AuthCredentials, SignUpPayload } from '../types/auth';

export function useSignInMutation() {
  return useMutation({
    mutationKey: [...AUTH_QUERY_KEYS.all, 'sign-in'],
    mutationFn: (credentials: AuthCredentials) => authService.signIn(credentials)
  });
}

export function useSignUpMutation() {
  return useMutation({
    mutationKey: [...AUTH_QUERY_KEYS.all, 'sign-up'],
    mutationFn: (payload: SignUpPayload) => authService.signUp(payload)
  });
}

export function useSignOutMutation() {
  return useMutation({
    mutationKey: [...AUTH_QUERY_KEYS.all, 'sign-out'],
    mutationFn: () => authService.signOut()
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationKey: [...AUTH_QUERY_KEYS.all, 'reset-password'],
    mutationFn: (email: string) => authService.resetPassword(email)
  });
}

export function useResendVerificationMutation() {
  return useMutation({
    mutationKey: [...AUTH_QUERY_KEYS.all, 'resend-verification'],
    mutationFn: (email: string) => authService.resendVerificationEmail(email)
  });
}
