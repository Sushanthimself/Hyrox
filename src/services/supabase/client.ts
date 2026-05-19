import { AppState, type AppStateStatus } from 'react-native';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import { env } from '@/lib/env';

import { secureAuthStorage } from './auth-storage';

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (supabaseClient) {
    return supabaseClient;
  }

  supabaseClient = createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: {
      storage: secureAuthStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false
    }
  });

  return supabaseClient;
}

/** Refresh session when the app returns to the foreground. */
export function registerSupabaseAppStateAuthRefresh() {
  const client = getSupabaseClient();

  const onAppStateChange = (state: AppStateStatus) => {
    if (state === 'active') {
      void client.auth.startAutoRefresh();
      return;
    }

    void client.auth.stopAutoRefresh();
  };

  const subscription = AppState.addEventListener('change', onAppStateChange);
  return () => subscription.remove();
}

export const supabase = getSupabaseClient();
