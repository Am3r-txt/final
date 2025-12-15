export enum HabitCategory {
  TRANSPORT = 'Transport',
  FOOD = 'Food',
  ENERGY = 'Energy',
  WASTE = 'Waste',
  COMMUNITY = 'Community'
}

export interface HabitLog {
  id: string;
  category: HabitCategory;
  description: string;
  impactScore: number; // 1-10 scale of positive impact
  date: string;
}

export interface ChatMessage {
  id: string;
  user: string;
  avatar: string;
  text: string;
  topic: 'general' | 'tips' | 'events';
  timestamp: string;
}

export interface UserStats {
  totalLogs: number;
  totalScore: number;
  streak: number;
}