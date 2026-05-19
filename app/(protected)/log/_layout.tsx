import { Stack } from 'expo-router';

export default function LogLayout() {
  return <Stack screenOptions={{ animation: 'slide_from_right', headerShown: false }} />;
}
