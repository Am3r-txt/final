import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { HabitLog, HabitCategory, UserStats } from '../types';

interface AppContextType {
  logs: HabitLog[];
  addLog: (log: Omit<HabitLog, 'id' | 'date'>) => void;
  stats: UserStats;
  deleteLog: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Dummy initial data
const INITIAL_LOGS: HabitLog[] = [
  { id: '1', category: HabitCategory.FOOD, description: 'Ate a fully vegetarian lunch', impactScore: 5, date: new Date().toISOString() },
  { id: '2', category: HabitCategory.TRANSPORT, description: 'Cycled to work instead of driving', impactScore: 8, date: new Date().toISOString() },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<HabitLog[]>(INITIAL_LOGS);
  const [stats, setStats] = useState<UserStats>({ totalLogs: 0, totalScore: 0, streak: 3 });

  useEffect(() => {
    // Recalculate stats whenever logs change
    const totalScore = logs.reduce((acc, log) => acc + log.impactScore, 0);
    setStats({
      totalLogs: logs.length,
      totalScore,
      streak: logs.length > 0 ? 3 + Math.floor(logs.length / 5) : 0 // Mock streak logic
    });
  }, [logs]);

  const addLog = (logData: Omit<HabitLog, 'id' | 'date'>) => {
    const newLog: HabitLog = {
      ...logData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const deleteLog = (id: string) => {
    setLogs(prev => prev.filter(log => log.id !== id));
  };

  return (
    <AppContext.Provider value={{ logs, addLog, stats, deleteLog }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};