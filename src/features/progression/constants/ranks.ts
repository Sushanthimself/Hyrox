import type { RankTier } from '../types/progression';

export const RANK_LADDER: RankTier[] = [
  { id: 'bronze_iii', label: 'Bronze III', division: 'Open', minXp: 0 },
  { id: 'bronze_ii', label: 'Bronze II', division: 'Open', minXp: 400 },
  { id: 'bronze_i', label: 'Bronze I', division: 'Open', minXp: 900 },
  { id: 'silver_iii', label: 'Silver III', division: 'Open', minXp: 1_500 },
  { id: 'silver_ii', label: 'Silver II', division: 'Open', minXp: 2_300 },
  { id: 'silver_i', label: 'Silver I', division: 'Open', minXp: 3_200 },
  { id: 'gold_iii', label: 'Gold III', division: 'Pro', minXp: 4_400 },
  { id: 'gold_ii', label: 'Gold II', division: 'Pro', minXp: 5_900 },
  { id: 'gold_i', label: 'Gold I', division: 'Pro', minXp: 7_700 },
  { id: 'platinum_iii', label: 'Platinum III', division: 'Pro', minXp: 9_800 },
  { id: 'platinum_ii', label: 'Platinum II', division: 'Pro', minXp: 12_200 },
  { id: 'platinum_i', label: 'Platinum I', division: 'Pro', minXp: 15_000 },
  { id: 'diamond_iii', label: 'Diamond III', division: 'Elite', minXp: 18_200 },
  { id: 'diamond_ii', label: 'Diamond II', division: 'Elite', minXp: 21_800 },
  { id: 'diamond_i', label: 'Diamond I', division: 'Elite', minXp: 25_900 },
  { id: 'champion_i', label: 'Champion I', division: 'Elite', minXp: 30_500 },
  { id: 'elite', label: 'Elite', division: 'Champion', minXp: 36_000 }
];
