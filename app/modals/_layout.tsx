import { Stack } from 'expo-router';

export default function ModalLayout() {
  return <Stack screenOptions={{ animation: 'slide_from_bottom', headerShown: false }} />;
}
