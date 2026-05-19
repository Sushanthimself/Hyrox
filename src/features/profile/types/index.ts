export interface AthleteProfile {
  id: string;
  username: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  coverUrl?: string;
  joinDate: string;
  location?: string;
  
  // Stats
  totalWorkouts: number;
  totalDistance: number; // in meters/km depending on format
  strongestLifts: StrongestLift[];
  
  // Social
  followersCount: number;
  followingCount: number;
}

export interface StrongestLift {
  id: string;
  exerciseId: string;
  exerciseName: string;
  weight: number;
  unit: 'kg' | 'lbs';
  dateAchieved: string;
}

export interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
  action?: {
    label: string;
    onPress: () => void;
  };
  className?: string;
}
