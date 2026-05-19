import React from 'react';
import { View, Alert } from 'react-native';
import { ProfileScreen } from '@/features/profile';
import { useSignOut } from '@/features/auth/hooks/useSignOut';

export default function ProfileRoute() {
  const { signOut } = useSignOut();

  // Handle settings/signout via the AthleteBanner settings icon (which will be added if not fully there)
  // Or we can add a signout button inside the EditProfileModal, but let's just use an alert from settings for now
  const handleSettingsPress = () => {
    Alert.alert(
      'Settings',
      'Choose an action',
      [
        { text: 'Sign Out', onPress: signOut, style: 'destructive' },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  return <ProfileScreen onSettingsPress={handleSettingsPress} />;
}
