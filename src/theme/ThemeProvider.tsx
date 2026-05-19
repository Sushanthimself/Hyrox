import { createContext, useContext, useEffect, useMemo, type PropsWithChildren } from 'react';
import { useColorScheme as useSystemColorScheme, View } from 'react-native';
import * as SystemUI from 'expo-system-ui';
import { StatusBar } from 'expo-status-bar';
import { colorScheme as nativeWindColorScheme } from 'nativewind';

import { useThemeStore } from '@/store/theme-store';

import { createThemeVariables } from './variables';
import {
  darkTheme,
  lightTheme,
  type AppTheme,
  type ResolvedThemeMode,
  type ThemePreference
} from './themes';

type ThemeContextValue = {
  isDark: boolean;
  preference: ThemePreference;
  resolvedTheme: ResolvedThemeMode;
  setPreference: ReturnType<typeof useThemeStore.getState>['setPreference'];
  theme: AppTheme;
  toggleTheme: ReturnType<typeof useThemeStore.getState>['toggleTheme'];
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function resolveTheme(
  preference: ThemeContextValue['preference'],
  systemScheme: ReturnType<typeof useSystemColorScheme>
): ResolvedThemeMode {
  if (preference === 'system') {
    return systemScheme === 'light' ? 'light' : 'dark';
  }

  return preference;
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemScheme = useSystemColorScheme();
  const preference = useThemeStore((state) => state.preference);
  const setPreference = useThemeStore((state) => state.setPreference);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const resolvedTheme = resolveTheme(preference, systemScheme);
  const isDark = resolvedTheme === 'dark';
  const theme = isDark ? darkTheme : lightTheme;
  const themeVariables = useMemo(() => createThemeVariables(resolvedTheme), [resolvedTheme]);

  useEffect(() => {
    nativeWindColorScheme.set(resolvedTheme);
    SystemUI.setBackgroundColorAsync(theme.color.background).catch(() => undefined);
  }, [resolvedTheme, theme.color.background]);

  const value = useMemo(
    () => ({
      isDark,
      preference,
      resolvedTheme,
      setPreference,
      theme,
      toggleTheme
    }),
    [isDark, preference, resolvedTheme, setPreference, theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <View className="flex-1 bg-background" style={themeVariables}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
