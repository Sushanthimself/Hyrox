export type AppEnvironment = 'development' | 'preview' | 'production';

const appEnv = process.env.EXPO_PUBLIC_APP_ENV;

export const env = {
  appEnv: (appEnv || 'development') as AppEnvironment,
  apiUrl: process.env.EXPO_PUBLIC_API_URL || '',
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || ''
} as const;

export const envStatus = {
  hasApiUrl: Boolean(env.apiUrl),
  hasSupabase: Boolean(env.supabaseUrl && env.supabaseAnonKey)
} as const;
