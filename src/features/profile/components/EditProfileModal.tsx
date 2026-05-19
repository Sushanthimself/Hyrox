import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MotionModal } from '@/motion/components/MotionModal';
import { X, Camera } from 'lucide-react-native';
import { AthleteProfile } from '../types';

interface EditProfileModalProps {
  visible: boolean;
  profile: AthleteProfile;
  onClose: () => void;
  onSave: (updatedProfile: Partial<AthleteProfile>) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  profile,
  onClose,
  onSave
}) => {
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [bio, setBio] = useState(profile.bio || '');
  const [location, setLocation] = useState(profile.location || '');

  const handleSave = () => {
    onSave({
      displayName,
      bio,
      location
    });
    onClose();
  };

  return (
    <MotionModal
      visible={visible}
      onClose={onClose}
      title="Edit Profile"
    >
      <ScrollView className="px-4 py-2" showsVerticalScrollIndicator={false}>
        {/* Avatar Edit - placeholder functionality */}
        <View className="items-center mb-6 mt-4">
          <View className="w-24 h-24 rounded-full bg-surface-elevated items-center justify-center border-2 border-primary border-dashed relative">
            <Camera size={32} className="text-primary opacity-80" />
            <Text className="text-primary text-xs mt-1 font-medium">Update</Text>
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium text-foreground mb-2">Display Name</Text>
          <TextInput
            className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground text-base"
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Your display name"
            placeholderTextColor="#666"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium text-foreground mb-2">Bio</Text>
          <TextInput
            className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground text-base"
            value={bio}
            onChangeText={setBio}
            placeholder="Tell us about your fitness journey"
            placeholderTextColor="#666"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        <View className="mb-8">
          <Text className="text-sm font-medium text-foreground mb-2">Location</Text>
          <TextInput
            className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground text-base"
            value={location}
            onChangeText={setLocation}
            placeholder="City, Country"
            placeholderTextColor="#666"
          />
        </View>

        <View className="flex-row gap-4 pb-8">
          <TouchableOpacity 
            className="flex-1 py-4 items-center justify-center rounded-xl bg-surface border border-border"
            onPress={onClose}
          >
            <Text className="text-foreground font-bold">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-1 py-4 items-center justify-center rounded-xl bg-primary"
            onPress={handleSave}
          >
            <Text className="text-white font-bold">Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </MotionModal>
  );
};
