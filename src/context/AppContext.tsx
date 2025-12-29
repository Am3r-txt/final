import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// 1. Definición de Tipos
export type HabitCategory = 'ahorro' | 'reciclaje' | 'energia' | 'transporte';

export interface HabitLog {
  id: string;
  category: HabitCategory;
  description: string;
  impact: number; // Antes tenías impactScore, lo cambiamos a impact para que coincida
  date: string;
}

export interface UserStats {
  totalImpact: number;
  completedHabits: number;
  streak: number;
}

interface AppContextType {
  logs: HabitLog[];
  stats: UserStats;
  addLog: (logData: Omit<HabitLog, 'id' | 'date'>) => void;
  deleteLog: (id: string) => void;
}

// 2. Datos iniciales corregidos
const INITIAL_LOGS: HabitLog[] = [
  { id: '1', category: 'ahorro', description: 'Uso de bolsas reutilizables', impact: 5, date: new Date().toISOString() },
  { id: '2', category: 'transporte', description: 'Caminé al trabajo', impact: 8, date: new Date().toISOString() },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<HabitLog[]>(INITIAL_LOGS);
  const [stats, setStats] = useState<UserStats>({ totalImpact: 0, completedHabits: 0, streak: 3 });

  useEffect(() => {
    // Cálculo de estadísticas
    const totalImpact = logs.reduce((acc, log) => acc + log.impact, 0);
    setStats({
      totalImpact,
      completedHabits: logs.length,
      streak: logs.length > 0 ? 3 + Math.floor(logs.length / 5) : 0
    });
  }, [logs]);

  const addLog = (logData: Omit<HabitLog, 'id' | 'date'>) => {
    const newLog: HabitLog = {
      ...logData,
      id: Math.random().toString(36).substring(2, 9),
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