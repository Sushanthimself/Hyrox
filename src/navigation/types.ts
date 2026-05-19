import type { AppHref } from './deep-linking';
import type { TabRouteName } from './tabs';

export type NavigationRouteKind = 'auth' | 'modal' | 'onboarding' | 'tab';

export type NavigationRoute = {
  href: AppHref;
  kind: NavigationRouteKind;
  protected: boolean;
  title: string;
};

export type AppTabRouteName = TabRouteName;
