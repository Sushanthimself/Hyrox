import { Tabs } from 'expo-router';

import { PremiumTabBar, TAB_ITEMS } from '@/navigation';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        animation: 'shift',
        headerShown: false,
        sceneStyle: { backgroundColor: 'transparent' }
      }}
      tabBar={(props) => <PremiumTabBar {...props} />}
    >
      {TAB_ITEMS.map((item) => (
        <Tabs.Screen key={item.name} name={item.name} options={{ title: item.label }} />
      ))}
    </Tabs>
  );
}
