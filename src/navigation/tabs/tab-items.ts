import { ChartNoAxesCombined, Dumbbell, House, Trophy, UserCircle } from 'lucide-react-native';

export const TAB_ITEMS = [
  {
    icon: House,
    label: 'Home',
    name: 'home'
  },
  {
    icon: Dumbbell,
    label: 'Record',
    name: 'record'
  },
  {
    icon: ChartNoAxesCombined,
    label: 'Progress',
    name: 'progress'
  },
  {
    icon: Trophy,
    label: 'Rankings',
    name: 'rankings'
  },
  {
    icon: UserCircle,
    label: 'Profile',
    name: 'profile'
  }
] as const;

export type TabRouteName = (typeof TAB_ITEMS)[number]['name'];
