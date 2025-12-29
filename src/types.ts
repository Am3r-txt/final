export type HabitCategory = 'ahorro' | 'reciclaje' | 'energia' | 'transporte';

export interface HabitLog {
  id: string;
  category: HabitCategory;
  description: string;
  impact: number;
  date: string;
}

export interface UserStats {
  totalImpact: number;
  completedHabits: number;
  streak: number;
}

export interface Habit {
  id: string;
  name: string;
  completed: boolean;
  date: string;
}