import * as Linking from 'expo-linking';

import { ROUTES } from '@/constants';

export const DEEP_LINK_PREFIXES = [Linking.createURL('/'), 'sharksfitness://'] as const;

export const deepLinkRoutes = {
  auth: {
    forgotPassword: 'auth/forgot-password',
    signIn: 'auth/sign-in',
    signUp: 'auth/sign-up',
    verifyEmail: 'auth/verify-email'
  },
  modals: {
    activityComposer: 'modals/activity-composer',
    rankReveal: 'modals/rank-reveal'
  },
  onboarding: {
    athleteProfile: 'onboarding/athlete-profile',
    index: 'onboarding',
    permissions: 'onboarding/permissions'
  },
  tabs: {
    home: 'home',
    profile: 'profile',
    progress: 'progress',
    rankings: 'rankings',
    record: 'record'
  }
} as const;

export function createAppUrl(path: AppHref) {
  return Linking.createURL(path);
}

export type AppHref =
  | typeof ROUTES.root
  | (typeof ROUTES.auth)[keyof typeof ROUTES.auth]
  | (typeof ROUTES.modals)[keyof typeof ROUTES.modals]
  | (typeof ROUTES.onboarding)[keyof typeof ROUTES.onboarding]
  | (typeof ROUTES.tabs)[keyof typeof ROUTES.tabs];
