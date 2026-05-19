export const ROUTES = {
  root: '/',
  auth: {
    forgotPassword: '/auth/forgot-password',
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    verifyEmail: '/auth/verify-email'
  },
  onboarding: {
    index: '/onboarding',
    athleteProfile: '/onboarding/athlete-profile',
    permissions: '/onboarding/permissions'
  },
  tabs: {
    home: '/home',
    record: '/record',
    progress: '/progress',
    rankings: '/rankings',
    profile: '/profile'
  },
  log: {
    gym: '/log/gym',
    review: '/log/review',
    run: '/log/run'
  },
  modals: {
    activityComposer: '/modals/activity-composer',
    rankReveal: '/modals/rank-reveal'
  }
} as const;
